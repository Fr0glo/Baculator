// Original editorial content (FR + AR) for the Guides section.
// This is hand-written, unique content — important for both SEO and AdSense
// ("substantial original content"). Keep it accurate and link to the tools.

export type Bilingue = { fr: string; ar: string };
export type GuideSection = { h: Bilingue; p: Bilingue[] };

export type Guide = {
  slug: string;
  title: Bilingue;
  description: Bilingue;
  readingMinutes: number;
  sections: GuideSection[];
};

export const GUIDES: Guide[] = [
  {
    slug: "comprendre-la-preselection",
    readingMinutes: 4,
    title: {
      fr: "La présélection au Maroc : comment ça marche vraiment",
      ar: "الانتقاء بالمغرب: كيف يشتغل فعلاً",
    },
    description: {
      fr: "Présélection, seuils, concours : le parcours d'admission aux grandes écoles marocaines expliqué simplement, étape par étape.",
      ar: "الانتقاء، العتبات، المباريات: مسار القبول في المدارس العليا المغربية بشرح بسيط، خطوة بخطوة.",
    },
    sections: [
      {
        h: { fr: "C'est quoi la présélection ?", ar: "ما هو الانتقاء؟" },
        p: [
          {
            fr: `Après le Bac, beaucoup de grandes écoles (ENSA, ENCG, ENSAM, médecine, écoles d'architecture…) reçoivent bien plus de candidats que de places. Pour faire un premier tri, elles utilisent une « présélection » : un classement des candidats selon une moyenne calculée à partir de tes notes du Bac. Si tu es assez haut dans ce classement, tu es convoqué à l'étape suivante (concours écrit, entretien, test…).`,
            ar: `بعد الباكالوريا، تتلقى مدارس عليا كثيرة (ENSA، ENCG، ENSAM، الطب، مدارس الهندسة المعمارية…) عددًا من المترشحين يفوق بكثير عدد المقاعد. لإجراء فرز أولي، تعتمد «الانتقاء»: ترتيب المترشحين حسب معدل يُحتسب من نقط الباك. إذا كنت في مرتبة كافية ضمن هذا الترتيب، تُستدعى إلى المرحلة الموالية (مباراة كتابية، مقابلة، اختبار…).`,
          },
        ],
      },
      {
        h: { fr: "La formule : 75% National + 25% Régional", ar: "المعادلة: 75٪ الوطني + 25٪ الجهوي" },
        p: [
          {
            fr: `La moyenne de présélection se calcule ainsi : 75% de ta note à l'examen National plus 25% de ta note à l'examen Régional. L'examen National pèse donc trois fois plus que le Régional. C'est pour ça qu'on dit souvent que « tout se joue au National » : une bonne note nationale fait monter ta moyenne de présélection beaucoup plus vite.`,
            ar: `يُحتسب معدل الانتقاء كالتالي: 75٪ من نقطة الامتحان الوطني زائد 25٪ من نقطة الامتحان الجهوي. أي أن الوطني يزن ثلاثة أضعاف الجهوي. لهذا يُقال غالبًا إن «كل شيء يُحسم في الوطني»: نقطة وطنية جيدة ترفع معدل انتقائك بسرعة أكبر بكثير.`,
          },
          {
            fr: `Tu peux calculer cette moyenne en quelques secondes avec notre calculateur, puis l'envoyer directement dans le simulateur d'admission.`,
            ar: `يمكنك حساب هذا المعدل في ثوانٍ عبر حاسبتنا، ثم إرساله مباشرة إلى محاكي القبول.`,
          },
        ],
      },
      {
        h: { fr: "Le seuil : la barre à dépasser", ar: "العتبة: الحدّ الواجب تجاوزه" },
        p: [
          {
            fr: `Chaque école retient les meilleurs candidats jusqu'à remplir ses places. La moyenne du dernier candidat retenu devient le « seuil » de l'année. Si ta moyenne de présélection est au-dessus du seuil d'une école, tu avais ta place dans la convocation cette année-là. Les seuils changent chaque année selon le nombre de candidats et de places.`,
            ar: `تحتفظ كل مدرسة بأفضل المترشحين إلى أن تملأ مقاعدها. يصبح معدل آخر مترشح مقبول هو «عتبة» تلك السنة. إذا كان معدل انتقائك أعلى من عتبة مدرسة ما، فقد كان لك مكان في الاستدعاء تلك السنة. تتغير العتبات كل سنة حسب عدد المترشحين والمقاعد.`,
          },
        ],
      },
      {
        h: { fr: "Au-dessus du seuil ≠ admis", ar: "تجاوز العتبة ≠ القبول" },
        p: [
          {
            fr: `Point essentiel : dépasser le seuil te donne le droit d'être convoqué, pas une admission garantie. La plupart des écoles organisent ensuite un concours (écrit et/ou oral). C'est ta performance à ce concours qui décide de l'admission finale. La présélection ouvre la porte ; le concours la franchit.`,
            ar: `نقطة جوهرية: تجاوز العتبة يمنحك حق الاستدعاء، وليس قبولًا مضمونًا. تنظّم أغلب المدارس بعد ذلك مباراة (كتابية و/أو شفوية). أداؤك في هذه المباراة هو ما يحدد القبول النهائي. الانتقاء يفتح الباب؛ والمباراة تعبره.`,
          },
          {
            fr: `Dernier conseil : les seuils officiels et les dates se trouvent sur le portail cursussup.gov.ma. Utilise Bacullator pour estimer et explorer, puis confirme toujours sur le site officiel.`,
            ar: `نصيحة أخيرة: تجد العتبات الرسمية والتواريخ في بوابة cursussup.gov.ma. استعمل Bacullator للتقدير والاستكشاف، ثم تحقق دائمًا من الموقع الرسمي.`,
          },
        ],
      },
    ],
  },
  {
    slug: "preselection-vs-moyenne-du-bac",
    readingMinutes: 3,
    title: {
      fr: "Moyenne de présélection vs moyenne du Bac : ne les confonds plus",
      ar: "معدل الانتقاء ومعدل الباك: لا تخلط بينهما بعد الآن",
    },
    description: {
      fr: "Deux moyennes, deux formules, deux usages. On t'explique laquelle compte pour les grandes écoles, avec un exemple chiffré.",
      ar: "معدلان، معادلتان، استعمالان. نوضّح لك أيّهما يهم المدارس العليا، مع مثال رقمي.",
    },
    sections: [
      {
        h: { fr: "Deux moyennes différentes", ar: "معدلان مختلفان" },
        p: [
          {
            fr: `C'est l'une des confusions les plus fréquentes chez les bacheliers. Il existe deux moyennes qui n'ont pas le même rôle : la moyenne du Bac (celle de ton diplôme) et la moyenne de présélection (celle qui sert à candidater aux grandes écoles). Elles se calculent différemment et donnent souvent des chiffres différents.`,
            ar: `هذا من أكثر الالتباسات شيوعًا لدى البكالوريين. هناك معدلان لا يؤديان الدور نفسه: معدل الباك (معدل دبلومك) ومعدل الانتقاء (الذي يُستعمل للترشح للمدارس العليا). يُحتسبان بطريقتين مختلفتين ويعطيان غالبًا أرقامًا مختلفة.`,
          },
        ],
      },
      {
        h: { fr: "La moyenne du Bac (le diplôme)", ar: "معدل الباك (الدبلوم)" },
        p: [
          {
            fr: `La moyenne du Bac est celle qui figure sur ton diplôme. Elle combine : 25% de la note Régional (2e année / 1re année selon le parcours), 25% du contrôle continu et 50% de la note de l'examen National. C'est elle qui détermine si tu obtiens ton Bac (moyenne ≥ 10) et ta mention.`,
            ar: `معدل الباك هو الذي يظهر في دبلومك. يجمع: 25٪ من نقطة الجهوي، و25٪ من المراقبة المستمرة، و50٪ من نقطة الامتحان الوطني. هو الذي يحدد هل تحصل على الباك (معدل ≥ 10) وميزتك.`,
          },
        ],
      },
      {
        h: { fr: "La moyenne de présélection (les écoles)", ar: "معدل الانتقاء (المدارس)" },
        p: [
          {
            fr: `La moyenne de présélection, elle, combine seulement 75% du National et 25% du Régional. Le contrôle continu n'y entre pas. C'est exactement cette moyenne-là que les seuils de cursussup comparent. Donc pour savoir à quelles écoles tu peux être convoqué, c'est la moyenne de présélection qu'il faut calculer — pas celle du diplôme.`,
            ar: `أما معدل الانتقاء فيجمع فقط 75٪ من الوطني و25٪ من الجهوي. المراقبة المستمرة لا تدخل فيه. وهذا بالضبط هو المعدل الذي تقارنه عتبات cursussup. لذا، لمعرفة المدارس التي يمكن استدعاؤك إليها، يجب حساب معدل الانتقاء — وليس معدل الدبلوم.`,
          },
        ],
      },
      {
        h: { fr: "Un exemple pour bien voir", ar: "مثال للتوضيح" },
        p: [
          {
            fr: `Imagine : National 16, Régional 12, contrôle continu 15. Ta moyenne du Bac = 0,25×12 + 0,25×15 + 0,50×16 = 14,75. Ta moyenne de présélection = 0,75×16 + 0,25×12 = 15,00. Deux chiffres différents pour le même élève ! Une école qui affiche un seuil de 14,9 te compare à 15,00 (présélection), pas à 14,75. La différence peut tout changer.`,
            ar: `تخيّل: الوطني 16، الجهوي 12، المراقبة المستمرة 15. معدل الباك = 0٫25×12 + 0٫25×15 + 0٫50×16 = 14٫75. ومعدل الانتقاء = 0٫75×16 + 0٫25×12 = 15٫00. رقمان مختلفان لنفس التلميذ! مدرسة عتبتها 14٫9 تقارنك بـ 15٫00 (الانتقاء)، لا بـ 14٫75. الفرق قد يغيّر كل شيء.`,
          },
        ],
      },
    ],
  },
  {
    slug: "comprendre-les-seuils",
    readingMinutes: 4,
    title: {
      fr: "C'est quoi un seuil, et pourquoi il change chaque année",
      ar: "ما هي العتبة، ولماذا تتغيّر كل سنة",
    },
    description: {
      fr: "D'où viennent les seuils, ce qui les fait monter ou baisser, et comment les lire pour postuler intelligemment.",
      ar: "من أين تأتي العتبات، وما الذي يرفعها أو يخفضها، وكيف تقرأها للترشّح بذكاء.",
    },
    sections: [
      {
        h: { fr: "Un seuil, c'est quoi exactement ?", ar: "ما هي العتبة بالضبط؟" },
        p: [
          {
            fr: `Un seuil n'est pas une note fixée à l'avance par l'école. C'est le résultat du classement : les candidats sont rangés du plus haut au plus bas selon leur moyenne de présélection, et l'école descend dans la liste jusqu'à remplir ses places. La moyenne du tout dernier admis devient le seuil de l'année. Autrement dit, le seuil est constaté, pas décidé.`,
            ar: `العتبة ليست نقطة تحددها المدرسة مسبقًا. هي نتيجة الترتيب: يُرتَّب المترشحون من الأعلى إلى الأدنى حسب معدل الانتقاء، وتنزل المدرسة في اللائحة إلى أن تملأ مقاعدها. يصبح معدل آخر مقبول هو عتبة السنة. أي أن العتبة تُلاحَظ، لا تُقرَّر.`,
          },
        ],
      },
      {
        h: { fr: "Pourquoi il monte ou descend", ar: "لماذا ترتفع أو تنخفض" },
        p: [
          {
            fr: `Deux forces principales font bouger un seuil. D'abord le nombre de candidats : plus une filière est demandée une année, plus la concurrence est forte et plus le seuil monte. Ensuite le nombre de places : si une école ouvre plus de places, elle descend plus bas dans le classement et le seuil baisse. La difficulté de l'examen National et la « générosité » de la correction jouent aussi sur le niveau général des moyennes.`,
            ar: `قوّتان رئيسيتان تحرّكان العتبة. أولًا عدد المترشحين: كلما زاد الإقبال على شعبة في سنة، اشتدت المنافسة وارتفعت العتبة. ثانيًا عدد المقاعد: إذا فتحت مدرسة مقاعد أكثر، نزلت أكثر في الترتيب فانخفضت العتبة. كما تؤثر صعوبة الامتحان الوطني و«سخاء» التصحيح على المستوى العام للمعدلات.`,
          },
        ],
      },
      {
        h: { fr: "Seuil officiel vs seuil estimé", ar: "عتبة رسمية مقابل عتبة تقديرية" },
        p: [
          {
            fr: `Tant que les chiffres officiels d'une année ne sont pas publiés, on travaille souvent avec des estimations basées sur les années précédentes. Sur Bacullator, ces valeurs portent un badge « estimé ». Prends-les comme un ordre de grandeur, pas comme une vérité exacte : un seuil estimé à 15,2 peut très bien finir à 14,9 ou 15,6 selon l'année.`,
            ar: `ما لم تُنشر الأرقام الرسمية لسنة ما، نعتمد غالبًا على تقديرات مبنية على السنوات السابقة. في Bacullator، تحمل هذه القيم شارة «تقديري». اعتبرها رتبة تقريبية لا حقيقة دقيقة: عتبة مقدَّرة بـ 15٫2 قد تنتهي عند 14٫9 أو 15٫6 حسب السنة.`,
          },
        ],
      },
      {
        h: { fr: "Comment t'en servir intelligemment", ar: "كيف تستعملها بذكاء" },
        p: [
          {
            fr: `Ne regarde pas un seuil isolé : regarde la tendance sur trois ans. Un seuil stable est plus fiable qu'un seuil qui a fait le yo-yo. Et garde une marge : viser une école dont le seuil est juste sous ta moyenne est risqué, car il peut remonter. Le simulateur de Bacullator classe justement les écoles selon le confort de ta marge — utilise-le pour repérer où tu passes largement et où ça se joue de peu.`,
            ar: `لا تنظر إلى عتبة معزولة: انظر إلى الاتجاه على ثلاث سنوات. العتبة المستقرة أكثر موثوقية من عتبة متذبذبة. واحتفظ بهامش: استهداف مدرسة عتبتها أسفل معدلك بقليل أمر محفوف بالمخاطر لأنها قد ترتفع. محاكي Bacullator يرتّب المدارس حسب راحة هامشك — استعمله لتعرف أين تتجاوز بأريحية وأين يكون الأمر قريبًا.`,
          },
        ],
      },
    ],
  },
  {
    slug: "comment-bien-postuler",
    readingMinutes: 3,
    title: {
      fr: "Comment bien choisir où postuler avec ta moyenne",
      ar: "كيف تختار جيدًا أين تترشّح بمعدلك",
    },
    description: {
      fr: "Une stratégie simple pour ne pas gaspiller tes choix : viser un mélange d'écoles sûres, réalistes et ambitieuses.",
      ar: "استراتيجية بسيطة لئلا تُهدر اختياراتك: استهدف مزيجًا من مدارس مضمونة وواقعية وطموحة.",
    },
    sections: [
      {
        h: { fr: "Vise un mélange, pas une seule école", ar: "استهدف مزيجًا، لا مدرسة واحدة" },
        p: [
          {
            fr: `L'erreur classique est de ne candidater qu'aux écoles les plus prestigieuses, ou au contraire de jouer la sécurité partout. La bonne stratégie est un mélange : quelques écoles « sûres » (ton seuil largement au-dessus), quelques écoles « réalistes » (tu es juste au-dessus) et une ou deux écoles « ambitieuses » (tu es un peu en dessous, mais le seuil peut baisser). Ainsi tu maximises tes chances sans te fermer de portes.`,
            ar: `الخطأ الشائع هو الترشح فقط للمدارس الأكثر هيبة، أو على العكس اللعب على المضمون في كل مكان. الاستراتيجية الجيدة مزيج: بعض المدارس «المضمونة» (معدلك يفوق عتبتها بوضوح)، وبعض «الواقعية» (أنت فوقها بقليل)، وواحدة أو اثنتان «طموحة» (أنت تحتها قليلًا، لكن العتبة قد تنخفض). هكذا ترفع حظوظك دون أن تغلق على نفسك الأبواب.`,
          },
        ],
      },
      {
        h: { fr: "Sers-toi du simulateur", ar: "استعن بالمحاكي" },
        p: [
          {
            fr: `Plutôt que de comparer les seuils un par un, entre ta moyenne de présélection et ta filière dans le simulateur. Il classe automatiquement les écoles en « convocable », « limite » et « accès ouvert », et trie chaque groupe par confort de marge. Tu vois d'un coup d'œil où tu passes tranquillement et où il faut tenter ta chance.`,
            ar: `بدل مقارنة العتبات واحدة واحدة، أدخل معدل انتقائك وشعبتك في المحاكي. يصنّف المدارس تلقائيًا إلى «قابل للاستدعاء» و«على الحدّ» و«ولوج مفتوح»، ويرتّب كل مجموعة حسب راحة الهامش. ترى بنظرة واحدة أين تمرّ بأريحية وأين عليك أن تجرّب حظك.`,
          },
        ],
      },
      {
        h: { fr: "Pense aussi à la ville et au privé", ar: "فكّر أيضًا في المدينة والخاص" },
        p: [
          {
            fr: `La ville compte : étudier loin de chez toi a un coût (logement, transport) qu'il faut anticiper. Le simulateur peut faire remonter en priorité les écoles de ta ville préférée. Pense aussi aux facultés à accès ouvert : sans seuil, elles t'acceptent selon ta filière et constituent un excellent « plan B ». Enfin, les établissements privés ont leurs propres procédures, souvent sur dossier et entretien.`,
            ar: `المدينة مهمة: الدراسة بعيدًا عن بيتك لها كلفة (سكن، تنقّل) يجب توقّعها. يمكن للمحاكي أن يرفع أولوية مدارس مدينتك المفضلة. فكّر أيضًا في الكليات ذات الولوج المفتوح: بدون عتبة، تقبلك حسب شعبتك وتشكّل «خطة بديلة» ممتازة. أخيرًا، للمؤسسات الخاصة مساطرها الخاصة، غالبًا عبر الملف والمقابلة.`,
          },
        ],
      },
      {
        h: { fr: "Et après la convocation ?", ar: "وماذا بعد الاستدعاء؟" },
        p: [
          {
            fr: `Une fois convoqué, prépare le concours : annales, tests de logique, entretien selon l'école. Être bien classé en présélection est un avantage, mais le concours peut rebattre les cartes. Reste organisé, note les dates sur cursussup, et ne mise jamais sur une seule convocation.`,
            ar: `بمجرد استدعائك، حضّر للمباراة: الامتحانات السابقة، اختبارات المنطق، المقابلة حسب المدرسة. ترتيب جيد في الانتقاء ميزة، لكن المباراة قد تعيد خلط الأوراق. ابقَ منظّمًا، دوّن التواريخ على cursussup، ولا تراهن أبدًا على استدعاء واحد.`,
          },
        ],
      },
    ],
  },
];

export function guideForSlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
