const icones = {
  vscode: "vscode.png",
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
  img.src = "assets/communs/" + icones[cle];
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
  const chemin = alias + "/" + fichier;
  const racine = "assets/projets/";
  async function liens(dossier) {
    const reponse = await fetch(racine + dossier);
    if (!reponse.ok) return null;
    return new DOMParser().parseFromString(await reponse.text(), "text/html");
  }
  try {
    const index = await liens("");
    // Pages fournit les liens vers les PNG ; http.server liste les sous-dossiers.
    if (!index?.querySelector(`a[href="${chemin}"]`)) {
      if (!index?.querySelector(`a[href="${alias}/"]`)) return;
      const dossier = await liens(alias + "/");
      if (!dossier?.querySelector(`a[href="${fichier}"]`)) return;
    }
  } catch {
    return;
  }
  const img = element("img", "robot");
  img.alt = "";
  img.addEventListener("load", () => entete.prepend(img), { once: true });
  img.src = racine + chemin;
}

const rolesTechniques = new Set(["runtime", "langage", "bibliotheque_graphique"]);
const nomsTechnos = new Map([
  [".net 10", ".NET 10"], ["c#", "C#"], ["windows forms", "Windows Forms"],
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

function outilsPilotes(modele) {
  const refs = modele.appli.outils_pilotes;
  if (!Array.isArray(refs)) return null;
  const tuiles = [];
  const restantes = [];
  for (const cle of refs) {
    const outil = typeof cle === "string" && Object.hasOwn(modele, cle) ? modele[cle] : null;
    if (outil?.type !== "outil_pilote" || !texte(outil.nom)) {
      restantes.push(cle);
      continue;
    }
    prendre(outil, "type");
    tuiles.push(element("span", "outil-pilote", prendre(outil, "nom")));
  }
  modele.appli.outils_pilotes = restantes;
  return groupe("groupe-outils", "Outils pilotés", tuiles);
}

function application(appli, outils) {
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
  const groupes = [socle(appli.socle_technique), outils, donnees(appli.donnees)].filter(Boolean);
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

const typesDonneesExternes = new Set(["dossier_donnees", "archives_locales", "fichiers"]);

function rendreDonneeExterne(objet) {
  const nom = prendre(objet, "nom");
  const type = prendre(objet, "type");
  const carte = element("article", "object donnee-externe");
  carte.setAttribute("aria-label", nom);
  const corps = element("div", "forme-externe");
  carte.append(corps);
  if (type === "dossier_donnees") {
    corps.classList.add("forme-dossier");
    corps.append(element("h2", "", nom));
  } else if (type === "archives_locales") {
    corps.classList.add("forme-archive");
    const poignee = element("span", "poignee-archive");
    poignee.setAttribute("aria-hidden", "true");
    corps.append(poignee);
    corps.title = nom;
  } else {
    corps.classList.add("forme-fichiers");
    corps.title = nom;
  }
  const pastilles = [];
  if (objet.lecture_seule === true) {
    prendre(objet, "lecture_seule");
    corps.append(element("span", "propriete-externe", "LECTURE SEULE"));
  }
  if (objet.statut === "experimental") {
    prendre(objet, "statut");
    corps.append(element("span", "propriete-externe statut-externe", "EXPÉRIMENTAL"));
  }
  if (texte(objet.format)) {
    const format = prendre(objet, "format");
    if (type !== "archives_locales" || format !== "dossier") pastilles.push(format);
  }
  if (Array.isArray(objet.formats) && objet.formats.length && objet.formats.every(texte)) {
    const formats = prendre(objet, "formats").map(format => format.toUpperCase());
    if (type === "fichiers") {
      corps.append(...formats.map(format => element("span", "feuille-format", format)));
    } else {
      pastilles.push(formats.join(" · "));
    }
  }
  if (type === "fichiers" && !corps.childElementCount) corps.append(element("span", "feuille-format", nom));
  if (objet.integrite === "sha256") {
    prendre(objet, "integrite");
    pastilles.push("SHA-256");
  }
  if (pastilles.length) corps.append(element("div", "qualifications",
    ...pastilles.map(libelle => element("span", "", libelle))));
  return carte;
}

function rendreEditeur(id, objet) {
  const nom = prendre(objet, "nom");
  prendre(objet, "type");
  const identite = id === "vscode" ? image("vscode", "logo-editeur") : element("strong", "", nom);
  const carte = element("article", "object fenetre-editeur", identite);
  carte.setAttribute("aria-label", nom);
  return carte;
}

function unitesExternes(modele) {
  const objets = new Map(Object.entries(modele).filter(([, objet]) =>
    (typesDonneesExternes.has(objet?.type) || objet?.type === "editeur") && texte(objet.nom)));
  const inclus = new Set();
  const contextes = new Map();
  for (const [id, contexte] of Object.entries(modele)) {
    if (contexte?.type !== "contexte" || !texte(contexte.nom) || !Array.isArray(contexte.contient)) continue;
    const membres = [];
    const restants = [];
    for (const cle of contexte.contient) {
      if (objets.has(cle) && !inclus.has(cle)) {
        membres.push(cle);
        inclus.add(cle);
      } else {
        restants.push(cle);
      }
    }
    if (!membres.length) continue;
    contexte.contient = restants;
    prendre(contexte, "type");
    contextes.set(id, { idContexte: id, nom: prendre(contexte, "nom"), membres });
  }

  const unites = [];
  for (const id of Object.keys(modele)) {
    if (contextes.has(id)) unites.push(contextes.get(id));
    else if (objets.has(id) && !inclus.has(id)) unites.push({ membres: [id] });
  }
  return unites;
}

function ajouterObjetsExternes(diagramme, modele, relations, nomAppli) {
  const unites = unitesExternes(modele);
  if (!unites.length) return;
  diagramme.classList.add("avec-objets-externes");
  const colonnes = [element("div", "colonne gauche"), element("div", "colonne droite")];
  unites.forEach(({ idContexte, nom, membres }, index) => {
    const liens = relations.filter(r => r && (
      (r.source === "appli" && membres.includes(r.destination)) ||
      (r.destination === "appli" && membres.includes(r.source))
    ));
    const gauche = unites.length === 1
      ? liens.length > 0 && liens.every(r => r.destination === "appli")
      : index % 2 === 0;
    const unite = element("div", "unite-externe");
    unite.style.setProperty("--ordre", index + 1);
    if (nom) {
      unite.classList.add("avec-contexte");
      if (idContexte === "chrome") unite.classList.add("contexte-chrome");
      unite.setAttribute("role", "group");
      unite.setAttribute("aria-label", nom);
    }
    for (const id of membres) {
      const objet = modele[id];
      const flux = element("div", "flux-externes");
      for (const relation of liens.filter(r => r.source === id || r.destination === id)) {
        const versAppli = relation.destination === "appli";
        const description = versAppli ? objet.nom + " vers " + nomAppli : nomAppli + " vers " + objet.nom;
        flux.append(fleche("flux-externe " + (versAppli ? "vers-appli" : "depuis-appli"), description));
        prendre(relation, "source");
        prendre(relation, "destination");
      }
      const ligne = element("div", "ligne-externe");
      if (flux.childElementCount) ligne.append(element("span", "origine-mobile", nomAppli), flux);
      const carte = objet.type === "editeur" ? rendreEditeur(id, objet) : rendreDonneeExterne(objet);
      if (nom && id === membres[0]) carte.prepend(element("span", "nom-contexte", idContexte === "chrome" ? null : nom));
      ligne.append(carte);
      unite.append(ligne);
    }
    colonnes[gauche ? 0 : 1].append(unite);
  });
  diagramme.append(...colonnes.filter(colonne => colonne.childElementCount));
}

function rendreDiagramme(modele) {
  const nom = modele.appli.nom;
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
    application(modele.appli, outilsPilotes(modele)),
    sortie ? fleche("connector-out", nom + " vers le navigateur") : null, fenetre);
  diagramme.setAttribute("aria-label", "Schéma technique de " + nom);
  ajouterObjetsExternes(diagramme, modele, relations, nom);
  return diagramme;
}

export { element, prendre, rendreDiagramme, resteDuSens, texte };
