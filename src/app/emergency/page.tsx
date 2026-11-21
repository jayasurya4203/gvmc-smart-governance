"use client";

import Link from "next/link";
import { Phone, Siren } from "lucide-react";
import { ModulePage } from "@/components/shared/module-page";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/app-context";

export default function EmergencyPage() {
  const { t, setUiMode } = useApp();

  return (
    <div className="min-h-[70vh]">
      <ModulePage
        titleEn="Emergency Management"
        titleTe="అత్యవసర నిర్వహణ"
        descriptionEn="SOS, shelter maps, cyclone paths, and live disaster feeds."
        descriptionTe="SOS, శరణాలు, తుఫాన్ మార్గాలు, లైవ్ ఫీడ్."
      >
        <Button
          variant="danger"
          size="lg"
          className="w-full gap-2 emergency-pulse"
          onClick={() => setUiMode("emergency")}
        >
          <Siren className="h-5 w-5" />
          {t("Activate SOS", "SOS సక్రియం")}
        </Button>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { num: "100", label: "Police" },
            { num: "101", label: "Fire" },
            { num: "108", label: "Ambulance" },
          ].map((hotline) => (
            <li
              key={hotline.num}
              className="flex items-center gap-3 rounded-xl border border-gvmc-danger/30 bg-red-500/5 px-4 py-3"
            >
              <Phone className="h-5 w-5 text-gvmc-danger" />
              <div>
                <p className="font-mono font-bold">{hotline.num}</p>
                <p className="text-sm text-gvmc-muted">{hotline.label}</p>
              </div>
            </li>
          ))}
        </ul>
        <Link href="/maps" className="mt-6 inline-block text-sm text-gvmc-ai underline">
          {t("Shelter navigation on map", "పటంలో శరణ నావిగేషన్")}
        </Link>
      </ModulePage>
    </div>
  );
}
