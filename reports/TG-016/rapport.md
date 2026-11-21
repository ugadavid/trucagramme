# TG-016 — Raccourcis Windows et Explorateur

Les six spécimens et le lecteur passent en 0.1.13. Mon Bureau lance les applications du catalogue via des raccourcis et ouvre les dossiers dans une fenêtre indépendante. Ces deux capacités sont visibles au niveau 1. Le Shell Windows, intermédiaire technique, reste hors de la fiche. La question d’une représentation du navigateur dans Mon Bureau reste ouverte.

## Formes et flux

Une feuille à coin replié, marquée `.lnk` et munie d’une petite flèche dans son angle inférieur gauche, représente la capacité de lancement pour l’ensemble du catalogue. La flèche inscrite sur la feuille appartient au pictogramme. La relation avec Mon Bureau possède sa propre flèche et son propre libellé accessible. Une fenêtre contenant un dossier jaune évoque le gestionnaire de fichiers. Les deux signes sont dessinés en CSS et repris en miniature dans la légende.

| Ordre de déclaration | Objet | Côté sur bureau | Relations explicites |
| --- | --- | --- | --- |
| 1 | Visual Studio Code | Gauche | Mon Bureau → Visual Studio Code |
| 2 | Raccourcis .lnk | Droite | Mon Bureau → Raccourcis .lnk |
| 3 | Explorateur Windows | Gauche | Mon Bureau → Explorateur Windows |
| 4 | Serveur local | Droite | Mon Bureau → Serveur local et Serveur local → Mon Bureau, avec deux flèches distinctes |

## Recette locale dans Edge

- À 1448 px, contrôle des deux colonnes, de l’espacement des objets et de la direction graphique des cinq flèches. À 390 et 320 px, l’éditeur précède l’application, puis viennent le raccourci, l’Explorateur et le serveur. Les deux flèches du serveur restent distinctes. Aucun débordement horizontal observé.
- Le spécimen conserve `debug: true`. Aucun cartouche, bouton ⚠ ou détail de lecture partielle dans le DOM. Les quatre groupes internes, les deux projets de VS Code et les trois qualifications du serveur sont présents.
- Sur des copies temporaires, remplacer successivement chacun des deux nouveaux types par un type inconnu retire sa forme, produit une carte DEBUG et fait revenir ⚠ avec la clé, le type et « relations · 1 non représentée ». Une propriété inconnue sur le raccourci laisse sa forme visible et ajoute uniquement le chemin `raccourcis_windows.canexistepas` dans la bulle.
- La légende comporte « Raccourci Windows » et « Explorateur de fichiers ». Le filtre Flux conserve les cinq flèches et atténue les deux nouvelles formes. Contrôle de la réinitialisation, du filtre Données et de la présentation en quatre lignes.
- Vérification rapide de Mon Aise, de Collector et ChatGPT dans Mon GPT<3, des cinq relations de Chrome Organizer dont les deux flux de sauvegarde, ainsi que de l’accueil et de la vue introuvable. Aucune erreur console relevée.

[Bureau à 1448 px](mon-bureau-1448.png) · [Mobile à 390 px](mon-bureau-390.png) · [Mobile à 320 px](mon-bureau-320.png)
