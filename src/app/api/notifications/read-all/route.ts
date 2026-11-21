import { prisma } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api-utils";

export async function POST() {
  const session = await getSessionFromCookies();
  if (!session) return jsonError("Not authenticated", 401);

  await prisma.notification.updateMany({
    where: { userId: session.sub, read: false },
    data: { read: true },
  });

  return jsonOk({ success: true });
}
