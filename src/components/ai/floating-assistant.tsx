"use client";

import { useState } from "react";
import { Bot, Mic, Minimize2, Paperclip, Send, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/app-context";
import { aiSuggestions } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const demoMessages = [
  {
    role: "user" as const,
    text: "There is a pothole on MVP Colony main road",
  },
  {
    role: "ai" as const,
    text: "I can help register this under Roads & Engineering. Please confirm your ward or share GPS location.",
  },
];

export function FloatingAssistant() {
  const { t } = useApp();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    setThinking(true);
    setTimeout(() => setThinking(false), 1200);
    setInput("");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            id="gvmc-ai-chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(520px,80vh)] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-gvmc-border glass-card ai-glow"
          >
            <div className="flex items-center justify-between border-b border-gvmc-border bg-gvmc-primary px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-gvmc-ai" />
                <span className="font-semibold">GVMC AI Assistant</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 hover:bg-white/10"
                aria-label="Minimize"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {demoMessages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[90%] rounded-2xl px-3 py-2 text-sm",
                    msg.role === "user"
                      ? "ml-auto bg-gvmc-primary text-white"
                      : "bg-gvmc-bg text-gvmc-text",
                  )}
                >
                  {msg.text}
                </div>
              ))}
              {thinking && (
                <div className="flex gap-1 rounded-2xl bg-gvmc-bg px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 animate-bounce rounded-full bg-gvmc-ai"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gvmc-border p-3">
              <div className="mb-2 flex flex-wrap gap-1">
                {aiSuggestions.slice(0, 2).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setInput(s)}
                    className="rounded-full border border-gvmc-border px-2 py-1 text-xs text-gvmc-muted hover:border-gvmc-ai"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="text-gvmc-muted" aria-label="Attach">
                  <Paperclip className="h-4 w-4" />
                </button>
                <button type="button" className="text-gvmc-muted" aria-label="Emoji">
                  <Smile className="h-4 w-4" />
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder={t("Type your message...", "మీ సందేశం టైప్ చేయండి...")}
                  className="flex-1 rounded-xl border border-gvmc-border bg-gvmc-surface px-3 py-2 text-sm outline-none focus:border-gvmc-ai"
                />
                <button type="button" className="text-gvmc-ai" aria-label="Voice">
                  <Mic className="h-5 w-5" />
                </button>
                <Button variant="ai" size="sm" onClick={send} aria-label="Send">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gvmc-ai text-slate-900 ai-glow transition hover:scale-105"
        aria-label={t("Open AI assistant", "AI సహాయకుడిని తెరవండి")}
      >
        <Bot className="h-7 w-7" />
      </button>
    </>
  );
}
