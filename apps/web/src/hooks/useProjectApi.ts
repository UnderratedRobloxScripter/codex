import type { FileNode } from "@codex/shared/contracts";

export async function fetchFileTree(): Promise<FileNode[]> {
  const response = await fetch("/api/files");
  if (!response.ok) throw new Error("Failed to load files");
  return response.json();
}

export async function fetchFileContent(path: string): Promise<string> {
  const response = await fetch(`/api/file?path=${encodeURIComponent(path)}`);
  if (!response.ok) throw new Error("Failed to load file");
  const data = await response.json();
  return data.content;
}

export async function saveFile(path: string, content: string): Promise<void> {
  const response = await fetch("/api/file", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, content }),
  });
  if (!response.ok) throw new Error("Failed to save file");
}
