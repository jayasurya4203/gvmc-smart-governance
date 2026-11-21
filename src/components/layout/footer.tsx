"use client";

import Link from "next/link";
import { Phone, Shield } from "lucide-react";
import { useApp } from "@/contexts/app-context";

export function Footer() {
  const { t } = useApp();

  return (
    <footer className="mt-auto border-t border-gvmc-border bg-gvmc-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        <div>
          <h3 className="font-bold">Greater Visakhapatnam MC</h3>
          <p className="mt-2 text-sm text-sky-100">
            {t(
              "AI-powered smart municipal governance platform",
              "ఏఐ ఆధారిత స్మార్ట్ మునిసిపల్ పాలన వేదిక",
            )}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-sky-200">
            {t("Emergency", "అత్యవసరం")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> 100 — Police
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> 101 — Fire
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> 108 — Ambulance
            </li>
            <li>
              <Link href="/emergency" className="underline hover:text-gvmc-ai">
                {t("GVMC Emergency Center", "GVMC అత్యవసర కేంద్రం")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-sky-200">
            {t("Quick Links", "త్వరిత లింకులు")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/complaints/new" className="hover:text-gvmc-ai">
                {t("Register Complaint", "ఫిర్యాదు నమోదు")}
              </Link>
            </li>
            <li>
              <Link href="/knowledge" className="hover:text-gvmc-ai">
                {t("Citizen Services", "పౌర సేవలు")}
              </Link>
            </li>
            <li>
              <Link href="/maps" className="hover:text-gvmc-ai">
                {t("GIS Maps", "జిఐఎస్ పటాలు")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-sky-200">
            {t("Accessibility", "అందుబాటు")}
          </h4>
          <p className="mt-3 flex items-start gap-2 text-sm text-sky-100">
            <Shield className="mt-0.5 h-4 w-4 shrink-0" />
            {t(
              "Screen reader compatible · Voice navigation · High contrast mode",
              "స్క్రీన్ రీడర్ · వాయిస్ నావిగేషన్ · హై కాంట్రాస్ట్",
            )}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-sky-200">
        © {new Date().getFullYear()} GVMC · {t("Smart Governance Platform", "స్మార్ట్ పాలన వేదిక")}
      </div>
    </footer>
  );
}
