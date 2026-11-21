"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ModulePage } from "@/components/shared/module-page";
import { useApp } from "@/contexts/app-context";

function KnowledgeContent() {
  const params = useSearchParams();
  const q = params.get("q") ?? "trade license";
  const { t } = useApp();

  return (
    <ModulePage
      titleEn="AI Knowledge Assistant"
      titleTe="ఏఐ జ్ఞాన సహాయకుడు"
      descriptionEn="RAG-powered answers with step-by-step guidance and document previews."
      descriptionTe="దశలవారీ మార్గదర్శకత్వంతో ఏఐ సమాధానాలు."
    >
      <div className="rounded-xl border border-gvmc-border bg-gvmc-bg p-4">
        <p className="text-sm text-gvmc-muted">{t("Query", "ప్రశ్న")}</p>
        <p className="mt-1 font-semibold text-gvmc-text">{q}</p>
        <div className="mt-4 rounded-lg border-l-4 border-gvmc-ai bg-gvmc-surface p-4">
          <p className="font-semibold text-gvmc-primary">
            {t("Highlighted Answer", "హైలైట్ సమాధానం")}
          </p>
          <p className="mt-2 text-sm text-gvmc-muted">
            {t(
              "Apply online at GVMC citizen portal → Trade License → Upload ID & premises proof → Pay fee → Track status.",
              "GVMC పోర్టల్ → ట్రేడ్ లైసెన్స్ → డాక్యుమెంట్లు అప్‌లోడ్ → ఫీజు చెల్లించు → స్థితి ట్రాక్.",
            )}
          </p>
        </div>
      </div>
    </ModulePage>
  );
}

export default function KnowledgePage() {
  return (
    <Suspense>
      <KnowledgeContent />
    </Suspense>
  );
}
