import { prisma } from "@/lib/db";
import { jsonError, jsonOk } from "@/lib/api-utils";
import { serializeComplaint } from "@/lib/complaints";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const complaint = await prisma.complaint.findFirst({
    where: {
      OR: [{ id }, { publicId: id }],
    },
    include: {
      ward: true,
      events: { orderBy: { createdAt: "asc" } },
      user: { select: { id: true, name: true, email: true } },
    },
  });

  if (!complaint) return jsonError("Complaint not found", 404);
  return jsonOk({ complaint: serializeComplaint(complaint) });
}
