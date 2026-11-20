const specimen = {
  schema_version: "0.1.1",
  appli: {
    nom: "Mon GPT<3",
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
