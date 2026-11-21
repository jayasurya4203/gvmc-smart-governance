import type { Prisma } from "@prisma/client";
import type { ComplaintStatus } from "@/types";
import { prisma } from "@/lib/db";

const TIMELINE_LABELS: Record<
  ComplaintStatus,
  { labelEn: string; labelTe: string }
> = {
  registered: {
    labelEn: "Complaint Registered",
    labelTe: "ఫిర్యాదు నమోదు",
  },
  assigned: { labelEn: "Officer Assigned", labelTe: "అధికారి నియమించబడింది" },
  dispatched: {
    labelEn: "Worker Dispatched",
    labelTe: "వర్కర్ పంపబడింది",
  },
  in_progress: {
    labelEn: "Repair In Progress",
    labelTe: "మరమ్ము జరుగుతోంది",
  },
  resolved: {
    labelEn: "Resolved Successfully",
    labelTe: "విజయవంతంగా పరిష్కరించబడింది",
  },
};

const STATUS_ORDER: ComplaintStatus[] = [
  "registered",
  "assigned",
  "dispatched",
  "in_progress",
  "resolved",
];

export async function generatePublicId() {
  const year = new Date().getFullYear();
  const count = await prisma.complaint.count();
  return `GVMC-${year}-${String(count + 1).padStart(4, "0")}`;
}

function haversineMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
) {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function findDuplicateComplaints(params: {
  category: string;
  lat?: number;
  lng?: number;
  withinMeters?: number;
}) {
  const { category, lat, lng, withinMeters = 75 } = params;
  if (lat == null || lng == null) return [];

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recent = await prisma.complaint.findMany({
    where: {
      category,
      lat: { not: null },
      lng: { not: null },
      status: { not: "resolved" },
      createdAt: { gte: since },
    },
    select: {
      id: true,
      publicId: true,
      lat: true,
      lng: true,
      status: true,
      createdAt: true,
    },
  });

  return recent.filter((c) => {
    if (c.lat == null || c.lng == null) return false;
    return haversineMeters(lat, lng, c.lat, c.lng) <= withinMeters;
  });
}

export function buildTimeline(
  currentStatus: ComplaintStatus,
  events: { status: string; createdAt: Date }[],
) {
  const currentIdx = STATUS_ORDER.indexOf(currentStatus);
  return STATUS_ORDER.map((status) => {
    const event = events.find((e) => e.status === status);
    const idx = STATUS_ORDER.indexOf(status as ComplaintStatus);
    const labels = TIMELINE_LABELS[status];
    return {
      status,
      labelEn: labels.labelEn,
      labelTe: labels.labelTe,
      completed: idx <= currentIdx,
      timestamp: event
        ? event.createdAt.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : undefined,
    };
  });
}

export type ComplaintWithRelations = Prisma.ComplaintGetPayload<{
  include: {
    ward: true;
    events: true;
    user: { select: { id: true; name: true; email: true } };
  };
}>;

export function serializeComplaint(complaint: ComplaintWithRelations) {
  return {
    id: complaint.id,
    publicId: complaint.publicId,
    category: complaint.category,
    description: complaint.description,
    status: complaint.status,
    lat: complaint.lat,
    lng: complaint.lng,
    address: complaint.address,
    ward: complaint.ward,
    user: complaint.user,
    mediaUrls: complaint.mediaUrls
      ? (JSON.parse(complaint.mediaUrls) as string[])
      : [],
    createdAt: complaint.createdAt.toISOString(),
    updatedAt: complaint.updatedAt.toISOString(),
    timeline: buildTimeline(
      complaint.status as ComplaintStatus,
      complaint.events.map((e) => ({
        status: e.status,
        createdAt: e.createdAt,
      })),
    ),
    events: complaint.events.map((e) => ({
      id: e.id,
      status: e.status,
      noteEn: e.noteEn,
      noteTe: e.noteTe,
      createdAt: e.createdAt.toISOString(),
    })),
  };
}
