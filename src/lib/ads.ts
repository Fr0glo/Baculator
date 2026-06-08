// AdSense configuration. The publisher id is supplied via the build-time env
// var NEXT_PUBLIC_ADSENSE_CLIENT (see .env.example). When empty, the site ships
// with ads OFF and only renders the reserved placeholder boxes.
export const ADSENSE_CLIENT: string = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";

/** True when a publisher id is configured (ads are *potentially* enabled). */
export const ADS_ENABLED: boolean = ADSENSE_CLIENT.length > 0;
