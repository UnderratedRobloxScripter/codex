export function BottomDock() {
  return (
    <div className="grid h-full grid-cols-4 divide-x divide-zinc-800 text-xs">
      <section className="p-3">
        <h3 className="mb-2 text-zinc-400">Terminal</h3>
        <pre className="text-zinc-300">$ npm run dev</pre>
      </section>
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
