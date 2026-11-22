# TG-018 — Trois projections mono-implémentation de TRAME et socles techniques imbriqués

## Contexte

La fiche canonique TRAME doit représenter une situation exceptionnelle : le même produit est encore porté en parallèle par Qt/PySide6, Electron/Web et Avalonia/.NET. Cette contrainte consomme une partie importante de la profondeur disponible en vue 1.

Nous voulons maintenant éprouver l’hypothèse suivante :

> **si une seule implémentation devait être représentée, la vue 1 pourrait descendre plus profondément et montrer le socle technique de Super et des modules produit sans devenir illisible.**

Pour éviter de transformer involontairement un exercice en choix technologique, trois projections parallèles ont été créées :

- `projets/trame_qt/specimen.js`
- `projets/trame_electron/specimen.js`
- `projets/trame_avalonia/specimen.js`

Elles décrivent le même TRAME selon trois hypothèses mono-implémentation. Elles ne remplacent pas `projets/trame/specimen.js`, qui reste la fiche canonique de l’état réel du projet.

## Principe de l’expérience

Ces trois fichiers sont les **entrées sémantiques de l’expérience**.

Ils ont été écrits à partir des sources TRAME actuelles, notamment :

- Super commun : `workshop/common/editor-super/` et rapport 194a ;
- Personnages : rapport 205 et paquet `packaging/optional/personnages/` ;
- Lieux : rapport 206 et paquet `packaging/optional/lieux/` ;
- Correcteur : rapport 103 et `docs/COMMON_SPELLCHECK_ARCHITECTURE.md`.

Ne pas simplifier les spécimens pour les faire entrer dans le renderer actuel.

Le renderer doit évoluer autour de leur sens, pas l’inverse.

Si une contradiction factuelle avec les sources TRAME est découverte, ne pas la réconcilier silencieusement : la signaler dans le rapport et limiter la correction au fait objectivement démontré.

## Références obligatoires Trucagramme

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-017/rapport.md`
- `reports/TG-017a/rapport.md`
- `projets/trame/specimen.js`
- les trois nouveaux spécimens mono-implémentation ;
- `lecteur/rendu.js`
- `lecteur/lecteur.js`
- `lecteur/lecture-partielle.js`
- `lecteur/interactions.js`
- `lecteur/styles.css`
- `assets/communs/`.

## Références TRAME à consulter

Lecture ciblée, sans modifier le dépôt TRAME :

- `README.md`
- `reports/194a_super_core_isolation_report.md`
- `reports/194aa_electron_super_owner_independence_report.md`
- `reports/205_personnages_autonomous_product_module_report.md`
- `reports/206_lieux_autonomous_product_module_report.md`
- `reports/207_workshop_product_modules_materialization_report.md`
- `reports/103_common_spellcheck_engine_report.md`
- `docs/COMMON_SPELLCHECK_ARCHITECTURE.md`
- `workshop/common/editor-super/README.md`
- les manifestes et points d’entrée des paquets Personnages et Lieux.

Ne pas extrapoler des technologies absentes des sources. Par exemple, la projection Electron conserve volontairement `Technologies Web` pour le host sans inventer React ou TypeScript.

## 1. La fiche TRAME canonique reste intacte

Ne pas modifier le sens ni la composition de :

```text
projets/trame/specimen.js
```

Elle reste la représentation actuelle des trois implémentations alternatives.

Sa vue doit rester visuellement identique à TG-017a, hors éventuel passage mécanique de version de contrat.

Ne pas :

- supprimer le groupe `1 parmi 3` ;
- choisir un host ;
- enrichir Super ou les modules dans cette fiche ;
- ajouter de nouveaux détails à la fiche canonique ;
- présenter une projection mono-implémentation comme l’avenir choisi de TRAME.

## 2. Ajouter les trois projections au lecteur

Ajouter à l’index des projets, immédiatement après TRAME et dans cet ordre :

1. TRAME / Qt
2. TRAME / Electron
3. TRAME / Avalonia

Les trois doivent apparaître comme des fiches ordinaires dans le lecteur.

Leur présentation fonctionnelle explique déjà qu’il s’agit de **projections expérimentales** et qu’aucune ne constitue un choix technologique.

Ne pas ajouter un nouveau badge ou un grand avertissement textuel dans le diagramme pour répéter cette information.

Le statut `experimental` existant suffit dans la vue technique ; la Présentation porte l’explication complète.

## 3. Ouvrir le contrat 0.1.15

TG-018 étend réellement le contrat : `socle_technique` n’est plus réservé à l’application ou à une `implementation`. Il peut aussi qualifier une brique interne importante.

Passer les huit fiches projet du menu à :

```js
schema_version: "0.1.15"
```

soit les cinq fiches existantes et les trois nouvelles projections.

Le lecteur attend désormais 0.1.15.

Les vues système Accueil / 404 restent hors de ce parcours et ne doivent pas être migrées par réflexe si leur renderer spécial ne dépend pas du contrat projet.

Mettre à jour de façon ciblée :

- `README.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`.

### Règle nouvelle

> **Une brique structurante peut porter son propre `socle_technique` lorsque les technologies qui la supportent sont nécessaires à la compréhension de niveau 1.**

Cette règle ne crée pas de profondeur obligatoire.

La vue 1 descend seulement aussi loin que le cas reste lisible.

TRAME canonique s’arrête plus haut à cause de son niveau d’alternatives ; les trois projections mono-implémentation servent précisément à éprouver une profondeur supplémentaire.

## 4. Portées autorisées de socle_technique

Après TG-018, `socle_technique` peut être porté par :

- l’application principale ;
- une `implementation` ;
- un `composant_interne` ;
- un `module_produit`.

Ne pas généraliser automatiquement à n’importe quel objet.

En particulier, la présence d’un dictionnaire quelconque nommé `socle_technique` sur un type inconnu ne doit pas suffire à le rendre.

La portée reste explicitement liée à des familles reconnues.

## 5. Rôles techniques reconnus

Préserver la leçon de TG-005a :

> **les valeurs sont ouvertes ; les rôles techniques reconnus ne le sont pas aveuglément.**

Conserver les rôles existants :

- `runtime`
- `langage`
- `bibliotheque_graphique`

et ajouter pour cette expérience :

- `interface`
- `moteur`
- `integration_hote`.

Une valeur inconnue sous un rôle reconnu peut rester textuelle et valide.

Une clé de rôle inconnue reste du sens non rendu et doit alimenter ⚠.

Ne pas transformer `socle_technique` en dictionnaire libre dont toute clé serait consommée.

## 6. Super : moteur commun + raccord du host

Dans les trois projections, Super porte :

- `langage: "javascript"`
- `interface: "html / css"`
- un `integration_hote` différent.

Le rendu doit permettre de comprendre que Super est une **brique unique** avec son propre socle, pas un second host complet.

### Qt

```text
JavaScript
HTML / CSS
Python / Qt WebEngine / WebChannel
```

### Electron

```text
JavaScript
HTML / CSS
JavaScript / iframe Chromium
```

### Avalonia

```text
JavaScript
HTML / CSS
C# / NativeWebView
```

Utiliser les logos existants pour les identités connues lorsque cela ne crée pas de contresens.

Conserver le texte utile pour :

- HTML / CSS ;
- WebEngine / WebChannel ;
- iframe Chromium ;
- NativeWebView.

Ne télécharger aucun nouvel asset dans cette mission.

Ne pas faire croire que Super possède trois moteurs différents : son cœur Web reste commun ; seul le raccord au host varie dans ces projections.

## 7. Personnages et Lieux : implémentations natives du host

Les deux modules utilisent le même principe de représentation et restent deux briques distinctes.

### Projection Qt

Chacun porte :

```text
Python
PySide6 / Qt
```

### Projection Electron

Chacun porte :

```text
JavaScript
module ESM / renderer Electron
```

Ne pas inventer React, TypeScript ou un framework non déclaré.

### Projection Avalonia

Chacun porte :

```text
.NET
C#
Avalonia
```

Le rendu doit montrer le socle **dans la carte du module**, sans faire de chaque module une application miniature complète.

Les qualifications communes `autonomes` et `packagés` restent portées par le groupe Modules produit.

Ne pas répéter ces deux propriétés dans chaque carte.

## 8. Correcteur : moteur commun partagé

Le Correcteur constitue un cas différent des deux modules métier.

Dans les trois projections, son noyau est commun :

```text
.NET
WeCantSpell.Hunspell
FR Classique 7.7
```

Le client d’intégration dépend du host :

- Qt → Python
- Electron → Node
- Avalonia → .NET

Le champ `dictionnaire: "FR Classique 7.7"` reste une propriété du module, pas un nouveau rôle technique générique.

Le renderer doit consommer et montrer cette propriété de façon compacte.

`activable` reste attaché uniquement au Correcteur.

Ne pas transformer la réserve juridique historique du moteur en propriété du diagramme : elle n’appartient pas à cette vue architecturale.

## 9. Rendu graphique : réutiliser, ne pas réinventer

Cette mission doit éprouver la **profondeur**, pas créer une nouvelle esthétique.

Réutiliser :

- les couleurs de familles existantes ;
- les cartes Super / modules existantes ;
- le traitement du socle technique ;
- les logos et la table Logos ;
- les propriétés compactes ;
- les règles responsive actuelles.

### Structure souhaitée sur bureau

Sans imposer des dimensions exactes :

1. en-tête TRAME / host ;
2. socle principal du host ;
3. Super avec son socle interne ;
4. Modules produit avec leur socle interne, deux modules maximum par ligne ;
5. Projet durable / Recovery local.

Super peut occuper une largeur plus grande qu’un module si nécessaire pour garder son socle lisible.

Les trois projections doivent employer la **même logique de composition** afin de permettre une comparaison honnête.

### Texte de catégories

Conserver la discipline de TG-017 :

- ne pas afficher « Composant interne » ;
- ne pas afficher « Modules produit » ;
- ne pas afficher « Données » ;
- ne pas ajouter « Socle technique » comme titre répété à l’intérieur de chaque carte si la forme et la Légende suffisent.

Légende et Logos restent les lieux de décodage.

## 10. Logos et texte

Réutiliser le registre actuel.

Identités déjà disponibles notamment :

- Python ;
- PySide6 ;
- Qt ;
- Electron ;
- JavaScript ;
- .NET ;
- C# ;
- Avalonia.

Ne pas inventer de logos pour :

- HTML / CSS ;
- WebEngine ;
- WebChannel ;
- Chromium ;
- NativeWebView ;
- ESM ;
- WeCantSpell.Hunspell ;
- Node ;
- FR Classique.

Ces éléments restent textuels si aucun asset fidèle n’existe.

Si plusieurs identités sont présentes dans une même valeur, la représentation peut combiner logos connus et texte résiduel, mais ne doit jamais modifier la valeur sémantique du specimen.

La table Logos doit rester contextuelle et dédoublonnée.

## 11. Relations

Les trois projections n’introduisent aucune relation explicite.

Ne pas ajouter de flèche :

- application → Super ;
- application → module ;
- Super → host ;
- module → host ;
- correcteur → Super.

L’appartenance et la portée sont déjà exprimées par l’emboîtement / regroupement.

Cette expérience porte sur la structure et les supports technologiques, pas sur les appels runtime.

## 12. Lecture partielle

Après implémentation, les trois projections canoniques de l’expérience doivent être entièrement comprises :

- aucun ⚠ ;
- aucun DEBUG résiduel.

Tester néanmoins de façon ciblée :

1. un rôle technique inconnu ajouté dans un socle imbriqué → ⚠ ;
2. une valeur technologique inconnue sous un rôle reconnu → rendue textuellement sans ⚠ si elle respecte le contrat ;
3. un `socle_technique` placé sur un type d’objet non autorisé → il ne doit pas être consommé comme socle valide.

Ne pas élargir les tests d’inconnus au-delà de ces trois points.

## 13. Responsive

Vérifier au minimum :

- 1448 px ;
- 390 px.

### Bureau

Chaque projection doit permettre de distinguer au premier regard :

- le host et son socle ;
- Super et son socle ;
- les trois modules et leur socle ;
- les deux espaces de persistance.

Le but n’est pas de tout rendre minuscule pour faire tenir la fiche.

Si nécessaire, accepter une fiche plus haute que TRAME canonique.

### Mobile

- une brique principale par ligne lorsque nécessaire ;
- aucun débordement horizontal ;
- technologies lisibles ;
- pas de chevauchement des propriétés ;
- ordre de lecture cohérent.

## 14. Non-régression

### TRAME canonique

Sa capture 1448 après TG-017a doit rester visuellement équivalente :

- 1 parmi 3 ;
- trois hosts ;
- Super simple ;
- modules simples ;
- données simples.

Aucun socle imbriqué supplémentaire dans cette fiche.

### Autres projets

Mon GPT<3, Mon Aise, Chrome Organizer et Mon Bureau ne doivent changer visuellement que si une modification générique du renderer corrige un défaut objectif ; sinon, aucun changement attendu.

Le passage mécanique à 0.1.15 ne doit pas modifier leur sens.

## 15. Ce que cette mission cherche à apprendre

Le rapport ne doit pas se limiter à « ça marche ».

Il doit répondre explicitement à ces questions :

1. Une vue mono-implémentation peut-elle montrer le socle de Super et des modules tout en restant une vue 1 lisible ?
2. Le même signe `socle_technique` fonctionne-t-il proprement à plusieurs profondeurs ?
3. La différence entre **brique**, **socle de la brique** et **propriété de la brique** reste-t-elle lisible ?
4. Les trois projections restent-elles comparables sans suggérer qu’une stack est préférée ?
5. Quel détail paraît déjà trop fin pour la vue 1, s’il y en a un ?
6. Cette expérience confirme-t-elle ou non l’idée que la profondeur de la vue 1 dépend de la complexité du produit plutôt que d’un niveau fixe ?

Ne pas décider à la place de David si ces projections deviennent permanentes ou si ce vocabulaire doit être réutilisé ailleurs.

## 16. Tests proportionnés

Recette **L2 ciblée**, car le renderer commun et le contrat changent mais le périmètre reste strictement Trucagramme.

### Statique

- syntaxe JS ;
- contrat 0.1.15 cohérent ;
- aucun asset manquant ;
- aucun changement de relation ;
- aucun changement sémantique du TRAME canonique ;
- diff des trois nouveaux specimens limité au passage de version si nécessaire.

### Visuel

- trois projections à 1448 px ;
- trois projections à 390 px ;
- TRAME canonique à 1448 px ;
- panneau Légende ;
- panneau Logos.

### Console

- aucune erreur ;
- aucun asset 404.

### Lecture partielle

- zéro reste canonique ;
- trois tests d’inconnu décrits plus haut.

Ne pas lancer de campagne générale sur les applications décrites : Trucagramme ne dépend pas de leur runtime.

## 17. Documentation

Mettre à jour :

- `README.md` ;
- `docs/GRAMMAIRE_ALPHA.md` ;
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`.

Documenter clairement :

- le caractère expérimental des trois projections ;
- la nouvelle portée de `socle_technique` ;
- les six rôles techniques reconnus ;
- la règle « valeurs ouvertes, rôles reconnus » ;
- le fait que la profondeur de vue 1 n’est pas imposée mécaniquement par le schéma.

Ne pas réécrire l’historique des décisions antérieures.

## 18. Rapport et captures

Créer :

```text
reports/TG-018/rapport.md
```

Captures minimales :

- TRAME / Qt à 1448 ;
- TRAME / Electron à 1448 ;
- TRAME / Avalonia à 1448 ;
- au moins une projection représentative à 390 ;
- TRAME canonique si nécessaire pour démontrer la non-régression.

Le rapport doit inclure :

- sources TRAME vérifiées ;
- rendu de chaque socle imbriqué ;
- choix de composition ;
- résultat de la lecture partielle ;
- comparaison des trois projections ;
- réponse aux six questions d’apprentissage ;
- limites et éléments jugés trop fins s’il y en a ;
- contrôles non exécutés.

## À ne pas faire

Ne pas :

- modifier le dépôt TRAME ;
- choisir une stack favorite ;
- supprimer ou remplacer la fiche TRAME canonique ;
- ajouter une relation non déclarée ;
- rendre tous les objets arbitrairement capables de porter un socle ;
- accepter toutes les clés d’un socle comme rôles valides ;
- inventer React/TypeScript pour TRAME Electron ;
- télécharger de nouveaux logos ;
- créer une vue 2 ;
- ajouter un sélecteur de niveau de vue ;
- construire un moteur graphique récursif universel ;
- créer TG-019.

## Livrables

- trois projections accessibles depuis le lecteur ;
- contrat 0.1.15 ;
- socles techniques imbriqués sur Super et modules ;
- nouveaux rôles techniques ciblés ;
- rendu du Correcteur commun et de son dictionnaire ;
- Légende et Logos cohérents ;
- zéro ⚠ canonique ;
- responsive 1448 / 390 ;
- TRAME canonique inchangé dans son récit ;
- documentation ciblée ;
- `reports/TG-018/rapport.md` et captures utiles.

Commit et push sur `main` avec l’identité agent configurée, vérifier le SHA distant, puis **s’arrêter pour validation humaine**.
