# TG-001 — Première passe graphique de Mon GPT<3

À la largeur de la référence (1448 × 1086), le compagnon, les deux flux et le navigateur s’alignent au niveau de la jonction entre le socle technique et les données. L’en-tête bleu foncé porte la mascotte, le nom de l’application, ses deux pastilles et le logo Windows. Les propriétés « AUTONOME » et « SÉPARÉ DES BINAIRES » restent attachées aux cadres qu’elles qualifient.

## Comparaison visuelle

- [Référence validée](../../protocole_mon_gpt_alpha/trucagramme-mon-gpt.png)
- [Avant sur bureau](avant-bureau.png)
- [Après sur bureau](apres-bureau.png)
- [Après à 390 px de large, page entière](apres-mobile.png)

## Modifications

Dans [index.html](../../protocole_mon_gpt_alpha/index.html), neuf images du dossier `assets/` remplacent les emoji, les caractères et les logos dessinés en CSS. Les pictogrammes qui portent une information à eux seuls ont un texte alternatif (« Extension Chrome », « Python », « Windows »). Les autres accompagnent un libellé visible.

Dans [styles.css](../../protocole_mon_gpt_alpha/styles.css), la largeur relative des trois objets, la position des flèches et la finesse des cadres intérieurs reprennent les proportions du PNG. Les trois lignes de données sont plus rapprochées. La pièce d’extension et les pictogrammes de données disposent de boîtes d’image adaptées aux marges intégrées à leurs fichiers.

Sur écran étroit, Windows occupe sa propre colonne et la pastille « optionnel » passe sous le libellé des images personnelles. Le filtrage atténue les groupes voisins individuellement pour garder le groupe sélectionné à pleine opacité. Le filtre des flux conserve la rotation des flèches verticales. Le script existant pilote toujours les quatre boutons.

## Vérifications

Le prototype a été ouvert depuis son fichier HTML dans Microsoft Edge en mode sans fenêtre. Les captures de bureau et de mobile ont été examinées visuellement. Aux largeurs de 1448, 1101, 641, 390 et 320 px, les neuf images se sont chargées et la page tenait dans la largeur disponible.

À chaque largeur, les commandes technologies, données, flux et réinitialisation ont été activées. Les opacités calculées après transition confirmaient la sélection et le retour à la vue complète. Les flèches pointaient toujours vers le bas en disposition verticale. Aucune erreur de console ni exception JavaScript relevée pendant ces essais.

## Limites et livraison

Les captures correspondent à Edge sous Windows. Le PNG Python fourni contient un léger damier visible autour du logo. La version affichée reste celle du prototype, `alpha-0.0.0.1`. La légende interactive conserve son bouton de réinitialisation et sa consigne.

Le commit **TG-001 — Première passe graphique du spécimen Mon GPT<3** regroupe les deux fichiers du prototype modifiés, ce rapport et les trois captures.
