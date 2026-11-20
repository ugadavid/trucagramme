# TG-004 — Relations minimales en 0.1.1

Le [spécimen](../../protocole_mon_gpt_alpha/specimen.js) déclare le rôle du Collector dans `collector.role` et décrit ChatGPT comme le service web contenu dans l’objet `navigateur`. Ses deux relations, `collector → appli` et `appli → navigateur`, portent chacune uniquement `source` et `destination`. Ces quatre références correspondent aux clés des objets déclarés. La version de la fiche reste `alpha-0.0.0.1`.

Le [rendu](../../protocole_mon_gpt_alpha/rendu.js) construit le Collector et le navigateur à partir de leurs déclarations. Il lit le nom du contenu dans le navigateur. Chaque flèche dépend à la fois de la présence de ses deux objets dans la vue et de la relation correspondante dans le modèle. Son libellé accessible donne les extrémités dans l’ordre du flux.

Le contrat courant accepte exclusivement `schema_version: "0.1.1"`. Le passage est direct, sans migration ni couche de compatibilité. La recherche dans les scripts du prototype confirme la suppression des champs `role_pour_mon_gpt`, `direction`, `action` et `via`, ainsi que des anciennes références implicites.

## Recette locale

Le fichier HTML a été ouvert directement dans Edge sous Windows. Les variantes ci-dessous ont été appliquées en mémoire sur des copies indépendantes du modèle.

| Variante | Résultat vérifié |
| --- | --- |
| Spécimen complet aux largeurs de 1448, 1101, 641, 390 et 320 px | Neuf images chargées à chaque largeur. Les commandes technologies, données, flux et réinitialisation donnent les opacités attendues. Les flèches restent verticales en disposition empilée. Aucun débordement horizontal ni erreur de console. |
| Version 0.1.1 et seul nom « Test minimal » | La page affiche le titre et le sujet. Aucun groupe, badge, logo, objet externe, flux ou commande. |
| Suppression du Collector en laissant ses références | Le Collector et la flèche entrante disparaissent. La flèche sortante reste présente. |
| Suppression de la relation Collector → appli | Le Collector reste visible. Seule sa flèche disparaît. |
| Suppression du navigateur en laissant ses références | Le navigateur et la flèche sortante disparaissent. La flèche entrante reste présente. |
| Suppression de la relation appli → navigateur | ChatGPT reste dans le navigateur. Seule la flèche sortante disparaît. |
| Suppression de toutes les relations | Les deux objets externes restent visibles. Les flèches et la commande de mise en évidence des flux disparaissent. |
| Navigateur sans contenu, puis essai indépendant avec une destination implicite `chatgpt` | Le premier essai supprime le cadre vide et sa flèche. Le second ne dessine aucune flèche vers la destination inconnue. |
| Version 0.1, puis essai indépendant en 0.1.1 sans nom principal | Un message indique respectivement la version attendue ou le champ manquant. Aucun diagramme partiel. |

Les captures temporaires ont été comparées pixel par pixel en RGB avec celles de TG-003. Résultat identique sur [bureau, 1448 × 1086](../TG-003/apres-bureau.png), sur [mobile, 390 × 1897](../TG-003/apres-mobile.png) et pour le [modèle minimal, 960 × 540](../TG-003/minimal.png). Les images liées servent donc aussi de références pour cette recette.

## Périmètre

Le rendu traite les deux relations du spécimen Mon GPT<3. Une référence sans objet affichable est ignorée. Les contrôles visuels portent sur Edge sous Windows.
