# Codex Studio Architecture

## 1) System Architecture

### High-level topology
1. **Web Client (Next.js/React)**
   - Workspace shell, editor, chat, preview, canvas, terminal, and command palette.
   - Uses WebSocket for low-latency AI streaming + terminal/log streams.
2. **Gateway + Orchestrator (Node)**
   - AuthN/AuthZ, project session orchestration, AI tool execution, diff generation, and policy enforcement.
3. **Project State Manager**
   - Maintains in-memory graph of open files, semantic symbols, diagnostics, and project memory embeddings.
4. **Sandbox Runtime Layer**
   - Per-project isolated execution workers (containerized) for build/run/test/preview.
5. **Persistent Data Layer**
   - Project metadata, snapshots, chat threads, and vector index for project memory.

### Design principles
- **Diff-first editing**: AI never writes directly without creating a reviewable patch.
- **Context budget control**: file summarization + chunking + relevance ranking.
- **UI responsiveness**: worker-based static analysis and lazy heavy modules (Monaco, canvas inspector).
- **Safety by default**: strict capability-based tool permissions.

## 2) Product Modules

### Frontend modules
- **TopBar**: project identity, env selector, deploy action, AI mode toggle.
- **FileExplorer**: virtualized tree, search, right-click actions.
- **EditorWorkbench**: tabs + split panes + Monaco model registry.
- **AIAssistantPanel**: streaming chat, selected-code context, proposed diff preview.
- **BottomDock**: terminal, logs, build output, debug console, perf panel.
- **PreviewSurface**: iframe sandbox + device toggles + error overlay.
- **CanvasMode**: drag/drop UI composition with code sync.

### Backend modules
- **WS Hub**: multiplexes AI stream, terminal output, diagnostics, and preview status.
- **AI Planner**: translates user intents (e.g., "Fix this", "Convert to TS") into executable tool plans.
- **File Service**: virtual + disk-backed project graph with conflict-safe writes.
- **Patch Engine**: computes and validates textual/AST-aware diffs before apply.
- **Sandbox Service**: starts/stops isolated runtime and command execution.
- **Snapshot Service**: Git-style logical snapshots and rollback.
- **Security Guard**: policy checks, secret redaction, path and command restrictions.

## 3) Folder Structure

```text
apps/
  web/
    src/
      components/
        layout/
        editor/
        ai/
        preview/
        canvas/
        terminal/
      hooks/
      store/
      workers/
      types/
  server/
    src/
      ws/
      ai/
      fs/
      state/
      sandbox/
      security/
      git/
      inspector/
packages/
  shared/
    src/
```

## 4) AI File-Edit Pipeline

1. User prompt enters AI panel with optional selected-code context.
2. Planner classifies intent and derives tools (`readFiles`, `searchSymbols`, `proposePatch`, `runChecks`).
3. Context packer builds bounded prompt using relevant files + prior project memory summaries.
4. Model returns structured patch operations.
5. Patch engine validates operations:
   - path scope
   - syntax sanity
   - policy compliance
6. Diff is rendered to user for approval.
7. On approval, file service applies patch atomically.
8. Post-apply checks run (`lint/test/build targeted`).
9. Diagnostics stream back; AI suggests follow-up fixes.

## 5) State Management Strategy

- **Client state layers**
  - Ephemeral UI state: Zustand slices (layout panes, selected tab, active command palette input).
  - Durable project state: normalized entities for file graph, diagnostics, snapshot timeline.
  - Server events: event reducer fed by WebSocket streams.
- **Backend state layers**
  - Session state cache per project (open file hashes, pending patches, run status).
  - Persisted state (project config, memory vectors, snapshot metadata).

## 6) Security Model

- Capability tokens tied to each AI action (`read`, `patch`, `execute`, `network`).
- Workspace path jail; deny path traversal and hidden secret mounts by default.
- Destructive operations require explicit confirmation and signed intent.
- Secrets scanner redacts known key patterns from logs/chat context.
- Sandbox egress controls with allowlisted domains for builds/deploy integrations.
- Full audit log of prompts, tool calls, and patch decisions.

## 7) Incremental Build Plan

### Phase 1: IDE shell + local project primitives
- Workspace layout, file tree, tabs/splits, Monaco integration.
- Local file API + editor save/load + terminal panel.

### Phase 2: AI assistant + diff edits
- WebSocket AI streaming.
- Intent planner + file reading tools + patch proposal UI.
- Apply/reject flow with snapshot capture.

### Phase 3: live preview + diagnostics
- Sandboxed preview container with hot reload.
- Error overlay and diagnostics pipeline.

### Phase 4: canvas and refactor intelligence
- Canvas mode with component map.
- AST refactor tools and performance recommendations.

### Phase 5: team and scale features
- Multi-user presence, comments, branch environments, deployment hooks.

## 8) MVP Roadmap (8–10 weeks)

- **Week 1–2**: Shell UI, file explorer, editor tabs/splits.
- **Week 3–4**: Backend file service, ws transport, terminal stream.
- **Week 5–6**: AI chat with bounded context, patch diff preview, apply flow.
- **Week 7**: Snapshot timeline, rollback, error analyzer baseline.
- **Week 8**: Preview mode + hot reload + polish.
- **Week 9–10** (optional): Canvas alpha + performance inspector starter.

## 9) Scaling Strategy

- Horizontal WS gateway scaling with sticky project sessions.
- Offload heavy analysis to worker queue (AST indexing, bundle analysis, test-impact graph).
- Incremental embeddings and cache invalidation by file hash.
- Tenant-level quotas for sandbox CPU/memory/egress.
- Region-aware project storage and execution placement.

## 10) Production hardening checklist

- SLOs: p95 prompt-to-first-token, patch apply latency, preview boot time.
- Chaos testing for sandbox failures and ws reconnect storms.
- Fine-grained RBAC for org/team roles.
- Signed snapshot artifacts + tamper-evident audit ledger.
- Canary deploys with synthetic AI editing regression suite.
