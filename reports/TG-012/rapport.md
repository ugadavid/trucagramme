# TG-012 — Outils pilotés et construction DEBUG

Les six spécimens et le lecteur passent en 0.1.8. Sur Mon Bureau, le groupe **Outils pilotés** s’insère entre le socle technique et les données. Il suit l’ordre des références dans `appli.outils_pilotes` et affiche Git, curl, Python, PowerShell et tree. Mon Bureau lance ces exécutables sans fenêtre propre et présente leurs résultats dans son interface. Chaque outil reste un objet de premier niveau, identifié par sa clé.

VS Code ouvre sa propre application. Le spécimen le déclare en `application_externe` et DEBUG le montre parmi les objets restant à représenter. La languette AUTONOME a été retirée car plusieurs fonctions dépendent d’outils installés séparément. Le modèle ne tire aucune autre conclusion sur la distribution.

## Relations

Neuf relations ont été retirées. Elles répétaient l’inclusion des cinq outils dans Mon Bureau. Les neuf autres restent déclarées : un flux vers le shell, deux pour les processus, deux pour TCP, un vers VS Code, un de Python vers le serveur local et deux entre Mon Bureau et ce serveur. Elles apparaissent dans le compteur de lecture partielle.

## Deux lectures du même inventaire

Après le rendu normal, le lecteur inventorie une seule fois les objets typés, les chemins de propriétés et les relations encore présents dans la copie de travail. Le bouton ⚠ reçoit les lignes de cet inventaire. Lorsque la métadonnée booléenne `specimen.debug` vaut vrai, les cartouches reçoivent uniquement les couples clé/type déjà extraits. Leur construction n’accède pas au modèle. Les propriétés isolées et les relations restent dans la bulle.

La comparaison ligne à ligne dans Edge a donné le même résultat avec `debug: true` et `debug: false` :

```text
windows · contexte
shell_windows · service_systeme
processus_windows · service_systeme
tcp_windows · service_systeme
vscode · application_externe
serveur_local · service_local
relations · 9 non représentées
```

## Recette

- À 1448 px, les six cartes grises à contour discontinu sont réparties en deux cartouches de trois autour du cadre applicatif. À 390 et 320 px, elles passent dessous. Les mesures confirment l’absence de chevauchement avec l’application et de débordement horizontal.
- Aux trois largeurs, contrôle des cinq tuiles dans l’ordre, de l’absence d’AUTONOME, de la bulle et de l’absence de flèche DEBUG. Désactiver DEBUG retire les cartouches. Le signal reste accessible avec les sept mêmes lignes.
- Dans une copie en mémoire, une référence absente et une propriété supplémentaire sur Git ajoutent uniquement les chemins `appli.outils_pilotes` et `git.inconnue` à la bulle. Le nombre de tuiles et de fantômes reste identique.
- La légende de Mon Bureau inclut Outils pilotés. Le filtre Données atténue ce groupe. Les commandes existantes suffisent.
- Sur Mon Aise, Mon GPT<3 et Chrome Organizer, contrôle de la fiche, de Présentation, de la légende, du nombre de flèches (0, 2, 5) et de l’absence de DEBUG et de ⚠. Activer temporairement DEBUG sur Mon Aise, entièrement compris, laisse aussi la fiche sans cartouche ni signal. Accueil et vue introuvable vérifiés. Aucune erreur console relevée.

[DEBUG activé · 1448 px](mon-bureau-debug-1448.png) · [DEBUG désactivé · 1448 px](mon-bureau-sans-debug.png) · [390 px](mon-bureau-debug-390.png) · [320 px](mon-bureau-debug-320.png)
