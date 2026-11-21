export default {
  schema_version: "0.1.9",
  projet: {
    presentation: [
      "Un catalogue personnel pour conserver et retrouver des objets, des sites et des curiosités.",
      "Chaque fiche peut réunir noms, surnoms, lien, commentaire, catégories et dates.",
      "La recherche permet de retrouver rapidement une fiche.",
      "Le cabinet conserve les données sur le poste et permet de les importer, de les exporter et de les sauvegarder."
    ]
  },

  appli: {
    nom: "Mon Aise",
    alias: "mon_aise",
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
