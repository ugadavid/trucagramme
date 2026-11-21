import { element, resteDuSens, texte } from "./rendu.js";

// Seuls des identifiants courts peuvent devenir des libellés dans la bulle.
function identifiant(cle) {
  return /^[\p{L}_][\p{L}\p{N}_-]{0,63}$/u.test(cle) ? cle : "…";
}

export function inventorier(reste) {
  const objets = [];
  const chemins = new Set();
  let nombreRelations = 0;

  function parcourir(chemin, valeur) {
    if (valeur && typeof valeur === "object" && !Array.isArray(valeur)) {
      for (const [cle, enfant] of Object.entries(valeur)) {
        parcourir(chemin + "." + identifiant(cle), enfant);
      }
    } else if (resteDuSens(valeur)) {
      chemins.add(chemin);
    }
  }

  for (const [cle, valeur] of Object.entries(reste)) {
    if (cle === "relations" && Array.isArray(valeur)) {
      nombreRelations = valeur.filter(resteDuSens).length;
    } else if (cle !== "appli" && texte(valeur?.type)) {
      objets.push({ cle: identifiant(cle), type: identifiant(valeur.type) });
    } else {
      parcourir(identifiant(cle), valeur);
    }
  }
  const lignes = [...objets.map(({ cle, type }) => cle + " · " + type), ...chemins];
  if (nombreRelations) {
    lignes.push("relations · " + nombreRelations + (nombreRelations === 1 ? " non représentée" : " non représentées"));
  }
  return { objets, lignes };
}

export function ajouterLecturePartielle(titre, lignes) {
  if (!lignes.length) return;

  const signal = element("button", "lecture-partielle", "⚠");
  signal.type = "button";
  signal.setAttribute("aria-label", "Lecture partielle");
  signal.setAttribute("aria-expanded", "false");
  signal.setAttribute("aria-controls", "detail-lecture");
  const liste = element("ul", "", ...lignes.map(ligne => element("li", "", ligne)));
  const detail = element("div", "detail-lecture", element("strong", "", "Lecture partielle"), liste);
  detail.id = "detail-lecture";
  detail.tabIndex = 0;
  detail.hidden = true;
  const zone = element("div", "ancre-lecture", signal, detail);
  (titre.querySelector(".version") ?? titre).append(zone);

  let epingle = false;
  function placer() {
    if (detail.hidden) return;
    const x = signal.getBoundingClientRect().left;
    const marge = 8;
    const fin = document.documentElement.clientWidth - marge - detail.offsetWidth;
    detail.style.left = Math.max(marge - x, Math.min(0, fin - x)) + "px";
  }
  function afficher(ouvert) {
    detail.hidden = !ouvert;
    signal.setAttribute("aria-expanded", String(ouvert));
    if (!ouvert) epingle = false;
    else placer();
  }
  zone.onpointerenter = event => {
    if (event.pointerType === "mouse") afficher(true);
  };
  zone.onpointerleave = () => {
    if (!epingle && !zone.contains(document.activeElement)) afficher(false);
  };
  zone.addEventListener("focusin", () => afficher(true));
  zone.addEventListener("focusout", event => {
    if (!zone.contains(event.relatedTarget)) afficher(false);
  });
  signal.onclick = () => {
    epingle = !epingle;
    afficher(epingle);
  };
  document.addEventListener("pointerdown", event => {
    if (!zone.contains(event.target)) afficher(false);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !detail.hidden) {
      if (detail.contains(document.activeElement)) signal.focus({ preventScroll: true });
      afficher(false);
    }
  });
  window.addEventListener("resize", placer);
}
