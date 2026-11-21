# TG-008 — Accueil et projet introuvable

Le [lecteur](https://ugadavid.github.io/trucagramme/) distingue trois intentions à l’ouverture.

| URL | Contenu et navigation |
| --- | --- |
| `/` ou `/?projet=` | `rendreAccueil()` compose l’illustration du protocole. Le menu propose les deux projets. |
| `/?projet=mon_aise` ou `/?projet=mon_gpt` | `rendreSpecimen()` affiche la fiche habituelle, marque le projet courant et propose sa présentation. |
| [Exemple avec l’alias mbolo](https://ugadavid.github.io/trucagramme/?projet=mbolo) | `rendreProjetIntrouvable()` relie l’alias demandé à un emplacement en pointillé. Le menu reste accessible. |

Les quatre spécimens utilisent le contrat 0.1.4. Les modules [accueil](../../projets/accueil/specimen.js) et [404](../../projets/404/specimen.js) portent leur contenu dans `systeme`. Le lecteur importe celui de la vue demandée et compose ses éléments. Ces modules restent hors de l’index des projets et ne déclarent aucun objet `appli`. Sur ces deux vues, aucun lien de projet n’est marqué courant et la commande Présentation est cachée. Un alias inconnu est inséré comme texte dans le cadre de demande.

## Construction de l’accueil

Le cadre principal apparaît en premier. Les groupes violet et vert, les deux objets externes, les flèches et l’invitation suivent en environ 1,2 seconde au total. Le menu est utilisable pendant cette séquence. Sur mobile, les deux objets externes se placent au-dessus du cadre. La préférence de mouvement réduit donne directement la composition finale.

## Recette locale

Vérifications dans Edge sous Windows à 1448, 390 et 320 px. Les deux vues système s’affichent aux trois largeurs. Le menu s’ouvre dès l’accueil et permet de quitter la vue introuvable pour Mon Aise, puis de rejoindre Mon GPT<3. Une valeur vide ouvre l’accueil. Un alias contenant des chevrons s’affiche littéralement. Le mode de mouvement réduit a été simulé : aucune animation active et tous les éléments de l’accueil à pleine opacité.

Les fiches ont conservé leurs technologies, familles de données, flux et commandes de mise en évidence. Les images se chargent, dont la mascotte de Mon GPT<3. Les deux présentations contiennent leurs quatre paragraphes et leur ouverture conserve les rectangles du diagramme. Aucun signal de lecture partielle sur les deux projets publiés, aucune erreur de console durant la recette.

**Captures** · [Accueil sur bureau](accueil-1448.png) · [Accueil à 320 px](accueil-320.png) · [Projet introuvable sur bureau](introuvable-1448.png) · [Projet introuvable à 320 px](introuvable-320.png)
