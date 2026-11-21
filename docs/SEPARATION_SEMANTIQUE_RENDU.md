# Direction d’architecture — séparer le sens du rendu

**Statut : direction validée ; première implémentation réalisée en TG-003 ; contrat courant : `schema_version 0.1.3`.**

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
windows          -> assets/windows.png
python           -> assets/python.png
tkinter-tk       -> assets/Tk.png
chrome-extension -> assets/ExtensionChrome.png
json             -> assets/json.png
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
