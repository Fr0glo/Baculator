"use client";

import Link from "next/link";
import { useLang } from "@/i18n/LanguageProvider";
import { PageHeader } from "@/components/PageHeader";
import { ConsentManager } from "@/components/ConsentManager";
import { InfoIcon } from "@/components/icons";
import { SITE, formatDate } from "@/lib/site";

type Section = { h: { fr: string; ar: string }; p: { fr: string; ar: string }[] };

// Long-form legal copy lives here as a bilingual structure (kept out of the
// global dict to avoid bloating it with paragraphs). Fully FR + AR.
const SECTIONS: Section[] = [
  {
    h: { fr: "1. Qui sommes-nous ?", ar: "1. من نحن؟" },
    p: [
      {
        fr: `Bacullator est un outil d'information gratuit et indépendant destiné aux bacheliers marocains. Il n'est affilié à aucun ministère ni établissement. Le site est purement informatif : il aide à estimer une moyenne et à explorer des établissements, sans constituer une décision officielle d'admission.`,
        ar: `Bacullator أداة معلومات مجانية ومستقلة موجهة للبكالوريين المغاربة. غير تابع لأي وزارة أو مؤسسة. الموقع إعلامي بحت: يساعد على تقدير المعدل واستكشاف المؤسسات، دون أن يشكّل قرار قبول رسميًا.`,
      },
    ],
  },
  {
    h: { fr: "2. Données que nous collectons", ar: "2. البيانات التي نجمعها" },
    p: [
      {
        fr: `Le site ne crée pas de compte et ne demande aucune information personnelle. Les notes que tu saisis dans le calculateur et le simulateur restent dans ton navigateur (elles ne sont pas envoyées à un serveur).`,
        ar: `لا ينشئ الموقع حسابًا ولا يطلب أي معلومة شخصية. النقط التي تدخلها في الحاسبة والمحاكي تبقى في متصفحك (لا تُرسل إلى خادم).`,
      },
      {
        fr: `Si tu acceptes les cookies, des outils tiers (mesure d'audience et publicité) peuvent collecter des données techniques anonymisées ou pseudonymisées : pages vues, type d'appareil, navigateur, et un identifiant publicitaire géré par Google.`,
        ar: `إذا قبلت ملفات تعريف الارتباط، قد تجمع أدوات خارجية (قياس الزيارات والإعلانات) بيانات تقنية مجهولة أو شبه مجهولة: الصفحات المُشاهَدة، نوع الجهاز، المتصفح، ومعرّف إعلاني تديره Google.`,
      },
    ],
  },
  {
    h: { fr: "3. Cookies et traceurs", ar: "3. ملفات تعريف الارتباط والمتتبعات" },
    p: [
      {
        fr: `Aucun cookie de mesure d'audience ou de publicité n'est déposé avant ton consentement. Tant que tu n'as pas cliqué sur « Accepter », seuls des éléments strictement nécessaires (préférence de langue et de thème, ton choix de consentement) sont stockés localement dans ton navigateur.`,
        ar: `لا يُوضع أي ملف تعريف ارتباط لقياس الزيارات أو الإعلانات قبل موافقتك. ما لم تنقر على «قبول»، تُخزَّن محليًا في متصفحك فقط عناصر ضرورية تمامًا (تفضيل اللغة والمظهر، واختيارك بشأن الموافقة).`,
      },
      {
        fr: `Pour le détail des cookies, consulte la page Cookies.`,
        ar: `لتفاصيل ملفات تعريف الارتباط، اطّلع على صفحة ملفات تعريف الارتباط.`,
      },
    ],
  },
  {
    h: { fr: "4. Google AdSense et cookies tiers", ar: "4. Google AdSense وملفات الأطراف الثالثة" },
    p: [
      {
        fr: `Si la publicité est activée et que tu as accepté les cookies, Google AdSense et ses partenaires peuvent utiliser des cookies pour diffuser des annonces, y compris des annonces personnalisées. Google agit en tant que fournisseur tiers. Tu peux gérer ou désactiver la personnalisation des annonces depuis les paramètres Google (myadcenter.google.com) et en savoir plus sur policies.google.com/technologies/ads.`,
        ar: `إذا فُعِّلت الإعلانات وقبلت ملفات تعريف الارتباط، قد تستعمل Google AdSense وشركاؤها ملفات تعريف الارتباط لعرض الإعلانات، بما فيها المخصّصة. تعمل Google كمزوّد خارجي. يمكنك إدارة أو تعطيل تخصيص الإعلانات عبر إعدادات Google (myadcenter.google.com) ومعرفة المزيد عبر policies.google.com/technologies/ads.`,
      },
    ],
  },
  {
    h: { fr: "5. Mesure d'audience", ar: "5. قياس الزيارات" },
    p: [
      {
        fr: `Avec ton consentement, nous utilisons une mesure d'audience respectueuse de la vie privée (Vercel Web Analytics) pour comprendre la fréquentation du site de façon agrégée. Ces données ne servent pas à t'identifier personnellement.`,
        ar: `بموافقتك، نستعمل قياسًا للزيارات يحترم الخصوصية (Vercel Web Analytics) لفهم تردّد الزيارات بشكل إجمالي. لا تُستعمل هذه البيانات للتعرّف عليك شخصيًا.`,
      },
    ],
  },
  {
    h: { fr: "6. Base légale (Loi 09-08 / CNDP)", ar: "6. الأساس القانوني (القانون 09-08 / CNDP)" },
    p: [
      {
        fr: `Le traitement éventuel de données est fondé sur ton consentement, conformément à la loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, sous le contrôle de la CNDP (Commission Nationale de contrôle de la protection des Données à caractère Personnel). Tu peux retirer ton consentement à tout moment.`,
        ar: `يستند أي معالجة محتملة للبيانات إلى موافقتك، طبقًا للقانون المغربي رقم 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي، تحت مراقبة CNDP (اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي). يمكنك سحب موافقتك في أي وقت.`,
      },
    ],
  },
  {
    h: { fr: "7. Tes droits", ar: "7. حقوقك" },
    p: [
      {
        fr: `Tu disposes d'un droit d'accès, de rectification, d'opposition et de retrait du consentement. Comme nous ne stockons pas de données personnelles identifiantes sur nos serveurs, l'essentiel se gère directement depuis ton navigateur : refuse les cookies, efface-les, ou modifie ton choix ci-dessous. Pour toute question, écris-nous.`,
        ar: `لك حق الولوج والتصحيح والاعتراض وسحب الموافقة. بما أننا لا نخزّن بيانات شخصية معرِّفة على خوادمنا، يُدار الأمر أساسًا من متصفحك: ارفض ملفات تعريف الارتباط، أو امسحها، أو عدّل اختيارك أدناه. لأي سؤال، راسلنا.`,
      },
    ],
  },
  {
    h: { fr: "8. Contact", ar: "8. اتصال" },
    p: [
      {
        fr: `Pour toute demande relative à la confidentialité, contacte-nous à ${SITE.contactEmail}.`,
        ar: `لأي طلب يتعلق بالخصوصية، تواصل معنا عبر ${SITE.contactEmail}.`,
      },
    ],
  },
];

export function PrivacyView() {
  const { t, lang } = useLang();

  return (
    <div className="container-page py-8 sm:py-12">
      <PageHeader title={t("privacy.title")} subtitle={t("privacy.subtitle")} icon={<InfoIcon className="h-6 w-6" />} />

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

        {/* Consent management — lets users change their choice (compliance). */}
        <div className="mt-8">
          <ConsentManager />
        </div>

        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/cookies" className="font-semibold text-brand-600 hover:underline dark:text-brand-400">
            {t("cookies.title")}
          </Link>
        </p>
      </div>
    </div>
  );
}
