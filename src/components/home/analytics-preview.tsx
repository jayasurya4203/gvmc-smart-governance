"use client";

import Link from "next/link";
import { BarChart3, TrendingUp } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { wardCleanliness, aiRecommendations } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AnalyticsPreview() {
  const { t } = useApp();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h2 className="text-2xl font-bold text-gvmc-text">
        {t("Analytics & AI Predictions", "విశ్లేషణ & ఏఐ అంచనాలు")}
      </h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-gvmc-ai" />
            <h3 className="font-semibold">{t("Ward Cleanliness Index", "వార్డ్ శుభ్రతా సూచిక")}</h3>
          </div>
          <ul className="space-y-3">
            {wardCleanliness.map((w) => (
              <li key={w.ward}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{w.ward}</span>
                  <span className="font-mono font-bold">{w.score}</span>
                </div>
                <div className="h-2 rounded-full bg-gvmc-bg overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gvmc-primary to-gvmc-ai"
                    style={{ width: `${w.score}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-gvmc-warning" />
            <h3 className="font-semibold">{t("AI Recommendations", "ఏఐ సిఫార్సులు")}</h3>
          </div>
          <ul className="space-y-3">
            {aiRecommendations.map((rec) => (
              <li
                key={rec.id}
                className="rounded-xl border border-gvmc-border bg-gvmc-bg px-4 py-3 text-sm"
              >
                {t(rec.textEn, rec.textTe)}
              </li>
            ))}
          </ul>
          <Link href="/analytics" className="mt-4 inline-block">
            <Button variant="secondary" size="sm">
              {t("Full dashboard", "పూర్తి డాష్‌బోర్డ్")}
            </Button>
          </Link>
        </Card>
      </div>
    </section>
  );
}
