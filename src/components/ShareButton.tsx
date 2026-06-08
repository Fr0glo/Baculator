"use client";

import { useState } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import { ShareIcon, CheckIcon } from "./icons";

/**
 * Share button using the Web Share API where available, with a clipboard
 * fallback (and a final fallback to a prompt) so it works on every device.
 */
export function ShareButton({
  url,
  className = "",
}: {
  /** Optional explicit URL; defaults to the current page. */
  url?: string;
  className?: string;
}) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareUrl =
      url ?? (typeof window !== "undefined" ? window.location.href : "");
    const shareData = {
      title: t("app.name"),
      text: t("share.text"),
      url: shareUrl,
    };

    // Native share sheet (mobile-first).
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        /* user cancelled or share failed → fall through to copy */
      }
    }

    // Clipboard fallback.
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(t("share.button"), shareUrl);
    }
  }

  return (
    <button type="button" onClick={handleShare} className={`btn-outline ${className}`}>
      {copied ? <CheckIcon className="h-4 w-4 text-brand-600" /> : <ShareIcon className="h-4 w-4" />}
      <span>{copied ? t("share.copied") : t("share.button")}</span>
    </button>
  );
}
