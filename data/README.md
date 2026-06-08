# Dossier des données sources

Place ici ton fichier Excel **`Etablissements_Maroc_BAC.xlsx`** (feuille `Etablissements`).

Ensuite, à la racine du projet, lance :

```bash
npm run data
```

Cela régénère `src/data/etablissements.json` (le fichier que le site lit réellement).

> Le `.xlsx` n'est volontairement **pas** suivi par git (voir `.gitignore`).
> C'est le JSON généré, dans `src/data/`, qui est versionné et déployé.
