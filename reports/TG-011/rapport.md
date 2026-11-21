# TG-011 — Détail de la lecture partielle

Mon Bureau est le quatrième projet du menu. Sa fiche utilise le spécimen canonique en 0.1.7. Le lecteur construit la bulle après le rendu, en parcourant la copie du modèle dont il a déjà consommé les informations représentées.

## Contenu observé sur Mon Bureau

```text
windows · contexte
shell_windows · service_systeme
processus_windows · service_systeme
tcp_windows · service_systeme
vscode · outil_externe
git · outil_externe
curl · outil_externe
python · outil_externe
powershell · outil_externe
tree · outil_externe
serveur_local · service_local
relations · 18 non représentées
```

Le lecteur conserve l’ordre de déclaration des objets typés. Leur clé et leur type suffisent à les identifier. Pour les autres restes, il parcourt les clés et produit uniquement les chemins porteurs de sens. Un tableau résiduel est signalé par son chemin. Les valeurs de propriétés et le contenu des tableaux restent hors de la bulle. Les segments de chemin et les types sont limités à des identifiants courts. Un libellé hors de cette forme est remplacé par une ellipse.

Le compteur final compte les entrées de relations qui contiennent encore du sens. Les objets vides laissés par les relations entièrement consommées sont ignorés.

## Recette dans Edge

- Sur Mon Bureau, survol puis sortie de la souris, ouverture par tabulation, fermeture par Échap, épinglage au clic et bascule par deux touchers simulés. La liste peut recevoir le focus et défiler. Le bouton annonce « Lecture partielle » et expose son état ouvert ou fermé.
- Aux largeurs de 1448, 390 et 320 px, la bulle tient dans la fenêtre et son ouverture conserve la géométrie du diagramme. Le menu présente les quatre projets. Présentation et Légende s’ouvrent sur Mon Bureau. Son diagramme conserve son socle et sa configuration JSON, sans flèche vers les objets inventoriés.
- Sur Mon Aise, Mon GPT<3 et Chrome Organizer, le bouton et la bulle sont absents du DOM.
- Une copie temporaire de Chrome Organizer conserve son archive et affiche uniquement `appli.socle_technique.inconnue`, `sauvegardes.canexistepas` et `relations · 1 non représentée` après ajout de deux propriétés et d’une relation. Les valeurs injectées restent absentes.
- Aucune erreur de console relevée. L’essai tactile utilise l’émulation d’Edge.

[Bureau · 1448 px](mon-bureau-1448.png) · [Mobile · 390 px](mon-bureau-390.png) · [Mobile · 320 px](mon-bureau-320.png)
