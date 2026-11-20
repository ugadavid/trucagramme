const icones = {
  windows: "windows.png",
  python: "python.png",
  "tkinter / Tk": "Tk.png",
  "extension-chrome": "ExtensionChrome.png",
  json: "json.png",
  fichiers_interface: "fichiers.png",
  images_personnelles: "images.png",
  ChatGPT: "ChatGPT.png"
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

// Le rendu travaille sur une copie. Une valeur consommée disparaît de cette
// copie ; les informations restantes déterminent le signal de lecture partielle.
function prendre(objet, cle) {
  const valeur = objet[cle];
  delete objet[cle];
  return valeur;
}

function resteDuSens(valeur) {
  if (valeur === null || valeur === undefined || valeur === "") return false;
  if (typeof valeur === "object") return Object.values(valeur).some(resteDuSens);
  return true;
}

function texte(valeur) {
  return typeof valeur === "string" && valeur.trim().length > 0;
}

async function chargerIdentite(appli, entete) {
  if (!texte(appli.alias) || !/^[a-z0-9_]+$/.test(appli.alias)) return;
  const alias = prendre(appli, "alias");
  const fichier = alias + ".png";
  if (location.protocol !== "file:") {
    // Un HEAD sur un PNG absent journalise un 404 dans Edge.
    // http.server expose les fichiers présents sous forme de liens.
    try {
      const reponse = await fetch("../assets/");
      if (!reponse.ok) return;
      const dossier = new DOMParser().parseFromString(await reponse.text(), "text/html");
      if (!dossier.querySelector(`a[href="${fichier}"]`)) return;
    } catch {
      return;
    }
  }
  const img = element("img", "robot");
  img.alt = "";
  img.addEventListener("load", () => entete.prepend(img), { once: true });
  img.src = "../assets/" + fichier;
}

const rolesTechniques = new Set(["runtime", "langage", "bibliotheque_graphique"]);
const nomsTechnos = new Map([
  ["electron", "Electron"], ["javascript / typescript", "JavaScript / TypeScript"],
  ["react", "React"], ["python", "Python"], ["tkinter / Tk", "Tkinter / Tk"]
]);

function socle(tech) {
  const membres = [];
  for (const [role, valeur] of Object.entries(tech ?? {})) {
    if (!rolesTechniques.has(role) || !texte(valeur)) continue;
    const nom = nomsTechnos.get(valeur) ?? valeur;
    const python = valeur === "python";
    const tk = valeur === "tkinter / Tk";
    const logo = python || tk ? image(valeur, python ? "python-mark" : "tk-mark", python ? nom : "") : null;
    const item = element("div", tk ? "tech-item tk" : "tech-item", logo,
      python ? null : element("strong", "", nom));
    item.title = role.replaceAll("_", " ") + " · " + nom;
    membres.push(item);
    prendre(tech, role);
  }
  return groupe("tech-group", "Socle technique", membres);
}

const nomsDonnees = new Map([
  ["configurations_csv", "Configurations CSV"], ["fichiers_interface", "Fichiers d’interface"]
]);

function donnees(data) {
  const lignes = [];
  for (const [cle, famille] of Object.entries(data ?? {})) {
    if (cle === "locales" || cle === "separees_des_binaires") continue;
    if (!famille || typeof famille !== "object" || Array.isArray(famille)) continue;
    const type = texte(famille.type) ? prendre(famille, "type") : "";
    const role = texte(famille.role) ? prendre(famille, "role") : "";
    const format = texte(famille.format) ? prendre(famille, "format") : "";
    if (!type && !role && !format && famille.optionnel !== true) continue;
    const nom = nomsDonnees.get(type) ?? nomsDonnees.get(cle) ??
      (cle.charAt(0).toUpperCase() + cle.slice(1)).replaceAll("_", " ");
    const libelle = format ? nom + " " + (format === "webp" ? "WebP" : format.toUpperCase()) : nom;
    const icone = [cle, type, format].find(id => ["images_personnelles", "fichiers_interface", "json"].includes(id));
    const option = famille.optionnel === true ? element("span", "mini-property", "optionnel") : null;
    if (option) prendre(famille, "optionnel");
    const ligne = element("div", "data-item", icone ? image(icone, "data-icon") : null,
      element("strong", "", libelle), option);
    if (role || type) ligne.title = [role, type].filter(Boolean).join(" · ");
    lignes.push(ligne);
  }
  const local = lignes.length && data.locales === true;
  if (local) prendre(data, "locales");
  const section = groupe("data-group", local ? "Données locales" : "Données", lignes);
  if (section && data.separees_des_binaires === true) {
    prendre(data, "separees_des_binaires");
    section.prepend(element("div", "property property-data", "SÉPARÉ DES BINAIRES"));
  }
  return section;
}

function application(appli) {
  const titre = element("div", "app-heading", element("h2", "", prendre(appli, "nom")));
  const puces = [];
  if (appli.mode_execution === "local") puces.push(element("span", "chip chip-local", "● local"));
  if (appli.type === "bureau") puces.push(element("span", "chip chip-desktop", "▣ bureau"));
  if (puces.length) titre.append(element("div", "chips", ...puces));

  if (appli.mode_execution === "local") prendre(appli, "mode_execution");
  if (appli.type === "bureau") prendre(appli, "type");
  const windows = appli.tourne_sous?.os === "windows" ? image("windows", "windows-mark", "Windows") : null;
  if (windows) prendre(appli.tourne_sous, "os");
  const entete = element("header", "app-header", titre, windows);
  chargerIdentite(appli, entete);
  const bloc = element("article", "object application", entete);
  if (appli.livraison === "autonome") {
    prendre(appli, "livraison");
    bloc.prepend(element("div", "property property-main", "AUTONOME"));
  }
  const groupes = [socle(appli.socle_technique), donnees(appli.donnees)].filter(Boolean);
  if (groupes.length) bloc.append(element("div", "app-body", ...groupes));
  return bloc;
}

function compagnon(collector) {
  if (collector?.role !== "compagnon" || !texte(collector.nom)) return null;
  const extension = collector.type === "extension" && collector.hote === "chrome"
    ? image("extension-chrome", "extension-mark", "Extension Chrome") : null;
  prendre(collector, "role");
  if (extension) {
    prendre(collector, "type");
    prendre(collector, "hote");
  }
  return element("article", "object companion", extension, element("h2", "", prendre(collector, "nom")));
}

function navigateur(objet) {
  const nom = objet?.contenu?.nom;
  if (objet?.type !== "navigateur" || typeof nom !== "string" || !nom.trim()) return null;
  prendre(objet, "type");
  prendre(objet.contenu, "nom");
  if (objet.contenu.type === "service_web") prendre(objet.contenu, "type");
  const logo = nom === "ChatGPT" ? image(nom, "openai-mark") : null;
  const contenu = element("div", "browser-content", logo, element("h2", "", nom));
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
  if (modele?.schema_version !== "0.1.2" || typeof modele.appli?.nom !== "string" || !modele.appli.nom.trim()) {
    const message = modele?.schema_version !== "0.1.2"
      ? "Version du modèle absente ou inconnue (schema_version attendue : 0.1.2)."
      : "Le nom du sujet principal (appli.nom) manque.";
    page.append(element("p", "", message));
    return;
  }

  modele = structuredClone(modele);
  prendre(modele, "schema_version");
  const nom = modele.appli.nom;
  document.title = nom + " — schéma technique";
  const titre = element("header", "page-title", element("h1", "", document.title));
  if (texte(modele.specimen?.version)) titre.append(element("div", "version", prendre(modele.specimen, "version")));

  const relations = Array.isArray(modele.relations) ? modele.relations : [];
  const nomCollector = modele.collector?.nom;
  const voisin = compagnon(modele.collector);
  const fenetre = navigateur(modele.navigateur);
  let entree = false;
  let sortie = false;
  for (const relation of relations) {
    if (voisin && relation?.source === "collector" && relation.destination === "appli") entree = true;
    else if (fenetre && relation?.source === "appli" && relation.destination === "navigateur") sortie = true;
    else continue;
    prendre(relation, "source");
    prendre(relation, "destination");
  }
  const diagramme = element("section", "diagram", voisin,
    entree ? fleche("connector-in", nomCollector + " vers " + nom) : null,
    application(modele.appli),
    sortie ? fleche("connector-out", nom + " vers le navigateur") : null, fenetre);
  diagramme.setAttribute("aria-label", "Schéma technique de " + nom);
  if (resteDuSens(modele)) {
    const signal = element("span", "lecture-partielle", "⚠");
    signal.setAttribute("role", "img");
    signal.setAttribute("aria-label", "Lecture partielle");
    (titre.querySelector(".version") ?? titre).append(signal);
  }
  page.append(titre, diagramme);
  ajouterCommandes(page, diagramme);
}
