export default {
  schema_version: "0.1.13",

  projet: {
    presentation: [
      "Cockpit Windows pour lancer et administrer des projets, applications, dossiers et outils techniques.",
      "Il s’appuie sur une configuration JSON locale pour organiser les lanceurs et les catégories.",
      "Depuis son interface, il pilote les outils installés et mobilise les services système Windows.",
      "Il lance des applications via leurs raccourcis, ouvre les dossiers dans l’Explorateur et gère des serveurs locaux."
    ]
  },

  appli: {
    nom: "Mon Bureau",
    alias: "mon_bureau",
    type: "bureau",
    mode_execution: "local",

    tourne_sous: {
      os: "windows"
    },

    socle_technique: {
      runtime: ".net 10",
      langage: "c#",
      bibliotheque_graphique: "windows forms"
    },

    outils_pilotes: ["git", "curl", "python", "powershell", "tree"],

    services_systeme: ["processus_windows", "tcp_windows"],

    donnees: {
      locales: true,
      separees_des_binaires: true,

      configuration: {
        role: "configuration",
        format: "json"
      }
    }
  },

  processus_windows: {
    nom: "Processus",
    type: "service_systeme"
  },

  tcp_windows: {
    nom: "Ports TCP",
    type: "service_systeme"
  },

  vscode: {
    nom: "Visual Studio Code",
    type: "editeur",
    contenu: [
      { nom: "Mon GPT<3", type: "projet_info" },
      { nom: "Trucagramme", type: "projet_info" }
    ]
  },

  raccourcis_windows: {
    nom: "Raccourcis .lnk",
    type: "raccourci_windows"
  },

  explorateur_windows: {
    nom: "Explorateur Windows",
    type: "explorateur"
  },

  git: {
    nom: "Git",
    type: "outil_pilote"
  },

  curl: {
    nom: "curl",
    type: "outil_pilote"
  },

  python: {
    nom: "Python",
    type: "outil_pilote"
  },

  powershell: {
    nom: "PowerShell",
    type: "outil_pilote"
  },

  tree: {
    nom: "tree",
    type: "outil_pilote"
  },

  serveur_local: {
    nom: "Serveur local",
    type: "serveur",
    moteur: "python",
    protocole: "http",
    hote: "127.0.0.1"
  },

  relations: [
    { source: "appli", destination: "vscode" },

    { source: "appli", destination: "raccourcis_windows" },
    { source: "appli", destination: "explorateur_windows" },

    { source: "appli", destination: "serveur_local" },
    { source: "serveur_local", destination: "appli" }
  ],

  specimen: {
    version: "alpha-0.0.0.1",
    debug: true
  }
};
