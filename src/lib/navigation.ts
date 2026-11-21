export const mainNav = [
  { href: "/", labelEn: "Home", labelTe: "హోమ్" },
  { href: "/complaints", labelEn: "Complaints", labelTe: "ఫిర్యాదులు" },
  { href: "/knowledge", labelEn: "Services", labelTe: "సేవలు" },
  { href: "/maps", labelEn: "City Map", labelTe: "నగర పటం" },
  { href: "/analytics", labelEn: "Analytics", labelTe: "విశ్లేషణ" },
  { href: "/admin", labelEn: "Officer Portal", labelTe: "అధికారి పోర్టల్" },
] as const;

export const moduleRoutes = [
  { href: "/complaints", titleEn: "Complaint Management", titleTe: "ఫిర్యాదు నిర్వహణ" },
  { href: "/knowledge", titleEn: "Knowledge Assistant", titleTe: "జ్ఞాన సహాయకుడు" },
  { href: "/voice", titleEn: "Voice Assistant", titleTe: "వాయిస్ సహాయకుడు" },
  { href: "/maps", titleEn: "GIS Intelligence", titleTe: "జిఐఎస్ నిఘా" },
  { href: "/vision", titleEn: "Image Intelligence", titleTe: "చిత్ర విశ్లేషణ" },
  { href: "/emergency", titleEn: "Emergency", titleTe: "అత్యవసరం" },
  { href: "/analytics", titleEn: "Analytics", titleTe: "విశ్లేషణ" },
  { href: "/admin", titleEn: "Command Center", titleTe: "కమాండ్ సెంటర్" },
  { href: "/worker", titleEn: "Field Worker", titleTe: "ఫీల్డ్ వర్కర్" },
] as const;
