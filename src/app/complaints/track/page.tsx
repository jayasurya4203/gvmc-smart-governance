"use client";

import { Suspense } from "react";
import { ComplaintTracker } from "@/components/home/complaint-tracker";
import { ModulePage } from "@/components/shared/module-page";

export default function TrackComplaintPage() {
  return (
    <ModulePage
      titleEn="Track Complaint"
      titleTe="ఫిర్యాదు ట్రాక్"
      descriptionEn="Real-time timeline, location on map, and status from the municipal API."
      descriptionTe="రియల్-టైమ్ టైమ్‌లైన్, పటంపై స్థానం, API స్థితి."
    >
      <Suspense fallback={<p className="text-gvmc-muted">Loading…</p>}>
        <ComplaintTracker />
      </Suspense>
    </ModulePage>
  );
}
