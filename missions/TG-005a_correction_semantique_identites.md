# TG-005a — Correction de TG-005 : préserver la sémantique et simplifier les identités

## Statut

**Correction de TG-005.**

Ce n'est pas une nouvelle étape fonctionnelle et le contrat reste :

```js
schema_version: "0.1.2"
```

Ne pas créer 0.1.3.

## Pourquoi cette correction ?

La recette humaine de TG-005 a validé l'essentiel :

- Mon Aise affiche correctement Electron, JavaScript / TypeScript et React ;
- ses quatre familles de données apparaissent ;
- Mon GPT<3 reste identique visuellement à TG-004 ;
- le signal `⚠` fonctionne pour certaines informations inconnues ;
- `appli.alias` découple bien le nom humain de l'identité visuelle.

Mais deux dérives ont été trouvées.

### Dérive 1 — ouverture sémantique transformée en affichage aveugle

Pendant la recette, David a ajouté manuellement :

```js
socle_technique: {
  runtime: "electron",
  langage: "javascript / typescript",
  bibliotheque_graphique: "react",
  canexistepas: "ondevraitavoirlapastilledavertissement"
}
```

Le renderer TG-005 a affiché `canexistepas` comme une quatrième technologie.

C'est incorrect.

Le modèle est **ouvert et permissif**, mais son vocabulaire reste sémantique.

> Une clé inconnue peut exister sans invalider le spécimen ; cela ne donne pas au renderer le droit de lui inventer une représentation.

Le comportement attendu est :

- ne pas afficher `canexistepas` ;
- afficher uniquement le petit `⚠` à côté de la version ;
- continuer à afficher normalement Electron, JavaScript / TypeScript et React ;
- aucune erreur JavaScript.

### Dérive 2 — inventaire manuel des identités

TG-005 a ajouté :

```text
assets/identites.js
```

avec un inventaire explicite des mascottes disponibles.

Cela crée une deuxième source de vérité : déposer un asset ne suffit plus, il faut aussi modifier l'inventaire.

Ce n'est pas le principe retenu.

L'objectif reste :

```text
appli.alias = mon_gpt
```

puis recherche légère d'un fichier d'identité correspondant dans `assets/`.

Pas de dépendance au nom humain et pas d'inventaire manuel à maintenir.

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `missions/TG-005_mon_aise_renderer_ouvert_0_1_2.md`
- `reports/TG-005/rapport.md`

Examiner :

- `protocole_mon_gpt_alpha/rendu.js`
- `protocole_mon_gpt_alpha/index.html`
- `protocole_mon_gpt_alpha/specimen-mon-aise.js`
- `protocole_mon_gpt_alpha/specimen.js`
- `assets/identites.js`
- `assets/`

## Objectif 1 — restaurer la force sémantique

### Socle technique

Les clés actuellement reconnues dans `socle_technique` sont :

```text
runtime
langage
bibliotheque_graphique
```

Ces clés portent le rôle sémantique.

Leur **valeur** peut être nouvelle et rester affichable comme texte.

Exemples :

```js
runtime: "electron"
langage: "python"
langage: "rust"
bibliotheque_graphique: "react"
```

Une valeur inconnue sous une clé connue reste compréhensible grâce à son rôle.

En revanche :

```js
canexistepas: "machin"
```

n'a aucune sémantique définie dans le renderer actuel.

Résultat attendu :

- pas de quatrième carte ;
- `⚠` ;
- les autres membres reconnus restent rendus.

Ne pas transformer automatiquement chaque propriété texte en technologie.

### Données

Le groupe `donnees` reste ouvert, mais sans affichage aveugle.

Les propriétés collectives reconnues restent notamment :

```text
locales
separees_des_binaires
```

Une famille de données peut avoir un nom de clé nouveau **si sa structure fournit du sens reconnu**, par exemple :

```js
notes: {
  format: "txt"
}
```

L'emplacement sous `donnees` établit qu'il s'agit d'une famille de données et `format` est une propriété connue : `Notes TXT` peut donc être rendu.

En revanche :

```js
truc_inconnu: {
  bidule_inconnu: "x"
}
```

ne doit pas devenir automatiquement une ligne graphique.

Résultat attendu :

- pas de ligne inventée ;
- `⚠`.

Si une famille reconnue contient à la fois des propriétés comprises et une propriété inconnue :

```js
catalogue: {
  role: "catalogue",
  format: "json",
  canexistepas: "x"
}
```

le renderer peut afficher `Catalogue JSON`, mais doit laisser la propriété inconnue non consommée et afficher `⚠`.

### Principe commun

> **Le renderer n'affiche que ce qu'il sait interpréter sémantiquement.**

Une information inconnue :

- reste dans le modèle ;
- n'est pas rendue ;
- déclenche `⚠` ;
- n'empêche pas le reste du diagramme.

Ne pas ajouter de texte visible explicatif au signal.

## Objectif 2 — supprimer l'inventaire manuel des identités

Supprimer la dépendance à :

```text
assets/identites.js
```

et supprimer ce fichier s'il n'a plus d'utilité.

`index.html` ne doit plus charger d'inventaire d'identités.

L'identité doit dépendre uniquement de :

```js
appli.alias
```

et des fichiers réellement présents dans `assets/`.

### Recherche souhaitée

À partir de :

```js
alias: "mon_gpt"
```

le renderer peut chercher, dans un ordre simple et documenté :

```text
mon_gpt.png
mon_gpt.svg
mon_gpt.webp
mon_gpt.jpg
mon_gpt.jpeg
```

ou une solution locale équivalente, tant qu'elle respecte ces invariants :

- aucun registre manuel des fichiers ;
- aucun test sur le nom humain ;
- déposer le bon fichier doit suffire ;
- absence de fichier = aucune mascotte ;
- absence de fichier ≠ `⚠` ;
- aucun placeholder inventé ;
- aucune exception JavaScript.

### Priorité : rester simple

L'ouverture directe par `file://` impose peut-être une contrainte technique pour tester plusieurs extensions.

Ne construis pas une infrastructure complexe pour éviter un message réseau bénin.

Si plusieurs extensions rendent la solution disproportionnée dans ce mode local, choisis et documente la variante la plus simple fidèle à l'intention — par exemple une extension canonique — plutôt que de réintroduire un inventaire manuel.

Le critère principal est :

> **un asset d'identité doit être découvert à partir de l'alias sans deuxième liste à maintenir.**

## Version

Conserver :

```js
schema_version: "0.1.2"
```

dans Mon Aise et Mon GPT<3.

TG-005a corrige l'interprétation du contrat 0.1.2.

Pas de migration.

## Index final

Laisser `index.html` branché sur **Mon Aise** pour la recette humaine.

## Tests ciblés obligatoires

### A. Test canonique de David

Ajouter temporairement en mémoire :

```js
socle_technique.canexistepas = "ondevraitavoirlapastilledavertissement"
```

Vérifier :

- aucun nouvel élément technique visible ;
- Electron, JavaScript / TypeScript et React restent présents ;
- `⚠` apparaît ;
- aucune erreur JS.

### B. Valeur nouvelle sous rôle connu

Exemple temporaire :

```js
langage: "rust"
```

Vérifier :

- Rust est représenté comme membre du socle ;
- pas de `⚠` uniquement parce que la valeur est nouvelle.

### C. Donnée structurée inconnue mais interprétable

Exemple temporaire :

```js
notes: { format: "txt" }
```

Vérifier :

- une famille Notes TXT peut apparaître ;
- pas de `⚠` si toute son information est comprise.

### D. Donnée sans sémantique reconnue

Exemple temporaire :

```js
truc_inconnu: { bidule_inconnu: "x" }
```

Vérifier :

- aucune ligne graphique inventée ;
- `⚠`.

### E. Propriété inconnue dans une famille partiellement comprise

Exemple temporaire :

```js
catalogue: {
  role: "catalogue",
  format: "json",
  canexistepas: "x"
}
```

Vérifier :

- Catalogue JSON reste visible ;
- `canexistepas` n'est pas affiché ;
- `⚠` apparaît.

### F. Identité Mon GPT<3

Avec :

```js
appli.nom = "Mon GPT<3"
appli.alias = "mon_gpt"
```

vérifier que la mascotte s'affiche depuis l'asset lié à l'alias.

Changer temporairement uniquement `appli.nom` :

- la mascotte doit rester ;
- aucune dépendance au nom humain.

### G. Identité absente

Mon Aise possède :

```js
alias = "mon_aise"
```

sans asset publié correspondant.

Vérifier :

- aucune mascotte ;
- aucun placeholder ;
- pas de `⚠` pour cette seule absence.

### H. Régression générale

Mon Aise :

- trois technologies ;
- quatre familles de données ;
- filtres Technologie / Données / reset ;
- aucun flux inventé ;
- aucun `⚠` sur le spécimen publié.

Mon GPT<3 :

- rendu visuel aussi proche que possible de TG-004/TG-005 ;
- Collector ;
- navigateur ChatGPT ;
- deux flux ;
- filtres Technologie / Données / Flux / reset ;
- aucun `⚠` sur le spécimen publié.

Vérifier bureau et mobile de façon proportionnée.

## À ne pas faire

Ne pas :

- créer TG-006 ;
- passer à 0.1.3 ;
- transformer toutes les clés inconnues en éléments graphiques ;
- ajouter un validator général ;
- ajouter un JSON Schema ;
- créer un système de plugins ;
- maintenir une liste manuelle des fichiers d'identité ;
- créer un serveur local juste pour découvrir les assets ;
- inventer une mascotte Mon Aise ;
- refondre la charte visuelle.

## Livrables

- correction du renderer ;
- suppression de l'inventaire manuel des identités ;
- rapport `reports/TG-005a/rapport.md` ;
- captures uniquement si elles servent réellement de preuve.

Le rapport doit expliquer explicitement :

1. pourquoi TG-005 affichait à tort `canexistepas` ;
2. comment TG-005a distingue désormais **clé sémantique connue** et **information inconnue** ;
3. comment les nouvelles familles de données sont acceptées sans afficher aveuglément n'importe quel objet ;
4. comment l'identité est trouvée sans inventaire manuel ;
5. confirmation que le contrat reste `0.1.2`.

Commit et push sur `main`, vérifie le SHA distant, puis arrête-toi pour notre recette.
