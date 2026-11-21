"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ModulePage } from "@/components/shared/module-page";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/app-context";
import { LocationPicker, type LocationValue } from "@/components/maps/location-picker";
import { apiPost } from "@/lib/api-client";

const categories = [
  { en: "Pothole repair", te: "పాట్‌హోల్ మరమ్ము" },
  { en: "Garbage collection", te: "చెత్త సేకరణ" },
  { en: "Street lighting", te: "వీధి లైటింగ్" },
  { en: "Water supply", te: "నీటి సరఫరా" },
  { en: "Drainage / flooding", te: "డ్రైనేజ్ / వరద" },
];

const steps = [
  { en: "What issue are you facing?", te: "మీరు ఎదుర్కొంటున్న సమస్య ఏమిటి?" },
  { en: "Please share location", te: "దయచేసి స్థానం పంచుకోండి" },
  { en: "Add details", te: "వివరాలు జోడించండి" },
  { en: "Complaint registered", te: "ఫిర్యాదు నమోదు అయింది" },
];

export default function NewComplaintPage() {
  const { t } = useApp();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState(categories[0].en);
  const [location, setLocation] = useState<LocationValue | null>(null);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resultId, setResultId] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submitComplaint() {
    setSubmitting(true);
    setError(null);
    const res = await apiPost<{
      complaint: { publicId: string };
      duplicateWarning: string | null;
    }>("/api/complaints", {
      category,
      description: description || undefined,
      lat: location?.lat,
      lng: location?.lng,
      address: location?.address,
    });
    setSubmitting(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setResultId(res.data.complaint.publicId);
    setDuplicateWarning(res.data.duplicateWarning);
    setStep(3);
  }

  return (
    <ModulePage
      titleEn="Register Complaint"
      titleTe="ఫిర్యాదు నమోదు"
      descriptionEn="Smart forms with GPS, duplicate detection, and instant tracking."
      descriptionTe="జిపిఎస్, డూప్లికేట్ గుర్తింపు, తక్షణ ట్రాకింగ్."
    >
      <div className="rounded-xl border border-gvmc-ai/30 bg-gvmc-ai/5 p-4">
        <p className="font-semibold text-gvmc-text">
          {t(steps[step].en, steps[step].te)}
        </p>
        <p className="mt-2 text-sm text-gvmc-muted">
          {t("Step", "దశ")} {step + 1} {t("of", "లో")} {steps.length}
        </p>
      </div>

      {step === 0 && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {categories.map((c) => (
            <button
              key={c.en}
              type="button"
              onClick={() => setCategory(c.en)}
              className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
                category === c.en
                  ? "border-gvmc-ai bg-gvmc-ai/10 text-gvmc-text"
                  : "border-gvmc-border text-gvmc-muted hover:border-gvmc-ai/50"
              }`}
            >
              {t(c.en, c.te)}
            </button>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="mt-4">
          <LocationPicker value={location} onChange={setLocation} />
        </div>
      )}

      {step === 2 && (
        <textarea
          className="mt-4 w-full rounded-lg border border-gvmc-border bg-gvmc-surface px-3 py-2 text-sm min-h-[120px]"
          placeholder={t(
            "Describe the issue (optional)",
            "సమస్య వివరించండి (ఐచ్ఛికం)",
          )}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      )}

      {step === 3 && resultId && (
        <div className="mt-4 rounded-xl border border-gvmc-success/40 bg-gvmc-success/10 p-4">
          <p className="font-semibold text-gvmc-text">
            {t("Your complaint ID:", "మీ ఫిర్యాదు ID:")} {resultId}
          </p>
          {duplicateWarning && (
            <p className="mt-2 text-sm text-gvmc-warning">{duplicateWarning}</p>
          )}
        </div>
      )}

      {error && <p className="mt-4 text-sm text-gvmc-danger">{error}</p>}

      <div className="mt-6 flex gap-3">
        {step > 0 && step < 3 && (
          <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>
            {t("Back", "వెనుక")}
          </Button>
        )}
        {step < 2 && (
          <Button
            variant="ai"
            onClick={() => setStep((s) => s + 1)}
            disabled={step === 1 && !location}
          >
            {t("Continue", "కొనసాగించు")}
          </Button>
        )}
        {step === 2 && (
          <Button variant="ai" onClick={submitComplaint} disabled={submitting}>
            {submitting
              ? t("Submitting…", "సమర్పిస్తోంది…")
              : t("Submit complaint", "ఫిర్యాదు సమర్పించు")}
          </Button>
        )}
        {step === 3 && (
          <Button
            variant="primary"
            onClick={() =>
              router.push(`/complaints/track?id=${resultId}`)
            }
          >
            {t("Track now", "ఇప్పుడు ట్రాక్ చేయండి")}
          </Button>
        )}
      </div>
    </ModulePage>
  );
}
