import { element, prendre, rendreDiagramme, resteDuSens, texte } from "./rendu.js";
import { ajouterCommandes } from "./interactions.js";

const menu = document.querySelector("#menu-lecteur");
const declencheur = document.querySelector("#declencheur");
const commande = document.querySelector("#commande-presentation");
const panneau = document.querySelector("#presentation");
const fermer = document.querySelector("#fermer");
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

async function chargerProjets() {
  const index = await fetch("projets/index.json");
  if (!index.ok) throw new Error("Index des projets indisponible");
  const alias = await index.json();
  const demande = new URLSearchParams(location.search).get("projet");
  const courant = alias.includes(demande) ? demande : alias[0];
  const projets = await Promise.all(alias.map(async id => {
    if (!/^[a-z0-9_]+$/.test(id)) throw new Error("Alias invalide");
    const { default: specimen } = await import(`../projets/${id}/specimen.js`);
    return specimen;
  }));
  for (const [i, projet] of projets.entries()) {
    const lien = element("a", "", projet.appli.nom);
    lien.href = "?projet=" + alias[i];
    if (alias[i] === courant) lien.setAttribute("aria-current", "page");
    menu.insertBefore(lien, commande);
  }
  rendreSpecimen(projets[alias.indexOf(courant)]);
}

chargerProjets().catch(() => {
  document.querySelector(".page").textContent = "Impossible de charger le projet.";
});
