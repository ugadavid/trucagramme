# TG-006 — Premier lecteur Trucagramme

Le lecteur démarre sur [Mon Aise](http://127.0.0.1:8000/). Un clic sur **trucagramme™**, en bas à gauche, révèle deux liens de projet et la commande **Présentation**. Le titre externe reprend uniquement le nom du projet, en caractères à empattements plus petits. La version et son éventuelle languette restent associées au titre.

## Navigation et responsabilités

Le [lecteur](../../lecteur/lecteur.js) associe deux valeurs du paramètre `projet` à leurs fichiers de spécimen. Chaque lien recharge la page avec un seul fichier. L’URL de [Mon GPT<3](http://127.0.0.1:8000/?projet=mon_gpt) ouvre directement sa fiche. Une URL sans choix reconnu ouvre Mon Aise.

Le contrat **0.1.3** ajoute `projet.presentation`, une liste de quatre courts paragraphes dans chaque spécimen. Le lecteur vérifie la version du contrat et le nom, prépare le titre, puis prélève la présentation reconnue sur une copie du modèle. La commande est disponible lorsqu’elle a un contenu à montrer.

Le [renderer](../../lecteur/rendu.js) construit le diagramme et consomme les informations techniques comme auparavant. La lecture des valeurs restantes détermine la présence du ⚠. Une autre propriété sous `projet` reste ainsi disponible pour ce calcul. Les commandes de mise en évidence restent attachées au diagramme.

## Présentation

Le panneau arrive de la droite et affiche le nom, la présentation et une croix. Sa largeur atteint 360 px sur bureau. Sa position fixe lui permet de recouvrir un objet du diagramme. Les quatre fermetures sont opérationnelles : commande **Présentation**, croix, clic extérieur et Échap. Un clic extérieur qui ferme le panneau préserve le filtre actif, même si le pointeur se trouve sur une commande du diagramme. L’ouverture place le focus sur la croix. Les animations respectent la préférence de mouvement réduit.

## Recette

Essais effectués dans Edge sous Windows, par HTTP local, à 1448, 390 et 320 px.

| Essai | Observation |
| --- | --- |
| Repos et menu | Le déclencheur seul est visible au repos. Le clic déploie la navigation et la commande. Le diagramme garde ses dimensions et sa position. |
| Navigation | Aller-retour Mon Aise → Mon GPT<3 → Mon Aise aux trois largeurs. L’URL directe de Mon GPT<3 fonctionne également après rechargement. |
| Présentation | Pour chaque projet et chaque largeur, les quatre paragraphes correspondent au spécimen. Les quatre fermetures ont été testées. Les rectangles du diagramme, des objets, des groupes et des flèches sont identiques avant, pendant et après. Un essai avec un filtre actif et une page défilée confirme aussi la conservation du filtre et du défilement. |
| Régression technique | Mon Aise conserve ses trois technologies, ses quatre familles et ses deux filtres avec réinitialisation. Mon GPT<3 conserve Python, Tkinter / Tk, ses trois familles, le Collector, ChatGPT dans le navigateur, les deux flux et les quatre commandes. Sa mascotte provient de `mon_gpt.png`. Mon Aise s’affiche sans mascotte. |
| Métadonnées et lecture partielle | Les deux présentations publiées donnent une lecture complète. L’ajout temporaire de `socle_technique.canexistepas` déclenche la languette sur la version. Sa valeur reste absente du diagramme. L’ancienne version 0.1.2 est refusée. |

Aucune erreur de console ni exception JavaScript relevée. Les contrôles de non-régression portent sur le contenu et les interactions du diagramme ainsi que sa stabilité pendant la consultation. Le titre externe occupe désormais moins de place.

**Captures** · [Lecteur au repos](lecteur-ferme.png) · [Menu ouvert](lecteur-ouvert.png) · [Présentation sur bureau](presentation-1448.png) · [Présentation à 320 px](presentation-320.png)
