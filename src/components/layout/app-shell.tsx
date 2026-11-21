"use client";

import { FloatingAssistant } from "@/components/ai/floating-assistant";
import { Footer } from "@/components/layout/footer";
import { TopNav } from "@/components/layout/top-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingAssistant />
    </>
  );
}
