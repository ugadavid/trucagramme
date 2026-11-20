# TG-004 — Passer le contrat sémantique à schema_version 0.1.1

## Contexte

TG-003 a prouvé que le spécimen Mon GPT<3 pouvait être construit à partir d’une description sémantique séparée du rendu.

La recette humaine de TG-003 a ensuite identifié trois simplifications importantes :

1. `collector.role_pour_mon_gpt` est trop spécifique : `collector.role = compagnon` suffit.
2. Une relation n’a pas besoin d’un champ `direction` lorsque `source` et `destination` sont déjà connus.
3. Les relations ne doivent référencer que des objets réellement déclarés. Le modèle doit donc utiliser `appli`, `collector` et un véritable objet `navigateur`, plutôt que des identifiants implicites comme `mon_gpt` ou `chatgpt`.

Le contrat expérimental passe donc à **`schema_version: "0.1.1"`**.

Aucune migration ni compatibilité descendante avec 0.1 n’est demandée.

## Références obligatoires

Lire avant toute modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-003/rapport.md`

Puis examiner :

- `protocole_mon_gpt_alpha/specimen.js`
- `protocole_mon_gpt_alpha/rendu.js`
- `protocole_mon_gpt_alpha/app.js`
- `protocole_mon_gpt_alpha/styles.css`

## Objectif

Mettre à jour le modèle et le rendu pour utiliser le contrat sémantique **0.1.1**, sans modifier la représentation visuelle validée de Mon GPT<3.

Le schéma complet doit rester visuellement identique à TG-003 autant que possible.

## Contrat 0.1.1 attendu

Le modèle doit prendre cette forme conceptuelle :

```js
const specimen = {
  schema_version: "0.1.1",

  appli: {
    nom: "Mon GPT<3",
    type: "bureau",
    mode_execution: "local",
    tourne_sous: { os: "windows" },
    livraison: "autonome",

    socle_technique: {
      langage: "python",
      bibliotheque_graphique: "tkinter / Tk"
    },

    donnees: {
      locales: true,
      separees_des_binaires: true,
      catalogue: { role: "catalogue", format: "json" },
      interface: { type: "fichiers_interface" },
      images_personnelles: { optionnel: true }
    }
  },

  collector: {
    nom: "Mon GPT Collector",
    type: "extension",
    hote: "chrome",
    role: "compagnon"
  },

  navigateur: {
    type: "navigateur",
    contenu: {
      nom: "ChatGPT",
      type: "service_web"
    }
  },

  relations: [
    { source: "collector", destination: "appli" },
    { source: "appli", destination: "navigateur" }
  ],

  specimen: {
    version: "alpha-0.0.0.1"
  }
};
```

La syntaxe exacte peut varier légèrement si nécessaire pour rester cohérente avec le code existant, mais le sens doit rester celui-ci.

## Décisions à respecter

### 1. `role`

Utiliser :

```js
collector.role = "compagnon"
```

Ne plus encoder le nom de l’application dans la propriété du Collector.

### 2. Relations minimales

Utiliser uniquement :

```js
{ source: "collector", destination: "appli" }
{ source: "appli", destination: "navigateur" }
```

Ne pas conserver :

- `direction`
- `action`
- `via`

dans ces relations.

Le sens de l’orientation est porté par source → destination.

### 3. Références déclarées

Une relation ne doit référencer que des objets réellement présents dans le modèle.

Le rendu ne doit plus dépendre d’identifiants implicites comme :

- `mon_gpt`
- `chatgpt`

### 4. Navigateur comme objet

Le navigateur devient un objet sémantique déclaré :

```js
navigateur: {
  type: "navigateur",
  contenu: {
    nom: "ChatGPT",
    type: "service_web"
  }
}
```

Le rendu peut continuer à représenter ce contenu comme aujourd’hui : ChatGPT dans une fenêtre de navigateur.

Le navigateur n’a pas besoin de porter une action `ouvrir`. Dans cette vue de niveau 1, la relation `appli -> navigateur` et le contenu du navigateur suffisent.

## Versionnement

Le renderer doit accepter **0.1.1** comme version courante.

Aucune compatibilité avec `0.1` n’est nécessaire.

Ne pas écrire de migration, convertisseur ou couche de compatibilité.

Le champ `specimen.version` reste distinct de `schema_version`.

## Optionalité

Conserver toutes les règles validées en TG-003 :

- absence d’un objet → aucun bloc correspondant ;
- absence d’une propriété → aucun contraire inventé ;
- absence d’une relation → aucune flèche ;
- groupe vide → pas de cadre vide ;
- aucune section fantôme.

Le modèle minimal doit continuer à fonctionner avec :

```js
{
  schema_version: "0.1.1",
  appli: { nom: "Test minimal" }
}
```

## Rendu attendu

Le spécimen complet doit rester visuellement équivalent à TG-003 :

- même application centrale ;
- même Collector ;
- mêmes deux flèches ;
- même navigateur avec ChatGPT ;
- même responsive ;
- mêmes commandes de mise en évidence ;
- mêmes assets.

Le changement doit être sémantique, pas graphique.

## À ne pas faire

Ne pas :

- créer une migration 0.1 → 0.1.1 ;
- supporter plusieurs versions de schéma ;
- créer un moteur générique ;
- ajouter des identifiants UUID ;
- créer un système de références complexe ;
- généraliser à une deuxième application ;
- ajouter des verbes aux relations ;
- modifier la charte graphique ;
- lancer TG-005.

## Vérifications

Vérifier au minimum :

1. le spécimen complet en `schema_version 0.1.1` ;
2. comparaison visuelle avec TG-003 ;
3. largeur bureau et mobile ;
4. fonctionnement des quatre commandes de mise en évidence ;
5. absence d’erreur console ;
6. modèle minimal 0.1.1 ;
7. suppression du Collector ;
8. suppression de la relation Collector → appli ;
9. suppression du navigateur ;
10. suppression de la relation appli → navigateur ;
11. absence totale des anciens champs `role_pour_mon_gpt`, `direction`, `action`, `via` dans le modèle courant et la logique utilisée pour ce spécimen ;
12. refus clair d’un ancien `schema_version: "0.1"`.

## Livrables

- modèle `specimen.js` en 0.1.1 ;
- rendu adapté ;
- rapport `reports/TG-004/rapport.md` ;
- captures seulement si elles apportent une preuve utile.

Le rapport doit préciser :

- les changements sémantiques ;
- les adaptations du renderer ;
- la confirmation de l’absence de migration ;
- les tests d’optionalité et de relations ;
- les éventuelles limites restantes.

Commit et push sur `main`, vérification du SHA distant, puis arrêt pour validation humaine.
