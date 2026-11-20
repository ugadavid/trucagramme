# Direction d’architecture — séparer le sens du rendu

**Statut : direction validée ; première implémentation légère autorisée à partir de TG-003.**

Trucagramme sépare deux responsabilités.

## Ce qui est dit

Une description sémantique de l’application :

- objets ;
- champs structurés ;
- propriétés ;
- groupes ;
- relations ;
- flux.

Cette couche ne connaît ni couleur CSS, ni coordonnées, ni taille de police, ni chemin d’asset.

Le modèle doit rester **descriptif et permissif** : une information absente n’implique jamais son contraire et ne doit pas créer de contenu graphique vide.

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

## Structure provisoire du spécimen Mon GPT<3

Cette structure est un **premier contrat de travail**, pas un format définitif.

```text
schema_version = 0.1

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
    separees_des_binaires = true

    catalogue
      role = catalogue
      format = json

    interface
      type = fichiers_interface

    images_personnelles
      optionnel = true

collector
  type = extension
  hote = chrome
  role_pour_mon_gpt = compagnon

relations
  collector -> mon_gpt
    direction = entrante

  mon_gpt -> chatgpt
    action = ouvrir
    via = navigateur

specimen
  version = alpha-0.0.0.1
```

### Règles de portée

- `appli.type` et `appli.mode_execution` sont des champs structurés, pas des propriétés génériques sans contexte.
- `appli.tourne_sous.os` porte le système d’exploitation.
- `appli.livraison = autonome` signifie ici que le package livré contient ce dont l’application a besoin.
- le socle technique peut distinguer les rôles sémantiques même si le niveau 1 les affiche dans un même cadre ;
- `donnees.separees_des_binaires` qualifie l’ensemble des données concernées ;
- `images_personnelles.optionnel = true` ne dit rien sur le caractère obligatoire ou non des autres données ;
- `compagnon` est provisoirement un rôle contextuel ;
- la relation Collector → Mon GPT<3 reste volontairement sans verbe tant que le spécimen n’en donne pas un ;
- la relation Mon GPT<3 → ChatGPT connaît l’action `ouvrir` et le contexte `navigateur`.

## Versionnement

`schema_version` versionne la structure sémantique.

Il est distinct de :

- `appli.version`, si un jour la version du logiciel décrit mérite d’être renseignée ;
- `specimen.version`, qui versionne la fiche ou le prototype Trucagramme.

## Optionalité

Principe :

> **Une information n’existe dans le modèle que si elle mérite d’être exprimée.**

Le rendu doit donc être capable d’ignorer proprement toute section absente.

Aucune valeur par défaut ne doit inventer du sens. En particulier, l’absence d’un booléen ou d’une propriété ne doit jamais être interprétée automatiquement comme `false`, `obligatoire`, `non autonome`, etc.

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
