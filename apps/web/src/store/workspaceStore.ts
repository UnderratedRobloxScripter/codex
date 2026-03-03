import { create } from "zustand";
import type { DiffChunk, FileNode } from "@codex/shared/contracts";
import type { WorkspaceState } from "../types/workspace";

interface WorkspaceActions {
  setFiles: (files: FileNode[]) => void;
  openTab: (filePath: string, content: string) => void;
  setActiveTab: (tabId: string) => void;
  updateTabContent: (tabId: string, content: string) => void;
  markSaved: (tabId: string) => void;
  toggleAIMode: () => void;
  queueDiffs: (diffs: DiffChunk[]) => void;
  addLog: (line: string) => void;
}

const initialState: WorkspaceState = {
  projectName: "codex-studio",
  activePanels: ["files", "editor", "assistant", "terminal"],
  files: [],
  openTabs: [],
  pendingDiffs: [],
  aiMode: "assist",
  logs: [],
};

export const useWorkspaceStore = create<WorkspaceState & WorkspaceActions>((set, get) => ({
  ...initialState,
  setFiles: (files) => set({ files }),
  openTab: (filePath, content) => {
    const existing = get().openTabs.find((tab) => tab.filePath === filePath);
    if (existing) {
      set({ activeTabId: existing.id });
      return;
    }
    const tabId = crypto.randomUUID();
    const tab = { id: tabId, filePath, content, dirty: false };
    set((state) => ({ openTabs: [...state.openTabs, tab], activeTabId: tabId }));
  },
  setActiveTab: (activeTabId) => set({ activeTabId }),
  updateTabContent: (tabId, content) =>
    set((state) => ({
      openTabs: state.openTabs.map((tab) => (tab.id === tabId ? { ...tab, content, dirty: true } : tab)),
    })),
  markSaved: (tabId) =>
    set((state) => ({
      openTabs: state.openTabs.map((tab) => (tab.id === tabId ? { ...tab, dirty: false } : tab)),
    })),
  toggleAIMode: () => set((state) => ({ aiMode: state.aiMode === "assist" ? "autopilot" : "assist" })),
  queueDiffs: (pendingDiffs) => set({ pendingDiffs }),
  addLog: (line) => set((state) => ({ logs: [...state.logs, line].slice(-200) })),
}));
