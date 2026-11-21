import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/** Visakhapatnam city center */
const CITY_CENTER = { lat: 17.6868, lng: 83.2185 };

function wardPolygon(
  id: string,
  centerLat: number,
  centerLng: number,
  size = 0.012,
) {
  const d = size / 2;
  const coords = [
    [centerLng - d, centerLat - d],
    [centerLng + d, centerLat - d],
    [centerLng + d, centerLat + d],
    [centerLng - d, centerLat + d],
    [centerLng - d, centerLat - d],
  ];
  return JSON.stringify({
    type: "Polygon",
    coordinates: [coords],
  });
}

const wards = [
  {
    id: "ward-12",
    nameEn: "Ward 12 — MVP Colony",
    nameTe: "వార్డ్ 12 — ఎంవీపీ కాలనీ",
    zone: "North",
    centerLat: 17.742,
    centerLng: 83.312,
    cleanliness: 85,
  },
  {
    id: "ward-14",
    nameEn: "Ward 14 — Gajuwaka",
    nameTe: "వార్డ్ 14 — గాజువాక",
    zone: "South",
    centerLat: 17.62,
    centerLng: 83.205,
    cleanliness: 61,
  },
  {
    id: "ward-8",
    nameEn: "Ward 8 — Madhurawada",
    nameTe: "వార్డ్ 8 — మధురవాడ",
    zone: "East",
    centerLat: 17.78,
    centerLng: 83.36,
    cleanliness: 78,
  },
  {
    id: "ward-5",
    nameEn: "Ward 5 — Dwarakanagar",
    nameTe: "వార్డ్ 5 — ద్వారకానగర్",
    zone: "Central",
    centerLat: 17.71,
    centerLng: 83.28,
    cleanliness: 72,
  },
];

async function main() {
  const passwordHash = await bcrypt.hash("gvmc123", 10);

  for (const w of wards) {
    await prisma.ward.upsert({
      where: { id: w.id },
      create: {
        ...w,
        boundaryGeo: wardPolygon(w.id, w.centerLat, w.centerLng),
      },
      update: {
        nameEn: w.nameEn,
        nameTe: w.nameTe,
        zone: w.zone,
        cleanliness: w.cleanliness,
        boundaryGeo: wardPolygon(w.id, w.centerLat, w.centerLng),
      },
    });
  }

  const citizen = await prisma.user.upsert({
    where: { email: "citizen@gvmc.demo" },
    create: {
      email: "citizen@gvmc.demo",
      name: "Surya",
      passwordHash,
      role: "CITIZEN",
      wardId: "ward-12",
    },
    update: { passwordHash, wardId: "ward-12" },
  });

  const officer = await prisma.user.upsert({
    where: { email: "officer@gvmc.demo" },
    create: {
      email: "officer@gvmc.demo",
      name: "Municipal Officer",
      passwordHash,
      role: "OFFICER",
    },
    update: { passwordHash },
  });

  const worker = await prisma.user.upsert({
    where: { email: "worker@gvmc.demo" },
    create: {
      email: "worker@gvmc.demo",
      name: "Field Worker",
      passwordHash,
      role: "WORKER",
      wardId: "ward-12",
    },
    update: { passwordHash, wardId: "ward-12" },
  });

  await prisma.user.upsert({
    where: { email: "admin@gvmc.demo" },
    create: {
      email: "admin@gvmc.demo",
      name: "System Admin",
      passwordHash,
      role: "ADMIN",
    },
    update: { passwordHash },
  });

  const offices = [
    {
      nameEn: "GVMC Head Office",
      nameTe: "GVMC ప్రధాన కార్యాలయం",
      type: "headquarters",
      lat: CITY_CENTER.lat,
      lng: CITY_CENTER.lng,
      address: "GVMC Complex, Visakhapatnam",
      wardId: "ward-5",
    },
    {
      nameEn: "MVP Colony Ward Office",
      nameTe: "ఎంవీపీ కాలనీ వార్డ్ కార్యాలయం",
      type: "ward",
      lat: 17.742,
      lng: 83.312,
      address: "MVP Colony Main Road",
      wardId: "ward-12",
    },
    {
      nameEn: "Gajuwaka Zone Office",
      nameTe: "గాజువాక జోన్ కార్యాలయం",
      type: "zone",
      lat: 17.62,
      lng: 83.205,
      address: "Gajuwaka Industrial Area",
      wardId: "ward-14",
    },
  ];

  await prisma.municipalOffice.deleteMany();
  for (const o of offices) {
    await prisma.municipalOffice.create({ data: o });
  }

  await prisma.cityAlert.deleteMany();
  await prisma.cityAlert.createMany({
    data: [
      {
        type: "warning",
        messageEn:
          "Heavy rainfall alert — Ward 12 drainage monitoring active",
        messageTe: "భారీ వర్షం హెచ్చరిక — వార్డ్ 12 డ్రైనేజ్ పర్యవేక్షణ",
      },
      {
        type: "info",
        messageEn: "Traffic diversion near RK Beach until 8 PM",
        messageTe: "ఆర్కే బీచ్ వద్ద ట్రాఫిక్ మళ్లింపు — రాత్రి 8 వరకు",
      },
      {
        type: "success",
        messageEn: "Sanitation sweep completed in Gajuwaka zone",
        messageTe: "గాజువాకలో శుభ్రతా స్వీప్ పూర్తి",
      },
    ],
  });

  const existing = await prisma.complaint.findUnique({
    where: { publicId: "GVMC-2026-1842" },
  });

  if (!existing) {
    const complaint = await prisma.complaint.create({
      data: {
        publicId: "GVMC-2026-1842",
        category: "Pothole repair",
        description: "Large pothole near MVP Colony junction causing traffic risk",
        status: "in_progress",
        lat: 17.7412,
        lng: 83.3115,
        address: "MVP Colony Main Road, Visakhapatnam",
        wardId: "ward-12",
        userId: citizen.id,
        events: {
          create: [
            { status: "registered", noteEn: "Citizen reported via app" },
            { status: "assigned", noteEn: "Assigned to Ward 12 officer" },
            { status: "dispatched", noteEn: "Road crew dispatched" },
            { status: "in_progress", noteEn: "Asphalt repair started" },
          ],
        },
      },
    });

    await prisma.complaint.create({
      data: {
        publicId: "GVMC-2026-1843",
        category: "Garbage collection",
        description: "Overflowing bins near market area",
        status: "registered",
        lat: 17.6195,
        lng: 83.2062,
        address: "Gajuwaka Market Road",
        wardId: "ward-14",
        userId: citizen.id,
        events: { create: [{ status: "registered" }] },
      },
    });

    await prisma.notification.createMany({
      data: [
        {
          userId: citizen.id,
          type: "complaint",
          titleEn: "Complaint update",
          titleTe: "ఫిర్యాదు నవీకరణ",
          bodyEn: `Worker dispatched for ${complaint.publicId}`,
          bodyTe: `వర్కర్ పంపబడింది — ${complaint.publicId}`,
          link: `/complaints/track?id=${complaint.publicId}`,
        },
        {
          userId: citizen.id,
          type: "alert",
          titleEn: "Rainfall alert",
          titleTe: "వర్షం హెచ్చరిక",
          bodyEn: "Heavy rainfall expected in Ward 12 — stay alert",
          bodyTe: "వార్డ్ 12లో భారీ వర్షం అంచనా",
          link: "/emergency",
        },
        {
          userId: officer.id,
          type: "system",
          titleEn: "New complaint cluster",
          titleTe: "కొత్త ఫిర్యాదు క్లస్టర్",
          bodyEn: "3 garbage complaints in Gajuwaka in the last hour",
          bodyTe: "గాజువాకలో గంటలో 3 చెత్త ఫిర్యాదులు",
          link: "/maps",
        },
        {
          userId: worker.id,
          type: "task",
          titleEn: "New task assigned",
          titleTe: "కొత్త పని నియమించబడింది",
          bodyEn: "Pothole repair — MVP Colony (GVMC-2026-1842)",
          bodyTe: "పాట్‌హోల్ మరమ్ము — ఎంవీపీ కాలనీ",
          link: "/worker",
        },
      ],
    });
  }

  console.log("Seed complete. Demo logins (password: gvmc123):");
  console.log("  citizen@gvmc.demo, officer@gvmc.demo, worker@gvmc.demo, admin@gvmc.demo");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
