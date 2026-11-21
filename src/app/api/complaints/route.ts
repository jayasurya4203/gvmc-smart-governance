import { prisma } from "@/lib/db";
import { getSessionFromCookies } from "@/lib/auth";
import { jsonError, jsonOk, zodError } from "@/lib/api-utils";
import { createComplaintSchema } from "@/lib/validators";
import {
  findDuplicateComplaints,
  generatePublicId,
  serializeComplaint,
} from "@/lib/complaints";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const wardId = searchParams.get("wardId");
  const limit = Math.min(Number(searchParams.get("limit") ?? 50), 100);

  const complaints = await prisma.complaint.findMany({
    where: {
      ...(status ? { status: status as never } : {}),
      ...(wardId ? { wardId } : {}),
    },
    include: {
      ward: true,
      events: { orderBy: { createdAt: "asc" } },
      user: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return jsonOk({
    complaints: complaints.map(serializeComplaint),
  });
}

export async function POST(request: Request) {
  try {
    const session = await getSessionFromCookies();
    const body = await request.json();
    const parsed = createComplaintSchema.safeParse(body);
    if (!parsed.success) return zodError(parsed.error);

    const { category, description, lat, lng, address, wardId, mediaUrls } =
      parsed.data;

    const duplicates = await findDuplicateComplaints({
      category,
      lat,
      lng,
    });

    const publicId = await generatePublicId();
    const complaint = await prisma.complaint.create({
      data: {
        publicId,
        category,
        description,
        lat,
        lng,
        address,
        wardId,
        userId: session?.sub,
        mediaUrls: mediaUrls ? JSON.stringify(mediaUrls) : null,
        events: { create: { status: "registered" } },
      },
      include: {
        ward: true,
        events: { orderBy: { createdAt: "asc" } },
        user: { select: { id: true, name: true, email: true } },
      },
    });

    if (session?.sub) {
      await prisma.notification.create({
        data: {
          userId: session.sub,
          type: "complaint",
          titleEn: "Complaint registered",
          titleTe: "ఫిర్యాదు నమోదు అయింది",
          bodyEn: `Your complaint ${publicId} has been registered.`,
          bodyTe: `మీ ఫిర్యాదు ${publicId} నమోదు అయింది.`,
          link: `/complaints/track?id=${publicId}`,
        },
      });
    }

    return jsonOk(
      {
        complaint: serializeComplaint(complaint),
        duplicates: duplicates.map((d) => ({
          publicId: d.publicId,
          status: d.status,
        })),
        duplicateWarning:
          duplicates.length > 0
            ? "Similar open complaints exist nearby. Consider tracking an existing case."
            : null,
      },
      201,
    );
  } catch (e) {
    console.error(e);
    return jsonError("Failed to create complaint", 500);
  }
}
