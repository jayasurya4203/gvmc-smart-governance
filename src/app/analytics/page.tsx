import { AnalyticsPreview } from "@/components/home/analytics-preview";
import { ModulePage } from "@/components/shared/module-page";

export default function AnalyticsPage() {
  return (
    <ModulePage
      titleEn="Analytics & AI Predictions"
      titleTe="విశ్లేషణ & ఏఐ అంచనాలు"
      descriptionEn="Complaint trends, ward rankings, SLA escalation, and predictive governance."
      descriptionTe="ఫిర్యాదు ధోరణులు, వార్డ్ ర్యాంకింగ్, SLA, అంచనా పాలన."
    >
      <AnalyticsPreview />
    </ModulePage>
  );
}
