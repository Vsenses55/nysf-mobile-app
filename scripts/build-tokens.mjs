// Generates src/styles/tokens.css from src/ds/tokens.json (the NYSF design system).
// Run: npm run tokens
import { readFileSync, writeFileSync } from 'node:fs';

const t = JSON.parse(readFileSync(new URL('../src/ds/tokens.json', import.meta.url), 'utf8'));
const themes = t.color.themes.map((th) => th.id); // ['fair', 'fairgrounds']
const first = themes[0];

const css = (v) => (typeof v === 'string' ? v.replace(/^\{(.+)\}$/, 'var(--$1)') : String(v));

const lines = ['/* Generated from src/ds/tokens.json by scripts/build-tokens.mjs — do not edit by hand. */', ''];

// Non-colour families are theme-independent.
lines.push(':root {');
for (const [family, group] of Object.entries(t)) {
  if (family === 'color' || family === 'type' || !group || !Array.isArray(group.tokens)) continue;
  for (const tok of group.tokens) lines.push(`  --${tok.name}: ${css(tok.value)};`);
}
for (const [name, stack] of Object.entries(t.type.families)) lines.push(`  --font-${name}: ${stack};`);
lines.push('}', '');

// Colours: one block per theme. A plain value or a missing theme falls back to the first theme.
for (const theme of themes) {
  const sel = theme === first ? `:root, [data-theme="${theme}"]` : `[data-theme="${theme}"]`;
  lines.push(`${sel} {`);
  for (const tok of t.color.tokens) {
    const v = typeof tok.value === 'string' ? tok.value : tok.value[theme] ?? tok.value[first];
    lines.push(`  --${tok.name}: ${css(v)};`);
  }
  lines.push('}', '');
}

writeFileSync(new URL('../src/styles/tokens.css', import.meta.url), lines.join('\n'));
console.log(`tokens.css: ${t.color.tokens.length} colours × ${themes.length} themes`);
