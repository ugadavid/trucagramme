import { element, prendre, rendreDiagramme, resteDuSens, texte } from "./rendu.js";
import { ajouterCommandes } from "./interactions.js";

const menu = document.querySelector("#menu-lecteur");
const declencheur = document.querySelector("#declencheur");
const commande = document.querySelector("#commande-presentation");
const panneau = document.querySelector("#presentation");
const fermer = document.querySelector("#fermer");
const versionSchema = "0.1.6";
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
  if (source?.schema_version !== versionSchema || !texte(source.appli?.nom)) {
    page.append(element("p", "", source?.schema_version !== versionSchema
      ? `Version du modèle absente ou inconnue (schema_version attendue : ${versionSchema}).`
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

function ornement(classe, ...contenu) {
  const signe = element("span", classe, ...contenu);
  signe.setAttribute("aria-hidden", "true");
  return signe;
}

function rendreAccueil({ systeme }) {
  const groupes = element("div", "exemple-groupes");
  for (const nom of systeme.groupes) {
    groupes.append(element("div", "exemple-groupe", ornement("glyphe"), nom));
  }
  const cadre = element("div", "exemple-central",
    element("header", "exemple-entete", element("h1", "", systeme.titre),
      element("p", "", systeme.description)), groupes);
  const composition = element("div", "exemple",
    ornement("satellite source", ornement("feuillets")), ornement("liaison", "→"),
    cadre, ornement("liaison", "→"), ornement("satellite surface", ornement("fenetre")));
  document.title = "Trucagramme";
  document.querySelector(".page").replaceChildren(element("section", "vue-systeme accueil",
    composition, element("p", "invitation", systeme.invitation)));
}

function rendreProjetIntrouvable({ systeme }, alias) {
  const recherche = element("div", "recherche",
    element("div", "requete", element("span", "etiquette", systeme.demande), element("code", "", alias)),
    ornement("liaison", "→"), ornement("destination-absente", "?"));
  document.title = systeme.titre + " · Trucagramme";
  document.querySelector(".page").replaceChildren(element("section", "vue-systeme introuvable",
    element("h1", "", systeme.titre), recherche, element("p", "message", systeme.message),
    element("p", "invitation", systeme.invitation)));
}

async function chargerProjets() {
  const index = await fetch("projets/index.json");
  if (!index.ok) throw new Error("Index des projets indisponible");
  const alias = await index.json();
  const demande = new URLSearchParams(location.search).get("projet");
  const projets = await Promise.all(alias.map(async id => {
    if (!/^[a-z0-9_]+$/.test(id)) throw new Error("Alias invalide");
    const { default: specimen } = await import(`../projets/${id}/specimen.js`);
    return specimen;
  }));
  for (const [i, projet] of projets.entries()) {
    const lien = element("a", "", projet.appli.nom);
    lien.href = "?projet=" + alias[i];
    if (alias[i] === demande) lien.setAttribute("aria-current", "page");
    menu.insertBefore(lien, commande);
  }
  if (!demande) {
    const { default: accueil } = await import("../projets/accueil/specimen.js");
    rendreAccueil(accueil);
  } else if (alias.includes(demande)) {
    rendreSpecimen(projets[alias.indexOf(demande)]);
  } else {
    const { default: introuvable } = await import("../projets/404/specimen.js");
    rendreProjetIntrouvable(introuvable, demande);
  }
}

chargerProjets().catch(() => {
  document.querySelector(".page").textContent = "Impossible de charger le projet.";
});
