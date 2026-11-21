"use client";

import Link from "next/link";
import { Mic, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/app-context";
import { demoUser, cityAlerts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const { t } = useApp();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gvmc-primary via-gvmc-primary-dark to-slate-900" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,var(--gvmc-ai)_0%,transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mb-4 overflow-hidden rounded-xl border border-white/20 bg-black/20 py-2">
          <div className="ticker flex whitespace-nowrap text-sm text-white">
            {[...cityAlerts, ...cityAlerts].map((alert, i) => (
              <span key={`${alert.id}-${i}`} className="mx-8 inline-flex items-center gap-2">
                <Badge tone={alert.type === "warning" ? "warning" : "info"}>
                  {alert.type}
                </Badge>
                {t(alert.messageEn, alert.messageTe)}
              </span>
            ))}
          </div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge tone="ai" className="mb-4">
              {t("Live City Status: Operational", "నగర స్థితి: సక్రమం")}
            </Badge>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {t("Welcome", "స్వాగతం")}, {demoUser.name}
            </h1>
            <p className="mt-4 text-lg text-sky-100 font-telugu">
              {t(
                "How can GVMC AI assist you today?",
                "ఈ రోజు GVMC AI మీకు ఎలా సహాయం చేయగలదు?",
              )}
            </p>
            <p className="mt-2 text-sm text-sky-200">{demoUser.ward}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="ai" size="lg" className="gap-2">
                <Sparkles className="h-5 w-5" />
                {t("Ask GVMC AI", "GVMC AI అడగండి")}
              </Button>
              <Link href="/voice">
                <Button variant="secondary" size="lg" className="gap-2 bg-white/10 text-white border-white/20 hover:bg-white/20">
                  <Mic className="h-5 w-5" />
                  {t("Voice Assistant", "వాయిస్ సహాయకుడు")}
                </Button>
              </Link>
              <Link href="/emergency">
                <Button variant="danger" size="lg">
                  {t("SOS Emergency", "అత్యవసర SOS")}
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative flex aspect-square max-h-80 items-center justify-center rounded-3xl border border-white/20 bg-white/5 backdrop-blur ai-glow mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gvmc-ai/20">
                <Sparkles className="h-12 w-12 text-gvmc-ai animate-pulse" />
              </div>
              <p className="text-white font-semibold">GVMC AI</p>
              <p className="text-sm text-sky-200 mt-1">
                {t("Smart city assistant ready", "స్మార్ట్ సిటీ సహాయకుడు సిద్ధం")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
