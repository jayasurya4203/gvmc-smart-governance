"use client";

import { ModulePage } from "@/components/shared/module-page";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/app-context";

export default function VisionPage() {
  const { t } = useApp();

  return (
    <ModulePage
      titleEn="Computer Vision — Image Intelligence"
      titleTe="కంప్యూటర్ విజన్ — చిత్ర విశ్లేషణ"
      descriptionEn="Upload photos for AI object detection and automatic department routing."
      descriptionTe="ఏఐ వస్తు గుర్తింపు మరియు డిపార్ట్‌మెంట్ రూటింగ్."
    >
      <div className="rounded-xl border-2 border-dashed border-gvmc-border bg-gvmc-bg p-12 text-center">
        <p className="text-gvmc-muted">
          {t("Drag & drop or use camera", "డ్రాగ్ & డ్రాప్ లేదా కెమెరా")}
        </p>
      </div>
      <div className="mt-6 rounded-xl border border-gvmc-success/30 bg-emerald-500/5 p-4 font-mono text-sm">
        <p>
          <strong>{t("Object Detected", "వస్తు గుర్తించబడింది")}:</strong> Pothole
        </p>
        <p>
          <strong>{t("Severity", "తీవ్రత")}:</strong> High
        </p>
        <p>
          <strong>AI Confidence:</strong> 94%
        </p>
        <p>
          <strong>{t("Department", "శాఖ")}:</strong> Roads & Engineering
        </p>
        <Badge tone="success" className="mt-3">
          {t("Auto-routed", "ఆటో రూట్")}
        </Badge>
      </div>
    </ModulePage>
  );
}
