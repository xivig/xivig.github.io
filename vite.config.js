import {
  defineConfig
} from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import handlebars from 'vite-plugin-handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to build a mapping between flat page filenames and their source path
const buildPageMap = (baseDir) => {
  const map = new Map();
  const scan = (dir) => {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        scan(fullPath);
      } else if (item.name.endsWith('.html')) {
        const relative = path.relative(baseDir, fullPath).replace(/\\/g, '/');
        map.set(item.name, '/' + relative);
      }
    }
  };
  scan(path.join(baseDir, 'app/pages'));
  return map;
};

// Dev server plugin: lets flat URLs like /calendar.html or /chat.html route to app/pages/** in dev mode
const devPageRouterPlugin = () => {
  const pageMap = buildPageMap(__dirname);

  return {
    name: 'dev-page-router',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlObj = new URL(req.url, 'http://localhost');
        const pathname = urlObj.pathname.replace(/^\//, '');

        if (pageMap.has(pathname)) {
          req.url = pageMap.get(pathname) + urlObj.search;
        }
        next();
      });
    }
  };
};

// Helper to find all HTML files recursively for Rollup entry inputs
const getHtmlEntries = (baseDir) => {
  const entries = {};

  // 1. Root index.html
  if (fs.existsSync(path.join(baseDir, 'index.html'))) {
    entries['index'] = path.resolve(baseDir, 'index.html');
  }

  // 2. Scan app/pages recursively
  const scanDir = (dir) => {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        scanDir(fullPath);
      } else if (item.name.endsWith('.html')) {
        const name = path.parse(item.name).name;
        entries[name] = fullPath;
      }
    }
  };

  scanDir(path.join(baseDir, 'app/pages'));
  return entries;
};

export default defineConfig({
  base: './', // Clean relative assets for GitHub Pages and production
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, 'app/src/partials'),
    }),
    devPageRouterPlugin(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: [
          'import',
          'global-builtin',
          'color-functions',
          'if-function'
        ],
      },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      input: getHtmlEntries(__dirname),
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        manualChunks(id) {
          if (id.includes('node_modules/jquery/') || id.includes('app/src/scripts/core/jquery-setup.js')) {
            return 'vendor-jquery';
          }
          if (id.includes('node_modules')) {
            if (id.includes('echarts') || id.includes('zrender')) {
              return 'vendor-echarts';
            }
            if (id.includes('highcharts')) {
              return 'vendor-highcharts';
            }
            if (id.includes('apexcharts')) {
              return 'vendor-apexcharts';
            }
            if (id.includes('chart.js')) {
              return 'vendor-chartjs';
            }
            if (id.includes('@fullcalendar')) {
              return 'vendor-fullcalendar';
            }
            return 'vendor-core';
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '@': path.resolve(__dirname, 'app/src'),
    }
  },
  server: {
    host: true,
    strictPort: true,
    open: true,
    port: 3000,
  },
});
