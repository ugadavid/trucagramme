# Grammaire alpha de Trucagramme

**Statut :** premiers choix issus du spécimen Mon GPT<3.  
**But :** conserver ce que le prototype et TG-001 ont déjà permis de décider, sans prétendre à une norme définitive.

## 1. Niveau 1 — compréhension technique générale

La première vue doit permettre à une personne techniquement cultivée, mais pas nécessairement développeuse, de comprendre rapidement :

- la nature de l’application ;
- son environnement d’exécution ;
- ses technologies structurantes ;
- son organisation générale ;
- où vivent les données importantes ;
- avec quoi elle communique ;
- les flux majeurs ;
- quelques propriétés structurantes comme l’autonomie ou le caractère optionnel.

Le niveau 1 doit rester substantiel : il masque les détails d’implémentation, pas la compréhension.

## 2. Priorité au graphique

Principe : **le texte nomme ou qualifie ; le graphique explique autant que possible.**

Un objet ne devrait pas nécessiter une phrase complète pour être compris.

L’objectif n’est pas « zéro texte », mais **zéro texte explicatif inutile**. Certaines identités ou propriétés gagnent à rester nommées lorsque leur icône seule serait ambiguë.

## 3. Objets

Un objet est une unité graphique identifiable.

Exemples actuels :
- application ;
- système / plateforme ;
- langage ;
- bibliothèque ou toolkit ;
- donnée / stockage ;
- application compagnon ;
- surface externe telle qu’un navigateur ou service.

La nature d’un objet peut être portée par la forme, la couleur, le traitement du cadre ou l’iconographie. Les couleurs exactes ne sont pas encore normalisées.

Le bloc de l’**application principale** doit dominer visuellement la vue. Les autres objets sont compris par rapport à elle.

Une plateforme comme Windows est un **attribut ou contexte de l’application**, pas un conteneur qui englobe toute l’application. Cette règle évite aussi de bloquer un futur cas multiplateforme.

## 4. Emboîtement

L’emboîtement raconte une relation structurelle stable et évite une flèche inutile.

Exemples actuels :
- Python et Tkinter/Tk sont regroupés comme socle technique de Mon GPT<3 ;
- ChatGPT est placé dans un navigateur pour raconter son contexte d’usage réel.

Ces deux emboîtements n’ont pas exactement le même sens. **Le type sémantique des objets précise la relation**, pas seulement la géométrie du dessin.

L’emboîtement ne doit donc pas créer une fausse hiérarchie technique ; son sens exact devra continuer à être stabilisé avec d’autres applications.

## 5. Regroupement

Des éléments de même famille ou de même rôle peuvent partager un conteneur.

Exemple actuel :
- Catalogue JSON ;
- Fichiers d’interface ;
- Images personnelles.

Ils forment ensemble le groupe des données manipulées par Mon GPT<3.

Le regroupement permet de supprimer des flèches répétitives et de rendre la famille lisible d’un coup d’œil.

## 6. Propriétés

Une propriété n’est pas nécessairement un objet autonome.

Les propriétés courtes peuvent être représentées par :
- une petite pastille ;
- une languette attachée au bord du cadre concerné ;
- une annotation textuelle courte.

Exemples actuels :
- `local` ;
- `bureau` ;
- `AUTONOME` ;
- `SÉPARÉ DES BINAIRES` ;
- `optionnel`.

Une propriété de groupe s’attache au groupe ; une propriété de l’application s’attache au bloc principal.

TG-001 confirme que les petites languettes posées sur le bord du cadre qualifié sont lisibles sans prendre la place du contenu.

## 7. Relations et flux

Les flèches sont réservées en priorité aux mouvements ou interactions.

Familles actuellement utiles :
- environnement / support ;
- constitution technique ;
- données manipulées ;
- flux entre objets.

Lorsqu’un regroupement ou un emboîtement suffit, éviter une flèche.

Une flèche de niveau 1 peut rester **sans verbe** lorsque le sens du mouvement est suffisamment évident par les objets reliés. Le détail d’un échange appartient à la fiche de l’objet qui en a besoin, pas forcément à la vue courante.

## 8. Applications compagnons

Une application compagnon apparaît comme un objet voisin **opaque**.

Dans la fiche Mon GPT<3, Mon GPT Collector est montré comme compagnon et identifié comme extension Chrome par son pictogramme. Sa mécanique interne ne doit pas être développée ici.

Sa propre architecture appartiendra à sa propre fiche.

## 9. Services web et navigateur

Lorsque l’usage réel est « ouvrir le service dans un navigateur », le service peut être placé directement **dans la représentation du navigateur**, plutôt que de créer deux objets reliés artificiellement.

C’est le choix actuel pour ChatGPT.

Cette inclusion raconte un **contexte d’usage** plutôt qu’une composition technique.

## 10. Couleur et famille

TG-001 confirme qu’une couleur cohérente par famille aide fortement la lecture :

- application principale ;
- technologie ;
- données ;
- compagnon ;
- surface externe.

La palette actuelle n’est pas normative. La règle porte sur la **fonction de la couleur** : typer et regrouper, pas simplement décorer.

## 11. Ne pas représenter l’absence par défaut

Le protocole raconte ce qui existe et structure le système.

Ne pas encombrer une vue avec :
- « pas de serveur » ;
- « pas d’API » ;
- « pas de compte » ;
- ou toute autre absence non structurante.

Une absence n’est intéressante que si le contexte du schéma lui donne un sens particulier.

## 12. Enseignements de TG-001

La première passe HTML/CSS/JS avec les vrais assets a confirmé plusieurs hypothèses :

- la grammaire reste compréhensible hors du PNG de référence ;
- l’application principale reste naturellement le centre visuel ;
- l’emboîtement fonctionne pour des relations différentes dès lors que les objets sont typés sémantiquement ;
- les groupes rendent les familles immédiatement lisibles ;
- les propriétés attachées aux cadres fonctionnent sans surcharger la vue ;
- les compagnons externes restent compréhensibles sans exposer leur architecture interne ;
- les flux simples peuvent être représentés par des flèches sobres ;
- les vraies icônes améliorent la reconnaissance, mais certains éléments conservent utilement un libellé ;
- le navigateur contenant ChatGPT est plus juste que deux objets artificiellement séparés.

Surtout, TG-001 renforce la direction d’architecture : **le sens du schéma ne doit pas dépendre de son rendu concret**.

Le futur moteur devra raisonner en objets sémantiques tels que `Application`, `TechnologyGroup`, `DataGroup`, `Property`, `Companion`, `Browser` ou `Flow`, puis laisser le rendu décider de leur matérialisation graphique.

Cette conclusion reste une direction de conception ; elle n’autorise pas encore l’implémentation d’un moteur générique.

## 13. Spécimen Mon GPT<3

La référence visuelle actuelle est :

`docs/references/trucagramme-mon-gpt.png`

Le prototype exécutable correspondant est :

`index.html`

### Ce qu’il raconte actuellement

- Mon GPT<3 est une application de bureau Windows locale.
- Son socle principal est Python + Tkinter/Tk.
- Elle manipule un catalogue JSON, des fichiers d’interface et éventuellement des images personnelles.
- Les données utilisateur sont séparées des binaires.
- La distribution est autonome.
- Mon GPT Collector est une application compagnon de type extension Chrome.
- Mon GPT<3 peut ouvrir ChatGPT dans un navigateur.

## 14. Non décidé

À ne pas figer prématurément :
- palette définitive par nature d’objet ;
- formes définitives ;
- vocabulaire complet des relations ;
- format de description sémantique ;
- niveaux 2 et suivants ;
- règles générales de placement ;
- bibliothèque finale d’icônes ;
- moteur de rendu ou éditeur.

Ces décisions devront émerger de plusieurs cas réels.


## 15. Décisions après TG-002 — structure sémantique provisoire

La recette humaine de TG-002 retient une structure sémantique **plus précise que la vue de niveau 1**.

Exemples provisoires pour Mon GPT<3 :

- `appli.type = bureau`
- `appli.mode_execution = local`
- `appli.tourne_sous.os = windows`
- `appli.livraison = autonome` : dans ce cas précis, le package livré contient ce dont l’application a besoin ;
- `appli.socle_technique.langage = python`
- `appli.socle_technique.bibliotheque_graphique = tkinter / Tk`

La vue de niveau 1 peut **aplatir** plusieurs informations structurées dans une représentation plus simple sans les perdre dans le modèle.

Exemple : Python et Tkinter/Tk peuvent rester affichés côte à côte dans le même cadre « socle technique », même si le modèle distingue leur rôle.

Pour les données :

- le rôle et le format peuvent être distingués, par exemple `catalogue.role = catalogue` et `catalogue.format = json` ;
- un élément qui n’a pas encore de rôle plus précis peut rester décrit par ce que l’on sait réellement, sans compléter artificiellement le modèle ;
- `optionnel = true` sur les images personnelles ne rend pas implicitement obligatoires les autres données.

Le rôle `compagnon` est considéré provisoirement comme **contextuel** : Mon GPT Collector reste une extension Chrome qui joue le rôle de compagnon pour Mon GPT<3.

Le navigateur reste, dans le cas actuel, un **contexte d’usage** pour la relation d’ouverture vers ChatGPT.

## 16. Principe fondamental — modèle descriptif et permissif

Trucagramme n’est pas un modèle relationnel strict ni un formulaire à remplir.

Il se rapproche davantage d’un **contrat permissif entre un schéma et une représentation** :

> **La présence d’une information signifie quelque chose ; son absence ne signifie rien.**

Conséquences :

- absence de `optionnel` ≠ obligatoire ;
- absence de `os` ≠ multiplateforme ;
- absence de `livraison` ≠ non autonome ;
- absence de `compagnon` ≠ application isolée ;
- absence d’une propriété ne crée jamais automatiquement sa négation ou son contraire ;
- une section absente ne doit pas produire de case vide, de `N/A` ou de bloc fantôme dans le rendu.

Le moins possible doit être obligatoire. Un objet, un groupe ou une propriété n’existe que s’il apporte réellement une information.

Le modèle peut donc savoir **davantage que la vue**, tandis que la vue sélectionne et simplifie sans déformer.

Un en-tête `schema_version` est retenu pour identifier la version de la structure sémantique. Il doit rester distinct :

- de la version éventuelle de l’application décrite ;
- de la version du spécimen ou prototype Trucagramme.

Pour le premier prototype, `schema_version` et l’identification du sujet principal sont les seuls candidats à une obligation minimale. Ce choix reste provisoire et pourra être révisé après d’autres cas réels.


## 17. Raffinement 0.1.1 — objets déclarés et relations minimales

La recette de TG-003 conduit à simplifier encore le contrat sémantique.

### Rôle du Collector

Le rôle contextuel n’a pas besoin d’encoder le nom de l’application dans sa propriété.

Préférer :

```text
collector.role = compagnon
```

à une propriété spécifique telle que `role_pour_mon_gpt`.

La relation avec l’application principale est déjà exprimée dans `relations`.

### Relations orientées

Une relation possède une `source` et une `destination`.

Ces deux champs expriment déjà son orientation. Un champ supplémentaire tel que `direction = entrante` est redondant et doit être évité.

Exemple :

```text
collector -> appli
```

### Références valides

Une relation ne doit référencer que des objets effectivement déclarés dans le modèle.

Ainsi, `mon_gpt` ne doit pas apparaître comme identifiant implicite si aucun objet de ce nom n’existe. La clé `appli` désigne directement l’application principale déclarée.

### Navigateur et ChatGPT

Pour le spécimen actuel, le navigateur devient un véritable objet sémantique :

```text
navigateur
  type = navigateur
  contenu
    nom = ChatGPT
    type = service_web
```

La relation de niveau 1 reste minimale :

```text
appli -> navigateur
```

Le modèle n’ajoute plus `action = ouvrir` ni `via = navigateur` car ces précisions ne sont pas représentées séparément dans le Trucagramme actuel. Le navigateur lui-même porte déjà le contexte d’usage nécessaire.

### Principe

> **Une relation contient le minimum d’information nécessaire pour relier ses objets.**

On n’ajoute un verbe, un mode ou une propriété de relation que si cette information est réellement exprimée par le protocole.

Ces changements constituent le contrat expérimental **schema_version 0.1.1**.


## 18. Deuxième spécimen réel — Mon Aise et contrat 0.1.2

Après TG-004, le prototype a été branché directement sur un deuxième spécimen réel, **Mon Aise**, sans modifier le renderer.

Le test a confirmé le comportement permissif attendu : le renderer a affiché ce qu'il savait déjà représenter et a ignoré le reste sans erreur ni invention.

### Résultat observé avec le renderer 0.1.1 inchangé

Ont été représentés correctement :

- le nom Mon Aise ;
- `local` ;
- `bureau` ;
- Windows ;
- `AUTONOME` ;
- le groupe de données ;
- Catalogue JSON ;
- Images personnelles + `optionnel` ;
- `SÉPARÉ DES BINAIRES`.

N'ont pas encore été représentés :

- `socle_technique.runtime = electron` ;
- `socle_technique.langage = javascript / typescript` ;
- `socle_technique.bibliotheque_graphique = react` ;
- `donnees.configurations_csv` ;
- `donnees.sauvegardes`.

Ce test confirme qu'un modèle peut contenir plus de sens que le renderer courant sans devenir invalide.

### Membres ouverts des groupes

Les champs d'un groupe sémantique ne doivent pas être déformés pour satisfaire le renderer.

Par exemple, Electron reste :

```text
socle_technique.runtime = electron
```

et n'a pas à être artificiellement rangé dans `langage` ou `bibliotheque_graphique`.

Graphiquement, plusieurs natures sémantiques peuvent partager la même représentation de membre d'un groupe.

Le renderer doit donc progressivement savoir parcourir les membres présents de `socle_technique` et de `donnees` au lieu de dépendre uniquement de clés propres à Mon GPT<3.

### Alias d'application

Une application peut fournir un identifiant machine simple et stable :

```text
appli.nom = Mon GPT<3
appli.alias = mon_gpt
```

ou :

```text
appli.nom = Mon Aise
appli.alias = mon_aise
```

`nom` reste le libellé humain.

`alias` sert aux usages techniques légers du renderer, notamment la recherche d'un asset d'identité sous la forme :

```text
assets/projets/<alias>/<alias>.<extension>
```

L'alias doit rester simple, sans espace ni accent, avec des caractères de type `a-z`, `0-9` et `_`.

La présence d'un alias n'impose pas la présence d'un asset. Si aucun fichier correspondant n'existe, aucune image n'est affichée et aucune image de remplacement n'est inventée.

L'alias n'est pas destiné à remplacer les clés d'objets dans `relations` : `appli` reste la référence de l'objet principal dans le modèle.

### Lecture partielle

Lorsqu'un spécimen est valide mais que le renderer ne sait pas encore représenter toutes les informations qu'il contient, le rendu doit le signaler discrètement.

La représentation retenue est simplement :

```text
alpha-0.0.0.1 ⚠
```

Le symbole `⚠` signifie : **lecture / représentation partielle par le renderer courant**.

Ce n'est pas une erreur de schéma et aucun texte explicatif visible ne doit alourdir la vue.

Ces évolutions ouvrent le contrat expérimental **schema_version 0.1.2**.


## 19. Correction TG-005a — ouverture ≠ affichage aveugle

Le test manuel suivant a révélé une dérive dans TG-005 :

```js
socle_technique: {
  runtime: "electron",
  langage: "javascript / typescript",
  bibliotheque_graphique: "react",
  canexistepas: "ondevraitavoirlapastilledavertissement"
}
```

Le renderer TG-005 affichait `canexistepas` comme une quatrième technologie. Ce comportement est incorrect.

### Principe corrigé

> **Un schéma ouvert n'autorise pas le renderer à donner un sens graphique à n'importe quelle clé.**

Le vocabulaire sémantique reste significatif.

Pour le socle technique, les natures actuellement reconnues sont notamment :

- `runtime` ;
- `langage` ;
- `bibliotheque_graphique`.

Une clé inconnue :

- reste valide dans le modèle permissif ;
- n'est pas représentée graphiquement ;
- déclenche le signal discret `⚠`.

Même principe pour les propriétés internes des familles de données : seules les propriétés que le renderer sait interpréter sémantiquement doivent être consommées et représentées.

L'ouverture du modèle signifie que de nouveaux éléments peuvent exister sans rendre le spécimen invalide. Elle ne signifie pas que le renderer doit tout afficher coûte que coûte.

### Identité visuelle

L'identité visuelle d'une application reste pilotée par :

```text
appli.alias
```

L'objectif est qu'un asset correspondant à l'alias suffise à lui seul. Un inventaire manuel séparé des fichiers d'identité n'est pas retenu comme principe du protocole.

La recherche d'asset doit rester légère, sans réintroduire de dépendance au nom humain de l'application.


## 20. Correction TG-005b — identité par alias sous serveur local et signal intégré à la version

### Alias d'application

`appli.alias` reste un identifiant machine stable de l'application, indépendant de l'existence actuelle d'une mascotte.

Exemples :

```text
appli.nom = Mon GPT<3
appli.alias = mon_gpt
```

```text
appli.nom = Mon Aise
appli.alias = mon_aise
```

Le renderer utilise l'alias pour rechercher une identité graphique conventionnelle, actuellement :

```text
assets/projets/<alias>/<alias>.png
```

La présence d'un alias n'impose pas la présence de l'asset.

Pour éviter les erreurs de chargement propres à l'ouverture directe `file://`, le prototype est servi par un mini serveur HTTP local. Le renderer peut alors tester l'existence de l'asset par une requête légère, par exemple `HEAD`, et ne créer l'image que si la ressource existe.

Principe :

- alias présent + asset présent → identité affichée ;
- alias présent + asset absent → aucune identité, aucune erreur visible ;
- aucun inventaire manuel ;
- aucun champ supplémentaire de présence ;
- aucune dépendance au nom humain.

Le mini serveur local est un moyen d'exécution du prototype, pas une nouvelle couche sémantique de Trucagramme.

### Signal de lecture partielle

Le signal de lecture partielle reste minimal, mais son rendu doit appartenir au même langage visuel que les propriétés attachées aux cadres.

Il doit être représenté comme une **petite languette / bulle attachée à la pastille de version**, comparable dans son principe à `AUTONOME` ou `SÉPARÉ DES BINAIRES`, plutôt que comme un caractère isolé posé à côté.

Le contenu reste aussi sobre que possible : un pictogramme court suffit. Aucun texte explicatif visible n'est ajouté.

## 21. Lecteur Trucagramme — interface discrète et présentation contextuelle

Le protocole graphique reste la surface principale. Le lecteur peut ajouter une interface autour de cette surface, mais celle-ci doit rester **discrète et secondaire**.

### Interface du lecteur

Le lecteur peut proposer un petit déclencheur `trucagramme™` (ou équivalent proche) presque caché au repos.

Au survol ou au clic, il révèle une interface légère contenant au minimum :

- navigation entre les projets connus du lecteur ;
- commande `Présentation` pour le projet courant.

Cette interface appartient au **lecteur**, pas au diagramme de niveau 1.

Elle ne doit pas déplacer, réduire ni restructurer le Trucagramme affiché.

### Présentation fonctionnelle

Un projet peut fournir une courte présentation fonctionnelle destinée à répondre rapidement à « qu'est-ce que fait ce machin ? ».

Cette présentation :

- est contextuelle ;
- reste très courte, idéalement 4 à 6 lignes ;
- décrit ce que fait l'outil du point de vue fonctionnel ;
- n'est ni un README, ni une documentation utilisateur complète, ni une explication technique.

Elle s'ouvre dans un panneau superposé arrivant depuis la droite.

Le panneau :

- ne remplace jamais la vue technique ;
- ne provoque aucun reflow du diagramme ;
- peut temporairement masquer une partie du Trucagramme ;
- se ferme par un nouveau clic sur `Présentation`, par sa croix, par clic hors panneau et naturellement par `Échap` ;
- utilise une animation courte et discrète.

### Titre du spécimen

Le titre actuel de type :

```text
Mon Aise — schéma technique
```

est trop dominant.

Le lecteur connaît déjà le contexte Trucagramme ; le titre principal peut donc être réduit au nom du projet :

```text
Mon Aise
```

La typographie et la taille doivent être nettement plus discrètes, tout en restant clairement identifiables.

Le numéro de version et son éventuel signal de lecture partielle restent associés au titre.

### Séparation des responsabilités

Le diagramme de niveau 1 reste permanent.

Le lecteur ajoute temporairement :

- navigation ;
- contexte ;
- présentation fonctionnelle.

La présentation ne devient pas un nouvel objet du diagramme et ne doit pas être reliée par une flèche.

Ces évolutions ouvrent le contrat expérimental **schema_version 0.1.3** pour les métadonnées de projet consommées par le lecteur.


## 22. Vues système du lecteur — accueil et projet introuvable (0.1.4)

Le lecteur distingue désormais trois états explicites :

- aucune valeur `?projet` → **accueil Trucagramme** ;
- alias connu → rendu du projet ;
- alias demandé mais inconnu → **projet introuvable**.

Le lecteur ne doit plus remplacer silencieusement ces deux premiers cas par le premier projet de `projets/index.json`.

### Spécimens système

Les vues d'accueil et de projet introuvable disposent elles aussi d'une source de données séparée du rendu :

```text
projets/accueil/specimen.js
projets/404/specimen.js
```

Ces spécimens sont des **spécimens système du lecteur**.

Ils ne sont pas des projets utilisateur et ne doivent donc pas apparaître dans :

```text
projets/index.json
```

Leur contenu décrit ce que la vue système doit raconter ; leur rendu exceptionnel appartient au lecteur.

### Rendus spéciaux

Le lecteur possède des fonctions distinctes :

```text
rendreAccueil()
rendreProjetIntrouvable()
rendreSpecimen()
```

Les deux premières peuvent utiliser librement la grammaire visuelle Trucagramme — cadres, groupes, couleurs, flèches, languettes — sans prétendre représenter une architecture applicative réelle.

Il ne faut donc pas créer un faux `appli` uniquement pour réutiliser `rendreDiagramme()`.

### Accueil

La page d'accueil doit immédiatement évoquer Trucagramme.

Elle peut proposer une composition illustrative construite avec les formes du langage et une animation d'entrée légère : apparition progressive de blocs, groupes et flèches.

Cette animation :

- reste courte ;
- ne doit pas devenir une démonstration spectaculaire ;
- respecte `prefers-reduced-motion` ;
- n'ajoute aucune dépendance.

Le menu `trucagramme™` reste disponible pour ouvrir les vrais projets.

### Projet introuvable

Pour une URL comme :

```text
?projet=mbolo
```

le lecteur affiche clairement et poliment que le projet demandé n'existe pas.

La page doit conserver une forte identité Trucagramme et utiliser ses formes graphiques plutôt qu'un message d'erreur HTML générique.

L'alias demandé peut être affiché dans la composition.

Le menu reste disponible pour rejoindre un projet valide.

Ces évolutions ouvrent le contrat expérimental **schema_version 0.1.4**.


## 23. Troisième spécimen réel — Chrome Organizer et objets de données externes (0.1.5)

Chrome Organizer introduit un cas de niveau 1 différent de Mon GPT<3 et Mon Aise.

L'application ne travaille pas principalement avec un groupe de données internes. Elle lit et produit plusieurs **objets de données externes** :

- le dossier Chrome `User Data`, utilisé comme source ;
- des sauvegardes locales ;
- des exports JSON / HTML ;
- une copie de restauration fonctionnelle expérimentale.

Le spécimen correspondant conserve le principe : les objets existent explicitement et les relations disent seulement comment ils sont reliés.

### Objet externe de données

Un objet externe peut porter des informations telles que :

```text
nom
type
role
format / formats
lecture_seule
integrite
statut
```

Ces propriétés restent sémantiques. Le renderer ne doit représenter que celles dont le sens graphique est défini.

### Source en lecture seule

Le dossier Chrome `User Data` est représenté comme une source externe de données :

```text
type = dossier_donnees
role = source
lecture_seule = true
```

La propriété `lecture_seule` peut être rendue comme une courte languette ou pastille attachée à l'objet.

### Sauvegardes : deux relations opposées

Une sauvegarde peut être créée par l'application puis relue par elle.

Le modèle conserve deux relations élémentaires :

```text
appli -> sauvegardes
sauvegardes -> appli
```

Aucun champ `direction = bidirectionnelle` n'est ajouté.

Le renderer peut rapprocher visuellement ces deux relations, mais il doit préserver le fait qu'il s'agit de **deux relations distinctes**.

Sur bureau, la représentation préférée est deux flèches parallèles, l'une dans chaque sens, par exemple :

```text
        ---->
Appli          Sauvegardes
        <----
```

Ne pas fusionner automatiquement ces deux faits en un symbole unique `↔`.

### Formats multiples

Un objet peut déclarer plusieurs formats :

```text
formats = [json, html]
```

Le renderer peut afficher cette liste de manière compacte sans inventer une relation entre ces formats.

### Intégrité et statut

Les sauvegardes peuvent porter :

```text
integrite = sha256
```

La copie de restauration peut porter :

```text
statut = experimental
```

Ces informations qualifient leur objet ; elles ne deviennent pas des objets autonomes.

### Mise en page de niveau 1

La disposition doit préserver l'application principale comme centre visuel.

Une composition plausible est :

- source Chrome User Data à gauche ;
- application principale au centre ;
- sauvegardes, exports et copie de restauration à droite, éventuellement empilés.

La disposition exacte reste du ressort du renderer et doit rester lisible sur bureau et mobile.

Ces évolutions ouvrent le contrat expérimental **schema_version 0.1.5**.

## TG-009a — Forme des données externes (0.1.6)

Le vert identifie la famille des données. À l’intérieur de cette famille, le type choisit la silhouette : un dossier pour un espace de données, une boîte à couvercle pour une archive locale, une feuille par format pour les fichiers produits. Le rôle destination donne un contour discontinu au dossier préparé. La languette de statut et les qualifications restent attachées à l’objet qu’elles décrivent.

Un cadre léger portant le nom du contexte peut entourer la forme. Ainsi « Chrome » situe le dossier User Data. L’unique flèche entrante part du dossier. L’archive garde ses deux relations opposées et le groupe de feuilles reçoit une seule relation.


## TG-009b — Objets intrinsèques, contexte structurel et placement équilibré (0.1.7)

TG-009a a confirmé l'intérêt de donner une forme propre aux objets externes, mais a aussi révélé deux confusions à corriger.

### Le sens directionnel appartient à la relation

Un objet n'est pas intrinsèquement une source ou une destination.

Les propriétés telles que :

```text
role = source
role = destination
```

ne doivent pas être utilisées pour décrire la direction d'un échange.

La direction est déjà entièrement portée par :

```text
relation.source
relation.destination
```

Les sauvegardes de Chrome Organizer le démontrent : le même objet est destination dans une relation et source dans une autre.

Principe :

> **L'objet dit ce qu'il est. La relation dit dans quel sens quelque chose circule.**

Le renderer ne doit donc pas utiliser un rôle directionnel de l'objet pour choisir sa position ou orienter ses flèches.

### Le contexte est une structure, pas une propriété répétée

Un contexte qui contient un ou plusieurs objets devient un véritable élément structurel.

Préférer une structure de ce type :

```js
chrome: {
  nom: "Chrome",
  type: "contexte",
  contient: ["chrome_user_data"]
},

chrome_user_data: {
  nom: "User Data",
  type: "dossier_donnees",
  lecture_seule: true
}
```

à :

```js
chrome_user_data: {
  ...,
  contexte: { nom: "Chrome" }
}
```

Le contexte peut ainsi contenir plusieurs objets sans répéter son identité.

`contient` référence des objets effectivement déclarés dans le modèle. Il exprime une appartenance / inclusion et ne crée aucun flux.

### La position n'encode pas la direction

Trucagramme ne réserve pas la gauche aux entrées ni la droite aux sorties.

La position sert à équilibrer et structurer la vue.

La flèche porte seule le sens de la relation.

Ainsi un objet placé à gauche peut parfaitement recevoir une flèche venant de l'application, et un objet placé à droite peut envoyer une flèche vers elle.

Principe :

> **Position = composition. Flèche = direction.**

### Règle de placement des objets externes

L'ordre de référence est l'ordre de déclaration des unités externes dans le spécimen. Un contexte avec ses objets contenus constitue une seule unité de placement autour de l'application.

- **1 unité externe** : si une seule relation directe existe avec l'application, placer à gauche pour `objet -> appli` et à droite pour `appli -> objet`. Un cas à deux sens doit utiliser un choix de rendu déterministe sans ajouter de sémantique au modèle.
- **2 à 6 unités externes** : la direction des relations n'intervient plus dans le placement. Alterner simplement selon l'index : 0 gauche, 1 droite, 2 gauche, 3 droite, etc.
- **7 unités ou plus** : la grammaire prévoit d'ouvrir également des positions en haut et en bas. Aucun algorithme quatre côtés n'est figé tant qu'un cas réel à 7+ objets ne l'exige.

La règle 2–6 est donc volontairement simple :

```js
cote = index % 2 === 0 ? "gauche" : "droite"
```

Elle vise un diagramme équilibré et reproductible sans moteur de placement complexe.

### Conséquence pour Chrome Organizer

Dans l'ordre actuel des quatre unités :

1. contexte Chrome / User Data → gauche ;
2. Sauvegardes → droite ;
3. Exports JSON / HTML → gauche ;
4. Copie de restauration → droite.

Les cinq relations conservent leurs directions propres, indépendamment de ces positions.

Ces corrections ouvrent le contrat expérimental **schema_version 0.1.7**.


## TG-009c — La couleur classe, la forme explique (raffinement visuel, schéma inchangé)

Ce raffinement ne modifie pas le contrat sémantique : `schema_version 0.1.7` reste courant.

### Couleur de famille

Le vert reste associé à la famille des données, mais il ne doit pas transformer tous les objets de cette famille en masses visuelles identiques.

Principe :

> **La couleur classe ; la forme explique.**

Le vert peut donc devenir principalement un accent :

- contour ;
- détail ;
- petite surface ;
- qualification ;
- repère de famille.

Les grandes surfaces peuvent rester plus neutres afin que dossier, archive et fichier se distinguent d'abord par leur silhouette.

### Identité d'un contexte connu

Un contexte peut disposer d'une identité visuelle immédiatement reconnaissable sans modifier sa sémantique.

Pour le contexte Chrome, le renderer peut utiliser un petit marqueur inspiré de l'identité Chrome — rouge, jaune, vert et centre bleu — de préférence construit en CSS afin de ne pas introduire un asset externe inutile.

Le marqueur reste discret et secondaire au nom du contexte.

### Le modèle peut savoir plus que la vue

Une information sémantique reconnue n'a pas besoin d'être affichée si sa représentation n'apporte pas de sens utile au niveau 1.

Exemple :

```text
sauvegardes.format = dossier
```

peut rester dans le modèle tout en étant consommé sans afficher la pastille « dossier », lorsque la forme d'archive et les autres qualifications suffisent.

### Une propriété ne doit pas être exprimée deux fois sans raison

Le statut :

```text
statut = experimental
```

est explicitement rendu par la languette `EXPÉRIMENTAL`.

Le contour pointillé ne doit donc pas signifier lui aussi « expérimental » si cela crée une ambiguïté avec d'autres notions possibles comme futur, absent, virtuel ou optionnel.

La copie de restauration garde une silhouette normale de dossier ; la languette porte seule le statut expérimental.

### Fichiers produits

Les feuilles JSON / HTML restent volontairement simples. Leur forme de fichier et leur libellé court suffisent ; aucun logo de format supplémentaire n'est nécessaire.


## TG-010 — Légende contextuelle du lecteur et économie de texte (schéma inchangé)

Ce raffinement appartient au lecteur et ne modifie pas le contrat sémantique : `schema_version 0.1.7` reste courant.

### Une identité graphique peut remplacer son nom visible

Lorsqu'une identité graphique est suffisamment reconnaissable et qu'aucune ambiguïté utile ne subsiste, le renderer peut éviter de répéter le nom humain à côté.

Le nom reste présent dans le modèle et dans l'accessibilité.

Exemple actuel : le contexte Chrome peut être identifié visuellement par son petit marqueur aux couleurs Chrome sans afficher simultanément le mot « Chrome ».

Principe :

> **Un signe qui dit déjà clairement quelque chose n'a pas besoin d'être immédiatement répété en texte.**

### Légende du lecteur

La légende appartient au **lecteur Trucagramme**, pas au spécimen décrit.

Elle explique la grammaire graphique utilisée pour représenter le projet courant ; elle n'explique pas le projet lui-même.

La légende est **contextuelle** : elle ne montre que les familles de signes réellement présentes dans le diagramme courant.

Elle peut inclure selon le cas :

- application principale ;
- socle technique ;
- données internes ;
- contexte ;
- dossier / espace de données ;
- archive ;
- fichier ;
- application compagnon ;
- navigateur / surface externe ;
- relation / flux ;
- propriété.

La légende doit utiliser de petites représentations des signes eux-mêmes et un libellé court, plutôt qu'une documentation textuelle.

Elle est accessible depuis le menu `trucagramme™` et s'affiche dans un panneau superposé sans provoquer de reflow du diagramme.

La légende n'ajoute aucun champ aux `specimen.js` et ne doit pas être maintenue projet par projet.


## TG-011 — Le signal de lecture partielle inventorie le sens non rendu (schéma inchangé)

Ce raffinement appartient au lecteur / renderer et ne modifie pas le contrat sémantique : `schema_version 0.1.7` reste courant.

Le signal `⚠` ne signifie pas seulement qu'une partie du modèle n'est pas représentée. Il peut donner un **inventaire compact** de ce que le renderer voit mais ne sait pas encore dessiner.

Principe :

> **Je ne sais pas encore le dessiner, mais je sais qu'il existe.**

### Ce que l'inventaire peut montrer

Pour un objet de premier niveau non rendu dont le type est connu dans le modèle mais inconnu du renderer :

```text
shell_windows · service_systeme
vscode · outil_externe
serveur_local · service_local
```

Le libellé utilise la **clé technique** de l'objet et son `type`, sans inventer d'explication.

Pour une propriété inconnue dans un objet par ailleurs rendu :

```text
sauvegardes.canexistepas
```

La valeur inconnue n'est pas affichée.

Pour des relations restant non consommées :

```text
relations · 18 non représentées
```

Le lecteur ne détaille pas chaque relation une par une dans cette vue compacte.

### Ce que l'inventaire ne doit pas devenir

Il ne doit pas :

- afficher un dump JSON ;
- exposer des valeurs longues ou sensibles ;
- interpréter les clés inconnues ;
- inventer des libellés humains ;
- devenir un debugger ou une documentation technique.

### Interaction

Le signal reste minuscule et attaché à la version.

Son détail doit être accessible :

- au survol sur poste de bureau ;
- au focus clavier ;
- au clic / toucher pour les appareils sans survol.

La bulle détaillée reste temporaire, compacte et attachée au signal. Elle ne provoque aucun reflow du diagramme.

Si rien ne reste à représenter, le signal et sa bulle restent absents.


## TG-012 — Outils pilotés internes et couche de construction DEBUG (0.1.8)

Mon Bureau introduit une distinction importante entre **processus externe** et **objet externe dans la vue de niveau 1**.

Un exécutable peut être techniquement séparé de l'application tout en étant **intériorisé dans son expérience** : l'application le lance sans fenêtre propre, récupère ses sorties et présente le résultat dans sa propre interface.

### Outils pilotés

Git, curl, PowerShell, tree et Python sont des exemples d'**outils pilotés** par Mon Bureau.

Ils restent de vrais objets sémantiques afin de pouvoir être référencés par d'autres relations, mais leur appartenance au fonctionnement interne de l'application est exprimée par un groupe de références :

```js
appli: {
  ...
  outils_pilotes: [
    "git",
    "curl",
    "python",
    "powershell",
    "tree"
  ]
}
```

Chaque objet référencé conserve sa propre déclaration de premier niveau :

```js
git: {
  nom: "Git",
  type: "outil_pilote"
}
```

Le renderer place ces objets dans un troisième groupe interne de l'application, au même niveau visuel que **Socle technique** et **Données**.

L'inclusion dans `outils_pilotes` raconte déjà l'usage de l'outil par l'application. Les relations répétitives `appli -> outil` et `outil -> appli` n'ont donc plus à être conservées lorsqu'elles n'apportent aucune information supplémentaire de niveau 1.

Une relation entre un outil piloté et un autre objet reste en revanche pertinente. Exemple :

```text
python -> serveur_local
```

### Application externe visible

Une application réellement ouverte dans sa propre fenêtre reste extérieure au bloc principal.

Visual Studio Code est le premier cas :

```js
vscode: {
  nom: "Visual Studio Code",
  type: "application_externe"
}
```

Cette distinction empêche de représenter Git/curl/Python comme s'ils ouvraient chacun une application indépendante.

### Autonomie

`AUTONOME` doit rester réservé aux cas où la distribution décrite ne dépend pas, pour les fonctions représentées au niveau 1, d'outils installés séparément.

Mon Bureau embarque son runtime .NET mais certaines fonctions reposent sur Git, curl, Python, VS Code ou d'autres outils du poste. Sa propriété `livraison = autonome` est donc retirée de son spécimen.

L'absence de `livraison` ne signifie pas automatiquement « non autonome » ; elle signifie seulement que cette propriété n'est pas affirmée.

### Couche DEBUG du spécimen

Un spécimen peut activer une couche d'aide à la construction :

```js
specimen: {
  version: "alpha-0.0.0.1",
  debug: true
}
```

`debug` appartient aux métadonnées du spécimen / lecteur. Il ne décrit pas l'application.

Quand `debug = true`, le renderer peut afficher autour du diagramme un **cartouche de construction clairement identifié DEBUG**, contenant des représentations fantômes des objets qu'il ne sait pas encore dessiner.

Ces formes de debug :

- affichent au minimum la clé technique et le `type` ;
- restent visuellement distinctes de la grammaire stabilisée ;
- peuvent utiliser une disposition provisoire utile à la conception ;
- ne sont jamais considérées comme une représentation comprise.

Principe fondamental :

> **Afficher en DEBUG ne consomme aucun sens.**

Le même reste du modèle continue donc d'alimenter intégralement `⚠`.

Quand `debug = false` ou absent, aucun cartouche DEBUG n'est affiché.

### Relation entre DEBUG et lecture partielle

Les deux mécanismes sont indépendants :

```text
reste du modèle
   ├──> ⚠ inventaire compact
   └──> couche DEBUG graphique (si activée)
```

La couche DEBUG ne modifie ni le contenu, ni le compteur, ni la présence de la bulle de lecture partielle.

Ces évolutions ouvrent le contrat expérimental **schema_version 0.1.8**.


## TG-013 — Types intrinsèques lisibles et première représentation d’un éditeur (0.1.9)

Mon Bureau confirme qu'un objet externe ne doit pas porter dans son `type` l'information « externe ». Cette information est déjà visible par sa position hors de l'application et par ses relations.

Visual Studio Code devient donc :

```js
vscode: {
  nom: "Visual Studio Code",
  type: "editeur"
}
```

Le type raconte **ce qu'est l'objet**. Le rendu raconte **où il se trouve par rapport à l'application**.

Principe :

> **La nature appartient à l'objet ; l'extériorité appartient à la composition.**

Cette règle généralise ce qui existe déjà avec `type = navigateur`.

### Éditeur

`editeur` devient une nouvelle nature reconnue au niveau 1.

Sa représentation peut prendre la forme d'une petite fenêtre / surface d'édition reconnaissable, enrichie par l'identité propre de l'éditeur lorsqu'un asset est disponible.

Pour VS Code, l'asset canonique est :

```text
assets/communs/vscode.png
```

Le nom humain reste dans le modèle et l'accessibilité. Si le logo suffit visuellement, il n'a pas besoin d'être répété en grand dans le diagramme.

### Économie de texte dans les groupes internes

Un groupe interne peut être identifié par sa couleur, sa forme et la légende sans afficher son nom comme titre visible.

Le groupe `Outils pilotés` conserve son identité accessible et son entrée dans la légende, mais son titre visible peut disparaître.

La couleur du groupe doit être distincte des familles déjà utilisées. En particulier, elle ne doit pas rappeler l'orange / brun du compagnon Mon GPT Collector.

### DEBUG

Le cartouche DEBUG est un outil de construction. Une fois sa convention visuelle comprise (gris, pointillé, typographie technique), le texte « DEBUG · non représenté » n'est plus nécessaire dans chaque cartouche.

La nature DEBUG reste évidente par son traitement graphique et n'appartient toujours pas à la grammaire stabilisée.

Ces évolutions ouvrent le contrat expérimental **schema_version 0.1.9**.
