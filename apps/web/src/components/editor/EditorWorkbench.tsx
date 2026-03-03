import Editor from "@monaco-editor/react";
import { saveFile } from "../../hooks/useProjectApi";
import { useWorkspaceStore } from "../../store/workspaceStore";

export function EditorWorkbench() {
  const { openTabs, activeTabId, setActiveTab, updateTabContent, markSaved } = useWorkspaceStore();
  const activeTab = openTabs.find((tab) => tab.id === activeTabId);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3">
      <div className="mb-2 flex items-center gap-2 text-xs">
        {openTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-2 py-1 ${tab.id === activeTabId ? "bg-zinc-800" : "text-zinc-400"}`}
          >
            {tab.filePath.split("/").at(-1)} {tab.dirty ? "•" : ""}
          </button>
        ))}
        {activeTab && (
          <button
            onClick={async () => {
              await saveFile(activeTab.filePath, activeTab.content);
              markSaved(activeTab.id);
            }}
            className="ml-auto rounded-lg border border-zinc-700 px-2 py-1"
          >
            Save
          </button>
        )}
      </div>
      <div className="h-[calc(100%-32px)] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
        {activeTab ? (
          <Editor
            theme="vs-dark"
            language={activeTab.filePath.endsWith(".ts") || activeTab.filePath.endsWith(".tsx") ? "typescript" : "javascript"}
            value={activeTab.content}
            onChange={(value) => updateTabContent(activeTab.id, value ?? "")}
            options={{ minimap: { enabled: false }, fontSize: 13, roundedSelection: true }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-zinc-400">Open a file to start coding.</div>
        )}
      </div>
    </section>
  );
}
