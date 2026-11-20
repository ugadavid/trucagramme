# TG-005b — Correction locale de l'identité et intégration visuelle du signal partiel

## Statut

Correction de TG-005a.

Le contrat reste :

```js
schema_version: "0.1.2"
```

Ne pas créer 0.1.3.

## Contexte

TG-005a a corrigé la dérive sémantique de TG-005 :

- seules les clés techniques reconnues du socle sont représentées ;
- une clé inconnue reste non rendue et déclenche le signal de lecture partielle ;
- les familles de données ne sont plus affichées aveuglément ;
- l'inventaire manuel des identités a été supprimé.

Deux points de recette restent à corriger.

### 1. Erreur console sur identité absente

Le renderer tente aujourd'hui :

```text
assets/<alias>.png
```

dès qu'un alias existe.

Avec Mon Aise :

```js
alias: "mon_aise"
```

mais sans `assets/mon_aise.png`, Edge affiche :

```text
ERR_FILE_NOT_FOUND
```

dans la console.

Ce n'est pas une exception JavaScript, mais nous voulons une recette propre et silencieuse.

En ouverture directe `file://`, le navigateur ne peut pas vérifier silencieusement l'existence d'un fichier local sans tenter de le charger.

La correction retenue reste donc fidèle au principe permissif :

> **Si une information ne sert pas dans le spécimen courant, elle n'a pas besoin d'exister.**

Dans le contrat actuel, `appli.alias` sert uniquement à résoudre l'identité graphique de l'application.

Donc :

- Mon GPT<3 possède une identité graphique : garder `alias: "mon_gpt"` ;
- Mon Aise n'a pas encore d'identité graphique publiée : supprimer `alias: "mon_aise"` du spécimen courant ;
- sans alias, le renderer ne tente aucune requête d'identité ;
- le jour où `assets/mon_aise.png` existera, l'alias pourra être ajouté.

Ne pas ajouter :

- inventaire manuel ;
- manifest ;
- nouveau champ de présence ;
- serveur local ;
- détection complexe du système de fichiers.

### 2. Signal de lecture partielle trop brut

Le petit `⚠` isolé à droite de la version ne s'intègre pas assez bien à la grammaire graphique.

Nous voulons conserver le même niveau de sobriété, mais utiliser le langage visuel déjà présent dans Trucagramme.

Le signal doit devenir une **petite languette / bulle attachée à la pastille de version**, dans l'esprit de :

- `AUTONOME` ;
- `SÉPARÉ DES BINAIRES`.

L'objectif est visuel : faire comprendre qu'une propriété / un état qualifie la version affichée.

Pas de phrase visible.

Le pictogramme peut rester `⚠` ou être remplacé par un signe plus élégant si cela améliore l'intégration graphique, tant que le sens reste celui de « lecture partielle ».

Conserver une information accessible non visible, par exemple `aria-label="Lecture partielle"`.

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `missions/TG-005a_correction_semantique_identites.md`
- `reports/TG-005a/rapport.md`

Examiner :

- `protocole_mon_gpt_alpha/specimen-mon-aise.js`
- `protocole_mon_gpt_alpha/specimen.js`
- `protocole_mon_gpt_alpha/rendu.js`
- `protocole_mon_gpt_alpha/styles.css`
- `protocole_mon_gpt_alpha/index.html`
- `assets/`

## Travail demandé

### A. Mon Aise

Supprimer l'alias du spécimen Mon Aise tant qu'aucun asset d'identité n'existe.

Le reste du spécimen reste inchangé.

Résultat attendu :

- aucune mascotte ;
- aucune requête `mon_aise.png` ;
- aucune erreur réseau dans la console ;
- aucun `⚠` pour cette seule absence ;
- rendu autrement identique à TG-005a.

### B. Mon GPT<3

Conserver :

```js
alias: "mon_gpt"
```

et la résolution conventionnelle :

```text
assets/mon_gpt.png
```

Résultat attendu :

- mascotte présente ;
- aucune dépendance à `appli.nom` ;
- changer temporairement le nom humain ne supprime pas la mascotte.

### C. Signal partiel

Reprendre le rendu de la version.

En lecture complète :

```text
alpha-0.0.0.1
```

En lecture partielle, la version doit conserver sa pastille actuelle, avec une petite languette / bulle attachée visuellement à son bord.

Le résultat doit évoquer la même famille graphique que les propriétés attachées aux cadres.

Contraintes :

- discret ;
- compact ;
- pas de texte explicatif visible ;
- pas d'augmentation importante de la hauteur du bandeau ;
- responsive ;
- accessible ;
- pas de dépendance à une librairie externe.

## Tests ciblés

### 1. Mon Aise publié

Ouvrir directement `index.html` en `file://`.

Vérifier :

- aucune requête vers `assets/mon_aise.png` ;
- console sans erreur ;
- trois technologies ;
- quatre familles de données ;
- pas de flux ;
- pas de signal partiel.

### 2. Test canonique de lecture partielle

Ajouter temporairement :

```js
socle_technique.canexistepas = "ondevraitavoirlapastilledavertissement"
```

Vérifier :

- aucune quatrième carte ;
- signal de lecture partielle sous sa nouvelle forme attachée à la version ;
- aucun texte explicatif visible ;
- aucune erreur console.

### 3. Mon GPT<3

Vérifier :

- mascotte chargée depuis `mon_gpt.png` ;
- aucun changement visuel significatif du diagramme ;
- pas de signal partiel sur le spécimen publié ;
- aucune erreur console.

### 4. Responsive

Vérifier au minimum :

- bureau ;
- 390 px ;
- 320 px.

La petite languette de lecture partielle doit rester lisible et ne pas chevaucher le titre.

## À ne pas faire

Ne pas :

- créer TG-006 ;
- passer en 0.1.3 ;
- réintroduire un inventaire d'identités ;
- ajouter un champ `has_image`, `identity_exists` ou équivalent ;
- créer un serveur ;
- ajouter une dépendance ;
- modifier la sémantique des groupes ;
- refondre la version ou le titre au-delà de ce qui est nécessaire au signal ;
- inventer une mascotte Mon Aise.

## Livrables

- spécimen Mon Aise sans alias tant qu'il n'a pas d'identité graphique ;
- renderer / styles adaptés si nécessaire ;
- signal partiel intégré visuellement à la pastille de version ;
- `reports/TG-005b/rapport.md`.

Le rapport doit préciser :

1. pourquoi la requête absente apparaissait sous `file://` ;
2. pourquoi l'alias Mon Aise a été retiré dans le contrat courant ;
3. confirmation qu'aucun inventaire ou champ supplémentaire n'a été ajouté ;
4. choix graphique retenu pour le signal partiel ;
5. résultat de la recette console propre.

Commit et push sur `main`, vérifie le SHA distant, puis arrête-toi pour validation humaine.
