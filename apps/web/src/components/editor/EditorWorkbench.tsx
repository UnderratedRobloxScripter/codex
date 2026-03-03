export function EditorWorkbench() {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3">
      <div className="mb-2 flex gap-2 text-xs">
        <button className="rounded-lg bg-zinc-800 px-2 py-1">app/page.tsx</button>
        <button className="rounded-lg px-2 py-1 text-zinc-400">+ Split</button>
      </div>
      <div className="h-[calc(100%-32px)] rounded-xl border border-zinc-800 bg-zinc-950 p-3 font-mono text-xs text-zinc-300">
        {/* Monaco editor mounts here */}
        <p>function Workspace() {'{'}</p>
        <p className="pl-4">return &lt;IDELayout /&gt;;</p>
        <p>{'}'}</p>
      </div>
    </section>
  );
}
