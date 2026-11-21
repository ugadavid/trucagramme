# TG-014 — Première représentation d’un serveur

## Contexte

Après TG-013, Mon Bureau possède encore cinq objets non représentés :

- `windows · contexte` ;
- `shell_windows · service_systeme` ;
- `processus_windows · service_systeme` ;
- `tcp_windows · service_systeme` ;
- `serveur_local · service_local`.

Le serveur local est le prochain cas choisi pour faire progresser la vue 1.

La recette réelle de Mon Bureau montre qu'il n'est pas nécessaire, à ce niveau, de raconter :

```text
Python -> serveur local
```

même si cette mécanique existe réellement.

Pour la vue 1, la compréhension utile est :

> Mon Bureau lance et pilote un serveur local, réalisé avec Python, exposé en HTTP sur 127.0.0.1.

Cette mission introduit donc une vraie nature :

```text
type = serveur
```

et retire un détail d'implémentation inutile de la vue 1.

Le contrat passe à :

```js
schema_version: "0.1.11"
```

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-013/rapport.md`
- `projets/mon_bureau/specimen.js`
- `lecteur/rendu.js`
- `lecteur/lecture-partielle.js`
- `lecteur/interactions.js`
- `lecteur/styles.css`

Préserver toutes les décisions stabilisées de TG-012 / TG-013 :

- outils pilotés internes ;
- VS Code en `editeur` ;
- DEBUG non consommant ;
- lecture partielle ;
- légende contextuelle ;
- règle de placement des unités externes.

## 1. Passer les six spécimens en 0.1.11

Passer à :

```js
schema_version: "0.1.11"
```

dans :

- `projets/accueil/specimen.js`
- `projets/404/specimen.js`
- `projets/mon_aise/specimen.js`
- `projets/mon_gpt/specimen.js`
- `projets/chrome_organizer/specimen.js`
- `projets/mon_bureau/specimen.js`

Le lecteur attend `0.1.11`.

Les cinq spécimens autres que Mon Bureau ne changent pas sémantiquement.

## 2. Requalifier le serveur

Remplacer :

```js
serveur_local: {
  nom: "Serveur local",
  type: "service_local",
  protocole: "http",
  hote: "127.0.0.1"
}
```

par :

```js
serveur_local: {
  nom: "Serveur local",
  type: "serveur",
  moteur: "python",
  protocole: "http",
  hote: "127.0.0.1"
}
```

### Principe

Le type dit **ce que c'est** :

```text
serveur
```

Les propriétés disent **comment il est réalisé et exposé** :

```text
moteur = python
protocole = http
hote = 127.0.0.1
```

Ne pas créer :

- `serveur_local` comme type ;
- `service_local` ;
- `local: true` ;
- ou une propriété de placement.

## 3. Supprimer la relation Python -> serveur

Supprimer du specimen Mon Bureau :

```js
{ source: "python", destination: "serveur_local" }
```

### Pourquoi

Cette relation décrit un détail d'implémentation qui n'est pas nécessaire dans la vue 1.

Le fait que le serveur utilise Python est désormais porté par :

```js
moteur: "python"
```

### Important

Ne pas recréer graphiquement une flèche Python -> serveur à partir de `moteur`.

`moteur` est une propriété du serveur, pas une relation.

## 4. Relations du serveur conservées

Conserver :

```js
{ source: "appli", destination: "serveur_local" },
{ source: "serveur_local", destination: "appli" }
```

Le serveur est donc lié à Mon Bureau par deux relations distinctes.

Le renderer doit dessiner deux flèches distinctes, comme pour les sauvegardes de Chrome Organizer.

Ne pas créer `↔`.

Ne pas créer de champ `bidirectionnel`.

## 5. Représentation graphique de type serveur

Créer une forme générique pour :

```text
type = serveur
```

Elle doit être immédiatement reconnaissable comme un **serveur** ou une machine/service serveur, sans dépendre du texte « Serveur local ».

### Asset

Aucun asset serveur n'existe actuellement dans le dépôt.

Pour cette première version :

- préférer une forme CSS simple ;
- éviter d'ajouter une dépendance externe ;
- éviter de chercher un logo Internet.

Piste graphique :

- petit châssis / rack ;
- 2 ou 3 lignes horizontales ;
- quelques témoins / ports ;
- silhouette claire même en miniature.

Le dessin doit être assez simple pour être réutilisable avec d'autres serveurs futurs.

## 6. Texte visible

Le nom sémantique reste :

```text
Serveur local
```

dans le modèle et dans l'accessibilité.

Mais visuellement, ne pas afficher un grand titre « Serveur local » si la forme et ses qualifications suffisent.

Nous voulons continuer à réduire le texte explicatif.

## 7. Propriétés visibles du serveur

Afficher de manière compacte :

```text
Python
HTTP
127.0.0.1
```

ou équivalent graphique lisible.

### Python

`moteur: "python"` peut être rendu :

- par le mot `Python` ;
- ou par une petite identité Python déjà disponible dans les assets communs si cela reste léger.

Ne pas créer une nouvelle relation vers l'outil piloté Python.

### HTTP

`protocole: "http"` devient :

```text
HTTP
```

### Hôte

`hote: "127.0.0.1"` peut être affiché tel quel.

Ce niveau de précision est pertinent ici : il raconte immédiatement que le serveur écoute sur la boucle locale.

Ne pas ajouter le port : il n'est pas dans le modèle courant de ce serveur générique.

## 8. Couleur du serveur

Ne pas inventer immédiatement une nouvelle grande famille chromatique si elle n'est pas nécessaire.

Le type doit être compris d'abord par sa forme.

Une couleur d'accent sobre peut être choisie, distincte :

- du turquoise Outils pilotés ;
- du violet Socle ;
- du vert Données ;
- de l'orange Compagnon ;
- du gris DEBUG ;
- du bleu principal.

La palette exacte n'est pas normative.

## 9. Placement

Après TG-014, Mon Bureau possède deux vraies unités externes connues :

1. VS Code / éditeur ;
2. serveur.

Appliquer la règle de placement déjà stabilisée pour 2 à 6 unités :

```text
index 0 -> gauche
index 1 -> droite
```

**Important : l'ordre est l'ordre de déclaration des unités réellement rendues dans le specimen.**

Ne pas trier selon la direction des relations.

Ne pas forcer le serveur à droite parce qu'il s'agit d'une sortie.

La relation porte seule le sens.

### Conséquence

Selon l'ordre canonique actuel du specimen, vérifier le côté réellement obtenu et le documenter dans le rapport.

Ne pas réordonner les blocs pour « faire joli » sans décision explicite.

## 10. Deux relations vers le serveur

Quel que soit son côté :

- `appli -> serveur` ;
- `serveur -> appli`;

doivent produire deux flèches distinctes.

Si le serveur est à gauche, une des flèches doit naturellement pointer vers la gauche et l'autre vers la droite.

La position ne code pas la direction.

## 11. DEBUG

Après compréhension de `type = serveur` :

- `serveur_local` doit disparaître des cartes DEBUG ;
- les autres inconnus Windows restent.

Le cartouche DEBUG continue à montrer uniquement les objets non représentés.

Ne pas changer sa logique.

## 12. Lecture partielle

Avant TG-014, `⚠` contient :

```text
windows · contexte
shell_windows · service_systeme
processus_windows · service_systeme
tcp_windows · service_systeme
serveur_local · service_local
relations · 8 non représentées
```

Après la mission, attendu :

- plus aucune ligne `serveur_local ...` ;
- relation Python -> serveur supprimée du modèle ;
- deux relations appli <-> serveur consommées ;
- compteur recalculé.

Avec les relations actuelles, le résultat devrait probablement descendre à :

```text
relations · 5 non représentées
```

mais **ne pas coder 5 en dur**.

Calculer le reste réel.

DEBUG true / false doit continuer à produire le même `⚠`.

## 13. Légende

Ajouter une entrée contextuelle :

```text
Serveur
```

lorsqu'un objet `type = serveur` est présent.

La miniature doit reprendre la forme générique du serveur.

Ne pas ajouter :

- Serveur local ;
- Python ;
- HTTP ;
- 127.0.0.1 ;

comme entrées séparées de légende.

Ce sont des propriétés / valeurs du serveur.

## 14. Filtres

Ne pas ajouter un nouveau bouton Serveur.

La barre de filtres reste compacte.

Le serveur doit simplement être atténué lorsque l'utilisateur isole une autre famille existante.

Les deux flèches serveur participent au filtre Flux.

## 15. Responsive

Vérifier :

- 1448 px ;
- 390 px ;
- 320 px.

### Bureau

Le serveur doit être lisible autour de Mon Bureau sans concurrencer visuellement l'application principale.

### Mobile

La forme serveur, Python, HTTP et 127.0.0.1 restent lisibles.

Les deux flèches restent distinctes.

Aucun débordement horizontal.

## 16. Cas de recette générique

Tester si possible temporairement un autre serveur :

```js
serveur_test: {
  nom: "Serveur test",
  type: "serveur",
  moteur: "node",
  protocole: "https",
  hote: "localhost"
}
```

Le renderer doit conserver la forme serveur même s'il ne connaît pas d'asset spécifique pour le moteur.

Il peut afficher les valeurs textuellement.

Ne pas publier ce faux serveur dans un specimen canonique.

## 17. Lecture partielle sur propriété inconnue

Ajouter temporairement :

```js
serveur_local.canexistepas = "x"
```

Vérifier :

- serveur toujours rendu ;
- propriétés connues toujours rendues ;
- `⚠` signale `serveur_local.canexistepas` ;
- valeur `x` absente.

## 18. Non-régression

### Mon Bureau

Conserver :

- VS Code éditeur avec Mon GPT<3 / Trucagramme ;
- Outils pilotés turquoise ;
- Données ;
- DEBUG ;
- lecture partielle.

### Chrome Organizer

Conserver les deux flèches des sauvegardes.

### Mon GPT<3

Conserver Collector / navigateur / ChatGPT.

### Mon Aise

Aucun changement visuel attendu.

### Accueil / 404

Passage de version seulement.

## 19. Tests proportionnés

Recette L2 ciblée.

Vérifier :

- serveur rendu ;
- moteur / protocole / hôte ;
- deux flèches ;
- placement selon ordre de déclaration ;
- disparition du serveur de DEBUG ;
- disparition du serveur de `⚠` ;
- compteur de relations recalculé ;
- légende Serveur ;
- filtre Flux ;
- propriété inconnue ;
- 1448 / 390 / 320 ;
- console propre ;
- non-régression rapide.

## 20. Documentation

Mettre à jour de façon ciblée :

- `README.md` ;
- documentation de grammaire uniquement si l'implémentation révèle une précision nécessaire.

Ne pas réécrire les rapports historiques.

## À ne pas faire

Ne pas :

- conserver `type = service_local` ;
- créer `type = serveur_local` ;
- conserver la relation `python -> serveur_local` ;
- recréer cette relation depuis `moteur` ;
- dessiner les services système Windows ;
- dessiner le contexte Windows ;
- résoudre le placement 7+ ;
- ajouter un port absent du modèle ;
- ajouter un filtre Serveur ;
- ajouter un asset externe téléchargé ;
- commencer la vue 2 ;
- créer TG-015.

## Livrables

- contrat `schema_version 0.1.11` ;
- serveur en `type: "serveur"` ;
- `moteur: "python"` ;
- `protocole: "http"` ;
- `hote: "127.0.0.1"` ;
- relation Python -> serveur retirée ;
- deux relations appli <-> serveur conservées et rendues ;
- forme serveur générique ;
- pictogramme CSS si aucun asset n'est disponible ;
- entrée Serveur dans la légende ;
- serveur retiré de DEBUG et de `⚠` ;
- compteur de relations recalculé ;
- `reports/TG-014/rapport.md` ;
- captures bureau / mobile utiles.

Le rapport doit préciser :

1. pourquoi `service_local` devient `serveur` ;
2. pourquoi Python devient une propriété et non une relation ;
3. représentation graphique retenue ;
4. propriétés visibles ;
5. placement obtenu et pourquoi ;
6. rendu des deux relations ;
7. évolution exacte de DEBUG et `⚠` ;
8. résultat du test générique serveur ;
9. non-régression.

Commit et push sur `main`, vérifier le SHA distant, puis arrêt pour validation humaine.
