import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import { WebSocketServer } from "ws";
import { SessionHub } from "./ws/sessionHub";
import { getFileContent, getTree, saveFileContent } from "./fs/fileService";
import { ensureProjectSeed } from "./state/projectStore";

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/api/files", async (_req, res) => res.json(await getTree()));
app.get("/api/file", async (req, res) => {
  try {
    const filePath = String(req.query.path ?? "");
    res.json({ content: await getFileContent(filePath) });
  } catch (error) {
    res.status(400).json({ error: String(error) });
  }
});
app.post("/api/file", async (req, res) => {
  try {
    const { path, content } = req.body as { path: string; content: string };
    await saveFileContent(path, content);
    res.json({ ok: true });
  } catch (error) {
    res.status(400).json({ error: String(error) });
  }
});

const server = createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });
const hub = new SessionHub();

hub.on("ai:started", (data) => {
  wss.clients.forEach((client) => client.send(JSON.stringify({ type: "ai:started", data })));
});
hub.on("ai:diff", (data) => {
  wss.clients.forEach((client) => client.send(JSON.stringify({ type: "ai:diff", data })));
});
hub.on("ai:done", (data) => {
  wss.clients.forEach((client) => client.send(JSON.stringify({ type: "ai:done", data })));
});

wss.on("connection", (socket) => {
  socket.send(JSON.stringify({ type: "system", data: "connected" }));
  socket.on("message", async (raw) => {
    const payload = JSON.parse(String(raw)) as { type: string; data: any };
    if (payload.type === "ai:request") {
      await hub.onAIRequest(payload.data);
    }
  });
});

const port = Number(process.env.PORT ?? 4000);
ensureProjectSeed().then(() => {
  server.listen(port, () => {
    console.log(`[server] running on http://localhost:${port}`);
  });
});
