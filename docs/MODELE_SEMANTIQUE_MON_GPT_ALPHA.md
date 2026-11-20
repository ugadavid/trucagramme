# Mon GPT<3 — ce que dit le spécimen

Étude TG-002, soumise à la recette humaine. Le périmètre est la fiche de Mon GPT<3 au niveau de lecture de la [grammaire alpha](GRAMMAIRE_ALPHA.md).

## Le récit à conserver

**Mon GPT<3 est le sujet de la fiche.** C’est une application de bureau locale qui s’exécute sous Windows. Sa distribution est autonome. Python et Tkinter / Tk constituent son socle technique. La fiche identifie le langage et l’outillage d’interface, sans détailler leurs dépendances.

Mon GPT<3 manipule trois familles de données locales. Ce sont le catalogue JSON, les fichiers d’interface et les images personnelles. La séparation d’avec les binaires vaut pour l’ensemble de ces données. Seules les images personnelles portent la mention « optionnel ». Une fiche qui rendrait toutes les données optionnelles changerait donc le sens.

Mon GPT Collector est une extension Chrome qui joue le rôle de compagnon de Mon GPT<3. La fiche indique une interaction orientée du Collector vers l’application. Son contenu et son mécanisme restent inconnus. Dans l’autre sens de lecture, depuis Mon GPT<3 vers l’extérieur, l’action est identifiée plus précisément : l’application peut ouvrir le service ChatGPT dans un navigateur. Rien ne désigne la marque de ce navigateur. L’indication « Chrome » concerne le Collector.

## Vocabulaire de travail

Quatre concepts suffisent à relire ce cas. Les termes *application*, *technologie*, *donnée* et *service web* précisent la nature de ce dont on parle. *Principale* et *compagnon* indiquent comment lire les applications dans cette fiche.

| Concept | Signification dans cette étude | Exemple | Ce qui reste hors du concept |
| --- | --- | --- | --- |
| Objet | Élément identifiable dont la fiche parle et dont on peut préciser la nature. | ChatGPT est un service web. Mon GPT Collector est une application identifiée comme extension Chrome. | Le logo qui permet de reconnaître l’objet et les détails internes que la fiche ne décrit pas. |
| Propriété | Qualification portant sur un sujet précis, objet ou ensemble. | La distribution de Mon GPT<3 est autonome. Le caractère optionnel porte sur les images personnelles. | La forme de la pastille et les garanties supplémentaires qu’on pourrait prêter au mot « autonome ». |
| Groupe | Ensemble dont les membres ont un rôle commun vis-à-vis de l’application. Il peut porter une propriété collective. | Les trois familles de données sont manipulées localement et séparées des binaires. Python et Tkinter / Tk forment le socle technique. | L’ordre des membres, leur disposition et toute dépendance supposée entre eux. |
| Relation | Fait qui associe des participants avec un sens précis. Une interaction orientée conserve sa source et sa destination. | Mon GPT<3 peut ouvrir ChatGPT dans un navigateur. Le navigateur précise le contexte de l’ouverture. | Le tracé d’une flèche, le protocole d’un échange et toute chronologie supposée entre les deux interactions. |

Le terme *flux* suffit ici pour désigner une interaction orientée. L’appartenance au socle, la manipulation des données et le rôle de compagnon expriment aussi des relations, même si elles ne décrivent aucun déplacement. Windows précise l’environnement d’exécution de l’application. On peut consigner ce fait en une seule valeur.

## Une transcription possible

Cet exemple JSON est illustratif et non normatif. Les noms lisibles désignent les mêmes participants d’une occurrence à l’autre. Les champs imbriqués fixent la portée des faits : par exemple, la séparation d’avec les binaires porte sur les données manipulées. L’omission d’une précision laisse la question ouverte.

```json
{
  "application_principale": {
    "nom": "Mon GPT<3",
    "type": "application de bureau",
    "exécution": "locale",
    "plateforme": "Windows",
    "distribution": "autonome",
    "socle_technique": [
      { "nom": "Python", "nature": "langage" },
      { "nom": "Tkinter / Tk", "nature": "outillage d’interface" }
    ],
    "données_manipulées": {
      "locales": true,
      "séparées_des_binaires": true,
      "familles": [
        { "nom": "Catalogue JSON" },
        { "nom": "Fichiers d’interface" },
        { "nom": "Images personnelles", "optionnelles": true }
      ]
    }
  },
  "compagnon": {
    "nom": "Mon GPT Collector",
    "type": "extension Chrome",
    "compagnon_de": "Mon GPT<3"
  },
  "interactions": [
    { "source": "Mon GPT Collector", "destination": "Mon GPT<3" },
    {
      "source": "Mon GPT<3",
      "action": "peut ouvrir",
      "destination": "ChatGPT",
      "nature_destination": "service web",
      "contexte_usage": "navigateur"
    }
  ]
}
```

## Correspondance avec la vue actuelle

Le test porte sur chaque affirmation : si on racontait la même fiche à voix haute, que faudrait-il encore dire ?

| Information sémantique ou détail examiné | Où et comment la vue actuelle l’exprime | Sens ou rendu ? |
| --- | --- | --- |
| La fiche a pour sujet Mon GPT<3 | Titre, nom répété dans l’en-tête, mascotte et bloc dominant | Sens pour l’identité et le rôle principal |
| Place centrale, taille du bloc, dessin du robot | Composition de bureau et image de l’en-tête | Rendu |
| Exécution locale et application de bureau | Deux pastilles « local » et « bureau » auprès du nom | Sens |
| Plateforme d’exécution Windows | Logo Windows dans l’en-tête de l’application | Sens |
| Taille et emplacement du logo | Image alignée à droite du nom | Rendu |
| Distribution autonome de Mon GPT<3 | Languette « AUTONOME » attachée au cadre de l’application | Sens, y compris l’entité qualifiée |
| Position en haut à droite de la languette | Chevauchement de la bordure | Rendu |
| Python et Tkinter / Tk participent au même socle | Logo Python et entrée « Tkinter / Tk » réunis dans l’application | Sens |
| Trois familles de données locales manipulées | Trois entrées nommées sous le socle, réunies dans la section « Données locales » du prototype | Sens |
| Données séparées des binaires | Languette commune « SÉPARÉ DES BINAIRES » | Sens, à portée collective |
| Images personnelles optionnelles | Pastille « optionnel » sur cette seule entrée | Sens, à portée individuelle |
| Teintes violette et verte, ordre des entrées, cadres et pictogrammes | Deux ensembles graphiques différenciés à l’intérieur de l’application | Rendu |
| Mon GPT Collector est un compagnon de type extension Chrome | Nom du compagnon et pièce d’extension dans un objet voisin | Sens |
| Interaction du Collector vers Mon GPT<3 | Flèche entrante, sans verbe | Sens pour les extrémités et la direction |
| Mon GPT<3 peut ouvrir ChatGPT dans un navigateur | Flèche sortante vers le navigateur contenant le nom et le logo du service | Sens pour l’action, sa destination et son contexte |
| Orientation à l’écran, couleur des flèches, barre du navigateur | Flux horizontaux sur bureau, verticaux sur mobile, fenêtre stylisée | Rendu |
| Mise en évidence et réinitialisation | Légende interactive, consigne et variations d’opacité | Rendu interactif de familles déjà identifiées |
| Indice alpha auprès du titre | La maquette affiche `alpha-0.0.0.0`, le prototype `alpha-0.0.0.1` | Métadonnée du spécimen pour cette lecture. Son affichage relève du rendu. |

## Ambiguïtés à soumettre à la recette

| Ce que le cas établit | Ce qu’il laisse ouvert |
| --- | --- |
| « Local » et « bureau » qualifient Mon GPT<3. | Faut-il deux propriétés générales ou des champs spécialisés pour l’exécution et le type d’application ? « Local » ne précise pas les conditions d’usage hors connexion. |
| Windows donne le contexte d’exécution de Mon GPT<3. | Une valeur suffit ici. Faudrait-il donner une identité propre à la plateforme ? La grammaire tranche le rôle, mais laisse ouverte son écriture. |
| « AUTONOME » qualifie la distribution. | Quelles garanties d’installation ou de dépendances recouvre cette autonomie ? La fiche ne les énumère pas. |
| Le socle et les données ont chacun des membres identifiables. La séparation d’avec les binaires a une portée collective. | Ces ensembles doivent-ils avoir une identité propre, ou des relations avec l’application et une propriété collective suffisent-elles ? Les deux cadres ne décident pas du statut de deux types de groupes. |
| Python et Tkinter / Tk participent au socle. Le spécimen présente Tkinter / Tk sous un nom commun. | Faut-il distinguer Tkinter de Tk à ce niveau ? Aucune dépendance orientée entre les entrées du socle ne ressort de la fiche. |
| Le catalogue est identifié par JSON, les autres données par leur usage. Seules les images sont explicitement optionnelles. | JSON mérite-t-il un champ de format ? Quel est le rôle précis des fichiers d’interface ? L’absence de pastille suffit-elle à déclarer les deux autres familles obligatoires ? Aucun chemin de stockage ni procédé de séparation n’est donné. |
| Le Collector est à la fois extension Chrome et compagnon de Mon GPT<3. | Le rôle contextuel suffit à transcrire ce cas. Le statut général de « compagnon » comme rôle ou nature reste ouvert. |
| L’interaction entrante relie le Collector à Mon GPT<3 dans ce sens. | Quel verbe, quel contenu, quel déclencheur ou quel mécanisme d’échange lui attribuer ? Le nom « Collector » ne suffit pas à répondre. Rien n’impose non plus que cette interaction précède l’ouverture de ChatGPT. |
| ChatGPT est le service ouvert. Le navigateur est son contexte d’usage. | Une qualification de l’ouverture suffit-elle, ou faut-il identifier le navigateur et nommer une relation d’usage distincte ? Le cas ne précise ni le navigateur choisi ni la transmission éventuelle de données. |
| L’indice alpha diffère entre la maquette et le prototype. | Sa portée exacte comme version de la fiche, du prototype ou du protocole reste à préciser. L’attribuer au logiciel Mon GPT<3 ajouterait un fait sans appui. |
