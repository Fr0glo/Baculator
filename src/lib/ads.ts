// AdSense configuration.
//
// Two separate concerns:
//  1. VERIFICATION — proving you own the site. Done with the inert
//     <meta name="google-adsense-account"> tag (loads no script, sets no
//     cookie), using ADSENSE_PUBLISHER below. Safe to ship immediately.
//  2. AD SERVING — actually loading ads. Gated by NEXT_PUBLIC_ADSENSE_CLIENT
//     AND user consent (see AdsenseLoader / AdSlot). Stays OFF until you set
//     that env var, so the site is clean during the AdSense review.

/** Your AdSense publisher id (account). Used for verification + ads.txt. */
export const ADSENSE_PUBLISHER = "ca-pub-9780249091177445";

/** Ad-serving client id — empty (ads off) until you set the env var post-approval. */
export const ADSENSE_CLIENT: string = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";

/** True when ad serving is configured (ads are *potentially* enabled). */
export const ADS_ENABLED: boolean = ADSENSE_CLIENT.length > 0;
