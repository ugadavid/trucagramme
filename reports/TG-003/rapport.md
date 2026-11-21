# TG-003 — Première séparation du sens et du rendu

Le spécimen se consulte toujours en ouvrant directement [index.html](../../index.html). Sa description est désormais dans [specimen.js](../../projets/mon_gpt/specimen.js). Sur les captures de recette, la comparaison des pixels RGB avec TG-001 donne zéro différence, sur bureau comme sur mobile.

## Du modèle à la fiche

| Fichier | Responsabilité |
| --- | --- |
| `specimen.js` | Objet JavaScript sérialisable. Il distingue le type de l’application, son mode d’exécution, son environnement, sa livraison, les rôles techniques, les données, le compagnon et les relations. La version du spécimen est indépendante de celle du contrat. |
| `index.html` | Point d’entrée local. Il charge la feuille de style puis les trois scripts classiques dans leur ordre d’utilisation. |
| `rendu.js` | Construit le DOM à partir des informations reconnues. Une table en tête du fichier associe les identités aux neuf fichiers d’image. Le rendu choisit les libellés de niveau 1 et la portée des propriétés. |
| `styles.css` | Conserve la charte et les dispositions bureau et mobile. Sur bureau, les colonnes des participants et des flux absents prennent une largeur nulle. |
| `app.js` | Lance le rendu et équipe la vue des commandes correspondant aux familles présentes. Avec le spécimen complet, les quatre commandes sont disponibles. |

Deux champs sont obligatoires : `schema_version`, avec la valeur textuelle `"0.1"`, et `appli.nom`, avec un nom non vide. Un champ obligatoire manquant ou une version de contrat inconnue affiche un message dans la page. La construction du diagramme s’arrête à cet endroit.

Le modèle garde deux rôles techniques distincts même si la vue les réunit dans un cadre. De même, le libellé « Catalogue JSON » réunit le rôle du catalogue et son format. Le signe Windows dépend de l’OS déclaré. La pièce du Collector dépend du type extension et de l’hôte Chrome. La fenêtre entourant ChatGPT dépend du contexte navigateur de la relation d’ouverture.

## Épreuves de recette

| Essai dans Edge, depuis le fichier local | Résultat observé |
| --- | --- |
| Spécimen complet à 1448, 1101, 641, 390 et 320 px de large | Neuf images chargées à chaque largeur. Aucun débordement horizontal de la page. |
| Comparaison des captures complètes bureau et mobile avec celles de TG-001 | Dimensions identiques et aucune différence de pixels RGB aux deux largeurs de référence. |
| Technologies, données, flux puis réinitialisation aux cinq largeurs | Après chaque transition, la famille sélectionnée revient à pleine opacité. La réinitialisation rétablit toutes les familles. Les flèches restent verticales dans la disposition empilée. |
| Version du contrat et seul nom « Test minimal » | Le titre et le nom du sujet apparaissent. Le DOM ne contient ni image, ni groupe, ni pastille, ni compagnon, ni flux, ni commande. |
| Retrait du Collector, de Windows, de la livraison, des images personnelles et du contexte navigateur | Le compagnon et sa flèche entrante disparaissent, ainsi que le signe Windows, la languette de livraison et la ligne des images. ChatGPT reste la destination de l’ouverture, avec son identité seule. |
| Retrait de toutes les relations et du champ `optionnel` | Le compagnon reste présent. Les flèches, le service externe et la commande de flux disparaissent. Les trois lignes de données restent visibles, sans qualification ajoutée aux images. |
| Socle vide et séparation d’avec les binaires sans aucune donnée décrite | Aucun groupe vide ni languette orpheline. |
| Version absente, version inconnue, puis nom absent | La page indique le champ en cause. Aucun diagramme partiel. |

Les variantes ont été injectées temporairement en mémoire dans le navigateur. Aucun de ces essais n’a produit d’erreur de console ni d’exception JavaScript.

**Captures** · [Bureau, 1448 × 1086](apres-bureau.png) · [Mobile, page entière à 390 px](apres-mobile.png) · [Cas minimal](minimal.png)

## Limites de cette passe

Le rendu connaît le vocabulaire de Mon GPT<3, les deux participants externes et les interactions décrites pour ce spécimen. Il sélectionne les informations qu’il sait représenter. Le Collector reste opaque et sa relation entrante reste sans verbe. Les essais couvrent Edge sous Windows et les omissions documentées ci-dessus. Le contrat reste expérimental.
