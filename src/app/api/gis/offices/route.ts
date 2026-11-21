import { prisma } from "@/lib/db";
import { jsonOk } from "@/lib/api-utils";

export async function GET() {
  const offices = await prisma.municipalOffice.findMany();
  return jsonOk({
    offices,
    geojson: {
      type: "FeatureCollection",
      features: offices.map((o) => ({
        type: "Feature",
        properties: {
          id: o.id,
          nameEn: o.nameEn,
          nameTe: o.nameTe,
          type: o.type,
          address: o.address,
        },
        geometry: {
          type: "Point",
          coordinates: [o.lng, o.lat],
        },
      })),
    },
  });
}
