# TG-009 — Troisième spécimen réel : Chrome Organizer et objets de données externes

## Contexte

Trucagramme a maintenant éprouvé sa vue de niveau 1 sur :

- Mon GPT<3 ;
- Mon Aise.

Un troisième spécimen réel existe déjà dans :

```text
projets/chrome_organizer/specimen.js
```

Il a été construit à partir du Chrome Organizer actuel et introduit plusieurs cas nouveaux :

- une source externe de données ;
- des sauvegardes locales ;
- des exports ;
- une copie de restauration fonctionnelle expérimentale ;
- deux relations opposées entre l'application et les sauvegardes.

Cette mission doit **brancher Chrome Organizer dans le lecteur et étendre le renderer uniquement autant que nécessaire pour ce cas réel**.

Le contrat courant devient :

```js
schema_version: "0.1.5"
```

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-008/rapport.md`
- `projets/chrome_organizer/specimen.js`

Examiner également :

- `lecteur/lecteur.js`
- `lecteur/rendu.js`
- `lecteur/interactions.js`
- `lecteur/styles.css`
- `projets/index.json`
- les spécimens Mon Aise et Mon GPT<3.

## Objectif général

Faire apparaître Chrome Organizer comme troisième vrai projet du lecteur et rendre son niveau 1 de manière cohérente avec la grammaire existante.

Le résultat doit permettre de comprendre rapidement :

- Chrome Organizer est une application locale Windows de bureau ;
- son socle est Python + Tkinter/Tk ;
- elle lit le dossier Chrome User Data ;
- elle crée et relit des sauvegardes ;
- elle produit des exports JSON / HTML ;
- elle peut préparer une copie de restauration expérimentale ;
- le dossier Chrome User Data est utilisé en lecture seule.

## 1. Ajouter Chrome Organizer au lecteur

Mettre `chrome_organizer` dans :

```text
projets/index.json
```

après les deux projets existants.

Le menu doit donc proposer :

- Mon Aise ;
- Mon GPT<3 ;
- Chrome Organizer.

Le nom humain vient toujours du spécimen.

Ne pas ajouter de duplication dans `lecteur.js`.

## 2. Passage en schema_version 0.1.5

Passer à `0.1.5` :

- `projets/accueil/specimen.js` ;
- `projets/404/specimen.js` ;
- `projets/mon_aise/specimen.js` ;
- `projets/mon_gpt/specimen.js` ;
- `projets/chrome_organizer/specimen.js`.

Le lecteur attend `0.1.5`.

Ne modifier aucune autre information sémantique des quatre spécimens déjà validés.

Pas de migration.

## 3. Spécimen Chrome Organizer à conserver

Le spécimen Chrome Organizer porte actuellement :

```js
chrome_user_data: {
  nom: "Chrome User Data",
  type: "dossier_donnees",
  role: "source",
  lecture_seule: true
},

sauvegardes: {
  nom: "Sauvegardes",
  type: "archives_locales",
  format: "dossier",
  integrite: "sha256"
},

exports: {
  nom: "Exports",
  type: "fichiers",
  formats: ["json", "html"]
},

restauration: {
  nom: "Copie de restauration",
  type: "dossier_donnees",
  role: "destination",
  statut: "experimental"
}
```

et les relations :

```js
[
  { source: "chrome_user_data", destination: "appli" },
  { source: "appli", destination: "sauvegardes" },
  { source: "sauvegardes", destination: "appli" },
  { source: "appli", destination: "exports" },
  { source: "appli", destination: "restauration" }
]
```

Ne pas remplacer cette structure par une autre uniquement pour simplifier le renderer.

## 4. Nouvel objet graphique : données externes

Le renderer doit pouvoir représenter un objet externe de données séparé du groupe `appli.donnees`.

Types à reconnaître pour ce spécimen :

```text
dossier_donnees
archives_locales
fichiers
```

Ces types peuvent partager une même famille visuelle « données externes ».

### Style attendu

Rester dans le vocabulaire Trucagramme :

- cadre arrondi ;
- famille visuelle liée aux données, probablement autour du vert déjà utilisé ;
- nom clairement visible ;
- propriétés courtes sous forme de pastilles / languettes ;
- application principale toujours dominante.

Il doit rester évident qu'il s'agit d'objets **hors de l'application**, contrairement au groupe de données interne de Mon Aise / Mon GPT<3.

Ne pas créer trois nouvelles familles graphiques différentes uniquement parce que les types sémantiques diffèrent.

## 5. Propriétés reconnues des objets externes

Le renderer peut consommer et représenter les propriétés suivantes.

### `nom`

Titre de l'objet.

### `type`

Détermine sa nature graphique ; pas besoin d'afficher littéralement :

```text
dossier_donnees
archives_locales
fichiers
```

### `role`

`source` ou `destination` peut guider le placement.

Ne pas afficher nécessairement les mots SOURCE / DESTINATION si la relation et la disposition suffisent déjà.

Éviter la redondance.

### `lecture_seule = true`

Afficher une propriété courte du type :

```text
LECTURE SEULE
```

attachée à Chrome User Data.

### `format`

Pour les sauvegardes :

```text
format = dossier
```

Peut être affiché de manière compacte comme qualification de l'objet.

### `formats`

Pour les exports :

```text
formats = ["json", "html"]
```

Afficher sobrement :

```text
JSON · HTML
```

ou équivalent.

### `integrite`

Pour :

```text
integrite = sha256
```

Afficher une qualification compacte :

```text
SHA-256
```

Ne pas expliquer ce qu'est SHA-256 dans la vue 1.

### `statut`

Pour :

```text
statut = experimental
```

Afficher une petite propriété :

```text
EXPÉRIMENTAL
```

attachée à la copie de restauration.

## 6. Mise en page Chrome Organizer

Conserver l'application principale au centre.

Disposition de bureau souhaitée :

```text
Chrome User Data  →  Chrome Organizer  →  Sauvegardes
                                      ←
                                   →     Exports
                                   →     Copie de restauration
```

La disposition exacte doit être plus élégante que cet ASCII.

### Intention

- Chrome User Data : à gauche ;
- Chrome Organizer : bloc central dominant ;
- à droite :
  - Sauvegardes ;
  - Exports ;
  - Copie de restauration ;
  empilés ou organisés proprement.

Ne pas agrandir artificiellement l'application centrale pour remplir toute la largeur.

Les objets externes doivent rester secondaires.

## 7. Cas essentiel : deux relations opposées

Pour :

```js
{ source: "appli", destination: "sauvegardes" }
{ source: "sauvegardes", destination: "appli" }
```

le renderer doit dessiner **deux flèches distinctes**.

Sur bureau, préférer deux flèches parallèles proches l'une de l'autre :

```text
        ---->
Appli          Sauvegardes
        <----
```

ou équivalent visuel.

### Ne pas faire

Ne pas :

- créer `direction: "bidirectionnelle"` ;
- créer une nouvelle relation synthétique ;
- remplacer les deux relations par `↔` ;
- supprimer l'une des deux relations après détection de la paire.

Le modèle reste la vérité : **deux relations = deux flèches**.

Le renderer peut uniquement les rapprocher visuellement.

### Mobile

Lorsque les objets sont empilés verticalement, conserver la distinction des deux relations.

Une solution possible est deux flèches verticales parallèles :

```text
↓   ↑
```

ou une autre disposition claire.

Ne pas transformer la paire en un seul symbole bidirectionnel.

## 8. Relations simples

Les autres relations restent une flèche chacune :

```text
chrome_user_data -> appli
appli -> exports
appli -> restauration
```

Aucun libellé de verbe n'est demandé.

## 9. Filtre « Données »

Les objets externes de données appartiennent à la famille conceptuelle des données.

Le bouton Données doit donc exister pour Chrome Organizer même s'il n'a pas de groupe `appli.donnees`.

Quand il est activé :

- Chrome User Data ;
- Sauvegardes ;
- Exports ;
- Copie de restauration ;

doivent être mis en évidence.

Le filtre Flux doit mettre en évidence toutes les flèches, y compris les deux relations opposées des sauvegardes.

Le filtre Technologie continue à mettre en évidence Python / Tkinter-Tk.

Donc Chrome Organizer doit proposer :

- Technologie ;
- Données ;
- Flux ;
- reset.

Ne pas changer le comportement des filtres sur Mon Aise / Mon GPT<3.

## 10. Lecture partielle

Lorsque toutes les propriétés publiées de Chrome Organizer ci-dessus sont reconnues, le spécimen ne doit pas afficher `⚠`.

Si une propriété inconnue temporaire est ajoutée à un objet externe :

```js
sauvegardes: {
  ...,
  canexistepas: "x"
}
```

le renderer doit :

- conserver l'objet Sauvegardes ;
- ne pas afficher la propriété inconnue ;
- afficher le signal de lecture partielle.

Ne pas afficher aveuglément toute clé.

## 11. Identité graphique

Chrome Organizer possède :

```js
alias: "chrome_organizer"
```

Aucune mascotte n'est nécessaire pour cette mission.

Si aucun asset correspondant n'existe :

- ne rien afficher ;
- aucune erreur console ;
- pas de `⚠`.

Ne pas inventer de logo ou de pictogramme de projet.

Les objets externes peuvent utiliser des formes CSS / glyphes sobres ou les assets communs existants lorsque cela est naturel.

## 12. Présentation

Conserver la présentation courte actuelle du spécimen Chrome Organizer.

Le panneau Présentation doit fonctionner comme pour les deux autres projets.

## 13. Accueil et 404

Les vues système restent fonctionnelles.

Leur structure graphique ne doit pas être refondue dans TG-009.

Le menu de l'accueil et de la vue introuvable doit simplement montrer le troisième vrai projet.

## 14. Non-régression

### Mon Aise

Conserver :

- rendu ;
- filtres ;
- présentation ;
- éventuelle identité ;
- absence de flux externes.

### Mon GPT<3

Conserver :

- Collector ;
- navigateur ChatGPT ;
- deux flux existants ;
- données ;
- technologies ;
- filtres ;
- présentation ;
- mascotte.

### Accueil / 404

Conserver leurs rendus TG-008.

## 15. Tests ciblés

### Chrome Organizer — bureau

Vérifier au minimum :

- titre ;
- Windows / local / bureau ;
- Python / Tkinter-Tk ;
- Chrome User Data à gauche ;
- lecture seule ;
- trois objets externes à droite ;
- formats JSON / HTML ;
- SHA-256 ;
- statut expérimental ;
- cinq relations ;
- deux flèches distinctes entre application et sauvegardes ;
- aucun `⚠`.

### Chrome Organizer — mobile

Vérifier :

- ordre logique ;
- relations lisibles ;
- paire sauvegardes toujours représentée par deux flèches distinctes ;
- aucun débordement horizontal.

### Filtres

Vérifier :

- Technologie ;
- Données ;
- Flux ;
- reset.

### Lecture partielle

Ajouter temporairement une propriété inconnue à `sauvegardes`.

Vérifier :

- Sauvegardes reste visible ;
- propriété inconnue non rendue ;
- `⚠`.

### Navigation

Vérifier aller-retour :

- accueil ;
- Mon Aise ;
- Mon GPT<3 ;
- Chrome Organizer ;
- 404.

### Responsive

Au minimum :

- 1448 px ;
- 390 px ;
- 320 px.

## 16. Tests proportionnés

Cette mission étend le renderer avec une nouvelle famille d'objets et un nouveau cas de relations.

Effectuer une recette L2 ciblée :

- Chrome Organizer bureau/mobile ;
- paire de relations opposées ;
- filtres ;
- lecture partielle ;
- navigation ;
- non-régression rapide des deux anciens projets et des vues système ;
- console propre.

Pas besoin de rejouer toute l'histoire de TG-001 à TG-008.

## À ne pas faire

Ne pas :

- créer TG-010 ;
- ajouter `direction: bidirectionnelle` ;
- créer un objet Chrome vivant ;
- afficher Chrome comme compagnon de l'application ;
- créer un serveur, une API ou un flux réseau fictif ;
- inventer des verbes de relation ;
- créer une famille graphique différente pour chaque type externe ;
- afficher tous les champs inconnus automatiquement ;
- transformer les objets externes en données internes de l'application ;
- modifier le spécimen Chrome Organizer pour satisfaire le renderer ;
- ajouter une dépendance ;
- commencer la vue 2.

## Livrables

- Chrome Organizer ajouté à `projets/index.json` ;
- cinq spécimens en `schema_version 0.1.5` ;
- renderer des objets externes de données ;
- support des deux relations opposées ;
- filtres adaptés ;
- `reports/TG-009/rapport.md` ;
- captures utiles Chrome Organizer bureau et mobile.

Le rapport doit préciser :

1. comment les objets externes ont été distingués des données internes ;
2. quelles propriétés sont consommées et comment ;
3. comment les deux relations sauvegardes sont rendues sans relation synthétique ;
4. comportement bureau / mobile ;
5. comportement des filtres ;
6. test de lecture partielle sur propriété inconnue ;
7. preuves de non-régression.

Commit et push sur `main`, vérifier le SHA distant, puis arrêt pour validation humaine.
