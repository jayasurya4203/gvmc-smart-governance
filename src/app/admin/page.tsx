"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ModulePage } from "@/components/shared/module-page";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/app-context";
import { apiGet, apiPatch } from "@/lib/api-client";
import type { ApiComplaint } from "@/types/api";
import { GisDashboard } from "@/components/maps/gis-dashboard";

export default function AdminPage() {
  const { t } = useApp();
  const [stats, setStats] = useState({
    activeComplaints: 0,
    resolvedToday: 0,
  });
  const [complaints, setComplaints] = useState<ApiComplaint[]>([]);

  useEffect(() => {
    apiGet<{ cityStatus: { activeComplaints: number; resolvedToday: number } }>(
      "/api/stats",
    ).then((res) => {
      if (res.ok) setStats(res.data.cityStatus);
    });
    apiGet<{ complaints: ApiComplaint[] }>("/api/complaints?limit=20").then(
      (res) => {
        if (res.ok) setComplaints(res.data.complaints);
      },
    );
  }, []);

  async function advanceStatus(c: ApiComplaint) {
    const order = [
      "registered",
      "assigned",
      "dispatched",
      "in_progress",
      "resolved",
    ] as const;
    const idx = order.indexOf(c.status);
    if (idx < 0 || idx >= order.length - 1) return;
    const next = order[idx + 1];
    await apiPatch(`/api/complaints/${c.publicId}/status`, { status: next });
    const res = await apiGet<{ complaints: ApiComplaint[] }>(
      "/api/complaints?limit=20",
    );
    if (res.ok) setComplaints(res.data.complaints);
  }

  const kpis = [
    {
      labelEn: "Active Complaints",
      labelTe: "సక్రియ ఫిర్యాదులు",
      value: stats.activeComplaints,
    },
    {
      labelEn: "Resolved Today",
      labelTe: "ఈ రోజు పరిష్కరించబడినవి",
      value: stats.resolvedToday,
    },
    {
      labelEn: "Open on map",
      labelTe: "పటంపై తెరిచి",
      value: complaints.filter((c) => c.lat != null).length,
    },
    {
      labelEn: "In progress",
      labelTe: "ప్రగతిలో",
      value: complaints.filter((c) => c.status === "in_progress").length,
    },
  ];

  return (
    <ModulePage
      titleEn="Municipal Command Center"
      titleTe="మునిసిపల్ కమాండ్ సెంటర్"
      descriptionEn="Officer dashboard — live complaints API, GIS, and status control."
      descriptionTe="లైవ్ ఫిర్యాదుల API, జిఐఎస్, స్థితి నియంత్రణ."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 -mt-4">
        {kpis.map((kpi) => (
          <Card key={kpi.labelEn} glass={false} className="bg-gvmc-bg">
            <p className="text-xs text-gvmc-muted">{t(kpi.labelEn, kpi.labelTe)}</p>
            <p className="mt-1 font-mono text-2xl font-bold">{kpi.value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <h3 className="font-semibold text-gvmc-text mb-4">
          {t("Complaint queue", "ఫిర్యాదు క్యూ")}
        </h3>
        <ul className="space-y-3">
          {complaints.map((c) => (
            <li
              key={c.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-gvmc-border px-4 py-3"
            >
              <div>
                <p className="font-medium text-gvmc-text">{c.publicId}</p>
                <p className="text-sm text-gvmc-muted">
                  {c.category} · {c.status.replace("_", " ")}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/complaints/track?id=${c.publicId}`}>
                  <Button variant="secondary" size="sm">
                    {t("View", "చూడండి")}
                  </Button>
                </Link>
                {c.status !== "resolved" && (
                  <Button
                    variant="ai"
                    size="sm"
                    onClick={() => advanceStatus(c)}
                  >
                    {t("Advance status", "స్థితి ముందుకు")}
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <div className="mt-8">
        <GisDashboard compact />
      </div>
    </ModulePage>
  );
}
