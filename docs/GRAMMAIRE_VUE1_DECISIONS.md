# Grammaire courte de la vue 1 — décisions actuelles

**22 novembre 2026 — état après TG-018 et discussion de stabilisation.**

Ce document ne remplace pas l’historique détaillé de `GRAMMAIRE_ALPHA.md`. Il résume les décisions qui doivent guider les prochaines évolutions de Trucagramme.

## 1. But de la vue 1

La question de référence est :

> **Quelles sont les briques principales de l’application et quelles technologies les supportent ?**

La vue 1 ne cherche pas à documenter tout le fonctionnement interne. Elle doit permettre de comprendre rapidement :

- quelles briques structurent réellement le produit ;
- quelles technologies supportent ces briques ;
- quelles relations ou interactions extérieures sont essentielles à la compréhension du produit.

Le texte nomme ou qualifie. Le graphique explique autant que possible.

## 2. Le point de vue est l’application

Une fiche raconte l’architecture depuis le point de vue de l’application décrite.

La frontière graphique ne suit pas mécaniquement les processus du système. Elle suit ce qu’il faut montrer pour comprendre le produit.

Une brique peut être interne ou externe. Ce qui importe est sa place dans le récit architectural.

## 3. Une brique importante peut porter son propre socle

Une brique structurante peut posséder son propre `socle_technique` lorsqu’il est utile de connaître les technologies qui la supportent.

TG-018 a validé visuellement cette règle sur les trois projections mono-implémentation de TRAME :

- socle du host ;
- socle de Super ;
- socle de Personnages ;
- socle de Lieux ;
- socle du Correcteur.

La même convention graphique fonctionne à plusieurs profondeurs.

### Profondeur de la vue 1

La vue 1 n’a pas un nombre fixe de niveaux.

> **Elle descend aussi profondément que nécessaire tant que la lecture d’ensemble reste immédiate.**

TRAME canonique s’arrête plus haut parce que le niveau exceptionnel des trois implémentations alternatives consomme une partie de cette profondeur. Les projections mono-implémentation peuvent descendre davantage sans changer de philosophie.

Une future vue plus détaillée commence lorsque la question devient principalement **comment cela fonctionne-t-il concrètement ?** plutôt que **de quoi cette brique est-elle faite ?**

## 4. Groupe, porteur et portée

Une propriété appartient toujours à un porteur identifiable.

- une propriété de l’application qualifie l’application ;
- une propriété de groupe qualifie l’ensemble du groupe ;
- une propriété d’un membre qualifie seulement ce membre ;
- un socle imbriqué qualifie la brique qui le contient.

L’emboîtement ou le regroupement exprime une appartenance structurelle. Il ne crée pas de flux implicite.

## 5. Inclusion et relation sont deux choses différentes

Une inclusion dit qu’une brique appartient à un ensemble, une expérience ou une structure.

Une relation orientée affirme un échange ou une interaction entre deux extrémités explicitement déclarées.

Ne pas ajouter une flèche lorsque l’inclusion suffit déjà à raconter le fait.

Deux relations opposées restent deux relations distinctes.

## 6. L’absence ne signifie pas le contraire

Trucagramme reste descriptif et permissif.

Une propriété absente signifie seulement qu’elle n’est pas affirmée dans cette fiche.

Ainsi, l’absence de `activable`, `autonome` ou d’une technologie ne permet pas d’en déduire automatiquement la négation.

## 7. Identité, nature, rôle et technologie sont distincts

Ces informations ne doivent pas être confondues.

- **identité** : de quelle brique ou technologie parle-t-on ?
- **nature** : quel genre d’objet est-ce dans le récit ?
- **rôle** : qu’apporte-t-il ici ?
- **technologie** : sur quoi repose-t-il ?

Un logo peut porter une identité sans suffire à exprimer le rôle ou le sens métier.

Une même technologie peut apparaître plusieurs fois avec des portées différentes sans constituer un doublon sémantique.

## 8. Économie graphique

Un texte visible qui ne fait que répéter une information déjà portée clairement par la forme, la position, la couleur ou un logo doit pouvoir disparaître.

En revanche, un mot court reste utile lorsqu’il empêche un contresens.

Exemples actuels :

- `1 parmi 3` distingue des alternatives d’un ensemble cumulatif ;
- `activable` qualifie uniquement le Correcteur ;
- une version comme `10` complète l’identité `.NET` ;
- un nom métier reste nécessaire même si son format possède un logo.

## 9. Deux sens différents de « autonome »

Le mot `autonome` ne doit pas être interprété de la même manière selon son porteur.

### Application autonome

Pour une application, **autonome** signifie qu’elle installe avec elle tout ce dont elle a besoin pour fonctionner.

Elle ne dépend pas pour son fonctionnement normal d’un objet extérieur qui pourrait être présent ou absent sur la machine.

Cette notion décrit l’autosuffisance de la distribution / de l’exécution.

### Plugin autonome

Pour une brique de type plugin, l’autonomie concerne son **cycle de vie**.

Un plugin :

- est un objet à part entière ;
- peut évoluer indépendamment ;
- est découvert par l’application au lancement selon un contrat connu ;
- peut être remplacé ou mis à jour sans que le cœur de l’application ait besoin de connaître son implémentation particulière.

Le mot `autonome` devient alors largement redondant avec la notion même de plugin.

## 10. « Plugin » est la cible grammaticale pour les modules de TRAME

Le terme actuel `module_produit` décrit correctement l’état du modèle 0.1.15, mais il n’est probablement pas le meilleur vocabulaire durable.

Pour TRAME, **plugin** exprime plus clairement la réalité visée.

Personnages, Lieux et Correcteur sont des plugins ou ont vocation à être lus ainsi.

### Super

Super ne doit pas être utilisé pour figer une opposition fondamentale entre `composant_interne` et plugin.

Architecturalement, Super a lui aussi vocation à devenir un plugin.

La cible de TRAME est un cœur essentiellement orchestrateur de plugins. Super est central dans le produit, mais son importance ne lui interdit pas d’être un plugin.

Conséquence pour Trucagramme :

> **le rôle d’un plugin et son importance sont distincts de sa nature de plugin.**

Le type actuel `composant_interne` de Super doit donc être considéré comme un état transitoire du modèle, pas comme une catégorie grammaticale à généraliser à partir de ce seul exemple.

Aucune migration du schéma n’est décidée par ce document. Le vocabulaire actuel reste valide jusqu’à une mission dédiée.

## 11. Les interactions extérieures importantes appartiennent à la vue 1

Une capacité extérieure importante doit rester visible lorsqu’elle fait partie de ce que l’application sait faire et de ce qui la caractérise.

Le critère n’est pas seulement « une autre fenêtre s’ouvre ».

Le critère utile est :

> **si retirer cette interaction extérieure déforme sensiblement la compréhension de ce que fait l’application, elle appartient à la vue 1.**

Cette règle est particulièrement importante pour Mon Bureau, dont une fonction centrale consiste justement à agir sur le monde extérieur : applications, dossiers, raccourcis, serveur, etc.

Les mécanismes intermédiaires qui réalisent ces ouvertures peuvent rester masqués si leur présence n’ajoute pas de compréhension de niveau 1.

## 12. Cardinalité et lecture partielle

La cardinalité appartient au sens déclaré par le modèle, pas au sous-ensemble que le renderer réussit à représenter.

Si le modèle déclare trois alternatives et que le renderer n’en comprend que deux, afficher `1 parmi 2` serait une affirmation fausse.

La règle cible est donc :

> **une cardinalité visible doit rester fidèle au modèle déclaré ; la lecture partielle signale séparément ce que le renderer ne sait pas représenter.**

Le comportement actuel observé dans une contre-épreuve de Work — `1 parmi 2` lorsqu’une référence parmi trois devient inconnue — est reconnu comme conceptuellement erroné.

Il n’est pas corrigé immédiatement car les spécimens canoniques actuels ne déclenchent pas ce défaut. Une future mission pourra le corriger lorsqu’un cas réel ou une évolution du renderer le justifiera.

## 13. Lecture partielle

Le signal **⚠** signifie :

> le lecteur ne sait pas représenter tout le sens déclaré dans le spécimen.

Il ne signifie pas :

- que l’application réelle est mal documentée ;
- que le diagramme doit montrer chaque détail connu ;
- que toute information volontairement silencieuse constitue une erreur.

Un reste vide signifie seulement que le renderer a consommé tout ce qu’il sait interpréter dans la description fournie.

## 14. Ce qui reste expérimental

Les notions suivantes ne doivent pas encore être généralisées au-delà de leurs cas réels sans nouvel exemple discriminant :

- les alternatives `1 parmi N` au-delà du cas TRAME ;
- le vocabulaire actuel `composant_interne` ;
- la migration éventuelle de `module_produit` vers `plugin` ;
- les types particuliers de persistance comme `projet_durable` et `recovery_local` ;
- certaines capacités externes propres à Windows ou à Mon Bureau.

Le principe reste :

> **ne pas créer un type universel pour chaque exemple rencontré.**

Une nouvelle catégorie n’est utile que si elle permet de raconter une différence qui change réellement la lecture.

## 15. Règle de travail pour la suite

Avant d’ajouter une nouvelle famille, un nouveau type ou une nouvelle convention graphique, vérifier :

1. quel fait réel doit être raconté ;
2. quel est son porteur ;
3. si une convention existante suffit ;
4. si l’absence de nouvelle convention créerait réellement un contresens ;
5. si le nouveau cas mérite une généralisation ou seulement une représentation locale.

Trucagramme doit continuer à apprendre de cas réels plutôt qu’à construire par avance une ontologie exhaustive.

## Sources principales

- [Grammaire alpha](GRAMMAIRE_ALPHA.md)
- [Séparation sémantique / rendu](SEPARATION_SEMANTIQUE_RENDU.md)
- [Rapport d’analyse Work du 22 novembre 2026](../reports/analyse-grammaire-trucagramme.md) si présent dans le dépôt
- [TG-018 — mission](../missions/TG-018_projections_monostack_trame.md)
- [TG-018 — rapport](../reports/TG-018/rapport.md)
