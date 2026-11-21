import { prisma } from "@/lib/db";
import { jsonOk } from "@/lib/api-utils";

export async function GET() {
  const [activeComplaints, resolvedToday, wards] = await Promise.all([
    prisma.complaint.count({
      where: { status: { not: "resolved" } },
    }),
    prisma.complaint.count({
      where: {
        status: "resolved",
        updatedAt: { gte: startOfToday() },
      },
    }),
    prisma.ward.findMany({
      select: { nameEn: true, cleanliness: true },
      orderBy: { cleanliness: "desc" },
    }),
  ]);

  return jsonOk({
    cityStatus: {
      activeComplaints,
      resolvedToday,
      rainfallMm: 42,
      waterSupply: "Normal",
      emergencyLevel: "Watch",
    },
    wardCleanliness: wards.map((w) => ({
      ward: w.nameEn.split("—").pop()?.trim() ?? w.nameEn,
      score: w.cleanliness,
    })),
  });
}

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
