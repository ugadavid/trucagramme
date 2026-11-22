# TG-017 — Économie visuelle, logos contextuels et allègement du lecteur

## Contexte

Trucagramme a un principe fondateur déjà stabilisé :

> **le texte nomme ou qualifie ; le graphique explique autant que possible.**

Les cinq spécimens actuels ont progressivement enrichi la grammaire, mais plusieurs libellés visibles répètent aujourd’hui une information que les logos disponibles peuvent porter directement.

Cette mission est une **passe graphique légère**. Elle ne crée aucune nouvelle sémantique et ne change pas le contrat du modèle.

Le contrat reste :

```js
schema_version: "0.1.14"
```

L’objectif est de demander au lecteur et au renderer de faire plus systématiquement ce que Trucagramme est censé faire : **montrer par l’image chaque fois que l’image suffit**.

Les assets nécessaires ont été ajoutés dans `assets/communs/`, notamment :

- `.net.png`
- `avalonia.png`
- `c_sharp.png`
- `electron.png`
- `js.png`
- `ts.png`
- `react.png`
- `pyside6.png`
- `qt.png`
- `win_forms.png`
- ainsi que les assets déjà utilisés : Python, Tk, JSON, ChatGPT, Git, curl, PowerShell, VS Code, WebP, ZIP, Windows, etc.

Ne télécharger aucun asset et ne créer aucun nouveau logo dans cette mission.

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `missions/TG-016_raccourcis_et_explorateur.md`
- `reports/TG-016/rapport.md` s’il est présent et accessible
- `projets/mon_aise/specimen.js`
- `projets/mon_gpt/specimen.js`
- `projets/chrome_organizer/specimen.js`
- `projets/mon_bureau/specimen.js`
- `projets/trame/specimen.js`
- `lecteur/rendu.js`
- `lecteur/lecteur.js`
- `lecteur/interactions.js`
- `lecteur/lecture-partielle.js`
- `lecteur/styles.css`
- le contenu réel de `assets/communs/`

Préserver les décisions déjà stabilisées :

- séparation sens / rendu ;
- modèle descriptif et permissif ;
- légende contextuelle ;
- lecture partielle honnête ;
- DEBUG non consommant ;
- nature portée autant que possible par le graphique ;
- texte visible limité à ce qui ajoute réellement du sens.

## 1. Aucune évolution de grammaire

TG-017 est **cosmétique**.

Ne pas :

- changer `schema_version` ;
- ajouter un nouveau type sémantique ;
- renommer des valeurs du modèle uniquement pour faciliter le renderer ;
- modifier les relations ;
- modifier le sens des spécimens ;
- transformer cette passe en refonte du renderer ;
- modifier `docs/GRAMMAIRE_ALPHA.md` ou `docs/SEPARATION_SEMANTIQUE_RENDU.md`, sauf découverte d’une contradiction factuelle qui empêche la mission ; dans ce cas, rapporter et s’arrêter avant de réécrire la grammaire.

La vue 1 doit raconter exactement les mêmes faits avant et après TG-017.

## 2. Principe général : le logo remplace le texte redondant

Faire un audit visuel des cinq fiches projet actuelles :

- Mon Aise ;
- Mon GPT<3 ;
- Chrome Organizer ;
- Mon Bureau ;
- TRAME.

Lorsqu’un texte visible ne fait que répéter le nom d’une technologie, d’un service ou d’un format pour lequel un asset fidèle existe déjà, **remplacer ce texte par le logo**.

Exemples de logique :

```text
[logo JSON] Catalogue JSON
→
[logo JSON] Catalogue
```

```text
[logo Tk] Tkinter / Tk
→
[logo Tk]
```

```text
[logo ChatGPT] ChatGPT
→
[logo ChatGPT]
```

Le but n’est pas de supprimer du texte pour supprimer du texte.

### Ne pas perdre d’information

Si le texte porte une information que le logo ne contient pas, conserver uniquement le complément utile.

Exemple de principe :

```text
.NET 10
```

peut devenir un logo `.NET` accompagné du seul qualificatif ou numéro nécessaire pour ne pas perdre `10`.

Ne pas transformer une valeur sémantique en une autre pour pouvoir afficher un logo.

En particulier, si une valeur comme `technologies web` ne correspond pas exactement à un asset disponible, conserver le texte plutôt que d’inventer une précision technique.

## 3. Texte alternatif des logos

Tout logo utilisé pour remplacer ou porter une identité visible doit avoir un `alt` non vide correspondant au **nom humain de la technologie, du service ou du format**.

Exemples :

```text
Python
Tkinter / Tk
Electron
JavaScript
TypeScript
React
PySide6
Qt
.NET
Avalonia
Windows Forms
ChatGPT
JSON
```

Pour une valeur représentée par plusieurs logos, chaque image reçoit son propre `alt`.

Ne pas utiliser comme `alt` :

- le nom du fichier ;
- une clé technique du modèle ;
- `logo_xxx` ;
- un chemin d’asset.

Le texte alternatif doit nommer ce que l’image représente.

## 4. Réutiliser le registre de logos existant

Le renderer possède déjà un registre d’icônes / logos.

Étendre ou réorganiser légèrement ce registre au strict nécessaire pour couvrir les assets réellement utilisés.

Éviter :

- une seconde table codée en dur indépendante ;
- un nouveau framework de composants ;
- un système général d’assets ;
- une dépendance externe.

Le même point de vérité doit autant que possible servir :

- au rendu du logo dans le diagramme ;
- à son nom humain ;
- à la future table des logos décrite ci-dessous.

## 5. Ajouter une commande « Logos » au lecteur

Le lecteur possède actuellement notamment :

- `Présentation` ;
- `Légende`.

Ajouter une commande distincte :

```text
Logos
```

Elle utilise le même panneau latéral / superposé que les commandes existantes.

### Contenu

La table des logos est **contextuelle à la fiche affichée**.

Elle liste uniquement les logos réellement utilisés dans le diagramme courant.

Chaque logo apparaît une seule fois, même s’il est utilisé plusieurs fois.

Chaque entrée contient au minimum :

- le logo ;
- son nom humain.

Exemple conceptuel :

```text
[logo Python]     Python
[logo PySide6]    PySide6
[logo Qt]         Qt
```

### Responsabilités distinctes

`Légende` reste la table des **familles de signes graphiques** :

- application ;
- socle technique ;
- données ;
- module ;
- flux ;
- etc.

`Logos` devient la table des **identités visuelles concrètes** :

- Python ;
- Electron ;
- React ;
- JSON ;
- ChatGPT ;
- etc.

Ne pas recopier les logos dans la Légende et ne pas recopier les formes de la Légende dans Logos.

### Interaction

La commande Logos doit reprendre le comportement du panneau existant :

- ouverture ;
- fermeture par la croix ;
- fermeture par `Échap` ;
- fermeture par clic extérieur ;
- pas de reflow du diagramme ;
- focus clavier cohérent.

## 6. Séparation visuelle dans le menu

Le menu en bas à gauche mélange actuellement :

1. les projets ;
2. les fonctions du lecteur.

Ajouter une **ligne horizontale très discrète, gris très clair**, entre ces deux ensembles.

Avec l’ordre actuel, elle se situe après :

```text
TRAME
```

et avant les commandes telles que :

```text
Présentation
Légende
Logos
```

La séparation est purement visuelle.

Elle doit rester correcte si :

- un projet est ajouté ou retiré ;
- `Présentation` est masquée sur une fiche particulière ;
- une autre commande du lecteur devient la première commande visible.

Préférer une séparation structurelle légère plutôt qu’une règle dépendant du nom `TRAME`.

## 7. Corrections explicites demandées

### Mon Aise

Corriger le rendu :

```text
[logo JSON] Catalogue JSON
```

en :

```text
[logo JSON] Catalogue
```

Le format JSON est déjà porté par le logo.

Faire le même raisonnement sur les technologies / formats visibles de cette fiche lorsqu’un asset fidèle existe, sans changer le modèle.

### Mon GPT<3

Corriger explicitement :

1. **Tkinter / Tk**
   - supprimer le texte visible `Tkinter / Tk` ;
   - conserver le logo Tk ;
   - `alt="Tkinter / Tk"`.

2. **Catalogue**
   - `Catalogue JSON` → `Catalogue` lorsque le logo JSON est présent.

3. **ChatGPT dans le navigateur**
   - conserver le logo ChatGPT ;
   - supprimer le texte visible `ChatGPT` sous le logo ;
   - `alt="ChatGPT"`.

Conserver les autres informations utiles de la fiche.

### Mon Bureau

Corriger :

```text
[logo JSON] Catalogue JSON
```

en :

```text
[logo JSON] Catalogue
```

Puis appliquer la règle générale aux technologies et outils visibles lorsqu’un asset fidèle existe, notamment selon le contenu réel des assets :

- .NET ;
- C# ;
- Windows Forms ;
- Git ;
- curl ;
- Python ;
- PowerShell.

`tree` reste textuel si aucun asset fidèle n’existe.

Ne pas supprimer une version ou un qualificatif utile uniquement parce qu’un logo générique existe.

### Chrome Organizer

Appliquer la même économie visuelle aux éléments déjà représentés lorsque le logo remplace exactement le texte.

Ne pas modifier :

- les relations ;
- les formes dossier / archive / fichiers ;
- les statuts ;
- les propriétés de lecture seule / intégrité.

Si un format multiple ne peut pas être remplacé proprement sans perte ou ambiguïté, conserver son texte.

### TRAME

Conserver exactement la structure sémantique 0.1.14.

#### Retirer quatre titres redondants

Supprimer du diagramme les titres visibles :

```text
Implémentations
Composant interne
Modules produit
Données
```

Leurs familles sont déjà expliquées dans la Légende et leur traitement graphique suffit.

Conserver :

- `1 parmi 3` ;
- les trois implémentations ;
- Super ;
- les modules Personnages, Lieux et Correcteur ;
- les propriétés `autonomes`, `packagés`, `activable` ;
- Projet durable ;
- Recovery local ;
- les contenus utiles du Projet durable.

#### Logos des socles

Utiliser les assets disponibles lorsqu’ils correspondent exactement à la valeur représentée, notamment :

- Python ;
- PySide6 ;
- Qt ;
- Electron ;
- .NET ;
- Avalonia.

Ne pas inventer une représentation logo de `Technologies Web` si elle nécessite de modifier ou de préciser la sémantique du specimen.

Le groupe alternatif doit rester immédiatement lisible comme **1 parmi 3** même après l’allègement du texte.

## 8. Ne pas faire disparaître l’identité utile

Le principe « image plutôt que texte » ne signifie pas :

- retirer le nom d’un objet métier ;
- retirer le nom d’un projet ;
- retirer un qualificatif structurel ;
- retirer une version importante ;
- supprimer `1 parmi 3` ;
- supprimer `autonomes`, `packagés` ou `activable` ;
- supprimer les libellés `Projet durable` ou `Recovery local`.

Le logo remplace uniquement l’identité qu’il porte réellement.

## 9. Lecture partielle et DEBUG

TG-017 ne change pas le sens des spécimens.

Attendu sur les spécimens canoniques :

- aucun nouveau `⚠` ;
- aucun nouveau reste DEBUG ;
- aucune propriété sémantique abandonnée parce que son texte visible a été supprimé.

Le fait qu’un texte ne soit plus visible ne doit jamais être obtenu en cessant de consommer honnêtement le champ correspondant.

## 10. Accessibilité

Vérifier au minimum :

- `alt` non vide et humain pour les logos remplaçant du texte ;
- absence de doublon visible inutile autour du logo ;
- noms accessibles des commandes `Présentation`, `Légende`, `Logos` ;
- navigation clavier inchangée ;
- panneau Logos refermable au clavier ;
- les logos de la table Logos ont le même nom humain que ceux employés dans le diagramme.

Ne pas transformer cette mission en audit d’accessibilité général.

## 11. Responsive

Vérification ciblée :

- bureau autour de 1448 px ;
- mobile autour de 390 px.

Vérifier particulièrement :

- socles techniques avec logos ;
- TRAME avec ses trois implémentations ;
- table Logos ;
- menu et nouvelle séparation ;
- absence de débordement horizontal.

Une vérification 320 px n’est pas requise sauf problème observé à 390 px.

## 12. Tests proportionnés

Recette **L1 ciblée**, malgré le nombre de fiches touchées : la mission reste graphique et n’altère ni modèle, ni flux, ni persistance.

### Statique

Vérifier :

- syntaxe JS ;
- `schema_version 0.1.14` inchangée partout ;
- aucun asset référencé absent ;
- aucun nouveau fichier binaire inutile ;
- aucune modification de relation dans les specimens ;
- diff limité au périmètre visuel/documentaire de TG-017.

### Fiches

Ouvrir les cinq projets et vérifier les éléments effectivement modifiés :

- Mon Aise ;
- Mon GPT<3 ;
- Chrome Organizer ;
- Mon Bureau ;
- TRAME.

### Lecteur

Vérifier :

- Présentation ;
- Légende ;
- Logos ;
- séparation projets / fonctions ;
- fermeture des panneaux ;
- `Échap` ;
- clic extérieur.

### Console

- aucune erreur ;
- aucun asset 404.

### Lecture partielle

- pas de nouveau `⚠` canonique ;
- DEBUG Mon Bureau inchangé dans son principe.

Ne pas lancer une campagne générale sans lien avec cette passe.

## 13. Documentation

Mettre à jour de façon ciblée :

- `README.md` pour mentionner la commande `Logos` et l’économie visuelle réalisée si nécessaire.

Ne pas modifier :

- les rapports historiques ;
- la grammaire 0.1.14 ;
- la documentation de séparation sens / rendu, sauf blocage contradictoire explicitement rapporté.

## 14. Captures et rapport

Créer :

```text
reports/TG-017/rapport.md
```

Inclure les captures nécessaires pour juger la passe sans produire une galerie disproportionnée.

Au minimum, le rapport doit permettre de vérifier visuellement :

- Mon GPT<3 ;
- Mon Bureau ;
- TRAME ;
- la table Logos ;
- la séparation du menu.

Ajouter Mon Aise ou Chrome Organizer si leur rendu a changé de manière significative.

Le rapport doit préciser :

1. quels textes ont été remplacés par quels logos ;
2. quels textes ont volontairement été conservés et pourquoi ;
3. comment les `alt` sont déterminés ;
4. comment la table Logos est construite et rendue contextuelle ;
5. absence de changement sémantique / de schema ;
6. titres retirés dans TRAME ;
7. séparation du menu ;
8. résultats bureau / mobile ;
9. état `⚠` / DEBUG ;
10. contrôles non exécutés parce que hors périmètre.

## À ne pas faire

Ne pas :

- changer la grammaire ;
- passer à `0.1.15` ;
- modifier les relations ;
- modifier le modèle TRAME ;
- inventer de nouvelles technologies pour remplacer `Technologies Web` ;
- télécharger des logos ;
- redessiner les formes de données externes ;
- modifier l’algorithme de placement ;
- ajouter de nouveaux filtres ;
- refondre la barre de filtres ;
- refaire le menu ;
- changer la palette générale ;
- modifier les présentations fonctionnelles sauf nécessité directe ;
- lancer une vue 2 ;
- créer TG-018.

## Livrables

- remplacement des textes technologiques redondants par les logos existants lorsque cela ne perd aucune information ;
- `alt` humains pour les logos concernés ;
- libellés Catalogue allégés ;
- Mon GPT<3 allégé pour Tk et ChatGPT ;
- TRAME sans les quatre titres redondants demandés ;
- commande `Logos` contextuelle ;
- séparation discrète projets / fonctions dans le menu ;
- `schema_version 0.1.14` inchangée ;
- aucun changement sémantique ;
- `reports/TG-017/rapport.md` ;
- captures ciblées utiles.

Commit et push sur `main` avec l’identité agent configurée, vérifier le SHA distant, puis **s’arrêter pour validation humaine**.
