# **XIVIG Admin Panel Elite Admin Edition**

A modern administrative dashboard built with Bootstrap 5, Handlebars templating, Vite for fast bundling and HMR, and Gulp for legacy/vendor asset orchestration. This repository adapts the Elite Admin template into a developer friendly Vite + Gulp workflow and provides a Handlebars-driven page structure for easy templating.
________________________________________
## **Quick Start**
Prerequisites
•	Node.js v18+
•	npm or yarn

**Clone and install**
```
git clone https://github.com/xivig/xivig-gulp-vite-bs5-admin-panel.git
cd xivig-gulp-vite-bs5-admin-panel
npm install
```

**Development**
```
npm run dev

```
**Production build**

```
npm run build
```

**Preview production build**
```
npm run preview
```
________________________________________
### **Project Structure**

xivig-gulp-vite-bs5-admin-panel/

├── src/

│   ├── pages/        # Handlebars pages (.hbs)

│   ├── partials/     # Handlebars partials (header sidebar footer)

│   ├── scss/         # SCSS entry points and variables

│   ├── scripts/      # Application JS

│   └── images/       # Project images

├── public/           # Static assets served as-is

├── tasks/            # Gulp task modules

├── gulpfile.js       # Gulp task runner

├── vite.config.js    # Vite configuration and HBS plugin

├── package.json

└── dist/            # Production output (generated)


________________________________________
### **Workflow and Integration**

**Vite**

•	Handles module bundling, SASS compilation, and HMR for fast development. Configure Handlebars entries in vite.config.js using a Handlebars plugin.

**Handlebars**

•	Use src/partials/ for reusable UI and src/pages/ for page entry points. Include partials with:
```
{{> header }}
{{> sidebar }}
{{> footer }}
```
•	Configure template data and helpers in the Vite Handlebars plugin options if you need build-time context.
Gulp
•	Used for vendor asset management and heavy legacy plugins that are not part of the Vite pipeline. Typical tasks: 
o	Copy/minify vendor scripts into dist/vendor
o	Process icon fonts and generate icon bundles

**Theming**

•	Main SCSS entry: src/scss/style.scss
•	Override variables in src/scss/_variables.scss:
```
$primary: #0d6efd;
$brand-sidebar-color: #1f2937;
```
Vite recompiles SCSS automatically during development.
________________________________________
| Commands Reference | Command Action |
| ----- | ----- |
| npm run dev  | Start Vite dev server (HMR)   |
| ------ | ------ |
|  npm run build  | Build production dist   |
| ------ | ------ |
| npm run preview  | Preview production build locally   |
| ------ | ------ |
| npm run gulp:images | Process images for compression |


________________________________________
#### Troubleshooting Contributing and License

**Troubleshooting**
•	SCSS errors: ensure sass is installed:
```
npm install -D sass
```
•	Broken install or missing modules:
```
rm -rf node_modules package-lock.json
npm install
```
•	Handlebars pages not recognized: confirm vite-plugin-handlebars is installed and vite.config.js includes correct entry mapping.

**Contributing**
•	Fork the repo and create feature branches.
•	Keep UI changes scoped to SCSS variables where possible.
•	Add pages under src/pages/ and partials under src/partials/.
•	Update or add Gulp tasks in tasks/ only when vendor processing is required.
•	Run npm run build locally before opening a pull request.

**License**
•	 The repository license is specified in the LICENSE file;
