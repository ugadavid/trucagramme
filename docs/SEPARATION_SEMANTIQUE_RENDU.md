# Direction d’architecture — séparer le sens du rendu

**Statut : direction validée ; première implémentation réalisée en TG-003 ; contrat courant : `schema_version 0.1.11`.**

Trucagramme sépare deux responsabilités.

## Ce qui est dit

Une description sémantique de l’application :

- objets ;
- champs structurés ;
- propriétés ;
- groupes ;
- relations.

Cette couche ne connaît ni couleur CSS, ni coordonnées, ni taille de police, ni chemin d’asset.

Le modèle reste **descriptif et permissif** : une information absente n’implique jamais son contraire et ne doit pas créer de contenu graphique vide.

## Ce qui le dit

Le rendu traduit les concepts présents en :

- cadres ;
- couleurs ;
- icônes ;
- emboîtements ;
- groupes ;
- badges ;
- flèches ;
- placement.

L’objectif est qu’un changement de charte visuelle n’oblige pas à réécrire la description de l’application.

## Structure provisoire 0.1.1 du spécimen Mon GPT<3

Cette structure est un contrat expérimental et révisable.

```text
schema_version = 0.1.1

appli
  nom = Mon GPT<3
  type = bureau
  mode_execution = local

  tourne_sous
    os = windows

  livraison = autonome

  socle_technique
    langage = python
    bibliotheque_graphique = tkinter / Tk

  donnees
    locales = true
    separees_des_binaires = true

    catalogue
      role = catalogue
      format = json

    interface
      type = fichiers_interface

    images_personnelles
      optionnel = true

collector
  nom = Mon GPT Collector
  type = extension
  hote = chrome
  role = compagnon

navigateur
  type = navigateur
  contenu
    nom = ChatGPT
    type = service_web

relations
  collector -> appli
  appli -> navigateur

specimen
  version = alpha-0.0.0.1
```

## Règles de portée

- `appli.type` et `appli.mode_execution` sont des champs structurés ;
- `appli.tourne_sous.os` porte le système d’exploitation ;
- `appli.livraison = autonome` signifie ici que le package livré contient ce dont l’application a besoin ;
- le socle technique peut distinguer les rôles sémantiques même si le niveau 1 les affiche ensemble ;
- `donnees.separees_des_binaires` qualifie l’ensemble des données concernées ;
- `images_personnelles.optionnel = true` ne dit rien sur le caractère obligatoire ou non des autres données ;
- `collector.role = compagnon` est un rôle contextuel ;
- `navigateur.contenu` décrit ce qui est affiché/utilisé dans ce contexte ;
- une relation ne référence que des objets déclarés ;
- `source` et `destination` suffisent à exprimer son orientation ;
- une relation reste sans verbe tant que le protocole ne représente pas explicitement ce verbe.

## Versionnement

`schema_version` versionne la structure sémantique.

Il est distinct de :

- `appli.version`, si la version du logiciel décrit mérite d’être renseignée ;
- `specimen.version`, qui versionne la fiche ou le prototype Trucagramme.

Le passage de 0.1 à **0.1.1** est un changement direct du contrat expérimental. Aucune compatibilité descendante ni migration n’est requise à ce stade.

## Optionalité

Principe :

> **Une information n’existe dans le modèle que si elle mérite d’être exprimée.**

Le rendu doit ignorer proprement toute section absente.

Aucune valeur par défaut ne doit inventer du sens. En particulier, l’absence d’un booléen ou d’une propriété ne doit jamais être interprétée automatiquement comme `false`, `obligatoire`, `non autonome`, etc.

## Relations minimales

Principe :

> **Une relation contient le minimum d’information nécessaire pour relier ses objets.**

Exemple courant :

```text
collector -> appli
appli -> navigateur
```

Aucun champ `direction` n’est nécessaire puisque source et destination portent déjà l’orientation.

Aucun champ `action = ouvrir` n’est nécessaire dans le cas actuel : l’objet navigateur contenant ChatGPT suffit à exprimer ce que la vue de niveau 1 montre.

## Registre d’icônes

Le rendu peut référencer les visuels par identifiant sémantique :

```text
windows          -> assets/communs/windows.png
python           -> assets/communs/python.png
tkinter-tk       -> assets/communs/Tk.png
chrome-extension -> assets/communs/ExtensionChrome.png
json             -> assets/communs/json.png
```

Le modèle sémantique ne connaît pas les chemins de fichiers.

## Évolutions 0.1.2 issues du spécimen Mon Aise

Le deuxième spécimen réel confirme que le modèle doit pouvoir employer un vocabulaire plus riche que le renderer sans déformer le sens.

- `socle_technique` peut contenir des natures reconnues différentes comme `runtime`, `langage` ou `bibliotheque_graphique` tout en les rendant graphiquement comme membres d'un même groupe ; une nature inconnue reste non représentée et déclenche `⚠` ;
- `donnees` doit pouvoir accueillir de nouvelles familles sans dépendre de leur nom historique, mais seules les propriétés internes reconnues reçoivent une interprétation graphique ;
- `appli.alias` est un identifiant machine stable de l'application, utilisé pour résoudre un asset d'identité conventionnel ; sa présence n'impose pas l'existence de l'asset ; le prototype est servi par un mini serveur HTTP local afin de tester proprement la ressource sans inventaire manuel ;
- un renderer qui ne représente pas toutes les informations présentes affiche un signal minimal attaché graphiquement à la pastille de version, dans le même langage visuel que les languettes de propriété ;
- une information non encore rendue reste valide : elle n'est ni supprimée, ni transformée, ni remplacée par une valeur inventée.

Le passage à `schema_version 0.1.2` reste direct : aucune migration ni compatibilité descendante n'est requise pendant cette alpha.

## Limite actuelle

Cette structure n’a été éprouvée que sur Mon GPT<3. Elle doit rester petite, révisable et sans migration lourde tant que d’autres applications n’ont pas été utilisées pour la mettre à l’épreuve.


## Lecteur et métadonnées de projet — 0.1.3

Le lecteur Trucagramme est distinct du renderer du diagramme.

Le spécimen peut fournir des métadonnées de projet très légères, consommées par le lecteur avant ou à côté du rendu technique, notamment une courte présentation fonctionnelle.

Ces métadonnées ne deviennent pas automatiquement des objets graphiques du niveau 1 et ne doivent pas déclencher le signal de lecture partielle lorsqu'elles sont reconnues par le lecteur.

Le lecteur peut également connaître plusieurs spécimens pour permettre la navigation entre projets. Cette navigation relève de l'interface du lecteur, pas des relations sémantiques du diagramme.

L'interface doit rester presque absente lorsqu'elle n'est pas utilisée et ne doit jamais provoquer de reflow du Trucagramme courant.


## Vues système du lecteur — 0.1.4

Le lecteur possède désormais deux spécimens système distincts des projets utilisateur :

- `projets/accueil/specimen.js` ;
- `projets/404/specimen.js`.

Ils fournissent le contenu des états spéciaux du lecteur mais ne sont pas listés dans `projets/index.json`.

Le lecteur choisit explicitement entre :

- `rendreAccueil()` ;
- `rendreSpecimen()` ;
- `rendreProjetIntrouvable()`.

Les vues système peuvent employer la grammaire graphique Trucagramme comme langage visuel sans créer de faux objet applicatif ni passer par le renderer technique d'un projet.

La racine sans paramètre devient donc un véritable accueil du lecteur. Un alias inconnu devient un véritable état « projet introuvable » au lieu de retomber silencieusement sur le premier projet.


## Chrome Organizer — objets de données externes et relations opposées (0.1.5)

Le troisième spécimen réel distingue les données internes d'une application des objets de données externes qu'elle lit ou produit.

Le renderer doit pouvoir représenter des objets externes de types tels que `dossier_donnees`, `archives_locales` ou `fichiers`, avec des propriétés courtes reconnues comme `lecture_seule`, `format`, `formats`, `integrite` et `statut`.

Deux relations opposées entre les mêmes objets restent deux faits sémantiques distincts. Le renderer peut les rapprocher graphiquement mais ne doit pas les remplacer par un nouveau champ ou une relation synthétique « bidirectionnelle ».

Le passage à `schema_version 0.1.5` conserve les décisions précédentes et ajoute ce vocabulaire au niveau 1.

## Contexte externe en 0.1.6

Sur un objet de données externe, le champ facultatif `contexte: { nom: "Chrome" }` exprime l’environnement auquel appartient cet objet. Le renderer consomme le nom du contexte et inscrit le dossier dans un cadre étiqueté. Les autres propriétés éventuelles du contexte restent soumises à la lecture partielle.

Le type, le rôle, les formats, le statut et l’intégrité déterminent la représentation. Les noms humains identifient les objets et restent disponibles aux technologies d’assistance. Le nombre et le sens des flèches proviennent exclusivement des relations déclarées, indépendamment du nombre de formes imbriquées ou de formats affichés.


## TG-009b — séparation objet / relation / contexte / placement (0.1.7)

Le contrat distingue désormais quatre responsabilités :

- **objet** : sa nature intrinsèque et ses propriétés ;
- **contexte** : l'environnement structurel qui contient un ou plusieurs objets ;
- **relation** : la source et la destination, donc le sens de l'échange ;
- **renderer** : la position graphique choisie pour équilibrer la vue.

Un objet externe ne porte plus `role = source` ou `role = destination` pour guider le rendu. Ces notions sont déjà exprimées par les relations.

Un contexte devient un objet structurel déclaré, de `type = contexte`, avec une liste `contient` de références à des objets déclarés. Cette inclusion ne crée aucune relation.

Le placement ne dérive plus du sens des flux, sauf dans le cas particulier d'une seule unité externe. De 2 à 6 unités, le renderer alterne gauche/droite selon l'ordre de déclaration, indépendamment des directions. À partir de 7 unités, la stratégie devra aussi employer haut/bas, mais son algorithme n'est pas anticipé avant un cas réel.

Le renderer conserve les relations telles quelles : deux relations opposées entre les mêmes objets restent deux flèches distinctes, quel que soit le côté où l'objet est placé.


## TG-012 — outils pilotés et debug non consommant (0.1.8)

Le modèle distingue désormais :

- un **outil piloté**, techniquement externe mais représenté à l'intérieur de l'application au niveau 1 ;
- une **application externe**, visible comme participant séparé ;
- une couche **DEBUG** appartenant au spécimen / lecteur.

Les outils pilotés restent déclarés comme objets de premier niveau afin de pouvoir participer à des relations, mais `appli.outils_pilotes` contient leurs clés et guide leur regroupement graphique interne.

Le renderer consomme la déclaration de ce groupe et les objets qu'il sait représenter comme outils pilotés. Les relations répétitives entre l'application et ces outils peuvent être retirées du spécimen lorsque l'inclusion suffit à exprimer leur usage.

La couche DEBUG est construite depuis le reste non rendu après le rendu normal. Elle ne supprime, ne modifie et ne consomme rien dans ce reste. La lecture partielle `⚠` doit donc rester strictement identique avec `debug=true` et `debug=false`, à modèle sémantique égal.


## TG-013 — nature intrinsèque et placement externe (0.1.9)

Le renderer ne doit pas encoder l'extériorité dans le type d'un objet.

Ainsi, Visual Studio Code passe de `application_externe` à `editeur`. Sa position hors du bloc principal et la relation `appli -> vscode` suffisent à exprimer son statut de participant externe.

Le type `editeur` devient une famille graphique reconnue, comme `navigateur`.

Le groupe interne des outils pilotés conserve sa sémantique et son accessibilité même si son titre visible est supprimé. La légende reste le lieu où le nom de cette famille est explicitement expliqué.

La couche DEBUG reste non consommatrice ; retirer son titre visible n'affecte ni son contenu ni l'inventaire `⚠`.


## Correctif TG-013 — éditeur conteneur (0.1.10)

`type = editeur` reste une nature intrinsèque. Le correctif ajoute `contenu` comme collection d'éléments internes représentables.

Pour le premier cas réel, chaque élément de `contenu` possède `nom` et `type = projet_info`.

Le renderer consomme le conteneur et ses éléments lorsqu'il sait les représenter. Les éléments `projet_info` ne deviennent ni des objets de premier niveau, ni des unités de placement, ni des extrémités de relation.

Le logo d'une implémentation concrète, tel VS Code, est une identité secondaire du conteneur et ne doit pas remplacer son contenu.

Le navigateur existant n'est pas migré dans ce correctif ; une éventuelle généralisation de la syntaxe de contenu sera décidée sur davantage de cas réels.


## TG-014 — serveur et détail d'implémentation (0.1.11)

Le type `serveur` devient une nature reconnue.

`moteur`, `protocole` et `hote` sont des propriétés intrinsèques du serveur. Elles n'impliquent pas de nouveaux objets ni de nouvelles relations.

La relation `python -> serveur_local` est retirée de Mon Bureau : elle décrit un détail d'implémentation trop fin pour la vue 1. Le renderer ne doit donc pas recréer cette relation à partir de `moteur = python`.

Les seules relations du serveur dans cette vue restent celles explicitement déclarées entre l'application et le serveur.
