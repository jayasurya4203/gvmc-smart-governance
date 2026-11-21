import { prisma } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/auth";
import { jsonError, jsonOk } from "@/lib/api-utils";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(_request: Request, { params }: Params) {
  const session = await getSessionFromCookies();
  if (!session) return jsonError("Not authenticated", 401);

  const { id } = await params;
  const notification = await prisma.notification.findFirst({
    where: { id, userId: session.sub },
  });
  if (!notification) return jsonError("Notification not found", 404);

  const updated = await prisma.notification.update({
    where: { id },
    data: { read: true },
  });

  return jsonOk({ notification: updated });
}
