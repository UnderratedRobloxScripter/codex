# Product Spec: Codex Studio

## System Objectives
- Deliver AI-native browser IDE with parity-plus against modern cloud coding environments.
- Keep interface minimal, calm, rounded, and high signal-to-noise.
- Treat AI as a senior collaborator: concise, reliable, patch-safe.

## UX Blueprint

### Layout zones
- **Top bar**: project identity, environment, deploy, AI mode, command launcher.
- **Left rail**: virtualized file tree + search + context actions.
- **Center workbench**: multi-tab Monaco editor with split panes and inline diagnostics.
- **Right dock**: context-aware AI conversation + diff proposals.
- **Bottom dock**: terminal, logs, build/debug/perf.

### Modes
1. **Code Mode**: traditional editor-first flow.
2. **Preview Mode**: sandboxed iframe with reload + device toggle.
3. **Canvas Mode**: visual component composition with code synchronization.

## AI Behavior Contract
- Reads project map before making major edits.
- Uses memory summaries instead of dumping full file content.
- Proposes structured diffs and asks confirmation for destructive actions.
- Prefers modular code, performance-safe defaults, and accessibility upgrades.
- Explains rationale on-demand; default responses remain concise.

## Backend Runtime Design
- WebSocket channels: `chat`, `diff`, `terminal`, `diagnostics`, `preview`.
- Tooling engine supports capabilities: file read/write, symbol search, run checks.
- Sandbox command broker with rate limits, timeout ceilings, and egress policy.
- Snapshot DAG tracks user and AI commits for rollback and compare.

## Performance Design
- Lazy-load Monaco/canvas modules after shell render.
- Debounced project indexing and worker-thread diagnostics.
- File tree virtualization and memoized view models.
- Streaming-first AI transport for low perceived latency.

## Security Design
- Capability-scoped tool execution.
- Patch policy denial rules for protected files.
- Secret redaction in context assembly and log pipeline.
- Action audit trail for compliance and incident response.

## Shipping Plan
- Build shell and state core first.
- Add AI diff flow second.
- Add preview sandbox third.
- Add canvas and deep refactor intelligence fourth.
