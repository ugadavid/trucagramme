# TG-012 — Outils pilotés internes et couche DEBUG de construction

## Contexte

Mon Bureau a révélé plusieurs distinctions importantes que le contrat 0.1.7 ne sait pas encore exprimer correctement.

Aujourd'hui, son spécimen déclare Git, curl, Python, PowerShell, tree et VS Code comme `outil_externe`, alors que leur comportement réel n'est pas homogène :

- Git, curl, PowerShell, tree et Python sont lancés sans fenêtre propre, pilotés par Mon Bureau et leurs résultats sont présentés dans l'interface de Mon Bureau ;
- VS Code, au contraire, s'ouvre comme une application indépendante visible ;
- Mon Bureau affiche encore `AUTONOME`, alors que plusieurs fonctions dépendent d'outils installés séparément ;
- `⚠` sait désormais inventorier le sens non rendu, mais pendant la construction de la grammaire il serait utile de voir aussi ces inconnus **graphiquement autour du diagramme**, sans prétendre qu'ils sont déjà compris.

Cette mission introduit :

1. la notion d'**outil piloté** ;
2. un troisième groupe interne dans l'application : **Outils pilotés** ;
3. la distinction avec une **application externe** ;
4. une couche **DEBUG** activable par le spécimen ;
5. la suppression de l'affirmation `AUTONOME` pour Mon Bureau.

Le contrat passe à :

```js
schema_version: "0.1.8"
```

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-011/rapport.md`
- `projets/mon_bureau/specimen.js`
- `lecteur/lecteur.js`
- `lecteur/rendu.js`
- `lecteur/lecture-partielle.js`
- `lecteur/interactions.js`
- `lecteur/styles.css`

Préserver toutes les décisions précédentes : légende contextuelle, lecture partielle, placements déjà stabilisés, accueil, 404 et non-régression des trois autres projets.

## 1. Passer les cinq spécimens en schema_version 0.1.8

Passer à `0.1.8` :

- `projets/accueil/specimen.js`
- `projets/404/specimen.js`
- `projets/mon_aise/specimen.js`
- `projets/mon_gpt/specimen.js`
- `projets/chrome_organizer/specimen.js`
- `projets/mon_bureau/specimen.js`

Le lecteur doit attendre `0.1.8`.

Les cinq spécimens autres que Mon Bureau ne changent pas sémantiquement.

Pas de migration.

## 2. Retirer AUTONOME de Mon Bureau

Dans Mon Bureau, supprimer :

```js
livraison: "autonome"
```

### Pourquoi

Le paquet embarque bien son runtime .NET, mais plusieurs fonctions représentées au niveau 1 dépendent d'outils installés séparément :

- Git ;
- curl ;
- Python ;
- VS Code ;
- PowerShell / outils système selon les cas.

La languette `AUTONOME` affirme donc trop.

Ne pas la remplacer par :

- `NON AUTONOME` ;
- `PARTIELLEMENT AUTONOME` ;
- `RUNTIME AUTONOME`.

Le modèle permissif s'applique :

> absence de `livraison` = aucune affirmation.

## 3. Requalifier les outils pilotés

Requalifier les objets suivants :

```text
git
curl
python
powershell
tree
```

de :

```js
type: "outil_externe"
```

vers :

```js
type: "outil_pilote"
```

Exemples :

```js
git: {
  nom: "Git",
  type: "outil_pilote"
}
```

```js
python: {
  nom: "Python",
  type: "outil_pilote"
}
```

Ces objets restent déclarés au premier niveau du modèle.

### Pourquoi

Ils sont techniquement des exécutables séparés, mais au niveau 1 ils participent au fonctionnement interne de Mon Bureau :

- Mon Bureau les invoque ;
- ils ne montrent pas leur propre fenêtre ;
- leurs sorties sont récupérées par Mon Bureau ;
- l'utilisateur reste dans l'interface de Mon Bureau.

La frontière graphique de niveau 1 représente donc l'expérience fonctionnelle, pas strictement la frontière des processus.

## 4. Créer appli.outils_pilotes

Ajouter à Mon Bureau :

```js
appli: {
  ...
  outils_pilotes: [
    "git",
    "curl",
    "python",
    "powershell",
    "tree"
  ]
}
```

L'ordre du tableau détermine l'ordre d'affichage dans le groupe interne.

### Sémantique

`outils_pilotes` :

- contient des références vers des objets déclarés au premier niveau ;
- n'invente pas de nouveaux objets ;
- exprime leur intégration fonctionnelle à l'application dans la vue 1 ;
- ne signifie pas que leurs binaires sont embarqués dans la distribution.

Si une référence est inconnue :

- ne pas inventer l'objet ;
- laisser du sens non consommé ;
- déclencher `⚠`.

## 5. Troisième groupe interne : Outils pilotés

Le bloc principal peut désormais contenir jusqu'à trois groupes de niveau 1 :

- Socle technique ;
- Outils pilotés ;
- Données.

Mon Bureau doit afficher un groupe interne **Outils pilotés**.

### Contenu

Afficher les cinq objets référencés :

- Git ;
- curl ;
- Python ;
- PowerShell ;
- tree.

Le rendu doit rester compact.

Ne pas créer cinq gros blocs comparables à l'application principale.

Pistes acceptables :

- petites tuiles ;
- pastilles structurées ;
- mini-cartes ;
- autre solution cohérente avec la grammaire.

Le but est de faire comprendre :

> Mon Bureau s'appuie intérieurement sur ces outils pilotés.

### Identité visuelle

Le texte court suffit pour ce premier passage.

Ne pas aller chercher ou ajouter des logos Git/curl/Python/PowerShell/tree dans cette mission.

Python possède déjà un logo commun pour le socle technique, mais ne pas réutiliser automatiquement ce logo dans Outils pilotés si cela alourdit la lecture.

## 6. Les outils pilotés restent de vrais objets

Même lorsqu'ils sont affichés à l'intérieur de l'application, les outils pilotés restent des objets sémantiques de premier niveau.

C'est important pour permettre des relations vers d'autres objets.

Exemple réel :

```js
{ source: "python", destination: "serveur_local" }
```

Cette relation doit rester dans le modèle.

La représentation interne de Python ne doit pas supprimer son identité d'objet.

## 7. Retirer les relations répétitives appli ↔ outils pilotés

L'appartenance à `appli.outils_pilotes` raconte déjà que l'application utilise ces outils.

Supprimer de Mon Bureau les relations dont le seul apport est de répéter cette inclusion :

```js
{ source: "appli", destination: "git" }
{ source: "git", destination: "appli" }

{ source: "appli", destination: "curl" }
{ source: "curl", destination: "appli" }

{ source: "appli", destination: "python" }

{ source: "appli", destination: "powershell" }
{ source: "powershell", destination: "appli" }

{ source: "appli", destination: "tree" }
{ source: "tree", destination: "appli" }
```

### Conserver

Conserver les relations qui racontent un fait distinct, notamment :

```js
{ source: "python", destination: "serveur_local" }
```

Ne pas modifier les relations concernant :

- Windows / services système ;
- serveur local ;
- VS Code ;

sauf ce qui est explicitement demandé ailleurs dans cette mission.

## 8. VS Code devient application_externe

Requalifier :

```js
vscode: {
  nom: "Visual Studio Code",
  type: "application_externe"
}
```

VS Code reste extérieur au bloc principal.

### Pourquoi

Mon Bureau provoque réellement l'ouverture d'une application indépendante visible par l'utilisateur.

Ne pas ajouter VS Code au groupe `outils_pilotes`.

Ne pas inventer encore la forme graphique définitive de `application_externe` dans cette mission.

VS Code peut donc rester non rendu et apparaître dans DEBUG + `⚠`.

## 9. Services système et service local restent inconnus

Ne pas apprendre à dessiner dans TG-012 :

```text
service_systeme
service_local
application_externe
```

Ils doivent rester dans le reste non rendu.

Le but de cette mission n'est pas de résoudre tout Mon Bureau.

## 10. specimen.debug

Ajouter à Mon Bureau :

```js
specimen: {
  version: "alpha-0.0.0.1",
  debug: true
}
```

Le lecteur / renderer doit reconnaître :

```js
debug: true
debug: false
```

### Règle

- `debug === true` → afficher la couche DEBUG ;
- `debug === false` ou propriété absente → ne rien afficher.

`debug` appartient aux métadonnées du spécimen, pas à l'application.

Il doit être consommé proprement et ne jamais déclencher `⚠` à lui seul.

## 11. Couche DEBUG : principe

Lorsque `debug = true`, afficher autour du diagramme un **cartouche de construction clairement identifié DEBUG**.

Cette couche sert à bâtir la grammaire.

Elle montre graphiquement les objets que le renderer voit mais ne sait pas encore représenter.

### Fondamental

> **Afficher en DEBUG ne consomme aucun sens.**

Le modèle restant qui alimente `⚠` doit être strictement identique avec :

```js
debug: true
```

et :

```js
debug: false
```

à modèle sémantique égal.

## 12. Source de la couche DEBUG

Construire DEBUG à partir du **même reste non rendu** que celui utilisé par la lecture partielle, après rendu normal.

Ne pas créer une liste spéciale Mon Bureau.

Ne pas repartir du specimen original pour deviner ce qui est inconnu.

La couche DEBUG doit être générique.

## 13. Objets montrés dans DEBUG

Pour chaque objet de premier niveau restant avec un `type` textuel, créer une petite représentation fantôme contenant au minimum :

```text
clé technique
type
```

Exemples attendus après introduction des outils pilotés :

```text
windows
contexte
```

```text
shell_windows
service_systeme
```

```text
vscode
application_externe
```

```text
serveur_local
service_local
```

Les outils pilotés correctement rendus dans le groupe interne ne doivent plus apparaître dans DEBUG.

## 14. Style DEBUG

Le DEBUG doit être **impossible à confondre avec la grammaire stabilisée**.

Utiliser une esthétique volontairement différente, par exemple :

- gris / graphite ;
- contour discontinu ;
- petite mention `DEBUG` ;
- typographie technique légère ;
- opacité ou traitement fantôme.

Ne pas utiliser les couleurs principales stabilisées des familles comme si ces formes étaient définitives.

Le cartouche global peut porter un titre court :

```text
DEBUG · non représenté
```

Pas de paragraphe explicatif.

## 15. Placement DEBUG

Le but est d'aider visuellement à construire la future vue.

Sur bureau, placer les formes DEBUG **autour de l'application**, sans recouvrir :

- l'application ;
- les filtres ;
- la version ;
- les panneaux du lecteur.

Il est acceptable de reprendre une logique simple de distribution provisoire.

### Important

Ne pas considérer ce placement comme une nouvelle règle de grammaire.

Le placement DEBUG peut être explicitement provisoire.

À partir de plusieurs objets, chercher seulement un équilibre utile à la conception.

Ne pas implémenter le vrai algorithme 7+ dans cette mission.

## 16. Relations en DEBUG

Ne pas dessiner les relations non représentées dans le cartouche DEBUG pour cette première version.

Elles restent uniquement résumées dans `⚠` :

```text
relations · N non représentées
```

Le cartouche DEBUG montre les **objets inconnus**, pas encore le réseau de relations.

Cela évite immédiatement l'effet « métro parisien ».

## 17. DEBUG et propriétés inconnues

Les propriétés inconnues dans un objet connu restent uniquement dans `⚠`.

Exemple :

```text
sauvegardes.canexistepas
```

Ne pas créer une carte DEBUG séparée pour chaque propriété inconnue.

La couche DEBUG se concentre sur les objets de premier niveau non rendus.

## 18. DEBUG et contextes

Un contexte inconnu comme :

```text
windows · contexte
```

peut apparaître comme une carte DEBUG indépendante.

Ne pas essayer encore d'imbriquer graphiquement ses membres `service_systeme` dans le cadre Windows.

Cette future représentation sera étudiée lorsque la grammaire de `service_systeme` sera abordée.

Pour TG-012, DEBUG montre simplement les inconnus.

## 19. Lecture partielle ⚠ inchangée

C'est un critère de recette essentiel.

Avec Mon Bureau après cette mission, la bulle `⚠` doit toujours inventorier tout ce qui reste non représenté.

Elle doit notamment continuer à contenir :

- les objets inconnus ;
- les relations restantes.

Le contenu doit être **strictement identique** lorsque l'on bascule seulement :

```js
debug: true
```

vers :

```js
debug: false
```

Le cartouche DEBUG ne réduit pas la lecture partielle.

## 20. Résultat attendu sur Mon Bureau

Le bloc principal doit désormais montrer :

### En-tête
- Mon Bureau ;
- local ;
- bureau ;
- Windows ;
- **pas AUTONOME**.

### Socle technique
- .NET 10 ;
- C# ;
- Windows Forms.

### Outils pilotés
- Git ;
- curl ;
- Python ;
- PowerShell ;
- tree.

### Données
- Configuration JSON ;
- SÉPARÉ DES BINAIRES.

Autour du diagramme, uniquement parce que `debug: true` :

- cartes DEBUG pour les objets encore inconnus ;
- pas de relations DEBUG.

Et `⚠` reste présent avec l'inventaire complet du reste.

## 21. Filtres

La barre de filtres actuelle possède :

- Technologie ;
- Données ;
- Flux selon le cas.

Ajouter si nécessaire une famille interactive pour **Outils pilotés** seulement si cela reste naturel et très léger.

Préférence : éviter d'ajouter un quatrième bouton dans cette mission sauf si le groupe interne devient difficile à isoler sans cela.

Le groupe doit toutefois participer correctement à l'atténuation générale lorsqu'un autre filtre est actif.

Ne pas faire du DEBUG une famille filtrable.

## 22. Légende

La légende contextuelle doit apprendre le nouveau signe stabilisé :

```text
Outils pilotés
```

uniquement lorsqu'un groupe correspondant est présent.

Elle ne doit pas expliquer les cartes DEBUG comme faisant partie de la grammaire.

Option acceptable :

- ne rien ajouter sur DEBUG dans la légende ;
- ou une entrée séparée clairement nommée `Élément DEBUG` si nécessaire pour éviter une ambiguïté visuelle.

Préférence : le titre global `DEBUG · non représenté` doit suffire, donc ne pas encombrer la légende.

## 23. Responsive

Vérifier :

- 1448 px ;
- 390 px ;
- 320 px.

Sur mobile :

- le groupe Outils pilotés doit rester lisible ;
- le cartouche DEBUG peut passer sous le diagramme plutôt que chercher à entourer l'application ;
- aucun débordement horizontal ;
- `⚠` reste utilisable ;
- DEBUG ne recouvre pas les contrôles.

## 24. Non-régression

### Mon GPT<3
Aucun changement sémantique ni visuel attendu hors passage 0.1.8.

### Mon Aise
Aucun changement sémantique ni visuel attendu hors passage 0.1.8.

### Chrome Organizer
Aucun changement sémantique ni visuel attendu hors passage 0.1.8.

### Accueil / 404
Pas de DEBUG.
Pas de nouveau panneau.
Passage de version uniquement.

## 25. Recette ciblée

Effectuer une recette L2 ciblée.

### Mon Bureau
Vérifier :

- AUTONOME absent ;
- groupe Outils pilotés présent ;
- 5 outils dans le bon ordre ;
- VS Code absent du groupe ;
- DEBUG visible avec `debug:true` ;
- DEBUG absent avec `debug:false` ;
- mêmes inconnus dans `⚠` dans les deux cas ;
- outils pilotés absents de `⚠` une fois compris ;
- objets encore inconnus présents dans `⚠` ;
- relations restantes correctement recomptées après suppression des relations répétitives ;
- aucune relation DEBUG dessinée.

### Références invalides
Sur une copie temporaire :

- ajouter une référence inconnue dans `appli.outils_pilotes` ;
- vérifier `⚠` ;
- aucun objet inventé.

### Responsive
- 1448 ;
- 390 ;
- 320.

### Console
Aucune erreur.

## 26. Documentation

Mettre à jour de façon ciblée :

- `README.md` ;
- documentation de grammaire si l'implémentation révèle une précision réellement utile.

Ne pas réécrire les rapports historiques.

## À ne pas faire

Ne pas :

- apprendre à dessiner `service_systeme` ;
- apprendre à dessiner `service_local` ;
- apprendre à dessiner `application_externe` ;
- dessiner les relations dans DEBUG ;
- résoudre le placement 7+ ;
- créer un moteur de graph layout ;
- remettre AUTONOME à Mon Bureau ;
- mettre VS Code dans Outils pilotés ;
- ajouter des logos d'outils ;
- modifier le contenu de `⚠` pour tenir compte de DEBUG ;
- consommer le modèle via DEBUG ;
- créer une vue 2 ;
- créer TG-013.

## Livrables

- contrat `schema_version 0.1.8` ;
- Mon Bureau sans `livraison: autonome` ;
- objets `outil_pilote` ;
- `appli.outils_pilotes` ;
- groupe interne Outils pilotés ;
- VS Code en `application_externe` ;
- relations répétitives appli ↔ outils retirées ;
- relation `python -> serveur_local` conservée ;
- `specimen.debug` reconnu ;
- couche DEBUG générique depuis le reste non rendu ;
- DEBUG non consommant ;
- `⚠` inchangé à modèle égal ;
- légende adaptée ;
- `reports/TG-012/rapport.md` ;
- captures utiles avec debug true et false.

Le rapport doit préciser :

1. nouveau modèle des outils pilotés ;
2. pourquoi ils sont rendus à l'intérieur malgré leur processus externe ;
3. retrait d'AUTONOME ;
4. distinction VS Code / outil piloté ;
5. relations supprimées et relations conservées ;
6. construction de la couche DEBUG ;
7. preuve que DEBUG ne consomme rien ;
8. comparaison exacte de `⚠` entre debug true / false ;
9. comportement bureau / mobile ;
10. non-régression.

Commit et push sur `main`, vérifier le SHA distant, puis arrêt pour validation humaine.
