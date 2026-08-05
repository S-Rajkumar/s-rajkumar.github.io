(async function initHome() {
  const site = await renderNav("home");
  renderFooter(site);

  // ---- Hero ----
  document.getElementById("hero-name").textContent = site.name;
  document.getElementById("hero-tagline").textContent = site.tagline;

  const heroActions = document.getElementById("hero-actions");
  heroActions.innerHTML = `
    <a class="btn btn-primary" href="#work">My Works ${ICONS.arrowRight}</a>
    <a class="btn btn-outline" href="profile.html">About me</a>
  `;

  // ---- Works ----
  const works = await loadJSON("data/works.json");
  const grid = document.getElementById("project-grid");
  const filterRow = document.getElementById("filter-row");

  const platformsPresent = Object.keys(PLATFORM_META).filter(
    key => works.some(w => w.links && w.links[key])
  );

  let activeFilter = "all";

  function renderFilters() {
    if (platformsPresent.length < 2) {
      filterRow.innerHTML = "";
      return;
    }
    const chips = ["all", ...platformsPresent];
    filterRow.innerHTML = chips.map(key => {
      const label = key === "all" ? "All work" : PLATFORM_META[key].label;
      return `<button class="filter-chip ${key === activeFilter ? "active" : ""}" data-filter="${key}">${label}</button>`;
    }).join("");

    filterRow.querySelectorAll(".filter-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        activeFilter = btn.dataset.filter;
        renderFilters();
        renderGrid();
      });
    });
  }

  function workCard(w) {
    const statusLabel = w.status === "in-development" ? "In development" : w.status === "archived" ? "Archived" : "Live";
    const platformIcons = Object.entries(w.links || {})
      .filter(([, url]) => url)
      .map(([key, url]) => iconLink(url, PLATFORM_META[key]?.icon || "globe", PLATFORM_META[key]?.label || key))
      .join("");

    return `
      <article class="project-card">
        <a href="${w.detailsUrl}" aria-label="View ${w.name} details">
          <div class="project-card-media">
            <img src="${w.image}" alt="${w.name} cover image" loading="lazy"
                 onerror="this.src='assets/images/placeholder.svg'">
            <span class="status-tag ${w.status}">${statusLabel}</span>
          </div>
        </a>
        <div class="project-card-body">
          <h3><a href="${w.detailsUrl}">${w.name}</a></h3>
          <p>${w.shortDescription}</p>
          <div class="project-card-footer">
            <a class="card-link" href="${w.detailsUrl}">See full details ${ICONS.arrowRight}</a>
            <div class="quick-links">${platformIcons}</div>
          </div>
        </div>
      </article>`;
  }

  function renderGrid() {
    const filtered = activeFilter === "all"
      ? works
      : works.filter(w => w.links && w.links[activeFilter]);

    grid.innerHTML = filtered.length
      ? filtered.map(workCard).join("")
      : `<div class="empty-state">No projects tagged “${PLATFORM_META[activeFilter]?.label || activeFilter}” yet — check back soon.</div>`;
  }

  renderFilters();
  renderGrid();
})();
