import { create } from "zustand";
import type { WorkspaceState } from "../types/workspace";
import type { DiffChunk } from "../../../../packages/shared/src/contracts";

interface WorkspaceActions {
  setProjectName: (name: string) => void;
  toggleAIMode: () => void;
  queueDiffs: (diffs: DiffChunk[]) => void;
  clearDiffs: () => void;
}

const initialState: WorkspaceState = {
  projectName: "untitled-project",
  activePanels: ["files", "editor", "assistant", "terminal"],
  files: [],
  openTabs: [],
  pendingDiffs: [],
  aiMode: "assist",
};

export const useWorkspaceStore = create<WorkspaceState & WorkspaceActions>((set) => ({
  ...initialState,
  setProjectName: (projectName) => set({ projectName }),
  toggleAIMode: () =>
    set((state) => ({
      aiMode: state.aiMode === "assist" ? "autopilot" : "assist",
    })),
  queueDiffs: (pendingDiffs) => set({ pendingDiffs }),
  clearDiffs: () => set({ pendingDiffs: [] }),
}));
