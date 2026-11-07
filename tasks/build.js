/**
 * XIVIG ARCHITECT BUILD ENGINE (PRODUCTION & CI/CD)
 * Fully automated, zero-hang, high-velocity build system.
 * 
 * Pipeline:
 * 1. Clean build directories (dist, exports)
 * 2. Vite programmatic compile (HTML, SCSS, JS, manual chunks)
 * 3. Fast parallel WebP image optimization & asset sync
 * 4. Flatten HTML pages for zero-routing static hosting
 * 5. Vendor packages distribution
 * 6. Relative link normalization (dist & docs)
 * 7. GitHub Pages synchronization (.nojekyll)
 * 8. Automated quality gate (0 broken links & assets validator)
 */

import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { build as viteBuild } from 'vite';
import { fixLinks } from './utils/replace-links.js';
import { validateDirectory } from './utils/check-links.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function cleanDirectories() {
    console.log('🧹 [1/8] Cleaning stale build artifacts...');
    await fsp.rm(path.join(rootDir, 'dist'), { recursive: true, force: true });
    await fsp.rm(path.join(rootDir, 'exports'), { recursive: true, force: true });
}

async function compileVite() {
    console.log('⚡ [2/8] Compiling Vite production client bundle...');
    await viteBuild({
        root: rootDir,
        logLevel: 'warn'
    });
}

async function optimizeImages() {
    console.log('🖼️  [3/8] Synchronizing & optimizing WebP assets...');
    const srcDir = path.join(rootDir, 'app/src/images');
    const destDir = path.join(rootDir, 'dist/assets');
    if (!fs.existsSync(srcDir)) return;

    await fsp.mkdir(destDir, { recursive: true });
    await fsp.cp(srcDir, destDir, { recursive: true, force: true });

    try {
        const sharp = (await import('sharp')).default;
        async function walk(dir) {
            let files = [];
            const items = await fsp.readdir(dir, { withFileTypes: true });
            for (const item of items) {
                const full = path.join(dir, item.name);
                if (item.isDirectory()) files.push(...await walk(full));
                else if (/\.(jpe?g|png)$/i.test(item.name)) files.push(full);
            }
            return files;
        }

        const images = await walk(srcDir);
        await Promise.all(images.map(async (img) => {
            const rel = path.relative(srcDir, img);
            const targetWebp = path.join(destDir, rel).replace(/\.(jpe?g|png)$/i, '.webp');
            try {
                await fsp.mkdir(path.dirname(targetWebp), { recursive: true });
                await sharp(img).webp({ quality: 80 }).toFile(targetWebp);
            } catch (err) {
                // Ignore individual format failures
            }
        }));
        sharp.cache(false);
    } catch (e) {
        console.warn('   (Sharp WebP optimization skipped)');
    }
}

async function flattenHtmlPages() {
    console.log('📄 [4/8] Flattening HTML views for static host compatibility...');
    const pagesDir = path.join(rootDir, 'dist/app/pages');
    const targetDir = path.join(rootDir, 'dist');
    if (!fs.existsSync(pagesDir)) return;

    async function moveHtml(dir) {
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
    }

    await moveHtml(pagesDir);
    await fsp.rm(path.join(rootDir, 'dist/app'), { recursive: true, force: true });
}

async function copyVendorPackages() {
    if (!process.env.XIVIG_INCLUDE_LEGACY_PLUGINS) {
        console.log('📦 [5/8] Modern Vite bundling active. Skipping unreferenced legacy vendor package duplication.');
        return;
    }
    console.log('📦 [5/8] Distributing client-side vendor packages...');
    const outDir = path.join(rootDir, 'dist');
    const packages = [
        { from: 'node_modules/bootstrap-icons', to: 'plugins/bootstrap-icons' },
        { from: 'node_modules/@fortawesome/fontawesome-free', to: 'plugins/@fortawesome/fontawesome-free' },
        { from: 'node_modules/bootstrap/dist', to: 'plugins/bootstrap/dist' },
        { from: 'node_modules/overlayscrollbars', to: 'plugins/overlayscrollbars' },
        { from: 'node_modules/@fullcalendar', to: 'plugins/@fullcalendar' },
        { from: 'node_modules/dropzone', to: 'plugins/dropzone' },
        { from: 'node_modules/air-datepicker', to: 'plugins/air-datepicker' },
        { from: 'node_modules/cropperjs', to: 'plugins/cropperjs' },
        { from: 'node_modules/highlight.js', to: 'plugins/highlight.js' },
        { from: 'node_modules/dayjs', to: 'plugins/dayjs' },
        { from: 'node_modules/moment', to: 'plugins/moment' },
        { from: 'node_modules/clipboard', to: 'plugins/clipboard' },
    ];

    for (const pkg of packages) {
        const srcPath = path.join(rootDir, pkg.from);
        if (fs.existsSync(srcPath)) {
            const destPath = path.join(outDir, pkg.to);
            await fsp.mkdir(path.dirname(destPath), { recursive: true });
            await fsp.cp(srcPath, destPath, { recursive: true, force: true });
        }
    }
}

async function generateBackwardCompatibilityShims(targetDir) {
    const srcPagesDir = path.join(rootDir, "app/pages");
    if (!fs.existsSync(srcPagesDir)) return;

    async function walk(dir) {
        const entries = await fsp.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                await walk(fullPath);
            } else if (entry.name.endsWith(".html")) {
                const relFromPages = path.relative(srcPagesDir, fullPath).replace(/\\/g, "/");
                const segments = relFromPages.split("/");
                const depthPages = segments.length;
                const prefixPages = "../".repeat(depthPages);
                const prefixApp = "../".repeat(depthPages + 1);

                // 1. Shims in targetDir/pages/...
                const shimPagesPath = path.join(targetDir, "pages", relFromPages);
                await fsp.mkdir(path.dirname(shimPagesPath), { recursive: true });
                const shimPagesHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Redirecting...</title><meta http-equiv="refresh" content="0; url=${prefixPages}${entry.name}"><link rel="canonical" href="${prefixPages}${entry.name}"><script>window.location.replace("${prefixPages}${entry.name}" + window.location.search + window.location.hash);</script></head><body style="font-family:sans-serif;text-align:center;padding:50px;">Redirecting to <a href="${prefixPages}${entry.name}">${entry.name}</a>...</body></html>`;
                await fsp.writeFile(shimPagesPath, shimPagesHtml, "utf-8");

                // 2. Shims in targetDir/app/pages/...
                const shimAppPath = path.join(targetDir, "app/pages", relFromPages);
                await fsp.mkdir(path.dirname(shimAppPath), { recursive: true });
                const shimAppHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Redirecting...</title><meta http-equiv="refresh" content="0; url=${prefixApp}${entry.name}"><link rel="canonical" href="${prefixApp}${entry.name}"><script>window.location.replace("${prefixApp}${entry.name}" + window.location.search + window.location.hash);</script></head><body style="font-family:sans-serif;text-align:center;padding:50px;">Redirecting to <a href="${prefixApp}${entry.name}">${entry.name}</a>...</body></html>`;
                await fsp.writeFile(shimAppPath, shimAppHtml, "utf-8");
            }
        }
    }

    await walk(srcPagesDir);
}

async function refineAndExport() {
    console.log("🔗 [6/8] Normalizing relative links & export to GitHub Pages (docs)...");
    const distPath = path.join(rootDir, "dist");
    const docsPath = path.join(rootDir, "docs");

    // 1. Refine dist
    await fixLinks(distPath);

    // 2. Generate backward-compatibility redirect shims
    await generateBackwardCompatibilityShims(distPath);

    // 3. Export to docs
    await fsp.writeFile(path.join(distPath, ".nojekyll"), "");
    await fsp.rm(docsPath, { recursive: true, force: true });
    await fsp.cp(distPath, docsPath, { recursive: true, force: true });
    await fsp.writeFile(path.join(docsPath, ".nojekyll"), "");
}

async function copyDocumentationSite() {
    console.log('📚 [6.5/8] Publishing project documentation...');
    const source = path.join(rootDir, 'documentation');
    const destination = path.join(rootDir, 'docs', 'documentation');
    if (!fs.existsSync(source)) {
        console.warn('   (Documentation source folder not found; skipping)');
        return;
    }
    await fsp.rm(destination, { recursive: true, force: true });
    await fsp.mkdir(destination, { recursive: true });
    await fsp.cp(source, destination, { recursive: true, force: true });
}

async function runQualityGate() {
    console.log('🛡️  [7/8] Running automated Quality Gate (Link & Asset Verification)...');
    const distResult = await validateDirectory(path.join(rootDir, 'dist'), { checkAssets: true });
    const docsResult = await validateDirectory(path.join(rootDir, 'docs'), { checkAssets: true });

    let failed = false;
    if (distResult.brokenLinks.length > 0) {
        failed = true;
        console.error(`   ❌ ${distResult.brokenLinks.length} broken links found in dist:`);
        distResult.brokenLinks.forEach(b => console.error(`      [${b.file}] => ${b.target}`));
    }
    if (docsResult.brokenLinks.length > 0) {
        failed = true;
        console.error(`   ❌ ${docsResult.brokenLinks.length} broken links found in docs:`);
        docsResult.brokenLinks.forEach(b => console.error(`      [${b.file}] => ${b.target}`));
    }

    if (distResult.brokenAssets.length > 0) {
        failed = true;
        console.error(`   ❌ ${distResult.brokenAssets.length} broken assets found in dist:`);
        distResult.brokenAssets.forEach(b => console.error(`      [${b.file}] => ${b.asset}`));
    }
    if (docsResult.brokenAssets.length > 0) {
        failed = true;
        console.error(`   ❌ ${docsResult.brokenAssets.length} broken assets found in docs:`);
        docsResult.brokenAssets.forEach(b => console.error(`      [${b.file}] => ${b.asset}`));
    }

    if (failed) {
        throw new Error('Quality gate failed due to broken references.');
    }

    console.log(`   ✅ 100% Validated: ${distResult.totalHtml} views in dist, ${docsResult.totalHtml} views in docs. Zero broken references.`);
    return { htmlCount: distResult.totalHtml };
}

export async function runFullBuild() {
    const startTime = Date.now();
    console.log('\n======================================================');
    console.log('       🚀 XIVIG ARCHITECT BUILD ENGINE v2.0');
    console.log('======================================================\n');

    try {
        await cleanDirectories();
        await compileVite();
        await optimizeImages();
        await flattenHtmlPages();
        await copyVendorPackages();
        await refineAndExport();
        await copyDocumentationSite();
        const { htmlCount } = await runQualityGate();

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log('\n======================================================');
        console.log(`   🎉 BUILD SUCCEEDED IN ${duration}s!`);
        console.log(`   • HTML Views: ${htmlCount} Flattened & Validated`);
        console.log(`   • Target Dirs: dist/ & docs/ (GitHub Pages Ready)`);
        console.log(`   • Quality Gate: 0 Broken Links / 0 Broken Assets`);
        console.log('======================================================\n');
        return true;
    } catch (err) {
        console.error('\n❌ BUILD FAILED:', err);
        throw err;
    }
}

// Standalone CLI execution
const isMain = process.argv[1] && (process.argv[1].endsWith('build.js') || process.argv[1].includes('build.js'));
if (isMain) {
    runFullBuild()
        .then(() => {
            console.log('🏁 Process exiting cleanly with code 0.');
            process.exit(0);
        })
        .catch((err) => {
            console.error('Fatal build failure:', err);
            process.exit(1);
        });
}
