"use client";

import { Analytics } from "@vercel/analytics/next";
import { useConsent } from "./ConsentProvider";

/**
 * Loads Vercel Web Analytics ONLY after the visitor accepts cookies.
 * Before consent (or if refused) nothing is rendered, so no tracking script
 * is injected and no requests are made.
 */
export function AnalyticsGate() {
  const { consent } = useConsent();
  if (consent !== "accepted") return null;
  return <Analytics />;
}
