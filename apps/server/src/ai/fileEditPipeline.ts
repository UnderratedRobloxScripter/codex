import type { AIToolRequest, AIToolResponse, DiffChunk } from "@codex/shared/contracts";
import { enforcePatchPolicy } from "../security/policy";

function buildPatchStub(request: AIToolRequest): DiffChunk[] {
  return [
    {
      filePath: request.selectedCode?.filePath ?? "README.md",
      before: request.selectedCode?.code ?? "",
      after: "// AI-proposed change\n",
      summary: `Applied command: ${request.command}`,
    },
  ];
}

export async function executeAIEdit(request: AIToolRequest): Promise<AIToolResponse> {
  const proposedPatches = buildPatchStub(request);
  const approvedPatches = proposedPatches.filter(enforcePatchPolicy);

  return {
    message: "Patch proposal generated. Review diff before apply.",
    patches: approvedPatches,
    followUpChecks: ["npm run lint", "npm run test -- --findRelatedTests"],
  };
}
