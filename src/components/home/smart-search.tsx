"use client";

import { useState } from "react";
import Link from "next/link";
import { Mic, Search } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SmartSearch() {
  const { t } = useApp();
  const [query, setQuery] = useState("");

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gvmc-text">
          {t("Smart Search & Voice", "స్మార్ట్ శోధన & వాయిస్")}
        </h2>
        <p className="mt-1 text-sm text-gvmc-muted font-telugu">
          {t(
            'Try: "How to apply for trade license?"',
            'ఉదా: "ట్రేడ్ లైసెన్స్ ఎలా పొందాలి?"',
          )}
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gvmc-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("Search municipal services...", "మునిసిపల్ సేవలు శోధించండి...")}
              className="w-full rounded-xl border border-gvmc-border bg-gvmc-bg py-3 pl-10 pr-4 text-gvmc-text outline-none focus:border-gvmc-ai"
            />
          </div>
          <Link href={`/knowledge?q=${encodeURIComponent(query)}`}>
            <Button variant="primary">{t("Search", "శోధించు")}</Button>
          </Link>
          <Link href="/voice">
            <Button variant="ai" className="gap-2">
              <Mic className="h-4 w-4" />
              {t("Voice", "వాయిస్")}
            </Button>
          </Link>
        </div>
      </Card>
    </section>
  );
}
