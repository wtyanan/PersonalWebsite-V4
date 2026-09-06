/**
 * Regenerates the two derived images:
 *   - src/assets/portrait.jpg  (downscaled from the original in assets/)
 *   - public/og.png            (1200x630 social card)
 *
 * Run with `yarn images` after changing the source portrait or the tagline.
 */
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_PORTRAIT = path.join(root, 'assets/portrait-original.jpg');
const PORTRAIT = path.join(root, 'src/assets/portrait.jpg');
const OG = path.join(root, 'public/og.png');

const NAME = 'Terry Wang';
const TAGLINE = 'Software Engineer @ Cresta  |  Ex-Google  |  UWaterloo';
const SITE = 'tianyu.wang';

// Geist is not installed system-wide; Segoe UI is the closest grotesque that is.
const FONT = "'Segoe UI', Geist, Helvetica, Arial, sans-serif";

/** The portrait renders at 122px, so 400px covers 3x displays. */
async function portrait() {
  await sharp(SOURCE_PORTRAIT)
    .resize(400, 400, { fit: 'cover', kernel: 'lanczos3' })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(PORTRAIT);
}

async function ogCard() {
  const W = 1200;
  const H = 630;
  const AVATAR = 260;
  const CX = 210;
  const CY = H / 2;
  const TEXT_X = 400;

  const background = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <radialGradient id="glowA" cx="50%" cy="0%" r="75%">
          <stop offset="0%" stop-color="#687cdc" stop-opacity="0.30"/>
          <stop offset="100%" stop-color="#687cdc" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="glowB" cx="88%" cy="8%" r="55%">
          <stop offset="0%" stop-color="#9678d2" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#9678d2" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="#08090a"/>
      <rect width="${W}" height="${H}" fill="url(#glowA)"/>
      <rect width="${W}" height="${H}" fill="url(#glowB)"/>
    </svg>`);

  const foreground = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <circle cx="${CX}" cy="${CY}" r="${AVATAR / 2 + 1}" fill="none"
              stroke="#ffffff" stroke-opacity="0.28" stroke-width="2"/>
      <circle cx="${CX}" cy="${CY}" r="${AVATAR / 2 + 15}" fill="none"
              stroke="#ffffff" stroke-opacity="0.07" stroke-width="1"/>
      <text x="${TEXT_X}" y="308" font-family="${FONT}" font-size="90" font-weight="600"
            letter-spacing="-3" fill="#f4f4f5">${NAME}</text>
      <text x="${TEXT_X}" y="366" font-family="${FONT}" font-size="30" font-weight="400"
            fill="#a1a1a6">${TAGLINE}</text>
      <rect x="${TEXT_X}" y="410" width="64" height="2" fill="#ffffff" fill-opacity="0.22"/>
      <text x="${TEXT_X}" y="466" font-family="${FONT}" font-size="26" font-weight="500"
            letter-spacing="3" fill="#7a7b80">${SITE}</text>
    </svg>`);

  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${AVATAR}" height="${AVATAR}">
       <circle cx="${AVATAR / 2}" cy="${AVATAR / 2}" r="${AVATAR / 2}" fill="#fff"/>
     </svg>`,
  );

  const avatar = await sharp(SOURCE_PORTRAIT)
    .resize(AVATAR, AVATAR, { fit: 'cover', kernel: 'lanczos3' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  await sharp(background)
    .composite([
      { input: avatar, left: CX - AVATAR / 2, top: CY - AVATAR / 2 },
      { input: foreground, left: 0, top: 0 },
    ])
    .png({ compressionLevel: 9, palette: true })
    .toFile(OG);
}

await mkdir(path.dirname(OG), { recursive: true });
await portrait();
await ogCard();
console.log('wrote', path.relative(root, PORTRAIT), 'and', path.relative(root, OG));
