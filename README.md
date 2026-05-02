# 🚀 XIVIG Admin Panel - Elite Architect Edition

[![Vite](https://img.shields.io/badge/bundler-Vite%205-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Gulp](https://img.shields.io/badge/task%20runner-Gulp%205-CF4647?style=flat&logo=gulp)](https://gulpjs.com/)
[![Bootstrap](https://img.shields.io/badge/ui%20kit-Bootstrap%205.3-7952B3?style=flat&logo=bootstrap)](https://getbootstrap.com/)
[![Handlebars](https://img.shields.io/badge/template-Handlebars-f0772b?style=flat&logo=handlebars.js)](https://handlebarsjs.com/)
[![Sass](https://img.shields.io/badge/styles-Sass%207--1-CC6699?style=flat&logo=sass)](https://sass-lang.com/)

**XIVIG Elite** is a premium, high-performance administrative dashboard designed for modern web applications. It leverages a unique hybrid workflow combining **Vite** for lightning-fast development (HMR) and **Gulp** for robust asset orchestration and legacy vendor management.

---

## ✨ Key Features

-   **Elite Aesthetics**: Modern UI featuring Glassmorphism, advanced mesh gradients, and the "Elite Blue" color system.
-   **Elite Analytics v2**: Advanced, modular dashboard featuring deep data visualization with ApexCharts and Chart.js.
-   **Hybrid Build Pipeline**: The speed of Vite paired with the versatility of Gulp.
-   **Modular SCSS (7-1 Pattern)**: A professional stylesheet architecture designed for scalability and ease of maintenance.
-   **Handlebars Templating**: Clean separation of UI components using Handlebars partials.
-   **Performance Optimized**: Automated image compression, intelligent vendor chunking, and aggressive tree-shaking.
-   **Theme Aware**: Comprehensive dark mode support using CSS Design Tokens (Variables).

---

## 🛠 Technology Stack

-   **Bundler**: [Vite](https://vitejs.dev/) (Primary engine for JS/SCSS and Dev Server)
-   **Task Runner**: [Gulp](https://gulpjs.com/) (Image optimization and asset exports)
-   **Framework**: [Bootstrap 5.3](https://getbootstrap.com/)
-   **Templating**: [Handlebars](https://handlebarsjs.com/) (Integrated via `vite-plugin-handlebars`)
-   **Styles**: [Sass/Dart Sass](https://sass-lang.com/)
-   **Iconography**: Bootstrap Icons & FontAwesome 7

---

## 📂 Project Structure

```text
xivig.github.io/
├── app/
│   ├── pages/         # HTML views grouped by category
│   └── src/           # Primary source code
│       ├── partials/  # Handlebars components (header, sidebar, etc.)
│       ├── scss/      # Modular Sass architecture (base, layout, components, etc.)
│       ├── scripts/   # Modular JavaScript logic and app controllers
│       ├── images/    # Source images and UI assets
│       └── plugins/   # Local vendor plugins
├── public/            # Static assets served as-is (data, fonts)
├── tasks/             # Specialized Gulp modules
├── docs/              # GitHub Pages deployment folder
├── index.html         # Main dashboard entry point
├── gulpfile.js        # Gulp orchestration script
├── vite.config.js     # Primary build & server configuration
└── developer-docs/    # In-depth technical guides
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/xivig/xivig-github-io.git

# Navigate to directory
cd xivig-github-io

# Install dependencies
npm install
```

### 3. Development
Start the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Navigate to `http://localhost:5173` to view your dashboard.

### 4. Production Build
Generate an optimized, production-ready bundle in the `dist/` folder:
```bash
npm run build
```

---

## 🐘 Laravel Integration

This repository includes a comprehensive workflow for migrating the frontend template into **Laravel**.

- **[Laravel Implementation Guide](./developer-docs/LARAVEL_IMPLEMENTATION.md)**: How to move assets to a *fresh* Laravel project.
- **[Laravel Template Process](./developer-docs/LARAVEL_TEMPLATE_CREATION.md)**: Details on the existing Blade implementation and directory mapping.
- **Sample Routes**: A ready-to-use `web.php` is available at `resources/laravel/web.php`.

---

## 📚 Technical Documentation

Explore our in-depth guides to master the Xivig architecture:

### Build & Automation
- **[Build System Guide](./developer-docs/BUILD_SYSTEM_GUIDE.md)**: Deep dive into Vite, Gulp, and Deployment.
- **[Utility Scripts](./developer-docs/UTILITY_SCRIPTS.md)**: Documentation for all automation scripts in `tasks/utils/`.
- **[Gulp Workflow](./developer-docs/GULP_WORKFLOW_GUIDE.md)**: How to write and extend Gulp tasks.

### Frontend Architecture
- **[Template Creation Guide](./developer-docs/TEMPLATE_CREATION.md)**: How to build new pages and components.
- **[SCSS Architecture](./developer-docs/SCSS_ARCHITECTURE.md)**: Mastering the 7-1 pattern.
- **[JS Architecture](./developer-docs/JS_ARCHITECTURE.md)**: Modular ES6 and initialization patterns.

---

## 🎨 Styling & Customization

The project uses a highly structured **7-1 Sass Pattern**. For a deep dive into how to modify colors, tokens, and components, please refer to the [SCSS_ARCHITECTURE.md](./developer-docs/SCSS_ARCHITECTURE.md) file.

### Quick Theme Change:
Update primary design tokens in `app/src/scss/base/_tokens.scss`:
```scss
:root {
  --elite-primary: #6366f1; /* Update your primary brand color */
  --elite-radius: 24px;    /* Global border radius */
}
```

---

## 📝 Templating Workflow

This project uses **Handlebars** for modular HTML construction.
- **Entry Points**: `index.html` in the root and all `.html` files in `app/pages/`.
- **Partials**: Located in `app/src/partials/`, these can be included in any page using:
  ```handlebars
  {{> sidebar }}
  ```

---

## 📦 Build Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the local server with HMR |
| `npm run build` | Compiles and minifies assets for production |
| `npm run preview` | Locally previews the production build |
| `npm run gulp:images` | Runs the Gulp image optimization pipeline |

---

## 🤝 Contributing

1. **Fork** the repository.
2. Create a **Feature Branch** (`git checkout -b feature/AmazingFeature`).
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`).
4. **Push** to the branch (`git push origin feature/AmazingFeature`).
5. Open a **Pull Request**.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with ❤️ by [XIVIG](https://github.com/xivig)*
