// ---------------------------------------------------------------------------
// Shared helpers used across every page (home / profile / contact / project
// pages inside their own folders). Data lives in /data/*.json.
//
// basePath: pages one level deep (e.g. qr-file-share/index.html) pass
// basePath="../" so generated links point back to the site root correctly.
// ---------------------------------------------------------------------------

async function loadJSON(path) {
  const res = await fetch(path, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to load ${path} (${res.status})`);
  return res.json();
}

function platformChip(key) {
  const meta = PLATFORM_META[key];
  if (!meta) return "";
  return `<span class="p-chip ${meta.cls}">${meta.label}</span>`;
}

function linkRow(key, url, label, iconKey) {
  if (!url) return "";
  const isExternal = /^https?:\/\//.test(url);
  return `<a href="${url}" ${isExternal ? 'target="_blank" rel="noopener"' : ""}>
      <span class="link-label">${ICONS[iconKey] || ""} ${label}</span>
      ${ICONS.external}
    </a>`;
}

function iconLink(url, iconKey, label) {
  if (!url) return "";
  const isExternal = /^https?:\/\//.test(url);
  return `<a class="icon-link" href="${url}" aria-label="${label}" ${isExternal ? 'target="_blank" rel="noopener"' : ""}>${ICONS[iconKey]}</a>`;
}

// -------------------------- NAV -------------------------------------------

async function renderNav(activePage, basePath = "") {
  const site = await loadJSON(`${basePath}data/site.json`);
  const mount = document.getElementById("site-nav");
  if (!mount) return site;

  const links = [
    { href: `${basePath}index.html`, label: "Home", key: "home" },
    { href: `${basePath}profile.html`, label: "Profile", key: "profile" },
    { href: `${basePath}contact.html`, label: "Contact", key: "contact" }
  ];

  mount.innerHTML = `
    <div class="container">
      <a class="brand" href="${basePath}index.html"><span class="dot"></span>${site.name}</a>
      <ul class="nav-links" id="nav-links">
        ${links.map(l => `<li><a href="${l.href}" class="${l.key === activePage ? "active" : ""}">${l.label}</a></li>`).join("")}
      </ul>
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">${ICONS.menu}</button>
    </div>`;

  const toggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  toggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.innerHTML = open ? ICONS.close : ICONS.menu;
  });

  return site;
}

// -------------------------- FOOTER -----------------------------------------

function renderFooter(site, basePath = "") {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  const year = new Date().getFullYear();

  mount.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a class="brand" href="${basePath}index.html"><span class="dot"></span>${site.name}</a>
          <p>${site.footer.about}</p>
        </div>
        <div class="footer-col">
          <h4>Navigate</h4>
          <ul>
            ${site.footer.quickLinks.map(l => `<li><a href="${basePath}${l.url}">${l.label}</a></li>`).join("")}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <ul>
            ${site.email ? `<li><a href="mailto:${site.email}">${site.email}</a></li>` : ""}
            ${site.portfolioUrl ? `<li><a href="${site.portfolioUrl}" target="_blank" rel="noopener">${site.portfolioUrl.replace(/^https?:\/\//, "")}</a></li>` : ""}
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${year} ${site.name}. All rights reserved.</span>
        <span>Built with HTML, CSS &amp; JS — hosted on GitHub Pages.</span>
      </div>
    </div>`;
}
