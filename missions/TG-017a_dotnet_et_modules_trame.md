# TG-017a — Correctif .NET et respiration des modules TRAME

## Contexte

TG-017 est validée visuellement dans son principe : la passe d’économie de texte améliore fortement la fiche TRAME.

Deux petits défauts restent visibles sur la recette GitHub Pages :

1. le logo **.NET** ne se charge pas sur la page publiée alors qu’il était présent dans la recette locale TG-017 ;
2. les trois modules produit sont actuellement disposés sur une seule ligne, ce qui provoque déjà un débordement du libellé **Personnages** et ne prépare pas correctement l’arrivée de nombreux modules.

Cette mission est un **correctif cosmétique minuscule** de TG-017.

Le contrat reste :

```js
schema_version: "0.1.14"
```

Aucune grammaire, aucune sémantique et aucun specimen ne doivent être modifiés.

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `missions/TG-017_economie_visuelle_et_logos.md`
- `reports/TG-017/rapport.md`
- `lecteur/rendu.js`
- `lecteur/styles.css`
- `projets/trame/specimen.js`
- le contenu réel de `assets/communs/`

## 1. Renommer l’asset .NET

Renommer :

```text
assets/communs/.net.png
```

en :

```text
assets/communs/dot_net.png
```

Mettre à jour la référence correspondante dans le registre de logos.

Ne changer ni :

- la clé sémantique `.net` ;
- le nom humain `.NET` ;
- le `alt` `.NET` ;
- la valeur du specimen TRAME.

Le renommage concerne uniquement le **fichier physique** et sa référence graphique.

### Vérification

Vérifier que :

- le fichier renommé existe ;
- aucune référence à `.net.png` ne subsiste ;
- le logo .NET se charge dans TRAME ;
- l’entrée .NET de la table Logos reste correcte ;
- aucun autre logo n’est affecté.

Le problème observé concerne la page publiée GitHub Pages ; vérifier le rendu publié si l’environnement le permet. À défaut, signaler explicitement la limite après avoir vérifié le serveur local et le chemin final.

## 2. Modules produit : deux cartes par ligne

Le renderer affiche actuellement les modules produit avec trois colonnes.

Passer la grille des modules à :

> **deux modules maximum par ligne sur bureau.**

Avec les trois modules actuels, le résultat attendu est donc :

```text
Personnages   Lieux
Correcteur
```

Le troisième module peut occuper une seule cellule ; ne pas l’étirer artificiellement sur toute la largeur uniquement pour remplir la ligne.

Le but est double :

- donner davantage d’air aux libellés actuels, notamment `Personnages` ;
- faire en sorte que les futurs modules se répartissent naturellement par paires au lieu de comprimer toujours davantage une ligne unique.

Ne pas coder le nombre actuel de modules en dur. La règle doit fonctionner naturellement avec 1, 2, 3, 4, 5… modules.

### Responsive

Conserver le comportement mobile actuel :

- une carte par ligne à la largeur mobile déjà prévue ;
- aucun débordement horizontal.

## 3. Ne rien changer d’autre

Ne pas profiter de ce correctif pour modifier :

- les tailles générales du bloc TRAME ;
- les trois implémentations ;
- Super ;
- les données ;
- les couleurs ;
- les espacements des autres groupes ;
- les libellés ;
- la table Logos ;
- la Légende ;
- le menu ;
- le specimen TRAME ;
- les autres projets ;
- la grammaire ;
- le README, sauf nécessité factuelle directe liée au renommage de l’asset.

## 4. Tests proportionnés

Recette **L0/L1 très ciblée**.

### Statique

Vérifier :

- syntaxe des fichiers modifiés ;
- `schema_version 0.1.14` inchangée ;
- aucun diff dans `projets/trame/specimen.js` ;
- aucune référence résiduelle à `.net.png` ;
- `dot_net.png` présent ;
- aucune autre modification hors périmètre.

### Visuel

Ouvrir uniquement TRAME :

- bureau autour de 1448 px ;
- mobile autour de 390 px.

Vérifier :

- logo .NET visible ;
- entrée .NET dans Logos ;
- deux modules maximum par ligne sur bureau ;
- `Personnages` ne déborde plus ;
- une carte par ligne sur mobile ;
- aucun débordement horizontal ;
- aucune erreur console / aucun asset 404.

Pas de nouvelle campagne sur Mon Aise, Mon GPT<3, Chrome Organizer ou Mon Bureau : ils ne sont pas concernés.

## 5. Rapport et livraison

Créer :

```text
reports/TG-017a/rapport.md
```

Une capture bureau de TRAME suffit si elle montre clairement :

- le logo .NET réparé ;
- la grille deux modules par ligne.

Ajouter une capture mobile uniquement si le changement responsive nécessite une preuve particulière.

Le rapport doit préciser :

1. renommage `.net.png` → `dot_net.png` ;
2. références mises à jour ;
3. résultat du chargement .NET ;
4. règle de grille à deux colonnes ;
5. résultat bureau / mobile ;
6. contrôles non exécutés parce que hors périmètre.

Commit et push sur `main` avec l’identité agent configurée, vérifier le SHA distant, puis **s’arrêter pour validation humaine**.

## À ne pas faire

Ne pas :

- passer à `0.1.15` ;
- modifier la grammaire ;
- modifier un specimen ;
- ajouter ou retirer un module ;
- modifier le texte `Personnages` ;
- modifier les autres fiches ;
- retoucher TG-017 au-delà de ces deux corrections ;
- créer TG-018.
