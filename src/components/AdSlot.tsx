// Reserved, non-intrusive ad placeholder.
// ─────────────────────────────────────────────────────────────────────────
// HOW TO ENABLE GOOGLE ADSENSE LATER (do NOT add real scripts before approval):
//   1. Add the AdSense script tag once in src/app/layout.tsx <head>.
//   2. Replace the inner placeholder <div> below with an <ins class="adsbygoogle">
//      block using your data-ad-client / data-ad-slot.
//   3. Trigger (adsbygoogle = window.adsbygoogle || []).push({}) in a useEffect.
// Until then this renders a clearly-labelled empty, responsive box so the
// layout already accounts for the ad and nothing shifts when it goes live.

type AdSlotProps = {
  /** Logical slot id (helps you map to AdSense slots later). */
  slot?: string;
  className?: string;
  /** Suggested height; AdSense responsive units will override in practice. */
  minHeight?: number;
};

export function AdSlot({ slot = "default", className = "", minHeight = 90 }: AdSlotProps) {
  return (
    <div
      className={`my-6 flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100/50 text-xs font-medium uppercase tracking-wide text-slate-400 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-600 ${className}`}
      style={{ minHeight }}
      // Empty ad container — AdSense markup goes here later.
      data-ad-slot={slot}
      aria-hidden="true"
    >
      {/* Espace publicitaire */}
      Espace réservé
    </div>
  );
}
