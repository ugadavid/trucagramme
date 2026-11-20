# TG-002 — Rapport de l’étude sémantique

L’[étude du spécimen Mon GPT<3](../../docs/MODELE_SEMANTIQUE_MON_GPT_ALPHA.md) livre le récit de la fiche, un vocabulaire de quatre concepts, un exemple JSON illustratif, la correspondance avec la vue et les questions de recette. Le point le plus délicat concerne les deux flux. Le spécimen donne les extrémités et le sens des deux interactions, mais identifie l’action seulement pour l’ouverture de ChatGPT.

## Sources et méthode

Lecture effectuée sur l’état du dépôt `449521c` :

- `README.md`, `AGENTS.md` et `missions/TG-002_modele_semantique_mon_gpt.md` pour le périmètre.
- `docs/GRAMMAIRE_ALPHA.md`, `docs/SEPARATION_SEMANTIQUE_RENDU.md` et `reports/TG-001/rapport.md` pour les décisions déjà prises et le statut des exemples proposés.
- `protocole_mon_gpt_alpha/index.html`, `styles.css`, `app.js` et `trucagramme-mon-gpt.png` dans le même dossier, pour confronter les libellés, les emboîtements et les interactions à la référence.
- Les neuf images de `assets/` pour reconnaître les identités portées par un pictogramme, notamment Python, Windows et le type d’extension du Collector.

Pour chaque signe, nous avons formulé le fait que devrait encore connaître un lecteur privé de la vue. Nous avons ensuite identifié le sujet de ce fait. Cette lecture conserve, par exemple, la séparation d’avec les binaires sur le groupe de données et le caractère optionnel sur les seules images personnelles.

## Constats et limites

Le vocabulaire proposé comprend **objet**, **propriété**, **groupe** et **relation**. Il suffit pour décrire qui intervient, ce qui le qualifie, ce qui forme un ensemble et comment les participants sont liés. L’exemple présente Windows comme contexte d’exécution, le Collector comme compagnon et le navigateur comme contexte de l’ouverture. Ces choix d’écriture restent révisables.

Les deux emboîtements du spécimen portent des faits distincts. Python et Tkinter / Tk constituent le socle de Mon GPT<3. ChatGPT s’utilise dans un navigateur. Lire ces deux situations comme une même relation de composition ferait perdre le sens de la seconde.

Les questions pour la recette portent sur le statut de « local » et « bureau », la représentation de Windows, l’identité éventuelle des groupes et du navigateur, et le statut de compagnon. Le spécimen laisse également ouverts la portée technique de l’autonomie, le détail de Tkinter / Tk, les contraintes de stockage, le statut obligatoire des autres données, le contenu de l’échange entrant et la portée de l’indice alpha. L’étude garde ces inconnues explicites.

## Vérifications et livraison

Relecture de l’inventaire et de la transcription au regard des éléments demandés par la mission. La transcription est lisible seule, se limite aux participants du spécimen et à leurs qualifications ou relations, et ne contient aucune instruction graphique. Le tableau de correspondance permet de retrouver les indices dans le prototype. Les choix provisoires et les questions ouvertes sont signalés séparément.

La livraison comprend uniquement l’étude et ce rapport. Aucune implémentation n’a été réalisée.
