import type { ComplaintStatus } from "@/types";

export interface ApiUser {
  id: string;
  email: string;
  name: string;
  role: "CITIZEN" | "OFFICER" | "WORKER" | "ADMIN";
  phone?: string | null;
  wardId?: string | null;
  ward?: {
    id: string;
    nameEn: string;
    nameTe: string;
    zone: string;
  } | null;
}

export interface ApiNotification {
  id: string;
  type: string;
  titleEn: string;
  titleTe: string;
  bodyEn: string;
  bodyTe: string;
  link?: string | null;
  read: boolean;
  createdAt: string;
}

export interface ApiComplaint {
  id: string;
  publicId: string;
  category: string;
  description?: string | null;
  status: ComplaintStatus;
  lat?: number | null;
  lng?: number | null;
  address?: string | null;
  ward?: {
    id: string;
    nameEn: string;
    nameTe: string;
    zone: string;
  } | null;
  mediaUrls: string[];
  createdAt: string;
  timeline: {
    status: ComplaintStatus;
    labelEn: string;
    labelTe: string;
    completed: boolean;
    timestamp?: string;
  }[];
}

export interface GeoFeatureCollection {
  type: "FeatureCollection";
  features: {
    type: "Feature";
    properties: Record<string, unknown>;
    geometry: {
      type: string;
      coordinates: unknown;
    };
  }[];
}
