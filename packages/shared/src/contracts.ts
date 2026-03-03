export type Panel = "files" | "editor" | "assistant" | "terminal" | "preview" | "canvas";

export type IDECommand =
  | "fix-selection"
  | "refactor-project"
  | "convert-typescript"
  | "optimize-performance"
  | "generate-tests";

export interface FileNode {
  path: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

export interface DiffChunk {
  filePath: string;
  before: string;
  after: string;
  summary: string;
}

export interface AIToolRequest {
  projectId: string;
  command: IDECommand;
  prompt: string;
  selectedCode?: {
    filePath: string;
    code: string;
    range?: [number, number];
  };
}

export interface AIToolResponse {
  message: string;
  patches: DiffChunk[];
  followUpChecks: string[];
}
