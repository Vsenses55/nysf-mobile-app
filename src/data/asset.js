// Public assets live in /public/assets. BASE_URL is './' (see vite.config.js),
// so these resolve correctly on localhost and on GitHub Pages alike.
export const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`;
