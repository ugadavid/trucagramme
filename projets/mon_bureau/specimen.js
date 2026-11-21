export default {
  schema_version: "0.1.7",

  projet: {
    presentation: [
      "Cockpit Windows pour lancer et administrer des projets, applications, dossiers et outils techniques.",
      "Il s’appuie sur une configuration JSON locale pour organiser les lanceurs et les catégories.",
      "Il invoque plusieurs outils installés comme VS Code, Git, curl, Python, PowerShell et tree.",
      "Il peut aussi démarrer, surveiller et arrêter des serveurs locaux et certains processus Windows."
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

    livraison: "autonome",

    socle_technique: {
      runtime: ".net 10",
      langage: "c#",
      bibliotheque_graphique: "windows forms"
    },

    donnees: {
      locales: true,
      separees_des_binaires: true,

      configuration: {
        role: "configuration",
        format: "json"
      }
    }
  },

  windows: {
    nom: "Windows",
    type: "contexte",
    contient: [
      "shell_windows",
      "processus_windows",
      "tcp_windows"
    ]
  },

  shell_windows: {
    nom: "Shell Windows",
    type: "service_systeme"
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
    type: "outil_externe"
  },

  git: {
    nom: "Git",
    type: "outil_externe"
  },

  curl: {
    nom: "curl",
    type: "outil_externe"
  },

  python: {
    nom: "Python",
    type: "outil_externe"
  },

  powershell: {
    nom: "PowerShell",
    type: "outil_externe"
  },

  tree: {
    nom: "tree",
    type: "outil_externe"
  },

  serveur_local: {
    nom: "Serveur local",
    type: "service_local",
    protocole: "http",
    hote: "127.0.0.1"
  },

  relations: [
    { source: "appli", destination: "shell_windows" },

    { source: "appli", destination: "processus_windows" },
    { source: "processus_windows", destination: "appli" },

    { source: "appli", destination: "tcp_windows" },
    { source: "tcp_windows", destination: "appli" },

    { source: "appli", destination: "vscode" },

    { source: "appli", destination: "git" },
    { source: "git", destination: "appli" },

    { source: "appli", destination: "curl" },
    { source: "curl", destination: "appli" },

    { source: "appli", destination: "python" },

    { source: "python", destination: "serveur_local" },
    { source: "appli", destination: "serveur_local" },
    { source: "serveur_local", destination: "appli" },

    { source: "appli", destination: "powershell" },
    { source: "powershell", destination: "appli" },

    { source: "appli", destination: "tree" },
    { source: "tree", destination: "appli" }
  ],

  specimen: {
    version: "alpha-0.0.0.1"
  }
};
