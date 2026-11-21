export type UiMode = "light" | "dark" | "emergency";
export type Language = "en" | "te" | "hi";

export type UserRole = "CITIZEN" | "OFFICER" | "WORKER" | "ADMIN";

export type ComplaintStatus =
  | "registered"
  | "assigned"
  | "dispatched"
  | "in_progress"
  | "resolved";

export interface QuickAction {
  id: string;
  icon: string;
  href: string;
  labelEn: string;
  labelTe: string;
}

export interface CityAlert {
  id: string;
  type: "info" | "warning" | "emergency" | "success";
  messageEn: string;
  messageTe: string;
  time: string;
}

export interface ComplaintTimelineStep {
  status: ComplaintStatus;
  labelEn: string;
  labelTe: string;
  completed: boolean;
  timestamp?: string;
}
