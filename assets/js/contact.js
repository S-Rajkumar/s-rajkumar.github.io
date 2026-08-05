(async function initContact() {
  const site = await renderNav("contact");
  renderFooter(site);

  document.getElementById("contact-heading").textContent = `Contact ${site.name}`;

  const list = document.getElementById("contact-list");
  const rows = [];

  if (site.email) {
    rows.push(`<a href="mailto:${site.email}">
      <span class="link-label">${ICONS.mail} Email — ${site.email}</span>
      ${ICONS.external}
    </a>`);
  }

  if (site.portfolioUrl) {
    rows.push(`<a href="${site.portfolioUrl}" target="_blank" rel="noopener">
      <span class="link-label">${ICONS.globe} Portfolio — ${site.portfolioUrl.replace(/^https?:\/\//, "")}</span>
      ${ICONS.external}
    </a>`);
  }

  list.innerHTML = rows.join("");
})();
