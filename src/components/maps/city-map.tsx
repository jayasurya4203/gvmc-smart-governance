"use client";

import { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  CircleMarker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GVMC_MAP_CENTER, GVMC_DEFAULT_ZOOM, FLOOD_ZONE_GEOJSON } from "@/lib/gis";
import {
  getTileAttribution,
  getTileLayerUrl,
  getTileOptions,
} from "@/components/maps/map-tiles";
import type { GeoFeatureCollection } from "@/types/api";

const statusColors: Record<string, string> = {
  registered: "#64748b",
  assigned: "#3b82f6",
  dispatched: "#8b5cf6",
  in_progress: "#ea580c",
  resolved: "#16a34a",
};

function FixDefaultIcon() {
  useEffect(() => {
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
      ._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });
  }, []);
  return null;
}

function MapClickHandler({
  onSelect,
}: {
  onSelect?: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onSelect?.(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function MapFlyTo({
  lat,
  lng,
  zoom,
}: {
  lat: number;
  lng: number;
  zoom?: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], zoom ?? map.getZoom(), { duration: 0.8 });
  }, [lat, lng, zoom, map]);
  return null;
}

export interface CityMapProps {
  className?: string;
  height?: string;
  wardsGeojson?: GeoFeatureCollection | null;
  complaintsGeojson?: GeoFeatureCollection | null;
  officesGeojson?: GeoFeatureCollection | null;
  showFloodZones?: boolean;
  showWards?: boolean;
  showComplaints?: boolean;
  showOffices?: boolean;
  center?: { lat: number; lng: number };
  zoom?: number;
  flyTo?: { lat: number; lng: number; zoom?: number } | null;
  onComplaintClick?: (publicId: string) => void;
  onLocationSelect?: (lat: number, lng: number) => void;
  selectedLocation?: { lat: number; lng: number } | null;
}

export function CityMap({
  className = "",
  height = "min-h-[420px]",
  wardsGeojson,
  complaintsGeojson,
  officesGeojson,
  showFloodZones = true,
  showWards = true,
  showComplaints = true,
  showOffices = true,
  center = GVMC_MAP_CENTER,
  zoom = GVMC_DEFAULT_ZOOM,
  flyTo,
  onComplaintClick,
  onLocationSelect,
  selectedLocation,
}: CityMapProps) {
  const tileUrl = getTileLayerUrl();
  const tileOpts = getTileOptions();

  const wardStyle = useMemo(
    () => ({
      color: "#00bcd4",
      weight: 2,
      fillColor: "#0b3d91",
      fillOpacity: 0.12,
    }),
    [],
  );

  const floodStyle = useMemo(
    () => ({
      color: "#dc2626",
      weight: 2,
      fillColor: "#dc2626",
      fillOpacity: 0.2,
      dashArray: "4 4",
    }),
    [],
  );

  return (
    <div className={`relative z-0 overflow-hidden rounded-xl ${height} ${className}`}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        className="h-full w-full"
        style={{ position: "absolute", inset: 0 }}
        scrollWheelZoom
      >
        <FixDefaultIcon />
        {onLocationSelect && <MapClickHandler onSelect={onLocationSelect} />}
        {flyTo && <MapFlyTo {...flyTo} />}
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
        )}
        <TileLayer
          attribution={getTileAttribution()}
          url={tileUrl}
          {...tileOpts}
        />

        {showFloodZones && (
          <GeoJSON data={FLOOD_ZONE_GEOJSON as GeoJSON.GeoJsonObject} style={floodStyle} />
        )}

        {showWards && wardsGeojson && (
          <GeoJSON
            data={wardsGeojson as GeoJSON.GeoJsonObject}
            style={wardStyle}
            onEachFeature={(feature, layer) => {
              const p = feature.properties as Record<string, string>;
              layer.bindPopup(
                `<strong>${p.nameEn ?? p.id}</strong><br/>Zone: ${p.zone ?? ""}<br/>Cleanliness: ${p.cleanliness ?? "—"}%`,
              );
            }}
          />
        )}

        {showComplaints &&
          complaintsGeojson?.features.map((f, i) => {
            const coords = f.geometry.coordinates as [number, number];
            const p = f.properties;
            const status = String(p.status ?? "registered");
            const color = statusColors[status] ?? "#64748b";
            return (
              <CircleMarker
                key={`c-${p.publicId ?? i}`}
                center={[coords[1], coords[0]]}
                radius={8}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.85 }}
                eventHandlers={{
                  click: () => {
                    if (p.publicId && onComplaintClick) {
                      onComplaintClick(String(p.publicId));
                    }
                  },
                }}
              >
                <Popup>
                  <strong>{String(p.publicId)}</strong>
                  <br />
                  {String(p.category)}
                  <br />
                  <span style={{ color }}>{status.replace("_", " ")}</span>
                </Popup>
              </CircleMarker>
            );
          })}

        {showOffices &&
          officesGeojson?.features.map((f, i) => {
            const coords = f.geometry.coordinates as [number, number];
            const p = f.properties;
            return (
              <Marker key={`o-${p.id ?? i}`} position={[coords[1], coords[0]]}>
                <Popup>
                  <strong>{String(p.nameEn)}</strong>
                  <br />
                  {String(p.type)} — {String(p.address)}
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}
