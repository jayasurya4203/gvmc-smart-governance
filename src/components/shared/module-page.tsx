"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { Card } from "@/components/ui/card";

interface ModulePageProps {
  titleEn: string;
  titleTe: string;
  descriptionEn: string;
  descriptionTe: string;
  children?: React.ReactNode;
}

export function ModulePage({
  titleEn,
  titleTe,
  descriptionEn,
  descriptionTe,
  children,
}: ModulePageProps) {
  const { t } = useApp();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gvmc-muted hover:text-gvmc-ai mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("Back to home", "హోమ్‌కు తిరిగి")}
      </Link>
      <h1 className="text-3xl font-bold text-gvmc-text">{t(titleEn, titleTe)}</h1>
      <p className="mt-2 max-w-2xl text-gvmc-muted font-telugu">
        {t(descriptionEn, descriptionTe)}
      </p>
      <Card className="mt-8">{children}</Card>
    </div>
  );
}
