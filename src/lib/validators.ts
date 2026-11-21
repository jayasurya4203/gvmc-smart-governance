import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).max(100),
  phone: z.string().optional(),
  role: z.enum(["CITIZEN", "OFFICER", "WORKER", "ADMIN"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const createComplaintSchema = z.object({
  category: z.string().min(2).max(80),
  description: z.string().max(2000).optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  address: z.string().max(500).optional(),
  wardId: z.string().optional(),
  mediaUrls: z.array(z.string().url()).max(5).optional(),
});

export const updateComplaintStatusSchema = z.object({
  status: z.enum([
    "registered",
    "assigned",
    "dispatched",
    "in_progress",
    "resolved",
  ]),
  noteEn: z.string().max(500).optional(),
  noteTe: z.string().max(500).optional(),
});
