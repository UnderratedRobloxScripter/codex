# Running Codex Studio

## Prerequisites
- Node.js 20+
- npm 10+

## Start development

```bash
npm install
npm run dev
```

### URLs
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000`
- Health check: `http://localhost:4000/api/health`

## Available features
- File explorer loaded from backend project tree.
- Monaco editor with tabs and save action.
- AI chat dock sending requests via WebSocket.
- Diff summaries in bottom panel.
- Policy-filtered AI patch pipeline on server.

## Build and verify

```bash
npm run typecheck
npm run build
```
