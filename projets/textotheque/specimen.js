export default {
  schema_version: "0.1.15",

  projet: {
    presentation: [
      "Application desktop locale DB-first pour écrire, classer, rechercher et exporter des textes.",
      "Le renderer React ne touche ni Node.js, ni SQLite : il passe par un pont Electron isolé.",
      "Le processus principal porte la gestion des bibliothèques et la couche DB ; better-sqlite3 dialogue avec SQLite.",
      "La bibliothèque SQLite reste la source de vérité. L’export en texte brut est volontaire et reste extérieur à la bibliothèque."
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
      runtime: "electron"
    },

    composants_internes: [
      "renderer_react",
      "pont_electron",
      "couche_db"
    ],

    donnees: {
      locales: true,
      separees_des_binaires: true,

      bibliotheque_sqlite: {
        role: "source de vérité",
        format: "sqlite"
      }
    }
  },

  renderer_react: {
    nom: "Renderer React",
    type: "composant_interne",
    role: "interface, édition et état de session",

    socle_technique: {
      langage: "typescript",
      bibliotheque_graphique: "react"
    }
  },

  pont_electron: {
    nom: "Pont Electron",
    type: "composant_interne",
    role: "frontière renderer / main",

    socle_technique: {
      runtime: "electron",
      langage: "typescript",
      interface: "preload / contextBridge / IPC"
    }
  },

  couche_db: {
    nom: "Couche DB",
    type: "composant_interne",
    role: "bibliothèques, recherches et persistance",

    socle_technique: {
      langage: "typescript",
      moteur: "better-sqlite3",
      integration_hote: "main process electron"
    }
  },

  exports_txt: {
    nom: "Export .txt",
    type: "fichiers",
    formats: ["txt"]
  },

  relations: [
    { source: "renderer_react", destination: "pont_electron" },
    { source: "pont_electron", destination: "couche_db" },
    { source: "appli", destination: "exports_txt" }
  ],

  specimen: {
    version: "alpha-0.0.0.1"
  }
};
