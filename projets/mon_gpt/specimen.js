export default {
  schema_version: "0.1.9",
  projet: {
    presentation: [
      "Gestionnaire local de fils ChatGPT.",
      "Il permet d’organiser, de rechercher et de retrouver ses conversations.",
      "Les conversations peuvent être importées depuis Mon GPT Collector.",
      "Les données restent sur le poste."
    ]
  },
  appli: {
    nom: "Mon GPT<3",
    alias: "mon_gpt",
    type: "bureau",
    mode_execution: "local",
    tourne_sous: { os: "windows" },
    livraison: "autonome",
    socle_technique: { langage: "python", bibliotheque_graphique: "tkinter / Tk" },
    donnees: {
      locales: true,
      separees_des_binaires: true,
      catalogue: { role: "catalogue", format: "json" },
      interface: { type: "fichiers_interface" },
      images_personnelles: { optionnel: true }
    }
  },
  collector: {
    nom: "Mon GPT Collector",
    type: "extension",
    hote: "chrome",
    role: "compagnon"
  },
  navigateur: {
    type: "navigateur",
    contenu: { nom: "ChatGPT", type: "service_web" }
  },
  relations: [
    { source: "collector", destination: "appli" },
    { source: "appli", destination: "navigateur" }
  ],
  specimen: { version: "alpha-0.0.0.1" }
};
