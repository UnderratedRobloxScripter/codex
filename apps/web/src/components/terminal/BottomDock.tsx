import { useWorkspaceStore } from "../../store/workspaceStore";

export function BottomDock() {
  const { logs, pendingDiffs } = useWorkspaceStore();
export function BottomDock() {
  return (
    <div className="grid h-full grid-cols-4 divide-x divide-zinc-800 text-xs">
      <section className="p-3">
        <h3 className="mb-2 text-zinc-400">Terminal</h3>
        <pre className="text-zinc-300">$ npm run dev</pre>
      </section>
      <section className="p-3 overflow-auto">
        <h3 className="mb-2 text-zinc-400">Logs</h3>
        {logs.slice(-8).map((line, i) => (
          <p key={i} className="text-zinc-300">{line}</p>
        ))}
      </section>
      <section className="p-3 overflow-auto">
        <h3 className="mb-2 text-zinc-400">Diff Preview</h3>
        {pendingDiffs.map((diff, i) => (
          <p key={i} className="text-zinc-300">{diff.filePath}: {diff.summary}</p>
        ))}
      </section>
      <section className="p-3">
        <h3 className="mb-2 text-zinc-400">Performance</h3>
        <p className="text-zinc-300">Renderer idle: good</p>
      <section className="p-3">
        <h3 className="mb-2 text-zinc-400">Logs</h3>
      </section>
      <section className="p-3">
        <h3 className="mb-2 text-zinc-400">Debug Console</h3>
      </section>
      <section className="p-3">
        <h3 className="mb-2 text-zinc-400">Performance</h3>
      </section>
    </div>
  );
}
