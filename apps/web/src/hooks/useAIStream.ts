import { useEffect, useRef, useState } from "react";
import type { AIToolResponse } from "@codex/shared/contracts";

export function useAIStream(onResponse: (response: AIToolResponse) => void) {
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(`${location.origin.replace("http", "ws")}/ws`);
    wsRef.current = ws;
    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data) as { type: string; data: AIToolResponse };
      if (payload.type === "ai:done") onResponse(payload.data);
    };
    return () => ws.close();
  }, [onResponse]);

  const sendPrompt = (prompt: string, selectedCode?: { filePath: string; code: string }) => {
    wsRef.current?.send(
      JSON.stringify({
        type: "ai:request",
        data: { projectId: "local", command: "fix-selection", prompt, selectedCode },
      })
    );
  };

  return { connected, sendPrompt };
}
