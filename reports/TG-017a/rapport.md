# TG-017a — Correctif .NET et modules TRAME

Le fichier `assets/communs/.net.png` devient `assets/communs/dot_net.png`. Le registre du renderer utilise ce nouveau chemin pour la clé `.net` et le texte alternatif `.NET`. Le PNG est identique.

La grille des modules produit utilise deux colonnes de même largeur sur bureau. Les cartes suivantes passent automatiquement à la ligne. À 800 px et en dessous, la règle mobile existante les place sur une seule colonne.

## Recette ciblée sur TRAME

| Largeur | Résultat dans Edge sur serveur HTTP local |
| --- | --- |
| 1448 px | Personnages et Lieux occupent la première ligne. Correcteur occupe la cellule de gauche de la deuxième. Le libellé Personnages tient dans sa carte. |
| 390 px | Personnages, Lieux et Correcteur occupent chacun une ligne. Tous les libellés tiennent dans leur carte. |

Le logo .NET se charge dans le socle Avalonia et dans le panneau Logos, avec son nom accessible. Toutes les images de la fiche ont été décodées. Aucun débordement horizontal ni erreur console observés aux deux largeurs.

Le contrôle statique couvre la syntaxe du renderer, le chemin du PNG et le diff. Le contrat reste en `0.1.14`. La recette porte exclusivement sur TRAME dans Edge, aux deux largeurs demandées.

[Capture de TRAME à 1448 px](trame-1448.png)
