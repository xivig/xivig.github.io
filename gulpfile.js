import gulp from 'gulp';
import { exec } from 'child_process';
import sharpOptimizeImages from 'gulp-sharp-optimize-images';
import { deleteAsync } from 'del';
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { exportAssets } from './tasks/gulp/export.js';
import { serveDocs } from './tasks/gulp/serve-docs.js';
import { fixLinks } from './tasks/utils/replace-links.js';
import { runFullBuild } from './tasks/build.js';

// 1. Clean
export const clean = () => deleteAsync(['dist', 'exports']);

// 2. Vite Build
export const viteBuild = (cb) => {
    exec('npx vite build', (err, stdout, stderr) => {
        if (stdout) console.log(stdout);
        if (stderr) console.error(stderr);
        cb(err);
    });
};

// 3. Image Sync & WebP Optimization
export const copyImages = () => {
    return gulp.src('app/src/images/**/*', { encoding: false, allowEmpty: true })
        .pipe(gulp.dest('dist/assets'));
};

export const optimizeWebp = () => {
    return gulp.src('app/src/images/**/*.{jpg,png,jpeg}', { allowEmpty: true })
        .pipe(sharpOptimizeImages({
            webp: {
                quality: 80
            }
        }))
        .pipe(gulp.dest('dist/assets'));
};

export const optimizeImages = gulp.series(copyImages, optimizeWebp);

// 4. Flatten HTML pages from app/pages directly to root of dist (clean async)
export const flattenHtmlPages = async () => {
    const srcDir = path.resolve('dist/app/pages');
    const targetDir = path.resolve('dist');
    if (!fs.existsSync(srcDir)) return;

    const moveHtml = async (dir) => {
        const entries = await fsp.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                await moveHtml(fullPath);
            } else if (entry.name.endsWith('.html')) {
                const destPath = path.join(targetDir, entry.name);
                await fsp.copyFile(fullPath, destPath);
            }
        }
    };

    await moveHtml(srcDir);
    await fsp.rm(path.resolve('dist/app'), { recursive: true, force: true });
};

// 5. Standardize Links across all pages in dist
export const fixDistLinks = async () => {
    await fixLinks("./dist");
};

// 6. Copy Vendor Packages from node_modules into dist/plugins
export async function copyVendorPackages() {
    await new Promise((resolve, reject) => {
        gulp.src(
            [
                "node_modules/bootstrap-icons/font/fonts/**/*",
                "node_modules/bootstrap-icons/font/bootstrap-icons.css",
                "node_modules/@fortawesome/fontawesome-free/webfonts/**/*",
                "node_modules/@fortawesome/fontawesome-free/css/all.min.css",
                "node_modules/bootstrap/dist/**/*",
                "node_modules/overlayscrollbars/**/*",
                "node_modules/@fullcalendar/**/*",
                "node_modules/dropzone/**/*",
                "node_modules/air-datepicker/**/*",
                "node_modules/cropperjs/**/*",
                "node_modules/highlight.js/**/*",
                "node_modules/dayjs/**/*",
                "node_modules/moment/**/*",
                "node_modules/clipboard/**/*",
            ], {
                base: "node_modules"
            },
        )
        .pipe(gulp.dest("dist/plugins/"))
        .on('end', resolve)
        .on('error', reject);
    });
}

// 7. Servers
export const serve = (cb) => {
    const vite = exec('npx vite --open');
    vite.stdout.on('data', (d) => console.log(d));
    cb();
};

export const preview = (cb) => {
    const vite = exec('npx vite preview');
    vite.stdout.on('data', (d) => console.log(d));
    cb();
};

// --- WORKFLOWS ---

// Local Development
export const dev = gulp.series(clean, serve);

// Modern Production Build: Clean, Vite compile, Optimize Images, Flatten HTML, Copy Vendors, Normalize Links, Export to Docs, Automated Quality Gate
export const build = async () => {
    await runFullBuild();
};

// Preview production build
export const production = gulp.series(
    build,
    preview
);

export const docs = gulp.series(serveDocs);
export default dev;
