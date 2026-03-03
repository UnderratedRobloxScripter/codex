import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

export const projectRoot = process.env.PROJECT_ROOT ?? path.resolve(process.cwd(), "playground");

export async function ensureProjectSeed() {
  await mkdir(path.join(projectRoot, "src"), { recursive: true });
  const appFile = path.join(projectRoot, "src", "App.tsx");
  try {
    await access(appFile);
  } catch {
    await writeFile(
      appFile,
      `export function App() {\n  return <main style={{ padding: 24 }}>Hello from Codex Studio playground.</main>;\n}\n`
    );
  }
}
