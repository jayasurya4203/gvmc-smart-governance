"use client";

import { AppProvider } from "@/contexts/app-context";
import { AuthProvider } from "@/contexts/auth-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AuthProvider>{children}</AuthProvider>
    </AppProvider>
  );
}
