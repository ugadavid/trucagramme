# TG-003 — Première implémentation de la séparation sens / rendu

## Contexte

TG-002 a permis de distinguer ce que raconte le spécimen Mon GPT<3 de la manière dont il est dessiné.

La recette humaine a ensuite précisé plusieurs décisions :

- champs structurés plutôt que propriétés génériques appauvries ;
- modèle descriptif et permissif ;
- absence d’un champ = aucune information, jamais son contraire ;
- `schema_version` distinct de la version de l’application ou du spécimen ;
- modèle sémantique plus précis que la vue de niveau 1 ;
- la vue peut simplifier sans perdre le sens stocké.

Cette mission autorise la **première implémentation légère** de cette séparation.

Elle doit prouver le principe sur **Mon GPT<3 uniquement**.

## Références obligatoires

Lire avant toute modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `docs/MODELE_SEMANTIQUE_MON_GPT_ALPHA.md`
- `reports/TG-001/rapport.md`
- `reports/TG-002/rapport.md`

Puis examiner le prototype courant :

- `protocole_mon_gpt_alpha/index.html`
- `protocole_mon_gpt_alpha/styles.css`
- `protocole_mon_gpt_alpha/app.js`
- `protocole_mon_gpt_alpha/trucagramme-mon-gpt.png`
- `assets/`

## Objectif

Faire en sorte que le spécimen Mon GPT<3 soit désormais **décrit par des données sémantiques séparées**, puis rendu en HTML/CSS/JS à partir de ces données.

Le résultat visuel doit rester essentiellement celui validé après TG-001.

Le but n’est pas de créer un moteur générique : le but est de prouver que **le contenu sémantique peut être séparé du rendu sans casser le spécimen**.

## Contrat sémantique provisoire

La structure exacte reste expérimentale. Elle peut évoluer sans migration pendant cette phase alpha.

Le modèle doit au minimum pouvoir exprimer les informations suivantes :

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

Une forme JavaScript sérialisable, JSON ou équivalente est acceptable si elle permet de conserver l’ouverture locale simple du prototype.

## Principe d’optionalité

C’est un invariant de TG-003 :

> **Une information absente ne doit rien faire apparaître et ne doit jamais être interprétée comme son contraire.**

Exemples :

- pas de `livraison` → pas de badge AUTONOME ;
- pas de `tourne_sous.os` → pas de logo OS ;
- pas de `images_personnelles` → aucune ligne vide ;
- pas de `optionnel` → ne pas afficher « obligatoire » ;
- pas de `compagnon` → aucun bloc compagnon fantôme ;
- pas de relation → aucune flèche correspondante.

Ne pas introduire de valeurs par défaut qui inventent du sens.

## Minimum obligatoire

Pour cette première implémentation, considérer uniquement comme obligatoires :

- `schema_version` ;
- l’identification du sujet principal, au minimum `appli.nom`.

Si l’un manque ou si `schema_version` est inconnu, afficher ou journaliser une erreur claire plutôt que produire un schéma trompeur.

Ne pas ajouter de validation complète ou de JSON Schema.

## Séparation des responsabilités attendue

L’organisation exacte des fichiers reste à ton appréciation, mais les responsabilités doivent être physiquement discernables :

### 1. Données sémantiques

Un fichier ne contenant que la description du spécimen et aucune logique de rendu.

Il doit porter `schema_version`.

### 2. Rendu

Une logique qui lit le modèle et construit la vue.

Elle décide comment :

- une application devient le bloc principal ;
- une plateforme devient son signe visuel ;
- le socle technique devient le groupe violet actuel ;
- les données deviennent le groupe vert ;
- les propriétés deviennent badges ou languettes ;
- les compagnons et relations deviennent blocs et flux.

### 3. Registre visuel / assets

Les chemins d’assets et choix purement visuels ne doivent pas être stockés dans le modèle sémantique.

Un petit registre explicite est souhaitable si cela reste léger, par exemple :

```text
windows -> ../assets/windows.png
python -> ../assets/python.png
tkinter-tk -> ../assets/Tk.png
chrome-extension -> ../assets/ExtensionChrome.png
json -> ../assets/json.png
```

Pas besoin d’un système de plugins.

### 4. Style

Le CSS reste responsable de la charte, des couleurs, tailles, positions et responsive.

### 5. Interaction

La mise en évidence technologies / données / flux doit continuer à fonctionner sans être mélangée au modèle sémantique.

## Ce que le modèle ne doit pas connaître

Le fichier sémantique ne doit contenir aucune information du type :

- couleur ;
- classe CSS ;
- largeur ou hauteur ;
- coordonnées ;
- ordre de colonnes de mise en page ;
- chemin d’image ;
- marge ;
- rayon de bordure ;
- position d’un badge ;
- orientation d’une flèche.

## Travail attendu

1. Extraire le contenu sémantique actuellement codé en dur dans le HTML.
2. Créer le modèle sémantique séparé avec `schema_version = 0.1`.
3. Faire construire le DOM du spécimen à partir de ce modèle.
4. Conserver le rendu visuel validé après TG-001 aussi fidèlement que raisonnablement possible.
5. Conserver le responsive existant.
6. Conserver les quatre commandes de mise en évidence.
7. Séparer les références d’assets du modèle sémantique.
8. Traiter proprement les champs absents.
9. Ne pas modifier le sens du spécimen.

## Petit test de permissivité

En plus du spécimen complet, vérifier avec une **description temporaire volontairement minimale**, non nécessairement publiée comme second spécimen :

```text
schema_version = 0.1
appli.nom = Test minimal
```

Le résultat doit rester valide et ne montrer que ce qui peut être raisonnablement représenté à partir de ces deux informations :

- pas de sections vides ;
- pas de faux OS ;
- pas de faux socle ;
- pas de fausse autonomie ;
- pas de données inventées ;
- pas de compagnon ou relation fantôme.

Ce test peut être réalisé par instrumentation temporaire ou petite fixture locale si utile. Ne pas construire une infrastructure de tests pour cela.

## À ne pas faire

Ne pas :

- généraliser à une deuxième application ;
- créer un éditeur ;
- créer un moteur universel ;
- créer un JSON Schema ;
- introduire TypeScript, React, Vue ou une dépendance ;
- ajouter un build ;
- concevoir les niveaux 2 et suivants ;
- ajouter une migration de données ;
- inventer des champs pour anticiper des besoins futurs ;
- modifier la grammaire visuelle validée sauf nécessité technique minime et documentée ;
- lancer TG-004.

## Vérifications

Vérifier au minimum :

- ouverture locale simple du prototype, si elle fonctionne actuellement ainsi ;
- rendu du spécimen complet ;
- comparaison visuelle avec le résultat TG-001 ;
- largeur bureau et largeur mobile raisonnable ;
- chargement des assets ;
- fonctionnement technologies / données / flux / réinitialisation ;
- absence d’erreur console ;
- comportement du modèle minimal ;
- absence d’information graphique inventée pour les champs absents.

## Livrables

- modèle sémantique séparé ;
- logique de rendu séparée ;
- registre d’assets léger si retenu ;
- prototype adapté ;
- `reports/TG-003/rapport.md` ;
- captures utiles du spécimen complet et, si pertinent, du cas minimal.

Le rapport doit expliquer clairement :

- la séparation retenue ;
- les fichiers et responsabilités ;
- les seuls champs considérés obligatoires ;
- comment sont traitées les absences ;
- les limites de cette première implémentation ;
- ce qui reste volontairement spécifique au cas Mon GPT<3.

Commit et push sur `main`, vérification du SHA distant, puis arrêt pour validation humaine.
