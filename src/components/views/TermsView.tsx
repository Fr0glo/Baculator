"use client";

import Link from "next/link";
import { useLang } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/PageHeader";
import { InfoIcon } from "@/components/icons";
import { SITE, formatDate } from "@/lib/site";

type Section = { h: { fr: string; ar: string }; p: { fr: string; ar: string }[] };

const SECTIONS: Section[] = [
  {
    h: { fr: "1. Objet du site", ar: "1. موضوع الموقع" },
    p: [
      {
        fr: `Bacullator est un outil d'information gratuit et indépendant destiné aux bacheliers marocains. Il propose un calculateur de moyenne, un simulateur d'admission et une base d'établissements. En utilisant le site, tu acceptes les présentes conditions.`,
        ar: `Bacullator أداة معلومات مجانية ومستقلة موجهة للبكالوريين المغاربة. يوفّر حاسبة للمعدل، ومحاكي قبول، وقاعدة مؤسسات. باستعمالك للموقع، فإنك توافق على هذه الشروط.`,
      },
    ],
  },
  {
    h: { fr: "2. Informations indicatives", ar: "2. معلومات إرشادية" },
    p: [
      {
        fr: `Les seuils, places et autres données affichés sont indicatifs et parfois estimés. Ils peuvent contenir des erreurs ou être dépassés. Bacullator ne garantit ni l'exactitude ni l'exhaustivité de ces informations. La seule source officielle reste le portail cursussup.gov.ma.`,
        ar: `العتبات والمقاعد وباقي المعطيات المعروضة إرشادية وأحيانًا تقديرية. قد تتضمن أخطاء أو تكون متجاوَزة. لا يضمن Bacullator دقة هذه المعلومات ولا اكتمالها. تبقى البوابة الرسمية cursussup.gov.ma المصدر الوحيد المعتمد.`,
      },
    ],
  },
  {
    h: { fr: "3. Pas une décision d'admission", ar: "3. ليس قرار قبول" },
    p: [
      {
        fr: `Les résultats du simulateur n'ont aucune valeur officielle. Être au-dessus d'un seuil donne, au mieux, le droit de passer un concours — pas une admission garantie. Les décisions officielles relèvent uniquement des établissements et du Ministère.`,
        ar: `نتائج المحاكي ليست لها أي قيمة رسمية. تجاوز العتبة يمنح، في أحسن الأحوال، حق اجتياز مباراة — وليس قبولًا مضمونًا. القرارات الرسمية من اختصاص المؤسسات والوزارة وحدها.`,
      },
    ],
  },
  {
    h: { fr: "4. Responsabilité", ar: "4. المسؤولية" },
    p: [
      {
        fr: `Tu utilises le site sous ta propre responsabilité. Bacullator ne peut être tenu responsable d'un choix d'orientation, d'une candidature ou d'une décision prise sur la base des informations du site. Vérifie toujours les informations officielles avant toute démarche.`,
        ar: `تستعمل الموقع على مسؤوليتك الخاصة. لا يتحمّل Bacullator مسؤولية أي اختيار توجيهي أو ترشّح أو قرار يُتّخذ بناءً على معلومات الموقع. تحقّق دائمًا من المعلومات الرسمية قبل أي إجراء.`,
      },
    ],
  },
  {
    h: { fr: "5. Propriété et liens", ar: "5. الملكية والروابط" },
    p: [
      {
        fr: `Les noms des établissements et des examens appartiennent à leurs détenteurs respectifs. Le site peut contenir des liens externes (sites officiels des écoles, cursussup) dont nous ne contrôlons pas le contenu.`,
        ar: `أسماء المؤسسات والامتحانات ملك لأصحابها. قد يتضمن الموقع روابط خارجية (المواقع الرسمية للمدارس، cursussup) لا نتحكم في محتواها.`,
      },
    ],
  },
  {
    h: { fr: "6. Données et cookies", ar: "6. البيانات وملفات تعريف الارتباط" },
    p: [
      {
        fr: `Le traitement des données et l'usage des cookies sont décrits dans la politique de confidentialité et la politique relative aux cookies.`,
        ar: `معالجة البيانات واستعمال ملفات تعريف الارتباط موضّحة في سياسة الخصوصية وسياسة ملفات تعريف الارتباط.`,
      },
    ],
  },
  {
    h: { fr: "7. Modifications et contact", ar: "7. التعديلات والاتصال" },
    p: [
      {
        fr: `Ces conditions peuvent évoluer ; la version en ligne fait foi. Pour toute question : ${SITE.contactEmail}.`,
        ar: `قد تتغير هذه الشروط؛ النسخة المنشورة على الموقع هي المعتمدة. لأي سؤال: ${SITE.contactEmail}.`,
      },
    ],
  },
];

export function TermsView() {
  const { t, lang } = useLang();
  return (
    <div className="container-page py-8 sm:py-12">
      <PageHeader title={t("terms.title")} subtitle={t("terms.subtitle")} icon={<InfoIcon className="h-6 w-6" />} />
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-slate-400 dark:text-slate-500">
          {t("privacy.updated")} : {formatDate(SITE.dataUpdated, lang)}
        </p>
        <article className="mt-6 space-y-7">
          {SECTIONS.map((s) => (
            <section key={s.h.fr}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{s.h[lang]}</h2>
              <div className="mt-2 space-y-3 leading-relaxed text-slate-600 dark:text-slate-300">
                {s.p.map((para, i) => (
                  <p key={i}>{para[lang]}</p>
                ))}
              </div>
            </section>
          ))}
        </article>
        <p className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link href="/confidentialite" className="font-semibold text-brand-600 hover:underline dark:text-brand-400">
            {t("privacy.title")}
          </Link>
          <Link href="/cookies" className="font-semibold text-brand-600 hover:underline dark:text-brand-400">
            {t("cookies.title")}
          </Link>
        </p>
      </div>
    </div>
  );
}
