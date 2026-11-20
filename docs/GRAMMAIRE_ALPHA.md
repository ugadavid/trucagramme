# Grammaire alpha de Trucagramme

**Statut :** premiers choix issus du spécimen Mon GPT<3.  
**But :** conserver ce que le prototype et TG-001 ont déjà permis de décider, sans prétendre à une norme définitive.

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

L’objectif n’est pas « zéro texte », mais **zéro texte explicatif inutile**. Certaines identités ou propriétés gagnent à rester nommées lorsque leur icône seule serait ambiguë.

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

Le bloc de l’**application principale** doit dominer visuellement la vue. Les autres objets sont compris par rapport à elle.

Une plateforme comme Windows est un **attribut ou contexte de l’application**, pas un conteneur qui englobe toute l’application. Cette règle évite aussi de bloquer un futur cas multiplateforme.

## 4. Emboîtement

L’emboîtement raconte une relation structurelle stable et évite une flèche inutile.

Exemples actuels :
- Python et Tkinter/Tk sont regroupés comme socle technique de Mon GPT<3 ;
- ChatGPT est placé dans un navigateur pour raconter son contexte d’usage réel.

Ces deux emboîtements n’ont pas exactement le même sens. **Le type sémantique des objets précise la relation**, pas seulement la géométrie du dessin.

L’emboîtement ne doit donc pas créer une fausse hiérarchie technique ; son sens exact devra continuer à être stabilisé avec d’autres applications.

## 5. Regroupement

Des éléments de même famille ou de même rôle peuvent partager un conteneur.

Exemple actuel :
- Catalogue JSON ;
- Fichiers d’interface ;
- Images personnelles.

Ils forment ensemble le groupe des données manipulées par Mon GPT<3.

Le regroupement permet de supprimer des flèches répétitives et de rendre la famille lisible d’un coup d’œil.

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

TG-001 confirme que les petites languettes posées sur le bord du cadre qualifié sont lisibles sans prendre la place du contenu.

## 7. Relations et flux

Les flèches sont réservées en priorité aux mouvements ou interactions.

Familles actuellement utiles :
- environnement / support ;
- constitution technique ;
- données manipulées ;
- flux entre objets.

Lorsqu’un regroupement ou un emboîtement suffit, éviter une flèche.

Une flèche de niveau 1 peut rester **sans verbe** lorsque le sens du mouvement est suffisamment évident par les objets reliés. Le détail d’un échange appartient à la fiche de l’objet qui en a besoin, pas forcément à la vue courante.

## 8. Applications compagnons

Une application compagnon apparaît comme un objet voisin **opaque**.

Dans la fiche Mon GPT<3, Mon GPT Collector est montré comme compagnon et identifié comme extension Chrome par son pictogramme. Sa mécanique interne ne doit pas être développée ici.

Sa propre architecture appartiendra à sa propre fiche.

## 9. Services web et navigateur

Lorsque l’usage réel est « ouvrir le service dans un navigateur », le service peut être placé directement **dans la représentation du navigateur**, plutôt que de créer deux objets reliés artificiellement.

C’est le choix actuel pour ChatGPT.

Cette inclusion raconte un **contexte d’usage** plutôt qu’une composition technique.

## 10. Couleur et famille

TG-001 confirme qu’une couleur cohérente par famille aide fortement la lecture :

- application principale ;
- technologie ;
- données ;
- compagnon ;
- surface externe.

La palette actuelle n’est pas normative. La règle porte sur la **fonction de la couleur** : typer et regrouper, pas simplement décorer.

## 11. Ne pas représenter l’absence par défaut

Le protocole raconte ce qui existe et structure le système.

Ne pas encombrer une vue avec :
- « pas de serveur » ;
- « pas d’API » ;
- « pas de compte » ;
- ou toute autre absence non structurante.

Une absence n’est intéressante que si le contexte du schéma lui donne un sens particulier.

## 12. Enseignements de TG-001

La première passe HTML/CSS/JS avec les vrais assets a confirmé plusieurs hypothèses :

- la grammaire reste compréhensible hors du PNG de référence ;
- l’application principale reste naturellement le centre visuel ;
- l’emboîtement fonctionne pour des relations différentes dès lors que les objets sont typés sémantiquement ;
- les groupes rendent les familles immédiatement lisibles ;
- les propriétés attachées aux cadres fonctionnent sans surcharger la vue ;
- les compagnons externes restent compréhensibles sans exposer leur architecture interne ;
- les flux simples peuvent être représentés par des flèches sobres ;
- les vraies icônes améliorent la reconnaissance, mais certains éléments conservent utilement un libellé ;
- le navigateur contenant ChatGPT est plus juste que deux objets artificiellement séparés.

Surtout, TG-001 renforce la direction d’architecture : **le sens du schéma ne doit pas dépendre de son rendu concret**.

Le futur moteur devra raisonner en objets sémantiques tels que `Application`, `TechnologyGroup`, `DataGroup`, `Property`, `Companion`, `Browser` ou `Flow`, puis laisser le rendu décider de leur matérialisation graphique.

Cette conclusion reste une direction de conception ; elle n’autorise pas encore l’implémentation d’un moteur générique.

## 13. Spécimen Mon GPT<3

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

## 14. Non décidé

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
