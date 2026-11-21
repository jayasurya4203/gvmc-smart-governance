import { prisma } from "@/lib/db";
import { jsonOk } from "@/lib/api-utils";

export async function GET() {
  const alerts = await prisma.cityAlert.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return jsonOk({
    alerts: alerts.map((a) => ({
      id: a.id,
      type: a.type,
      messageEn: a.messageEn,
      messageTe: a.messageTe,
      time: formatRelativeTime(a.createdAt),
      createdAt: a.createdAt.toISOString(),
    })),
  });
}

function formatRelativeTime(date: Date) {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} days ago`;
}
