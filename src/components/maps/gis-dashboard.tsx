"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Layers, MapPin } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { apiGet } from "@/lib/api-client";
import { CityMapLoader } from "@/components/maps/city-map-loader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GeoFeatureCollection } from "@/types/api";

export function GisDashboard({ compact = false }: { compact?: boolean }) {
  const { t } = useApp();
  const [wards, setWards] = useState<GeoFeatureCollection | null>(null);
  const [complaints, setComplaints] = useState<GeoFeatureCollection | null>(
    null,
  );
  const [offices, setOffices] = useState<GeoFeatureCollection | null>(null);
  const [layers, setLayers] = useState({
    wards: true,
    complaints: true,
    offices: true,
    flood: true,
  });
  const [flyTo, setFlyTo] = useState<{
    lat: number;
    lng: number;
    zoom?: number;
  } | null>(null);
  const [insight, setInsight] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      apiGet<{ geojson: GeoFeatureCollection }>("/api/gis/wards"),
      apiGet<{ geojson: GeoFeatureCollection }>("/api/gis/complaints"),
      apiGet<{ geojson: GeoFeatureCollection }>("/api/gis/offices"),
    ]).then(([w, c, o]) => {
      if (w.ok) setWards(w.data.geojson);
      if (c.ok) {
        setComplaints(c.data.geojson);
        const garbage = c.data.geojson.features.filter((f) =>
          String(f.properties.category ?? "")
            .toLowerCase()
            .includes("garbage"),
        );
        if (garbage.length >= 2) {
          setInsight(
            t(
              "High garbage complaints detected in Gajuwaka",
              "గాజువాకలో అధిక చెత్త ఫిర్యాదులు",
            ),
          );
        } else {
          setInsight(
            t(
              "Live complaint markers synced from municipal database",
              "మున్సిపల్ డేటాబేస్ నుండి లైవ్ మార్కర్లు",
            ),
          );
        }
      }
      if (o.ok) setOffices(o.data.geojson);
    });
  }, [t]);

  const onComplaintClick = useCallback((publicId: string) => {
    const feature = complaints?.features.find(
      (f) => f.properties.publicId === publicId,
    );
    if (feature) {
      const [lng, lat] = feature.geometry.coordinates as [number, number];
      setFlyTo({ lat, lng, zoom: 16 });
    }
  }, [complaints]);

  const mapHeight = compact ? "min-h-[320px]" : "min-h-[480px]";

  return (
    <div className={compact ? "" : "mx-auto max-w-7xl px-4 py-4 sm:px-6"}>
      {!compact && (
        <h2 className="text-2xl font-bold text-gvmc-text mb-4">
          {t("GIS Smart Maps", "జిఐఎస్ స్మార్ట్ పటాలు")}
        </h2>
      )}

      <Card className="overflow-hidden p-0">
        <div className="flex flex-wrap items-center gap-2 border-b border-gvmc-border px-4 py-3">
          <Layers className="h-4 w-4 text-gvmc-ai" />
          <span className="text-sm font-medium text-gvmc-text">
            {t("Layers", "పొరలు")}
          </span>
          {(
            [
              ["wards", t("Wards", "వార్డులు")],
              ["complaints", t("Complaints", "ఫిర్యాదులు")],
              ["offices", t("Offices", "కార్యాలయాలు")],
              ["flood", t("Flood zones", "వరద ప్రాంతాలు")],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() =>
                setLayers((l) => ({ ...l, [key]: !l[key] }))
              }
              className={`rounded-lg px-2 py-1 text-xs font-medium transition ${
                layers[key]
                  ? "bg-gvmc-primary text-white"
                  : "bg-gvmc-bg text-gvmc-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <CityMapLoader
          height={mapHeight}
          wardsGeojson={wards}
          complaintsGeojson={complaints}
          officesGeojson={offices}
          showWards={layers.wards}
          showComplaints={layers.complaints}
          showOffices={layers.offices}
          showFloodZones={layers.flood}
          flyTo={flyTo}
          onComplaintClick={onComplaintClick}
        />

        <div className="flex flex-wrap items-end justify-between gap-4 p-4">
          <div className="glass-card rounded-xl px-4 py-3 max-w-lg">
            <p className="text-sm font-semibold text-gvmc-text flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gvmc-ai" />
              {insight ?? t("Loading insights…", "అంతర్దృష్టి లోడ్…")}
            </p>
            <Badge tone="ai" className="mt-2">
              {t("AI Insight", "ఏఐ అంతర్దృష్టి")}
            </Badge>
          </div>
          {!compact && (
            <Link href="/complaints/track">
              <Button variant="secondary">{t("Track complaint", "ఫిర్యాదు ట్రాక్")}</Button>
            </Link>
          )}
        </div>
      </Card>
    </div>
  );
}
