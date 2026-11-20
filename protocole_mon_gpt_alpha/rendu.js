const icones = {
  "Mon GPT<3": "mon-gtp.png",
  windows: "windows.png",
  python: "python.png",
  "tkinter / Tk": "Tk.png",
  "extension-chrome": "ExtensionChrome.png",
  json: "json.png",
  fichiers_interface: "fichiers.png",
  images_personnelles: "images.png",
  chatgpt: "ChatGPT.png"
};

function element(tag, classe, ...contenu) {
  const noeud = document.createElement(tag);
  if (classe) noeud.className = classe;
  noeud.append(...contenu.filter(item => item != null));
  return noeud;
}

function image(cle, classe, alt = "") {
  if (!Object.hasOwn(icones, cle)) return null;
  const img = element("img", classe);
  img.src = "../assets/" + icones[cle];
  img.alt = alt;
  return img;
}

function groupe(classe, nom, membres) {
  if (!membres.length) return null;
  const section = element("section", "group " + classe, ...membres);
  section.setAttribute("aria-label", nom);
  return section;
}

function socle(tech) {
  const membres = [];
  if (tech?.langage === "python") {
    membres.push(element("div", "tech-item python", image("python", "python-mark", "Python")));
  }
  if (tech?.bibliotheque_graphique === "tkinter / Tk") {
    membres.push(element("div", "tech-item tk", image("tkinter / Tk", "tk-mark"),
      element("strong", "", "Tkinter / Tk")));
  }
  return groupe("tech-group", "Socle technique", membres);
}

function donnees(data) {
  const lignes = [];
  const catalogue = data?.catalogue;
  const libelle = [catalogue?.role === "catalogue" && "Catalogue",
    catalogue?.format === "json" && "JSON"].filter(Boolean).join(" ");
  if (libelle) {
    lignes.push(element("div", "data-item", catalogue.format === "json" ? image("json", "data-icon") : null,
      element("strong", "", libelle)));
  }
  if (data?.interface?.type === "fichiers_interface") {
    lignes.push(element("div", "data-item", image("fichiers_interface", "data-icon"),
      element("strong", "", "Fichiers d’interface")));
  }
  if (data?.images_personnelles && typeof data.images_personnelles === "object") {
    const option = data.images_personnelles.optionnel === true
      ? element("span", "mini-property", "optionnel") : null;
    lignes.push(element("div", "data-item", image("images_personnelles", "data-icon"),
      element("strong", "", "Images personnelles"), option));
  }
  const section = groupe("data-group", data?.locales === true ? "Données locales" : "Données", lignes);
  if (section && data.separees_des_binaires === true) {
    section.prepend(element("div", "property property-data", "SÉPARÉ DES BINAIRES"));
  }
  return section;
}

function application(appli) {
  const titre = element("div", "app-heading", element("h2", "", appli.nom));
  const puces = [];
  if (appli.mode_execution === "local") puces.push(element("span", "chip chip-local", "● local"));
  if (appli.type === "bureau") puces.push(element("span", "chip chip-desktop", "▣ bureau"));
  if (puces.length) titre.append(element("div", "chips", ...puces));

  const mascotte = appli.nom === "Mon GPT<3" ? image(appli.nom, "robot") : null;
  const windows = appli.tourne_sous?.os === "windows" ? image("windows", "windows-mark", "Windows") : null;
  const entete = element("header", "app-header", mascotte, titre, windows);
  const bloc = element("article", "object application", entete);
  if (appli.livraison === "autonome") bloc.prepend(element("div", "property property-main", "AUTONOME"));
  const groupes = [socle(appli.socle_technique), donnees(appli.donnees)].filter(Boolean);
  if (groupes.length) bloc.append(element("div", "app-body", ...groupes));
  return bloc;
}

function compagnon(collector) {
  if (collector?.role_pour_mon_gpt !== "compagnon" || !collector.nom?.trim()) return null;
  const extension = collector.type === "extension" && collector.hote === "chrome"
    ? image("extension-chrome", "extension-mark", "Extension Chrome") : null;
  return element("article", "object companion", extension, element("h2", "", collector.nom));
}

function service(ouverture) {
  if (!ouverture) return null;
  const contenu = element("div", "browser-content", image("chatgpt", "openai-mark"),
    element("h2", "", "ChatGPT"));
  if (ouverture.via !== "navigateur") return element("article", "object service", contenu);
  const barre = element("div", "browser-bar", element("i"), element("i"), element("i"), element("b"));
  barre.setAttribute("aria-hidden", "true");
  return element("article", "object browser", barre, contenu);
}

function fleche(classe, description) {
  const flux = element("div", "connector " + classe, element("span", "", "→"));
  flux.setAttribute("role", "img");
  flux.setAttribute("aria-label", description);
  return flux;
}

function rendreSpecimen(modele) {
  const page = document.querySelector(".page");
  page.replaceChildren();
  document.title = "Schéma technique";
  if (modele?.schema_version !== "0.1" || typeof modele.appli?.nom !== "string" || !modele.appli.nom.trim()) {
    const message = modele?.schema_version !== "0.1"
      ? "Version du modèle absente ou inconnue (schema_version attendue : 0.1)."
      : "Le nom du sujet principal (appli.nom) manque.";
    page.append(element("p", "", message));
    return;
  }

  const nom = modele.appli.nom;
  document.title = nom + " — schéma technique";
  const titre = element("header", "page-title", element("h1", "", document.title));
  if (modele.specimen?.version) titre.append(element("div", "version", modele.specimen.version));

  const relations = Array.isArray(modele.relations) ? modele.relations : [];
  const voisin = compagnon(modele.collector);
  const entree = voisin && relations.some(r => r?.source === "collector" && r.destination === "mon_gpt");
  const ouverture = relations.find(r => r?.source === "mon_gpt" && r.destination === "chatgpt" && r.action === "ouvrir");
  const diagramme = element("section", "diagram", voisin,
    entree ? fleche("connector-in", modele.collector.nom + " vers " + nom) : null,
    application(modele.appli),
    ouverture ? fleche("connector-out", nom + " peut ouvrir ChatGPT") : null, service(ouverture));
  diagramme.setAttribute("aria-label", "Schéma technique de " + nom);
  page.append(titre, diagramme);
  ajouterCommandes(page, diagramme);
}
