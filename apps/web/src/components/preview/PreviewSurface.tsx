export function PreviewSurface() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3">
      <div className="mb-2 flex gap-2 text-xs">
        <button className="rounded-lg bg-zinc-800 px-2 py-1">Desktop</button>
        <button className="rounded-lg px-2 py-1 text-zinc-400">Tablet</button>
        <button className="rounded-lg px-2 py-1 text-zinc-400">Mobile</button>
      </div>
      <div className="h-80 rounded-xl border border-zinc-800 bg-zinc-950" />
    </div>
  );
}
