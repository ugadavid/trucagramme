# TG-006 — Premier lecteur Trucagramme : interface discrète, navigation et présentation

## Contexte

Les missions TG-001 à TG-005b ont stabilisé un premier langage graphique et son renderer sur deux applications réelles :

- Mon GPT<3 ;
- Mon Aise.

Le diagramme de niveau 1 fonctionne désormais comme surface technique principale.

La nouvelle étape consiste à construire **le début du lecteur Trucagramme autour du protocole**, sans modifier le sens du diagramme lui-même.

Cette mission ouvre le contrat expérimental :

```js
schema_version: "0.1.3"
```

Le changement porte principalement sur des métadonnées de projet consommées par le lecteur.

## Décision de conception

Le Trucagramme reste **permanent et central**.

L'interface du lecteur doit être presque invisible lorsqu'elle n'est pas utilisée.

La présentation fonctionnelle d'un projet est une information contextuelle temporaire :

- elle ne remplace jamais la vue technique ;
- elle ne pousse pas le diagramme ;
- elle peut le masquer partiellement pendant quelques secondes ;
- l'utilisateur la lit, la ferme et revient exactement à son Trucagramme.

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-005b/rapport.md`

Examiner ensuite :

- `protocole_mon_gpt_alpha/index.html`
- `protocole_mon_gpt_alpha/app.js`
- `protocole_mon_gpt_alpha/rendu.js`
- `protocole_mon_gpt_alpha/styles.css`
- `protocole_mon_gpt_alpha/specimen-mon-aise.js`
- `protocole_mon_gpt_alpha/specimen.js`
- `assets/`

Le prototype continue à être servi par un mini serveur HTTP local, par exemple :

```powershell
py -3 -m http.server 8000 --bind 127.0.0.1
```

## Objectif général

Ajouter une **coquille de lecteur très discrète** autour du diagramme existant avec trois fonctions seulement :

1. navigation entre les projets disponibles ;
2. commande `Présentation` ;
3. panneau contextuel de présentation venant de la droite.

En profiter pour alléger fortement le titre principal.

Ne pas transformer Trucagramme en application à barre d'outils.

## 1. Interface du lecteur

Créer un petit déclencheur discret, de type :

```text
trucagramme™
```

ou une formulation visuelle très proche.

### Comportement attendu

Au repos :

- le déclencheur est petit ;
- il ne concurrence ni le titre ni le diagramme ;
- il peut être fixé à un bord ou à un coin de la fenêtre.

Au survol ou au clic :

- une petite interface se déploie ;
- animation courte et douce ;
- aucun déplacement du diagramme ;
- aucun changement de taille du diagramme.

Cette interface contient seulement, pour cette mission :

- navigation entre projets ;
- `Présentation`.

### Navigation

Le lecteur connaît actuellement deux projets :

- Mon Aise ;
- Mon GPT<3.

La navigation peut recharger la page avec le spécimen choisi.

**Pas besoin d'une SPA.**

Une solution légère par paramètre d'URL, petite table de projets ou mécanisme équivalent est acceptable.

Exemple indicatif :

```text
?projet=mon_aise
?projet=mon_gpt
```

Le choix technique exact est libre tant qu'il reste simple et que le lecteur ne duplique pas inutilement toute la sémantique des spécimens.

### Important

La liste des projets appartient au **lecteur**.

Elle ne doit pas devenir une relation du diagramme.

Ne pas dessiner Mon Aise et Mon GPT<3 comme objets liés entre eux.

## 2. Métadonnée de présentation

Ajouter aux deux spécimens une métadonnée de projet reconnue par le lecteur.

La forme exacte peut rester légère. Exemple possible :

```js
projet: {
  presentation: [
    "...",
    "..."
  ]
}
```

ou un petit texte structuré équivalent.

Cette métadonnée est consommée par le lecteur et ne doit pas être interprétée comme un objet du diagramme ni déclencher `⚠`.

### Mon GPT<3 — contenu attendu

Rester très court, environ 4 lignes :

```text
Gestionnaire local de fils ChatGPT.
Il permet d'organiser, rechercher et retrouver ses conversations.
Les informations peuvent être importées depuis Mon GPT Collector.
Les données restent stockées localement sur le poste.
```

Le contenu peut être légèrement reformulé pour la fluidité, mais ne pas l'allonger.

### Mon Aise — contenu attendu

Rester également autour de 4 à 5 lignes :

```text
Catalogue personnel pour conserver et retrouver des objets, sites et curiosités.
Chaque fiche peut réunir noms, surnoms, lien, commentaire, catégories et dates.
La recherche aide à retrouver rapidement une fiche.
Le cabinet conserve ses données localement et permet des imports, exports et sauvegardes.
```

Ne pas transformer ces textes en argumentaire commercial.

## 3. Panneau « Présentation »

Le bouton `Présentation` ouvre un panneau **superposé** depuis la droite.

### Principe essentiel

Le panneau :

- ne remplace jamais le diagramme ;
- ne provoque aucun reflow ;
- ne redimensionne pas le diagramme ;
- peut masquer une partie de Mon GPT<3, y compris le navigateur externe : ce n'est pas un problème ;
- est temporaire.

### Aspect

Chercher quelque chose de :

- léger ;
- propre ;
- calme ;
- cohérent avec la palette actuelle ;
- largeur approximative 320–380 px sur bureau ;
- largeur adaptée sur petit écran ;
- ombre légère ;
- animation JS/CSS courte et élégante.

Pas de gros modal plein écran sur bureau.

### Contenu

Le panneau contient uniquement :

- nom du projet ;
- présentation courte ;
- petite croix de fermeture.

Pas de fiche technique supplémentaire.

### Fermeture

Le panneau se ferme par :

1. nouveau clic sur `Présentation` ;
2. clic sur sa croix ;
3. clic à l'extérieur du panneau ;
4. touche `Échap`.

Après fermeture, le diagramme doit retrouver exactement son état précédent.

## 4. Titre principal

Le titre actuel :

```text
Mon Aise — schéma technique
```

est trop grand et trop lourd.

### Nouveau principe

Afficher simplement :

```text
Mon Aise
```

ou :

```text
Mon GPT<3
```

Le lecteur sait déjà qu'il affiche un Trucagramme.

### Style

Réduire nettement la taille du titre.

Chercher un style plus élégant et plus identitaire que le gros H1 actuel, mais rester sobre.

Le titre doit rester :

- immédiatement lisible ;
- secondaire par rapport au diagramme ;
- cohérent sur bureau et mobile.

La pastille de version reste associée au titre, avec sa languette de lecture partielle lorsqu'elle est nécessaire.

Ne pas modifier le titre interne du bloc application.

## 5. Séparation lecteur / renderer

Cette mission doit clarifier les responsabilités.

### Renderer du diagramme

Il reste responsable de :

- application ;
- socle ;
- données ;
- compagnons ;
- navigateur ;
- relations ;
- propriétés graphiques ;
- lecture partielle du contenu technique.

### Lecteur

Il devient responsable de :

- choix du projet ;
- interface escamotable ;
- présentation contextuelle ;
- titre externe / habillage général.

Le lecteur peut consommer `projet.presentation` avant de transmettre ou laisser le reste au renderer.

Une métadonnée correctement reconnue par le lecteur ne doit pas rester comme « sens non interprété » dans le calcul du `⚠`.

## 6. Passage en schema_version 0.1.3

Mettre les deux spécimens à :

```js
schema_version: "0.1.3"
```

Conserver toutes les décisions sémantiques précédentes.

Le renderer / lecteur accepte le contrat courant 0.1.3.

Pas de migration.

## 7. Navigation légère : contrainte de simplicité

Le mécanisme actuel charge directement un fichier de spécimen.

Pour naviguer entre deux projets, une petite adaptation est nécessaire.

Choisir la solution la plus simple qui permette :

- démarrage par défaut sur Mon Aise ;
- passage à Mon GPT<3 ;
- retour à Mon Aise ;
- rechargement direct d'une URL projet si un paramètre est utilisé ;
- aucun conflit de déclaration JS entre plusieurs spécimens.

Il est acceptable de recharger la page lors d'un changement de projet.

Ne pas construire :

- routeur ;
- framework ;
- système de plugins ;
- état global complexe ;
- persistance du dernier projet ;
- historique avancé.

## 8. Tests ciblés

### Interface au repos

Vérifier :

- lecteur discret ;
- diagramme inchangé ;
- aucun reflow ;
- titre allégé.

### Déploiement du lecteur

Vérifier :

- survol ou clic ouvre proprement ;
- navigation visible ;
- bouton Présentation visible ;
- fermeture / repli naturel ;
- aucune gêne avec le diagramme.

### Navigation

Passer :

- Mon Aise → Mon GPT<3 ;
- Mon GPT<3 → Mon Aise.

Vérifier que chaque diagramme reste conforme à TG-005b.

### Présentation

Pour chaque projet :

- ouvrir le panneau ;
- texte correct et court ;
- diagramme non déplacé ;
- fermer par bouton Présentation ;
- fermer par croix ;
- fermer par clic extérieur ;
- fermer par Échap.

### Superposition

Avec Mon GPT<3 :

- le panneau peut recouvrir temporairement une partie du navigateur ou d'un objet externe ;
- aucun repositionnement automatique du diagramme n'est attendu.

### Lecture partielle

Ajouter temporairement la clé de recette connue :

```js
socle_technique.canexistepas = "ondevraitavoirlapastilledavertissement"
```

Vérifier :

- languette de lecture partielle toujours fonctionnelle ;
- métadonnée `projet.presentation` ne provoque pas de `⚠`.

### Identités

Vérifier :

- Mon GPT<3 conserve `mon_gpt.png` ;
- Mon Aise conserve son alias même sans mascotte ;
- console propre via serveur HTTP local.

### Responsive

Vérifier au minimum :

- 1448 px ;
- 390 px ;
- 320 px.

Sur petit écran, le panneau Présentation peut prendre davantage de largeur, mais doit rester fermable facilement.

## À ne pas faire

Ne pas :

- créer TG-007 ;
- ajouter une barre d'outils permanente ;
- faire de Présentation une vue qui remplace le diagramme ;
- pousser le diagramme quand le panneau s'ouvre ;
- créer une page de documentation complète ;
- dépasser environ 5–6 lignes de présentation ;
- créer un routeur ou une SPA ;
- ajouter une dépendance ;
- toucher à la grammaire graphique interne sans nécessité ;
- créer des niveaux 2+ ;
- créer un éditeur.

## Livrables

- premier lecteur discret ;
- navigation Mon Aise / Mon GPT<3 ;
- métadonnées de présentation dans les deux spécimens ;
- panneau Présentation superposé ;
- titre externe allégé ;
- contrat `schema_version 0.1.3` ;
- `reports/TG-006/rapport.md` ;
- captures utiles du lecteur fermé, ouvert et du panneau Présentation.

Le rapport doit préciser :

1. séparation retenue entre lecteur et renderer ;
2. mécanisme léger de navigation ;
3. structure choisie pour la présentation ;
4. comportement du panneau et ses quatre modes de fermeture ;
5. traitement de la métadonnée pour éviter un faux `⚠` ;
6. vérification de non-régression des deux diagrammes.

Commit et push sur `main`, vérifier le SHA distant, puis arrêt pour validation humaine.
