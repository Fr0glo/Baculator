"use client";

// Ad slot that is "ad-ready" but privacy-safe:
//  - Renders a real <ins class="adsbygoogle"> ONLY when a publisher id is set
//    (NEXT_PUBLIC_ADSENSE_CLIENT) AND the visitor has accepted cookies.
//  - Otherwise renders a clearly-labelled reserved placeholder box so the
//    layout already accounts for the ad and nothing shifts when it goes live.
// The loader script itself is injected by <AdsenseLoader/> (also consent-gated).

import { useEffect, useRef } from "react";
import { useConsent } from "./ConsentProvider";
import { ADSENSE_CLIENT } from "@/lib/ads";

type AdSlotProps = {
  /** AdSense ad-slot id (set this per placement once you create slots). */
  slot?: string;
  className?: string;
  /** Suggested height; AdSense responsive units override in practice. */
  minHeight?: number;
};

export function AdSlot({ slot = "", className = "", minHeight = 90 }: AdSlotProps) {
  const { consent } = useConsent();
  const active = ADSENSE_CLIENT.length > 0 && consent === "accepted";
  const pushed = useRef(false);

  useEffect(() => {
    if (!active || pushed.current) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* AdSense not ready yet — will retry on next mount. */
    }
  }, [active]);

  if (!active) {
    return (
      <div
        className={`my-6 flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100/50 text-xs font-medium uppercase tracking-wide text-slate-400 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-600 ${className}`}
        style={{ minHeight }}
        data-ad-slot={slot}
        aria-hidden="true"
      >
        Espace réservé
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle my-6 block ${className}`}
      style={{ display: "block", minHeight }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
