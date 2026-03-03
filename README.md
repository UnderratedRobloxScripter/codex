# Codex Studio: AI-Native Coding Environment

Codex Studio is now a runnable full-stack monorepo with:
- React + Vite frontend IDE shell.
- Node + Express + WebSocket backend.
- Shared typed contracts package.
- Real file tree loading/edit/save against a local `playground/` project.
- Live AI request flow (stubbed planner + diff proposal streaming over WS).

## Quick start

```bash
npm install
npm run dev
```

Then open:
- Web app: `http://localhost:5173`
- API health: `http://localhost:4000/api/health`

## Scripts
- `npm run dev` — run web and server together.
- `npm run build` — build shared, web, and server packages.
- `npm run typecheck` — type-check all workspaces.

## Workspace structure
- `apps/web` — browser IDE frontend.
- `apps/server` — file API + ws AI hub.
- `packages/shared` — common contracts.
- `playground` — editable sample project content created on first server run.
