const specimen = {
  schema_version: "0.1.1",

  appli: {
    nom: "Mon Aise",
    type: "bureau",
    mode_execution: "local",

    tourne_sous: {
      os: "windows"
    },

    livraison: "autonome",

    socle_technique: {
      runtime: "electron",
      langage: "javascript / typescript",
      bibliotheque_graphique: "react"
    },

    donnees: {
      locales: true,
      separees_des_binaires: true,

      catalogue: {
        role: "catalogue",
        format: "json"
      },

      configurations_csv: {
        role: "configuration",
        format: "json"
      },

      images_personnelles: {
        format: "webp",
        optionnel: true
      },

      sauvegardes: {
        role: "sauvegarde",
        format: "zip"
      }
    }
  },

  specimen: {
    version: "alpha-0.0.0.1"
  }
};
