export default {
  schema_version: "0.1.15",

  projet: {
    presentation: [
      "Environnement local d’écriture, d’organisation et de documentation pour des productions complexes.",
      "TRAME est actuellement éprouvé dans trois implémentations alternatives : Qt, Electron et Avalonia.",
      "Super fournit l’édition de texte commune ; des modules produit ajoutent des capacités spécialisées.",
      "Le travail durable du Projet reste distinct du Recovery local."
    ]
  },

  appli: {
    nom: "TRAME",
    alias: "trame",
    type: "bureau",
    mode_execution: "local",
    statut: "experimental",

    tourne_sous: {
      os: "windows"
    },

    implementations: [
      "trame_qt",
      "trame_electron",
      "trame_avalonia"
    ],

    composants_internes: [
      "super"
    ],

    modules_produit: {
      autonomes: true,
      packages: true,
      membres: [
        "personnages",
        "lieux",
        "correcteur"
      ]
    },

    donnees: {
      locales: true,

      projet: {
        type: "projet_durable",
        contenu: [".tra", "Objets", "Ressources"]
      },

      recovery: {
        type: "recovery_local"
      }
    }
  },

  trame_qt: {
    nom: "TRAME / Qt",
    type: "implementation",
    socle_technique: {
      langage: "python",
      bibliotheque_graphique: "pyside6 / qt"
    }
  },

  trame_electron: {
    nom: "TRAME / Electron",
    type: "implementation",
    socle_technique: {
      runtime: "electron",
      bibliotheque_graphique: "technologies web"
    }
  },

  trame_avalonia: {
    nom: "TRAME / Avalonia",
    type: "implementation",
    socle_technique: {
      runtime: ".net",
      bibliotheque_graphique: "avalonia"
    }
  },

  super: {
    nom: "Super",
    type: "composant_interne",
    role: "éditeur interne"
  },

  personnages: {
    nom: "Personnages",
    type: "module_produit"
  },

  lieux: {
    nom: "Lieux",
    type: "module_produit"
  },

  correcteur: {
    nom: "Correcteur",
    type: "module_produit",
    activable: true
  },

  specimen: {
    version: "alpha-0.0.0.1"
  }
};
