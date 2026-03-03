import { EventEmitter } from "node:events";
import type { AIToolRequest } from "../../../../packages/shared/src/contracts";
import { executeAIEdit } from "../ai/fileEditPipeline";

export class SessionHub extends EventEmitter {
  async onAIRequest(request: AIToolRequest) {
    this.emit("ai:started", { projectId: request.projectId });
    const response = await executeAIEdit(request);
    this.emit("ai:diff", response.patches);
    this.emit("ai:done", response);
  }
}
