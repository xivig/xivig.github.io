import fs from 'fs/promises';
import path from 'path';

/**
 * Modern export task for GitHub Pages docs generation.
 * 1. Ensures .nojekyll exists.
 * 2. Cleans stale docs.
 * 3. Copies entire flattened dist folder to docs for GitHub Pages hosting.
 */
export async function exportAssets() {
  const sourcePath = 'dist';
  const destinationPath = 'docs';

  console.log(`🚀 Starting export from '${sourcePath}' to '${destinationPath}'...`);

  try {
    // 1. Ensure .nojekyll exists in source
    await fs.writeFile(path.join(sourcePath, '.nojekyll'), '');

    // 2. Clean destination folder first
    await fs.rm(destinationPath, { recursive: true, force: true });
    
    // 3. Copy all files, including dotfiles
    await fs.cp(sourcePath, destinationPath, { recursive: true });

    // 4. Ensure .nojekyll exists in destination
    await fs.writeFile(path.join(destinationPath, '.nojekyll'), '');
    
    console.log('✅ Export to docs folder complete (flattened for GitHub Pages).');
  } catch (error) {
    console.error(`❌ Export failed:`, error);
    throw error;
  }
}
