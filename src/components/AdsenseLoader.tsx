"use client";

import { useEffect } from "react";
import { useConsent } from "./ConsentProvider";
import { ADSENSE_CLIENT } from "@/lib/ads";

const SCRIPT_ID = "adsbygoogle-js";

/**
 * Injects the Google AdSense loader script into <head>, but ONLY when:
 *   1. the visitor has accepted cookies, AND
 *   2. a publisher id is configured (NEXT_PUBLIC_ADSENSE_CLIENT).
 * If either condition is false, nothing is injected and the AdSlot components
 * render their reserved placeholder boxes instead.
 */
export function AdsenseLoader() {
  const { consent } = useConsent();

  useEffect(() => {
    if (consent !== "accepted" || !ADSENSE_CLIENT) return;
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    document.head.appendChild(script);
  }, [consent]);

  return null;
}
