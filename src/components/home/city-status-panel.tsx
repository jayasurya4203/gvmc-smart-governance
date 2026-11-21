"use client";

import { useEffect, useState } from "react";
import { Activity, CloudRain, Droplets, Trash2, TriangleAlert } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { cityStatus as fallbackStatus, cityAlerts as fallbackAlerts } from "@/lib/mock-data";
import { apiGet } from "@/lib/api-client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AlertRow {
  id: string;
  type: string;
  messageEn: string;
  messageTe: string;
  time: string;
}

export function CityStatusPanel() {
  const { t } = useApp();
  const [status, setStatus] = useState(fallbackStatus);
  const [alerts, setAlerts] = useState<AlertRow[]>([]);

  useEffect(() => {
    apiGet<{
      cityStatus: typeof fallbackStatus;
      alerts?: AlertRow[];
    }>("/api/stats").then((res) => {
      if (res.ok) setStatus(res.data.cityStatus);
    });
    apiGet<{ alerts: AlertRow[] }>("/api/gis/alerts").then((res) => {
      if (res.ok) setAlerts(res.data.alerts);
    });
  }, []);

  const stats = [
    {
      icon: Activity,
      labelEn: "Active Complaints",
      labelTe: "సక్రియ ఫిర్యాదులు",
      value: status.activeComplaints.toLocaleString(),
      tone: "info" as const,
    },
    {
      icon: CloudRain,
      labelEn: "Rainfall (mm)",
      labelTe: "వర్షపాతం (మి.మీ)",
      value: String(status.rainfallMm),
      tone: "warning" as const,
    },
    {
      icon: Droplets,
      labelEn: "Water Supply",
      labelTe: "నీటి సరఫరా",
      value: status.waterSupply,
      tone: "success" as const,
    },
    {
      icon: TriangleAlert,
      labelEn: "Emergency Level",
      labelTe: "అత్యవసర స్థాయి",
      value: status.emergencyLevel,
      tone: "warning" as const,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h2 className="text-2xl font-bold text-gvmc-text">
        {t("Real-Time City Status", "రియల్-టైమ్ నగర స్థితి")}
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.labelEn} className="flex flex-col gap-3">
            <stat.icon className="h-6 w-6 text-gvmc-ai" />
            <p className="text-sm text-gvmc-muted font-telugu">
              {t(stat.labelEn, stat.labelTe)}
            </p>
            <p className="font-mono text-2xl font-bold text-gvmc-text">{stat.value}</p>
            <Badge tone={stat.tone}>{t("Live", "లైవ్")}</Badge>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <div className="flex items-center gap-2 mb-4">
          <Trash2 className="h-5 w-5 text-gvmc-success" />
          <h3 className="font-semibold">{t("Live Alerts Feed", "లైవ్ హెచ్చరికలు")}</h3>
        </div>
        <ul className="space-y-3">
          {(alerts.length > 0 ? alerts : fallbackAlerts).map((alert) => (
            <li
              key={alert.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-gvmc-border bg-gvmc-bg px-4 py-3"
            >
              <span className="text-sm">{t(alert.messageEn, alert.messageTe)}</span>
              <span className="text-xs text-gvmc-muted">{alert.time}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
