import { ImageResponse } from "next/og";

// Static OG image generated at build time (1200×630).
export const runtime = "nodejs";
export const alt = "Bacullator — Calculateur de moyenne & simulateur d'admission";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #047653 0%, #065f44 55%, #022c22 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Graduation-cap mark (no emoji/Arabic glyphs → safe for @vercel/og) */}
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10 12 5 2 10l10 5 10-5z" />
              <path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5" />
            </svg>
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: -0.5 }}>
            Bacullator
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.08, maxWidth: 920 }}>
            Découvre où tu peux être admis avec ta note du Bac
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.82)", maxWidth: 860 }}>
            Calculateur de moyenne de présélection + simulateur d&apos;admission par filière.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              background: "#f98e06",
              color: "#1a1300",
              padding: "12px 26px",
              borderRadius: 999,
            }}
          >
            100% gratuit · Francais &amp; Arabe
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
