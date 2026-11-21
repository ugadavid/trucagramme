# TG-010 — Légende contextuelle du lecteur et économie de texte

## Contexte

TG-009c a simplifié le langage graphique de Chrome Organizer :

- le vert est devenu un accent de famille ;
- l'archive ne montre plus la pastille « dossier » ;
- la restauration n'utilise plus le pointillé pour répéter « EXPÉRIMENTAL » ;
- le contexte Chrome possède désormais une identité graphique reconnaissable.

La recette visuelle révèle cependant encore un doublon :

- petit marqueur Chrome ;
- mot « Chrome » écrit juste à côté.

Le principe Trucagramme impose de réduire ce type de répétition lorsque le signe suffit.

En parallèle, le vocabulaire de la vue 1 devient suffisamment riche pour commencer une **légende accessible depuis le lecteur**.

Cette mission ajoute donc :

1. une petite correction d'économie de texte sur le contexte Chrome ;
2. une légende contextuelle du diagramme courant, accessible depuis le menu `trucagramme™`.

Cette mission ne modifie pas le contrat sémantique.

## Version

Conserver partout :

```js
schema_version: "0.1.7"
```

Ne pas créer `0.1.8`.

Aucun champ de `specimen.js` n'est ajouté, supprimé ou renommé.

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-009c/rapport.md`
- `index.html`
- `lecteur/lecteur.js`
- `lecteur/rendu.js`
- `lecteur/interactions.js`
- `lecteur/styles.css`

Préserver la structure, les placements, les relations et les filtres validés par TG-009b / TG-009c.

## Objectif général

Ajouter au lecteur un moyen très léger de répondre à :

> « Que signifient les signes que je vois dans ce Trucagramme ? »

La légende ne doit pas expliquer le projet.

Elle doit expliquer **les signes Trucagramme réellement présents dans le diagramme courant**.

Principe :

> **La légende explique le langage, pas l'application.**

## 1. Chrome : supprimer le doublon logo + mot

Le contexte Chrome conserve dans le modèle :

```js
chrome: {
  nom: "Chrome",
  type: "contexte",
  contient: ["chrome_user_data"]
}
```

Le nom humain reste donc disponible pour :

- accessibilité ;
- modèle ;
- éventuelle légende ;
- diagnostic.

### Rendu attendu

Sur la fiche Chrome Organizer :

- conserver le petit marqueur visuel Chrome ;
- ne plus afficher simultanément le mot `Chrome` à côté du marqueur ;
- conserver un libellé accessible du type `Chrome` ou `Contexte Chrome`.

Le marqueur doit continuer à identifier le contexte sans créer de flux ni représenter un navigateur actif.

Ne pas supprimer `nom: "Chrome"` du spécimen.

## 2. Ajouter « Légende » dans le menu du lecteur

Dans le menu `trucagramme™`, ajouter une commande :

```text
Légende
```

pour les vraies fiches projet.

Le menu d'un projet peut donc contenir :

- les projets ;
- Présentation ;
- Légende.

L'ordre exact entre Présentation et Légende peut suivre la logique la plus naturelle, par exemple :

```text
Présentation
Légende
```

### Accueil / 404

Sur :

- l'accueil ;
- la vue Projet introuvable ;

la légende peut rester cachée puisqu'il n'y a pas de diagramme projet réel à expliquer.

Ne pas créer de fausse légende pour ces vues système.

## 3. Panneau superposé

La légende s'ouvre dans un panneau superposé, comparable au panneau Présentation.

Contraintes :

- aucun reflow du diagramme ;
- fermeture par × ;
- fermeture par clic extérieur ;
- fermeture par Échap ;
- fermeture par nouveau clic sur `Légende` ;
- focus géré correctement ;
- panneau Présentation et panneau Légende mutuellement exclusifs.

Il est acceptable :

- d'ajouter un second panneau dédié ;
- ou de généraliser légèrement le panneau existant si cela reste plus simple.

Ne pas transformer le lecteur en système de fenêtres générique.

## 4. Légende contextuelle

La légende ne doit pas lister toute la grammaire Trucagramme connue.

Elle doit montrer **uniquement les signes réellement présents dans le diagramme courant**.

Exemples :

### Chrome Organizer

La légende peut contenir :

- Application principale ;
- Socle technique ;
- Contexte ;
- Dossier / espace de données ;
- Archive ;
- Fichier ;
- Relation / flux ;
- Propriété.

### Mon GPT<3

Elle peut contenir selon ce qui est réellement présent :

- Application principale ;
- Socle technique ;
- Données ;
- Application compagnon ;
- Navigateur / surface externe ;
- Relation / flux ;
- Propriété.

### Mon Aise

Elle sera plus courte.

Ne pas afficher par exemple « Archive » dans la légende Mon Aise si aucune archive graphique de cette nature n'est présente.

## 5. Génération depuis le rendu, pas depuis les spécimens

Ne pas ajouter :

```js
legende: [...]
```

dans les `specimen.js`.

Ne pas maintenir une légende manuelle par projet.

La légende doit être déduite du diagramme réellement rendu.

Approches acceptables :

- inspection des classes / familles graphiques présentes dans le DOM ;
- petit registre interne au renderer / lecteur alimenté par les formes effectivement utilisées.

Préférer la solution la plus légère.

### Important

Ne pas déterminer la légende à partir des noms humains :

```text
Chrome
Sauvegardes
Exports
...
```

La détection doit dépendre des familles graphiques / types rendus.

## 6. Montrer le signe lui-même

La légende ne doit pas devenir une liste de paragraphes.

Chaque entrée doit comporter :

- une petite représentation visuelle du signe ;
- un libellé court.

Exemples conceptuels :

```text
[mini bloc bleu]       Application principale

[mini cadre violet]    Socle technique

📁                     Dossier / espace de données

[mini archive]         Archive

📄                     Fichier

────→                  Relation / flux

[ petite languette ]   Propriété
```

Les symboles doivent reprendre autant que raisonnable les formes / couleurs du diagramme réel.

Ne pas importer une bibliothèque d'icônes.

Ne pas créer d'illustrations externes.

## 7. Libellés courts

Éviter :

```text
Cet élément représente une donnée externe contenue dans...
```

Préférer :

```text
Contexte
Dossier / espace de données
Archive
Fichier
Relation / flux
Propriété
```

La légende elle-même est là pour réduire le besoin de texte explicatif ailleurs.

## 8. Familles proposées

Le lecteur peut reconnaître au minimum les familles suivantes lorsqu'elles existent dans le DOM :

### Application principale

Présence :

```text
.application
```

Libellé :

```text
Application principale
```

### Socle technique

Présence :

```text
.tech-group
```

Libellé :

```text
Socle technique
```

### Données internes

Présence :

```text
.data-group
```

Libellé :

```text
Données
```

### Contexte

Présence d'un contexte graphique structurel.

Libellé :

```text
Contexte
```

### Dossier / espace de données

Présence :

```text
.forme-dossier
```

Libellé :

```text
Dossier / espace de données
```

### Archive

Présence :

```text
.forme-archive
```

Libellé :

```text
Archive
```

### Fichier

Présence :

```text
.feuille-format
```

Libellé :

```text
Fichier
```

Une seule entrée « Fichier » suffit même si JSON et HTML sont tous deux présents.

### Application compagnon

Présence :

```text
.companion
```

Libellé :

```text
Application compagnon
```

### Navigateur / surface externe

Présence :

```text
.browser
```

Libellé court :

```text
Navigateur / surface externe
```

### Relation / flux

Présence :

```text
.connector
```

Libellé :

```text
Relation / flux
```

### Propriété

Présence d'une pastille / languette structurante :

- `.property`
- `.mini-property`
- `.propriete-externe`
- ou équivalent actuel.

Libellé :

```text
Propriété
```

## 9. Ne pas expliquer les valeurs

La légende n'explique pas :

- `LECTURE SEULE` ;
- `EXPÉRIMENTAL` ;
- `SHA-256` ;
- `local` ;
- `bureau` ;
- `AUTONOME`.

Ces valeurs parlent d'elles-mêmes ou appartiennent au contenu du diagramme.

La légende explique seulement que leur forme graphique est une **propriété**.

Même logique pour JSON / HTML : la légende explique « Fichier », pas « JSON signifie... ».

## 10. Ordre de la légende

Choisir un ordre stable et pédagogique, indépendant de la position des objets dans le diagramme.

Par exemple :

1. Application principale ;
2. Socle technique ;
3. Données ;
4. Contexte ;
5. Dossier ;
6. Archive ;
7. Fichier ;
8. Application compagnon ;
9. Navigateur / surface externe ;
10. Relation / flux ;
11. Propriété.

N'afficher que les entrées présentes.

Ne pas trier alphabétiquement.

## 11. Accessibilité

La commande Légende doit disposer des attributs adaptés :

- `aria-expanded` ;
- `aria-controls`.

Le panneau possède :

- titre « Légende » ;
- bouton fermer avec libellé accessible ;
- structure lisible au clavier.

Les miniatures purement illustratives peuvent être `aria-hidden="true"`.

Le libellé textuel de chaque entrée reste lisible par les technologies d'assistance.

## 12. Responsive

Vérifier :

- 1448 px ;
- 390 px ;
- 320 px.

Le panneau peut conserver une largeur similaire à Présentation.

La liste doit rester compacte et scrollable si nécessaire.

Aucune miniature ne doit imposer de débordement.

## 13. Interaction avec Présentation

Tester :

- ouvrir Présentation ;
- ouvrir Légende ;
- Présentation se ferme ;
- ouvrir Présentation depuis Légende ;
- Légende se ferme ;
- Échap ;
- clic extérieur ;
- ×.

Le focus doit revenir à la commande pertinente lorsque le panneau se ferme.

## 14. Filtres du bas

Ne pas modifier les trois filtres visuels existants :

- Technologie ;
- Données ;
- Flux.

La légende est une fonction du lecteur et ne remplace pas ces filtres.

Ne pas déplacer la légende dans la barre de filtres.

Elle appartient au menu `trucagramme™`.

## 15. Tests ciblés

Effectuer une recette L2 légère.

### Chrome Organizer

Vérifier :

- petit marqueur Chrome visible ;
- mot « Chrome » non répété visuellement ;
- contexte toujours accessible sous le nom Chrome ;
- Légende disponible ;
- entrées attendues uniquement ;
- Archive présente ;
- Fichier présent une seule fois ;
- Dossier présent ;
- Contexte présent ;
- Relation / flux présent ;
- Propriété présente.

### Mon GPT<3

Vérifier une légende différente et contextuelle.

Elle ne doit pas afficher Archive ou Fichier externe si ces signes n'existent pas.

### Mon Aise

Vérifier que la légende est encore plus courte.

### Accueil / 404

Vérifier que la commande Légende est cachée.

### Panneaux

Vérifier toutes les ouvertures / fermetures et l'exclusion mutuelle Présentation / Légende.

### Responsive

- 1448 ;
- 390 ;
- 320.

### Console

Aucune erreur.

## 16. Tests proportionnés

Pas de campagne historique complète.

Cette mission touche uniquement :

- lecteur ;
- styles ;
- petite économie visuelle du contexte Chrome.

Une recette ciblée suffit.

## À ne pas faire

Ne pas :

- passer en schema_version 0.1.8 ;
- ajouter `legende` dans les spécimens ;
- créer une légende globale encyclopédique ;
- expliquer le projet dans la légende ;
- ajouter une documentation longue ;
- afficher des types absents du diagramme courant ;
- ajouter des logos de fichiers ;
- modifier les règles de placement TG-009b ;
- modifier les relations ;
- refaire les filtres ;
- commencer la vue 2 ;
- créer TG-011.

## Livrables

- mot Chrome retiré visuellement lorsque le marqueur d'identité suffit ;
- accessibilité Chrome conservée ;
- commande `Légende` dans le menu projet ;
- panneau superposé ;
- légende contextuelle générée depuis le rendu ;
- miniatures graphiques + libellés courts ;
- Présentation / Légende mutuellement exclusives ;
- accueil / 404 sans commande Légende ;
- schema_version 0.1.7 inchangé ;
- README mis à jour de façon ciblée ;
- `reports/TG-010/rapport.md` ;
- captures utiles, notamment Chrome Organizer avec menu / légende.

Le rapport doit préciser :

1. comment la légende est générée ;
2. quelles familles sont reconnues ;
3. comment elle reste contextuelle ;
4. comment les miniatures réutilisent la grammaire ;
5. comment l'identité Chrome remplace le texte visible sans perdre l'accessibilité ;
6. comportement des panneaux ;
7. non-régression sur les trois projets.

Commit et push sur `main`, vérifier le SHA distant, puis arrêt pour validation humaine.
