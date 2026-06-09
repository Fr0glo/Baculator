// Lightweight i18n: a flat dictionary keyed by string id, FR + AR.
// French is the default; Arabic is fully translated and rendered RTL.

export type Lang = "fr" | "ar";

export const LANGS: Lang[] = ["fr", "ar"];

// Each entry holds both languages. Use t(key) from the LanguageProvider.
export const dict = {
  // ── Generic / nav ────────────────────────────────────────────────
  "app.name": { fr: "Bacullator", ar: "Bacullator" },
  "app.tagline": {
    fr: "Calcule ta moyenne, découvre où tu peux être admis.",
    ar: "احسب معدلك واكتشف أين يمكن قبولك.",
  },
  "nav.accueil": { fr: "Accueil", ar: "الرئيسية" },
  "nav.calculateur": { fr: "Calculateur", ar: "حاسبة المعدل" },
  "nav.simulateur": { fr: "Simulateur", ar: "محاكي القبول" },
  "nav.explorer": { fr: "Écoles", ar: "المدارس" },
  "nav.apropos": { fr: "À propos", ar: "حول" },
  "nav.menu": { fr: "Menu", ar: "القائمة" },
  "lang.toggle": { fr: "العربية", ar: "Français" },
  "theme.light": { fr: "Mode clair", ar: "الوضع الفاتح" },
  "theme.dark": { fr: "Mode sombre", ar: "الوضع الداكن" },

  // ── Landing ──────────────────────────────────────────────────────
  "home.hero.title": {
    fr: "Découvre où tu peux être admis avec ta note du BAC",
    ar: "اكتشف أين يمكن قبولك بمعدل الباكالوريا",
  },
  "home.hero.subtitle": {
    fr: "Calcule ta moyenne de présélection et vois en un instant les écoles et facultés où tu peux être convoqué — adapté à ta filière.",
    ar: "احسب معدل الانتقاء واطّلع فورًا على المدارس والكليات التي يمكن استدعاؤك إليها — حسب شعبتك.",
  },
  "home.hero.cta": { fr: "Lancer le simulateur", ar: "ابدأ المحاكاة" },
  "home.hero.cta2": { fr: "Calculer ma moyenne", ar: "احسب معدلي" },
  "home.hero.free": { fr: "100% gratuit · sans inscription", ar: "مجاني 100٪ · بدون تسجيل" },
  "home.steps.title": { fr: "Comment ça marche", ar: "كيف يعمل" },
  "home.step1.title": { fr: "Calcule ta moyenne", ar: "احسب معدلك" },
  "home.step1.desc": {
    fr: "Entre tes notes National et Régional pour obtenir ta moyenne de présélection (75/25).",
    ar: "أدخل نقطتي الوطني والجهوي للحصول على معدل الانتقاء (75/25).",
  },
  "home.step2.title": { fr: "Choisis ta filière", ar: "اختر شعبتك" },
  "home.step2.desc": {
    fr: "Sélectionne ta filière Bac et, si tu veux, ta ville préférée.",
    ar: "اختر شعبة الباك، وإن أردت، مدينتك المفضلة.",
  },
  "home.step3.title": { fr: "Vois tes écoles", ar: "شاهد مدارسك" },
  "home.step3.desc": {
    fr: "Obtiens la liste des écoles classées selon tes chances : convocable, limite, accès ouvert.",
    ar: "احصل على قائمة المدارس مرتبة حسب حظوظك: قابل للاستدعاء، على الحدّ، ولوج مفتوح.",
  },
  "home.features.title": { fr: "Pensé pour les bacheliers", ar: "مصمم للبكالوريين" },
  "home.feature1.title": { fr: "Deux moyennes, expliquées", ar: "معدلان، موضّحان" },
  "home.feature1.desc": {
    fr: "Comprends la différence entre la moyenne de présélection et la moyenne du Bac.",
    ar: "افهم الفرق بين معدل الانتقاء ومعدل الباكالوريا.",
  },
  "home.feature2.title": { fr: "Données par filière", ar: "معطيات حسب الشعبة" },
  "home.feature2.desc": {
    fr: "Seuils 2023–2025, places et concours pour chaque établissement.",
    ar: "عتبات 2023–2025، المقاعد والمباريات لكل مؤسسة.",
  },
  "home.feature3.title": { fr: "Rapide sur mobile", ar: "سريع على الهاتف" },
  "home.feature3.desc": {
    fr: "Une interface claire et instantanée, en français et en arabe.",
    ar: "واجهة واضحة وفورية، بالفرنسية والعربية.",
  },

  // ── Calculateur ──────────────────────────────────────────────────
  "calc.title": { fr: "Calculateur de moyenne", ar: "حاسبة المعدل" },
  "calc.subtitle": {
    fr: "Deux calculs différents que les bacheliers confondent souvent. Choisis le bon mode.",
    ar: "حسابان مختلفان كثيرًا ما يخلط بينهما البكالوريون. اختر الوضع الصحيح.",
  },
  "calc.modeA": { fr: "Moyenne de présélection", ar: "معدل الانتقاء" },
  "calc.modeA.short": { fr: "Présélection (grandes écoles)", ar: "الانتقاء (المدارس العليا)" },
  "calc.modeB": { fr: "Moyenne du BAC", ar: "معدل الباكالوريا" },
  "calc.modeB.short": { fr: "Diplôme du Bac", ar: "دبلوم الباك" },
  "calc.modeA.formula": {
    fr: "75% National + 25% Régional",
    ar: "75٪ الوطني + 25٪ الجهوي",
  },
  "calc.modeB.formula": {
    fr: "25% Régional + 25% Contrôle continu + 50% National",
    ar: "25٪ الجهوي + 25٪ المراقبة المستمرة + 50٪ الوطني",
  },
  "calc.input.national": { fr: "Note de l'examen National", ar: "نقطة الامتحان الوطني" },
  "calc.input.regional": { fr: "Note de l'examen Régional", ar: "نقطة الامتحان الجهوي" },
  "calc.input.controle": { fr: "Note du Contrôle continu", ar: "نقطة المراقبة المستمرة" },
  "calc.input.placeholder": { fr: "ex. 15,40", ar: "مثال: 15٫40" },
  "calc.input.help": { fr: "Sur 20", ar: "من 20" },
  "calc.result.preselection": { fr: "Ta moyenne de présélection", ar: "معدل الانتقاء الخاص بك" },
  "calc.result.bac": { fr: "Ta moyenne du Bac", ar: "معدل الباكالوريا الخاص بك" },
  "calc.result.empty": {
    fr: "Entre tes notes pour voir le résultat.",
    ar: "أدخل نقطك لرؤية النتيجة.",
  },
  "calc.note.seuils": {
    fr: "C'est la moyenne de présélection (Mode A) qui est comparée aux seuils. La moyenne du Bac sert pour ton diplôme, pas pour la présélection.",
    ar: "معدل الانتقاء (الوضع A) هو ما يُقارن بالعتبات. معدل الباكالوريا يخص دبلومك وليس الانتقاء.",
  },
  "calc.useInSim": { fr: "Utiliser cette moyenne dans le simulateur", ar: "استعمل هذا المعدل في المحاكي" },
  "calc.reverse.toggle": {
    fr: "Combien me faut-il au National pour réussir le Bac ?",
    ar: "كم أحتاج في الوطني للنجاح في الباك؟",
  },
  "calc.reverse.title": { fr: "Note minimale au National pour réussir", ar: "أدنى نقطة في الوطني للنجاح" },
  "calc.reverse.desc": {
    fr: "Tu réussis le Bac si ta moyenne (25% Régional + 25% Contrôle continu + 50% National) atteint 10/20. Indique ton Régional et ton Contrôle continu — on calcule la note National qu'il te faut pour passer.",
    ar: "تنجح في الباك إذا بلغ معدلك (25٪ الجهوي + 25٪ المراقبة المستمرة + 50٪ الوطني) 10/20. أدخل الجهوي والمراقبة المستمرة لنحسب نقطة الوطني اللازمة للنجاح.",
  },
  "calc.reverse.example": {
    fr: "Exemple : Régional 15 et Contrôle continu 15 → il te faut seulement 5/20 au National pour valider.",
    ar: "مثال: الجهوي 15 والمراقبة المستمرة 15 ← يكفيك 5/20 في الوطني للنجاح.",
  },
  "calc.reverse.result": {
    fr: "Note National minimale pour réussir",
    ar: "أدنى نقطة في الوطني للنجاح",
  },
  "calc.reverse.impossible": {
    fr: "Même avec 20/20 au National, ces notes ne suffisent pas pour atteindre 10. Il faudra remonter le Régional ou le Contrôle continu.",
    ar: "حتى بـ 20/20 في الوطني، هذه النقط لا تكفي لبلوغ 10. سيلزم رفع الجهوي أو المراقبة المستمرة.",
  },
  "calc.reverse.already": {
    fr: "Bonne nouvelle : avec ces notes tu valides déjà le Bac, même avec 0 au National.",
    ar: "خبر سار: بهذه النقط تنجح في الباك، حتى بـ 0 في الوطني.",
  },

  // ── Simulateur ───────────────────────────────────────────────────
  "sim.title": { fr: "Où puis-je être admis ?", ar: "أين يمكن قبولي؟" },
  "sim.subtitle": {
    fr: "Entre ta moyenne de présélection et ta filière pour voir les écoles à ta portée.",
    ar: "أدخل معدل الانتقاء وشعبتك لرؤية المدارس في متناولك.",
  },
  "sim.input.moyenne": { fr: "Ta moyenne de présélection", ar: "معدل الانتقاء الخاص بك" },
  "sim.input.moyenne.help": { fr: "La moyenne 75/25 (Mode A). Pas sûr ? Calcule-la d'abord.", ar: "معدل 75/25 (الوضع A). غير متأكد؟ احسبه أولاً." },
  "sim.input.filiere": { fr: "Ta filière Bac", ar: "شعبة الباك" },
  "sim.input.filiere.placeholder": { fr: "Choisis ta filière", ar: "اختر شعبتك" },
  "sim.input.ville": { fr: "Ville préférée (optionnel)", ar: "المدينة المفضلة (اختياري)" },
  "sim.input.ville.all": { fr: "Toutes les villes", ar: "كل المدن" },
  "sim.cta": { fr: "Voir mes écoles", ar: "أظهر مدارسي" },
  "sim.recalc": { fr: "Modifier", ar: "تعديل" },
  "sim.empty.title": { fr: "Prêt à découvrir tes options ?", ar: "مستعد لاكتشاف خياراتك؟" },
  "sim.empty.desc": {
    fr: "Renseigne ta moyenne et ta filière, puis lance la simulation.",
    ar: "أدخل معدلك وشعبتك ثم ابدأ المحاكاة.",
  },
  "sim.needFiliere": { fr: "Choisis ta filière pour continuer.", ar: "اختر شعبتك للمتابعة." },
  "sim.needMoyenne": { fr: "Entre une moyenne entre 0 et 20.", ar: "أدخل معدلاً بين 0 و20." },
  "sim.summary": {
    fr: "Avec {moyenne}/20 en {filiere}, voici tes résultats :",
    ar: "بمعدل {moyenne}/20 في {filiere}، إليك نتائجك:",
  },
  "sim.city.count": {
    fr: "{n} établissement(s) à {ville}",
    ar: "{n} مؤسسة في {ville}",
  },
  "sim.city.showOthers": { fr: "Voir aussi les autres villes", ar: "أظهر أيضًا المدن الأخرى" },
  "sim.city.hideOthers": { fr: "Masquer les autres villes", ar: "إخفاء المدن الأخرى" },
  "sim.city.empty.title": { fr: "Rien à {ville} pour cette filière", ar: "لا شيء في {ville} لهذه الشعبة" },
  "sim.city.empty.desc": {
    fr: "Aucun établissement correspondant dans cette ville. Élargis aux autres villes pour voir tes options.",
    ar: "لا توجد مؤسسة مطابقة في هذه المدينة. وسّع إلى المدن الأخرى لرؤية خياراتك.",
  },
  "sim.noMatch.title": { fr: "Aucune école pour cette filière", ar: "لا توجد مدرسة لهذه الشعبة" },
  "sim.noMatch.desc": {
    fr: "Aucun établissement de notre base n'accepte cette filière pour l'instant. Élargis ta recherche dans l'explorateur.",
    ar: "لا توجد مؤسسة في قاعدتنا تقبل هذه الشعبة حاليًا. وسّع بحثك في المستكشف.",
  },

  // Groups
  "group.convocable": { fr: "Convocable", ar: "قابل للاستدعاء" },
  "group.convocable.desc": { fr: "Tu dépasses le seuil — tu devrais être convoqué.", ar: "أنت تتجاوز العتبة — يُفترض أن تُستدعى." },
  "group.limite": { fr: "Limite — tente quand même", ar: "على الحدّ — جرّب رغم ذلك" },
  "group.limite.desc": { fr: "Tu es juste sous le seuil. Postule, ça se joue à peu.", ar: "أنت تحت العتبة بقليل. ترشّح، الأمر قريب." },
  "group.accesOuvert": { fr: "Accès ouvert", ar: "ولوج مفتوح" },
  "group.accesOuvert.desc": { fr: "Pas de seuil : inscription ouverte à ta filière.", ar: "بدون عتبة: التسجيل مفتوح لشعبتك." },
  "group.selectionDossier": { fr: "Sélection sur dossier — seuil estimé", ar: "انتقاء على الملف — عتبة تقديرية" },
  "group.selectionDossier.desc": {
    fr: "Entrée directe sur dossier. Le seuil réel est publié après l'admission — voici une estimation.",
    ar: "ولوج مباشر على الملف. تُنشر العتبة الحقيقية بعد القبول — هذا تقدير.",
  },
  "group.horsPreselection": { fr: "Hors présélection (post-prépa, dossier, privé)", ar: "خارج الانتقاء (بعد الإعدادية، الملف، الخاص)" },
  "group.horsPreselection.desc": {
    fr: "Pas de seuil après le Bac : recrutement post-CPGE, sur dossier ou propre à l'établissement.",
    ar: "بدون عتبة بعد الباك: توظيف بعد الأقسام التحضيرية، أو على الملف، أو خاص بالمؤسسة.",
  },
  "group.seuilInconnu": { fr: "Seuil non disponible", ar: "العتبة غير متوفرة" },
  "group.seuilInconnu.desc": { fr: "Seuil non publié — à vérifier sur cursussup.", ar: "العتبة غير منشورة — تحقق عبر cursussup." },
  "group.enDessous": { fr: "En dessous du seuil", ar: "تحت العتبة" },
  "group.enDessous.desc": { fr: "Au-dessous de la marge cette année.", ar: "تحت الهامش هذه السنة." },
  "group.enDessous.show": { fr: "Voir les écoles en dessous", ar: "أظهر المدارس تحت العتبة" },
  "group.enDessous.hide": { fr: "Masquer", ar: "إخفاء" },
  "group.count": { fr: "{n} école(s)", ar: "{n} مدرسة" },

  // Card
  "card.seuil": { fr: "Seuil 2025", ar: "عتبة 2025" },
  "card.seuilEstime": { fr: "estimé", ar: "تقديري" },
  "card.estime.tooltip": {
    fr: "Seuil estimé — à confirmer sur cursussup.gov.ma",
    ar: "عتبة تقديرية — للتأكيد عبر cursussup.gov.ma",
  },
  "card.marge": { fr: "Marge", ar: "الهامش" },
  "card.places": { fr: "places", ar: "مقعد" },
  "card.history": { fr: "Historique des seuils", ar: "تاريخ العتبات" },
  "card.tracks": { fr: "Filières acceptées", ar: "الشعب المقبولة" },
  "card.site": { fr: "Site officiel", ar: "الموقع الرسمي" },
  "card.details": { fr: "Détails", ar: "التفاصيل" },
  "card.close": { fr: "Fermer", ar: "إغلاق" },
  "card.openAccess": { fr: "Accès ouvert", ar: "ولوج مفتوح" },
  "card.noSeuil": { fr: "Seuil non disponible", ar: "العتبة غير متوفرة" },
  "card.seuilTrack": { fr: "Seuil {track}", ar: "عتبة {track}" },
  "card.horsPreselection": { fr: "Hors présélection", ar: "خارج الانتقاء" },
  "card.variable": { fr: "Variable selon filière", ar: "متغيّرة حسب الشعبة" },

  // ── Explorer ─────────────────────────────────────────────────────
  "explore.title": { fr: "Explorer les écoles", ar: "استكشف المدارس" },
  "explore.subtitle": {
    fr: "Filtre et cherche parmi tous les établissements de notre base.",
    ar: "صفِّ وابحث بين كل مؤسسات قاعدتنا.",
  },
  "explore.search": { fr: "Rechercher une école, une ville…", ar: "ابحث عن مدرسة أو مدينة…" },
  "explore.filter.domaine": { fr: "Domaine", ar: "المجال" },
  "explore.filter.ville": { fr: "Ville", ar: "المدينة" },
  "explore.filter.secteur": { fr: "Secteur", ar: "القطاع" },
  "explore.filter.acces": { fr: "Type d'accès", ar: "نوع الولوج" },
  "explore.filter.all": { fr: "Tous", ar: "الكل" },
  "explore.secteur.public": { fr: "Public", ar: "عمومي" },
  "explore.secteur.prive": { fr: "Privé", ar: "خاص" },
  "explore.results": { fr: "{n} établissement(s)", ar: "{n} مؤسسة" },
  "explore.empty": {
    fr: "Aucun établissement ne correspond à ta recherche.",
    ar: "لا توجد مؤسسة تطابق بحثك.",
  },
  "explore.reset": { fr: "Réinitialiser les filtres", ar: "إعادة ضبط الفلاتر" },

  // ── À propos / FAQ ───────────────────────────────────────────────
  "about.title": { fr: "À propos & FAQ", ar: "حول والأسئلة الشائعة" },
  "about.subtitle": {
    fr: "Comprendre les seuils, la présélection et comment ces données sont tenues à jour.",
    ar: "فهم العتبات والانتقاء وكيف تُحدَّث هذه المعطيات.",
  },
  "about.q1": { fr: "C'est quoi un « seuil » de présélection ?", ar: "ما هي «عتبة» الانتقاء؟" },
  "about.a1": {
    fr: "Le seuil est la moyenne de présélection minimale qu'un établissement a retenue une année donnée pour convoquer les candidats. Il varie chaque année selon le nombre de candidats et de places.",
    ar: "العتبة هي الحد الأدنى لمعدل الانتقاء الذي اعتمدته مؤسسة في سنة معينة لاستدعاء المترشحين. تتغير كل سنة حسب عدد المترشحين والمقاعد.",
  },
  "about.q2": { fr: "Présélection ou moyenne du Bac : quelle différence ?", ar: "الانتقاء أم معدل الباك: ما الفرق؟" },
  "about.a2": {
    fr: "La moyenne de présélection (75% National + 25% Régional) sert à candidater aux grandes écoles et c'est elle qui est comparée aux seuils. La moyenne du Bac (25% Régional + 25% Contrôle continu + 50% National) figure sur ton diplôme.",
    ar: "معدل الانتقاء (75٪ الوطني + 25٪ الجهوي) يُستعمل للترشح للمدارس العليا وهو ما يُقارن بالعتبات. أما معدل الباك (25٪ الجهوي + 25٪ المراقبة المستمرة + 50٪ الوطني) فيظهر في دبلومك.",
  },
  "about.q3": { fr: "Être au-dessus du seuil = admis ?", ar: "تجاوز العتبة = القبول؟" },
  "about.a3": {
    fr: "Non. Être au-dessus du seuil te donne le droit d'être convoqué au concours (écrit/entretien). L'admission finale dépend de ce concours.",
    ar: "لا. تجاوز العتبة يمنحك حق الاستدعاء للمباراة (كتابي/مقابلة). القبول النهائي يعتمد على هذه المباراة.",
  },
  "about.q4": { fr: "D'où viennent les données ?", ar: "من أين تأتي المعطيات؟" },
  "about.a4": {
    fr: "D'une base maintenue à la main à partir des seuils publiés les années précédentes. Beaucoup de seuils 2025 sont des estimations (badge « estimé ») tant que les chiffres officiels ne sont pas sortis.",
    ar: "من قاعدة تُحدَّث يدويًا انطلاقًا من العتبات المنشورة في السنوات السابقة. كثير من عتبات 2025 تقديرية (شارة «تقديري») ما لم تصدر الأرقام الرسمية.",
  },
  "about.q5": { fr: "Comment vérifier officiellement ?", ar: "كيف أتحقق رسميًا؟" },
  "about.a5": {
    fr: "Consulte toujours le portail officiel cursussup.gov.ma pour les seuils, dates et procédures à jour.",
    ar: "اطّلع دائمًا على البوابة الرسمية cursussup.gov.ma للعتبات والتواريخ والمساطر المحدثة.",
  },
  "about.contact.title": { fr: "Contact", ar: "اتصال" },
  "about.contact.desc": {
    fr: "Une correction sur un seuil ? Une école manquante ? Écris-nous.",
    ar: "تصحيح في عتبة؟ مدرسة ناقصة؟ راسلنا.",
  },

  // ── Disclaimer / footer ──────────────────────────────────────────
  "disclaimer": {
    fr: "Les seuils affichés sont indicatifs et peuvent être estimés. Vérifie toujours les seuils officiels sur cursussup.gov.ma. Être au-dessus du seuil donne le droit de passer le concours, pas une admission garantie.",
    ar: "العتبات المعروضة إرشادية وقد تكون تقديرية. تحقق دائمًا من العتبات الرسمية عبر cursussup.gov.ma. تجاوز العتبة يمنح حق اجتياز المباراة، وليس قبولًا مضمونًا.",
  },
  "disclaimer.short": {
    fr: "Seuils indicatifs — vérifie sur cursussup.gov.ma.",
    ar: "عتبات إرشادية — تحقق عبر cursussup.gov.ma.",
  },
  "footer.updated": { fr: "Données mises à jour", ar: "آخر تحديث للمعطيات" },
  "footer.official": { fr: "Portail officiel", ar: "البوابة الرسمية" },
  "footer.madeFor": { fr: "Fait pour les bacheliers marocains.", ar: "صُنع للبكالوريين المغاربة." },
  "footer.rights": { fr: "Outil indépendant — non affilié au Ministère.", ar: "أداة مستقلة — غير تابعة للوزارة." },

  // ── Share ────────────────────────────────────────────────────────
  "share.button": { fr: "Partager", ar: "مشاركة" },
  "share.copied": { fr: "Lien copié !", ar: "تم نسخ الرابط!" },
  "share.text": {
    fr: "J'ai trouvé où je peux être admis avec ma note du Bac 👇",
    ar: "وجدت أين يمكن قبولي بمعدل الباك 👇",
  },

  // ── Footer legal / nav ───────────────────────────────────────────
  "footer.legal": { fr: "Légal", ar: "قانوني" },
  "nav.confidentialite": { fr: "Confidentialité", ar: "الخصوصية" },
  "nav.cookies": { fr: "Cookies", ar: "ملفات تعريف الارتباط" },
  "nav.conditions": { fr: "Conditions d'utilisation", ar: "شروط الاستخدام" },
  "nav.guides": { fr: "Guides", ar: "أدلة" },

  // ── Terms page (title; body lives in the page) ───────────────────
  "terms.title": { fr: "Conditions d'utilisation", ar: "شروط الاستخدام" },
  "terms.subtitle": {
    fr: "Les règles d'usage de Bacullator, simplement expliquées.",
    ar: "قواعد استعمال Bacullator، موضّحة ببساطة.",
  },

  // ── Guides (blog) ────────────────────────────────────────────────
  "guides.title": { fr: "Guides du bachelier", ar: "أدلة البكالوريا" },
  "guides.subtitle": {
    fr: "Comprends la présélection, les seuils et comment bien postuler — expliqué simplement.",
    ar: "افهم الانتقاء والعتبات وكيفية الترشّح جيدًا — بشرح بسيط.",
  },
  "guides.back": { fr: "Tous les guides", ar: "كل الأدلة" },
  "guides.minRead": { fr: "min de lecture", ar: "دقيقة قراءة" },
  "guides.readMore": { fr: "Lire le guide", ar: "اقرأ الدليل" },
  "guides.ctaTitle": { fr: "Passe à la pratique", ar: "انتقل إلى التطبيق" },
  "guides.ctaText": {
    fr: "Calcule ta moyenne, puis vois les écoles à ta portée.",
    ar: "احسب معدلك ثم اطّلع على المدارس في متناولك.",
  },

  // ── Cookie consent banner ────────────────────────────────────────
  "consent.title": { fr: "Cookies & confidentialité", ar: "ملفات تعريف الارتباط والخصوصية" },
  "consent.text": {
    fr: "On utilise des cookies pour la mesure d'audience et la publicité. Rien n'est chargé tant que tu n'as pas accepté.",
    ar: "نستعمل ملفات تعريف الارتباط لقياس الزيارات والإعلانات. لا يُحمَّل أي شيء قبل موافقتك.",
  },
  "consent.accept": { fr: "Accepter", ar: "قبول" },
  "consent.refuse": { fr: "Refuser", ar: "رفض" },
  "consent.learnMore": { fr: "En savoir plus", ar: "اعرف المزيد" },
  "consent.manage": { fr: "Gérer les cookies", ar: "إدارة ملفات تعريف الارتباط" },
  "consent.current.accepted": { fr: "Choix actuel : accepté", ar: "الاختيار الحالي: مقبول" },
  "consent.current.refused": { fr: "Choix actuel : refusé", ar: "الاختيار الحالي: مرفوض" },
  "consent.current.none": { fr: "Choix actuel : non défini", ar: "الاختيار الحالي: غير محدد" },
  "consent.reset": { fr: "Modifier mon choix", ar: "تعديل اختياري" },

  // ── Privacy / cookies pages (titles; body lives in the page) ──────
  "privacy.title": { fr: "Politique de confidentialité", ar: "سياسة الخصوصية" },
  "privacy.subtitle": {
    fr: "Quelles données sont collectées, pourquoi, et comment exercer tes droits.",
    ar: "ما هي البيانات التي تُجمع، ولماذا، وكيف تمارس حقوقك.",
  },
  "privacy.updated": { fr: "Dernière mise à jour", ar: "آخر تحديث" },
  "cookies.title": { fr: "Politique relative aux cookies", ar: "سياسة ملفات تعريف الارتباط" },
  "cookies.subtitle": {
    fr: "Les cookies utilisés sur le site et comment les contrôler.",
    ar: "ملفات تعريف الارتباط المستعملة في الموقع وكيفية التحكم فيها.",
  },
  "cookies.table.name": { fr: "Cookie / outil", ar: "ملف / أداة" },
  "cookies.table.purpose": { fr: "Finalité", ar: "الغرض" },
  "cookies.table.type": { fr: "Type", ar: "النوع" },

  // ── Per-school page ──────────────────────────────────────────────
  "ecole.back": { fr: "Toutes les écoles", ar: "كل المدارس" },
  "ecole.cta": { fr: "Simuler mon admission", ar: "محاكاة قبولي" },
  "ecole.infos": { fr: "Informations", ar: "معلومات" },
  "ecole.university": { fr: "Université / Tutelle", ar: "الجامعة / الوصاية" },
  "ecole.access": { fr: "Type d'accès", ar: "نوع الولوج" },
  "ecole.secteur": { fr: "Secteur", ar: "القطاع" },
  "ecole.domaine": { fr: "Domaine", ar: "المجال" },
  "ecole.notFound": { fr: "École introuvable.", ar: "المدرسة غير موجودة." },
  "ecole.metaDesc": {
    fr: "Seuils {sigle} ({ville}) : présélection, places et filières acceptées. Vérifie sur cursussup.gov.ma.",
    ar: "عتبات {sigle} ({ville}): الانتقاء، المقاعد والشعب المقبولة. تحقق عبر cursussup.gov.ma.",
  },

  // ── Misc ─────────────────────────────────────────────────────────
  "common.loading": { fr: "Chargement…", ar: "جارٍ التحميل…" },
  "common.optional": { fr: "optionnel", ar: "اختياري" },
} as const;

export type DictKey = keyof typeof dict;
