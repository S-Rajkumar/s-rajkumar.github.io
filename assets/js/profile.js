(async function initProfile() {
  const site = await renderNav("profile");
  renderFooter(site);

  const profile = await loadJSON("data/profile.json");

  document.getElementById("profile-photo").innerHTML =
    `<img src="${profile.photo}" alt="Photo of ${profile.name}" onerror="this.src='assets/images/placeholder.svg'">`;
  document.getElementById("profile-name").textContent = profile.name;
  document.getElementById("profile-role").textContent = profile.role;
  document.getElementById("profile-intro").innerHTML = profile.intro.map(p => `<p>${p}</p>`).join("");

  // ---- Experience ----
  const expMount = document.getElementById("experience-timeline");
  expMount.innerHTML = profile.experience.map(e => `
    <div class="timeline-item">
      <div class="timeline-period">${e.period}</div>
      <div class="timeline-role">
        <h4>${e.role}</h4>
        <span class="timeline-org">${e.org}</span>
        ${e.summary ? `<p class="timeline-summary">${e.summary}</p>` : ""}
      </div>
    </div>
  `).join("");

  // ---- Education ----
  const eduMount = document.getElementById("education-timeline");
  if (profile.education?.length) {
    eduMount.innerHTML = profile.education.map(ed => `
      <div class="timeline-item">
        <div class="timeline-period">${ed.period}</div>
        <div class="timeline-role">
          <h4>${ed.credential}</h4>
          <span class="timeline-org">${ed.school}</span>
        </div>
      </div>
    `).join("");
  } else {
    document.getElementById("education-section").style.display = "none";
  }
})();
