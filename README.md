# Portfolio — s-rajkumar.github.io

A static, no-build, no-database portfolio. Plain HTML/CSS/JS, ready to push
straight to GitHub Pages. Home, Profile and Contact are data-driven from
small JSON files; each project gets its own folder and can be designed
completely freely.

```
index.html            Home — name, tagline, "My Works" showcase grid
profile.html            About-me page (photo, bio, experience, education)
contact.html             Contact page (email + portfolio link)
404.html                  GitHub Pages 404 page

data/
  site.json               Name, tagline, email, footer content
  profile.json             Bio, experience, education for profile.html
  works.json                One lightweight entry per project — powers the home page cards

assets/
  css/style.css            All styling (one file, CSS custom properties)
  js/icons.js               Inline SVG icon set + platform metadata
  js/shared.js               Nav + footer rendering, shared by every page
  js/home.js, profile.js, contact.js   Per-page rendering logic
  images/                   Profile photo, placeholder fallback image

templates/
  README.md                 Step-by-step guide to starting a new project
  project-template/          Copy this folder to start any new project

qr-file-share/              Your first real project, built from the template
  index.html                 The actual project page — served at /qr-file-share/
  cover.jpg                   Add this — the project's main image
  screenshots/                 Add screenshots here, list them inside index.html
  privacy-policy.html          Edit before submitting to app stores
  README.md                     What's left to fill in for this project
```

## 1. Editing Home / Profile / Contact

- **`data/site.json`** — your name, tagline, email, portfolio URL, footer text.
- **`data/profile.json`** — intro paragraph(s), work experience, education.
- **`data/works.json`** — one entry per project, shown as a card on the home
  page:

  | Field | Notes |
  |---|---|
  | `id` | Matches the project's folder name. |
  | `name`, `shortDescription` | Shown on the card. |
  | `image` | Cover image path, e.g. `qr-file-share/cover.jpg`. |
  | `status` | `live`, `in-development`, or `archived`. |
  | `detailsUrl` | The project's folder, e.g. `qr-file-share/` — this is what "See full details" links to. |
  | `links` | Any of `android`, `web`, `windows`, `game`, `meta`. Only keys with a real URL show an icon on the card; leave `""` to hide it. |

Contact page and footer both read `email` and `portfolioUrl` from `site.json`
— update it there once, it updates everywhere.

## 2. Adding a new project

See `templates/README.md` for the full walkthrough. Short version:

```bash
cp -r templates/project-template <new-project-slug>
```

Edit the bracketed placeholders inside `<new-project-slug>/index.html`, drop
in a `cover.jpg` and any screenshots, then add one entry to `data/works.json`
so it shows up on the home page. Every project's design can diverge from the
template as much as you like — the only requirement is `index.html` at the
folder root.

## 3. Previewing locally

Opening `index.html` by double-clicking it **won't work** — browsers block
`fetch()` on JSON loaded via `file://`. Serve the folder instead:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## 4. Deploying to GitHub Pages

This repo is already your GitHub Pages user site (`s-rajkumar.github.io`), so
publishing is just:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

GitHub Pages serves the repo root automatically — no build step. Changes are
usually live within a minute or two. Because each project lives in its own
folder with `index.html`, it's reachable directly at
`https://s-rajkumar.github.io/<project-slug>/` — handy for sharing or for
pasting into an app store listing as the privacy policy / support URL.

## 5. Notes

- **Large files** (installers, big videos): GitHub blocks pushes with files
  over 100MB. For anything bigger, upload it as a
  [GitHub Release asset](https://docs.github.com/en/repositories/releasing-projects-on-github)
  on that project's own repo and link to that URL instead of hosting it here.
- **Fonts**: loaded from Google Fonts via CDN (Space Grotesk, Inter,
  JetBrains Mono). To avoid the external request, download the font files
  into `assets/fonts/` and swap the `<link>` tags for local `@font-face`
  rules in `style.css`.
- **Accessibility**: focus states, `prefers-reduced-motion`, and alt-text
  hooks are already in place — keep supplying meaningful `alt` text as you
  add real images.
