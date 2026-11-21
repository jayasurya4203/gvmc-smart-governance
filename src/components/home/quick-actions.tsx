"use client";

import Link from "next/link";
import {
  Baby,
  CreditCard,
  Droplets,
  FilePlus,
  MapPin,
  Mic,
  Search,
  Siren,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/app-context";
import { quickActions } from "@/lib/mock-data";

const iconMap: Record<string, LucideIcon> = {
  FilePlus,
  Search,
  Siren,
  MapPin,
  Mic,
  CreditCard,
  Droplets,
  Baby,
};

export function QuickActions() {
  const { t } = useApp();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h2 className="text-2xl font-bold text-gvmc-text">
        {t("Smart Quick Actions", "స్మార్ట్ త్వరిత చర్యలు")}
      </h2>
      <p className="mt-1 text-gvmc-muted">
        {t("One tap access to civic services", "పౌర సేవలకు ఒక ట్యాప్")}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, i) => {
          const Icon = iconMap[action.icon] ?? FilePlus;
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={action.href}
                className="group flex flex-col gap-3 rounded-2xl border border-gvmc-border glass-card p-5 transition hover:-translate-y-1 hover:border-gvmc-ai"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gvmc-primary/10 text-gvmc-primary transition group-hover:bg-gvmc-ai/20 group-hover:text-gvmc-ai">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-semibold text-gvmc-text">
                  {t(action.labelEn, action.labelTe)}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
