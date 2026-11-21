import { prisma } from "@/lib/db";
import { jsonOk } from "@/lib/api-utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const complaints = await prisma.complaint.findMany({
    where: {
      lat: { not: null },
      lng: { not: null },
      ...(status ? { status: status as never } : {}),
    },
    select: {
      id: true,
      publicId: true,
      category: true,
      status: true,
      lat: true,
      lng: true,
      wardId: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return jsonOk({
    complaints,
    geojson: {
      type: "FeatureCollection",
      features: complaints.map((c) => ({
        type: "Feature",
        properties: {
          id: c.id,
          publicId: c.publicId,
          category: c.category,
          status: c.status,
          wardId: c.wardId,
        },
        geometry: {
          type: "Point",
          coordinates: [c.lng!, c.lat!],
        },
      })),
    },
  });
}
