# Direction d’architecture — séparer le sens du rendu

**Statut : direction validée, non encore implémentée.**

Trucagramme doit à terme séparer :

## Ce qui est dit

Une description sémantique de l’application :

- objets ;
- natures ;
- propriétés ;
- groupes ;
- relations ;
- flux.

Cette couche ne devrait connaître ni couleur CSS, ni coordonnées, ni taille de police.

## Ce qui le dit

Le moteur de rendu traduit ces concepts en :

- cadres ;
- couleurs ;
- icônes ;
- emboîtements ;
- groupes ;
- badges ;
- flèches ;
- placement.

L’objectif est qu’un changement de charte visuelle n’oblige pas à réécrire la description de l’application.

## Exemple conceptuel — non normatif

```json
{
  "application": {
    "name": "Mon GPT<3",
    "type": "desktop",
    "platform": "windows",
    "properties": ["local", "autonomous"],
    "technologies": [
      {
        "kind": "language",
        "id": "python",
        "children": [
          { "kind": "ui-library", "id": "tkinter-tk" }
        ]
      }
    ],
    "data": {
      "properties": ["separate-from-binaries"],
      "items": [
        { "kind": "json-catalogue", "label": "Catalogue JSON" },
        { "kind": "interface-files", "label": "Fichiers d’interface" },
        { "kind": "personal-images", "label": "Images personnelles", "optional": true }
      ]
    }
  }
}
```

Cet exemple sert uniquement à matérialiser l’idée. Le futur format n’est pas décidé.

## Registre d’icônes

Une autre direction envisagée est de référencer les visuels par identifiant sémantique :

```text
windows          -> assets/windows.png
python           -> assets/python.png
tkinter-tk       -> assets/Tk.png
chrome-extension -> assets/ExtensionChrome.png
json             -> assets/json.png
```

Le composant demanderait une icône par son identifiant plutôt que de connaître son fichier exact.

Là encore, aucune implémentation n’est demandée tant qu’une mission ne l’autorise pas.
