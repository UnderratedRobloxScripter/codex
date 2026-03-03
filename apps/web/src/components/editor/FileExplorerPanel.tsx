import { useEffect, useState } from "react";
import { fetchFileContent, fetchFileTree } from "../../hooks/useProjectApi";
import { useWorkspaceStore } from "../../store/workspaceStore";

function flatten(nodes: Array<{ type: string; path: string; children?: any[] }>): string[] {
  return nodes.flatMap((node) => (node.type === "file" ? [node.path] : flatten(node.children ?? [])));
}

export function FileExplorerPanel() {
  const { files, setFiles, openTab } = useWorkspaceStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchFileTree().then(setFiles).catch(console.error);
  }, [setFiles]);

  const filesFlat = flatten(files).filter((path) => path.toLowerCase().includes(query.toLowerCase()));

  return (
    <aside className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3">
      <input
        className="mb-3 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs"
        placeholder="Search project"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ul className="space-y-1 text-xs text-zinc-300">
        {filesFlat.map((file) => (
          <li
            key={file}
            onClick={async () => openTab(file, await fetchFileContent(file))}
            className="cursor-pointer rounded-lg px-2 py-1 hover:bg-zinc-800/80"
          >
            {file}
          </li>
        ))}
      </ul>
    </aside>
  );
}
