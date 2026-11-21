const projets = new Map([
  ["mon_aise", { nom: "Mon Aise", fichier: "specimen-mon-aise.js" }],
  ["mon_gpt", { nom: "Mon GPT<3", fichier: "specimen.js" }]
]);
const demande = new URLSearchParams(location.search).get("projet");
const courant = projets.has(demande) ? demande : "mon_aise";

const menu = document.querySelector("#menu-lecteur");
const declencheur = document.querySelector("#declencheur");
const commande = document.querySelector("#commande-presentation");
const panneau = document.querySelector("#presentation");
const fermer = document.querySelector("#fermer");
for (const [alias, projet] of projets) {
  const lien = element("a", "", projet.nom);
  lien.href = "?projet=" + alias;
  if (alias === courant) lien.setAttribute("aria-current", "page");
  menu.insertBefore(lien, commande);
}

function ouvrirMenu(ouvert) {
  menu.hidden = !ouvert;
  declencheur.setAttribute("aria-expanded", String(ouvert));
}

function ouvrirPresentation(ouvert) {
  panneau.hidden = !ouvert;
  commande.setAttribute("aria-expanded", String(ouvert));
  if (ouvert) fermer.focus({ preventScroll: true });
  else commande.focus({ preventScroll: true });
}

declencheur.onclick = () => {
  if (!panneau.hidden) ouvrirPresentation(false);
  ouvrirMenu(menu.hidden);
  declencheur.focus({ preventScroll: true });
};
commande.onclick = () => ouvrirPresentation(panneau.hidden);
fermer.onclick = () => ouvrirPresentation(false);
document.addEventListener("click", event => {
  if (event.target.closest(".lecteur, #presentation")) return;
  if (!panneau.hidden) {
    ouvrirPresentation(false);
    event.preventDefault();
    event.stopPropagation();
  }
  if (!menu.hidden) {
    ouvrirMenu(false);
    if (menu.contains(document.activeElement)) declencheur.focus({ preventScroll: true });
  }
}, true);
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  if (!panneau.hidden) ouvrirPresentation(false);
  else if (!menu.hidden) {
    ouvrirMenu(false);
    declencheur.focus({ preventScroll: true });
  }
});

function rendreSpecimen(source) {
  const page = document.querySelector(".page");
  page.replaceChildren();
  panneau.hidden = true;
  commande.hidden = true;
  commande.setAttribute("aria-expanded", "false");
  document.title = "Trucagramme";
  if (source?.schema_version !== "0.1.3" || !texte(source.appli?.nom)) {
    page.append(element("p", "", source?.schema_version !== "0.1.3"
      ? "Version du modèle absente ou inconnue (schema_version attendue : 0.1.3)."
      : "Le nom du sujet principal (appli.nom) manque."));
    return;
  }

  const modele = structuredClone(source);
  prendre(modele, "schema_version");
  const nom = modele.appli.nom;
  document.title = nom + " · Trucagramme";
  const titre = element("header", "page-title", element("h1", "", nom));
  if (texte(modele.specimen?.version)) titre.append(element("div", "version", prendre(modele.specimen, "version")));

  const lignes = modele.projet?.presentation;
  if (Array.isArray(lignes) && lignes.length && lignes.every(texte)) {
    prendre(modele.projet, "presentation");
    document.querySelector("#nom-presentation").textContent = nom;
    document.querySelector("#texte-presentation").replaceChildren(...lignes.map(ligne => element("p", "", ligne)));
    commande.hidden = false;
  }
  const diagramme = rendreDiagramme(modele);
  if (resteDuSens(modele)) {
    const signal = element("span", "lecture-partielle", "⚠");
    signal.setAttribute("role", "img");
    signal.setAttribute("aria-label", "Lecture partielle");
    (titre.querySelector(".version") ?? titre).append(signal);
  }
  page.append(titre, diagramme);
  ajouterCommandes(page, diagramme);
}

const scriptSpecimen = document.createElement("script");
scriptSpecimen.src = projets.get(courant).fichier;
scriptSpecimen.onload = () => rendreSpecimen(specimen);
scriptSpecimen.onerror = () => document.querySelector(".page").textContent = "Impossible de charger le projet.";
document.head.append(scriptSpecimen);
