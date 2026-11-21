"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ModulePage } from "@/components/shared/module-page";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/app-context";
import { useAuth } from "@/contexts/auth-context";

const DEMO_ACCOUNTS = [
  { email: "citizen@gvmc.demo", role: "Citizen" },
  { email: "officer@gvmc.demo", role: "Officer" },
  { email: "worker@gvmc.demo", role: "Field worker" },
  { email: "admin@gvmc.demo", role: "Admin" },
];

export default function LoginPage() {
  const { t } = useApp();
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";

  const [email, setEmail] = useState("citizen@gvmc.demo");
  const [password, setPassword] = useState("gvmc123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const err = await login(email, password);
    setLoading(false);
    if (err) {
      setError(err);
      return;
    }
    router.push(redirect);
  }

  return (
    <ModulePage
      titleEn="Sign in to GVMC"
      titleTe="GVMCకి సైన్ ఇన్"
      descriptionEn="Citizens, officers, and field workers use one secure portal."
      descriptionTe="పౌరులు, అధికారులు, వర్కర్లు — ఒకే సురక్షిత పోర్టల్."
    >
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="text-sm font-medium text-gvmc-text" htmlFor="email">
            {t("Email", "ఇమెయిల్")}
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gvmc-border bg-gvmc-surface px-3 py-2 text-gvmc-text"
          />
        </div>
        <div>
          <label
            className="text-sm font-medium text-gvmc-text"
            htmlFor="password"
          >
            {t("Password", "పాస్‌వర్డ్")}
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-gvmc-border bg-gvmc-surface px-3 py-2 text-gvmc-text"
          />
        </div>
        {error && <p className="text-sm text-gvmc-danger">{error}</p>}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? t("Signing in…", "సైన్ ఇన్…") : t("Sign in", "సైన్ ఇన్")}
        </Button>
      </form>

      <div className="mt-8 rounded-xl border border-gvmc-border bg-gvmc-bg p-4">
        <p className="text-sm font-semibold text-gvmc-text">
          {t("Demo accounts", "డెమో ఖాతాలు")} — password: <code>gvmc123</code>
        </p>
        <ul className="mt-2 space-y-1 text-sm text-gvmc-muted">
          {DEMO_ACCOUNTS.map((a) => (
            <li key={a.email}>
              <button
                type="button"
                className="text-gvmc-ai hover:underline"
                onClick={() => setEmail(a.email)}
              >
                {a.email}
              </button>{" "}
              ({a.role})
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-sm text-gvmc-muted">
        <Link href="/" className="text-gvmc-ai">
          {t("Back to home", "హోమ్‌కు తిరిగి")}
        </Link>
      </p>
    </ModulePage>
  );
}
