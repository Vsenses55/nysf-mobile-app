import files from 'virtual:asset-list';
import { asset } from '../data/asset.js';

// Warm the browser cache with every image once the first screen has settled,
// so tapping into any page shows its photos immediately instead of empty frames.
// Order: the side the visitor is on first, the big map file last. Downloads run
// a few at a time and pause while the tab is hidden or the user is on
// "Save Data".
export function preloadAssets(currentPath = '') {
  if (navigator.connection?.saveData) return;

  const side = currentPath.startsWith('/fairgrounds') ? 'fg/' : 'fair/';
  const rank = (f) => {
    if (f.endsWith('map-full.jpg')) return 3; // ~480 KB, last
    if (f.includes('map-full')) return 2;
    return f.startsWith(side) || f.startsWith('shared/') ? 0 : 1;
  };
  const queue = [...files].sort((a, b) => rank(a) - rank(b));

  const loadOne = (f) =>
    new Promise((resolve) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = img.onerror = resolve;
      img.src = asset(f);
    });

  let active = 0;
  const pump = () => {
    if (document.hidden) {
      document.addEventListener('visibilitychange', pump, { once: true });
      return;
    }
    while (active < 4 && queue.length) {
      active += 1;
      loadOne(queue.shift()).then(() => {
        active -= 1;
        pump();
      });
    }
  };

  const start = () => pump();
  if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 2000 });
  else setTimeout(start, 800);
}
