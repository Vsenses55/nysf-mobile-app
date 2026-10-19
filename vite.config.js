import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

// Exposes `virtual:asset-list` — every image under public/assets — so the app
// can preload them in the background (see src/state/preload.js). Always in
// sync: add or remove an image and the list follows on the next build.
function assetList() {
  const root = join(process.cwd(), 'public', 'assets');
  const walk = (dir) =>
    readdirSync(dir).flatMap((name) => {
      const p = join(dir, name);
      return statSync(p).isDirectory() ? walk(p) : [relative(root, p).split('\\').join('/')];
    });
  return {
    name: 'asset-list',
    resolveId: (id) => (id === 'virtual:asset-list' ? '\0asset-list' : null),
    load(id) {
      if (id !== '\0asset-list') return null;
      const files = walk(root).filter((f) => /\.(jpe?g|png|svg|webp)$/i.test(f));
      return `export default ${JSON.stringify(files)};`;
    },
  };
}

// base: './' keeps every asset path relative, so the build works on GitHub Pages
// under /nysf-mobile-app/ (or any other folder) without changes.
export default defineConfig({
  base: './',
  plugins: [react(), assetList()],
});
