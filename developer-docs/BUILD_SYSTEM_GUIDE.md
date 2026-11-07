# Build System & Workflow Guide

This guide explains how to use the development, build, and documentation tools provided in the Xivig Admin Template. These tools use a modern, future-proof hybrid approach combining **Vite** for lightning-fast development and **Gulp** for asset orchestration, WebP optimization, path normalization, and GitHub Pages export.

---

## 1. Development Workflow

### `npm run dev`
This is your primary command for daily development.
- **What it does:**
  1. Cleans old build output.
  2. Starts the **Vite** development server with Hot Module Replacement (HMR).
  3. Serves the app at `http://localhost:3000` (or the next available port).
- **Key Features:**
  - **Dynamic Flat URL Router (`devPageRouterPlugin`):** You can access any page using its flat URL (e.g. `http://localhost:3000/calendar.html` or `http://localhost:3000/checkout.html`), exactly as it will appear in production on GitHub Pages. The dev plugin automatically resolves flat routes to their nested source files in `app/pages/**`.
  - **HMR (Hot Module Replacement):** SCSS and JS edits reflect instantly without a full page reload.
  - **Handlebars Rendering:** Compiles layouts (`admin-layout`, `home-layout`, `auth-layout`) and partials (`header`, `sidebar`, `footer`, `mobile-nav`) on the fly with custom helpers.

---

## 2. Build & Optimization Workflows

### `npm run build`
Generates a fully optimized, production-ready bundle flattened into `dist/` and synchronized to `docs/` for GitHub Pages.
- **The Step-by-Step Process:**
  1. **Clean:** Deletes prior `dist/`, `docs/`, and `exports/` artifacts.
  2. **Vite Build:** Compiles Handlebars templates, bundles ES modules, compiles SCSS (7-1 pattern), and generates version-hashed assets.
  3. **Image & WebP Optimization:** Copies assets and generates WebP versions using Sharp for optimal web performance.
  4. **Flat HTML Migration:** Flattens all 85 HTML pages from `dist/app/pages/**` to root `dist/*.html` using native asynchronous I/O (`fs/promises`).
  5. **Link Normalization (`replace-links.js`):**
     - Rewrites nested page links to flat relative targets (`./calendar.html`).
     - Normalizes asset URLs to `./assets/...` and vendor plugins to `./plugins/...`.
     - Injects `window.XIVIG_ROOT = "./"` for dynamic script resolution.
     - Built-in retry loops (`safeWriteFile`) prevent Windows file locking conflicts.
  6. **Vendor Distribution:** Copies required third-party libraries (jQuery, Bootstrap, FullCalendar, ApexCharts, etc.) directly from `node_modules` into `dist/plugins/` and `docs/plugins/`.
  7. **GitHub Pages Sync (`exportDocs`):** Copies all flattened HTML files, assets, plugins, and `.nojekyll` directly to `docs/`.

### `npm run production`
The "Ultimate Build" command.
- **What it does:** Runs the entire `npm run build` process and immediately starts a local preview server (`npm run preview`) to verify the production build.

---

## 3. Preview & Documentation

### `npm run preview`
Starts a local server serving the flattened `dist/` folder.
- **Purpose:** Testing production output before deploying to GitHub.

### `npm run docs`
Starts a documentation server.
- **What it does:** Serves the content of `developer-docs/` using Gulp.
- **Purpose:** Reading internal architectural guides in the browser.

---

## 4. Summary Table

| Command | Tool | Purpose | Output Folder |
| :--- | :--- | :--- | :--- |
| `npm run dev` | Vite | Rapid development with HMR & flat URL routing | In-memory |
| `npm run build` | Gulp + Vite | Production build, WebP, flattening & sync | `dist/` & `docs/` |
| `npm run production` | Gulp + Vite | Full build + Local Preview | `dist/` & `docs/` |
| `npm run preview` | Vite | Preview production build | `dist/` |
| `npm run docs` | Gulp | Serve developer documentation | N/A |

---

## 5. Deployment to GitHub Pages

The `docs/` folder is configured for user/organization and project GitHub Pages deployments (e.g. `https://xivig.github.io/`).

### How it works:
1. **Flattened Structure:** All 85 HTML pages are placed directly at `docs/*.html`. This prevents broken relative link issues across different GitHub Pages subpaths.
2. **Automatic Sync:** Every run of `npm run build` refreshes `docs/` with the latest flattened HTML, optimized assets, and vendor plugins.
3. **`.nojekyll` Included:** A `.nojekyll` file is automatically placed in `docs/` to prevent GitHub Pages Jekyll engine from ignoring files or assets with special characters.

### Steps to Deploy:
1. Run `npm run build`.
2. Commit and push the changes in `docs/` to your `main` branch.
3. On GitHub, go to **Settings > Pages**.
4. Set **Source** to "Deploy from a branch", **Branch** to `main`, and **Folder** to `/docs`.
5. Save. Your site will be live at `https://xivig.github.io/`.

---

## 6. Troubleshooting & Best Practices

- **Adding a New Page:** Place your Handlebars HTML file in `app/pages/<category>/<page-name>.html`. The dev server will immediately serve it at `http://localhost:3000/<page-name>.html`, and `npm run build` will flatten it to `docs/<page-name>.html`.
- **Linking Between Pages:** Always link using flat page names (e.g. `href="calendar.html"` or `href="profile.html"`). Do not use nested folder paths like `pages/apps/calendar.html`.
- **Referencing Assets:** In templates, reference images via `/app/src/images/xyz.png` or relative `./assets/xyz.png`. The build pipeline normalizes all asset references to `./assets/...`.
- **Windows File Locks:** If any EBUSY or EPERM errors occur during file modifications on Windows, the build scripts feature automatic exponential backoff retries.
