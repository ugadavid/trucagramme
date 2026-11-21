# TG-011 — Faire parler le signal de lecture partielle

## Contexte

Trucagramme possède depuis plusieurs versions un signal discret :

```text
⚠
```

attaché à la pastille de version lorsqu'un modèle contient encore du sens que le renderer n'a pas consommé.

Jusqu'ici, ce signal répond uniquement à :

> « tout n'est pas représenté ».

Le quatrième spécimen réel, **Mon Bureau**, est désormais un cas idéal pour enrichir très légèrement ce comportement.

Le renderer sait déjà représenter :

- l'application principale ;
- Windows comme plateforme de l'application ;
- `.NET 10`, C# et Windows Forms ;
- la configuration JSON ;
- `AUTONOME` ;
- `SÉPARÉ DES BINAIRES`.

Mais il ne sait pas encore représenter plusieurs objets du modèle :

- `shell_windows` ;
- `processus_windows` ;
- `tcp_windows` ;
- `vscode` ;
- `git` ;
- `curl` ;
- `python` ;
- `powershell` ;
- `tree` ;
- `serveur_local` ;
- ainsi que les relations qui les concernent.

Nous ne voulons **pas encore apprendre à les dessiner**.

Nous voulons simplement que `⚠` puisse dire, très sobrement :

> « je vois ces éléments, mais je ne sais pas encore les représenter ».

Cette mission ne modifie pas le contrat sémantique.

## Version

Conserver partout :

```js
schema_version: "0.1.7"
```

Ne pas créer `0.1.8`.

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-010/rapport.md`
- `lecteur/lecteur.js`
- `lecteur/rendu.js`
- `lecteur/styles.css`
- `projets/index.json`
- `projets/mon_bureau/specimen.js`

Préserver la légende contextuelle, les panneaux du lecteur et toutes les décisions précédentes.

## 1. Ajouter Mon Bureau au lecteur canonique

Ajouter :

```text
mon_bureau
```

à la fin de :

```text
projets/index.json
```

Le menu doit donc proposer quatre vrais projets :

- Mon Aise ;
- Mon GPT<3 ;
- Chrome Organizer ;
- Mon Bureau.

Le specimen Mon Bureau existe déjà et ne doit pas être remanié dans cette mission.

Il sert de **cas réel de lecture partielle riche**.

## 2. Le signal reste minimal

Le rendu normal de `⚠` ne change pas fondamentalement.

Il reste :

- petit ;
- attaché à la version ;
- absent lorsque tout le sens est consommé ;
- un indicateur de lecture partielle, pas une erreur de schéma.

Ne pas ajouter de texte visible à côté tant qu'il n'est pas sollicité.

## 3. Inventorier le sens restant

Après le rendu du diagramme, le lecteur dispose déjà de la copie du modèle dont les informations comprises ont été consommées.

Utiliser ce **reste du modèle** pour construire un inventaire compact.

Ne pas repartir du specimen original pour essayer de deviner ce que le renderer a ou n'a pas représenté.

Le reste après consommation est la source de vérité de cette mission.

## 4. Objets de premier niveau non rendus

Lorsqu'une clé de premier niveau restante correspond à un objet possédant un `type` textuel, afficher :

```text
clé · type
```

Exemples attendus avec Mon Bureau :

```text
shell_windows · service_systeme
processus_windows · service_systeme
tcp_windows · service_systeme
vscode · outil_externe
git · outil_externe
curl · outil_externe
python · outil_externe
powershell · outil_externe
tree · outil_externe
serveur_local · service_local
```

Un contexte restant peut également apparaître si le renderer ne l'a pas consommé, par exemple :

```text
windows · contexte
```

si tel est réellement l'état de la copie après rendu.

### Important

Ne pas remplacer les clés techniques par des noms humains inventés.

Le but est précisément de montrer ce que le modèle contient réellement.

## 5. Ne pas détailler les propriétés de ces objets inconnus

Pour un objet de premier niveau déjà présenté comme :

```text
serveur_local · service_local
```

ne pas ajouter ensuite :

```text
serveur_local.protocole
serveur_local.hote
```

dans la même bulle.

L'entrée `clé · type` suffit à signaler que cet objet reste entièrement non représenté.

Cela évite le bruit.

## 6. Propriétés inconnues dans un objet par ailleurs rendu

Lorsqu'un objet connu est bien représenté mais conserve une propriété inconnue, afficher son chemin compact.

Exemple de recette :

```js
sauvegardes: {
  ...,
  canexistepas: "x"
}
```

La bulle doit pouvoir montrer :

```text
sauvegardes.canexistepas
```

Ne pas afficher :

```text
x
```

La valeur inconnue reste cachée.

### Chemins imbriqués

Une propriété inconnue peut produire un chemin du type :

```text
appli.socle_technique.canexistepas
```

si son conteneur parent est par ailleurs reconnu.

Rester compact.

## 7. Relations restantes

Ne pas lister les relations restantes une par une.

Si des entrées du tableau `relations` contiennent encore du sens non consommé, afficher une seule ligne :

```text
relations · N non représentées
```

où `N` est le nombre de relations restantes qui contiennent encore du sens.

Pour Mon Bureau, le résultat attendu en l'état est probablement proche de :

```text
relations · 18 non représentées
```

mais **ne pas coder 18 en dur**.

Calculer le nombre réel.

Si certaines relations sont consommées et d'autres non, compter seulement celles restant non représentées.

## 8. Autres restes

Pour les autres champs restants qui ne sont :

- ni un objet de premier niveau typé ;
- ni `relations` ;

afficher si nécessaire uniquement des **chemins de clés**.

Ne jamais afficher leur valeur brute.

Exemples possibles :

```text
appli.inconnue
specimen.autre_chose
```

Éviter de produire des chemins pour des conteneurs vides.

## 9. Ordre de l'inventaire

Utiliser un ordre stable et compréhensible :

1. objets de premier niveau dans leur ordre de déclaration ;
2. propriétés inconnues / chemins dans leur ordre naturel de parcours ;
3. compteur de relations à la fin.

Ne pas trier alphabétiquement.

L'inventaire doit refléter autant que possible l'ordre du modèle.

## 10. Interaction du signal

Le détail doit être accessible de plusieurs façons.

### Souris

Au survol de `⚠` :

- afficher une petite bulle attachée au signal ;
- la bulle disparaît lorsque le pointeur quitte le signal / sa zone utile, sauf si elle a été explicitement ouverte par clic.

### Clavier

Le signal doit être atteignable au clavier.

Au focus :

- afficher le détail ;
- permettre une lecture normale ;
- Échap ferme le détail si nécessaire.

### Clic / toucher

Un clic ou toucher sur `⚠` doit permettre d'ouvrir / fermer le détail de façon stable.

C'est nécessaire pour :

- mobile ;
- tactile ;
- utilisateur qui souhaite prendre le temps de lire.

Ne pas dépendre uniquement de `:hover`.

## 11. Forme de la bulle

Créer une **petite bulle attachée à la version / au signal**.

Ce n'est pas un panneau du lecteur.

Ne pas réutiliser le grand panneau Présentation / Légende.

### Aspect souhaité

- compact ;
- discret ;
- proche du signal ;
- largeur raisonnable ;
- liste lisible ;
- hauteur maximale avec défilement si nécessaire.

Titre court possible :

```text
Lecture partielle
```

Puis la liste.

Pas de paragraphes d'explication.

Pas de gros encart d'erreur rouge.

## 12. Accessibilité

Le signal doit garder son sens accessible :

```text
Lecture partielle
```

La liste détaillée doit être disponible au clavier et lisible par les technologies d'assistance.

Approche possible :

- `button` discret ou élément focusable adapté ;
- `aria-expanded` ;
- `aria-controls` ;
- bulle avec structure de liste.

Ne pas rendre `⚠` décoratif si une interaction lui est désormais associée.

## 13. Pas de dump JSON

Interdictions importantes.

La bulle ne doit jamais afficher :

- objet JSON complet ;
- valeurs arbitraires ;
- URL ;
- chemins de fichiers ;
- secrets ;
- chaînes longues ;
- tableaux complets ;
- arguments de commandes.

Elle décrit **la structure non rendue**, pas ses données.

Cette règle est générale, même si les specimens actuels sont publics et synthétiques.

## 14. Ne pas interpréter ce qu'on ne comprend pas

Pour :

```text
service_systeme
outil_externe
service_local
```

ne pas expliquer :

- « outil lancé » ;
- « composant Windows » ;
- « serveur HTTP » ;

dans la bulle.

Même si nous, humains, savons ce que cela signifie.

Le renderer ne sait pas encore dessiner cette notion : il affiche seulement :

```text
clé · type
```

La future grammaire décidera de son sens graphique.

## 15. Mon Bureau — recette principale

Avec le specimen canonique actuel, ouvrir :

```text
?projet=mon_bureau
```

Vérifier :

- le diagramme partiel actuel reste identique ;
- `⚠` est présent ;
- son détail liste les objets non rendus ;
- les types sont affichés ;
- les valeurs internes ne le sont pas ;
- les relations sont résumées par un compteur ;
- aucun objet inconnu n'est inventé graphiquement.

La Présentation et la Légende doivent continuer à fonctionner.

## 16. Cas déjà totalement représentés

Vérifier :

- Mon Aise ;
- Mon GPT<3 ;
- Chrome Organizer.

Si leur modèle courant est entièrement consommé :

- aucun `⚠` ;
- aucune bulle fantôme.

La mission ne doit pas fabriquer un signal simplement parce qu'une légende ou un filtre existe.

## 17. Cas de propriété inconnue

Sur une copie temporaire en mémoire, ajouter par exemple :

```js
sauvegardes.canexistepas = "x"
```

dans Chrome Organizer.

Vérifier :

- archive toujours visible ;
- `⚠` visible ;
- bulle contenant `sauvegardes.canexistepas` ;
- valeur `x` absente.

Tester aussi une propriété inconnue imbriquée dans une structure connue si utile.

## 18. Responsive

Vérifier :

- 1448 px ;
- 390 px ;
- 320 px.

Sur mobile :

- clic / toucher utilisable ;
- bulle ne sort pas de l'écran ;
- défilement interne si nécessaire ;
- pas de reflow du diagramme.

## 19. Non-régression

Ne pas modifier :

- placement des objets ;
- grammaire des formes ;
- relations ;
- filtres ;
- légende ;
- Présentation ;
- accueil ;
- 404.

La seule modification fonctionnelle du diagramme est le détail interactif du signal de lecture partielle.

## 20. Documentation

Mettre à jour de façon ciblée :

- `README.md` si le comportement utilisateur de `⚠` y mérite une mention ;
- documentation de grammaire uniquement si l'implémentation révèle une précision nécessaire.

Ne pas réécrire les rapports historiques.

## 21. Tests proportionnés

Mission lecteur / diagnostic visuel : recette L1/L2 ciblée.

Vérifier :

- Mon Bureau ;
- propriété inconnue sur Chrome Organizer ;
- absence de signal sur projets entièrement représentés ;
- souris ;
- clavier ;
- clic / tactile simulé ;
- Échap ;
- responsive ;
- console propre.

Pas de campagne complète historique.

## À ne pas faire

Ne pas :

- passer en schema_version 0.1.8 ;
- apprendre à dessiner `outil_externe` ;
- apprendre à dessiner `service_systeme` ;
- apprendre à dessiner `service_local` ;
- résoudre le placement 7+ ;
- représenter les 18 relations de Mon Bureau ;
- détailler les relations dans la bulle ;
- afficher des valeurs inconnues ;
- ajouter un debugger ;
- ajouter un panneau au menu ;
- commencer la vue 2 ;
- créer TG-012.

## Livrables

- Mon Bureau ajouté à `projets/index.json` ;
- signal `⚠` interactif ;
- inventaire compact du sens restant ;
- objets inconnus sous forme `clé · type` ;
- propriétés inconnues sous forme de chemin ;
- relations restantes sous forme de compteur ;
- aucune valeur brute affichée ;
- interaction souris / clavier / clic ;
- rendu responsive ;
- schema_version 0.1.7 inchangé ;
- `reports/TG-011/rapport.md` ;
- captures utiles de Mon Bureau avec la bulle ouverte.

Le rapport doit préciser :

1. comment l'inventaire est construit depuis le modèle restant ;
2. règle pour les objets typés ;
3. règle pour les propriétés inconnues ;
4. règle pour les relations ;
5. protections contre l'affichage de valeurs ;
6. comportement souris / clavier / clic ;
7. résultat exact observé sur Mon Bureau ;
8. non-régression des autres projets.

Commit et push sur `main`, vérifier le SHA distant, puis arrêt pour validation humaine.
