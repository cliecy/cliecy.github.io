import { mkdir } from 'node:fs/promises';

import sharp from 'sharp';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#111110"/>
  <path d="M96 490H1104" stroke="#2d2c2a"/>
  <path d="M96 162H176" stroke="#d6b8a8" stroke-width="4"/>
  <text x="96" y="322" fill="#efede8" font-family="Inter, Arial, sans-serif" font-size="112" font-weight="720" letter-spacing="-5">CLIECY</text>
  <text x="101" y="397" fill="#aaa7a1" font-family="Inter, Arial, sans-serif" font-size="30" letter-spacing="2">cliecy.github.io</text>
</svg>`;

await mkdir('public/images', { recursive: true });
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/images/og-default.png');
console.log('Generated public/images/og-default.png (1200x630).');
