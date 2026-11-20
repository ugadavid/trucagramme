# AGENTS.md — Trucagramme

## Avant de travailler

Lire d’abord :

1. `README.md`
2. `docs/GRAMMAIRE_ALPHA.md`
3. la mission demandée dans `missions/`

La mission canonique prévaut sur les idées futures décrites ailleurs.

## Philosophie

Trucagramme est encore un protocole graphique expérimental. Préserver la voie la plus légère.

Ne pas transformer spontanément une petite mission graphique en :
- framework ;
- éditeur graphique ;
- moteur universel ;
- nouveau système de composants ;
- schéma de données complexe ;
- dépendance externe.

La séparation future entre **modèle sémantique** et **rendu** est une direction importante, mais elle ne doit être implémentée que lorsqu’une mission le demande explicitement.

## Référence visuelle actuelle

Pour le spécimen Mon GPT<3 :

- prototype : `protocole_mon_gpt_alpha/index.html`
- styles : `protocole_mon_gpt_alpha/styles.css`
- interaction : `protocole_mon_gpt_alpha/app.js`
- référence validée : `protocole_mon_gpt_alpha/trucagramme-mon-gpt.png`
- assets disponibles : `assets/`

Ne pas remplacer la grammaire visuelle validée par une autre esthétique sans demande explicite.

## Vérifications proportionnées

Pour une petite modification HTML/CSS/JS :

- vérifier les fichiers modifiés et l’absence d’erreur évidente ;
- ouvrir le prototype dans un navigateur ;
- vérifier visuellement la largeur de référence et une largeur plus étroite raisonnable ;
- vérifier les interactions réellement concernées ;
- ne lancer aucune infrastructure de test lourde par réflexe.

Rapporter honnêtement ce qui a été vérifié et ce qui ne l’a pas été.

## Livraison

Pour une mission numérotée :

- travailler uniquement dans son périmètre ;
- produire un rapport sous `reports/<MISSION>/rapport.md` ;
- ajouter les captures utiles dans le même dossier si pertinent ;
- commit et push sur `main` si la mission l’autorise ;
- vérifier le SHA distant ;
- s’arrêter après la livraison et attendre la validation humaine.

Ne jamais enchaîner spontanément la mission suivante.
