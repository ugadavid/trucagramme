# TG-007 — Ranger le lecteur, isoler les projets et nettoyer la racine

## Statut

Mission de **réorganisation structurelle uniquement**.

Le contrat reste :

```js
schema_version: "0.1.3"
```

Aucune nouvelle fonctionnalité du lecteur ou du protocole n'est demandée.

## Contexte

TG-006 a fait passer Trucagramme d'un prototype centré sur Mon GPT<3 à un véritable petit lecteur capable d'afficher plusieurs projets.

Le résultat fonctionnel est validé :

- lecteur discret `trucagramme™` ;
- navigation Mon Aise / Mon GPT<3 ;
- panneau `Présentation` superposé ;
- séparation correcte entre lecteur et renderer ;
- deux spécimens en 0.1.3 ;
- GitHub Pages activé.

Le problème est désormais l'organisation du dépôt.

Le dossier historique :

```text
protocole_mon_gpt_alpha/
```

contient maintenant :

- le lecteur ;
- le renderer ;
- les interactions ;
- les styles ;
- deux spécimens ;
- une ancienne référence graphique Mon GPT<3.

Son nom ne correspond plus à sa responsabilité.

Le lecteur contient également aujourd'hui une table explicite :

```js
const projets = new Map([
  ["mon_aise", { nom: "Mon Aise", fichier: "specimen-mon-aise.js" }],
  ["mon_gpt", { nom: "Mon GPT<3", fichier: "specimen.js" }]
]);
```

Cette table duplique des informations déjà présentes dans les spécimens et obligerait le lecteur à connaître de plus en plus de détails à mesure que de nouveaux projets apparaissent.

Enfin, `assets/` mélange actuellement :

- pictogrammes communs du protocole ;
- identité particulière d'un projet ;
- ancien doublon historique `mon-gtp.png` / `mon_gpt.png`.

TG-007 doit ranger tout cela **avant d'ajouter quoi que ce soit d'autre**.

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-006/rapport.md`

Examiner l'arborescence actuelle complète, notamment :

- `protocole_mon_gpt_alpha/`
- `assets/`
- `docs/`
- `missions/`
- `reports/`

## Objectif général

Obtenir une arborescence où les responsabilités se lisent immédiatement :

```text
trucagramme/
│
├─ index.html
│
├─ lecteur/
│  ├─ lecteur.js
│  ├─ rendu.js
│  ├─ interactions.js
│  └─ styles.css
│
├─ projets/
│  ├─ index.json
│  ├─ mon_aise/
│  │  └─ specimen.js
│  └─ mon_gpt/
│     └─ specimen.js
│
├─ assets/
│  ├─ communs/
│  └─ projets/
│     └─ mon_gpt/
│
├─ docs/
├─ missions/
├─ reports/
├─ README.md
└─ AGENTS.md
```

Cette arborescence est une cible de principe. Une adaptation mineure est acceptable si elle simplifie réellement le résultat, mais ne pas réintroduire un dossier fourre-tout.

## 1. Racine GitHub Pages

Déplacer le point d'entrée du lecteur à la racine :

```text
/index.html
```

La nouvelle URL canonique GitHub Pages doit devenir :

```text
https://ugadavid.github.io/trucagramme/
```

et pour Mon GPT<3 :

```text
https://ugadavid.github.io/trucagramme/?projet=mon_gpt
```

Mon Aise reste le projet par défaut.

Le vieux chemin `/protocole_mon_gpt_alpha/` est expérimental et n'a pas besoin d'une couche de compatibilité ou d'un redirect dédié.

Ne pas conserver l'ancien dossier uniquement pour sauver cette URL.

## 2. Dossier `lecteur/`

Ranger les responsabilités applicatives du lecteur dans :

```text
lecteur/
```

### Fichiers attendus

- `lecteur.js` : sélection/chargement du projet, menu, présentation, orchestration ;
- `rendu.js` : renderer technique du diagramme ;
- `interactions.js` : commandes Technologie / Données / Flux / reset, actuellement dans `app.js` ;
- `styles.css` : styles du lecteur et du diagramme.

Le renommage `app.js` → `interactions.js` est souhaité car le rôle du fichier est désormais clair.

Ne pas découper davantage.

En particulier, ne pas créer pour cette mission :

- `utils.js` ;
- `core.js` ;
- `services/` ;
- `components/` ;
- une architecture de framework.

Les quelques helpers actuellement partagés entre lecteur et renderer peuvent rester ainsi tant que le code reste lisible.

## 3. Dossier `projets/`

Chaque projet doit devenir autonome dans son propre dossier :

```text
projets/mon_aise/specimen.js
projets/mon_gpt/specimen.js
```

Les spécimens restent les sources de vérité pour :

- `appli.nom` ;
- `appli.alias` ;
- `projet.presentation` ;
- toutes les données sémantiques.

Le lecteur ne doit plus maintenir une seconde copie des noms `Mon Aise` et `Mon GPT<3`.

## 4. Index minimal des projets

Créer :

```text
projets/index.json
```

avec uniquement la liste ordonnée des alias disponibles :

```json
[
  "mon_aise",
  "mon_gpt"
]
```

Cet index dit seulement :

> quels projets existent et dans quel ordre les proposer.

Il ne doit pas répéter :

- le nom humain ;
- la présentation ;
- le chemin complet du fichier ;
- le schema_version ;
- d'autres métadonnées déjà présentes dans le spécimen.

L'ordre de cette liste peut également définir le projet par défaut : le premier alias est Mon Aise.

## 5. Chargement des spécimens sans duplication

Le lecteur doit pouvoir :

1. charger `projets/index.json` ;
2. charger les spécimens correspondants ;
3. utiliser `appli.nom` du spécimen pour construire le menu ;
4. charger le projet demandé par `?projet=<alias>`.

Il ne doit plus contenir une table du type :

```js
{ nom: "...", fichier: "..." }
```

### Solution légère conseillée

Une solution simple est de transformer chaque `specimen.js` en petit module ES exportant son objet :

```js
export default {
  schema_version: "0.1.3",
  ...
};
```

Le lecteur peut alors utiliser `import()` dynamiquement pour charger plusieurs spécimens sans collision de variable globale.

Cette solution est proposée parce qu'elle fonctionne :

- sous le mini serveur HTTP local ;
- sur GitHub Pages ;
- sans framework ;
- sans parser personnalisé ;
- sans recopier les noms de projet.

Si une solution encore plus simple respecte les mêmes invariants, elle est acceptable.

Ne pas convertir le système en framework de modules complexe.

## 6. Assets

Ranger les assets selon leur portée.

### Communs

Placer les pictogrammes réutilisables du protocole dans :

```text
assets/communs/
```

Cela concerne actuellement les éléments comme :

- Windows ;
- Python ;
- Tk ;
- extension Chrome ;
- JSON ;
- fichiers ;
- images ;
- ChatGPT.

Le renderer continue à gérer le petit registre de correspondance sémantique → asset commun.

### Identités de projets

Placer les identités propres à un projet dans :

```text
assets/projets/<alias>/
```

Pour Mon GPT<3 :

```text
assets/projets/mon_gpt/mon_gpt.png
```

Mon Aise ne possède toujours pas de mascotte publiée.

La recherche d'identité continue à utiliser `appli.alias`.

### Doublon historique

Les fichiers actuels :

```text
assets/mon-gtp.png
assets/mon_gpt.png
```

ont actuellement le même contenu.

Après vérification de leurs empreintes, conserver une seule identité canonique à son nouvel emplacement et supprimer le doublon historique.

## 7. Ancienne référence graphique

Le fichier :

```text
protocole_mon_gpt_alpha/trucagramme-mon-gpt.png
```

est une **référence documentaire historique**, pas un asset runtime du lecteur.

Le déplacer vers un emplacement documentaire clair, par exemple :

```text
docs/references/trucagramme-mon-gpt.png
```

Créer le dossier `docs/references/` uniquement parce qu'il contient réellement cette référence.

Mettre à jour les liens documentaires qui la citent.

## 8. Suppression du dossier historique

À la fin de la mission, si tous ses éléments ont été déplacés et les références corrigées, supprimer :

```text
protocole_mon_gpt_alpha/
```

Il ne doit plus être la racine fonctionnelle du projet.

## 9. README et documentation

Mettre à jour `README.md` pour refléter l'état réel du projet :

- Trucagramme possède désormais un lecteur ;
- deux spécimens réels existent ;
- point d'entrée : `index.html` ;
- organisation `lecteur/`, `projets/`, `assets/` ;
- commande locale simple, par exemple :
  ```powershell
  py -3 -m http.server 8000 --bind 127.0.0.1
  ```
- URL GitHub Pages canonique.

Mettre à jour uniquement les autres documents qui contiennent des chemins devenus faux.

Ne pas réécrire l'histoire des anciennes missions : leurs chemins historiques peuvent rester dans leurs rapports lorsqu'ils décrivent ce qui existait au moment de la mission.

## 10. Aucun changement sémantique

TG-007 est une mission de structure.

Conserver :

```text
schema_version 0.1.3
```

dans les deux spécimens.

Ne pas :

- ajouter de champ au protocole ;
- modifier la présentation fonctionnelle ;
- changer les relations ;
- modifier le vocabulaire du socle ou des données ;
- retoucher le titre ;
- retoucher le panneau Présentation ;
- modifier la grammaire graphique.

## 11. Non-régression attendue

Le résultat utilisateur doit rester celui de TG-006.

### Mon Aise

Vérifier :

- projet par défaut ;
- titre ;
- trois technologies ;
- quatre familles de données ;
- propriétés existantes ;
- lecteur discret ;
- menu ;
- Présentation ;
- filtres Technologie / Données / reset ;
- pas de mascotte ;
- pas de flux inventé.

### Mon GPT<3

Vérifier :

- URL `?projet=mon_gpt` ;
- titre ;
- mascotte ;
- Python + Tkinter/Tk ;
- données ;
- Collector ;
- navigateur ChatGPT ;
- deux flux ;
- Présentation ;
- filtres Technologie / Données / Flux / reset.

### Lecteur

Vérifier :

- menu construit depuis les spécimens, pas depuis des noms recopiés dans `lecteur.js` ;
- navigation aller-retour ;
- les quatre fermetures de Présentation ;
- pas de reflow ;
- état visuel conforme à TG-006.

### Lecture partielle

Le test canonique reste valable :

```js
socle_technique.canexistepas = "ondevraitavoirlapastilledavertissement"
```

Le signal partiel doit toujours fonctionner.

### GitHub Pages

Vérifier les nouvelles URLs :

```text
/
?projet=mon_gpt
```

avec chemins relatifs compatibles avec GitHub Pages et avec le serveur local.

## 12. Tests proportionnés

Cette mission déplace beaucoup de fichiers mais ne change pas le produit.

Faire une recette **L2 structurelle ciblée** :

- contrôle de tous les chemins runtime ;
- chargement des deux projets ;
- assets communs ;
- identité Mon GPT ;
- navigation ;
- Présentation ;
- filtres ;
- console propre ;
- bureau + une largeur mobile représentative.

Il n'est pas nécessaire de rejouer toutes les variantes historiques de TG-003 à TG-005b si les frontières déplacées sont correctement couvertes.

## À ne pas faire

Ne pas :

- créer TG-008 ;
- ajouter un troisième projet ;
- ajouter une fonctionnalité ;
- construire un scanner serveur de répertoires ;
- générer automatiquement `index.json` dans cette mission ;
- ajouter un build ;
- ajouter Node/npm ;
- créer une SPA ou un routeur ;
- créer une architecture de modules sophistiquée ;
- conserver le vieux dossier par peur de casser son URL expérimentale ;
- changer `schema_version`.

## Livrables

- arborescence rangée ;
- point d'entrée racine `index.html` ;
- dossier `lecteur/` ;
- dossier `projets/` et `projets/index.json` ;
- assets rangés par portée ;
- référence historique déplacée ;
- vieux dossier `protocole_mon_gpt_alpha/` supprimé ;
- README actualisé ;
- `reports/TG-007/rapport.md`.

Le rapport doit préciser :

1. arborescence avant / après ;
2. mécanisme retenu pour charger les projets sans recopier leurs noms ;
3. rôle exact de `projets/index.json` ;
4. nettoyage des assets et du doublon `mon-gtp.png` ;
5. nouvelle URL canonique GitHub Pages ;
6. preuves de non-régression Mon Aise / Mon GPT<3 ;
7. éventuelles limites laissées volontairement simples.

Commit et push sur `main`, vérifier le SHA distant, puis arrêt pour validation humaine.
