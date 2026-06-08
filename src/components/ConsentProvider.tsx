"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Consent = "accepted" | "refused";

type ConsentContextValue = {
  /** null = the visitor hasn't chosen yet (privacy-preserving default). */
  consent: Consent | null;
  /** False until we've read localStorage on the client (avoids hydration mismatch). */
  mounted: boolean;
  setConsent: (c: Consent) => void;
  /** Clears the stored choice so the banner shows again (used by the policy page). */
  reset: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

const STORAGE_KEY = "bac-consent";

/**
 * Tracks cookie consent for analytics + ads.
 * Default is **non-consented**: nothing tracking-related may load until the
 * user explicitly accepts. The choice is persisted in localStorage.
 */
export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<Consent | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "refused") setConsentState(stored);
    } catch {
      /* localStorage unavailable — stay non-consented. */
    }
    setMounted(true);
  }, []);

  const setConsent = useCallback((c: Consent) => {
    setConsentState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      /* non-critical */
    }
  }, []);

  const reset = useCallback(() => {
    setConsentState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* non-critical */
    }
  }, []);

  return (
    <ConsentContext.Provider value={{ consent, mounted, setConsent, reset }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}

/**
 * Imperative consent check for non-React code (e.g. a future analytics/ads
 * initializer). Returns the stored choice without React context.
 */
export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "accepted" || stored === "refused" ? stored : null;
  } catch {
    return null;
  }
}
