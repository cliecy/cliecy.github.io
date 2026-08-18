import { mkdir } from 'node:fs/promises';

import sharp from 'sharp';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="pink" cx="0" cy="0" r="1" gradientTransform="translate(1010 100) rotate(135) scale(610)">
      <stop stop-color="#ff3d8d" stop-opacity=".48"/>
      <stop offset="1" stop-color="#ff3d8d" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="violet" cx="0" cy="0" r="1" gradientTransform="translate(235 590) rotate(-45) scale(560)">
      <stop stop-color="#7c5cff" stop-opacity=".4"/>
      <stop offset="1" stop-color="#7c5cff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0a0a0f"/>
  <rect width="1200" height="630" fill="url(#pink)"/>
  <rect width="1200" height="630" fill="url(#violet)"/>
  <g fill="none" stroke="#f4f1ea" stroke-opacity=".12">
    <path d="M0 92.5h1200M0 537.5h1200"/>
    <path d="M92.5 0v630M1107.5 0v630"/>
  </g>
  <text x="92" y="292" fill="#f4f1ea" font-family="Inter, Arial, sans-serif" font-size="112" font-weight="750" letter-spacing="-5">CLIECY</text>
  <text x="98" y="374" fill="#b9b5c0" font-family="Inter, Arial, sans-serif" font-size="36" letter-spacing="7">DEVELOPER &amp; CREATOR</text>
  <circle cx="1045" cy="489" r="38" fill="#ff3d8d"/>
  <circle cx="1105" cy="489" r="20" fill="#7c5cff"/>
</svg>`;

await mkdir('public/images', { recursive: true });
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/images/og-default.png');
console.log('Generated public/images/og-default.png (1200x630).');
