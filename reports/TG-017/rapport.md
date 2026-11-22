# TG-017 — Économie visuelle et logos contextuels

Le contrat des cinq fiches reste en `0.1.14`. Les modifications portent sur le lecteur, son rendu, ses styles et le README. Le diff des spécimens, des relations, des assets et de la grammaire est vide. Les deux spécimens système (accueil et 404) conservent leur version historique `0.1.13`.

## Relecture des cinq fiches

| Fiche | Identités portées par l’image | Texte qui garde un sens propre |
| --- | --- | --- |
| [Mon Aise](mon_aise-1448.png) | Electron, JavaScript et TypeScript côte à côte, React. JSON accompagne Catalogue et Configurations CSV, WebP accompagne Images personnelles, ZIP accompagne Sauvegardes. | « CSV » appartient au nom de la configuration. Son format déclaré est JSON. La propriété « optionnel » reste attachée aux images. |
| [Mon GPT<3](mon_gpt-1448.png) | Le logo Tk remplace « Tkinter / Tk », ChatGPT occupe seul le contenu du navigateur. JSON accompagne Catalogue. | Les noms du compagnon et des objets métier restent lisibles. Les illustrations de fichiers et d’images accompagnent leurs libellés. |
| [Chrome Organizer](chrome_organizer-1448.png) | Le socle affiche Python et Tk. La feuille JSON porte le logo du format. Le marqueur Chrome existant figure aussi dans Logos. | La seconde feuille conserve « HTML ». L’archive garde SHA-256, les dossiers gardent leurs noms et leurs propriétés. |
| [Mon Bureau](mon_bureau-1448.png) | .NET, C#, Windows Forms, Git, curl, Python et PowerShell. Python apparaît aussi sur le serveur. | « 10 » précise .NET. « tree » reste textuel faute d’asset. Le spécimen déclare **Configuration** au format JSON, d’où « Configuration » avec le logo JSON. Le serveur conserve HTTP et son adresse. |
| [TRAME](trame-1448.png) | Python, PySide6 et Qt, Electron, .NET et Avalonia dans leurs socles respectifs. | « Technologies Web » garde sa portée générale. Les noms des implémentations et « 1 parmi 3 » restent visibles, ainsi que Super, les modules, leurs qualifications, Projet durable et son contenu, et Recovery local. |

Les quatre titres visibles retirés de TRAME sont « Implémentations », « Composant interne », « Modules produit » et « Données ». Les groupes conservent leurs noms accessibles et leurs entrées dans Légende.

## Lecture du panneau Logos

Le registre associe chaque logo commun à son fichier et à son nom humain. Le renderer utilise ce nom pour le texte alternatif et marque les identités dans le diagramme. Le lecteur parcourt ces marques en ordre de lecture, copie chaque signe une fois et reprend son nom accessible. Le marqueur CSS Chrome fournit ce nom par son attribut accessible. Les illustrations décoratives et les mascottes qui accompagnent déjà un nom de projet restent en dehors de la liste.

Le panneau partagé affiche Présentation, Légende ou Logos. La séparation gris clair est portée par le groupe des liens de projets dès qu’une commande est visible. [Menu et Logos sur bureau](logos-menu-1448.png) · [Menu et Logos sur mobile](logos-menu-390.png)

## Recette L1

- Edge sur serveur HTTP local, cinq fiches à 1448 et 390 px. Contrôle des listes attendues sur chacune, du décodage des images, du dédoublonnage et de la largeur du document. Aucun débordement horizontal, aucune erreur console ni ressource manquante observés. [Les trois implémentations de TRAME à 390 px](trame-390.png)
- Ouverture successive des trois commandes, contrôle du panneau actif et des coordonnées du diagramme. Fermeture de Logos par la croix, clic extérieur et Échap. Retour du focus à Logos puis réouverture avec Entrée. Avec Présentation temporairement masquée, le séparateur reste visible et Tab mène du dernier projet à Légende puis Logos.
- Aucun signal ⚠ ni cartouche DEBUG sur les cinq fiches. Mon Bureau conserve son indicateur de construction activé dans le spécimen.
- Syntaxe des deux modules modifiés et contrôle du diff Git. La recette se limite aux deux largeurs demandées dans Edge. Les autres navigateurs, la largeur de 320 px, les tests d’injection d’inconnus et l’audit général d’accessibilité restent hors de cette passe.
