# TG-016 — Raccourcis Windows et Explorateur comme objets externes

## Contexte

TG-015 a correctement clarifié la frontière fonctionnelle de la vue 1 :

- ce que Mon Bureau pilote dans sa propre interface reste à l'intérieur ;
- ce qui s'ouvre comme surface indépendante reste à l'extérieur ;
- les mécanismes intermédiaires trop bas niveau, comme le Shell Windows, ne sont pas représentés.

Cette simplification a cependant été poussée trop loin.

Une fonction essentielle de Mon Bureau est de **lancer des applications externes**. L'application sait notamment :

- ouvrir des raccourcis Windows `.lnk` ;
- ouvrir des dossiers dans l'Explorateur Windows.

Si ces capacités n'apparaissent pas, la vue 1 ne permet pas de comprendre complètement ce qu'est Mon Bureau.

TG-016 introduit donc deux nouveaux objets externes de niveau 1 :

- `raccourci_windows` ;
- `explorateur`.

Le contrat passe à :

```js
schema_version: "0.1.13"
```

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-015/rapport.md`
- `projets/mon_bureau/specimen.js`
- `lecteur/rendu.js`
- `lecteur/lecture-partielle.js`
- `lecteur/interactions.js`
- `lecteur/styles.css`

Préserver toutes les décisions stabilisées jusqu'à TG-015 :

- Socle technique interne ;
- Outils pilotés internes ;
- Services système internes ;
- Données internes ;
- VS Code comme éditeur externe ;
- Serveur comme objet externe ;
- DEBUG non consommant ;
- lecture partielle ;
- légende contextuelle ;
- règle de placement des unités externes ;
- position = composition, flèche = direction.

## 1. Passer les six spécimens en 0.1.13

Passer à :

```js
schema_version: "0.1.13"
```

dans :

- `projets/accueil/specimen.js`
- `projets/404/specimen.js`
- `projets/mon_aise/specimen.js`
- `projets/mon_gpt/specimen.js`
- `projets/chrome_organizer/specimen.js`
- `projets/mon_bureau/specimen.js`

Le lecteur attend `0.1.13`.

Les cinq spécimens autres que Mon Bureau ne changent pas sémantiquement.

## 2. Ajouter l'objet Raccourcis Windows

Ajouter au specimen Mon Bureau :

```js
raccourcis_windows: {
  nom: "Raccourcis .lnk",
  type: "raccourci_windows"
}
```

### Sens

Cet objet ne représente pas une application précise.

Il représente une capacité structurante de Mon Bureau :

> lancer une application externe à partir d'un raccourci Windows `.lnk`.

Le fichier `.lnk` est ici l'objet de niveau 1 qui rend cette capacité immédiatement compréhensible.

### Ne pas détailler les cibles

Ne pas ajouter dans ce specimen :

- la liste réelle de tous les raccourcis ;
- VS Code comme contenu de cet objet ;
- Chrome ;
- Mon Aise ;
- TRAME ;
- ou toute autre cible actuelle.

La configuration de Mon Bureau est dynamique. La vue 1 doit raconter la capacité, pas recopier le catalogue utilisateur.

## 3. Représentation graphique du raccourci

Créer une représentation générique reconnaissable de `type = raccourci_windows`.

Piste souhaitée :

- icône de fichier / raccourci ;
- suffixe ou marque `.lnk` ;
- petite flèche de raccourci en surimpression ou traitement équivalent.

Le résultat doit évoquer immédiatement un **raccourci Windows**.

### Assets

Le dépôt ne contient actuellement pas d'asset `.lnk` ou Explorateur.

Il contient notamment :

- `assets/communs/windows.png` ;
- `assets/communs/vscode.png`.

Ne pas télécharger un asset depuis Internet.

Pour TG-016, préférer une forme CSS / HTML simple et réutilisable.

Le pictogramme pourra être repoli lors de la future passe graphique générale.

## 4. Ajouter l'objet Explorateur Windows

Ajouter :

```js
explorateur_windows: {
  nom: "Explorateur Windows",
  type: "explorateur"
}
```

### Sens

Mon Bureau sait ouvrir un dossier dans une surface indépendante de sa propre interface.

L'utilisateur quitte alors fonctionnellement Mon Bureau pour interagir avec l'Explorateur Windows.

Cet objet est donc **externe**.

Il ne représente pas le Shell Windows ni `UseShellExecute`.

## 5. Représentation graphique de l'Explorateur

Créer une forme générique pour :

```text
type = explorateur
```

Elle doit évoquer une surface de gestion de fichiers :

- petite fenêtre ;
- dossier visible ;
- ou combinaison des deux.

Le nom sémantique reste **Explorateur Windows**.

Le texte visible peut être court si la forme suffit.

Ne pas créer un grand logo Windows comme représentation principale.

Le type `explorateur` doit rester suffisamment générique pour qu'un autre gestionnaire de fichiers puisse être représenté plus tard avec une autre identité.

## 6. Relations

Ajouter :

```js
{ source: "appli", destination: "raccourcis_windows" },
{ source: "appli", destination: "explorateur_windows" }
```

Ces deux relations sont **sortantes uniquement**.

Elles racontent :

- Mon Bureau déclenche un raccourci ;
- Mon Bureau ouvre l'Explorateur.

Ne pas ajouter de relation inverse.

Ne pas recréer :

```text
appli -> shell_windows -> ...
```

Le mécanisme intermédiaire reste volontairement hors vue 1.

## 7. Relations finales de Mon Bureau

Après TG-016, le specimen doit avoir cinq relations de niveau 1 :

```js
relations: [
  { source: "appli", destination: "vscode" },

  { source: "appli", destination: "raccourcis_windows" },
  { source: "appli", destination: "explorateur_windows" },

  { source: "appli", destination: "serveur_local" },
  { source: "serveur_local", destination: "appli" }
]
```

Ne pas ajouter d'autres relations dans cette mission.

## 8. Ordre de déclaration et placement

Nous avons désormais quatre unités externes rendues :

1. VS Code ;
2. Raccourcis .lnk ;
3. Explorateur Windows ;
4. Serveur local.

Conserver cet ordre de déclaration logique dans le specimen.

La règle actuelle 2–6 s'applique :

```text
index 0 -> gauche
index 1 -> droite
index 2 -> gauche
index 3 -> droite
```

Résultat attendu sur bureau :

- VS Code : gauche ;
- Raccourcis .lnk : droite ;
- Explorateur Windows : gauche ;
- Serveur local : droite.

Ne pas trier selon le sens des relations.

Ne pas inventer un nouvel algorithme de placement.

Si le renderer actuel ne permet pas proprement deux unités sur chaque côté, adapter la composition existante au strict nécessaire sans ouvrir le chantier 7+.

## 9. Présentation texte de Mon Bureau

Mettre à jour légèrement la présentation pour rétablir la fonction centrale de lancement.

Elle doit rester courte.

Une formulation proche de ceci est acceptable :

```text
Cockpit Windows pour lancer et administrer des projets, applications, dossiers et outils techniques.
Il s'appuie sur une configuration JSON locale pour organiser les lanceurs et les catégories.
Depuis son interface, il pilote des outils installés et mobilise des services système Windows.
Il lance des applications via des raccourcis, ouvre des dossiers dans l'Explorateur et gère des serveurs locaux.
```

Le texte complète le diagramme ; il ne doit pas répéter chaque objet en détail.

## 10. DEBUG et lecture partielle

Le specimen conserve :

```js
specimen: {
  version: "alpha-0.0.0.1",
  debug: true
}
```

Si les deux nouveaux objets sont entièrement compris :

- aucune carte DEBUG ;
- aucun `⚠`.

C'est important : TG-016 enrichit le modèle, mais il doit rester entièrement consommé.

Ne pas masquer artificiellement un reste.

## 11. Cas de type inconnu

Tester temporairement :

```js
raccourcis_windows: {
  nom: "Raccourcis .lnk",
  type: "raccourci_windows_inconnu"
}
```

Attendu :

- l'objet n'est pas rendu comme raccourci connu ;
- DEBUG peut l'inventorier comme objet typé inconnu ;
- `⚠` revient ;
- la relation associée reste non représentée ;
- aucune valeur brute inutile n'est affichée.

Faire l'équivalent pour `explorateur` si utile.

## 12. Propriété inconnue

Tester temporairement sur l'un des deux objets :

```js
raccourcis_windows.canexistepas = "x"
```

Attendu :

- l'objet connu reste rendu ;
- `⚠` signale uniquement le chemin résiduel ;
- la valeur `x` n'est pas affichée.

## 13. Légende

Ajouter deux familles contextuelles :

```text
Raccourci Windows
Explorateur de fichiers
```

Elles apparaissent seulement lorsqu'elles sont présentes dans le diagramme.

Leurs miniatures reprennent les conventions graphiques correspondantes.

Ne pas ajouter :

- `.lnk` comme entrée séparée ;
- Windows comme entrée séparée ;
- Shell Windows.

## 14. Filtres

Ne pas ajouter :

- bouton Raccourci ;
- bouton Explorateur.

Conserver la barre compacte.

Les nouveaux objets doivent être atténués lorsque l'utilisateur isole une autre famille existante.

Leurs flèches participent au filtre Flux.

## 15. Responsive

Vérifier :

- 1448 px ;
- 390 px ;
- 320 px.

### Bureau

Les quatre unités externes doivent rester lisibles sans concurrencer l'application principale.

Deux unités à gauche et deux à droite ne doivent pas se chevaucher.

### Mobile

Les quatre unités externes doivent se dérouler proprement autour / sous l'application selon la stratégie responsive actuelle.

Les cinq flèches doivent rester compréhensibles.

Pas de débordement horizontal.

## 16. Non-régression Mon Bureau

Conserver intégralement :

- Socle technique ;
- Outils pilotés ;
- Services système ;
- Données ;
- VS Code avec Mon GPT<3 / Trucagramme ;
- serveur Python / HTTP / 127.0.0.1 ;
- deux flèches serveur ;
- aucun DEBUG canonique ;
- aucun `⚠` canonique.

Ajouter seulement :

- Raccourcis .lnk ;
- Explorateur Windows ;
- leurs deux flèches sortantes.

## 17. Non-régression autres spécimens

### Chrome Organizer

Conserver :

- contexte Chrome ;
- objets de données externes ;
- deux relations opposées des sauvegardes.

### Mon GPT<3

Conserver :

- Collector ;
- navigateur / ChatGPT ;
- deux relations.

### Mon Aise

Aucun changement visuel attendu.

### Accueil / 404

Passage de version seulement.

## 18. Tests proportionnés

Recette **L2 ciblée**.

Vérifier :

### Sémantique
- `raccourci_windows` reconnu ;
- `explorateur` reconnu ;
- aucune résurrection de `shell_windows` ;
- cinq relations finales exactes.

### Rendu
- quatre unités externes ;
- ordre gauche/droite conforme ;
- représentation `.lnk` reconnaissable ;
- Explorateur reconnaissable ;
- application principale toujours dominante.

### Lecture partielle
- aucune sur le specimen canonique ;
- retour honnête sur type inconnu ;
- retour honnête sur propriété inconnue.

### UI
- légende contextuelle ;
- filtre Flux ;
- reset ;
- présentation.

### Responsive
- 1448 ;
- 390 ;
- 320.

### Console
- aucune erreur.

## 19. Documentation

Mettre à jour de façon ciblée :

- `README.md` ;
- documentation de grammaire uniquement si l'implémentation révèle une précision supplémentaire.

Ne pas réécrire les rapports historiques.

## 20. Question volontairement différée : navigateur

Mon Bureau peut également ouvrir une page dans le navigateur lorsqu'il pilote un serveur local.

C'est une vraie surface externe et elle pourrait mériter un objet de niveau 1.

**Ne pas la traiter dans TG-016.**

La question reste explicitement ouverte pour un cas ultérieur afin d'éviter d'ajouter un troisième objet sans l'avoir étudié.

Ne pas ajouter de navigateur à Mon Bureau dans cette mission.

## À ne pas faire

Ne pas :

- traiter TG-016 comme un simple correctif TG-015 ;
- modifier le rapport historique TG-015 ;
- réintroduire `shell_windows` ;
- créer un grand environnement Windows ;
- détailler les applications réelles derrière les `.lnk` ;
- ajouter toutes les cibles dynamiques du catalogue ;
- ajouter le navigateur ;
- lancer la vue 2 ;
- lancer la passe graphique générale ;
- modifier l'algorithme 7+ ;
- créer TG-017.

## Livrables

- contrat `schema_version 0.1.13` ;
- nouvel objet `raccourcis_windows` ;
- nouveau type `raccourci_windows` ;
- nouvel objet `explorateur_windows` ;
- nouveau type `explorateur` ;
- deux nouvelles relations sortantes ;
- quatre unités externes équilibrées ;
- légende enrichie ;
- présentation ajustée ;
- DEBUG / lecture partielle toujours absents sur le canonique ;
- `reports/TG-016/rapport.md` ;
- captures bureau / mobile utiles.

Le rapport doit préciser :

1. pourquoi ces deux objets reviennent dans la vue 1 ;
2. différence entre surface externe et mécanisme interne ;
3. représentation choisie pour `.lnk` ;
4. représentation choisie pour l'Explorateur ;
5. ordre et placement des quatre unités externes ;
6. cinq relations finales ;
7. état DEBUG / `⚠` ;
8. résultats des tests d'inconnu ;
9. non-régression ;
10. question navigateur explicitement laissée ouverte.

Commit et push sur `main`, vérifier le SHA distant, puis arrêt pour validation humaine.
