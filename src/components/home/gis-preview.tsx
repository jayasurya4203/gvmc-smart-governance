"use client";

import Link from "next/link";
import { Map } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { GisDashboard } from "@/components/maps/gis-dashboard";
import { Button } from "@/components/ui/button";

export function GisPreview() {
  const { t } = useApp();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-gvmc-text">
          {t("GIS Smart Maps", "జిఐఎస్ స్మార్ట్ పటాలు")}
        </h2>
        <Link href="/maps">
          <Button variant="ai" className="gap-2">
            <Map className="h-4 w-4" />
            {t("Open full map", "పూర్తి పటం")}
          </Button>
        </Link>
      </div>
      <GisDashboard compact />
    </section>
  );
}
