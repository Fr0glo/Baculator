"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ConsentProvider } from "./ConsentProvider";

/** Single client boundary wrapping the app in theme + language + consent context. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ConsentProvider>{children}</ConsentProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
