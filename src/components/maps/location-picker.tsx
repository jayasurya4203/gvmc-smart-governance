"use client";

import { useCallback, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { CityMapLoader } from "@/components/maps/city-map-loader";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/app-context";
import { GVMC_MAP_CENTER } from "@/lib/gis";

export interface LocationValue {
  lat: number;
  lng: number;
  address?: string;
}

interface LocationPickerProps {
  value: LocationValue | null;
  onChange: (value: LocationValue) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const { t } = useApp();
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const useGps = useCallback(() => {
    if (!navigator.geolocation) {
      setError(t("Geolocation not supported", "జియోలొకేషన్ మద్దతు లేదు"));
      return;
    }
    setLocating(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          address: t("GPS location captured", "జిపిఎస్ స్థానం సేకరించబడింది"),
        });
        setLocating(false);
      },
      () => {
        setError(t("Could not get GPS location", "జిపిఎస్ స్థానం లభించలేదు"));
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 12000 },
    );
  }, [onChange, t]);

  const center = value ?? GVMC_MAP_CENTER;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="ai"
          size="sm"
          className="gap-2"
          onClick={useGps}
          disabled={locating}
        >
          <Navigation className="h-4 w-4" />
          {locating
            ? t("Locating…", "స్థానం గుర్తిస్తోంది…")
            : t("Use my GPS", "నా జిపిఎస్ ఉపయోగించు")}
        </Button>
        {value && (
          <p className="flex items-center gap-1 text-sm text-gvmc-muted">
            <MapPin className="h-4 w-4 text-gvmc-ai" />
            {value.lat.toFixed(5)}, {value.lng.toFixed(5)}
          </p>
        )}
      </div>
      {error && <p className="text-sm text-gvmc-danger">{error}</p>}
      <p className="text-xs text-gvmc-muted">
        {t(
          "Tap the map to set location, or use GPS.",
          "స్థానం సెట్ చేయడానికి పటంపై నొక్కండి లేదా జిపిఎస్ ఉపయోగించండి.",
        )}
      </p>
      <CityMapLoader
        height="min-h-[280px]"
        showWards={false}
        showComplaints={false}
        showOffices={false}
        showFloodZones={false}
        center={center}
        zoom={14}
        flyTo={value ? { lat: value.lat, lng: value.lng, zoom: 15 } : null}
        selectedLocation={value}
        onLocationSelect={(lat, lng) =>
          onChange({
            lat,
            lng,
            address: value?.address,
          })
        }
      />
      <input
        type="text"
        className="w-full rounded-lg border border-gvmc-border bg-gvmc-surface px-3 py-2 text-sm text-gvmc-text"
        placeholder={t("Address or landmark (optional)", "చిరునామా (ఐచ్ఛికం)")}
        value={value?.address ?? ""}
        onChange={(e) => {
          if (value) onChange({ ...value, address: e.target.value });
        }}
      />
    </div>
  );
}
