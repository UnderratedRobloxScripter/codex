import { motion } from "framer-motion";
import { AIAssistantPanel } from "../ai/AIAssistantPanel";
import { EditorWorkbench } from "../editor/EditorWorkbench";
import { FileExplorerPanel } from "../editor/FileExplorerPanel";
import { TopBar } from "./TopBar";
import { BottomDock } from "../terminal/BottomDock";

export function IDELayout() {
  return (
    <div className="h-screen w-screen bg-zinc-950 text-zinc-100">
      <TopBar />
      <div className="grid h-[calc(100vh-56px)] grid-rows-[1fr_260px] gap-3 p-3">
        <div className="grid grid-cols-[260px_1fr_360px] gap-3">
          <FileExplorerPanel />
          <EditorWorkbench />
          <AIAssistantPanel />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/70"
        >
          <BottomDock />
        </motion.div>
      </div>
    </div>
  );
}
