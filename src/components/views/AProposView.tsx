"use client";

import { useState } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/PageHeader";
import { Disclaimer } from "@/components/Disclaimer";
import { AdSlot } from "@/components/AdSlot";
import { ChevronDownIcon, InfoIcon, ExternalIcon } from "@/components/icons";
import { SITE } from "@/lib/site";
import type { DictKey } from "@/i18n/dictionary";

const FAQ: { q: DictKey; a: DictKey }[] = [
  { q: "about.q1", a: "about.a1" },
  { q: "about.q2", a: "about.a2" },
  { q: "about.q3", a: "about.a3" },
  { q: "about.q4", a: "about.a4" },
  { q: "about.q5", a: "about.a5" },
];

export function AProposView() {
  const { t } = useLang();

  return (
    <div className="container-page py-8 sm:py-12">
      <PageHeader
        title={t("about.title")}
        subtitle={t("about.subtitle")}
        icon={<InfoIcon className="h-6 w-6" />}
      />

      <div className="mx-auto max-w-3xl">
        <Disclaimer />

        <div className="mt-6 space-y-3">
          {FAQ.map((item, i) => (
            <FaqItem key={item.q} qKey={item.q} aKey={item.a} defaultOpen={i === 0} />
          ))}
        </div>

        <AdSlot slot="about-mid" />

        {/* Contact */}
        <div className="card mt-6 p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("about.contact.title")}</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t("about.contact.desc")}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={`mailto:${SITE.contactEmail}`} className="btn-primary">
              {SITE.contactEmail}
            </a>
            <a
              href={SITE.officialPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              cursussup.gov.ma
              <ExternalIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({
  qKey,
  aKey,
  defaultOpen,
}: {
  qKey: DictKey;
  aKey: DictKey;
  defaultOpen?: boolean;
}) {
  const { t } = useLang();
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-5 text-start"
        aria-expanded={open}
      >
        <span className="text-base font-bold text-slate-900 dark:text-white">{t(qKey)}</span>
        <ChevronDownIcon className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="animate-fade-in px-5 pb-5">
          <p className="leading-relaxed text-slate-600 dark:text-slate-300">{t(aKey)}</p>
        </div>
      )}
    </div>
  );
}
