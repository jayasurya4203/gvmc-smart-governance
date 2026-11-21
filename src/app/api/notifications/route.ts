import { prisma } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api-utils";

export async function GET(request: Request) {
  const session = await getSessionFromCookies();
  if (!session) return jsonError("Not authenticated", 401);

  const { searchParams } = new URL(request.url);
  const unreadOnly = searchParams.get("unread") === "true";
  const limit = Math.min(Number(searchParams.get("limit") ?? 30), 50);

  const notifications = await prisma.notification.findMany({
    where: {
      userId: session.sub,
      ...(unreadOnly ? { read: false } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  const unreadCount = await prisma.notification.count({
    where: { userId: session.sub, read: false },
  });

  return jsonOk({
    notifications: notifications.map((n) => ({
      id: n.id,
      type: n.type,
      titleEn: n.titleEn,
      titleTe: n.titleTe,
      bodyEn: n.bodyEn,
      bodyTe: n.bodyTe,
      link: n.link,
      read: n.read,
      createdAt: n.createdAt.toISOString(),
    })),
    unreadCount,
  });
}
