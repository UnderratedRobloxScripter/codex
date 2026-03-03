import { useWorkspaceStore } from "../../store/workspaceStore";

export function TopBar() {
  const { projectName, aiMode, toggleAIMode } = useWorkspaceStore();

  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-800 px-4">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-medium tracking-tight">{projectName}</h1>
        <select className="rounded-xl border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs">
          <option>Development</option>
          <option>Preview</option>
          <option>Production</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-xl border border-zinc-700 px-3 py-1.5 text-xs">⌘K</button>
        <button onClick={toggleAIMode} className="rounded-xl border border-zinc-700 px-3 py-1.5 text-xs">
          AI: {aiMode}
        </button>
        <button className="rounded-xl bg-zinc-100 px-3 py-1.5 text-xs text-zinc-900">Deploy</button>
      </div>
    </header>
  );
}
