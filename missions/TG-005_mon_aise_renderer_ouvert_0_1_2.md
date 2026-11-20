# TG-005 — Éprouver Trucagramme avec Mon Aise et ouvrir le renderer 0.1.2

## Contexte

TG-003 a séparé le sens du rendu sur Mon GPT<3.

TG-004 a simplifié le contrat en `schema_version 0.1.1` :

- `collector.role = compagnon` ;
- relations minimales `source -> destination` ;
- références uniquement vers des objets déclarés ;
- navigateur déclaré comme objet contenant ChatGPT ;
- aucune migration ni compatibilité descendante.

Après TG-004, nous avons fait volontairement un test très simple **sans modifier le renderer** :

1. création de `protocole_mon_gpt_alpha/specimen-mon-aise.js` ;
2. branchement de `index.html` sur ce fichier ;
3. ouverture du même prototype dans Chrome/Edge sur CODEX_VM ;
4. aucune modification de `rendu.js` avant l'essai.

Le but était de voir ce que le renderer 0.1.1 savait déjà comprendre d'une deuxième application réelle.

## Ce que le test Mon Aise a montré

Le renderer inchangé a correctement affiché :

- Mon Aise ;
- `local` ;
- `bureau` ;
- Windows ;
- `AUTONOME` ;
- le groupe de données ;
- Catalogue JSON ;
- Images personnelles ;
- `optionnel` ;
- `SÉPARÉ DES BINAIRES`.

Il a ignoré proprement, sans erreur et sans inventer de contenu :

- `socle_technique.runtime = electron` ;
- `socle_technique.langage = javascript / typescript` ;
- `socle_technique.bibliotheque_graphique = react` ;
- `donnees.configurations_csv` ;
- `donnees.sauvegardes`.

Les commandes interactives se sont adaptées : seule la commande Données et la réinitialisation restaient présentes puisqu'aucun socle ni flux n'étaient alors rendus.

Ce résultat est considéré comme **bon** : un modèle peut contenir davantage de sens que le renderer courant sans devenir invalide.

Il révèle cependant trois évolutions utiles.

## Contrat courant

Cette mission ouvre **`schema_version: "0.1.2"`**.

Aucune migration ou compatibilité avec 0.1.1 n'est demandée.

Les spécimens sont expérimentaux et remplaçables directement.

## Références obligatoires

Lire avant toute modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-003/rapport.md`
- `reports/TG-004/rapport.md`

Examiner ensuite :

- `protocole_mon_gpt_alpha/specimen.js`
- `protocole_mon_gpt_alpha/specimen-mon-aise.js`
- `protocole_mon_gpt_alpha/index.html`
- `protocole_mon_gpt_alpha/rendu.js`
- `protocole_mon_gpt_alpha/app.js`
- `protocole_mon_gpt_alpha/styles.css`
- `assets/`

## Objectif

Faire évoluer le renderer pour que le deuxième spécimen réel, Mon Aise, soit représenté plus complètement **sans casser Mon GPT<3 et sans créer un moteur universel**.

Trois évolutions sont demandées :

1. groupes `socle_technique` et `donnees` plus ouverts ;
2. identité visuelle de l'application pilotée par `appli.alias`, plus par son nom humain ;
3. signal graphique minimal `⚠` lorsque le renderer n'a pas représenté toute l'information du spécimen.

## 1. Ajouter `appli.alias`

Mettre les deux spécimens à jour :

### Mon GPT<3

```js
appli: {
  nom: "Mon GPT<3",
  alias: "mon_gpt",
  ...
}
```

### Mon Aise

```js
appli: {
  nom: "Mon Aise",
  alias: "mon_aise",
  ...
}
```

L'alias est un identifiant machine simple et stable.

Pour cette alpha, accepter une forme de type :

```text
[a-z0-9_]+
```

Il ne remplace pas les clés d'objets utilisées dans les relations. `appli` reste la référence de l'application principale.

### Asset d'identité

Supprimer la règle spécifique :

```text
appli.nom === "Mon GPT<3"
```

Le renderer doit tenter d'utiliser l'alias pour chercher un asset de l'application sous une forme du type :

```text
assets/<alias>.png
assets/<alias>.svg
assets/<alias>.webp
assets/<alias>.jpg
assets/<alias>.jpeg
```

L'ordre exact des extensions peut être choisi simplement.

Contraintes :

- pas de nom humain utilisé comme nom de fichier ;
- pas de dépendance au nom `Mon GPT<3` ;
- pas d'asset trouvé = aucune image, sans placeholder et sans erreur applicative ;
- la présence de `alias` n'impose pas qu'un fichier existe ;
- ne pas inventer une image Mon Aise.

L'asset Mon GPT actuellement nommé `mon-gtp.png` peut être copié ou renommé proprement sous un nom compatible avec `mon_gpt` pour conserver son rendu. Ne pas supprimer une ressource utile sans raison.

## 2. Ouvrir le rendu de `socle_technique`

Le modèle sémantique peut distinguer :

```js
socle_technique: {
  runtime: "electron",
  langage: "javascript / typescript",
  bibliotheque_graphique: "react"
}
```

Ces trois clés ont des sens différents et **doivent rester différentes dans le modèle**.

Le renderer n'a pas besoin d'une nouvelle grammaire graphique pour chacune.

Il doit pouvoir les représenter comme des membres du même groupe technique.

Principe :

> Le vocabulaire sémantique emploie le terme juste ; plusieurs concepts peuvent partager la même représentation graphique.

Pour Mon Aise, le groupe technique doit donc rendre au minimum :

- Electron ;
- JavaScript / TypeScript ;
- React.

Pour Mon GPT<3, il doit continuer à rendre :

- Python ;
- Tkinter / Tk.

Ne pas créer de dépendance à une liste figée de clés `langage` + `bibliotheque_graphique` seulement.

Une solution légère consistant à parcourir les membres présents du groupe est préférée.

Les icônes restent facultatives. Une technologie sans asset connu doit rester représentable par son texte.

## 3. Ouvrir le rendu de `donnees`

Les propriétés collectives restent :

- `locales` ;
- `separees_des_binaires`.

Les autres entrées objet du groupe sont des familles de données à représenter lorsqu'elles apportent du sens.

Mon Aise contient actuellement :

```js
catalogue: {
  role: "catalogue",
  format: "json"
},

configurations_csv: {
  role: "configuration",
  format: "json"
},

images_personnelles: {
  format: "webp",
  optionnel: true
},

sauvegardes: {
  role: "sauvegarde",
  format: "zip"
}
```

Le renderer doit pouvoir faire apparaître ces quatre familles sans avoir besoin d'une branche codée spécifiquement pour chaque clé.

Le libellé peut être dérivé simplement de la clé et enrichi du format lorsqu'il existe.

Exemples attendus, sans imposer la ponctuation exacte :

- Catalogue JSON ;
- Configurations CSV · JSON ;
- Images personnelles WebP + `optionnel` ;
- Sauvegardes ZIP.

Préserver le cas Mon GPT<3, notamment :

- Catalogue JSON ;
- Fichiers d'interface ;
- Images personnelles + `optionnel`.

Il est acceptable de conserver de petits dictionnaires de présentation pour des libellés, acronymes ou icônes connus. Ce qui doit disparaître est la nécessité de coder explicitement **l'existence de chaque membre du groupe**.

## 4. Lecture partielle : petit `⚠`

Le modèle reste ouvert et permissif.

Si le spécimen est valide mais contient une information sémantique présente que le renderer courant ne sait pas représenter, afficher uniquement un petit :

```text
⚠
```

à côté de la version du spécimen.

Exemple visuel :

```text
alpha-0.0.0.1 ⚠
```

### Important

Ce symbole signifie :

> le renderer courant n'a pas représenté toute l'information présente.

Ce n'est **pas** :

- une erreur de schéma ;
- une erreur JavaScript ;
- un avertissement de sécurité ;
- une invitation à rejeter le modèle.

Le diagramme doit continuer à être rendu avec les informations comprises.

### Sobriété

Ne pas ajouter de texte explicatif visible, encadré, liste ou panneau.

Le `⚠` suffit graphiquement.

Une description non visible pour l'accessibilité est acceptable.

Pas besoin d'un système de diagnostic complexe ni d'un validator.

Une implémentation légère permettant au renderer de savoir qu'il a laissé une information non représentée suffit.

## 5. Comportement attendu avec Mon Aise après TG-005

Avec le spécimen Mon Aise 0.1.2, le renderer devrait désormais afficher :

- identité Mon Aise ;
- local / bureau ;
- Windows ;
- AUTONOME ;
- socle technique : Electron, JavaScript / TypeScript, React ;
- données locales :
  - Catalogue JSON ;
  - Configurations CSV / JSON ;
  - Images personnelles WebP, optionnel ;
  - Sauvegardes ZIP ;
- séparé des binaires.

Il n'y a actuellement ni compagnon ni relation extérieure dans ce spécimen : ne rien inventer.

Si toutes les informations du spécimen Mon Aise sont représentées ou explicitement consommées par le renderer, le `⚠` ne doit pas être affiché.

## 6. Test volontaire de lecture partielle

À partir d'une copie temporaire en mémoire du spécimen valide, ajouter une propriété sémantique inconnue que le renderer ne sait pas représenter.

Exemple indicatif :

```js
modele.appli.propriete_inconnue = "essai"
```

Le résultat attendu :

- diagramme normal avec tout ce qui est compris ;
- petit `⚠` à côté de la version ;
- aucune erreur de console ;
- aucune valeur inventée pour cette propriété.

Le test ne doit pas nécessiter de conserver ce champ inconnu dans les spécimens publiés.

## 7. Régression Mon GPT<3

Le deuxième objectif est de prouver que l'ouverture du renderer ne casse pas le premier spécimen.

Tester `specimen.js` en 0.1.2 avec :

- alias `mon_gpt` ;
- Python ;
- Tkinter / Tk ;
- données existantes ;
- Collector ;
- navigateur avec ChatGPT ;
- deux relations ;
- quatre commandes interactives.

Le rendu doit rester aussi proche que possible de TG-004.

La mascotte doit provenir de l'alias et non d'une comparaison sur le nom humain.

## Index pendant la recette

Laisser `index.html` branché sur **Mon Aise** à la fin de TG-005 afin que David puisse ouvrir immédiatement le deuxième spécimen pour sa recette.

Pour tester Mon GPT<3, Codex peut changer temporairement la source localement ou utiliser une méthode légère de son choix. Ne pas construire un sélecteur de spécimens dans cette mission.

## Versionnement

Les deux spécimens passent à :

```js
schema_version: "0.1.2"
```

Le renderer accepte uniquement 0.1.2.

Ne pas maintenir 0.1.1.

Ne pas créer :

- migration ;
- convertisseur ;
- tableau de compatibilité multi-version ;
- couche historique.

## À ne pas faire

Ne pas :

- créer un moteur universel ;
- créer un éditeur ;
- créer un JSON Schema ;
- créer un système de plugins ;
- créer un sélecteur de spécimens ;
- ajouter une nouvelle dépendance ;
- changer les niveaux de lecture ;
- inventer des données ou relations pour Mon Aise ;
- ajouter un texte visible autour du `⚠` ;
- faire dépendre l'identité visuelle du nom humain ;
- lancer TG-006.

## Vérifications proportionnées

Cette mission touche le renderer de manière transverse mais reste un prototype HTML/CSS/JS léger.

Vérifier au minimum :

### Mon Aise

- ouverture directe de `index.html` ;
- rendu des trois technologies ;
- rendu des quatre familles de données ;
- local / bureau / Windows / autonome ;
- absence de compagnon et de flux inventés ;
- commande Technologie disponible ;
- commande Données disponible ;
- absence de commande Flux ;
- reset ;
- bureau et mobile ;
- aucune erreur console.

### Lecture partielle

- propriété inconnue temporaire ;
- `⚠` visible à côté de la version ;
- diagramme autrement normal ;
- aucune explication visible supplémentaire.

### Alias

- Mon Aise sans asset `mon_aise.*` : aucune image et aucune erreur ;
- Mon GPT avec `mon_gpt.*` : mascotte affichée ;
- nom humain modifié temporairement sans changer l'alias : l'asset doit continuer à être trouvé.

### Mon GPT<3

- rendu du socle ;
- rendu des données ;
- Collector ;
- navigateur ChatGPT ;
- deux relations ;
- technologies / données / flux / reset ;
- bureau et mobile ;
- absence de `⚠` si tout le modèle publié est représenté.

Pas besoin de campagne exhaustive hors de ce périmètre.

## Livrables

- `schema_version 0.1.2` dans les deux spécimens ;
- `appli.alias` dans les deux spécimens ;
- renderer ouvert pour le socle et les données ;
- résolution légère de l'asset principal par alias ;
- indicateur `⚠` de lecture partielle ;
- `index.html` laissé sur Mon Aise ;
- `reports/TG-005/rapport.md` ;
- captures utiles de Mon Aise et de Mon GPT<3 si elles aident réellement à la recette.

Le rapport doit raconter explicitement le test préalable Mon Aise, les limites observées en 0.1.1, ce que 0.1.2 résout, et ce qui reste volontairement ouvert.

Commit et push sur `main`, vérification du SHA distant, puis arrêt pour validation humaine.
