# TG-009b — Objets intrinsèques, contextes et placement équilibré

## Contexte

TG-009a a amélioré fortement le langage graphique des objets externes de Chrome Organizer :

- `User Data` est devenu un dossier dans un cadre Chrome ;
- les sauvegardes ont une forme d'archive ;
- les exports sont représentés par des fichiers JSON / HTML ;
- la copie de restauration est un dossier expérimental.

La recette a cependant révélé deux confusions de modèle et une convention graphique inutile :

1. `role = source` / `role = destination` est porté par les objets alors que le sens est déjà dans les relations ;
2. `contexte: { nom: "Chrome" }` est une propriété répétable alors que le dessin raconte réellement un conteneur structurel ;
3. le renderer place encore les « sources » à gauche et les « destinations » à droite, alors que la position ne doit pas encoder le sens des flux.

Cette mission corrige ces trois points et ouvre le contrat :

```js
schema_version: "0.1.7"
```

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-009a/rapport.md`
- `projets/chrome_organizer/specimen.js`
- `lecteur/rendu.js`
- `lecteur/styles.css`
- `lecteur/interactions.js`

La mission doit préserver les formes graphiques validées par TG-009a et ne pas revenir aux rectangles verts génériques.

## Objectif

Séparer proprement quatre responsabilités :

- **objet** : ce qu'il est ;
- **contexte** : où / dans quel univers structurel il appartient ;
- **relation** : dans quel sens il est relié à un autre objet ;
- **renderer** : où il est placé pour équilibrer la vue.

La position absolue ne doit plus être utilisée comme code sémantique de direction.

## 1. Passer les cinq spécimens en 0.1.7

Passer à :

```js
schema_version: "0.1.7"
```

dans :

- `projets/accueil/specimen.js`
- `projets/404/specimen.js`
- `projets/mon_aise/specimen.js`
- `projets/mon_gpt/specimen.js`
- `projets/chrome_organizer/specimen.js`

Le lecteur attend `0.1.7`.

Les quatre autres spécimens ne changent pas sémantiquement.

Pas de migration.

## 2. Retirer les rôles directionnels des objets

Dans Chrome Organizer, retirer :

```js
role: "source"
```

de `chrome_user_data`.

Retirer :

```js
role: "destination"
```

de `restauration`.

Ne pas remplacer ces champs par :

- `direction`
- `entree`
- `sortie`
- `source`
- `destination`
- ou toute autre propriété directionnelle sur l'objet.

Les relations suffisent :

```js
{ source: "chrome_user_data", destination: "appli" }

{ source: "appli", destination: "restauration" }
```

Les sauvegardes rappellent pourquoi cette règle est importante :

```js
{ source: "appli", destination: "sauvegardes" },
{ source: "sauvegardes", destination: "appli" }
```

Le même objet peut être source dans une relation et destination dans une autre.

### Principe

> **L'objet dit ce qu'il est. La relation dit où va le flux.**

## 3. Transformer Chrome en vrai contexte structurel

Remplacer le modèle actuel :

```js
chrome_user_data: {
  nom: "User Data",
  type: "dossier_donnees",
  contexte: {
    nom: "Chrome"
  },
  ...
}
```

par une structure explicite :

```js
chrome: {
  nom: "Chrome",
  type: "contexte",
  contient: ["chrome_user_data"]
},

chrome_user_data: {
  nom: "User Data",
  type: "dossier_donnees",
  lecture_seule: true
}
```

L'ordre de déclaration doit conserver le contexte Chrome avant l'objet qu'il contient.

### Sémantique

`type = contexte` est un élément structurel.

`contient` :

- est une liste de clés d'objets déclarés dans le modèle ;
- exprime une appartenance / inclusion ;
- ne crée aucune relation ;
- ne crée aucune flèche ;
- ne signifie pas que le contexte est actif ;
- ne signifie pas qu'il communique lui-même avec l'application.

Dans ce cas :

```text
Chrome contient User Data
```

mais la relation reste :

```text
User Data -> Chrome Organizer
```

### Validation légère

Si un contexte référence un objet inexistant :

- ne pas inventer l'objet ;
- conserver une lecture partielle ;
- déclencher `⚠`.

Ne pas construire un moteur de validation générale.

## 4. Le contexte est une unité de placement

Un contexte et les objets qu'il contient forment une **unité graphique de placement** autour de l'application.

Ainsi :

```text
Chrome
└── User Data
```

compte comme **une seule unité externe** pour la répartition gauche / droite.

Le contenu interne garde ses relations réelles.

Ne pas compter `chrome` et `chrome_user_data` comme deux voisins séparés.

## 5. Règle générale : la position n'encode pas la direction

Supprimer du renderer toute logique générale du type :

```text
source -> gauche
destination -> droite
```

et toute nomenclature qui entretient cette confusion lorsqu'elle n'est plus justifiée :

- `objets-sources`
- `objets-destinations`
- autres groupes équivalents.

Préférer des notions de rendu :

- gauche ;
- droite ;
- unités externes ;
- côté / colonne.

### Principe

> **Position = composition. Flèche = direction.**

Un objet placé à gauche peut recevoir une flèche venant de l'application.

Un objet placé à droite peut envoyer une flèche vers l'application.

La direction visuelle de chaque flèche doit donc être calculée à partir de la relation réelle ET du côté où son objet est placé.

## 6. Ordre des unités externes

L'ordre de référence est l'ordre de déclaration dans le spécimen.

Pour une unité `contexte`, son objet contenu n'ajoute pas une nouvelle position.

Pour Chrome Organizer, l'ordre utile devient :

1. contexte `chrome` contenant `chrome_user_data` ;
2. `sauvegardes` ;
3. `exports` ;
4. `restauration`.

Ne pas :

- trier alphabétiquement ;
- trier selon le sens des relations ;
- regrouper toutes les entrées puis toutes les sorties ;
- réordonner selon la largeur de leur libellé.

## 7. Placement d'une seule unité externe

Lorsqu'il n'existe qu'une seule unité externe autour de l'application :

### Relation uniquement entrante

```text
objet -> appli
```

placer l'unité à gauche.

### Relation uniquement sortante

```text
appli -> objet
```

placer l'unité à droite.

### Relations dans les deux sens

Si l'unique unité possède les deux directions, choisir un côté de manière déterministe sans introduire de donnée supplémentaire dans le modèle.

Pour cette alpha, le côté droit peut servir de fallback neutre.

Ce cas n'est pas le scénario Chrome Organizer actuel.

## 8. Placement de 2 à 6 unités externes

À partir de deux unités, **la direction des relations ne participe plus au placement**.

Appliquer simplement :

```js
cote = index % 2 === 0 ? "gauche" : "droite"
```

Donc :

```text
index 0 -> gauche
index 1 -> droite
index 2 -> gauche
index 3 -> droite
index 4 -> gauche
index 5 -> droite
```

Cette règle est volontairement simple.

Elle doit produire une vue équilibrée et reproductible sans moteur de graph layout.

## 9. Chrome Organizer : résultat attendu du placement

Avec les quatre unités actuelles :

### 0 — Chrome / User Data

→ gauche

La relation reste :

```text
User Data -> Chrome Organizer
```

La flèche va donc naturellement vers la droite depuis l'unité de gauche jusqu'à l'application.

### 1 — Sauvegardes

→ droite

Conserver deux relations :

```text
Chrome Organizer -> Sauvegardes
Sauvegardes -> Chrome Organizer
```

et donc les deux flèches distinctes.

### 2 — Exports JSON / HTML

→ gauche

C'est le cas essentiel qui prouve que la position ne code plus la direction.

La relation reste :

```text
Chrome Organizer -> Exports
```

L'objet est à gauche : la flèche doit donc **pointer vers la gauche**, de l'application vers les fichiers JSON / HTML.

Ne pas déplacer Exports à droite pour « faciliter » la flèche.

### 3 — Copie de restauration

→ droite

La relation reste :

```text
Chrome Organizer -> Copie de restauration
```

La flèche pointe vers la droite.

### Esquisse conceptuelle

```text
┌────── Chrome ──────┐                         [ archive ]
│    📁 User Data    │  ─────→            ───→
└────────────────────┘                  CHROME
                                      ORGANIZER
       [ JSON ] [ HTML ]  ←─────          ───→   📁 restauration
                                             EXPÉRIMENTAL
                                  [ archive ] ───→ / ←───
```

Cette esquisse ne fixe pas la géométrie exacte. Elle fixe les **côtés** et les **directions**.

Chercher une composition visuellement équilibrée, avec l'application comme centre de gravité.

## 10. Jusqu'à 6 : gauche / droite suffit

Le renderer doit supporter proprement jusqu'à six unités avec l'alternance gauche / droite.

Le nombre d'unités par côté doit pouvoir aller jusqu'à trois.

Les unités d'un même côté doivent être réparties verticalement de façon équilibrée autour de l'application.

Ne pas aligner mécaniquement les trois unités tout en haut ou tout en bas.

Ne pas utiliser leurs directions pour modifier leur ordre vertical.

## 11. À partir de 7 : haut / bas sera ajouté

La grammaire acte désormais le seuil suivant :

> **À partir de 7 unités externes, gauche / droite ne suffira plus : le placement devra également exploiter le haut et le bas.**

Mais **ne pas inventer aujourd'hui l'algorithme quatre côtés**.

Aucun spécimen réel actuel ne possède 7 unités externes.

Donc TG-009b doit :

- documenter ce seuil ;
- ne pas construire de moteur spéculatif haut/bas ;
- ne pas ajouter de dépendance de graph layout ;
- conserver un comportement défensif si un jeu artificiel dépasse 6, sans prétendre que cette vue est une règle stabilisée.

Le vrai premier cas à 7+ décidera de l'algorithme.

## 12. Préserver les formes de TG-009a

Ne pas revenir à quatre rectangles identiques.

Conserver :

### Chrome / User Data
- cadre de contexte ;
- dossier ;
- `User Data` ;
- `LECTURE SEULE`.

### Sauvegardes
- forme d'archive ;
- `SHA-256` ;
- format `dossier` si toujours utile ;
- nom sémantique accessible.

### Exports
- fichiers JSON et HTML ;
- un seul objet sémantique ;
- une seule relation.

### Restauration
- dossier ;
- `EXPÉRIMENTAL`.

Le traitement pointillé éventuel ne doit plus signifier « destination ».

S'il est conservé, il doit être justifié par une propriété intrinsèque telle que le statut expérimental.

## 13. Ne pas fabriquer un contexte « stockage local » dans cette mission

Nous avons évoqué l'idée d'un regroupement possible des artefacts locaux de sortie.

Elle n'est pas encore suffisamment stabilisée.

TG-009b ne doit donc pas inventer :

- `Stockage local` ;
- `Artefacts locaux` ;
- ou un autre contexte englobant Sauvegardes / Exports / Restauration.

Le seul contexte structurel éprouvé ici est **Chrome contenant User Data**.

Un futur cas réel décidera s'il faut d'autres contextes.

## 14. Relations et accessibilité

Chaque relation reste un fait individuel du modèle.

Conserver des libellés accessibles indiquant réellement :

```text
source -> destination
```

indépendamment de la position graphique.

Pour les sauvegardes, conserver deux éléments de relation accessibles distincts.

Le changement de côté d'Exports ne doit jamais changer sa relation sémantique.

## 15. Filtres

Conserver :

- Technologie ;
- Données ;
- Flux ;
- reset.

### Données

Mettre en évidence toutes les unités de données externes, y compris :

- le contexte Chrome avec User Data ;
- Sauvegardes ;
- JSON / HTML ;
- restauration expérimentale.

### Flux

Mettre en évidence les cinq flèches selon leur position réelle.

### Technologie

Comportement inchangé.

## 16. Lecture partielle

Vérifier notamment :

### Clé inconnue

Ajouter temporairement :

```js
sauvegardes.canexistepas = "x"
```

Résultat :

- archive conservée ;
- valeur inconnue non affichée ;
- `⚠`.

### Contexte invalide

Tester temporairement un contexte contenant une référence inexistante.

Résultat :

- pas d'objet inventé ;
- pas de crash ;
- `⚠`.

## 17. Responsive

### Bureau

Vérifier au minimum 1448 px.

L'application doit rester le centre visuel, avec deux unités à gauche et deux à droite dans Chrome Organizer.

### Mobile

À 390 et 320 px, une pile verticale est acceptable.

Le placement gauche / droite n'a pas à être littéralement conservé sur petit écran si cela détruit la lisibilité.

En revanche :

- l'ordre narratif reste stable ;
- les relations gardent leur vraie direction ;
- les deux flèches sauvegardes restent distinctes ;
- aucun débordement.

La règle gauche / droite est principalement une règle de composition de la vue large.

## 18. Non-régression

### Mon Aise

Conserver :
- rendu ;
- identité ;
- technologies ;
- données ;
- filtres ;
- présentation.

### Mon GPT<3

Conserver :
- Collector ;
- ChatGPT dans son navigateur ;
- relations ;
- identité ;
- technologies ;
- données ;
- filtres ;
- présentation.

Ne pas forcer Mon GPT<3 à migrer son navigateur vers le nouveau `type: contexte` dans cette mission.

La notion générale de contexte continuera à être éprouvée progressivement.

### Accueil / 404

Pas de refonte graphique.

Passage de version seulement.

## 19. Tests ciblés

Effectuer une recette L2 ciblée.

### Chrome Organizer bureau

Vérifier :

- quatre unités externes ;
- deux à gauche / deux à droite ;
- ordre exact 0/1/2/3 ;
- User Data -> appli ;
- appli -> Sauvegardes ;
- Sauvegardes -> appli ;
- appli -> Exports alors qu'Exports est à gauche ;
- appli -> restauration ;
- aucune direction déduite de la position.

### 2 à 6 unités

À l'aide de copies temporaires / modèles synthétiques en mémoire, vérifier les placements :

```text
2 : G D
3 : G D G
4 : G D G D
5 : G D G D G
6 : G D G D G D
```

Ne pas publier ces faux projets dans le menu.

### 1 unité

Vérifier :

- uniquement objet -> appli : gauche ;
- uniquement appli -> objet : droite.

### 7 unités

Un test artificiel peut seulement vérifier que le renderer ne plante pas.

Ne pas présenter son placement comme une règle stabilisée.

### Responsive

- 1448 px ;
- 390 px ;
- 320 px.

### Console

Aucune erreur.

## 20. Documentation

Mettre à jour de façon ciblée :

- `README.md` ;
- toute documentation de grammaire nécessaire si l'implémentation révèle une précision utile.

Ne pas réécrire les rapports historiques.

## À ne pas faire

Ne pas :

- créer TG-010 ;
- commencer la vue 2 ;
- remettre `role: source` ou `role: destination` ;
- ajouter un champ `position`, `cote`, `gauche`, `droite` dans le spécimen ;
- ajouter `direction` aux relations ;
- regrouper les objets par sens de flux ;
- trier les objets pour « améliorer » automatiquement le diagramme ;
- utiliser `↔` pour les sauvegardes ;
- créer un moteur Graphviz / force layout ;
- figer aujourd'hui l'algorithme 7+ ;
- inventer un contexte Stockage local ;
- transformer Chrome en application active ;
- refondre Mon GPT<3 ou Mon Aise.

## Livrables

- contrat `schema_version 0.1.7` ;
- `role` directionnels retirés de Chrome Organizer ;
- contexte Chrome structurel avec `contient` ;
- renderer des contextes ;
- placement équilibré 1 / 2–6 ;
- Chrome Organizer avec deux unités à gauche et deux à droite ;
- flèches orientées uniquement selon les relations ;
- formes TG-009a préservées ;
- filtres adaptés ;
- README actualisé ;
- `reports/TG-009b/rapport.md` ;
- captures bureau / mobile utiles.

Le rapport doit préciser :

1. nouveau modèle du contexte Chrome ;
2. suppression des rôles directionnels ;
3. construction des unités de placement ;
4. règle du cas 1 unité ;
5. alternance 2–6 ;
6. résultat exact de Chrome Organizer ;
7. comment une sortie placée à gauche est rendue ;
8. comportement des deux relations Sauvegardes ;
9. statut volontairement non figé du cas 7+ ;
10. preuves de non-régression.

Commit et push sur `main`, vérifier le SHA distant, puis arrêt pour validation humaine.
