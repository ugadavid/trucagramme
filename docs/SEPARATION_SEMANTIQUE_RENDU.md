# Direction d’architecture — séparer le sens du rendu

**Statut : direction validée ; première implémentation réalisée en TG-003 ; contrat courant : `schema_version 0.1.1`.**

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

## Limite actuelle

Cette structure n’a été éprouvée que sur Mon GPT<3. Elle doit rester petite, révisable et sans migration lourde tant que d’autres applications n’ont pas été utilisées pour la mettre à l’épreuve.
