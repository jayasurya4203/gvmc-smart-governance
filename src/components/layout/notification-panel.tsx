"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { useAuth } from "@/contexts/auth-context";
import { apiGet, apiPatch, apiPost } from "@/lib/api-client";
import type { ApiNotification } from "@/types/api";
import { cn } from "@/lib/cn";

export function NotificationBell() {
  const { t } = useApp();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<ApiNotification[]>([]);
  const [unread, setUnread] = useState(0);

  const load = useCallback(async () => {
    if (!user) {
      setItems([]);
      setUnread(0);
      return;
    }
    const res = await apiGet<{
      notifications: ApiNotification[];
      unreadCount: number;
    }>("/api/notifications");
    if (res.ok) {
      setItems(res.data.notifications);
      setUnread(res.data.unreadCount);
    }
  }, [user]);

  useEffect(() => {
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, [load]);

  const markRead = async (id: string) => {
    await apiPatch(`/api/notifications/${id}/read`);
    load();
  };

  const markAllRead = async () => {
    await apiPost("/api/notifications/read-all");
    load();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-xl border border-gvmc-border p-2 text-gvmc-text"
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell className="h-5 w-5" />
        {user && unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gvmc-danger px-1 text-[10px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,360px)] rounded-xl border border-gvmc-border bg-gvmc-surface shadow-lg">
            <div className="flex items-center justify-between border-b border-gvmc-border px-4 py-3">
              <p className="font-semibold text-gvmc-text">
                {t("Notifications", "నోటిఫికేషన్లు")}
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gvmc-muted"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {!user ? (
              <p className="px-4 py-6 text-sm text-gvmc-muted">
                <Link href="/login" className="text-gvmc-ai font-medium">
                  {t("Sign in", "సైన్ ఇన్")}
                </Link>{" "}
                {t("to see your alerts.", "అలర్ట్లు చూడడానికి.")}
              </p>
            ) : (
              <>
                {unread > 0 && (
                  <button
                    type="button"
                    onClick={markAllRead}
                    className="w-full border-b border-gvmc-border px-4 py-2 text-left text-xs text-gvmc-ai hover:bg-gvmc-bg"
                  >
                    {t("Mark all read", "అన్నీ చదివినవిగా గుర్తించు")}
                  </button>
                )}
                <ul className="max-h-80 overflow-y-auto">
                  {items.length === 0 ? (
                    <li className="px-4 py-6 text-sm text-gvmc-muted">
                      {t("No notifications", "నోటిఫికేషన్లు లేవు")}
                    </li>
                  ) : (
                    items.map((n) => (
                      <li key={n.id}>
                        <Link
                          href={n.link ?? "#"}
                          onClick={() => {
                            if (!n.read) markRead(n.id);
                            setOpen(false);
                          }}
                          className={cn(
                            "block px-4 py-3 text-sm transition hover:bg-gvmc-bg",
                            !n.read && "bg-gvmc-ai/5",
                          )}
                        >
                          <p className="font-medium text-gvmc-text">
                            {t(n.titleEn, n.titleTe)}
                          </p>
                          <p className="text-gvmc-muted mt-0.5 line-clamp-2">
                            {t(n.bodyEn, n.bodyTe)}
                          </p>
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
