# 🎓 Bacullator

Un site **gratuit, rapide et mobile-first** pour les bacheliers marocains :

1. **Calculateur de moyenne** — deux modes que les élèves confondent souvent :
   - **Moyenne de présélection** (grandes écoles) : `75% National + 25% Régional` — c'est **celle que les seuils comparent**.
   - **Moyenne du BAC** (le diplôme) : `25% Régional + 25% Contrôle continu + 50% National`.
   - Avec un **calcul inversé** : « combien me faut-il au National pour **réussir le Bac** (moyenne ≥ 10) ? »
   - Chaque mode pousse son résultat vers le simulateur en un tap.
2. **Simulateur d'admission** — l'élève entre sa moyenne de présélection + sa filière + (optionnel) une ville, et voit **où il peut être convoqué**, classé par confort par rapport au seuil.
3. **Explorateur d'écoles** + une **page par école** (SEO : « seuil ENCG Settat »), **FAQ**, mode **clair/sombre**, bascule **Français / العربية (RTL)**, **bannière de consentement** aux cookies, et **mesure d'audience + pub** activées seulement après accord.

> ⚠️ Les seuils affichés sont **indicatifs et parfois estimés**. Vérifie toujours sur **[cursussup.gov.ma](https://cursussup.gov.ma)**. Être au-dessus du seuil donne le droit de **passer le concours**, pas une admission garantie.

---

## 🧰 Technologies

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **Export statique** (aucun serveur nécessaire) → hébergement gratuit
- Données **100% locales** dans un fichier JSON (pas de base de données)

---

## 🚀 Démarrage rapide (pour débuter)

Tu n'es pas développeur ? Pas de panique, suis ces étapes dans l'ordre.

### 1. Installer Node.js

Télécharge et installe **Node.js (version LTS)** depuis <https://nodejs.org>.
Pour vérifier que c'est bon, ouvre un terminal et tape :

```bash
node --version
```

Tu dois voir un numéro (par ex. `v20.x` ou `v22.x`).

### 2. Installer les dépendances du projet

Dans le terminal, place-toi dans le dossier du projet, puis :

```bash
npm install
```

### 3. Lancer le site en local

```bash
npm run dev
```

Ouvre ton navigateur sur **<http://localhost:3000>**. 🎉
Le site se recharge automatiquement quand tu modifies un fichier.

### 4. Construire la version finale (production)

```bash
npm run build
```

Le site statique est généré dans le dossier **`out/`**. C'est ce dossier qui sera mis en ligne.

Pour **prévisualiser** cette version de production en local :

```bash
npm start      # (= npm run preview) sert le dossier out/ sur http://localhost:3000
```

> ⚠️ N'utilise **pas** `next start` directement : comme le site est exporté en statique
> (`output: "export"`), il n'y a pas de serveur Node à lancer — d'où l'erreur
> « Could not find a production build ». `npm start` est configuré pour servir `out/`.

### 5. (Optionnel) Lancer les tests

```bash
npm test
```

Vérifie automatiquement les formules du calculateur et la logique du simulateur
(`scripts/test.mjs`). Pratique après avoir modifié les données pour s'assurer que
rien n'est cassé.

---

## 🔄 Mettre à jour les données des écoles

Les écoles, seuils et places viennent d'un fichier Excel que **tu** maintiens.

1. Ouvre/édite ton fichier **`Etablissements_Maroc_BAC.xlsx`** (feuille `Etablissements`).
2. Place-le dans le dossier **`data/`** du projet (à côté de ce README) :
   `data/Etablissements_Maroc_BAC.xlsx`
3. Lance la conversion :

   ```bash
   npm run data
   ```

4. Le fichier **`src/data/etablissements.json`** est régénéré automatiquement. Relance `npm run dev` ou `npm run build`.

### Colonnes attendues (en-têtes exacts)

```
ID, Etablissement, Sigle, Ville, Universite / Tutelle, Secteur, Domaine,
Type d'acces, Filieres Bac acceptees, Concours apres preselection,
Seuil 2025, Seuil 2024, Seuil 2023, Nb de places 2025, Site web, Notes
```

### Comment écrire les seuils (très important)

| Tu écris dans la case `Seuil 2025` | Le site comprend |
| --- | --- |
| `14.5` | Seuil **officiel/connu** |
| `≈14.20` | Seuil **estimé** (badge « estimé » affiché) |
| `N/A` | **Accès ouvert** (pas de seuil, admission selon la filière) |
| *(vide)* | **Seuil inconnu** → le site affiche « à vérifier » |

### Filières (`Filieres Bac acceptees`)

- Liste de codes séparés par des virgules : `SM, PC, SVT, SAgr, STE, STM, SGC, SE, LSH`
- Ou bien `Toutes filieres` (= accepte tout le monde)
- Ou un texte libre comme `Variable selon filiere`

> 💡 Si le fichier `.xlsx` est absent, `npm run data` **ne casse rien** : il garde l'exemple déjà inclus, et le site continue de fonctionner.

---

## 🌍 Déployer gratuitement sur Vercel (recommandé)

Vercel héberge ce type de site **gratuitement**. Voici la méthode pas à pas.

### Étape A — Mettre le code sur GitHub

1. Crée un compte sur <https://github.com> (gratuit).
2. Crée un **nouveau dépôt** (bouton « New repository »), nomme-le par ex. `bacullator`.
3. Envoie le code (dans le terminal, depuis le dossier du projet) :

   ```bash
   git init
   git add .
   git commit -m "Première version du site"
   git branch -M main
   git remote add origin https://github.com/TON-PSEUDO/bacullator.git
   git push -u origin main
   ```

   *(Remplace `TON-PSEUDO` par ton nom d'utilisateur GitHub.)*

### Étape B — Connecter Vercel

1. Va sur <https://vercel.com> et connecte-toi **avec ton compte GitHub**.
2. Clique sur **« Add New… » → « Project »**.
3. Choisis ton dépôt `bacullator` puis **« Import »**.
4. Vercel détecte Next.js tout seul. Laisse les réglages par défaut et clique **« Deploy »**.
5. Attends ~1 minute ⏳ → ton site est en ligne sur une adresse du type
   `https://bacullator.vercel.app`. 🎉

> À chaque fois que tu fais `git push`, **Vercel redéploie automatiquement**.

### Étape C (alternative) — Netlify

1. Sur <https://netlify.com>, « Add new site » → « Import an existing project » → GitHub.
2. **Build command** : `npm run build`
3. **Publish directory** : `out`
4. Deploy.

---

## 🌐 Brancher ton domaine `www.bacullator.com` sur Vercel

Une fois le site déployé, on le fait servir sur **ton vrai domaine** (les visiteurs ne
voient jamais l'adresse `*.vercel.app`).

1. **Achète le domaine** `bacullator.com` chez un registrar (Namecheap, OVH, Google
   Domains…). *(Astuce : le [GitHub Student Pack](https://education.github.com/pack)
   offre un domaine `.me` gratuit 1 an si tu es étudiant.)*
2. Dans **Vercel** : ouvre ton projet → **Settings → Domains** → tape `www.bacullator.com`
   → **Add**. Ajoute aussi `bacullator.com` (sans www) : Vercel proposera de le
   **rediriger vers `www`** — accepte.
3. Vercel affiche les **enregistrements DNS** à créer. Chez ton registrar (zone DNS) :
   - **CNAME** — Host `www` → Value `cname.vercel-dns.com`
   - **A** — Host `@` (racine) → Value `76.76.21.21`
     *(utilise toujours les valeurs exactes affichées par Vercel, elles peuvent changer.)*
4. Patiente que le DNS se propage (quelques minutes à quelques heures). Vercel détecte la
   configuration et **active le HTTPS automatiquement** (certificat gratuit). ✅
5. Résultat : le site répond sur **`https://www.bacullator.com`**, `bacullator.com`
   redirige vers `www`, et aucune adresse `vercel.app` n'est montrée aux visiteurs.

> ⚙️ Le domaine est déjà renseigné dans **`src/lib/site.ts`** (`SITE.url =
> "https://www.bacullator.com"`) — utilisé pour le partage, l'image Open Graph, le
> `sitemap.xml` et le `robots.txt`. Si tu changes de domaine, modifie-le ici puis redéploie.

---

## 🍪 Consentement, mesure d'audience & publicité

Le site est **« privacy-first »** : rien qui piste l'utilisateur ne se charge avant son accord.

- **Bannière de consentement** (`src/components/CookieConsent.tsx`) : au premier passage,
  l'utilisateur choisit **Accepter** ou **Refuser**. Le choix est stocké dans le navigateur
  (`localStorage`, clé `bac-consent`). Il peut le changer à tout moment depuis la page
  **Confidentialité** ou **Cookies**.
- **Mesure d'audience** : on utilise **Vercel Web Analytics** (`@vercel/analytics`). Le
  composant `AnalyticsGate` ne le charge **qu'après « Accepter »**. Pour lire les chiffres :
  Vercel → ton projet → onglet **Analytics** (active-le une fois, gratuit pour le trafic
  raisonnable). Aucune config de code supplémentaire.
- **Publicité (Google AdSense)** — prête mais **éteinte par défaut** :
  1. Les emplacements (`AdSlot`) sont déjà en place (boîtes « Espace réservé »).
  2. Quand ton compte AdSense est approuvé, copie `.env.example` en **`.env.local`** et
     renseigne ton identifiant éditeur :
     ```bash
     NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
     ```
     (Sur Vercel : **Settings → Environment Variables**, même nom/valeur, puis redeploy.)
  3. Tant que cette variable est **vide**, **aucun script de pub** n'est injecté : seules les
     boîtes placeholder s'affichent. Une fois remplie, les annonces se chargent **uniquement
     pour les visiteurs ayant accepté** les cookies.

> ⚖️ Les pages **Confidentialité** (`/confidentialite`) et **Cookies** (`/cookies`) sont
> requises par AdSense et référencent la **loi 09-08 / CNDP**. Mets-y à jour l'email de
> contact via `SITE.contactEmail` dans `src/lib/site.ts`.

---

## 📁 Structure du projet

```
.
├─ data/                         # Dépose ici ton .xlsx (non versionné)
├─ scripts/
│  ├─ xlsx-to-json.mjs           # Convertit le .xlsx → src/data/etablissements.json
│  └─ test.mjs                   # Tests des formules + de la logique (npm test)
├─ .env.example                  # Variable AdSense (à copier en .env.local)
├─ public/
│  └─ site.webmanifest
├─ src/
│  ├─ app/                       # Pages (App Router) + SEO (sitemap, robots, OG, favicon)
│  │  ├─ page.tsx                # Accueil
│  │  ├─ calculateur/            # Calculateur (Mode A / Mode B + inversé)
│  │  ├─ simulateur/             # Simulateur d'admission
│  │  ├─ explorer/               # Explorateur d'écoles
│  │  ├─ ecole/[slug]/           # Une page SEO par école (générée au build)
│  │  ├─ confidentialite/        # Politique de confidentialité
│  │  ├─ cookies/                # Politique cookies
│  │  └─ apropos/                # À propos & FAQ
│  ├─ components/                # Composants UI (header, footer, cartes, consentement…)
│  │  └─ views/                  # Le contenu de chaque page
│  ├─ data/
│  │  └─ etablissements.json     # ✅ Données utilisées par le site (versionnées)
│  ├─ i18n/                      # Dictionnaire FR/AR + contexte de langue
│  └─ lib/                       # Logique : calcul, matching admission, slug, types
└─ ...
```

---

## ❓ Questions fréquentes (dév)

- **Le site doit-il avoir un serveur ?** Non. Tout est statique (dossier `out/`).
- **Où changer la date « Données mises à jour » ?** Dans `src/lib/site.ts` (`dataUpdated`).
- **Comment ajouter une école rapidement sans Excel ?** Édite directement
  `src/data/etablissements.json` en respectant le format d'une entrée existante, puis
  `npm test` pour vérifier. La page `/ecole/<slug>` est générée automatiquement.
- **Comment changer les couleurs ?** Dans `tailwind.config.ts` (`brand` et `accent`).
- **Activer la pub ?** Renseigne `NEXT_PUBLIC_ADSENSE_CLIENT` (voir la section
  « Consentement, mesure d'audience & publicité » plus haut). Vide = pub éteinte.

---

## 📜 Avertissement

Outil **indépendant**, non affilié au Ministère. Les seuils sont indicatifs et parfois
estimés. La source officielle reste **[cursussup.gov.ma](https://cursussup.gov.ma)**.
