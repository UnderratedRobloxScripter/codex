const sampleTree = [
  "app/page.tsx",
  "app/layout.tsx",
  "components/EditorWorkbench.tsx",
  "lib/ai/pipeline.ts",
  "styles/globals.css",
];

export function FileExplorerPanel() {
  return (
    <aside className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3">
      <input
        className="mb-3 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs"
        placeholder="Search project"
      />
      <ul className="space-y-1 text-xs text-zinc-300">
        {sampleTree.map((file) => (
          <li key={file} className="rounded-lg px-2 py-1 hover:bg-zinc-800/80">
            {file}
          </li>
        ))}
      </ul>
    </aside>
  );
}
