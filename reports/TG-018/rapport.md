# TG-018 — Trois projections mono-implémentation de TRAME

**22 novembre 2026 · Contrat projet 0.1.15 · Recette L2 ciblée.**

**Sur les trois fiches, le retrait du groupe d’alternatives libère assez de place pour montrer de quoi sont faits Super et les modules.** Le lecteur montre cinq socles par projection. Le premier appartient au host, le deuxième à Super et les trois suivants à Personnages, Lieux et Correcteur. Le Projet durable et le Recovery local ferment la lecture. Sur mobile, cette précision a un coût mesurable en défilement. La projection Electron est la plus longue, principalement à cause de ses libellés de raccord.

| Fiche | À ouvrir dans le lecteur | Capture |
|---|---|---|
| TRAME / Qt | [Projection Qt](https://ugadavid.github.io/trucagramme/?projet=trame_qt) | [1 448 px](trame_qt-1448.png) · [390 px](trame_qt-390.png) |
| TRAME / Electron | [Projection Electron](https://ugadavid.github.io/trucagramme/?projet=trame_electron) | [1 448 px](trame_electron-1448.png) |
| TRAME / Avalonia | [Projection Avalonia](https://ugadavid.github.io/trucagramme/?projet=trame_avalonia) | [1 448 px](trame_avalonia-1448.png) |
| TRAME canonique | [Les trois alternatives](https://ugadavid.github.io/trucagramme/?projet=trame) | [Témoin à 1 448 px](trame-canonique-1448.png) |

## Faits vérifiés dans TRAME

Le [README de TRAME](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/README.md) situe l’atelier et ses trois hosts. Les références suivantes documentent les technologies réellement utilisées. Les trois spécimens fournis ont conservé leurs valeurs et leurs relations. Seule leur version de contrat a changé.

| Brique | Constat et portée | Sources |
|---|---|---|
| Super | Les trois hosts chargent le même HTML, la même feuille CSS et le même moteur JavaScript. Qt installe sa page et WebChannel via Python. Electron raccorde l’iframe au propriétaire du document. Avalonia transporte les messages depuis NativeWebView. | [README de Super](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/workshop/common/editor-super/README.md) · [194a, isolation du cœur](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/reports/194a_super_core_isolation_report.md) · [194aa, propriétaire Electron](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/reports/194aa_electron_super_owner_independence_report.md) |
| Personnages | Un paquet produit possède trois entrées natives. Le manifeste déclare l’entrée Python, la fabrique ESM et l’assembly du module Avalonia. Le renderer Electron charge l’ESM. | [Rapport 205](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/reports/205_personnages_autonomous_product_module_report.md) · [Manifeste](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/packaging/optional/personnages/module.json) · [Qt](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/packaging/optional/personnages/qt/entry.py) · [Electron](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/packaging/optional/personnages/electron.mjs) · [Avalonia](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/packaging/optional/personnages/avalonia/Entry.cs) |
| Lieux | Le second paquet a ses propres entrées et sa propre assembly. Le même principe architectural justifie une deuxième carte, même lorsque les logos sont identiques. | [Rapport 206](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/reports/206_lieux_autonomous_product_module_report.md) · [Manifeste](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/packaging/optional/lieux/module.json) · [Qt](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/packaging/optional/lieux/qt/entry.py) · [Electron](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/packaging/optional/lieux/electron.mjs) · [Avalonia](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/packaging/optional/lieux/avalonia/Entry.cs) |
| Paquets et activation | L’atelier matérialise Personnages et Lieux. Les préférences permettent de sélectionner les modules. Les projections affirment « activable » uniquement pour le Correcteur. L’absence de cette pastille sur les deux autres modules laisse leur politique d’activation ouverte dans le récit. | [Rapport 207](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/reports/207_workshop_product_modules_materialization_report.md) · [Rapport 206, scénarios de désactivation](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/reports/206_lieux_autonomous_product_module_report.md) |
| Correcteur | Les clients Python, Node et .NET appellent le même service lexical .NET. Le moteur est WeCantSpell.Hunspell, le dictionnaire FR Classique 7.7. La documentation retrace aussi son usage depuis Super. | [Rapport 103](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/reports/103_common_spellcheck_engine_report.md) · [Architecture orthographique commune](https://github.com/ugadavid/trame/blob/31ff51d82536d332a9a593f98c6665a766eb1638/docs/COMMON_SPELLCHECK_ARCHITECTURE.md) |

## Ce que l’on lit dans chaque projection

| Porteur | Qt | Electron | Avalonia |
|---|---|---|---|
| Host | Python, PySide6 / Qt | Electron, Technologies Web | .NET, Avalonia |
| Super, cœur commun | JavaScript, HTML / CSS | JavaScript, HTML / CSS | JavaScript, HTML / CSS |
| Super, raccord | Python, Qt WebEngine / WebChannel | JavaScript, iframe Chromium | C#, NativeWebView |
| Personnages | Python, PySide6 / Qt | JavaScript, module ESM / renderer Electron | .NET, C#, Avalonia |
| Lieux | Python, PySide6 / Qt | JavaScript, module ESM / renderer Electron | .NET, C#, Avalonia |
| Correcteur, noyau | .NET, WeCantSpell.Hunspell | .NET, WeCantSpell.Hunspell | .NET, WeCantSpell.Hunspell |
| Correcteur, raccord | Python | Node | .NET |
| Propriétés du Correcteur | Activable, dictionnaire FR Classique 7.7 | Activable, dictionnaire FR Classique 7.7 | Activable, dictionnaire FR Classique 7.7 |

Le même groupe violet accompagne un socle à chaque profondeur. La carte dorée de Super l’identifie comme brique. Sa désignation « éditeur interne » reste visible. Le mot court **Raccord** identifie le rôle de l’intégration au host. Il prend tout son sens dans la projection Avalonia, où .NET apparaît à la fois comme runtime du Correcteur et comme client de ce moteur. Les deux occurrences ont des portées distinctes. La table Logos comporte une seule entrée .NET.

Les pastilles « autonomes » et « packagés » restent au-dessus des cartes du groupe vert. « activable » accompagne le nom du Correcteur. Son dictionnaire est inscrit sous son socle, à l’intérieur de la carte, avec son qualificatif. L’emboîtement suffit à relier chaque socle à son porteur. Les trois projections possèdent **zéro flèche**.

Le [renderer](../../lecteur/rendu.js) réutilise la fonction de socle au moment où il a reconnu le type de la brique. Les six rôles acceptés sont `runtime`, `langage`, `bibliotheque_graphique`, `interface`, `moteur` et `integration_hote`. La valeur textuelle reste ouverte. Le registre et les logos existants produisent les identités et conservent les compléments utiles comme « iframe Chromium ». Le rendu plus compact et la largeur supplémentaire dépendent de la présence d’un socle imbriqué. [Feuille de style](../../lecteur/styles.css) · [Règle de vue 1](../../docs/GRAMMAIRE_ALPHA.md#tg-018--profondeur-de-la-vue-1-et-socle-dune-brique-0115)

## Recette

**Rendu local dans Edge.** Les fichiers de l’application, ses modules JavaScript et ses PNG ont été chargés depuis le disque dans un profil de test isolé. Un cadre de largeur mesurée a permis d’obtenir exactement 390 px malgré la largeur minimale de la fenêtre de bureau. Les captures montrent la surface du lecteur recadrée à cette largeur. Les erreurs JavaScript de la page, les promesses rejetées, les erreurs de ressources et les appels à `console.error` ont été surveillés. Aucune erreur de page relevée. Chaque image du diagramme avait une largeur intrinsèque positive après chargement.

| Mesure | Qt | Electron | Avalonia |
|---|---:|---:|---:|
| Socles visibles à 1 448 et à 390 px | 5 | 5 | 5 |
| Hauteur de lecture indicative à 1 448 px, commandes comprises | 1 586 px | 1 632 px | 1 586 px |
| Hauteur de lecture indicative à 390 px, commandes comprises | 1 877 px | 1 975 px | 1 853 px |
| Relations, signaux ⚠, cartouches DEBUG | 0, 0, 0 | 0, 0, 0 | 0, 0, 0 |

- **Disposition.** Sur bureau, Personnages et Lieux occupent la première rangée, Correcteur la cellule de gauche suivante. Sur mobile, les trois cartes se succèdent. La largeur du document égale celle demandée pour les six lectures. Le contrôle des rectangles et des largeurs internes n’a relevé aucun débordement horizontal. Les qualifications restent sur leur porteur.
- **Lecteur.** L’index contient les huit projets dans l’ordre demandé. Sur la projection Electron, Légende montre six familles et Logos quatre identités distinctes, Windows, Electron, JavaScript et .NET. Chacun des panneaux s’ouvre sans déplacement du diagramme. Le filtre Technologie et sa réinitialisation ont été actionnés sur les projections.
- **Non-régression.** Chaque ancienne fiche a été capturée à 1 448 px avec le même Edge et le même dispositif, avant et après TG-018. Les cinq comparaisons pixel par pixel sont identiques. Le témoin canonique conserve « 1 parmi 3 », ses trois socles de host, Super et les modules simples, puis les deux persistances. Les vues système restent sur leur parcours dédié en 0.1.13.
- **Contrat.** Syntaxe vérifiée sur les modules du lecteur et les spécimens. Les huit fiches passent à 0.1.15. Leurs champs métier et leurs relations sont identiques aux sources de départ. Les images communes proviennent toutes du dépôt.

| Épreuve de lecture partielle sur une copie Qt | Observation dans Edge |
|---|---|
| Rôle inconnu ajouté au socle de Super | Les cinq socles reconnus subsistent. ⚠ inventorie uniquement `super.socle_technique.role_inconnu`. |
| Valeur textuelle nouvelle « Interface témoin » sous `interface` | La valeur apparaît dans le socle de Super, avec inventaire vide. |
| Objet de type inconnu avec son propre socle TypeScript | L’inventaire signale l’objet et son type. Aucun sixième socle ni logo TypeScript n’apparaît. |

**Limites.** Le réseau du processus local bloquait aussi les connexions de boucle locale. La recette visuelle porte donc sur Edge et les ressources du disque. Elle ne mesure pas les statuts HTTP de GitHub Pages. Les changements ont été testés dans Trucagramme uniquement. La compréhension par une personne découvrant TRAME reste à valider humainement.

## Ce que l’exercice permet de discuter

1. **Lisibilité d’une vue mono-implémentation.** Oui pour repérer le host, Super, les trois modules et les deux persistances. Les six rendus conservent cet ordre et les noms restent lisibles. À 390 px, comparer le host tout en haut au Correcteur plus bas demande de défiler sur environ deux hauteurs d’écran.
2. **Même signe à plusieurs profondeurs.** Le cadre violet est reconnaissable dans le bloc principal et à l’intérieur des cartes. La Légende n’a besoin que d’une entrée « Socle technique ». La proximité du cadre et de son porteur apporte la différence de portée.
3. **Brique, socle et propriété.** Sur Correcteur, la carte donne le nom, le cadre violet contient le moteur et son raccord, la pastille sous ce cadre nomme le dictionnaire. Séparer ces trois niveaux évite de lire le dictionnaire comme une quatrième technologie. C’est la distinction la plus intéressante à éprouver en recette humaine.
4. **Comparabilité.** Les trois fiches emploient les mêmes porteurs, le même ordre, les mêmes couleurs et les mêmes règles de placement. Les variations de hauteur proviennent des contenus. Aucun état de sélection ou de préférence n’est affiché. La Présentation explique le statut de projection.
5. **Détail à la limite de la vue 1.** « Qt WebEngine / WebChannel » et « module ESM / renderer Electron » sont les deux formulations les plus fines. Elles sont justifiées pour cet exercice précis car elles disent où se fait le raccord. Le mécanisme des messages, le chargement des assemblies et le cycle du service lexical dépasseraient déjà ce que l’on cherche à comparer.
6. **Profondeur variable de la vue 1.** L’expérience soutient cette hypothèse pour TRAME. La fiche canonique consacre sa place au choix entre trois réalisations. Une projection consacre cette place aux supports des briques. Les trois projections décrivent un même produit exceptionnel et constituent une seule famille d’exemples. Leur maintien dans le lecteur et la réutilisation du vocabulaire ailleurs restent soumis à la recette de David.
