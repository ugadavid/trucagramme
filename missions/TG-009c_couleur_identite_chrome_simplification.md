# TG-009c — Couleur de famille, identité Chrome et simplification visuelle

## Contexte

TG-009b a stabilisé la structure de la vue 1 pour Chrome Organizer :

- objets intrinsèques ;
- contexte Chrome contenant User Data ;
- relations porteuses de la direction ;
- placement équilibré par ordre de déclaration.

La composition est maintenant propre, mais plusieurs détails visuels continuent à surcharger ou uniformiser le dessin :

- toutes les données restent encore très vertes ;
- le contexte Chrome est surtout identifié par le mot « Chrome » ;
- l'archive affiche une pastille « dossier » peu utile ;
- la copie de restauration est à la fois pointillée et marquée « EXPÉRIMENTAL ».

Cette mission affine uniquement **le langage graphique**.

Elle ne modifie pas le contrat sémantique.

## Version

Conserver :

```js
schema_version: "0.1.7"
```

dans tous les spécimens.

Ne pas créer `0.1.8`.

Aucun champ du modèle n'est ajouté, supprimé ou renommé.

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-009b/rapport.md`
- `projets/chrome_organizer/specimen.js`
- `lecteur/rendu.js`
- `lecteur/styles.css`

Préserver toutes les décisions de TG-009b sur les contextes, l'ordre des unités, le placement et les relations.

## Objectif général

Réduire encore la quantité de texte et d'effets redondants.

Principe :

> **La couleur classe ; la forme explique.**

Le vert reste le repère de la famille « données », mais il ne doit plus donner l'impression que tous les objets externes sont faits du même matériau.

## 1. Alléger le vert

Les objets externes peuvent continuer à partager :

- une teinte de contour ;
- une petite surface ;
- une qualification ;
- un détail graphique vert.

Mais éviter de remplir largement chaque objet avec du vert.

Chercher un rendu plus neutre :

- fonds blancs ou très légèrement teintés ;
- contours verts ;
- détails verts ;
- ombres discrètes.

Le dossier, l'archive et les fichiers doivent être distingués d'abord par leur **forme**, pas par une masse de couleur.

Ne pas changer la palette globale des autres familles.

## 2. Contexte Chrome : identité visuelle plus immédiate

Le contexte :

```js
chrome: {
  nom: "Chrome",
  type: "contexte",
  contient: ["chrome_user_data"]
}
```

reste inchangé.

Le renderer doit lui donner une identité graphique plus immédiate.

### Attendu

Ajouter un petit marqueur inspiré de Chrome :

- rouge ;
- jaune ;
- vert ;
- centre bleu.

Il peut être construit en CSS, par exemple avec un cercle / conic-gradient, afin de ne pas ajouter de dépendance ni d'asset externe.

Le marqueur doit être :

- discret ;
- placé dans ou près de l'en-tête du contexte, par exemple en haut à droite ;
- immédiatement reconnaissable comme identité Chrome ;
- secondaire par rapport au contenu User Data.

Le mot « Chrome » peut rester présent mais plus discret.

Ne pas transformer le contexte en représentation d'un navigateur actif.

Aucun nouveau flux.

## 3. User Data

Conserver :

- forme dossier ;
- libellé `User Data` ;
- languette `LECTURE SEULE`.

Alléger son remplissage vert selon la nouvelle règle de famille.

Ne pas ajouter de texte explicatif.

## 4. Sauvegardes : retirer le mot « dossier » du rendu

Le modèle reste :

```js
sauvegardes: {
  nom: "Sauvegardes",
  type: "archives_locales",
  format: "dossier",
  integrite: "sha256"
}
```

Le renderer doit continuer à **consommer** :

```js
format: "dossier"
```

sans déclencher `⚠`.

Mais ne plus afficher la pastille :

```text
dossier
```

dans la vue 1.

### Pourquoi

La forme d'archive raconte déjà la nature principale de l'objet.

Le fait technique que cette archive soit matériellement un dossier peut rester connu du modèle sans encombrer la vue.

Conserver :

```text
SHA-256
```

qui apporte une qualification structurante réelle.

Conserver les deux relations distinctes et leurs deux flèches.

## 5. Exports JSON / HTML

Ne presque rien changer.

Conserver :

- deux feuilles simples ;
- `JSON` ;
- `HTML`.

Ne pas ajouter :

- logos JSON ;
- logos HTML ;
- couleurs de marques ;
- texte « Exports » visible ;
- explication supplémentaire.

Les formes actuelles sont suffisamment courtes et lisibles.

Alléger seulement la dominante verte si nécessaire pour rester cohérent avec la nouvelle règle de couleur.

## 6. Copie de restauration : supprimer le pointillé

Le modèle reste :

```js
restauration: {
  nom: "Copie de restauration",
  type: "dossier_donnees",
  statut: "experimental"
}
```

Le statut `experimental` est déjà rendu par :

```text
EXPÉRIMENTAL
```

Cette languette doit devenir **l'unique expression graphique du statut expérimental**.

### Donc

- conserver une silhouette normale de dossier ;
- supprimer le contour pointillé ;
- supprimer toute logique CSS où le pointillé dépend de `statut = experimental` ;
- conserver la languette `EXPÉRIMENTAL`.

### Pourquoi

Un contour pointillé est ambigu : il peut évoquer absent, futur, virtuel, optionnel ou provisoire.

Une propriété ne doit pas être exprimée deux fois sans nécessité.

## 7. Pas de changement sémantique caché

Ne pas modifier le spécimen Chrome Organizer uniquement pour simplifier le CSS.

Conserver exactement les mêmes informations sémantiques.

En particulier :

- `format: "dossier"` reste dans le modèle ;
- `statut: "experimental"` reste dans le modèle ;
- `integrite: "sha256"` reste dans le modèle ;
- contexte et relations restent inchangés.

Cette mission doit démontrer que :

> le renderer peut choisir de ne pas afficher une information reconnue sans perdre sa compréhension sémantique.

## 8. Lecture partielle

Vérifier que les champs reconnus mais volontairement non visibles ne déclenchent pas `⚠`.

Donc :

```js
format: "dossier"
```

sur Sauvegardes reste consommé.

Tester comme précédemment une clé inconnue :

```js
sauvegardes.canexistepas = "x"
```

Résultat :

- archive toujours visible ;
- pas de valeur inconnue affichée ;
- `⚠`.

## 9. Filtres

Conserver :

- Technologie ;
- Données ;
- Flux ;
- reset.

Le filtre Données doit continuer à mettre en évidence :

- Chrome / User Data ;
- Sauvegardes ;
- JSON / HTML ;
- restauration.

La nouvelle identité Chrome doit suivre logiquement la mise en évidence du contexte de données.

## 10. Placement

Ne toucher à aucune règle TG-009b :

- ordre de déclaration ;
- 1 unité : sens unique ;
- 2 à 6 : alternance gauche / droite ;
- 7+ non stabilisé.

Le résultat Chrome Organizer actuel doit conserver la composition validée par l'utilisateur :

- Chrome / User Data à gauche ;
- Sauvegardes à gauche selon l'ordre actuellement choisi dans le specimen utilisateur local / version canonique à respecter ;
- JSON / HTML et restauration selon l'ordre canonique réellement publié.

Important : ne pas réordonner les blocs pour des raisons esthétiques.

## 11. Responsive

Vérifier :

- 1448 px ;
- 390 px ;
- 320 px.

L'identité Chrome doit rester propre sur mobile.

Le marqueur Chrome ne doit jamais masquer le nom du contexte ou User Data.

## 12. Non-régression

Contrôle rapide :

- Mon Aise ;
- Mon GPT<3 ;
- accueil ;
- 404.

Ne pas leur appliquer arbitrairement les nouvelles formes Chrome.

La règle « vert = accent de famille » peut être appliquée aux objets externes concernés sans refondre les groupes de données internes déjà validés.

## 13. Tests proportionnés

Mission principalement visuelle : L1/L2 ciblé.

Vérifier :

- Chrome Organizer bureau/mobile ;
- absence de la pastille « dossier » ;
- présence de SHA-256 ;
- dossier restauration non pointillé ;
- présence de EXPÉRIMENTAL ;
- identité Chrome visible ;
- champs reconnus entièrement consommés ;
- clé inconnue -> `⚠` ;
- filtres ;
- console propre ;
- non-régression rapide.

## À ne pas faire

Ne pas :

- créer TG-010 ;
- passer en schema_version 0.1.8 ;
- modifier l'ordre des unités ;
- changer les relations ;
- ajouter de nouveaux objets ;
- ajouter un asset externe Chrome si un marqueur CSS simple suffit ;
- ajouter des logos JSON / HTML ;
- ajouter une légende ;
- remettre le mot « Exports » visible ;
- supprimer `format: "dossier"` du modèle ;
- supprimer `statut: "experimental"` du modèle ;
- utiliser le pointillé pour exprimer `experimental` ;
- refondre Mon Aise ou Mon GPT<3.

## Livrables

- renderer et styles affinés ;
- identité visuelle Chrome ;
- vert utilisé comme accent plutôt que remplissage uniforme ;
- « dossier » masqué visuellement sur l'archive mais toujours consommé ;
- SHA-256 conservé ;
- JSON / HTML conservés ;
- restauration non pointillée ;
- EXPÉRIMENTAL conservé ;
- `schema_version 0.1.7` inchangé ;
- `reports/TG-009c/rapport.md` ;
- captures bureau/mobile utiles.

Le rapport doit préciser :

1. comment la couleur de famille a été allégée ;
2. comment l'identité Chrome est rendue ;
3. pourquoi `format: dossier` reste dans le modèle mais n'est plus visible ;
4. comment le statut expérimental est désormais rendu une seule fois ;
5. preuve que les champs reconnus restent consommés ;
6. résultats de non-régression.

Commit et push sur `main`, vérifier le SHA distant, puis arrêt pour validation humaine.
