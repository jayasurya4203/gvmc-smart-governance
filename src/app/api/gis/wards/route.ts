import { prisma } from "@/lib/db";
import { jsonOk } from "@/lib/api-utils";
import { parseWardBoundary } from "@/lib/gis";

export async function GET() {
  const wards = await prisma.ward.findMany({ orderBy: { nameEn: "asc" } });

  const featureCollection = {
    type: "FeatureCollection" as const,
    features: wards.map((w) => ({
      type: "Feature" as const,
      properties: {
        id: w.id,
        nameEn: w.nameEn,
        nameTe: w.nameTe,
        zone: w.zone,
        cleanliness: w.cleanliness,
      },
      geometry: parseWardBoundary(w.boundaryGeo),
    })),
  };

  return jsonOk({
    wards: wards.map((w) => ({
      id: w.id,
      nameEn: w.nameEn,
      nameTe: w.nameTe,
      zone: w.zone,
      centerLat: w.centerLat,
      centerLng: w.centerLng,
      cleanliness: w.cleanliness,
    })),
    geojson: featureCollection,
  });
}
