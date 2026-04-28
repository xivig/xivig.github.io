import {
  defineConfig
} from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import handlebars from 'vite-plugin-handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getHtmlEntries = () => {
  const entries = {};
  const files = fs.readdirSync(__dirname);
  files.forEach(file => {
    if (file.endsWith('.html') && file !== 'index.html') {
      const name = path.parse(file).name;
      entries[name] = path.resolve(__dirname, file);
    }
  });
  // Ensure index is included as 'index' instead of 'main' to avoid conflicts
  entries['index'] = path.resolve(__dirname, 'index.html');
  return entries;
};

export default defineConfig({
  base: './', // 👈 Ensures relative paths for assets
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, 'src/partials'),
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // This is the key to stopping the "310 repetitive warnings"
        quietDeps: true,
        // This explicitly silences the modern deprecation warnings you're seeing
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
    // Prevent Vite from clearing the folder if Gulp is also writing there
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      input: {
        ...getHtmlEntries(),
        // Vendor CSS Bundle
        vendors: path.resolve(__dirname, 'src/scss/vendors.scss'),
        // Master CSS Bundle
        main: path.resolve(__dirname, 'src/scss/main.scss'),
        // Components CSS Bundle
        components: path.resolve(__dirname, 'src/scss/components-bundle.scss'),
        // Custom Logic
        custom_scripts: path.resolve(__dirname, 'src/main.js'),
      },
      output: {
        // This keeps the filenames clean in the dist folder
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        manualChunks(id) {
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
      // This allows you to use @use "bootstrap" without path headaches
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  server: {
    host: true,
    strictPort: true,
    open: true,
    port: 3000,
  },
});