# TG-005a — Correction du rendu sémantique et des identités

Le contrat reste en **0.1.2** pour les deux spécimens. [L’index](../../index.html) ouvre Mon Aise.

## Pourquoi la quatrième carte apparaissait

TG-005 parcourait les entrées du socle et créait une carte dès que la valeur était un texte non vide. Le rendu consommait alors la clé, y compris `canexistepas`. Cela créait une carte sans rôle défini et empêchait le signal de lecture partielle.

Le [renderer corrigé](../../lecteur/rendu.js) interprète un texte sous trois rôles précis : `runtime`, `langage` et `bibliotheque_graphique`. Le rôle permet de représenter une valeur nouvelle. Une autre clé reste dans la copie de travail et déclenche le signal discret.

Pour les données, le nom de la famille peut être nouveau. Une ligne est créée si au moins une propriété est interprétable : un rôle, un type ou un format textuel, ou la mention `optionnel: true`. Les propriétés supplémentaires restent disponibles pour le calcul du signal. La portée des deux propriétés collectives est conservée.

## Identité locale

La convention retenue est **`assets/<alias>.png`**. Déposer le PNG à cet emplacement suffit. Le renderer ajoute l’image à l’en-tête uniquement après son chargement. L’alias est pris en compte même si la mascotte manque. L’inventaire manuel et son chargement dans la page ont été supprimés.

## Recette dans Edge sous Windows

Les variantes ont été appliquées en mémoire après ouverture du fichier HTML local.

| Essai | Résultat vérifié |
| --- | --- |
| A · `socle_technique.canexistepas` avec la valeur exacte de la recette | Le contenu du diagramme reste identique : Electron, JavaScript / TypeScript et React. Un seul ⚠ apparaît à côté de la version. |
| B · `langage: "rust"` | La carte affiche le texte fourni, `rust`. Le socle compte trois cartes et la lecture est complète. |
| C · `notes: { format: "txt" }` | Une cinquième ligne « Notes TXT » apparaît. Lecture complète. |
| D · `truc_inconnu: { bidule_inconnu: "x" }` | Les quatre lignes initiales subsistent. Seul ⚠ apparaît à côté de la version. |
| E · Champ inconnu ajouté au catalogue et, séparément, à l’application | Dans les deux essais, le diagramme conserve son contenu, dont « Catalogue JSON ». Une seule marque ⚠ signale l’information omise. |
| F · Nom humain de Mon GPT<3 modifié | L’image chargée reste `../assets/mon_gpt.png`. |
| G · Alias `mon_aise` sans PNG | L’en-tête contient le nom et le logo Windows. Aucun emplacement de mascotte ni ⚠. Edge journalise la ressource locale absente. Aucune exception JavaScript ni autre erreur observée. |
| H · Deux spécimens publiés | À 1448, 390 et 320 px, les commandes technologies, données et réinitialisation fonctionnent. Mon GPT<3 conserve aussi le Collector, le navigateur, les deux flux et leur commande. Mon Aise conserve trois technologies, quatre familles et aucun flux. Aucun ⚠ ni débordement horizontal. |

La comparaison RGB sur bureau et mobile donne zéro pixel différent pour les deux spécimens. Les captures de référence restent consultables pour [Mon Aise sur bureau](../TG-005/mon-aise-bureau.png), [Mon Aise sur mobile](../TG-005/mon-aise-mobile.png), [Mon GPT<3 sur bureau](../TG-003/apres-bureau.png) et [Mon GPT<3 sur mobile](../TG-003/apres-mobile.png).
