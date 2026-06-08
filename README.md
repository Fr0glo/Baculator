# 🎓 Bacullator

Un site **gratuit, rapide et mobile-first** pour les bacheliers marocains :

1. **Calculateur de moyenne** — deux modes que les élèves confondent souvent :
   - **Moyenne de présélection** (grandes écoles) : `0,75 × National + 0,25 × Régional` — c'est **celle que les seuils comparent**.
   - **Moyenne du BAC** (le diplôme) : `0,25 × Régional + 0,25 × Contrôle continu + 0,50 × National`.
   - Avec un **calcul inversé** : « quelle note au National me faut-il pour atteindre telle moyenne ? »
2. **Simulateur d'admission** — l'élève entre sa moyenne de présélection + sa filière + (optionnel) une ville, et voit **où il peut être convoqué**, classé par confort par rapport au seuil.
3. **Explorateur d'écoles**, **FAQ**, mode **clair/sombre**, et bascule **Français / العربية (RTL)**.

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

## 🌐 Brancher un nom de domaine gratuit (GitHub Student Pack)

Si tu es étudiant, le **[GitHub Student Developer Pack](https://education.github.com/pack)** offre un **domaine `.me` gratuit pendant 1 an** (via Namecheap) et d'autres offres.

1. Active le pack avec ton **email étudiant** sur <https://education.github.com/pack>.
2. Récupère ton domaine gratuit chez **Namecheap** (offre « 1 year free .me domain »).
3. Dans **Vercel** : ouvre ton projet → onglet **« Domains »** → ajoute ton domaine
   (par ex. `mon-bac.me`).
4. Vercel t'affiche les **enregistrements DNS** à configurer. Va dans Namecheap →
   **Domain → Advanced DNS** et ajoute :
   - un enregistrement **A** `@` → `76.76.21.21` (valeur indiquée par Vercel), **ou**
   - un enregistrement **CNAME** `www` → `cname.vercel-dns.com`.
5. Attends que le DNS se propage (quelques minutes à quelques heures). Vercel ajoute le **HTTPS** automatiquement. ✅

> N'oublie pas de mettre à jour l'adresse du site dans **`src/lib/site.ts`** (`SITE.url`)
> avec ton vrai domaine, pour que le partage et le référencement (SEO) soient corrects.

---

## 📁 Structure du projet

```
.
├─ data/                         # Dépose ici ton .xlsx (non versionné)
├─ scripts/
│  └─ xlsx-to-json.mjs           # Convertit le .xlsx → src/data/etablissements.json
├─ public/
│  └─ site.webmanifest
├─ src/
│  ├─ app/                       # Pages (App Router) + SEO (sitemap, robots, OG, favicon)
│  │  ├─ page.tsx                # Accueil
│  │  ├─ calculateur/            # Calculateur (Mode A / Mode B + inversé)
│  │  ├─ simulateur/             # Simulateur d'admission
│  │  ├─ explorer/               # Explorateur d'écoles
│  │  └─ apropos/                # À propos & FAQ
│  ├─ components/                # Composants UI (header, footer, cartes, etc.)
│  │  └─ views/                  # Le contenu de chaque page
│  ├─ data/
│  │  └─ etablissements.json     # ✅ Données utilisées par le site (versionnées)
│  ├─ i18n/                      # Dictionnaire FR/AR + contexte de langue
│  └─ lib/                       # Logique : calcul, matching admission, types
└─ ...
```

---

## ❓ Questions fréquentes (dév)

- **Le site doit-il avoir un serveur ?** Non. Tout est statique (dossier `out/`).
- **Où changer la date « Données mises à jour » ?** Dans `src/lib/site.ts` (`dataUpdated`).
- **Comment ajouter une école rapidement sans Excel ?** Édite directement
  `src/data/etablissements.json` en respectant le format d'une entrée existante.
- **Comment changer les couleurs ?** Dans `tailwind.config.ts` (`brand` et `accent`).
- **Les pubs ?** Des emplacements vides (`AdSlot`) sont déjà réservés. Branche Google
  AdSense plus tard en suivant les commentaires dans `src/components/AdSlot.tsx`.

---

## 📜 Avertissement

Outil **indépendant**, non affilié au Ministère. Les seuils sont indicatifs et parfois
estimés. La source officielle reste **[cursussup.gov.ma](https://cursussup.gov.ma)**.
