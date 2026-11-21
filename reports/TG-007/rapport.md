# TG-007 — Rangement du lecteur et des projets

Le point d’entrée est désormais à la racine : [Mon Aise](https://ugadavid.github.io/trucagramme/) et [Mon GPT<3](https://ugadavid.github.io/trucagramme/?projet=mon_gpt). Les deux fiches restent en `schema_version: "0.1.3"`.

| Avant | Après |
| --- | --- |
| Page, scripts et styles dans `protocole_mon_gpt_alpha/` | `index.html` à la racine. Les quatre fichiers de `lecteur/` portent la navigation, le rendu technique, les interactions et les styles. |
| Deux fichiers de spécimen de noms différents, côte à côte | Chaque projet exporte sa description depuis `projets/<alias>/specimen.js`. |
| Noms humains et fichiers inscrits dans le lecteur | [L’index](../../projets/index.json) contient uniquement les alias, dans l’ordre du menu. Le premier donne le projet par défaut. |
| Logos, pictogrammes et doublon de mascotte dans `assets/` | Huit pictogrammes dans `assets/communs/`. Une seule mascotte dans `assets/projets/mon_gpt/mon_gpt.png`. |
| Référence PNG rangée avec le prototype | [Référence graphique historique](../../docs/references/trucagramme-mon-gpt.png). L’ancien dossier a été retiré. |

## Chargement

Le lecteur lit l’index puis importe les modules des deux spécimens par convention de chemin. Chaque lien du menu utilise le nom du spécimen. L’alias demandé dans l’URL est sélectionné s’il figure dans l’index. Sinon le lecteur ouvre le premier projet. Les noms, présentations et autres valeurs sémantiques des deux sources sont conservés à l’identique.

Les fichiers historiques `mon-gtp.png` et `mon_gpt.png` partageaient l’empreinte SHA-256 `5ffdf7f98019cb41d17bc874d615c460ecba2062204e1b6e5401bfcc2d4f670e`. L’unique copie canonique est recherchée par alias. Le serveur Python expose naturellement les répertoires. Sur GitHub Pages, la publication Jekyll déjà active produit les liens des PNG depuis ses fichiers statiques avec [ce gabarit](../../assets/projets/index.md). Déposer la mascotte dans son dossier suffit. L’index des projets reste indépendant de ces images.

## Recette structurelle

Dans Edge sous Windows, le serveur HTTP local a servi la nouvelle racine aux largeurs de 1448, 390 et 320 px.

- **Mon Aise** ouvre par défaut ses trois technologies et ses quatre familles de données. Le menu présente les deux noms des spécimens. Les deux filtres et la réinitialisation fonctionnent. La fiche reste sans mascotte et sans flux.
- **Mon GPT<3** s’ouvre par lien, par URL directe et après rechargement. La mascotte est décodée à son nouvel emplacement. Python, Tkinter / Tk, les trois familles de données, le Collector, ChatGPT et les deux flux sont présents. Les quatre commandes fonctionnent.
- **Navigation et présentation.** L’aller-retour recharge le projet choisi. Les paragraphes correspondent à son spécimen. La commande, la croix, le clic extérieur et Échap ferment le panneau. Les rectangles des objets, groupes et flux restent identiques avant, pendant et après l’ouverture.
- **Lecture partielle.** L’ajout en mémoire de `socle_technique.canexistepas` déclenche la languette. Sa valeur reste absente du diagramme.
- **Fidélité.** Les quatre captures de contrôle ont les mêmes dimensions et les mêmes pixels RGB que les [captures de TG-006](../TG-006/rapport.md) : lecteur fermé, menu ouvert, présentation à 1448 et 320 px. Aucune erreur de console pendant la recette locale.
