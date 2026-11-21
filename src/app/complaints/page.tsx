import Link from "next/link";
import { ModulePage } from "@/components/shared/module-page";
import { Button } from "@/components/ui/button";

export default function ComplaintsPage() {
  return (
    <ModulePage
      titleEn="Complaint Management"
      titleTe="ఫిర్యాదు నిర్వహణ"
      descriptionEn="Register, track, and manage civic complaints with AI-assisted forms and real-time timelines."
      descriptionTe="ఏఐ సహాయంతో ఫిర్యాదులు నమోదు, ట్రాక్ మరియు నిర్వహించండి."
    >
      <div className="flex flex-wrap gap-3">
        <Link href="/complaints/new">
          <Button variant="primary">Register Complaint</Button>
        </Link>
        <Link href="/complaints/track">
          <Button variant="secondary">Track Complaint</Button>
        </Link>
      </div>
      <p className="mt-6 text-sm text-gvmc-muted">
        Module 2 scaffold — smart forms, GPS, duplicate detection, and gamification badges coming next.
      </p>
    </ModulePage>
  );
}
