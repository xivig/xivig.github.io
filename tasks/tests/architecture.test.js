import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { validateDirectory } from '../utils/check-links.js';

test('1. Architecture: HTML Page Basename Uniqueness', () => {
    const pageMap = new Map();
    const duplicates = [];

    function scan(dir) {
        if (!fs.existsSync(dir)) return;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'docs') continue;
                scan(full);
            } else if (entry.name.endsWith('.html')) {
                const name = entry.name.toLowerCase();
                if (pageMap.has(name) && pageMap.get(name) !== full) {
                    duplicates.push({ name, first: pageMap.get(name), second: full });
                } else {
                    pageMap.set(name, full);
                }
            }
        }
    }

    scan(path.resolve('app/pages'));
    assert.equal(duplicates.length, 0, `Duplicate HTML basenames detected: ${JSON.stringify(duplicates)}`);
    assert.ok(pageMap.size >= 105, `Expected at least 105 unique HTML pages, found ${pageMap.size}`);
});

test('2. Design System: Contrast & Token Integrity', () => {
    const tokensPath = path.resolve('app/src/scss/base/_tokens.scss');
    const tokensContent = fs.readFileSync(tokensPath, 'utf8');

    // Assert primary brand is WCAG AA compliant #4059E8 (5.51:1 contrast)
    assert.match(tokensContent, /--xv-brand:\s*#4059E8/i, 'Primary brand token must be #4059E8 for WCAG AA');
    assert.match(tokensContent, /--bs-primary-rgb:\s*64,\s*89,\s*232/, 'Primary RGB must match 64, 89, 232');

    // Ensure deprecated non-compliant hex is not present in authored SCSS
    function checkScssDir(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const e of entries) {
            const full = path.join(dir, e.name);
            if (e.isDirectory()) {
                checkScssDir(full);
            } else if (e.name.endsWith('.scss')) {
                const text = fs.readFileSync(full, 'utf8');
                assert.ok(!text.includes('#4F6BFF'), `Found deprecated token #4F6BFF in ${full}`);
            }
        }
    }
    checkScssDir(path.resolve('app/src/scss'));
});

test('3. Accessibility: Mobile Zoom Unrestricted', () => {
    const headPartials = [
        'app/src/partials/head.html',
        'app/src/partials/auth-head.html',
        'app/src/partials/home-head.html',
        'resources/views/templates/admin/partials/head.blade.php',
        'resources/views/templates/auth/partials/head.blade.php',
        'resources/views/templates/home/partials/head.blade.php'
    ];

    for (const rel of headPartials) {
        const full = path.resolve(rel);
        if (fs.existsSync(full)) {
            const content = fs.readFileSync(full, 'utf8');
            assert.ok(!content.includes('maximum-scale'), `Forbidden zoom restriction 'maximum-scale' found in ${rel}`);
            assert.match(content, /<meta\s+name=["']viewport["'][^>]*content=["'][^"']*width=device-width[^"']*["']/i, `Valid viewport meta required in ${rel}`);
        }
    }
});

test('4. Security: No External Mock Destinations or DOM Eval', () => {
    const dropzoneHtml = fs.readFileSync(path.resolve('app/pages/forms/image-dropzone.html'), 'utf8');
    assert.ok(!dropzoneHtml.includes('httpbin.org'), 'External mock httpbin.org upload target must be eliminated');

    function checkScripts(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const e of entries) {
            const full = path.join(dir, e.name);
            if (e.isDirectory()) {
                checkScripts(full);
            } else if (e.name.endsWith('.js')) {
                const code = fs.readFileSync(full, 'utf8');
                assert.ok(!/\beval\s*\(/.test(code), `Dangerous eval() usage detected in ${full}`);
            }
        }
    }
    checkScripts(path.resolve('app/src/scripts'));
});

test('5. Laravel Architecture: Consolidated templates.* Standard', () => {
    function checkBlade(dir) {
        if (!fs.existsSync(dir)) return;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const e of entries) {
            const full = path.join(dir, e.name);
            if (e.isDirectory()) {
                if (e.name === 'layouts') continue; // Skip legacy forwarders
                checkBlade(full);
            } else if (e.name.endsWith('.blade.php')) {
                const content = fs.readFileSync(full, 'utf8');
                assert.ok(!content.includes("@extends('layouts."), `Blade template in ${full} must extend 'templates.*', not 'layouts.*'`);
            }
        }
    }
    checkBlade(path.resolve('resources/views'));
});

test('6. Production Docs Quality Gate: Link & Asset Integrity', async () => {
    const result = await validateDirectory('./docs', { checkAssets: true });
    assert.ok(result.totalHtml >= 105, `Expected >= 105 compiled pages in docs/, found ${result.totalHtml}`);
    assert.equal(result.brokenLinks.length, 0, `Found broken internal links in docs/: ${JSON.stringify(result.brokenLinks)}`);
    assert.equal(result.brokenAssets.length, 0, `Found broken asset references in docs/: ${JSON.stringify(result.brokenAssets)}`);
    assert.equal(result.missingAlt.length, 0, `Found missing img alt attributes in docs/: ${JSON.stringify(result.missingAlt)}`);
    assert.equal(result.unsecuredLinks.length, 0, `Found unsecured target=_blank links in docs/: ${JSON.stringify(result.unsecuredLinks)}`);
});
