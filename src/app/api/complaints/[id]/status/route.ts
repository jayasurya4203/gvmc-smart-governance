import { prisma } from "@/lib/db";
import { getSessionFromCookies, requireRole } from "@/lib/auth";
import { jsonError, jsonOk, zodError } from "@/lib/api-utils";
import { updateComplaintStatusSchema } from "@/lib/validators";
import { serializeComplaint } from "@/lib/complaints";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const session = await getSessionFromCookies();
  if (!requireRole(session, ["OFFICER", "WORKER", "ADMIN"])) {
    return jsonError("Officer or worker access required", 403);
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = updateComplaintStatusSchema.safeParse(body);
  if (!parsed.success) return zodError(parsed.error);

  const existing = await prisma.complaint.findFirst({
    where: { OR: [{ id }, { publicId: id }] },
    include: { user: true },
  });
  if (!existing) return jsonError("Complaint not found", 404);

  const { status, noteEn, noteTe } = parsed.data;
  const complaint = await prisma.complaint.update({
    where: { id: existing.id },
    data: {
      status,
      events: {
        create: { status, noteEn, noteTe },
      },
    },
    include: {
      ward: true,
      events: { orderBy: { createdAt: "asc" } },
      user: { select: { id: true, name: true, email: true } },
    },
  });

  if (existing.userId) {
    await prisma.notification.create({
      data: {
        userId: existing.userId,
        type: "complaint",
        titleEn: "Complaint status updated",
        titleTe: "ఫిర్యాదు స్థితి నవీకరించబడింది",
        bodyEn: `${existing.publicId} is now: ${status.replace("_", " ")}`,
        bodyTe: `${existing.publicId} — ${status}`,
        link: `/complaints/track?id=${existing.publicId}`,
      },
    });
  }

  return jsonOk({ complaint: serializeComplaint(complaint) });
}
