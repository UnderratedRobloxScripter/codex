import type { DiffChunk, FileNode, Panel } from "@codex/shared/contracts";

export interface EditorTab {
  id: string;
  filePath: string;
  content: string;
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
  logs: string[];
}
