"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Globe,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "@/contexts/app-context";
import { useAuth } from "@/contexts/auth-context";
import { NotificationBell } from "@/components/layout/notification-panel";
import { mainNav } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import type { Language, UiMode } from "@/types";

const modes: { id: UiMode; icon: typeof Sun; label: string }[] = [
  { id: "light", icon: Sun, label: "Light" },
  { id: "dark", icon: Moon, label: "Dark" },
  { id: "emergency", icon: AlertTriangle, label: "Emergency" },
];

export function TopNav() {
  const { uiMode, setUiMode, language, setLanguage, t } = useApp();
  const { user, logout, loading } = useAuth();
  const [open, setOpen] = useState(false);

  const cycleLanguage = () => {
    const order: Language[] = ["en", "te", "hi"];
    const next = order[(order.indexOf(language) + 1) % order.length];
    setLanguage(next);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-gvmc-border bg-gvmc-surface/90 backdrop-blur-md",
        uiMode === "emergency" && "emergency-pulse border-gvmc-danger",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gvmc-primary text-sm font-bold text-white">
            GV
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gvmc-primary">GVMC</p>
            <p className="text-xs text-gvmc-muted font-telugu">
              {t("Smart Governance", "స్మార్ట్ పాలన")}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gvmc-muted transition hover:bg-gvmc-bg hover:text-gvmc-text"
            >
              {t(item.labelEn, item.labelTe)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-xl border border-gvmc-border p-1 md:flex">
            {modes.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                type="button"
                title={label}
                onClick={() => setUiMode(id)}
                className={cn(
                  "rounded-lg p-2 transition",
                  uiMode === id
                    ? "bg-gvmc-primary text-white"
                    : "text-gvmc-muted hover:bg-gvmc-bg",
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={cycleLanguage}
            className="flex items-center gap-1 rounded-xl border border-gvmc-border px-3 py-2 text-sm font-medium text-gvmc-text"
            aria-label="Change language"
          >
            <Globe className="h-4 w-4 text-gvmc-ai" />
            {language.toUpperCase()}
          </button>

          <NotificationBell />

          {!loading &&
            (user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <span className="text-xs text-gvmc-muted max-w-[120px] truncate">
                  {user.name}
                </span>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="rounded-xl border border-gvmc-border p-2 text-gvmc-muted hover:text-gvmc-text"
                  aria-label="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden rounded-xl border border-gvmc-border p-2 text-gvmc-text sm:block"
                aria-label="Sign in"
              >
                <LogIn className="h-5 w-5" />
              </Link>
            ))}

          <Button
            variant="ai"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() =>
              document.getElementById("gvmc-ai-chat")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            {t("Ask GVMC AI", "GVMC AI అడగండి")}
          </Button>

          <button
            type="button"
            className="rounded-xl border border-gvmc-border p-2 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-gvmc-border px-4 py-3 lg:hidden">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {t(item.labelEn, item.labelTe)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
