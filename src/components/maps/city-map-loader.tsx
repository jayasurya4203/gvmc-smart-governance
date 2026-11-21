"use client";

import dynamic from "next/dynamic";
import type { CityMapProps } from "@/components/maps/city-map";

const CityMap = dynamic(
  () => import("@/components/maps/city-map").then((m) => m.CityMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-gvmc-border bg-gvmc-bg text-gvmc-muted">
        Loading map…
      </div>
    ),
  },
);

export function CityMapLoader(props: CityMapProps) {
  return <CityMap {...props} />;
}
