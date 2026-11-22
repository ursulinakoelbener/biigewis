/**
 * pages.js: baut Themenübersicht, "Weitere Visualisierungen" und Brotkrumen
 * aus der Liste data/pages.json. Eine neue Visualisierung = ein neuer Eintrag
 * in pages.json, sonst muss nichts angepasst werden.
 *
 * Auf einer Seite genügen diese Platzhalter (je nach Wunsch):
 *   <nav data-pages="breadcrumb"></nav>   Brotkrumen: Start › Themen › Politik › Seitentitel
 *   <nav data-pages="related"></nav>      "Weitere Visualisierungen zum Thema …"
 *   <div data-pages="overview"></div>     alle Themen mit allen Visualisierungen (themen.html)
 * und am Ende der Seite:  <script src="pages.js" defer></script>
 */
(function () {
  const PAGES_URL = "data/pages.json";
  const START_URL = "index.html";
  const OVERVIEW_URL = "themen.html";

  // --- Hilfsfunktionen ---------------------------------------------------------

  /** "Bevölkerung" -> "bevoelkerung"-ähnlich: nur a-z, 0-9 und "-" (für Sprungmarken). */
  const slug = (s) =>
    s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  /** "…/standeskommission.html?x=1" -> "standeskommission" (so zählen mit und ohne .html als gleich). */
  const fileKey = (url) =>
    url.split("#")[0].split("?")[0].split("/").pop().replace(/\.html$/, "") || "index";

  /** Element mit Klasse und Text erzeugen (Text wird nie als HTML gelesen). */
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  /** "2026-11" oder "2026-11-21" -> "November 2026" */
  function formatDate(s) {
    if (!s) return "";
    const d = new Date(s.length === 7 ? s + "-01" : s);
    return isNaN(d) ? "" : d.toLocaleDateString("de-CH", { month: "long", year: "numeric" });
  }

  /** Gruppiert nach Thema; die Reihenfolge bleibt wie in pages.json. */
  function byTopic(pages) {
    const groups = new Map();
    for (const p of pages) {
      if (!groups.has(p.thema)) groups.set(p.thema, []);
      groups.get(p.thema).push(p);
    }
    return groups;
  }

  /** Der Eintrag der aktuell geöffneten Seite (oder undefined). */
  function currentPage(pages) {
    const key = fileKey(location.pathname);
    return pages.find((p) => fileKey(p.seite) === key);
  }

  /** Eine Karte: Titel, kurze Beschreibung, Stand. */
  function card(p) {
    const li = el("li");
    const a = el("a", "card");
    a.href = p.seite;
    a.append(el("span", "card-title", p.titel));
    if (p.beschreibung) a.append(el("span", "card-text", p.beschreibung));
    const date = formatDate(p.aktualisiert);
    if (date) a.append(el("span", "card-date", `Stand: ${date}`));
    li.append(a);
    return li;
  }

  function cardList(pages) {
    const ul = el("ul", "cards");
    ul.append(...pages.map(card));
    return ul;
  }

  // --- Die drei Bausteine --------------------------------------------------------

  /** Alle Themen mit ihren Visualisierungen (themen.html). */
  function renderOverview(container, pages) {
    const sections = [];
    for (const [topic, list] of byTopic(pages)) {
      const section = el("section", "topic");
      const h = el("h3", null, topic);
      h.id = slug(topic);
      section.append(h, cardList(list));
      sections.push(section);
    }
    container.replaceChildren(...sections);
  }

  /** "Weitere Visualisierungen zum Thema …" am Ende einer Seite. */
  function renderRelated(container, pages) {
    const cur = currentPage(pages);
    if (!cur) return;
    const others = pages.filter((p) => p !== cur && p.thema === cur.thema);
    if (!others.length) return;
    const more = el("p", "related-more");
    const all = el("a", null, "Alle Themen ansehen");
    all.href = OVERVIEW_URL;
    more.append(all);
    container.replaceChildren(el("h3", null, `Weitere Visualisierungen zum Thema ${cur.thema}`), cardList(others), more);
  }

  /** Brotkrumen: Start › Themen › Thema › Seitentitel */
  function renderBreadcrumb(container, pages) {
    const cur = currentPage(pages);
    if (!cur) return;
    const ol = el("ol");
    const crumbs = [
      { text: "Start", href: START_URL },
      { text: "Themen", href: OVERVIEW_URL },
      { text: cur.thema, href: `${OVERVIEW_URL}#${slug(cur.thema)}` },
      { text: cur.titel },
    ];
    crumbs.forEach((c) => {
      const li = el("li");
      if (c.href) {
        const a = el("a", null, c.text);
        a.href = c.href;
        li.append(a);
      } else {
        li.textContent = c.text;
        li.setAttribute("aria-current", "page");
      }
      ol.append(li);
    });
    container.replaceChildren(ol);
  }

  // --- Start ---------------------------------------------------------------------

  async function init() {
    const targets = document.querySelectorAll("[data-pages]");
    if (!targets.length) return;
    let pages;
    try {
      const res = await fetch(PAGES_URL, { cache: "no-cache" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      pages = await res.json();
    } catch (err) {
      console.error("pages.json konnte nicht geladen werden:", err);
      return; // Platzhalter bleiben leer (oder zeigen ihren Ersatztext)
    }
    const renderers = { overview: renderOverview, related: renderRelated, breadcrumb: renderBreadcrumb };
    targets.forEach((t) => renderers[t.dataset.pages]?.(t, pages));
  }

  init();
})();
