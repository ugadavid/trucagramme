export default {
  schema_version: "0.1.15",

  projet: {
    presentation: [
      "Application desktop locale pour écrire, conserver, organiser et retrouver des textes.",
      "La bibliothèque SQLite est la source de vérité."
    ]
  },

  appli: {
    nom: "Textothèque",
    alias: "textotheque",
    type: "bureau",
    mode_execution: "local",

    tourne_sous: {
      os: "windows"
    },

    livraison: "autonome",

    socle_technique: {
      interface: "Renderer React",
      bibliotheque_graphique: "react",
      langage: "typescript",
      runtime: "Pont Electron",
      moteur: "Couche DB · better-sqlite3"
    },

    donnees: {
      locales: true,
      separees_des_binaires: true,

      bibliotheque_sqlite: {
        role: "source de vérité",
        format: "sqlite"
      }
    }
  },

  specimen: {
    version: "alpha-0.0.0.1"
  }
};
