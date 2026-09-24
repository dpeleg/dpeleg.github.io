# Daniel Peleg — Portfolio

Hand-coded HTML, CSS and a little JavaScript. No framework, no build step.

```
index.html          Home — identity, contact, projects (open as <dialog> popups), featured case study, stack
case-study.html     OPAL UX case study (9 sections, 3 labelled artifacts)
css/styles.css      Tokens → base → components → home → case study → dialogs
js/main.js          Project dialogs, gallery thumbnails, case-study contents highlight + progress bar
assets/img/         Logo, favicons, Open Graph image
assets/case-study/  Personas, user flow, ideation board, schema (SVG)
```

## Run locally

```
cd site
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish to GitHub Pages

1. Create a repo named `USERNAME.github.io` and push the contents of this folder to `main`.
2. Settings → Pages → Deploy from branch → `main` / root.
3. Replace `USERNAME` in `robots.txt`, `sitemap.xml`, and add the canonical `<link>` in both HTML files.
4. Check every link and image on the live URL — GitHub Pages paths are case-sensitive.

Search the code for `TODO` to find content still to be supplied.
