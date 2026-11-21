export default {
  schema_version: "0.1.5",

  projet: {
    presentation: [
      "Explorateur local et outil de sauvegarde des profils Chrome.",
      "Il lit le dossier User Data pour reconstruire profils, fenêtres, onglets, groupes et favoris.",
      "Il crée et vérifie des sauvegardes complètes, puis peut les consulter et les exporter en JSON ou HTML.",
      "Il peut aussi préparer expérimentalement une copie de restauration fonctionnelle dans un dossier neuf, sans lancer Chrome."
    ]
  },

  appli: {
    nom: "Chrome Organizer",
    alias: "chrome_organizer",
    type: "bureau",
    mode_execution: "local",

    tourne_sous: {
      os: "windows"
    },

    socle_technique: {
      langage: "python",
      bibliotheque_graphique: "tkinter / Tk"
    }
  },

  chrome_user_data: {
    nom: "Chrome User Data",
    type: "dossier_donnees",
    role: "source",
    lecture_seule: true
  },

  sauvegardes: {
    nom: "Sauvegardes",
    type: "archives_locales",
    format: "dossier",
    integrite: "sha256"
  },

  exports: {
    nom: "Exports",
    type: "fichiers",
    formats: ["json", "html"]
  },

  restauration: {
    nom: "Copie de restauration",
    type: "dossier_donnees",
    role: "destination",
    statut: "experimental"
  },

  relations: [
    { source: "chrome_user_data", destination: "appli" },
    { source: "appli", destination: "sauvegardes" },
    { source: "sauvegardes", destination: "appli" },
    { source: "appli", destination: "exports" },
    { source: "appli", destination: "restauration" }
  ],

  specimen: {
    version: "alpha-0.0.0.1"
  }
};
