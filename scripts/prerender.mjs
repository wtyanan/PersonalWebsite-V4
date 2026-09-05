/**
 * Bakes the rendered app into dist/index.html so the page paints without
 * waiting for JavaScript. Run by `yarn build` after the client build.
 */
import { execFileSync } from 'node:child_process';
import { readFile, writeFile, rm, readdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SSR_DIR = path.join(root, '.ssr');
const DIST = path.join(root, 'dist');

execFileSync(
  process.execPath,
  [
    path.join(root, 'node_modules/vite/bin/vite.js'),
    'build',
    '--ssr',
    'src/entry-server.tsx',
    '--outDir',
    '.ssr',
    '--logLevel',
    'warn',
  ],
  { cwd: root, stdio: 'inherit' },
);

const { render } = await import(pathToFileURL(path.join(SSR_DIR, 'entry-server.js')));
let html = render();

// The SSR pass emits its own copy of imported assets, so point every asset
// reference at the hashed file the client build actually shipped.
const assets = await readdir(path.join(DIST, 'assets'));
html = html.replace(/(?:\/\.ssr)?\/assets\/([\w-]+?)-[\w-]{8,}(\.\w+)/g, (whole, base, ext) => {
  const match = assets.find((f) => f.startsWith(`${base}-`) && f.endsWith(ext));
  return match ? `/assets/${match}` : whole;
});

const indexPath = path.join(DIST, 'index.html');
const shell = await readFile(indexPath, 'utf8');
const marker = '<div id="root"></div>';
if (!shell.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`);

await writeFile(indexPath, shell.replace(marker, `<div id="root">${html}</div>`));
await rm(SSR_DIR, { recursive: true, force: true });
console.log(`prerendered ${html.length} bytes into dist/index.html`);
