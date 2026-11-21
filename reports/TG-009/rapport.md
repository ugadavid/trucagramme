# TG-009 — Chrome Organizer et données externes

[Chrome Organizer](https://ugadavid.github.io/trucagramme/?projet=chrome_organizer) est le troisième projet du menu. Les cinq spécimens sont en version 0.1.5. La présentation et les relations de Chrome Organizer proviennent du spécimen fourni.

## Lecture du diagramme

Le renderer traite comme objets de données externes les objets nommés de premier niveau dont le type est `dossier_donnees`, `archives_locales` ou `fichiers`. Ces objets partagent un cadre vert et se trouvent à côté de l’application. Le groupe `appli.donnees` conserve son emplacement intérieur sur les fiches qui le déclarent.

| Objet | Informations rendues |
| --- | --- |
| Chrome User Data | Le rôle source place le dossier à gauche. La languette « LECTURE SEULE » qualifie ce dossier. La flèche pointe vers Chrome Organizer. |
| Sauvegardes | Les pastilles « dossier » et « SHA-256 » indiquent le format et l’intégrité. Deux relations relient cette carte à l’application. |
| Exports | La liste des formats apparaît sous la forme « JSON · HTML ». |
| Copie de restauration | Le rôle destination place le dossier du côté des sorties. La languette « EXPÉRIMENTAL » qualifie la copie. |

Chaque relation reconnue entre l’application et une carte crée sa propre flèche, avec un libellé accessible qui nomme sa source et sa destination. Pour les sauvegardes, une flèche va de l’application aux archives et une autre revient des archives vers l’application. Leur rapprochement relève de la mise en page.

Sur bureau, l’application occupe le centre et ses trois destinations s’alignent à droite. Sur mobile, la source précède l’application et les destinations la suivent. Les deux flèches parallèles des sauvegardes deviennent verticales. Un rappel du nom de l’application au-dessus des flux vers les exports et la copie permet de suivre leur origine dans cette disposition empilée.

## Recette

Essais dans Edge sous Windows à **1448, 390 et 320 px**, depuis le serveur HTTP local.

- **Chrome Organizer.** Les quatre cartes, leurs qualifications, Windows, local, bureau, Python et Tkinter / Tk sont présents. Cinq éléments de flux portent les cinq couples source/destination attendus. Les deux flèches des sauvegardes occupent des positions distinctes aux trois largeurs. Aucun compagnon, navigateur externe, débordement horizontal ou signal partiel.
- **Filtres.** Les opacités calculées après transition confirment l’isolement du socle par Technologie, des quatre cartes par Données et des cinq flèches par Flux. La réinitialisation restitue leur pleine opacité.
- **Lecture partielle.** Sur une copie en mémoire, l’ajout de `sauvegardes.canexistepas` conserve la carte Sauvegardes et les trois autres cartes. Sa valeur reste absente du diagramme et la languette ⚠ apparaît.
- **Navigation et régression.** Les trois noms figurent dans le menu de l’accueil. Depuis la vue introuvable, Chrome Organizer est accessible. Les présentations des trois projets s’ouvrent avec leurs quatre paragraphes. Mon Aise conserve ses trois technologies, ses quatre familles et sa mascotte. Mon GPT<3 conserve ses données internes, sa mascotte, le Collector, le navigateur et les deux flux. Les filtres des deux fiches conservent leur comportement. Aucune erreur de console relevée.

Le placement ajouté couvre les relations entre l’application et ses données externes. Les liens directs entre deux objets de données ne font pas partie du cas décrit.

**Captures** · [Bureau](chrome-organizer-1448.png) · [Mobile, page entière](chrome-organizer-390.png)
