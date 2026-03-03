import type { DiffChunk } from "@codex/shared/contracts";

const BLOCKED_PATHS = [".env", "secrets", "id_rsa"];

export function enforcePatchPolicy(patch: DiffChunk): boolean {
  return !BLOCKED_PATHS.some((segment) => patch.filePath.includes(segment));
}

export function requiresConfirmation(operation: string): boolean {
  return ["delete-file", "reset-project", "bulk-rewrite"].includes(operation);
}
