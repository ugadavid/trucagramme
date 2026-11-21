# TG-013 — Première représentation d’un éditeur externe et économie visuelle

## Contexte

TG-012 a introduit dans Mon Bureau :

- un troisième groupe interne d'outils pilotés ;
- une couche DEBUG non consommatrice ;
- la suppression de l'affirmation AUTONOME ;
- Visual Studio Code encore non représenté sous le type `application_externe`.

La recette fait apparaître trois ajustements immédiats :

1. le titre visible **Outils pilotés** est devenu redondant ;
2. le titre **DEBUG · non représenté** est lui aussi redondant puisque le traitement gris / pointillé est désormais compris ;
3. `application_externe` décrit mal VS Code : il dit où l'objet se trouve au lieu de dire ce qu'il est.

Nous voulons donc faire de VS Code notre premier objet externe dont la **nature intrinsèque** est directement représentée :

```js
type: "editeur"
```

Le fait qu'il soit extérieur à Mon Bureau se lit dans la composition et dans sa relation.

Cette mission ouvre :

```js
schema_version: "0.1.9"
```

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-012/rapport.md`
- `projets/mon_bureau/specimen.js`
- `lecteur/rendu.js`
- `lecteur/lecture-partielle.js`
- `lecteur/interactions.js`
- `lecteur/styles.css`

Asset fourni par David :

```text
assets/communs/vscode.png
```

Utiliser cet asset pour l'identité visuelle de Visual Studio Code.

## Objectif général

Faire trois choses simples :

1. reconnaître `type = editeur` et rendre VS Code comme objet extérieur au bloc principal ;
2. alléger le groupe des outils pilotés sans perdre sa sémantique ;
3. alléger les cartouches DEBUG sans modifier leur fonctionnement.

Ne pas profiter de cette mission pour résoudre les autres inconnus de Mon Bureau.

## 1. Passer les six spécimens en schema_version 0.1.9

Passer à `0.1.9` :

- `projets/accueil/specimen.js`
- `projets/404/specimen.js`
- `projets/mon_aise/specimen.js`
- `projets/mon_gpt/specimen.js`
- `projets/chrome_organizer/specimen.js`
- `projets/mon_bureau/specimen.js`

Le lecteur attend `0.1.9`.

Les cinq spécimens autres que Mon Bureau ne changent pas sémantiquement.

## 2. VS Code devient type = editeur

Modifier Mon Bureau :

```js
vscode: {
  nom: "Visual Studio Code",
  type: "editeur"
}
```

et conserver :

```js
{ source: "appli", destination: "vscode" }
```

Ne pas ajouter :

- `externe: true` ;
- `role: "application_externe"` ;
- `position: "droite"` ;
- ou tout autre champ de placement.

### Principe

> **La nature appartient à l'objet ; l'extériorité appartient à la composition.**

`editeur` dit ce qu'est VS Code.

Le fait que VS Code soit rendu hors du bloc Mon Bureau dit qu'il est extérieur.

La flèche `appli -> vscode` dit que Mon Bureau le déclenche.

## 3. Représentation graphique de type editeur

Créer une représentation graphique générique pour :

```text
type = editeur
```

Elle doit évoquer une **surface / fenêtre d'édition**, sans devenir une reproduction détaillée d'un IDE.

Pistes :

- petite fenêtre d'application ;
- bandeau discret ;
- zone d'édition suggérée par quelques traits ;
- identité de l'éditeur au centre.

Le renderer doit pouvoir réutiliser cette forme avec un autre éditeur futur.

Ne pas coder une forme qui signifie uniquement « VS Code ».

## 4. Identité VS Code

Pour Visual Studio Code, utiliser :

```text
assets/communs/vscode.png
```

Le logo doit être l'élément principal d'identification visuelle.

Le nom humain :

```text
Visual Studio Code
```

reste dans le modèle et l'accessibilité.

### Économie de texte

Tester en priorité une représentation où le logo suffit visuellement.

Ne pas afficher un grand texte « Visual Studio Code » ou « VS Code » si le logo rend déjà l'identité évidente.

Un petit libellé court reste acceptable seulement si la recette montre qu'il est nécessaire.

## 5. Placement de VS Code

VS Code est le premier objet externe stabilisé de Mon Bureau hors des groupes internes.

Sa relation est uniquement :

```text
Mon Bureau -> VS Code
```

Appliquer la règle déjà stabilisée pour une seule unité externe :

> relation sortante seule → placement à droite.

Donc sur bureau, VS Code apparaît à droite de Mon Bureau.

La flèche pointe de Mon Bureau vers VS Code.

Ne pas coder « éditeur = droite ».

C'est la règle de placement de l'unique unité externe qui produit ce côté.

## 6. Relation VS Code

Consommer la relation :

```js
{ source: "appli", destination: "vscode" }
```

lorsque VS Code est correctement rendu.

Conséquences attendues :

- VS Code disparaît de `⚠` ;
- VS Code disparaît des cartouches DEBUG ;
- le compteur de relations non représentées diminue de 9 à 8, sous réserve de l'état réel du modèle après rendu.

Ne pas coder le nombre 8 en dur.

## 7. Légende

La légende contextuelle doit apprendre le signe :

```text
Éditeur
```

uniquement lorsqu'un objet `type = editeur` est réellement rendu.

La miniature doit reprendre la forme générique de l'éditeur, pas nécessairement le logo VS Code.

Ne pas utiliser le libellé :

```text
Application externe
```

La légende explique la nature, pas la position.

## 8. Outils pilotés : retirer le titre visible

Le groupe interne garde sa sémantique :

```js
appli.outils_pilotes
```

Il garde :

- son identité accessible ;
- son entrée `Outils pilotés` dans la légende ;
- ses cinq outils ;
- sa place entre Socle technique et Données.

Mais supprimer le titre visible :

```text
Outils pilotés
```

au-dessus des tuiles.

### Pourquoi

La couleur, la forme du groupe et la légende suffisent.

Le texte visible répète une information déjà accessible ailleurs.

Ne pas supprimer l'`aria-label` ou l'équivalent accessible du groupe.

## 9. Nouvelle couleur pour les outils pilotés

Le brun / orangé de TG-012 rappelle trop fortement le compagnon Mon GPT Collector.

Attribuer au groupe Outils pilotés une nouvelle famille chromatique qui ne soit pas confondue avec :

- bleu de l'application principale ;
- violet du socle technique ;
- vert des données ;
- orange / brun du compagnon ;
- bleu externe du navigateur ;
- gris DEBUG.

### Direction proposée

Une famille **magenta / framboise / rose profond** est une piste acceptable parce qu'elle n'est pas encore utilisée comme famille principale.

Le choix exact appartient au rendu et n'est pas normatif.

Contraintes :

- rester lisible ;
- ne pas être criard ;
- conserver un contraste correct ;
- tuiles internes cohérentes avec le cadre.

La légende doit reprendre cette nouvelle famille.

## 10. DEBUG : retirer le titre visible

Les cartouches DEBUG gardent :

- gris ;
- contour discontinu ;
- typographie technique ;
- cartes clé / type ;
- comportement desktop / mobile ;
- caractère non consommant.

Supprimer le texte visible :

```text
DEBUG · non représenté
```

dans chaque cartouche.

### Accessibilité

Conserver si utile un nom accessible du type :

```text
Éléments DEBUG non représentés
```

Le retrait concerne le texte visuel, pas l'accessibilité.

### Important

Ne modifier en rien :

- les objets listés ;
- le nombre de cartouches ;
- le placement provisoire ;
- le contenu de `⚠`.

## 11. DEBUG et VS Code

Après rendu de VS Code comme éditeur :

- VS Code n'est plus un inconnu ;
- il ne doit donc plus apparaître dans DEBUG ;
- il ne doit plus apparaître dans la bulle `⚠`.

Les autres inconnus restent exactement comme avant :

- `windows · contexte` ;
- `shell_windows · service_systeme` ;
- `processus_windows · service_systeme` ;
- `tcp_windows · service_systeme` ;
- `serveur_local · service_local`.

DEBUG ne consomme toujours rien.

## 12. Ne pas toucher aux autres inconnus

Ne pas apprendre à dessiner :

```text
contexte Windows
service_systeme
service_local
```

dans TG-013.

Ne pas représenter les relations restantes.

Ne pas utiliser la présence de VS Code pour commencer le placement 7+.

Le but est de stabiliser **un seul nouveau type réel : editeur**.

## 13. Filtres

La barre actuelle peut rester inchangée.

Ne pas ajouter un bouton « Éditeurs ».

Lorsqu'un filtre existant est actif, l'éditeur externe peut être atténué comme les autres éléments non ciblés.

Ne pas transformer la barre de filtres en catalogue de types.

## 14. Présentation et légende

Conserver :

- Présentation ;
- Légende ;
- panneaux superposés ;
- focus ;
- Échap ;
- clic extérieur.

Aucune modification fonctionnelle attendue hors nouvelle entrée `Éditeur` dans la légende de Mon Bureau.

## 15. Responsive

Vérifier :

- 1448 px ;
- 390 px ;
- 320 px.

### Bureau

VS Code doit être clairement extérieur à Mon Bureau, avec une flèche simple.

Les cartouches DEBUG doivent s'adapter au nouvel objet réel sans le recouvrir.

### Mobile

Une disposition verticale est acceptable.

Le sens :

```text
Mon Bureau -> VS Code
```

doit rester évident.

Le logo doit rester lisible sans prendre une place disproportionnée.

## 16. Lecture partielle

Avant TG-013, Mon Bureau affiche notamment :

```text
vscode · application_externe
relations · 9 non représentées
```

Après TG-013, ces lignes doivent évoluer naturellement.

Attendu :

- aucune ligne `vscode ...` ;
- relation VS Code consommée ;
- compteur recalculé.

Les autres lignes restent présentes.

Tester `debug:true` et `debug:false` :

- `⚠` identique dans les deux cas ;
- VS Code absent dans les deux cas car désormais réellement compris.

## 17. Non-régression

### Mon GPT<3
- compagnon orange inchangé ;
- aucune confusion avec la nouvelle couleur Outils pilotés ;
- légende cohérente.

### Mon Aise
- inchangé hors version.

### Chrome Organizer
- inchangé hors version.

### Accueil / 404
- inchangés hors version.

## 18. Tests proportionnés

Recette L2 ciblée :

### Mon Bureau
- type editeur rendu ;
- asset VS Code chargé ;
- flèche appli -> vscode ;
- placement à droite sur bureau ;
- VS Code absent de DEBUG ;
- VS Code absent de `⚠` ;
- compteur de relations recalculé ;
- titre Outils pilotés absent visuellement ;
- groupe toujours accessible ;
- nouvelle couleur distincte ;
- titre DEBUG absent visuellement ;
- cartes DEBUG toujours présentes ;
- `⚠` inchangé entre debug true / false ;
- légende contient Éditeur et Outils pilotés.

### Responsive
- 1448 ;
- 390 ;
- 320.

### Console
Aucune erreur.

## 19. Documentation

Mettre à jour de façon ciblée :

- `README.md` ;
- documentation de grammaire uniquement si une précision issue de l'implémentation doit être conservée.

Ne pas réécrire les rapports historiques.

## À ne pas faire

Ne pas :

- conserver `type = application_externe` pour VS Code ;
- ajouter `externe = true` ;
- ajouter une propriété de position ;
- mettre VS Code dans Outils pilotés ;
- afficher VS Code simultanément en vrai objet et en DEBUG ;
- ajouter le texte « VS Code » si le logo suffit ;
- dessiner les autres inconnus ;
- résoudre le placement 7+ ;
- dessiner les relations restantes ;
- ajouter un filtre Éditeur ;
- modifier le contenu de DEBUG hors suppression du titre et disparition naturelle de VS Code ;
- commencer la vue 2 ;
- créer TG-014.

## Livrables

- contrat `schema_version 0.1.9` ;
- VS Code en `type: "editeur"` ;
- rendu générique `editeur` ;
- asset `assets/communs/vscode.png` utilisé ;
- VS Code extérieur à Mon Bureau ;
- flèche `appli -> vscode` ;
- entrée `Éditeur` dans la légende ;
- titre visible Outils pilotés supprimé ;
- nouvelle famille chromatique Outils pilotés ;
- titre visible DEBUG supprimé ;
- DEBUG et `⚠` cohérents ;
- `reports/TG-013/rapport.md` ;
- captures utiles bureau/mobile.

Le rapport doit préciser :

1. nouvelle sémantique de `editeur` ;
2. pourquoi « externe » n'est plus dans le type ;
3. représentation graphique générique d'un éditeur ;
4. utilisation du logo VS Code ;
5. consommation de la relation VS Code ;
6. évolution exacte de `⚠` ;
7. disparition de VS Code de DEBUG ;
8. choix de la nouvelle couleur Outils pilotés ;
9. suppression des deux titres visibles sans perte d'accessibilité ;
10. non-régression.

Commit et push sur `main`, vérifier le SHA distant, puis arrêt pour validation humaine.


---

# Correctif de recette TG-013 — Éditeur conteneur et couleur Outils pilotés

## Statut

Ce correctif **fait partie de TG-013**.

Il remplace la première interprétation graphique de VS Code livrée dans le rapport initial TG-013.

Ne pas créer :

- TG-013a ;
- TG-014 ;
- une nouvelle mission.

Mettre à jour le même rapport :

```text
reports/TG-013/rapport.md
```

en ajoutant une section de correctif de recette et de nouvelles captures.

Le contrat passe à :

```js
schema_version: "0.1.10"
```

## 1. Problème observé en recette

La première passe représente VS Code comme une fenêtre presque vide dont le logo occupe le centre.

Visuellement, cela raconte essentiellement :

> « cliquer / aller vers VS Code ».

Ce n'est pas suffisant.

Dans Mon Bureau, VS Code est intéressant parce qu'il permet d'ouvrir plusieurs projets. Le diagramme doit raconter **ce que contient / accueille l'éditeur**, pas seulement son identité.

## 2. Nouveau modèle VS Code

Remplacer :

```js
vscode: {
  nom: "Visual Studio Code",
  type: "editeur"
}
```

par :

```js
vscode: {
  nom: "Visual Studio Code",
  type: "editeur",
  contenu: [
    { nom: "Mon GPT<3", type: "projet_info" },
    { nom: "Trucagramme", type: "projet_info" }
  ]
}
```

Conserver :

```js
{ source: "appli", destination: "vscode" }
```

Ne pas créer de relation propre pour les deux `projet_info`.

## 3. projet_info

Reconnaître :

```text
type = projet_info
```

uniquement comme élément interne d'un conteneur qui sait le rendre.

Pour ce correctif :

- afficher son `nom` ;
- ne pas lui donner de forme lourde ;
- ne pas lui donner de flèche ;
- ne pas en faire un objet de premier niveau ;
- ne pas l'ajouter aux unités externes ;
- ne pas l'ajouter individuellement à la légende.

Une représentation courte de type ligne / onglet / carte de projet est acceptable.

## 4. Nouvelle représentation graphique de type editeur

Conserver une forme générique d'éditeur, mais abandonner l'idée de « grande boîte avec logo central ».

L'éditeur doit désormais raconter :

- une surface / fenêtre d'édition ;
- plusieurs projets ou contenus accessibles à l'intérieur ;
- l'identité concrète de VS Code comme détail secondaire.

### Pour VS Code

Utiliser toujours :

```text
assets/communs/vscode.png
```

mais :

- réduire nettement le logo ;
- le placer discrètement, par exemple en haut à droite ;
- ne pas en faire le contenu principal.

Le contenu principal doit montrer :

```text
Mon GPT<3
Trucagramme
```

dans une disposition simple évoquant plusieurs projets accessibles.

### Intention

Quelque chose de l'ordre de :

```text
┌──────────────────────────┐
│                    [VSC] │
│                          │
│  ┌────────────────────┐  │
│  │ Mon GPT<3          │  │
│  └────────────────────┘  │
│  ┌────────────────────┐  │
│  │ Trucagramme        │  │
│  └────────────────────┘  │
│                          │
└──────────────────────────┘
```

Cette esquisse fixe le **sens**, pas les pixels.

Ne pas reproduire l'interface réelle de VS Code.

## 5. Le type editeur reste générique

Le renderer doit raisonner à partir de :

```text
type = editeur
contenu[]
```

et non :

```text
id === vscode
```

pour construire la surface et les éléments internes.

L'asset VS Code peut naturellement dépendre de l'identité concrète `vscode`.

Tester si possible un éditeur temporaire sans asset avec deux `projet_info` afin de vérifier que la structure fonctionne sans le logo VS Code.

## 6. Légende

Conserver une seule entrée :

```text
Éditeur
```

Ne pas ajouter :

```text
Projet info
```

à la légende pour ce correctif.

`projet_info` est ici un élément de contenu, pas une nouvelle famille graphique autonome de niveau 1.

## 7. Lecture partielle

Après rendu correct :

- `vscode` reste absent de `⚠` ;
- `vscode.contenu` doit être entièrement consommé ;
- les deux `projet_info` ne doivent pas déclencher `⚠`.

Une entrée de contenu d'un type inconnu doit en revanche laisser du sens non consommé.

Tester temporairement :

```js
contenu: [
  { nom: "Mon GPT<3", type: "projet_info" },
  { nom: "Mystère", type: "canexistepas" }
]
```

Le contenu connu reste rendu et `⚠` signale le reste sans afficher de valeur arbitraire.

## 8. Couleur Outils pilotés — correction réelle

La recette utilisateur considère encore la famille actuelle trop proche du compagnon Mon GPT Collector.

Ne pas conserver la famille framboise / rose de la première passe TG-013.

Passer franchement à une famille **cyan / turquoise / bleu-vert**, distincte de :

- bleu profond de l'application principale ;
- violet du socle ;
- vert des données ;
- orange / brun du compagnon ;
- bleu clair du navigateur / surfaces externes ;
- gris DEBUG.

Le choix exact doit être clairement perceptible à l'œil.

### Conserver

- absence du titre visible « Outils pilotés » ;
- identité accessible du groupe ;
- légende « Outils pilotés » ;
- cinq tuiles dans le même ordre.

## 9. DEBUG

Conserver la suppression du titre visible DEBUG obtenue dans la première passe.

Ne changer ni :

- ses cartes ;
- son contenu ;
- son caractère non consommant ;
- sa disposition, sauf adaptation mécanique nécessaire à la nouvelle taille de l'éditeur.

VS Code reste absent de DEBUG puisqu'il est compris.

## 10. Relation et placement

Conserver :

```text
Mon Bureau -> VS Code
```

et le placement à droite issu de la règle d'une seule unité externe sortante.

La nouvelle taille de l'éditeur ne doit pas entraîner une nouvelle règle de placement.

Adapter seulement les dimensions nécessaires pour garder une composition équilibrée.

## 11. Responsive

Vérifier :

- 1448 px ;
- 390 px ;
- 320 px.

Sur mobile :

- les deux projets internes restent lisibles ;
- le logo VS Code reste secondaire ;
- la flèche garde son vrai sens ;
- aucun débordement horizontal ;
- DEBUG reste lisible.

## 12. Passage en 0.1.10

Passer les six spécimens système / projet à :

```js
schema_version: "0.1.10"
```

Le lecteur attend `0.1.10`.

Les cinq spécimens autres que Mon Bureau ne changent pas sémantiquement.

## 13. Recette ciblée du correctif

Vérifier sur Mon Bureau :

- VS Code contient bien deux `projet_info` ;
- Mon GPT<3 visible dans l'éditeur ;
- Trucagramme visible dans l'éditeur ;
- logo VS Code petit et secondaire ;
- aucune impression de simple bouton de lancement ;
- une seule flèche `appli -> vscode` ;
- VS Code absent de DEBUG ;
- VS Code absent de `⚠` ;
- contenu entièrement consommé ;
- légende contient Éditeur mais pas Projet info ;
- Outils pilotés clairement cyan / turquoise ;
- aucune confusion visuelle avec Mon GPT Collector ;
- titres visibles Outils pilotés et DEBUG toujours absents.

Vérifier rapidement les autres projets pour non-régression.

## 14. Tests proportionnés

Correctif visuel + petite extension sémantique : L1/L2 ciblé.

Pas de campagne historique complète.

## À ne pas faire

Ne pas :

- créer une nouvelle mission ;
- créer TG-013a ou TG-014 ;
- refondre le navigateur ChatGPT ;
- généraliser immédiatement tous les conteneurs vers `contenu[]` ;
- créer deux nouveaux objets de premier niveau Mon GPT<3 / Trucagramme ;
- créer des relations vers les `projet_info` ;
- ajouter Projet info à la légende ;
- remettre un grand logo VS Code au centre ;
- conserver la couleur framboise des outils pilotés ;
- toucher aux services système ou au serveur local ;
- résoudre le placement 7+ ;
- commencer la vue 2.

## Livrables du correctif

- même mission TG-013 ;
- contrat `schema_version 0.1.10` ;
- `vscode.contenu[]` ;
- support de `projet_info` interne ;
- nouvelle représentation d'éditeur conteneur ;
- logo VS Code discret ;
- couleur cyan / turquoise Outils pilotés ;
- même `reports/TG-013/rapport.md` complété par une section Correctif ;
- nouvelles captures bureau/mobile ;
- SHA distant vérifié.

Publier sur `main`, vérifier le SHA distant, puis arrêt pour validation humaine du correctif TG-013.
