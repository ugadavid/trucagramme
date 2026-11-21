# TG-015 — Services système intériorisés et frontière fonctionnelle de la vue 1

## Contexte

Après TG-014, Mon Bureau ne laisse plus que quatre objets inconnus et cinq relations non représentées :

```text
windows · contexte
shell_windows · service_systeme
processus_windows · service_systeme
tcp_windows · service_systeme
relations · 5 non représentées
```

L'étude du comportement réel de Mon Bureau montre cependant que ces quatre objets ne doivent pas être dessinés comme quatre voisins externes.

La règle de niveau 1 est désormais :

> **La frontière graphique de l'application suit l'expérience fonctionnelle, pas la frontière des processus.**

Quand Mon Bureau lance Git, PowerShell, curl ou interroge Windows puis affiche le résultat dans sa propre interface, cette mécanique reste **intérieure** à Mon Bureau dans la vue 1.

À l'inverse, une surface réellement indépendante comme VS Code reste extérieure.

Dans ce cadre :

- **Processus** et **Ports TCP** deviennent des services système internes ;
- **Shell Windows** est un mécanisme intermédiaire trop fin pour la vue 1 ;
- le second objet **Windows** servant uniquement de contexte à ces trois éléments devient inutile, car Windows est déjà exprimé par `appli.tourne_sous.os`.

La présentation textuelle de niveau 1 suffit à poser le contexte général Windows. Les mécanismes seront approfondis plus tard en vue 2.

Le contrat passe à :

```js
schema_version: "0.1.12"
```

## Références obligatoires

Lire avant modification :

- `README.md`
- `AGENTS.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `docs/SEPARATION_SEMANTIQUE_RENDU.md`
- `reports/TG-014/rapport.md`
- `projets/mon_bureau/specimen.js`
- `lecteur/rendu.js`
- `lecteur/lecture-partielle.js`
- `lecteur/interactions.js`
- `lecteur/styles.css`

Préserver les décisions déjà stabilisées :

- Socle technique interne ;
- Outils pilotés internes ;
- Données internes ;
- VS Code comme éditeur externe ;
- Serveur comme objet externe ;
- DEBUG non consommant ;
- lecture partielle ;
- légende contextuelle ;
- règles de placement.

## 1. Passer les six spécimens en 0.1.12

Passer à :

```js
schema_version: "0.1.12"
```

dans :

- `projets/accueil/specimen.js`
- `projets/404/specimen.js`
- `projets/mon_aise/specimen.js`
- `projets/mon_gpt/specimen.js`
- `projets/chrome_organizer/specimen.js`
- `projets/mon_bureau/specimen.js`

Le lecteur attend `0.1.12`.

Les cinq spécimens autres que Mon Bureau ne changent pas sémantiquement.

## 2. Retirer le faux contexte Windows de Mon Bureau

Supprimer entièrement :

```js
windows: {
  nom: "Windows",
  type: "contexte",
  contient: [
    "shell_windows",
    "processus_windows",
    "tcp_windows"
  ]
}
```

### Pourquoi

Dans ce spécimen, ce contexte ne racontait qu'un regroupement technique.

Windows est déjà représenté au niveau 1 par :

```js
appli: {
  tourne_sous: {
    os: "windows"
  }
}
```

Ne pas créer :

- `poste_windows` ;
- `environnement_hote` ;
- un grand cadre Windows autour de l'application ;
- une deuxième représentation de Windows.

Une éventuelle notion d'environnement hôte sera étudiée seulement lorsqu'un vrai cas l'exigera.

## 3. Retirer shell_windows de la vue 1

Supprimer entièrement :

```js
shell_windows: {
  nom: "Shell Windows",
  type: "service_systeme"
}
```

et supprimer sa relation :

```js
{ source: "appli", destination: "shell_windows" }
```

### Pourquoi

Le Shell Windows est ici un mécanisme intermédiaire :

- ouverture d'un raccourci ;
- ouverture d'un dossier ;
- ouverture d'une URL ;
- délégation à l'application Windows adaptée.

Ce niveau de détail appartient à une vue plus fine.

La vue 1 montre les objets réellement utiles à la compréhension, par exemple VS Code lorsqu'il s'ouvre comme application indépendante.

Ne pas remplacer Shell Windows par Explorateur ou Navigateur dans cette mission.

## 4. Conserver Processus et Ports TCP comme vrais objets sémantiques

Conserver :

```js
processus_windows: {
  nom: "Processus",
  type: "service_systeme"
},

tcp_windows: {
  nom: "Ports TCP",
  type: "service_systeme"
}
```

Ces deux notions sont suffisamment structurantes pour Mon Bureau au niveau 1 :

- processus : PID, identité, suivi, arrêt ;
- ports TCP : écoutes, ports, propriétaire d'une écoute, conflit.

Ne pas détailler leur mécanique.

## 5. Ajouter appli.services_systeme

Ajouter à Mon Bureau :

```js
appli: {
  ...
  services_systeme: [
    "processus_windows",
    "tcp_windows"
  ]
}
```

L'ordre du tableau détermine l'ordre d'affichage.

### Sémantique

`services_systeme` fonctionne comme `outils_pilotes` :

- il référence des objets déclarés au premier niveau ;
- il ne crée pas de nouveaux objets ;
- il exprime qu'ils sont mobilisés à l'intérieur de l'expérience fonctionnelle de l'application ;
- il ne signifie pas qu'ils sont embarqués dans ses binaires.

## 6. Nouveau groupe interne Services système

Le bloc Mon Bureau possède désormais quatre familles internes :

1. Socle technique ;
2. Outils pilotés ;
3. Services système ;
4. Données.

Créer un groupe interne pour :

- Processus ;
- Ports TCP.

### Rendu

Rester compact, dans l'esprit d'Outils pilotés.

Pistes acceptables :

- petites tuiles ;
- pastilles structurées ;
- mini-cartes simples.

Ne pas créer deux grosses fenêtres internes.

### Titre visible

Comme pour Outils pilotés :

- conserver le nom accessible **Services système** ;
- ajouter l'entrée correspondante dans la légende ;
- **ne pas afficher nécessairement le titre visible** dans le diagramme.

Préférence : aucun titre visible si la couleur + la légende suffisent.

## 7. Couleur provisoire

Choisir une famille chromatique distincte de :

- bleu principal ;
- violet Socle technique ;
- turquoise Outils pilotés ;
- vert Données ;
- orange Compagnon ;
- bleu clair Navigateur / surface ;
- gris DEBUG.

Une famille magenta / rose profond, désormais libre, est acceptable.

Cette couleur est **provisoire** : une passe graphique globale aura lieu plus tard.

Priorité à la distinction, pas au polissage.

## 8. Retirer les quatre relations Processus / TCP

Supprimer :

```js
{ source: "appli", destination: "processus_windows" },
{ source: "processus_windows", destination: "appli" },

{ source: "appli", destination: "tcp_windows" },
{ source: "tcp_windows", destination: "appli" }
```

### Pourquoi

Le groupe interne `services_systeme` raconte déjà que Mon Bureau mobilise ces capacités.

Les deux paires de flèches n'apportent pas d'information utile supplémentaire au niveau 1.

Le détail :

- interrogation ;
- résultat ;
- contrôle ;
- arrêt ;

appartiendra à la vue 2.

Ne pas recréer ces relations graphiquement.

## 9. Relations restantes de Mon Bureau

Après nettoyage, les seules relations de niveau 1 doivent rester celles qui concernent les vrais objets externes :

```js
{ source: "appli", destination: "vscode" },

{ source: "appli", destination: "serveur_local" },
{ source: "serveur_local", destination: "appli" }
```

Ces trois relations sont déjà comprises par le renderer.

Ne pas en ajouter d'autres dans TG-015.

## 10. Présentation texte

Mettre à jour très légèrement la présentation de Mon Bureau pour que le texte de niveau 1 assume le rôle de contexte.

Elle doit rester courte, 4 lignes environ.

Une formulation proche de celle-ci est acceptable :

```text
Cockpit Windows pour lancer et administrer des projets, applications, dossiers et outils techniques.
Il s’appuie sur une configuration JSON locale pour organiser les lanceurs et les catégories.
Il pilote plusieurs outils installés et mobilise des services système Windows depuis sa propre interface.
Il peut aussi ouvrir des applications externes et démarrer ou arrêter des serveurs locaux.
```

Ne pas transformer Présentation en documentation.

Ne pas citer PID, sockets, Get-NetTCPConnection, UseShellExecute ou autres détails de vue 2.

## 11. DEBUG : résultat attendu

Le specimen Mon Bureau conserve :

```js
specimen: {
  version: "alpha-0.0.0.1",
  debug: true
}
```

Mais après rendu correct, **aucun objet inconnu ne doit rester**.

Donc :

- aucun cartouche DEBUG ne doit apparaître ;
- ne pas afficher un cartouche DEBUG vide ;
- ne pas retirer `debug: true` du specimen.

C'est un test important : DEBUG activé sans inconnus ne doit rien produire.

## 12. Lecture partielle : objectif zéro

Après rendu correct, tout le modèle de Mon Bureau doit être consommé.

Donc :

- aucun bouton `⚠` ;
- aucune bulle de lecture partielle ;
- aucun compteur de relations restantes.

Ce sera le premier état où le quatrième spécimen complexe devient entièrement compris par la vue 1.

### Important

Ne pas masquer artificiellement les restes.

Le signal doit disparaître **uniquement parce que le modèle ne contient réellement plus de sens non représenté**.

## 13. Cas de référence invalide

Sur une copie temporaire, tester :

```js
appli.services_systeme: [
  "processus_windows",
  "canexistepas",
  "tcp_windows"
]
```

Résultat attendu :

- Processus et Ports TCP restent rendus ;
- aucun objet artificiel n'est créé ;
- `⚠` apparaît pour le reste ;
- DEBUG peut montrer l'inconnu seulement s'il correspond à un objet typé restant ; une simple référence absente n'a pas à devenir une carte inventée.

## 14. Cas de type incompatible

Tester temporairement une référence vers un objet qui existe mais n'a pas :

```text
type = service_systeme
```

Résultat :

- ne pas l'intégrer au groupe ;
- conserver du sens résiduel ;
- `⚠`.

Ne pas forcer un objet dans une famille parce qu'il est référencé.

## 15. Légende

La légende de Mon Bureau doit désormais contenir :

```text
Services système
```

uniquement parce que le groupe est présent.

Ne pas ajouter :

- Processus ;
- Ports TCP ;

comme deux entrées distinctes.

Ils sont des membres de la famille.

Conserver les autres entrées pertinentes :

- Application principale ;
- Socle technique ;
- Outils pilotés ;
- Données ;
- Éditeur ;
- Serveur ;
- Relation / flux ;
- Propriété.

## 16. Filtres

Ne pas ajouter de bouton **Services système**.

Conserver la barre actuelle compacte.

Lorsque l'utilisateur active un filtre existant, le groupe Services système peut être atténué comme les autres familles non ciblées.

Ne pas modifier le sens des filtres existants.

## 17. Responsive

Vérifier :

- 1448 px ;
- 390 px ;
- 320 px.

Le nouveau groupe interne ne doit pas provoquer :

- débordement ;
- tassement excessif ;
- concurrence avec Socle / Outils / Données.

Sur mobile, les deux services peuvent s'empiler si nécessaire.

## 18. Non-régression

### Mon Bureau

Conserver :

- VS Code avec ses deux projets ;
- serveur Python / HTTP / 127.0.0.1 ;
- trois relations externes ;
- outils pilotés turquoise ;
- données ;
- présentation ;
- légende.

### Chrome Organizer

Inchangé hors version.

### Mon GPT<3

Inchangé hors version.

### Mon Aise

Inchangé hors version.

### Accueil / 404

Inchangés hors version.

## 19. Tests proportionnés

Recette L2 ciblée.

### Mon Bureau

Vérifier :

- contexte Windows externe supprimé ;
- Shell Windows supprimé ;
- groupe Services système présent ;
- Processus puis Ports TCP dans le bon ordre ;
- quatre anciennes relations Processus / TCP absentes ;
- relation Shell absente ;
- trois relations externes restantes ;
- aucun DEBUG malgré `debug: true` ;
- aucun `⚠` ;
- légende Services système ;
- présentation courte mise à jour.

### Résilience

- référence absente ;
- type incompatible ;
- `⚠` revient honnêtement dans ces cas.

### Responsive

- 1448 ;
- 390 ;
- 320.

### Console

Aucune erreur.

## 20. Documentation

Mettre à jour de façon ciblée :

- `README.md` ;
- documentation de grammaire si une précision issue de l'implémentation doit être conservée.

Ne pas réécrire les rapports historiques.

## À ne pas faire

Ne pas :

- dessiner un grand environnement Windows ;
- conserver le second objet `windows` ;
- conserver `shell_windows` ;
- créer Explorateur ou Navigateur comme remplaçants dans cette mission ;
- conserver les relations appli <-> Processus / TCP ;
- créer des flèches internes dans Services système ;
- ajouter un filtre Services système ;
- détailler PID / API / sockets / commandes ;
- commencer la vue 2 ;
- lancer la passe graphique générale ;
- créer TG-016.

## Livrables

- contrat `schema_version 0.1.12` ;
- `appli.services_systeme` ;
- Processus / Ports TCP en groupe interne ;
- contexte Windows et Shell retirés du niveau 1 ;
- cinq relations internes retirées ;
- présentation Mon Bureau ajustée ;
- légende Services système ;
- DEBUG vide donc absent malgré `debug: true` ;
- lecture partielle totalement absente sur le specimen canonique ;
- `reports/TG-015/rapport.md` ;
- captures bureau / mobile utiles.

Le rapport doit préciser :

1. frontière fonctionnelle retenue pour la vue 1 ;
2. pourquoi Processus / TCP sont intériorisés ;
3. pourquoi Shell disparaît ;
4. pourquoi le second contexte Windows disparaît ;
5. relations supprimées ;
6. nouveau groupe Services système ;
7. résultat de DEBUG activé sans inconnus ;
8. confirmation que `⚠` disparaît honnêtement ;
9. résultats des tests de référence invalide / type incompatible ;
10. non-régression.

Commit et push sur `main`, vérifier le SHA distant, puis arrêt pour validation humaine.
