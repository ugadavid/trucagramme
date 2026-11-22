export default {
  schema_version: "0.1.14",

  projet: {
    presentation: [
          "Projection expérimentale de TRAME avec Electron comme unique implémentation.",
          "Cette fiche n’exprime aucun choix technologique : elle sert à éprouver une vue 1 mono-implémentation.",
          "Le socle du host, celui de Super et celui des modules produit sont montrés ensemble pour tester la profondeur utile de la vue 1.",
          "Projet durable et Recovery local restent distincts comme dans la fiche TRAME canonique."
    ]
  },

  appli: {
    nom: "TRAME / Electron",
    alias: "trame_electron",
    type: "bureau",
    mode_execution: "local",
    statut: "experimental",

    tourne_sous: {
      os: "windows"
    },

    socle_technique: {
          "runtime": "electron",
          "bibliotheque_graphique": "technologies web"
    },

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

  super: {
    nom: "Super",
    type: "composant_interne",
    role: "éditeur interne",

    socle_technique: {
      langage: "javascript",
      interface: "html / css",
      integration_hote: "javascript / iframe chromium"
    }
  },

  personnages: {
    nom: "Personnages",
    type: "module_produit",

    socle_technique: {
          "langage": "javascript",
          "integration_hote": "module esm / renderer electron"
    }
  },

  lieux: {
    nom: "Lieux",
    type: "module_produit",

    socle_technique: {
          "langage": "javascript",
          "integration_hote": "module esm / renderer electron"
    }
  },

  correcteur: {
    nom: "Correcteur",
    type: "module_produit",
    activable: true,

    socle_technique: {
      runtime: ".net",
      moteur: "wecantspell.hunspell",
      integration_hote: "node"
    },

    dictionnaire: "FR Classique 7.7"
  },

  specimen: {
    version: "alpha-0.0.0.1"
  }
};
