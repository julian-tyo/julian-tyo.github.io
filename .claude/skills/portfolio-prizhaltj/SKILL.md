---
name: portfolio-prizhaltj
description: Update, fix, or set up Prizhal Tri Juliantyo's personal portfolio website (https://prizhaltj.github.io, GitHub repo prizhaltj/prizhaltj.github.io) and publish the change online. Use this whenever the user (Julian / Prizhal) asks to change anything on "web portofolio", "porto", "website aku", "prizhaltj.github.io": adding or editing a project, views/GMV numbers, video links ("click here to view"), photos or project images, work experience, skills/tools, CV PDF / Download CV, contact, text, colors, layout. Also use it when they are on a new laptop/device and want to continue working on the portfolio, need Git/GitHub set up again, or want to download the portfolio project again. Use it even if they only send a screenshot of the site plus a short instruction like "ganti ini jadi ...".
---

# Portofolio Prizhal Tri Juliantyo (prizhaltj.github.io)

The user is **Prizhal Tri Juliantyo (Julian)**, a content creator, graphic designer, video editor and AI content creator from Majalengka. They are not a programmer. They talk in casual Indonesian, often send a screenshot of the live site and a one-line instruction ("ganti ini jadi 450K+", "tambahkan di bawah ini"). Reply in casual, friendly Indonesian, explain results in plain words (no git jargon), and do the technical work yourself.

The site is live at **https://prizhaltj.github.io** and is served by GitHub Pages from the `main` branch, root folder, of **https://github.com/prizhaltj/prizhaltj.github.io** (public). Every push to `main` redeploys the same URL in about a minute. The site text itself is in **English**.

## 1. Find (or set up) the project on this device

First check whether this device already has the project:

- If the current folder contains `index.html`, `style.css`, `script.js` and `assets/` with this portfolio, use it.
- Otherwise search likely places (Downloads, Documents, Desktop) for a folder whose git remote is `prizhaltj/prizhaltj.github.io`. On the original laptop it was `C:\Users\User\Downloads\staterkit video\portfolio-julian`.

If it is not on this device, set it up (Windows, PowerShell 5.1; adapt for macOS with `brew`):

1. Check tools: `git --version` and `gh --version`. Install what is missing:
   `winget install --id Git.Git -e --source winget --accept-source-agreements --accept-package-agreements --silent`
   `winget install --id GitHub.cli -e --source winget --accept-source-agreements --accept-package-agreements --silent`
   After installing, refresh PATH in each new shell command:
   `$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')`
   (gh lives in `C:\Program Files\GitHub CLI\gh.exe` if PATH still misses it.)
2. Login: check `gh auth status`. If not logged in, start `gh auth login --hostname github.com --git-protocol https --web` in a terminal the user can see and type into (it is interactive). Walk the user through it step by step: answer `Y`, copy the 8-character one-time code shown in the terminal (read the terminal and tell them the code), open github.com/login/device, sign in as **prizhaltj**, paste the code, click Authorize. The user signs in themselves; never type their password.
3. Git identity (keeps their personal email out of public commits):
   `git config --global user.name "Prizhal Tri Juliantyo"`
   `git config --global user.email "360511729+prizhaltj@users.noreply.github.com"`
4. Clone into a sensible folder, e.g. `gh repo clone prizhaltj/prizhaltj.github.io "$HOME\Documents\portfolio-prizhaltj"`.

If the user already has the folder, run `git pull` before editing so you start from what is live.

## 2. How the site is built

Plain static site, no framework, no build step:

| File | What is in it |
|---|---|
| `index.html` | All content. Sections in order: navbar, `#home` hero, `#about` (bio, education, 4 animated stats, two scrolling tool rows, skill cards), `#projects` (filter buttons + project cards), `#experience` (timeline), `#contact`, footer |
| `style.css` | Dark purple/blue theme (colors as CSS variables on `:root`, light theme under `[data-theme="light"]`), glowing rotating ring, responsive rules |
| `script.js` | Theme toggle, mobile menu, typing roles, scroll reveal + number counters, project filter, "Video coming soon" handling, Download CV fallback |
| `assets/` | `profile.jpg` (hero photo), `project-1.webp` ... `project-6.webp` (card images), `CV-Prizhal-Tri-Juliantyo.pdf` |

Patterns to follow when editing:

- **Project card**: copy an existing `<article class="project card glass reveal" data-cat="...">` block. `data-cat` uses space-separated filter keys: `design`, `video`, `ai`, `marketplace` (must match the filter buttons). Image path `assets/project-N.webp` (any jpg/png/webp works; the `<img>` hides itself if the file is missing and a gradient `tN` class shows instead; add a new `.tN` gradient in CSS for card 7+). Metric line is `<div class="metric">emoji <b>number</b></div>`.
- **Video button** under each card: `<a class="video-btn" href="LINK" ...><span class="play">▶</span> Click here to view</a>`. An empty `href=""` automatically becomes a grey "Video coming soon" button.
- **Experience**: copy a `<div class="t-item reveal">` block; period goes in `<span class="period">Sep 2022 - Nov 2026</span>`. Newest first.
- **Skills**: skill cards are `<div class="card glass skill reveal">` inside `.skills` (4 columns on wide screens, 2 under 1100px, 1 on phones). The two scrolling rows (`.marquee .track`) list every item **twice** so the loop is seamless; add or remove items in both halves.
- **About stats** use `data-count`, `data-prefix`, `data-suffix` (e.g. `data-count="940" data-suffix="K+"`).
- **Download CV** points to `assets/CV-Prizhal-Tri-Juliantyo.pdf`; to update the CV, replace that file keeping the same name.
- Typing roles are the `roles` array at the top of `script.js`.

## 3. The user's preferences (learned, keep them)

- **No em dash (—) anywhere in site text.** Use a comma or period in sentences and a plain hyphen for ranges (`Sep 2022 - Nov 2026`, `2021 - 2022`). Hyphenated words like "AI-powered" are fine. Check with a search for `—` after edits.
- When asked to change one part of a line (e.g. the views number), keep the rest of that line (e.g. keep "Rp50M GMV"). Change only what they pointed at.
- Numbers: if a number looks inconsistent with what was there before (e.g. "450+" replacing "160K+"), make the change but ask whether they meant "450K+".
- Links: strip tracking parameters (`?fqnt=`, `?_r=`, `&_t=`, `?jplx=`, `igsh=`), but keep meaningful ones like `?page=Mall`. If two cards get the same link, point it out and ask.
- Images the user sends are usually portrait phone screenshots; project thumbnails are square and cropped with `object-position`, so check them visually after adding.
- The logo text stays `julian.creative` (user chose to keep it).
- Their phone number, email and LinkedIn are already public on the site by their choice. Before adding any other personal data (address, ID, etc.), mention it will be public.

## 4. Workflow for every change

1. `git pull` (so you build on the live version).
2. Edit the files. Keep the existing design language; reuse existing classes.
3. Preview locally before publishing: run `node <this-skill-dir>/scripts/serve.js <portfolio-folder>` (serves on http://localhost:5173; set it up as a preview server in the editor if available, or `python -m http.server 5173` as fallback). Opening `index.html` directly as a file may not load the CSS. Check desktop width and a phone width (375px) and make sure there is no horizontal scrolling. Elements with class `reveal` fade in on scroll, so a screenshot taken mid-animation looks faded; that is normal.
4. Publish:
   ```powershell
   git add .
   git commit -m "Short description of the change"
   git push
   ```
   In Windows PowerShell 5.1, do not put double quotes inside the commit message (it breaks argument passing); use a single-quoted here-string for multi-line messages.
5. Verify it is live: poll `gh api repos/prizhaltj/prizhaltj.github.io/pages/builds/latest --jq .status` until `built`, then fetch `https://prizhaltj.github.io/?v=<random>` and confirm the new text/file is there (or open it in the browser).
6. Tell the user it is online, list exactly what changed, and remind them to refresh (browser cache) if they still see the old version on their phone.

## 5. Bigger changes

- **New domain or name**: the URL comes from the GitHub username. A custom name without buying a domain means renaming the GitHub username (user does it in GitHub Settings, then rename the repo to `<newname>.github.io` with `gh repo rename '<newname>.github.io' -R 'prizhaltj/prizhaltj.github.io' --yes` and update `git remote set-url`), or deploying the same repo on Vercel/Netlify (user creates the account). The old link stops working after a username change; warn them.
- **Redesign**: keep content and assets, change `style.css` variables first (colors live in `:root`). Show a local preview before pushing.
- Never delete the repository or force-push without the user explicitly asking.
