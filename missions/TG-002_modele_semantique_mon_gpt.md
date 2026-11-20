# TG-002 — Modèle sémantique du spécimen Mon GPT<3

## Contexte

TG-001 a validé que le premier spécimen Trucagramme reste compréhensible une fois traduit en HTML/CSS/JS et alimenté avec les vrais assets.

Nous voulons maintenant commencer à séparer plus explicitement :

- **ce qui est dit** : les objets, propriétés, groupes et relations qui constituent le sens du schéma ;
- **ce qui le dit** : couleurs, cadres, positions, tailles, icônes, flèches et autres choix de rendu.

Cette mission est une **étude sémantique**. Elle ne doit produire aucun moteur de rendu ni aucun framework.

## Références obligatoires

Avant toute analyse, lire :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-001/rapport.md`

Puis examiner le spécimen réel :

- `protocole_mon_gpt_alpha/index.html`
- `protocole_mon_gpt_alpha/styles.css`
- `protocole_mon_gpt_alpha/app.js`
- `protocole_mon_gpt_alpha/trucagramme-mon-gpt.png`
- `assets/`

La maquette et le prototype sont des **preuves de sens à extraire**, pas des structures HTML à recopier comme modèle.

## Objectif

Décrire **tout ce que raconte aujourd’hui le spécimen Mon GPT<3 sans faire référence au rendu graphique**.

La description obtenue doit permettre de répondre à la question :

> Si nous supprimions demain tout le HTML/CSS et toute la charte visuelle, quelles informations devraient absolument survivre pour que le même schéma puisse être reconstruit conceptuellement ?

## Travail attendu

### 1. Inventorier le sens

Identifier les éléments sémantiques présents dans le spécimen actuel, par exemple :

- application principale ;
- plateforme ;
- type d’application ;
- technologies structurantes ;
- données ;
- propriétés ;
- application compagnon ;
- navigateur / surface externe ;
- flux ou relations.

Ne pas ajouter d’éléments absents du spécimen actuel.

### 2. Proposer un vocabulaire minimal

Proposer le plus petit ensemble raisonnable de concepts permettant de décrire ce spécimen.

Pour chaque concept proposé, préciser :

- son nom ;
- ce qu’il signifie ;
- un exemple concret dans Mon GPT<3 ;
- ce qui ne lui appartient pas.

Éviter les catégories créées uniquement parce qu’elles facilitent le CSS actuel.

### 3. Décrire Mon GPT<3 sans rendu

Produire une représentation structurée complète du spécimen.

JSON ou YAML sont acceptés pour rendre l’étude lisible, mais :

- le format est **illustratif et non normatif** ;
- aucune validation de schéma n’est demandée ;
- aucune compatibilité future n’est à prévoir ;
- aucune coordonnée, couleur, classe CSS, taille, asset ou position ne doit apparaître.

La représentation doit couvrir au minimum ce que la vue actuelle raconte :

- Mon GPT<3 ;
- application de bureau locale ;
- plateforme Windows ;
- propriété autonome ;
- Python ;
- Tkinter/Tk ;
- catalogue JSON ;
- fichiers d’interface ;
- images personnelles optionnelles ;
- séparation données / binaires ;
- Mon GPT Collector ;
- son caractère d’extension Chrome ;
- le lien avec l’application principale ;
- ChatGPT dans le navigateur ;
- le flux d’ouverture depuis Mon GPT<3.

### 4. Relier sens et vue actuelle

Produire une table de correspondance :

| Information sémantique | Où / comment elle apparaît actuellement | Relève-t-elle du sens ou du rendu ? |
| --- | --- | --- |

Exemples attendus :
- `autonomous` → languette « AUTONOME » → sens ;
- position de la languette en haut à droite → rendu ;
- `windows` → logo Windows → sens ;
- taille du logo → rendu.

Le but est de rendre la frontière testable.

### 5. Identifier les ambiguïtés

Lister séparément les points qui restent ambigus.

Exemples possibles :
- `local` et `bureau` sont-ils des propriétés génériques ou des spécialisations ?
- une plateforme est-elle un objet ou une propriété de l’application ?
- `TechnologyGroup` et `DataGroup` sont-ils de vrais concepts sémantiques ou seulement des regroupements de rendu ?
- l’inclusion de ChatGPT dans un navigateur est-elle une relation sémantique distincte ?
- `Companion` est-il une nature d’application ou un rôle contextuel ?

Ne pas résoudre arbitrairement ces questions si le spécimen ne suffit pas à les trancher.

## Principe de décision

Utiliser ce test :

> **Si nous changeons totalement le rendu demain, cette information doit-elle survivre ?**

- Si oui : elle appartient probablement au **sens**.
- Si non : elle appartient probablement au **rendu**.
- Si la réponse dépend du contexte : documenter l’ambiguïté.

## Livrables

Créer :

- `docs/MODELE_SEMANTIQUE_MON_GPT_ALPHA.md` — étude principale ;
- `reports/TG-002/rapport.md` — synthèse de la mission, méthode, constats, limites et questions ouvertes.

Aucun autre fichier n’est nécessaire sauf justification explicite dans le rapport.

## À ne pas faire

Ne pas :

- modifier le prototype HTML/CSS/JS ;
- modifier la maquette PNG ;
- modifier les assets ;
- créer un moteur de rendu ;
- créer des classes ou composants génériques ;
- créer un parser ;
- créer un JSON Schema ;
- introduire TypeScript, React ou toute dépendance ;
- généraliser à une autre application ;
- définir les niveaux 2 et suivants ;
- figer un format de données définitif ;
- lancer TG-003.

Cette mission est une **étude**, pas une implémentation.

## Vérifications

Vérifier que :

1. toute information structurante visible dans le spécimen actuel est couverte ;
2. aucune propriété de rendu n’a contaminé le modèle sémantique proposé ;
3. les choix certains sont distingués des hypothèses ;
4. les ambiguïtés sont explicitement listées ;
5. le modèle reste compréhensible sans consulter le CSS.

Il n’y a pas de campagne de tests à exécuter pour cette mission documentaire.

## Livraison

Publier les deux documents demandés sur `main`.

Dans le rapport :

- indiquer les fichiers lus ;
- résumer le vocabulaire proposé ;
- signaler les décisions certaines ;
- signaler les ambiguïtés ;
- indiquer clairement qu’aucune implémentation n’a été réalisée.

Commit, push, vérification du SHA distant, puis arrêt pour validation humaine.
