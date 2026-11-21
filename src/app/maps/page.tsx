import { GisDashboard } from "@/components/maps/gis-dashboard";
import { ModulePage } from "@/components/shared/module-page";

export default function MapsPage() {
  return (
    <ModulePage
      titleEn="GIS & Map Intelligence"
      titleTe="జిఐఎస్ & పటం నిఘా"
      descriptionEn="Leaflet maps with ward boundaries, live complaint markers, flood zones, and municipal offices. Optional Mapbox tiles via env."
      descriptionTe="వార్డ్ సరిహద్దులు, లైవ్ మార్కర్లు, వరద ప్రాంతాలు, కార్యాలయాలు."
    >
      <GisDashboard />
    </ModulePage>
  );
}
