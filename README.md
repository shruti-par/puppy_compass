# The Puppy Compass 🧭🐶

A calm, mentor-style **puppy-care guide for U.S. owners**, built as a fast,
searchable static site with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
and deployed to **GitHub Pages**.

The content is ordered to follow a puppy's life — from *before you bring them
home* through their *first birthday* — with size-, breed-, and age-specific
advice throughout, plus three interactive tools:

- a **feeding calculator** (calories + cups from weight & age),
- a **vaccine & deworming planner** (a dated schedule from a birth date), and
- **printable checklists** (shopping, puppy-proofing, first-vet-visit).

> Educational content only — not a substitute for advice from your own
> veterinarian. It reflects current U.S. guidance (AAHA, AVMA, ASPCA, AKC,
> UC Davis, CAPC) as of mid-2026.

---

## 1. One required edit before you deploy

Open **`mkdocs.yml`** and replace **`YOUR-USERNAME`** in these lines with your
GitHub username (and adjust the repo name if you don't call it
`puppy-compass`):

```yaml
site_url: https://YOUR-USERNAME.github.io/puppy-compass/
repo_url: https://github.com/YOUR-USERNAME/puppy-compass
```

There's also a `YOUR-USERNAME` in the `extra.social` link at the bottom —
update or remove it.

## 2. Preview locally (optional)

```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
mkdocs serve            # open http://127.0.0.1:8000
```

Build a static copy without serving:

```bash
mkdocs build --strict   # output in ./site
```

`--strict` fails on broken internal links — handy before pushing.

## 3. Deploy to GitHub Pages (automatic)

1. Create a new GitHub repository (e.g. **`puppy-compass`**) and push this code
   to the **`main`** branch:
   ```bash
   git init && git add . && git commit -m "Initial commit: The Puppy Compass"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/puppy-compass.git
   git push -u origin main
   ```
2. In the repo, go to **Settings → Pages → Build and deployment** and set
   **Source: GitHub Actions**.
3. That's it. The included workflow (`.github/workflows/deploy.yml`) builds the
   site and publishes it on every push to `main`. Your site appears at
   `https://YOUR-USERNAME.github.io/puppy-compass/`.

## Project structure

```
mkdocs.yml                  # site config + navigation (life-stage order)
requirements.txt            # pinned build dependencies
.github/workflows/deploy.yml# CI: build (mkdocs build --strict) + deploy to Pages
docs/
  index.md                  # welcome / home
  00-start/                 # how to use, emergency quick-reference card
  01-before-home/           # puppy-proofing, essentials, choosing a vet
  02-first-weeks/           # first 72 hrs, foods, feeding, vet visit, vaccines, potty, crate
  03-foundations/           # socialization, training, grooming
  04-growing-up/            # growth stages, adolescence, spay/neuter
  05-health/                # spotting illness, emergencies, parasites
  06-tools/                 # feeding calculator, vaccine planner, checklists, glossary, sources
  stylesheets/extra.css     # custom warm theme
  javascripts/tools.js      # the interactive calculators/checklists
  overrides/main.html       # loads the Fraunces display font
  assets/favicon.png
```

## Editing content

Pages are plain Markdown in `docs/`. Add a page by creating the `.md` file and
adding it to the `nav:` list in `mkdocs.yml`. The two calculators are driven by
`docs/javascripts/tools.js`; their styling lives in `docs/stylesheets/extra.css`.
