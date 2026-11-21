"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Circle, Search } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { apiGet } from "@/lib/api-client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { ApiComplaint } from "@/types/api";
import { CityMapLoader } from "@/components/maps/city-map-loader";

export function ComplaintTracker() {
  const { t } = useApp();
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") ?? "GVMC-2026-1842";

  const [query, setQuery] = useState(initialId);
  const [complaint, setComplaint] = useState<ApiComplaint | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchComplaint = useCallback(async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setError(null);
    const res = await apiGet<{ complaint: ApiComplaint }>(
      `/api/complaints/${encodeURIComponent(id.trim())}`,
    );
    setLoading(false);
    if (!res.ok) {
      setComplaint(null);
      setError(res.error);
      return;
    }
    setComplaint(res.data.complaint);
  }, []);

  useEffect(() => {
    fetchComplaint(initialId);
  }, [initialId, fetchComplaint]);

  return (
    <div className="space-y-6">
      <form
        className="flex flex-wrap gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          fetchComplaint(query);
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("Complaint ID e.g. GVMC-2026-1842", "ఫిర్యాదు ID")}
          className="flex-1 min-w-[200px] rounded-lg border border-gvmc-border bg-gvmc-surface px-3 py-2 text-sm"
        />
        <Button variant="ai" type="submit" disabled={loading} className="gap-2">
          <Search className="h-4 w-4" />
          {loading ? t("Loading…", "లోడ్…") : t("Track", "ట్రాక్")}
        </Button>
      </form>

      {error && (
        <p className="text-sm text-gvmc-danger">{error}</p>
      )}

      {complaint && (
        <>
          <div>
            <h2 className="text-xl font-bold text-gvmc-text">
              {complaint.publicId}
            </h2>
            <p className="text-sm text-gvmc-muted">
              {complaint.category}
              {complaint.address ? ` · ${complaint.address}` : ""}
            </p>
          </div>

          <Card>
            <ol className="space-y-0 p-4">
              {complaint.timeline.map((step, i) => (
                <li key={step.status} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    {step.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-gvmc-success" />
                    ) : (
                      <Circle className="h-6 w-6 text-gvmc-muted" />
                    )}
                    {i < complaint.timeline.length - 1 && (
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

          {complaint.lat != null && complaint.lng != null && (
            <div>
              <p className="text-sm font-medium text-gvmc-text mb-2">
                {t("Complaint location", "ఫిర్యాదు స్థానం")}
              </p>
              <CityMapLoader
                height="min-h-[240px]"
                showWards={false}
                showComplaints={false}
                showOffices={false}
                showFloodZones={false}
                center={{ lat: complaint.lat, lng: complaint.lng }}
                zoom={15}
                selectedLocation={{ lat: complaint.lat, lng: complaint.lng }}
              />
            </div>
          )}

          <Link href="/maps">
            <Button variant="secondary">
              {t("View on city map", "నగర పటంపై చూడండి")}
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
