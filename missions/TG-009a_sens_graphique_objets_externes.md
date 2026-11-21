# TG-009a — Donner du sens graphique aux objets externes de Chrome Organizer

## Contexte

TG-009 a introduit Chrome Organizer comme troisième spécimen réel et a permis au renderer de représenter quatre objets de données externes :

- Chrome User Data ;
- Sauvegardes ;
- Exports ;
- Copie de restauration.

Le résultat est propre et fonctionnel, mais il révèle une limite importante de la vue 1 : les quatre objets sont encore essentiellement des **cartes vertes identiques dont le texte porte presque tout le sens**.

Or le principe fondateur de Trucagramme reste :

> **le texte nomme ou qualifie ; le graphique explique autant que possible.**

Nous ne voulons donc pas seulement « quatre relations vers quatre rectangles verts ». Nous voulons commencer à construire un véritable langage visuel des objets externes.

Cette mission affine TG-009 sans ouvrir la vue 2.

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-009/rapport.md`
- `projets/chrome_organizer/specimen.js`
- `lecteur/rendu.js`
- `lecteur/styles.css`
- `lecteur/interactions.js`

Préserver les décisions déjà validées de TG-009, notamment :

- objets externes distincts des données internes ;
- deux relations distinctes pour les sauvegardes ;
- deux flèches distinctes dans le rendu ;
- aucun `direction: "bidirectionnelle"` ;
- aucun symbole unique `↔`.

## Objectif

Faire en sorte que la nature des objets externes de Chrome Organizer soit comprise **d'abord graphiquement**, avant lecture détaillée des mots.

Nous voulons que l'utilisateur puisse percevoir rapidement :

- un espace de données appartenant au contexte Chrome ;
- une archive / sauvegarde relisible ;
- des fichiers produits en JSON et HTML ;
- une destination de restauration encore expérimentale.

La couleur verte peut rester la famille générale « données », mais elle ne suffit plus à elle seule.

La différenciation doit venir de la **forme, de la structure, de l'iconographie, du conteneur, de la disposition et des propriétés courtes**.

## 1. Ouvrir schema_version 0.1.6

Cette mission introduit une nouvelle notion sémantique légère : le **contexte externe**.

Passer les cinq spécimens à :

```js
schema_version: "0.1.6"
```

Le lecteur doit attendre `0.1.6`.

Les quatre spécimens autres que Chrome Organizer ne changent pas sémantiquement.

Pas de migration.

Mettre à jour de manière ciblée :

- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `README.md`

pour documenter ce nouvel enseignement de la vue 1.

## 2. Contexte externe

Chrome User Data ne doit plus être seulement un rectangle vert intitulé « Chrome User Data ».

Le modèle doit pouvoir dire qu'un objet vit dans un **contexte externe** sans prétendre que ce contexte est un processus actif ni un interlocuteur réseau.

Pour Chrome Organizer, enrichir minimalement l'objet source ainsi :

```js
chrome_user_data: {
  nom: "User Data",
  type: "dossier_donnees",
  contexte: {
    nom: "Chrome"
  },
  role: "source",
  lecture_seule: true
}
```

Le champ `contexte` signifie ici :

> l'objet appartient visuellement / structurellement à cet environnement externe.

Il ne crée pas automatiquement une relation, un flux ou un processus.

Ne pas créer un objet « Chrome » vivant relié à Chrome Organizer.

Ne pas inventer une API, une extension ou un échange avec Chrome en exécution.

### Rendu attendu

Créer un **conteneur de contexte léger** portant « Chrome », et placer l'objet dossier **User Data** à l'intérieur.

L'idée visuelle doit être de cet ordre :

```text
┌──────────── Chrome ────────────┐
│                                │
│          [ dossier ]           │
│           User Data            │
│        LECTURE SEULE           │
│                                │
└────────────────────────────────┘
                 │
                 ▼
         Chrome Organizer
```

La géométrie exacte reste libre.

Le conteneur doit donner du sens, pas ajouter une lourde boîte décorative.

## 3. Dossier / espace de données

Le type :

```text
dossier_donnees
```

doit commencer à avoir une représentation propre.

Pour `User Data` :

- utiliser une forme / pictogramme de dossier ou d'espace de données ;
- conserver le libellé court `User Data` ;
- conserver la propriété `LECTURE SEULE` ;
- faire comprendre que cet objet est contenu dans le contexte Chrome.

Le mot « dossier_donnees » n'est jamais affiché.

## 4. Sauvegardes : faire comprendre « archive » sans dépendre du mot

L'objet sémantique reste :

```js
sauvegardes: {
  nom: "Sauvegardes",
  type: "archives_locales",
  format: "dossier",
  integrite: "sha256"
}
```

Le modèle peut conserver `nom: "Sauvegardes"` pour son identité et l'accessibilité.

Mais dans la vue, nous voulons tester une représentation où le mot **Sauvegardes n'est plus nécessaire comme titre principal**.

Le type `archives_locales` doit porter visuellement l'idée d'une archive / sauvegarde relisible.

Pistes possibles :

- plusieurs couches / dossiers empilés ;
- boîte / archive ;
- paquet de données ;
- autre forme simple et cohérente.

Conserver graphiquement les qualifications utiles :

- `SHA-256` ;
- éventuellement `dossier` si cela apporte réellement quelque chose au niveau 1.

### Relations

Conserver exactement :

```js
{ source: "appli", destination: "sauvegardes" },
{ source: "sauvegardes", destination: "appli" }
```

et donc **deux flèches distinctes**.

Le dessin doit continuer à montrer :

```text
        ---->
Appli          Archive
        <----
```

Pas de `↔`.

Pas de champ de direction.

Pas de fusion sémantique.

## 5. Exports : montrer les fichiers plutôt que le mot « Exports »

L'objet sémantique reste simple :

```js
exports: {
  nom: "Exports",
  type: "fichiers",
  formats: ["json", "html"]
}
```

Le modèle peut conserver `nom: "Exports"`.

Mais la vue doit chercher à rendre inutile le titre visible **Exports**.

Pour :

```js
formats: ["json", "html"]
```

représenter directement des fichiers / sorties visuelles distinctes, par exemple :

```text
Chrome Organizer ─────→  [fichier JSON]
                         [fichier HTML]
```

La flèche peut viser le groupe graphique représentant l'objet `exports`.

Il ne s'agit pas de créer deux nouvelles relations dans le modèle : le modèle contient toujours **un objet exports** et une relation `appli -> exports`.

Le renderer peut déployer graphiquement ses formats internes.

Ne pas écrire une phrase expliquant qu'il s'agit d'exports.

## 6. Copie de restauration : destination préparée

L'objet reste :

```js
restauration: {
  nom: "Copie de restauration",
  type: "dossier_donnees",
  role: "destination",
  statut: "experimental"
}
```

Nous voulons qu'il se lise d'abord comme une **destination préparée** :

- représentation de dossier / espace cible ;
- traitement visuel différent de la source, par exemple contour discontinu ou autre convention sobre ;
- propriété `EXPÉRIMENTAL` clairement attachée.

Le texte peut rester plus présent ici que pour les sauvegardes ou les exports si l'icône seule devient ambiguë.

Ne pas sacrifier la compréhension au principe « moins de texte ».

## 7. Même famille, natures distinctes

Les quatre objets restent de la famille générale des données et peuvent continuer à partager le vert.

Mais ils ne doivent plus être visuellement interchangeables.

La vue doit commencer à distinguer :

- **contexte externe** ;
- **dossier / espace de données** ;
- **archive** ;
- **fichiers produits** ;
- **destination préparée**.

Ne pas créer une couleur totalement différente pour chaque type.

Le sens doit venir d'abord de la structure et de la forme, pas d'une légende arc-en-ciel.

## 8. Accessibilité et texte masqué visuellement

Si un nom sémantique reste dans le modèle mais n'est plus nécessaire visuellement, conserver une description accessible suffisante.

Par exemple, l'objet sauvegardes peut ne plus avoir « Sauvegardes » comme grand titre visible, mais son rôle doit rester compréhensible pour les technologies d'assistance.

Ne pas utiliser du texte invisible uniquement pour contourner le renderer : employer les attributs accessibles de manière propre.

## 9. Le renderer reste générique par type, pas par nom de projet

Ne pas coder :

```js
if (nom === "Chrome User Data") ...
if (cle === "sauvegardes") ...
```

si le même rendu peut être obtenu à partir de :

- `type` ;
- `contexte` ;
- `role` ;
- `format` ;
- `formats` ;
- `integrite` ;
- `statut`.

Une petite logique spécifique à une combinaison sémantique réelle est acceptable.

Une logique basée sur le nom humain du projet ou de l'objet ne l'est pas.

Le but est de faire émerger une grammaire réutilisable, pas de dessiner Chrome Organizer à la main.

## 10. Lecture partielle

Toutes les clés reconnues doivent être consommées proprement.

Ajouter temporairement une propriété inconnue sur un objet externe doit toujours :

- conserver l'objet connu ;
- ne pas afficher la valeur inconnue ;
- déclencher `⚠`.

Le nouveau champ `contexte` correctement reconnu ne doit pas déclencher `⚠`.

## 11. Filtres

Conserver :

- Technologie ;
- Données ;
- Flux ;
- reset.

Le filtre Données doit mettre en évidence :

- le contexte Chrome avec User Data ;
- l'archive / sauvegardes ;
- les fichiers JSON / HTML ;
- la destination de restauration.

Le filtre Flux doit conserver les cinq relations, dont les deux flèches des sauvegardes.

## 12. Mise en page

Sur bureau, conserver l'intention générale :

- source / contexte Chrome à gauche ;
- application centrale dominante ;
- sorties / stockage à droite.

Mais profiter de TG-009a pour rendre le côté droit **plus narratif qu'une pile de trois cartes identiques**.

Une composition possible :

```text
┌────── Chrome ──────┐
│      User Data     │
└─────────┬──────────┘
          │
          ▼
   CHROME ORGANIZER
          │
       ┌──┼───────────────┐
       │  │               │
       ▼  ▼               ▼
   [archive]         [JSON][HTML]       [dossier cible]
      ↑                                      EXPÉRIMENTAL
      └──────────── retour
```

Cette esquisse exprime l'intention, pas une géométrie imposée.

## 13. Mobile

À 390 et 320 px :

- conserver un ordre narratif clair ;
- ne pas transformer les objets en une liste de cartes textuelles identiques ;
- garder les deux flèches sauvegardes distinctes ;
- aucun débordement horizontal ;
- contexte Chrome lisible.

Une simplification graphique mobile est acceptable si le sens reste le même.

## 14. Non-régression

Ne pas refondre Mon Aise ou Mon GPT<3 pour leur imposer immédiatement les nouveaux traitements.

Vérifier simplement qu'ils conservent :

- leur diagramme ;
- leurs filtres ;
- leur présentation ;
- leurs flux ;
- leurs identités graphiques.

Accueil et 404 restent inchangés visuellement, hors passage de version.

## 15. Recette attendue

La question principale de recette est :

> **En lisant nettement moins les titres, comprend-on mieux la nature des objets externes ?**

Vérifier visuellement :

### User Data
- appartient clairement au contexte Chrome ;
- ressemble à un dossier / espace de données ;
- lecture seule comprise.

### Sauvegardes
- ressemble à une archive / stockage relisible ;
- SHA-256 visible ;
- deux flux distincts compris ;
- le mot « Sauvegardes » n'est plus nécessaire comme grand titre visible.

### Exports
- JSON et HTML apparaissent comme fichiers produits ;
- le mot « Exports » n'est plus nécessaire comme grand titre visible.

### Restauration
- apparaît comme une destination préparée ;
- EXPÉRIMENTAL clairement visible.

## 16. Tests proportionnés

Mission de rendu + petite extension sémantique : recette L2 ciblée.

Vérifier :

- Chrome Organizer à 1448, 390 et 320 px ;
- filtre Données ;
- filtre Flux ;
- filtre Technologie ;
- reset ;
- lecture partielle avec clé inconnue ;
- présentation ;
- menu ;
- non-régression rapide Mon Aise / Mon GPT<3 / accueil / 404 ;
- console propre.

Pas de campagne historique complète.

## À ne pas faire

Ne pas :

- commencer la vue 2 ;
- créer TG-010 ;
- ajouter des verbes aux relations ;
- ajouter `direction: "bidirectionnelle"` ;
- utiliser `↔` pour les sauvegardes ;
- créer un Chrome actif / compagnon fictif ;
- créer une famille de couleur par type ;
- ajouter une légende obligatoire pour comprendre les formes ;
- coder le rendu à partir des noms humains « Sauvegardes », « Exports », « Chrome User Data » ;
- créer un moteur de diagrammes universel ;
- ajouter une dépendance externe.

## Livrables

- contrat `schema_version 0.1.6` ;
- contexte externe minimal documenté ;
- spécimen Chrome Organizer enrichi avec le contexte Chrome ;
- rendu différencié par nature des objets ;
- sauvegardes rendues comme archive ;
- exports rendus comme fichiers JSON / HTML ;
- restauration rendue comme destination expérimentale ;
- deux flèches sauvegardes conservées ;
- documentation ciblée mise à jour ;
- `reports/TG-009a/rapport.md` ;
- captures bureau et mobile utiles.

Le rapport doit préciser :

1. quelle nouvelle règle de grammaire a été introduite ;
2. comment `contexte` est interprété ;
3. comment chaque type externe est désormais distingué graphiquement ;
4. quels textes ont pu devenir secondaires ou disparaître visuellement ;
5. comment accessibilité et sémantique restent conservées ;
6. comment les deux flux sauvegardes restent deux relations ;
7. résultats de la recette et non-régression.

Commit et push sur `main`, vérifier le SHA distant, puis arrêt pour validation humaine.
