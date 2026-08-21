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

// -------------------------- SCREENSHOT LIGHTBOX ----------------------------
//
// The strip crops each shot to 9/16 with `object-fit: cover`, which is right
// for a row of thumbnails and wrong for looking at one: a 1080x2400 phone
// screenshot loses its top and bottom. Clicking one opens it whole.
//
// Wired by delegation on `document` rather than by binding each <img>,
// because every project page injects its screenshots from its own inline
// script *after* this file has run. Delegation means a page needs no change
// to get this — it works for any `.screenshot-strip img`, whenever it
// appears.

(function setupLightbox() {
  let box = null;
  let shots = [];
  let index = 0;
  let lastFocused = null;

  function build() {
    box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Screenshot viewer");
    box.innerHTML = `
      <button class="lightbox-btn lightbox-close" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
      <button class="lightbox-btn lightbox-prev" aria-label="Previous screenshot">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <img alt="">
      <button class="lightbox-btn lightbox-next" aria-label="Next screenshot">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
      <span class="lightbox-count"></span>`;
    document.body.appendChild(box);

    // A click on the backdrop closes; a click on the picture itself must not,
    // or dragging to look at a detail dismisses the thing being looked at.
    box.addEventListener("click", (e) => {
      if (e.target === box) close();
    });
    box.querySelector(".lightbox-close").addEventListener("click", close);
    box.querySelector(".lightbox-prev").addEventListener("click", () => step(-1));
    box.querySelector(".lightbox-next").addEventListener("click", () => step(1));
    return box;
  }

  function show() {
    const img = box.querySelector("img");
    const from = shots[index];
    img.src = from.currentSrc || from.src;
    img.alt = from.alt || "Screenshot";
    box.querySelector(".lightbox-count").textContent =
      `${index + 1} / ${shots.length}`;
    box.classList.toggle("single", shots.length < 2);
  }

  function step(by) {
    if (shots.length < 2) return;
    index = (index + by + shots.length) % shots.length;
    show();
  }

  function open(img) {
    // Only the strip this image belongs to, so two strips on one page step
    // through their own shots rather than each other's.
    shots = Array.from(img.closest(".screenshot-strip").querySelectorAll("img"));
    index = Math.max(0, shots.indexOf(img));
    lastFocused = document.activeElement;
    if (!box) build();
    show();
    box.classList.add("open");
    document.body.classList.add("lightbox-open");
    box.querySelector(".lightbox-close").focus();
  }

  function close() {
    if (!box) return;
    box.classList.remove("open");
    document.body.classList.remove("lightbox-open");
    // Drop the source so a big PNG is not held decoded behind the overlay.
    box.querySelector("img").removeAttribute("src");
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  document.addEventListener("click", (e) => {
    const img = e.target.closest(".screenshot-strip img");
    if (img) open(img);
  });

  document.addEventListener("keydown", (e) => {
    if (!box || !box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });
})();
