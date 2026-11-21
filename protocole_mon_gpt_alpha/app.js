function ajouterCommandes(page, diagramme) {
  const nav = element("nav", "visual-key");
  nav.setAttribute("aria-label", "Clés visuelles interactives");
  function bouton(cible, symbole, titre) {
    const commande = element("button", cible === "all" ? "reset" : "", symbole);
    commande.type = "button";
    commande.title = titre;
    commande.setAttribute("aria-label", titre);
    commande.dataset.highlight = cible;
    nav.append(commande);
  }
  if (diagramme.querySelector(".tech-group")) bouton("technology", "⚙", "Mettre en évidence le socle technique");
  if (diagramme.querySelector(".data-group")) bouton("data", "▤", "Mettre en évidence les données");
  if (diagramme.querySelector(".connector")) {
    if (nav.childElementCount) nav.append(element("span", "divider"));
    bouton("flow", "→", "Mettre en évidence les flux");
  }
  const nombre = nav.querySelectorAll("button").length;
  if (!nombre) return;
  bouton("all", "×", "Réinitialiser");
  nav.addEventListener("click", event => {
    const cible = event.target.closest("button")?.dataset.highlight;
    if (!cible) return;
    diagramme.classList.remove("is-filtering", "highlight-technology", "highlight-data", "highlight-flow");
    if (cible !== "all") diagramme.classList.add("is-filtering", "highlight-" + cible);
  });
  const aide = nombre === 3 ? "Clique les trois symboles du bas pour isoler une règle de la grammaire visuelle."
    : "Clique un symbole pour mettre en évidence les éléments correspondants.";
  page.append(nav, element("p", "hint", aide));
}
