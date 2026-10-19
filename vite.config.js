import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps every asset path relative, so the build works on GitHub Pages
// under /nysf-mobile-app/ (or any other folder) without changes.
export default defineConfig({
  base: './',
  plugins: [react()],
});
