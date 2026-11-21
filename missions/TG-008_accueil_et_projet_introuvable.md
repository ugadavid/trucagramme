# TG-008 — Accueil Trucagramme et vue « projet introuvable »

## Contexte

TG-007 a rangé le lecteur et isolé les projets :

```text
index.html
lecteur/
projets/
  index.json
  mon_aise/specimen.js
  mon_gpt/specimen.js
assets/
docs/
missions/
reports/
```

Le lecteur fonctionne correctement, mais il possède encore un fallback silencieux :

- aucune valeur `?projet` → Mon Aise ;
- alias inconnu → Mon Aise.

Ce comportement évite une erreur brute, mais il masque deux états différents du lecteur.

Nous voulons désormais :

1. une **vraie page d'accueil Trucagramme** lorsque aucun projet n'est demandé ;
2. une **vraie vue « projet introuvable »** lorsqu'un alias inconnu est demandé.

Ces deux vues doivent ressembler immédiatement à Trucagramme et utiliser son langage graphique.

La mission ouvre :

```js
schema_version: "0.1.4"
```

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-007/rapport.md`

Examiner :

- `index.html`
- `lecteur/lecteur.js`
- `lecteur/rendu.js`
- `lecteur/interactions.js`
- `lecteur/styles.css`
- `projets/index.json`
- `projets/mon_aise/specimen.js`
- `projets/mon_gpt/specimen.js`

## Objectif général

Ajouter deux **spécimens système** :

```text
projets/accueil/specimen.js
projets/404/specimen.js
```

et trois chemins de rendu explicites dans le lecteur :

```text
rendreAccueil()
rendreSpecimen()
rendreProjetIntrouvable()
```

Les deux nouveaux spécimens fournissent le contenu.

Les deux nouvelles fonctions gèrent leur composition exceptionnelle, leur animation et leur affichage.

## 1. Les spécimens système ne sont pas des projets

Conserver :

```json
[
  "mon_aise",
  "mon_gpt"
]
```

dans `projets/index.json`.

Ne pas ajouter :

```text
accueil
404
```

à cet index.

Ils ne doivent pas apparaître dans le menu de navigation.

Ils sont chargés par convention par le lecteur lorsqu'il en a besoin.

## 2. Ne pas fabriquer de faux `appli`

Les vues système ne décrivent pas une application.

Ne pas créer artificiellement :

```js
appli: {
  nom: "Trucagramme"
}
```

uniquement pour pouvoir appeler `rendreDiagramme()`.

Leur structure peut être très légère et spécifique au lecteur.

### Forme indicative acceptable — accueil

```js
export default {
  schema_version: "0.1.4",
  systeme: {
    type: "accueil",
    titre: "trucagramme™",
    accroche: [
      "Un protocole graphique pour raconter l’architecture technique d’une application.",
      "Plus de sens visuel. Moins de texte."
    ],
    invitation: "Choisissez un projet depuis le menu."
  }
};
```

### Forme indicative acceptable — 404

```js
export default {
  schema_version: "0.1.4",
  systeme: {
    type: "404",
    titre: "Projet introuvable",
    message: "Ce projet n’existe pas dans ce lecteur Trucagramme."
  }
};
```

Cette structure n'est pas imposée au caractère près.

Rester minimal.

Le nom réellement demandé, par exemple `mbolo`, vient de l'URL et peut être injecté par `rendreProjetIntrouvable()`.

## 3. Routage explicite du lecteur

Le lecteur doit distinguer clairement :

### Aucun paramètre projet

```text
https://ugadavid.github.io/trucagramme/
```

→ charger `projets/accueil/specimen.js`

→ appeler :

```js
rendreAccueil(specimenAccueil)
```

### Projet connu

```text
?projet=mon_aise
?projet=mon_gpt
```

→ comportement projet actuel

→ appeler :

```js
rendreSpecimen(specimenProjet)
```

### Projet inconnu

```text
?projet=mbolo
```

→ charger `projets/404/specimen.js`

→ appeler :

```js
rendreProjetIntrouvable(specimen404, "mbolo")
```

Ne plus retomber silencieusement sur le premier alias.

## 4. Menu Trucagramme toujours disponible

Dans les trois états :

- accueil ;
- projet valide ;
- projet introuvable ;

le petit déclencheur `trucagramme™` reste présent.

Le menu continue à proposer uniquement :

- Mon Aise ;
- Mon GPT<3.

Sur l'accueil et le 404 :

- aucun projet n'est marqué comme courant ;
- la commande `Présentation` reste cachée puisqu'il ne s'agit pas d'un projet utilisateur.

Le menu reste la voie naturelle pour rejoindre un projet valide.

## 5. Accueil — une composition qui ressemble à Trucagramme

La page d'accueil ne doit pas ressembler à une landing page web générique.

Elle doit immédiatement utiliser notre langage graphique :

- grand cadre / objet principal ;
- cadre violet évoquant le socle technique ;
- cadre vert évoquant les données ;
- petit objet externe ;
- autre objet / surface externe ;
- flèches ;
- petites propriétés / languettes si utile.

### Important

Il s'agit d'une **composition illustrative** du langage Trucagramme.

Elle ne prétend pas décrire une vraie application.

Ne pas faire croire que Trucagramme lui-même possède réellement ce socle ou ces données.

Le contenu textuel peut rester très court, par exemple :

```text
trucagramme™

Un protocole graphique pour raconter
l’architecture technique d’une application.

Plus de sens visuel. Moins de texte.
```

et une invitation discrète à choisir un projet depuis le menu.

## 6. Animation de construction de l'accueil

L'accueil peut être plus vivant que les fiches projets.

Faire apparaître progressivement les éléments de la composition.

Exemple de séquence possible :

1. titre / bloc principal ;
2. groupe technique violet ;
3. groupe données vert ;
4. objet gauche ;
5. objet droit ;
6. flèches ;
7. accroche finale.

L'ordre exact est libre si le résultat est plus élégant.

### Contraintes

- animation courte : ordre de grandeur 1 à 2 secondes au total ;
- pas d'attente artificielle avant de pouvoir utiliser le menu ;
- transitions simples : opacité, translation légère, éventuellement trait de flèche ;
- aucun framework ;
- aucune dépendance ;
- ne pas utiliser un système d'animation complexe ;
- respecter `prefers-reduced-motion: reduce` : état final immédiat ou quasi immédiat.

L'animation appartient à `rendreAccueil()` et/ou aux styles associés.

Le spécimen d'accueil ne doit pas contenir de durées CSS, coordonnées ou instructions d'animation.

## 7. Vue « projet introuvable »

Pour :

```text
?projet=mbolo
```

afficher clairement :

- que le projet n'existe pas ;
- l'alias demandé `mbolo`.

### Ton

Poli, simple et calme.

Pas de :

- gros rouge agressif ;
- stack trace ;
- message technique ;
- « 404 Not Found » brut façon serveur.

### Identité visuelle

Cette vue doit elle aussi ressembler à Trucagramme.

Utiliser nos codes graphiques pour raconter l'absence.

Exemples possibles :

- une flèche arrivant vers un cadre vide / pointillé ;
- un objet « projet demandé » relié à un emplacement absent ;
- un bloc principal incomplet ;
- un petit symbole d'interrogation intégré à une forme Trucagramme.

Codex peut proposer la composition la plus élégante.

Le menu reste disponible pour repartir vers un vrai projet.

Une animation très légère est acceptable, mais l'accueil reste la vue où l'on peut davantage jouer sur la construction progressive.

## 8. Ne pas utiliser le renderer projet pour les vues système

`rendu.js` reste le renderer technique des projets.

Ne pas lui ajouter :

- accueil ;
- 404 ;
- logique URL ;
- animation de landing page.

Les fonctions :

```text
rendreAccueil()
rendreProjetIntrouvable()
```

appartiennent au lecteur.

Elles peuvent réutiliser :

- les petits helpers DOM existants ;
- les classes CSS ou la palette visuelle existante ;
- les concepts graphiques du protocole.

Mais elles ne doivent pas appeler `rendreDiagramme()` avec un modèle falsifié.

## 9. Passage en schema_version 0.1.4

Passer les quatre spécimens à :

```js
schema_version: "0.1.4"
```

Cela concerne :

- `projets/accueil/specimen.js` ;
- `projets/404/specimen.js` ;
- `projets/mon_aise/specimen.js` ;
- `projets/mon_gpt/specimen.js`.

Conserver sans autre changement la sémantique des deux vrais projets.

Pas de migration.

## 10. README

Mettre à jour `README.md` de façon ciblée :

- la racine ouvre désormais l'accueil Trucagramme ;
- Mon Aise s'ouvre via `?projet=mon_aise` ;
- Mon GPT<3 via `?projet=mon_gpt` ;
- expliquer brièvement l'existence des spécimens système `accueil` et `404`, hors de `projets/index.json`.

## 11. Tests ciblés

### Accueil

Ouvrir :

```text
/
```

Vérifier :

- aucune fiche projet chargée ;
- accueil graphique Trucagramme ;
- animation progressive correcte ;
- menu accessible immédiatement ;
- pas de commande Présentation ;
- aucun projet marqué courant ;
- console propre.

### Accueil sans animation

Simuler / vérifier `prefers-reduced-motion`.

Vérifier :

- contenu immédiatement lisible ;
- aucun élément restant invisible.

### Mon Aise

Ouvrir :

```text
/?projet=mon_aise
```

Vérifier la non-régression TG-007.

### Mon GPT<3

Ouvrir :

```text
/?projet=mon_gpt
```

Vérifier la non-régression TG-007.

### Alias inexistant

Ouvrir :

```text
/?projet=mbolo
```

Vérifier :

- Mon Aise ne s'affiche pas ;
- message Projet introuvable ;
- `mbolo` visible ;
- composition graphique Trucagramme ;
- menu toujours fonctionnel ;
- pas de Présentation ;
- console propre.

### Alias vide

Vérifier la différence entre :

```text
/
```

et éventuellement :

```text
/?projet=
```

Choisir un comportement cohérent et le documenter.

Préférence : une valeur vide peut être traitée comme absence de projet et afficher l'accueil.

### Responsive

Vérifier au minimum :

- 1448 px ;
- 390 px ;
- 320 px.

Les deux vues système doivent rester propres et le menu accessible.

## 12. Tests proportionnés

Cette mission touche surtout le lecteur et ajoute deux vues.

Une recette L1/L2 ciblée suffit :

- les trois états de navigation ;
- animation accueil ;
- reduced motion ;
- menu ;
- non-régression des deux projets ;
- console ;
- bureau + mobile.

Pas besoin de rejouer toutes les variantes historiques de lecture partielle et d'assets si le code technique des projets n'est pas modifié au-delà du passage 0.1.4.

## À ne pas faire

Ne pas :

- créer TG-009 ;
- ajouter accueil ou 404 à `projets/index.json` ;
- créer un faux projet Trucagramme dans le menu ;
- créer un faux `appli` dans les spécimens système ;
- transformer l'accueil en page marketing bavarde ;
- ajouter un carrousel ou une galerie de projets ;
- créer une animation lourde ;
- ajouter GSAP, React ou toute dépendance ;
- modifier la grammaire graphique des projets existants ;
- refondre le lecteur entier ;
- ajouter une fonctionnalité aux projets.

## Livrables

- `projets/accueil/specimen.js` ;
- `projets/404/specimen.js` ;
- `rendreAccueil()` ;
- `rendreProjetIntrouvable()` ;
- routage explicite accueil / projet / introuvable ;
- accueil animé ;
- vue 404 graphique ;
- quatre spécimens en 0.1.4 ;
- README actualisé ;
- `reports/TG-008/rapport.md` ;
- captures utiles accueil, 404 et mobile.

Le rapport doit préciser :

1. structure des deux spécimens système ;
2. séparation entre contenu des spécimens et rendu spécial du lecteur ;
3. logique des trois états URL ;
4. séquence d'animation de l'accueil ;
5. traitement de `prefers-reduced-motion` ;
6. comportement exact d'un alias inconnu ;
7. preuves de non-régression Mon Aise / Mon GPT<3.

Commit et push sur `main`, vérifier le SHA distant, puis arrêt pour validation humaine.
