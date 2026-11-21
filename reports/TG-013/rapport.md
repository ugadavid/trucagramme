# TG-013 — Premier éditeur et économie visuelle

Les six spécimens et le lecteur passent en 0.1.9. Sur Mon Bureau, `vscode.type` devient `editeur`. La nature de l’objet détermine sa silhouette de fenêtre, avec un bandeau, une marge et deux traits d’édition. Sa position hors du cadre de Mon Bureau exprime son extériorité. La clé `vscode` ajoute l’identité de l’éditeur à cette silhouette via `assets/communs/vscode.png`. L’article conserve le nom accessible « Visual Studio Code ».

## Relation et lecture partielle

L’éditeur rejoint les unités externes existantes. Pour une seule unité, la relation sortante `appli → vscode` place la fenêtre à droite sur bureau. Le lecteur dessine la flèche et consomme ses deux extrémités. La reconnaissance du type et du nom retire également VS Code des objets résiduels. Un essai temporaire avec une autre clé, un autre nom et une relation entrante a produit la même fenêtre avec le nom de l’éditeur et un placement à gauche.

Les cinq cartes DEBUG restantes correspondent aux cinq premières lignes de la bulle. La comparaison ligne à ligne avec DEBUG activé puis désactivé a donné le même inventaire aux trois largeurs :

```text
windows · contexte
shell_windows · service_systeme
processus_windows · service_systeme
tcp_windows · service_systeme
serveur_local · service_local
relations · 8 non représentées
```

## Titres et couleurs

Le groupe des cinq outils conserve son nom accessible « Outils pilotés ». Son cadre et ses tuiles utilisent une teinte framboise avec un fond rose pâle, reprise dans la légende. Le compagnon de Mon GPT<3 garde son orange. Les deux cartouches gris pointillés conservent leurs cartes techniques et le nom accessible « Éléments DEBUG non représentés ». Les titres visibles ont été retirés.

## Recette locale dans Edge

- À 1448 px, contrôle du chargement du PNG, de la position de la flèche entre Mon Bureau et l’éditeur et de l’espace entre la fenêtre et le cartouche voisin. À 390 et 320 px, la flèche descend de Mon Bureau vers la fenêtre, suivie des cartouches. Aucun débordement horizontal.
- Vérification de l’ordre des cinq outils, de leur nom de groupe, du filtre Données et de sa réinitialisation. La légende contient « Éditeur », « Outils pilotés » et « Relation / flux ». La miniature Éditeur reprend la fenêtre générique. Le passage à Présentation reste opérationnel.
- Sur Mon Aise, Mon GPT<3 et Chrome Organizer, contrôle des fiches, des panneaux et du nombre de flèches (0, 2 et 5). Contrôle de l’accueil et de la vue introuvable. Les cinq spécimens autres que Mon Bureau ont uniquement changé de version. Aucune erreur console relevée.

[Bureau avec DEBUG](mon-bureau-debug-1448.png) · [Bureau sans DEBUG](mon-bureau-sans-debug.png) · [Mobile à 390 px](mon-bureau-debug-390.png) · [Mobile à 320 px](mon-bureau-debug-320.png)

## Correctif — Éditeur conteneur et couleur Outils pilotés (0.1.10)

La fenêtre de Visual Studio Code présente désormais deux lignes de projet, Mon GPT<3 puis Trucagramme, dans l’ordre de `vscode.contenu`. Son logo de 19 px se trouve dans le bandeau supérieur, à droite. L’article porte le nom accessible « Visual Studio Code ». Chaque `projet_info` est un élément de liste interne. L’éditeur constitue une seule unité de placement, reçoit l’unique flèche depuis Mon Bureau et fournit une seule entrée « Éditeur » à la légende.

Le groupe Outils pilotés et sa miniature de légende adoptent un contour turquoise et un fond cyan pâle. Les cinq tuiles gardent leur ordre et le groupe son nom accessible. Le lecteur et les six spécimens sont en 0.1.10.

### Recette du correctif

- Dans Edge à 1448, 390 et 320 px, contrôle des deux lignes, du chargement et des dimensions du logo, de la flèche et du placement des cartouches. Les projets restent lisibles en vue étroite, sans débordement horizontal.
- Un autre éditeur temporaire, dépourvu de logo, affiche son nom dans le bandeau et ses deux projets dans la même fenêtre.
- Avec un projet reconnu et un second élément de type inconnu, seul le projet reconnu apparaît. La bulle ajoute le chemin `vscode.contenu` et garde le nom et le type inconnus hors de la vue.
- Avec les deux projets canoniques, tout le contenu de l’éditeur est consommé. Les cinq objets DEBUG et les huit relations restantes donnent exactement le même inventaire avec DEBUG activé ou désactivé.
- Contrôle rapide de Mon Aise, Mon GPT<3, Chrome Organizer, de leurs panneaux, de l’accueil et de la vue introuvable. Aucune erreur console relevée.

[Bureau avec DEBUG](correctif-mon-bureau-debug-1448.png) · [Bureau sans DEBUG](correctif-mon-bureau-sans-debug.png) · [Mobile à 390 px](correctif-mon-bureau-debug-390.png) · [Mobile à 320 px](correctif-mon-bureau-debug-320.png)
