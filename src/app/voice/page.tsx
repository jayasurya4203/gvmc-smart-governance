"use client";

import { Mic } from "lucide-react";
import { ModulePage } from "@/components/shared/module-page";
import { useApp } from "@/contexts/app-context";
import { Button } from "@/components/ui/button";

export default function VoicePage() {
  const { t } = useApp();

  return (
    <ModulePage
      titleEn="Voice AI Assistant"
      titleTe="వాయిస్ ఏఐ సహాయకుడు"
      descriptionEn="Voice wave visualization, speech confidence, and accessibility-first controls."
      descriptionTe="వాయిస్ వేవ్, స్పీచ్ కాన్ఫిడెన్స్, అందుబాటు నియంత్రణలు."
    >
      <div className="flex flex-col items-center py-8">
        <Mic className="h-16 w-16 text-gvmc-ai mb-4" />
        <p className="font-semibold text-gvmc-text">{t("Listening...", "వింటోంది...")}</p>
        <div className="mt-6 flex h-16 items-end gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="voice-bar w-2 rounded-full bg-gvmc-ai"
              style={{ height: `${20 + i * 12}px` }}
            />
          ))}
        </div>
        <p className="mt-6 text-sm text-gvmc-muted">
          {t("AI Processing... Speaking response...", "ఏఐ ప్రాసెసింగ్... సమాధానం...")}
        </p>
        <Button variant="ai" className="mt-6">
          {t("Start voice session", "వాయిస్ సెషన్ ప్రారంభించు")}
        </Button>
      </div>
    </ModulePage>
  );
}
