# TG-009a — Formes des données externes

Sur la [fiche Chrome Organizer](https://ugadavid.github.io/trucagramme/?projet=chrome_organizer), le vert indique la famille des données externes et chaque silhouette précise ce que l’application manipule. Les cinq spécimens passent en 0.1.6. Le seul enrichissement des données concerne le dossier désormais nommé « User Data », situé dans le contexte « Chrome ».

| Fait sémantique | Lecture graphique |
| --- | --- |
| Dossier source dans un contexte nommé | Le cadre fin « Chrome » contient le dossier à onglet « User Data ». La pastille « LECTURE SEULE » est à l’intérieur du dossier. Le contexte ne crée ni participant actif ni flux. |
| Archives locales, format dossier, intégrité SHA-256 | Une boîte à couvercle et poignée porte les deux qualifications. Le nom « Sauvegardes » reste le nom accessible de l’objet et apparaît au survol de la boîte. |
| Un objet de fichiers avec deux formats | Une feuille à coin replié par format : JSON et HTML. Le groupe conserve le nom accessible « Exports » et reçoit une seule flèche. |
| Dossier de destination et statut expérimental | Un dossier en pointillé donne la silhouette de la cible préparée. Le nom « Copie de restauration » reste visible et la languette « EXPÉRIMENTAL » en qualifie le bord. |

Les titres visibles « Sauvegardes » et « Exports » ont cédé la place à la boîte et aux feuilles. Les articles conservent un nom accessible via `aria-label`. Les deux relations entre l’application et les sauvegardes ont chacune leur élément de flèche et leur libellé de source et de destination. Les cinq relations du spécimen sont conservées.

## Recette

Essais dans Edge sous Windows aux largeurs de 1448, 390 et 320 px, incluant l’examen des captures. Sur mobile, le cadre Chrome précède l’application. Les deux flèches verticales parallèles conduisent le regard vers la boîte et en sens inverse. Aucun débordement horizontal relevé.

- **Indépendance des noms.** Un essai en mémoire a renommé les quatre objets et leur contexte. L’archive a gardé son couvercle, les fichiers leurs deux feuilles, la source son cadre nommé et la cible son contour discontinu.
- **Lecture partielle.** Le contexte publié est interprété intégralement. L’ajout de `sauvegardes.canexistepas` conserve l’archive, laisse la valeur inconnue hors du diagramme et déclenche ⚠.
- **Filtres.** Les opacités des groupes et des flux ont été contrôlées après chaque transition. Données conserve les quatre objets avec leurs formes et le contexte. Flux conserve les cinq flèches. Technologie conserve Python et Tkinter / Tk. La réinitialisation restitue la vue complète.
- **Régression.** Navigation depuis l’accueil et la vue introuvable. Sur Mon Aise et Mon GPT<3, contrôle des technologies, données, flux, identités, filtres et panneaux de présentation. Les trois présentations s’ouvrent avec leurs quatre paragraphes. Aucune erreur de console pendant la recette. L’accessibilité a été contrôlée sur les libellés du DOM, sans essai avec un lecteur d’écran.

**Captures** · [Bureau](chrome-organizer-1448.png) · [Mobile à 390 px](chrome-organizer-390.png) · [Mobile à 320 px](chrome-organizer-320.png)
