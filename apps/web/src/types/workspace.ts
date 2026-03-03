import type { DiffChunk, FileNode, Panel } from "../../../../packages/shared/src/contracts";

export interface EditorTab {
  id: string;
  filePath: string;
  dirty: boolean;
}

export interface WorkspaceState {
  projectName: string;
  activePanels: Panel[];
  files: FileNode[];
  openTabs: EditorTab[];
  activeTabId?: string;
  pendingDiffs: DiffChunk[];
  aiMode: "assist" | "autopilot";
}
