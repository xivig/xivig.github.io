import fs from "fs";
import fsp from "fs/promises";
import path from "path";

/**
 * Bulletproof async write file with retry on transient Windows locks.
 */
async function safeWriteFile(filePath, data) {
    for (let i = 0; i < 8; i++) {
        try {
            await fsp.writeFile(filePath, data, 'utf8');
            return;
        } catch (err) {
            if (i === 7) {
                try {
                    fs.writeFileSync(filePath, data, 'utf8');
                    return;
                } catch (syncErr) {
                    throw err;
                }
            }
            await new Promise(r => setTimeout(r, 200 * (i + 1)));
        }
    }
}

/**
 * Fast recursive scan for HTML files, skipping heavy vendor & asset directories.
 */
async function getHtmlFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const items = await fsp.readdir(dir, { withFileTypes: true });
    for (const item of items) {
        const filepath = path.join(dir, item.name);
        if (item.isDirectory()) {
            if (item.name === 'plugins' || item.name === 'node_modules' || item.name === '.git' || item.name === 'assets' || item.name === 'pages' || item.name === 'app') {
                continue;
            }
            results = results.concat(await getHtmlFiles(filepath));
        } else if (item.name.endsWith(".html")) {
            results.push(filepath);
        }
    }
    return results;
}

/**
 * Normalizes all links and asset paths in a flattened dist/docs directory.
 * @param {string} folder Root folder to process (e.g. './dist' or './docs')
 */
export async function fixLinks(folder) {
    const rootDir = path.resolve(folder);
    console.log(`🛠️ Refining links in: ${folder}`);

    // Update sidebar-config.json if it exists
    const sidebarConfigPath = path.join(rootDir, 'data', 'sidebar-config.json');
    if (fs.existsSync(sidebarConfigPath)) {
        try {
            let sc = await fsp.readFile(sidebarConfigPath, "utf8");
            const origSc = sc;
            sc = sc.replace(/"path":\s*["']\/(?:pages\/.*\/|pages\/|app\/pages\/.*\/|app\/pages\/)?([^"']+\.html)["']/g, '"path": "$1"');
            sc = sc.replace(/"path":\s*["']\/index\.html["']/g, '"path": "index.html"');
            if (sc !== origSc) {
                await safeWriteFile(sidebarConfigPath, sc);
            }
        } catch (e) {
            console.warn("Could not update sidebar-config.json:", e);
        }
    }

    const htmlFiles = await getHtmlFiles(rootDir);
    for (const file of htmlFiles) {
        let content = await fsp.readFile(file, "utf8");
        const origContent = content;

        // 1. Inject exactly one Root Path script in HTML files
        content = content.replace(/<script>\s*window\.XIVIG_ROOT\s*=\s*["'][^"']*["'];\s*<\/script>\s*/g, '');
        const rootScript = `<script>window.XIVIG_ROOT = "./";</script>`;
        if (content.includes("<head>")) {
            content = content.replace("<head>", `<head>\n    ${rootScript}`);
        } else {
            content = rootScript + "\n" + content;
        }

        // 2. Fix known legacy file typos across all pages
        content = content.replace(/ecommerce-order-edit\.html/g, 'edit-order.html');
        content = content.replace(/ecommerce-ecommerce-product-detail\.html/g, 'ecommerce-product-detail.html');
        content = content.replace(/(?<!ecommerce-)product-detail\.html/g, 'ecommerce-product-detail.html');
        content = content.replace(/pipeline\.html/g, 'build-history.html');
        content = content.replace(/(?<!releases\.)release\.html/g, 'releases.html');
        content = content.replace(/(['"])\/?(?:app\/src\/images|assets)\/product\.jpg\1/g, '$1./assets/product-1.jpg$1');

        // 3. Normalize asset references:
        content = content.replace(/(href|src|data-src|poster)=(['"])(?:\.\.\/)+assets\/([^'"]*)(['"])/g, '$1=$2./assets/$3$4');
        content = content.replace(/(href|src|data-src|poster)=(['"])\/assets\/([^'"]*)(['"])/g, '$1=$2./assets/$3$4');

        // Any /app/src/images/ or ../../../images/ or /images/ -> ./assets/
        content = content.replace(/(href|src|data-src|poster)=(['"])(?:\/app\/src\/images\/|(?:\.\.\/)+images\/|\/images\/|app\/src\/images\/)([^'"]*)(['"])/g, '$1=$2./assets/$3$4');

        // Any ../../../plugins/ or /plugins/ -> ./plugins/
        content = content.replace(/(href|src|data-src|poster)=(['"])(?:(?:\.\.\/)+plugins\/|\/plugins\/)([^'"]*)(['"])/g, '$1=$2./plugins/$3$4');

        // Any ../../../data/ or /data/ -> ./data/
        content = content.replace(/(href|src|data-src|poster)=(['"])(?:(?:\.\.\/)+data\/|\/data\/)([^'"]*)(['"])/g, '$1=$2./data/$3$4');

        // 4. Flatten all HTML page links:
        content = content.replace(/href=(['"])(?:(?:\.\.\/)*(?:app\/)?pages\/.*\/|(?:\.\.\/)*(?:app\/)?pages\/|\/(?:app\/)?pages\/.*\/|\/(?:app\/)?pages\/)([^/'"]+\.html)(#[^'"]*)?(['"])/g, 'href=$1./$2$3$4');

        // /index.html -> ./index.html
        content = content.replace(/href=(['"])\/index\.html(#[^'"]*)?(['"])/g, 'href=$1./index.html$2$3');

        // 5. Cleanup any double ././ or /./
        content = content.replace(/\/\.\//g, '/');
        content = content.replace(/\.\/\.\//g, './');

        if (content !== origContent) {
            await safeWriteFile(file, content);
        }
    }
    
    console.log(`✅ Links refined for ${folder}`);
}

// If running directly
const isMain = process.argv[1] && (process.argv[1].endsWith('replace-links.js') || process.argv[1].includes('replace-links.js'));
if (isMain) {
    (async () => {
        await fixLinks("./dist");
        await fixLinks("./docs");
    })();
}
