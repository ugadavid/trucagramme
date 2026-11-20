# Grammaire alpha de Trucagramme

**Statut :** premiers choix issus du spécimen Mon GPT<3.  
**But :** conserver ce que le prototype a déjà permis de décider, sans prétendre à une norme définitive.

## 1. Niveau 1 — compréhension technique générale

La première vue doit permettre à une personne techniquement cultivée, mais pas nécessairement développeuse, de comprendre rapidement :

- la nature de l’application ;
- son environnement d’exécution ;
- ses technologies structurantes ;
- son organisation générale ;
- où vivent les données importantes ;
- avec quoi elle communique ;
- les flux majeurs ;
- quelques propriétés structurantes comme l’autonomie ou le caractère optionnel.

Le niveau 1 doit rester substantiel : il masque les détails d’implémentation, pas la compréhension.

## 2. Priorité au graphique

Principe : **le texte nomme ou qualifie ; le graphique explique autant que possible.**

Un objet ne devrait pas nécessiter une phrase complète pour être compris.

## 3. Objets

Un objet est une unité graphique identifiable.

Exemples actuels :
- application ;
- système / plateforme ;
- langage ;
- bibliothèque ou toolkit ;
- donnée / stockage ;
- application compagnon ;
- surface externe telle qu’un navigateur ou service.

La nature d’un objet peut être portée par la forme, la couleur, le traitement du cadre ou l’iconographie. Les couleurs exactes ne sont pas encore normalisées.

## 4. Emboîtement

L’emboîtement raconte une relation structurelle stable et évite une flèche inutile.

Exemple actuel :
- Python et Tkinter/Tk sont regroupés comme socle technique de Mon GPT<3.

L’emboîtement ne doit pas créer une fausse hiérarchie technique ; son sens exact devra être stabilisé avec d’autres applications.

## 5. Regroupement

Des éléments de même famille ou de même rôle peuvent partager un conteneur.

Exemple actuel :
- Catalogue JSON ;
- Fichiers d’interface ;
- Images personnelles.

Ils forment ensemble le groupe des données manipulées par Mon GPT<3.

## 6. Propriétés

Une propriété n’est pas nécessairement un objet autonome.

Les propriétés courtes peuvent être représentées par :
- une petite pastille ;
- une languette attachée au bord du cadre concerné ;
- une annotation textuelle courte.

Exemples actuels :
- `local` ;
- `bureau` ;
- `AUTONOME` ;
- `SÉPARÉ DES BINAIRES` ;
- `optionnel`.

Une propriété de groupe s’attache au groupe ; une propriété de l’application s’attache au bloc principal.

## 7. Relations et flux

Les flèches sont réservées en priorité aux mouvements ou interactions.

Familles actuellement utiles :
- environnement / support ;
- constitution technique ;
- données manipulées ;
- flux entre objets.

Lorsqu’un regroupement ou un emboîtement suffit, éviter une flèche.

## 8. Applications compagnons

Une application compagnon apparaît comme un objet voisin **opaque**.

Dans la fiche Mon GPT<3, Mon GPT Collector est montré comme compagnon et identifié comme extension Chrome par son pictogramme. Sa mécanique interne ne doit pas être développée ici.

Sa propre architecture appartiendra à sa propre fiche.

## 9. Services web et navigateur

Lorsque l’usage réel est « ouvrir le service dans un navigateur », le service peut être placé directement **dans la représentation du navigateur**, plutôt que de créer deux objets reliés artificiellement.

C’est le choix actuel pour ChatGPT.

## 10. Ne pas représenter l’absence par défaut

Le protocole raconte ce qui existe et structure le système.

Ne pas encombrer une vue avec :
- « pas de serveur » ;
- « pas d’API » ;
- « pas de compte » ;
- ou toute autre absence non structurante.

Une absence n’est intéressante que si le contexte du schéma lui donne un sens particulier.

## 11. Spécimen Mon GPT<3

La référence visuelle actuelle est :

`protocole_mon_gpt_alpha/trucagramme-mon-gpt.png`

Le prototype exécutable correspondant est :

`protocole_mon_gpt_alpha/index.html`

### Ce qu’il raconte actuellement

- Mon GPT<3 est une application de bureau Windows locale.
- Son socle principal est Python + Tkinter/Tk.
- Elle manipule un catalogue JSON, des fichiers d’interface et éventuellement des images personnelles.
- Les données utilisateur sont séparées des binaires.
- La distribution est autonome.
- Mon GPT Collector est une application compagnon de type extension Chrome.
- Mon GPT<3 peut ouvrir ChatGPT dans un navigateur.

## 12. Non décidé

À ne pas figer prématurément :
- palette définitive par nature d’objet ;
- formes définitives ;
- vocabulaire complet des relations ;
- format de description sémantique ;
- niveaux 2 et suivants ;
- règles générales de placement ;
- bibliothèque finale d’icônes ;
- moteur de rendu ou éditeur.

Ces décisions devront émerger de plusieurs cas réels.
