"use client";

// Ad slot that is "ad-ready" but privacy-safe and review-clean:
//  - Renders a real <ins class="adsbygoogle"> ONLY when a publisher id is set
//    (NEXT_PUBLIC_ADSENSE_CLIENT) AND the visitor has accepted cookies.
//  - Otherwise renders NOTHING. Before approval (no publisher id), the site
//    shows no empty/placeholder boxes, so it looks finished and content-first
//    for the AdSense reviewer. The loader script is injected by <AdsenseLoader/>.

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

  // Nothing rendered until ads are configured AND consented (clean review).
  if (!active) return null;

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
