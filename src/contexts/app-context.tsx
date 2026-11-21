"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Language, UiMode } from "@/types";

interface AppContextValue {
  uiMode: UiMode;
  setUiMode: (mode: UiMode) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (en: string, te: string) => string;
  accessibility: {
    largeText: boolean;
    highContrast: boolean;
    setLargeText: (v: boolean) => void;
    setHighContrast: (v: boolean) => void;
  };
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [uiMode, setUiModeState] = useState<UiMode>("light");
  const [language, setLanguage] = useState<Language>("en");
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const setUiMode = useCallback((mode: UiMode) => {
    setUiModeState(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("gvmc-ui-mode", mode);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("gvmc-ui-mode") as UiMode | null;
    if (stored === "light" || stored === "dark" || stored === "emergency") {
      setUiModeState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = uiMode;
    document.documentElement.dataset.contrast = highContrast ? "high" : "normal";
    document.documentElement.dataset.text = largeText ? "large" : "normal";
  }, [uiMode, highContrast, largeText]);

  const t = useCallback(
    (en: string, te: string) => (language === "te" ? te : en),
    [language],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      uiMode,
      setUiMode,
      language,
      setLanguage,
      t,
      accessibility: {
        largeText,
        highContrast,
        setLargeText,
        setHighContrast,
      },
    }),
    [uiMode, setUiMode, language, t, largeText, highContrast],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
