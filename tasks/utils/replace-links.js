// tasks/utils/replace-links.js
import fs from "fs";
import path from "path";

function walk(dir, callback) {
    if (!fs.existsSync(dir)) return; // skip if folder doesn't exist
    fs.readdirSync(dir).forEach(file => {
        const filepath = path.join(dir, file);
        const stat = fs.statSync(filepath);

        if (stat.isDirectory()) {
            walk(filepath, callback);
        } else if (filepath.endsWith(".html")) {
            callback(filepath);
        }
    });
}

function fixLinks(folder) {
    walk(folder, file => {
        let content = fs.readFileSync(file, "utf8");

        // Strip "app/" prefix from any path
        const replaced = content.replace(/app\//g, "");

        if (content !== replaced) {
            fs.writeFileSync(file, replaced, "utf8");
            console.log(`Updated: ${file}`);
        }
    });
}

// Run for both dist and docs
fixLinks("./dist");
fixLinks("./docs");