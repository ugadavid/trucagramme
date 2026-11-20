# TG-001 — Première passe graphique du spécimen Mon GPT<3

## Contexte

Trucagramme vient de naître. Le premier prototype HTML/CSS/JS a été construit pour tester une grammaire visuelle simple sur un cas réel : Mon GPT<3.

Cette mission est volontairement petite. Elle ne doit **pas** transformer le prototype en moteur générique.

## Références obligatoires

Avant de modifier quoi que ce soit, lire :

- `README.md`
- `docs/GRAMMAIRE_ALPHA.md`
- `AGENTS.md`

Puis comparer :

- le prototype : `protocole_mon_gpt_alpha/index.html`
- la référence visuelle validée : `protocole_mon_gpt_alpha/trucagramme-mon-gpt.png`
- les assets disponibles : `assets/`

## Objectif

Faire une première passe graphique sur le prototype HTML afin de le rapprocher de la référence PNG et de remplacer les approximations visuelles par les vrais assets déjà fournis.

Le résultat doit rester le même schéma, avec la même grammaire et le même contenu.

## Assets à privilégier

Les fichiers disponibles comprennent actuellement notamment :

- `assets/mon-gtp.png`
- `assets/windows.png`
- `assets/python.png`
- `assets/Tk.png`
- `assets/ExtensionChrome.png`
- `assets/json.png`
- `assets/fichiers.png`
- `assets/images.png`
- `assets/ChatGPT.png`

Utiliser ces fichiers lorsqu’ils correspondent à l’objet représenté, plutôt que des emoji, caractères approximatifs ou logos reconstitués en CSS.

Ne pas renommer les assets dans cette mission sauf nécessité réelle et documentée.

## Travail attendu

1. Remplacer les principaux placeholders graphiques du prototype par les assets correspondants.
2. Comparer attentivement le rendu à `trucagramme-mon-gpt.png`.
3. Ajuster avec modération :
   - proportions ;
   - alignements ;
   - espacements ;
   - taille des icônes ;
   - finesse des cadres ;
   - position des badges/propriétés ;
   - équilibre visuel global.
4. Conserver le fonctionnement responsive existant.
5. Conserver les boutons de mise en évidence et leur comportement.
6. Si une petite amélioration graphique évidente rend le résultat plus propre sans modifier la grammaire, tu peux la faire et l’expliquer dans le rapport.

## À ne pas faire

Ne pas :
- concevoir le moteur sémantique ;
- créer un framework de composants ;
- introduire React, Vue, SVG engine ou autre dépendance ;
- modifier le sens du schéma ;
- ajouter de nouveaux objets ou informations ;
- réinventer la palette ou la grammaire ;
- lancer une deuxième mission.

Rester en HTML/CSS/JS simple.

## Vérifications

Vérification proportionnée à cette mission :

- ouvrir le prototype dans un navigateur réel ;
- vérifier le rendu à une largeur de bureau proche de la référence ;
- vérifier une largeur plus étroite raisonnable ;
- vérifier que les assets s’affichent correctement ;
- vérifier les commandes de mise en évidence ;
- vérifier l’absence d’erreur console liée aux changements.

Une campagne de tests lourde n’est pas attendue.

## Livrables

- prototype mis à jour ;
- captures utiles avant/après ou résultat final ;
- `reports/TG-001/rapport.md` décrivant :
  - modifications ;
  - choix graphiques ;
  - vérifications ;
  - limites ;
  - éventuelles petites propositions pour la suite, sans les implémenter.

Commit et push sur `main`, vérification du SHA distant, puis arrêt pour validation humaine.
