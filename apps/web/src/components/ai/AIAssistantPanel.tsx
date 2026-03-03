import { useState } from "react";

export function AIAssistantPanel() {
  const [prompt, setPrompt] = useState("");

  return (
    <aside className="flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3">
      <h2 className="mb-2 text-sm font-medium">AI Assistant</h2>
      <div className="mb-3 flex-1 rounded-xl border border-zinc-800 bg-zinc-950 p-2 text-xs text-zinc-400">
        Suggestion stream, diff preview, and tool call trace appear here.
      </div>
      <textarea
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        className="h-20 rounded-xl border border-zinc-700 bg-zinc-950 p-2 text-xs"
        placeholder="Fix this, refactor, optimize..."
      />
      <button className="mt-2 rounded-xl bg-zinc-100 px-3 py-1.5 text-xs text-zinc-900">Send</button>
    </aside>
  );
}
