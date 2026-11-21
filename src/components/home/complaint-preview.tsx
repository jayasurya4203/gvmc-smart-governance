"use client";

import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { complaintTimeline } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function ComplaintPreview() {
  const { t } = useApp();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gvmc-text">
            {t("Complaint Tracking", "ఫిర్యాదు ట్రాకింగ్")}
          </h2>
          <p className="text-gvmc-muted text-sm mt-1">GVMC-2026-1842 · Pothole repair</p>
        </div>
        <Link href="/complaints/track">
          <Button variant="secondary">{t("View full timeline", "పూర్తి టైమ్‌లైన్")}</Button>
        </Link>
      </div>

      <Card className="mt-6">
        <ol className="space-y-0">
          {complaintTimeline.map((step, i) => (
            <li key={step.status} className="flex gap-4">
              <div className="flex flex-col items-center">
                {step.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-gvmc-success" />
                ) : (
                  <Circle className="h-6 w-6 text-gvmc-muted" />
                )}
                {i < complaintTimeline.length - 1 && (
                  <div
                    className={cn(
                      "my-1 w-0.5 flex-1 min-h-8",
                      step.completed ? "bg-gvmc-success" : "bg-gvmc-border",
                    )}
                  />
                )}
              </div>
              <div className="pb-8">
                <p className="font-semibold text-gvmc-text">
                  {t(step.labelEn, step.labelTe)}
                </p>
                {step.timestamp && (
                  <p className="text-xs text-gvmc-muted">{step.timestamp}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </section>
  );
}
