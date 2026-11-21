# TG-010 — Légende contextuelle du lecteur

Depuis le menu trucagramme™, Légende ouvre la clé de lecture de la fiche courante. Le lecteur inspecte les familles de formes présentes dans le DOM du diagramme, une fois celui-ci construit. Chaque sélecteur rencontré donne une entrée dans un ordre fixe, indépendamment du nombre d’occurrences et du nom des objets. JSON et HTML donnent ainsi une seule entrée « Fichier ». Le contrat reste en 0.1.7.

| Fiche | Entrées observées dans le panneau |
| --- | --- |
| Chrome Organizer | Application principale, Socle technique, Contexte, Dossier / espace de données, Archive, Fichier, Relation / flux, Propriété |
| Mon GPT<3 | Application principale, Socle technique, Données, Application compagnon, Navigateur / surface externe, Relation / flux, Propriété |
| Mon Aise | Application principale, Socle technique, Données, Propriété |

Les miniatures CSS reprennent les contours et les couleurs du diagramme. L’onglet identifie le dossier, le couvercle et la poignée identifient l’archive, et le coin plié distingue la feuille. Chaque miniature est décorative pour les technologies d’assistance, qui disposent du libellé de l’entrée.

Sur la fiche Chrome Organizer, le disque coloré identifie seul le contexte autour de User Data. Le groupe garde le nom accessible « Chrome » fourni par le spécimen.

## Recette dans Edge

- Contrôle des entrées exactes sur les trois fiches à 1448, 390 et 320 px. L’accueil et la vue « Projet introuvable » conservent leur menu de navigation avec la commande Légende masquée.
- Présentation et Légende partagent un panneau fixe. Le passage de l’une à l’autre actualise son titre, son contenu et les attributs des commandes. Les rectangles mesurés du diagramme, de ses objets, groupes et flèches sont identiques avant et après ouverture.
- À l’ouverture, le focus arrive sur la croix. Après Échap, un clic extérieur, la croix ou un second clic sur Légende, il revient à la commande. Le panneau tient dans la largeur disponible et peut défiler en hauteur.
- Vérification du marqueur Chrome, du nom accessible de son groupe et des cinq flèches. Le filtre Données et sa réinitialisation fonctionnent sur les trois fiches. Aucune erreur console relevée. Les contrôles d’accessibilité portent sur le DOM et le focus dans Edge.

[Menu de Chrome Organizer](chrome-menu.png) · [Légende à 1448 px](chrome-legende-1448.png) · [390 px](chrome-legende-390.png) · [320 px](chrome-legende-320.png)
