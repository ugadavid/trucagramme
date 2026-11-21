import { element, prendre, rendreDiagramme, texte } from "./rendu.js";
import { ajouterLecturePartielle, inventorier } from "./lecture-partielle.js";
import { ajouterCommandes } from "./interactions.js";

const menu = document.querySelector("#menu-lecteur");
const declencheur = document.querySelector("#declencheur");
const commande = document.querySelector("#commande-presentation");
const commandeLegende = document.querySelector("#commande-legende");
const panneau = document.querySelector("#panneau-lecteur");
const titrePanneau = document.querySelector("#titre-panneau");
const presentation = document.querySelector("#texte-presentation");
const legende = document.querySelector("#signes-legende");
let commandeActive = null;
const fermer = document.querySelector("#fermer");
const versionSchema = "0.1.12";
function ouvrirMenu(ouvert) {
  menu.hidden = !ouvert;
  declencheur.setAttribute("aria-expanded", String(ouvert));
}

function fermerPanneau() {
  if (!commandeActive) return;
  panneau.hidden = true;
  commandeActive.setAttribute("aria-expanded", "false");
  commandeActive.focus({ preventScroll: true });
  commandeActive = null;
}

function basculerPanneau(bouton) {
  if (commandeActive === bouton) return fermerPanneau();
  commandeActive?.setAttribute("aria-expanded", "false");
  commandeActive = bouton;
  const montreLegende = bouton === commandeLegende;
  presentation.hidden = montreLegende;
  legende.hidden = !montreLegende;
  titrePanneau.textContent = montreLegende ? "Légende" : document.querySelector(".page-title h1").textContent;
  panneau.hidden = false;
  panneau.scrollTop = 0;
  bouton.setAttribute("aria-expanded", "true");
  fermer.focus({ preventScroll: true });
}

declencheur.onclick = () => {
  fermerPanneau();
  ouvrirMenu(menu.hidden);
  declencheur.focus({ preventScroll: true });
};
commande.onclick = () => basculerPanneau(commande);
commandeLegende.onclick = () => basculerPanneau(commandeLegende);
fermer.onclick = fermerPanneau;
document.addEventListener("click", event => {
  if (event.target.closest(".lecteur, #panneau-lecteur")) return;
  if (commandeActive) {
    fermerPanneau();
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  if (!menu.hidden) {
    ouvrirMenu(false);
    if (menu.contains(document.activeElement)) declencheur.focus({ preventScroll: true });
  }
}, true);
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  if (commandeActive) fermerPanneau();
  else if (!menu.hidden) {
    ouvrirMenu(false);
    declencheur.focus({ preventScroll: true });
  }
});

const familles = [
  [".application", "appli", "Application principale"],
  [".tech-group", "technique", "Socle technique"],
  [".groupe-outils", "outils", "Outils pilotés"],
  [".groupe-services", "services", "Services système"],
  [".data-group", "donnees", "Données"],
  [".avec-contexte", "contexte", "Contexte"],
  [".forme-dossier", "dossier", "Dossier / espace de données"],
  [".forme-archive", "archive", "Archive"],
  [".feuille-format", "fichier", "Fichier"],
  [".companion", "compagnon", "Application compagnon"],
  [".objet-serveur", "serveur", "Serveur"],
  [".fenetre-editeur", "editeur", "Éditeur"],
  [".browser", "navigateur", "Navigateur / surface externe"],
  [".connector", "flux", "Relation / flux"],
  [".property, .mini-property, .propriete-externe, .qualifications span, .proprietes-serveur span, .chip", "propriete", "Propriété"]
];

function remplirLegende(diagramme) {
  legende.replaceChildren();
  for (const [selecteur, forme, libelle] of familles) {
    if (diagramme.querySelector(selecteur)) {
      legende.append(element("li", "", ornement("miniature " + forme), libelle));
    }
  }
}

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
    presentation.replaceChildren(...lignes.map(ligne => element("p", "", ligne)));
    commande.hidden = false;
  }
  const debug = typeof modele.specimen?.debug === "boolean" && prendre(modele.specimen, "debug");
  const diagramme = rendreDiagramme(modele);
  remplirLegende(diagramme);
  commandeLegende.hidden = false;
  const { objets, lignes: inventaire } = inventorier(modele);
  ajouterLecturePartielle(titre, inventaire);
  page.append(titre, debug && objets.length ? entourerDebug(diagramme, objets) : diagramme);
  ajouterCommandes(page, diagramme);
}

function entourerDebug(diagramme, objets) {
  const milieu = Math.ceil(objets.length / 2);
  const cadre = element("div", "construction", diagramme);
  for (const colonne of [objets.slice(0, milieu), objets.slice(milieu)]) {
    if (!colonne.length) continue;
    const cartes = colonne.map(({ cle, type }) =>
      element("li", "", element("strong", "", cle), element("span", "", type)));
    const cartouche = element("aside", "cartouche-debug", element("ul", "", ...cartes));
    cartouche.setAttribute("aria-label", "Éléments DEBUG non représentés");
    cadre.append(cartouche);
  }
  return cadre;
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
