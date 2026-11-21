import type { CityAlert, ComplaintTimelineStep, QuickAction } from "@/types";

export const demoUser = { name: "Surya", ward: "Ward 12 — MVP Colony" };

export const quickActions: QuickAction[] = [
  {
    id: "register",
    icon: "FilePlus",
    href: "/complaints/new",
    labelEn: "Register Complaint",
    labelTe: "ఫిర్యాదు నమోదు",
  },
  {
    id: "track",
    icon: "Search",
    href: "/complaints/track",
    labelEn: "Track Complaint",
    labelTe: "ఫిర్యాదు ట్రాక్",
  },
  {
    id: "emergency",
    icon: "Siren",
    href: "/emergency",
    labelEn: "Emergency Help",
    labelTe: "అత్యవసర సహాయం",
  },
  {
    id: "offices",
    icon: "MapPin",
    href: "/maps",
    labelEn: "Nearby Offices",
    labelTe: "సమీప కార్యాలయాలు",
  },
  {
    id: "voice",
    icon: "Mic",
    href: "/voice",
    labelEn: "Voice Assistant",
    labelTe: "వాయిస్ సహాయకుడు",
  },
  {
    id: "taxes",
    icon: "CreditCard",
    href: "/knowledge?q=property+tax",
    labelEn: "Pay Taxes",
    labelTe: "పన్నులు చెల్లించు",
  },
  {
    id: "water",
    icon: "Droplets",
    href: "/knowledge?q=water+services",
    labelEn: "Water Services",
    labelTe: "నీటి సేవలు",
  },
  {
    id: "birth",
    icon: "Baby",
    href: "/knowledge?q=birth+certificate",
    labelEn: "Birth Certificates",
    labelTe: "జనన ధృవీకరణ",
  },
];

export const cityAlerts: CityAlert[] = [
  {
    id: "1",
    type: "warning",
    messageEn: "Heavy rainfall alert — Ward 12 drainage monitoring active",
    messageTe: "భారీ వర్షం హెచ్చరిక — వార్డ్ 12 డ్రైనేజ్ పర్యవేక్షణ",
    time: "2 min ago",
  },
  {
    id: "2",
    type: "info",
    messageEn: "Traffic diversion near RK Beach until 8 PM",
    messageTe: "ఆర్కే బీచ్ వద్ద ట్రాఫిక్ మళ్లింపు — రాత్రి 8 వరకు",
    time: "15 min ago",
  },
  {
    id: "3",
    type: "success",
    messageEn: "Sanitation sweep completed in Gajuwaka zone",
    messageTe: "గాజువాకలో శుభ్రతా స్వీప్ పూర్తి",
    time: "1 hr ago",
  },
];

export const cityStatus = {
  activeComplaints: 2847,
  resolvedToday: 412,
  rainfallMm: 42,
  waterSupply: "Normal",
  emergencyLevel: "Watch",
};

export const complaintTimeline: ComplaintTimelineStep[] = [
  {
    status: "registered",
    labelEn: "Complaint Registered",
    labelTe: "ఫిర్యాదు నమోదు",
    completed: true,
    timestamp: "10:24 AM",
  },
  {
    status: "assigned",
    labelEn: "Officer Assigned",
    labelTe: "అధికారి నియమించబడింది",
    completed: true,
    timestamp: "10:45 AM",
  },
  {
    status: "dispatched",
    labelEn: "Worker Dispatched",
    labelTe: "వర్కర్ పంపబడింది",
    completed: true,
    timestamp: "11:10 AM",
  },
  {
    status: "in_progress",
    labelEn: "Repair In Progress",
    labelTe: "మరమ్ము జరుగుతోంది",
    completed: false,
  },
  {
    status: "resolved",
    labelEn: "Resolved Successfully",
    labelTe: "విజయవంతంగా పరిష్కరించబడింది",
    completed: false,
  },
];

export const aiSuggestions = [
  "Report a pothole near my location",
  "How to apply for trade license?",
  "Track complaint GVMC-2026-1842",
  "Water supply status in Ward 12",
];

export const wardCleanliness = [
  { ward: "MVP Colony", score: 85 },
  { ward: "Gajuwaka", score: 61 },
  { ward: "Madhurawada", score: 78 },
  { ward: "Dwarakanagar", score: 72 },
];

export const aiRecommendations = [
  {
    id: "1",
    priority: "high",
    textEn: "Increase garbage vehicle deployment in Ward 14",
    textTe: "వార్డ్ 14లో చెత్త వాహనాలను పెంచండి",
  },
  {
    id: "2",
    priority: "medium",
    textEn: "Ward 12 drainage overflow risk increasing due to rainfall forecast",
    textTe: "వర్షాపాత అంచనాతో వార్డ్ 12 డ్రైనేజ్ ప్రమాదం",
  },
];
