"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import { useTheme } from "./ThemeProvider";
import { Logo } from "./Logo";
import { GlobeIcon, MenuIcon, MoonIcon, SunIcon, CloseIcon } from "./icons";
import type { DictKey } from "@/i18n/dictionary";

const NAV: { href: string; key: DictKey }[] = [
  { href: "/", key: "nav.accueil" },
  { href: "/calculateur", key: "nav.calculateur" },
  { href: "/simulateur", key: "nav.simulateur" },
  { href: "/explorer", key: "nav.explorer" },
  { href: "/guides", key: "nav.guides" },
  { href: "/apropos", key: "nav.apropos" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function SiteHeader() {
  const { t, lang, toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-md dark:border-slate-800/70 dark:bg-slate-950/80">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Link href="/" aria-label={t("app.name")} className="shrink-0 rounded-lg">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(pathname, item.href)
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleLang}
            className="btn-ghost !px-3 !py-2 text-sm"
            aria-label={t("lang.toggle")}
            title={t("lang.toggle")}
          >
            <GlobeIcon className="h-4 w-4" />
            <span className="font-semibold">{lang === "fr" ? "ع" : "FR"}</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="btn-ghost !px-3 !py-2"
            aria-label={theme === "dark" ? t("theme.light") : t("theme.dark")}
            title={theme === "dark" ? t("theme.light") : t("theme.dark")}
          >
            {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="btn-ghost !px-3 !py-2 md:hidden"
            aria-label={t("nav.menu")}
            aria-expanded={open}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden dark:border-slate-800 dark:bg-slate-950">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-3 text-base font-medium transition ${
                isActive(pathname, item.href)
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
