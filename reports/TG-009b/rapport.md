# TG-009b — Objets, contextes et placement équilibré

Les cinq spécimens et le lecteur passent au contrat `0.1.7`. Dans Chrome Organizer, `chrome` est déclaré avant `chrome_user_data`, avec `type: "contexte"` et `contient: ["chrome_user_data"]`. Cette inclusion produit le cadre Chrome autour du dossier. Les cinq relations du spécimen gardent leurs extrémités. Les rôles directionnels ont été retirés des objets. Le pointillé du dossier de restauration traduit désormais son statut expérimental.

## Composition sur bureau

Le lecteur résout les références des contextes, puis parcourt les déclarations dans leur ordre initial. Chaque contexte représentable occupe une place avec ses membres. Chaque objet externe représentable resté libre occupe sa propre place. Les flèches et leurs libellés accessibles sont construits pour chaque membre relié à l’application.

| Unité dans l’ordre de déclaration | Côté | Lecture de la flèche sur bureau |
| --- | --- | --- |
| Chrome contenant User Data | Gauche | User Data → application |
| Sauvegardes | Droite | Application → archive, puis application ← archive sur une seconde ligne |
| Exports | Gauche | Fichiers JSON et HTML ← application, une pointe et deux feuilles |
| Copie de restauration | Droite | Application → dossier expérimental |

Pour une unité seule, un flux exclusivement entrant la place à gauche. Un flux sortant la place à droite. La droite sert aussi de repli pour deux sens ou pour une unité sans relation. De deux à six unités, les indices pairs vont à gauche et les impairs à droite. Les colonnes sont centrées verticalement autour de l’application. Chaque flèche est orientée en combinant le côté obtenu et ses propres extrémités.

Au-delà de six unités, l’alternance continue comme repli. Le premier spécimen réel à sept unités ou plus permettra de définir le placement en haut et en bas.

## Recette dans Edge

- À 1448 px, contrôle des positions réelles des quatre objets, des cinq libellés de relation et de l’orientation graphique de chaque pointe. À 390 et 320 px, la pile conserve l’ordre User Data, application, archive, exports, restauration. Les deux flèches de l’archive sont côte à côte. Aucun débordement horizontal.
- Modèles temporaires en mémoire avec une unité entrante, sortante ou reliée dans les deux sens, puis deux à six unités toutes sortantes. Les côtés observés suivent la règle dans chaque cas. Le modèle à sept unités s’affiche également.
- Un contexte temporaire contenant User Data et Exports regroupe les deux objets et garde les cinq flèches. Une référence inconnue ajoutée au contexte déclenche le signal de lecture partielle. Si elle est sa seule référence, le cadre disparaît et les objets déclarés restent visibles.
- Une propriété inconnue ajoutée à Sauvegardes déclenche également le signal. L’archive conserve sa forme et ses qualifications, la valeur inconnue reste hors de la fiche.
- Sur les trois projets, vérification des filtres disponibles, des opacités et de la réinitialisation. Sur Chrome Organizer, Données met en évidence les quatre formes et le cadre Chrome, Flux les cinq flèches et Technologie le socle.
- Navigation depuis l’accueil et la vue introuvable, identités, technologies, données et présentations contrôlées. Mon GPT<3 conserve Collector, le navigateur avec ChatGPT et ses deux relations. Les quatre autres spécimens ont uniquement changé de version. Aucune erreur de console relevée. Les libellés accessibles ont été contrôlés dans le DOM.

[Capture bureau à 1448 px](chrome-organizer-1448.png) · [Mobile à 390 px](chrome-organizer-390.png) · [Mobile à 320 px](chrome-organizer-320.png)
