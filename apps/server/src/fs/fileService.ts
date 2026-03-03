import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import type { FileNode } from "@codex/shared/contracts";
import { projectRoot } from "../state/projectStore";

function safePath(rel: string) {
  const full = path.resolve(projectRoot, rel);
  if (!full.startsWith(projectRoot)) throw new Error("Path outside project root");
  return full;
}

export async function getTree(dir = ""): Promise<FileNode[]> {
  const full = safePath(dir || ".");
  const entries = await readdir(full, { withFileTypes: true });
  const nodes = await Promise.all(
    entries
      .filter((entry) => !entry.name.startsWith("."))
      .map(async (entry) => {
        const relPath = path.posix.join(dir, entry.name);
        if (entry.isDirectory()) {
          return {
            name: entry.name,
            path: relPath,
            type: "folder" as const,
            children: await getTree(relPath),
          };
        }
        return { name: entry.name, path: relPath, type: "file" as const };
      })
  );
  return nodes;
}

export async function getFileContent(relPath: string): Promise<string> {
  const full = safePath(relPath);
  const info = await stat(full);
  if (!info.isFile()) throw new Error("Not a file");
  return readFile(full, "utf8");
}

export async function saveFileContent(relPath: string, content: string): Promise<void> {
  const full = safePath(relPath);
  await writeFile(full, content, "utf8");
}
