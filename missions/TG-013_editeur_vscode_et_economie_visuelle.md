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
