# Starting a new project

Each project gets its own top-level folder (e.g. `qr-file-share/`), so it can
be shared as a clean URL like `s-rajkumar.github.io/qr-file-share/` and its
design can be completely custom — a big multi-screenshot showcase for one
project, a minimal one-pager for another.

## Steps

1. **Copy this folder** and rename it to your project's slug (lowercase,
   hyphenated — e.g. `pixel-drift`):

   ```bash
   cp -r templates/project-template pixel-drift
   ```

2. **Edit `pixel-drift/index.html`** — replace every `[bracketed]` placeholder:
   title, description, category/year, platform chips, key features, and the
   `LINKS` object near the bottom of the file.

3. **Add a cover image** at `pixel-drift/cover.jpg`. Until it's there, the
   page automatically falls back to a placeholder graphic — nothing breaks.

4. **Add screenshots** (optional) into `pixel-drift/screenshots/`, then list
   their filenames in the `SCREENSHOTS` array inside `index.html`.

5. **Edit `pixel-drift/privacy-policy.html`** if the project needs one for an
   app store listing (fill in the `[App Name]` and other bracketed fields).

6. **Add a card to the home page** — open `data/works.json` at the repo root
   and add an entry:

   ```json
   {
     "id": "pixel-drift",
     "name": "Pixel Drift",
     "shortDescription": "One line description shown on the home page card.",
     "image": "pixel-drift/cover.jpg",
     "status": "in-development",
     "detailsUrl": "pixel-drift/",
     "links": { "android": "", "web": "" }
   }
   ```

   `links` keys can be any of `android`, `web`, `windows`, `game`, `meta` —
   whichever have a real URL show up as an icon on the card automatically.

That's it — no build step, no other files to touch. Feel free to diverge from
this template's layout entirely for a given project; the only thing the rest
of the site depends on is that `index.html` exists at the project's folder
root and that `data/works.json` points to it.
