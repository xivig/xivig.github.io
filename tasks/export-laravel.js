import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

/**
 * Dedicated Laravel Asset Pipeline
 * Compiles and isolates assets for Laravel integration (public/assets & public/images)
 * completely separate from the GitHub Pages static deployment directory (docs/).
 */
async function exportLaravelAssets() {
    console.log('🚀 Packaging dedicated Laravel assets...');

    const srcImages = path.resolve('app/src/images');
    const publicDir = path.resolve('public');
    const publicAssets = path.resolve('public/assets');
    const docsAssets = path.resolve('docs/assets');

    // 1. Ensure target category directories exist
    const categories = ['admin', 'home', 'auth'];
    for (const cat of categories) {
        for (const sub of ['images', 'js', 'css']) {
            await fsp.mkdir(path.join(publicAssets, cat, sub), { recursive: true });
        }
    }

    // 2. Synchronize images into public/images and category directories
    if (fs.existsSync(srcImages)) {
        const imageFiles = await fsp.readdir(srcImages, { withFileTypes: true });
        for (const file of imageFiles) {
            if (file.isFile()) {
                const src = path.join(srcImages, file.name);
                // Copy to public/images for standard Laravel asset('images/...') access
                await fsp.copyFile(src, path.join(publicDir, 'images', file.name));
                
                // Also copy to category dirs for backward compatibility
                for (const cat of categories) {
                    await fsp.copyFile(src, path.join(publicAssets, cat, 'images', file.name));
                }
            }
        }
        console.log('✅ Synchronized static images into public/images and public/assets/*/images');
    }

    // 3. Separate compiled CSS & JS from docs/assets
    if (fs.existsSync(docsAssets)) {
        const compiledAssets = await fsp.readdir(docsAssets);
        for (const item of compiledAssets) {
            const src = path.join(docsAssets, item);
            const stat = await fsp.stat(src);
            if (!stat.isFile()) continue;

            const ext = path.extname(item).toLowerCase();
            const sub = ext === '.js' ? 'js' : (ext === '.css' ? 'css' : null);
            if (!sub) continue;

            if (item.includes('main') || item.includes('vendor') || item.includes('admin')) {
                await fsp.copyFile(src, path.join(publicAssets, 'admin', sub, item));
            }
            if (item.includes('home') || item.includes('landing')) {
                await fsp.copyFile(src, path.join(publicAssets, 'home', sub, item));
            }
            if (item.includes('auth')) {
                await fsp.copyFile(src, path.join(publicAssets, 'auth', sub, item));
            }
        }
        console.log('✅ Isolated compiled bundles into categorized Laravel directories: public/assets/{admin,home,auth}');
    } else {
        console.warn('⚠️ docs/assets not found. Run npm run build first to populate compiled bundles.');
    }

    // 4. Generate Laravel Asset Manifest
    const manifest = {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        structure: {
            admin: {
                css: '/assets/admin/css/',
                js: '/assets/admin/js/'
            },
            home: {
                css: '/assets/home/css/',
                js: '/assets/home/js/'
            },
            auth: {
                css: '/assets/auth/css/',
                js: '/assets/auth/js/'
            },
            images: '/images/'
        }
    };

    await fsp.writeFile(
        path.join(publicDir, 'laravel-asset-manifest.json'),
        JSON.stringify(manifest, null, 2),
        'utf8'
    );
    console.log('✅ Generated public/laravel-asset-manifest.json');
}

exportLaravelAssets().catch(err => {
    console.error('❌ Laravel export error:', err);
    process.exit(1);
});
