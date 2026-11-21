# Trucagramme

**Trucagramme** est un protocole graphique expérimental pour raconter l’architecture technique d’une application avec **le plus de sens visuel possible et le moins de texte explicatif possible**.

Le projet est né le 20 novembre 2026 à partir d’un premier cas réel : **Mon GPT<3**.

## État actuel

La racine ouvre l’[accueil Trucagramme](https://ugadavid.github.io/trucagramme/). Le menu **trucagramme™** donne accès aux fiches [Mon Aise](https://ugadavid.github.io/trucagramme/?projet=mon_aise), [Mon GPT<3](https://ugadavid.github.io/trucagramme/?projet=mon_gpt) et [Chrome Organizer](https://ugadavid.github.io/trucagramme/?projet=chrome_organizer), ainsi qu’à leur présentation. Sur chaque fiche, **Légende** montre une miniature et un libellé pour chaque famille de signes présente dans le diagramme.

Le contrat courant est `0.1.7`. Les spécimens système `projets/accueil/specimen.js` et `projets/404/specimen.js` fournissent le contenu de l’accueil et de la vue « Projet introuvable ». L’index `projets/index.json` reste réservé aux projets du menu.

Dans Chrome Organizer, Chrome déclare le dossier User Data dans sa liste `contient`. Le lecteur alterne les unités externes entre gauche et droite dans leur ordre de déclaration (de deux à six unités). Les relations orientent les flèches, y compris les deux flèches opposées des sauvegardes à gauche. Les formes de dossier, d’archive et de fichier traduisent la nature des données externes.

Pour ouvrir le lecteur en local, lancer depuis la racine du dépôt :

```powershell
py -3 -m http.server 8000 --bind 127.0.0.1
```

Puis ouvrir [le lecteur local](http://127.0.0.1:8000/).

## Idée directrice

Trucagramme distingue deux choses :

1. **ce qui est dit** : application, langage, bibliothèque, données, propriétés, compagnons, flux, etc. ;
2. **le disant** : cadre, couleur, icône, emboîtement, regroupement, badge, flèche, position.

Chaque spécimen décrit les faits techniques. Le renderer choisit leur représentation graphique.

## Principes déjà retenus

- Le niveau 1 vise une personne qui comprend raisonnablement l’informatique sans avoir besoin de lire le code.
- Le protocole représente d’abord **ce qui existe et structure réellement l’application**, pas une liste de ce qu’elle n’utilise pas.
- Le texte sert surtout à **nommer ou qualifier** ; ce qui peut être compris graphiquement doit l’être graphiquement.
- La nature d’un objet est portée par son traitement graphique.
- L’emboîtement et le regroupement expriment des relations structurelles.
- Les flèches sont réservées en priorité aux vrais flux ou échanges.
- Les propriétés courtes peuvent être attachées au cadre sous forme de petites languettes ou pastilles.
- Une application compagnon reste un objet opaque dans la fiche d’une autre application ; sa propre architecture appartient à sa propre fiche.
- Un service web peut être représenté à l’intérieur de son navigateur lorsque cela raconte mieux l’usage réel.
- Le vocabulaire graphique doit rester petit, cohérent et réutilisable.

Voir [la grammaire alpha](docs/GRAMMAIRE_ALPHA.md).

## Organisation du dépôt

- `index.html` — point d’entrée du lecteur ;
- `lecteur/` — navigation, rendu technique, interactions et styles ;
- `projets/index.json` — alias disponibles, dans l’ordre du menu ;
- `projets/<alias>/specimen.js` — nom, présentation et description technique du projet ;
- `assets/communs/` — pictogrammes du protocole ;
- `assets/projets/<alias>/` — identité graphique facultative du projet ;
- `docs/` — principes et décisions de conception ;
- `missions/` — briefs canoniques confiés à Codex ;
- `reports/` — rapports et preuves produits après mission ;
- `docs/references/` — [référence graphique historique de Mon GPT<3](docs/references/trucagramme-mon-gpt.png).

## Méthode de travail

- **David** décide du produit, du vocabulaire, de la grammaire et valide humainement les représentations.
- **ChatGPT** aide à formaliser le protocole, prépare les missions et analyse les résultats.
- **Codex** réalise les travaux techniques explicitement confiés, vérifie, documente, publie puis s’arrête.
- **GitHub** constitue la source canonique du projet.

Nous avançons volontairement lentement : une règle visuelle n’est généralisée qu’après avoir été utile sur des cas réels.
