# TG-005 — Mon Aise et contrat 0.1.2

[Ouvrir le prototype](../../protocole_mon_gpt_alpha/index.html) affiche Mon Aise. Les trois membres de son socle et ses quatre familles de données sont visibles. Les deux spécimens publiés sont lus intégralement.

## Ce que le deuxième spécimen a révélé

Lors de l’essai préalable en 0.1.1, l’équipe a branché Mon Aise sur l’index avec le renderer de TG-004. L’identité textuelle, Windows, les propriétés de l’application, le catalogue et les images personnelles apparaissaient déjà. Le renderer reconnaissait seulement deux technologies précises et quelques familles de données. Il ignorait donc Electron, JavaScript / TypeScript, React, les configurations CSV et les sauvegardes ZIP. La légende proposait alors Données et réinitialisation. Cet essai a montré qu’on pouvait élargir la lecture en conservant la structure du spécimen.

## Ce que lit la version 0.1.2

- **Socle.** Chaque membre textuel fournit une entrée. Le rôle reste dans le modèle et dans l’infobulle. Un petit dictionnaire règle la casse des noms connus. Une technologie supplémentaire peut s’afficher par son nom seul.
- **Données.** Le renderer distingue les deux propriétés collectives des familles décrites par un objet. Il tire le libellé de la clé ou du type connu, ajoute le format déclaré et attache la pastille « optionnel » à la famille concernée. Dans Mon Aise, CSV fait partie du nom de la famille de configurations et JSON désigne son format.
- **Identité.** Le nom reste libre. Un alias conforme à `[a-z0-9_]+` sert à chercher un fichier PNG, SVG, WebP, JPG ou JPEG, dans cet ordre. Pour l’ouverture directe depuis le disque, [l’inventaire des identités](../../assets/identites.js) liste les fichiers disponibles. Ajouter une image d’identité demande de déposer le fichier et d’ajouter son nom à cet inventaire. Cela évite les erreurs réseau que le navigateur journalise quand on sonde un fichier absent. La mascotte existante a été copiée sous `mon_gpt.png`. Mon Aise utilise son titre seul.
- **Lecture partielle.** Le renderer travaille sur une copie des données et en retire les valeurs interprétées. Une valeur restante déclenche un unique ⚠ à côté de la version, avec un libellé accessible. Un alias valide est pris en compte même lorsque la fiche ne dispose d’aucune image. Les deux seuls champs obligatoires restent la version du contrat et le nom du sujet.

## Vérifications

Les essais ont été effectués dans Edge sous Windows à 1448, 390 et 320 px de large. L’index a été ouvert directement depuis le disque. Mon GPT<3 et les variantes de test ont été rendus en mémoire.

| Cas | Résultat observé |
| --- | --- |
| Mon Aise | Trois technologies, quatre familles avec leurs formats, une pastille « optionnel », Windows, local, bureau, autonomie et séparation des binaires. Aucun compagnon, flux, logo d’application ou ⚠. Les deux filtres et la réinitialisation fonctionnent. |
| Information inconnue | Une propriété ajoutée temporairement à l’application donne un seul ⚠ à côté de la version. Le DOM du diagramme est identique. Un champ inconnu imbriqué dans le catalogue déclenche également le signal. |
| Nouveaux membres | Un rôle technique inédit portant un nom textuel et une famille « Notes TXT » s’affichent sans modification du renderer et sans ⚠. |
| Mon GPT<3 | Neuf images, Python, Tkinter / Tk, trois familles de données, Collector, ChatGPT dans son navigateur et deux flux. Les trois filtres et la réinitialisation fonctionnent. Aucun ⚠. Changer le nom humain conserve la mascotte `mon_gpt.png`. |
| Contrat | Le modèle minimal 0.1.2 produit le sujet seul. Un modèle 0.1.1 affiche la version attendue. Le passage est direct et ne comprend aucune migration. |

Aucun débordement horizontal ni erreur de console pendant ces essais. Les captures de Mon GPT<3 à 1448 et 390 px sont identiques pixel par pixel en RGB aux références validées en TG-004. Les nouvelles captures publiées portent donc sur Mon Aise : [bureau](mon-aise-bureau.png) et [mobile](mon-aise-mobile.png).

Le périmètre ouvert couvre les membres textuels du socle et les familles de données. Les formes plus riches qu’un nom de technologie, les propriétés supplémentaires des familles et les nouvelles sortes de relations pourront demander une décision de grammaire. Le signal permet de les laisser dans le modèle dès aujourd’hui.
