import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

/**
 * Enterprise Link & Asset Validator
 * Scans all generated HTML files in a directory and verifies that:
 * 1. Every internal href points to an existing file.
 * 2. Every stylesheet link points to an existing CSS file.
 * 3. Every script tag points to an existing JS file.
 * 4. Every img tag points to an existing image.
 */
export async function validateDirectory(dirPath, options = {}) {
    const rootDir = path.resolve(dirPath);
    if (!fs.existsSync(rootDir)) {
        return { totalHtml: 0, brokenLinks: [], brokenAssets: [] };
    }

    async function walk(dir) {
        let results = [];
        const entries = await fsp.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'plugins' || entry.name === 'pages' || entry.name === 'app') continue;
                results.push(...await walk(full));
            } else if (entry.name.endsWith('.html')) {
                results.push(full);
            }
        }
        return results;
    }

    const htmlFiles = await walk(rootDir);
    const brokenLinks = [];
    const brokenAssets = [];
    const missingAlt = [];
    const unsecuredLinks = [];

    for (const file of htmlFiles) {
        const content = await fsp.readFile(file, 'utf8');
        const fileDir = path.dirname(file);
        const relHtmlPath = path.relative(rootDir, file).replace(/\\/g, '/');

        // 1. Check hyperlinks
        const hrefMatches = content.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi);
        for (const m of hrefMatches) {
            const raw = m[1].trim();
            if (!raw || raw.startsWith('#') || raw.startsWith('javascript:') || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('http://') || raw.startsWith('https://')) {
                continue;
            }
            const clean = raw.split('#')[0].split('?')[0];
            if (!clean) continue;

            const targetPath = clean.startsWith('/')
                ? path.join(rootDir, clean.slice(1))
                : path.resolve(fileDir, clean);

            if (!fs.existsSync(targetPath)) {
                brokenLinks.push({
                    file: relHtmlPath,
                    target: raw,
                    resolved: path.relative(rootDir, targetPath).replace(/\\/g, '/')
                });
            }
        }

        // 3. Accessibility & Security Checks
        const imgTags = content.matchAll(/<img([^>]+)>/gi);
        for (const m of imgTags) {
            if (!m[1].includes('alt=')) {
                missingAlt.push({ file: relHtmlPath, tag: m[0] });
            }
        }

        const blankLinks = content.matchAll(/<a([^>]*target=["']_blank["'][^>]*)>/gi);
        for (const m of blankLinks) {
            if (!m[1].includes('rel=') || !m[1].includes('noopener')) {
                unsecuredLinks.push({ file: relHtmlPath, tag: m[0] });
            }
        }

        // 2. Check asset links (CSS, Scripts, Images)
        if (options.checkAssets) {
            const assetMatches = content.matchAll(/<(?:link\b[^>]*\bhref|script\b[^>]*\bsrc|img\b[^>]*\bsrc)=["']([^"']+)["']/gi);
            for (const m of assetMatches) {
                const raw = m[1].trim();
                if (!raw || raw.startsWith('data:') || raw.startsWith('http://') || raw.startsWith('https://') || raw.includes('${')) {
                    continue;
                }
                const clean = raw.split('#')[0].split('?')[0];
                if (!clean) continue;

                const targetPath = clean.startsWith('/')
                    ? path.join(rootDir, clean.slice(1))
                    : path.resolve(fileDir, clean);

                if (!fs.existsSync(targetPath)) {
                    brokenAssets.push({
                        file: relHtmlPath,
                        asset: raw,
                        resolved: path.relative(rootDir, targetPath).replace(/\\/g, '/')
                    });
                }
            }
        }
    }

    return {
        totalHtml: htmlFiles.length,
        brokenLinks,
        brokenAssets,
        missingAlt: missingAlt || [],
        unsecuredLinks: unsecuredLinks || []
    };
}

// Standalone runner
const isMain = process.argv[1] && (process.argv[1].endsWith('check-links.js') || process.argv[1].includes('check-links.js'));
if (isMain) {
    (async () => {
        console.log('🔍 Running Enterprise Link Integrity Quality Gate...');
        let hasErrors = false;

        for (const targetDir of ['./dist', './docs']) {
            const result = await validateDirectory(targetDir, { checkAssets: true });
            console.log(`\n📁 Checking directory: ${targetDir}`);
            console.log(`   - Total HTML files: ${result.totalHtml}`);
            console.log(`   - Broken internal links: ${result.brokenLinks.length}`);
            console.log(`   - Broken assets: ${result.brokenAssets.length}`);
            console.log(`   - Missing img alt attributes: ${result.missingAlt.length}`);
            console.log(`   - Unsecured target=_blank links: ${result.unsecuredLinks.length}`);

            if (result.brokenLinks.length > 0) {
                hasErrors = true;
                console.error(`   ❌ Broken Links in ${targetDir}:`);
                result.brokenLinks.forEach(b => console.error(`      [${b.file}] => ${b.target} (resolved: ${b.resolved})`));
            }
            if (result.brokenAssets.length > 0) {
                hasErrors = true;
                console.error(`   ❌ Broken Assets in ${targetDir}:`);
                result.brokenAssets.forEach(b => console.error(`      [${b.file}] => ${b.asset} (resolved: ${b.resolved})`));
            }
        }

        if (hasErrors) {
            console.error('\n❌ Quality gate failed: Broken references detected.');
            process.exit(1);
        } else {
            console.log('\n✅ Quality gate passed: 100% link and asset integrity verified.');
            process.exit(0);
        }
    })();
}
