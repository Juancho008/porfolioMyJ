import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a1028"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#glow)"/>
  <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="#7c3aed" stroke-opacity="0.35" stroke-width="1.5"/>
  <text x="32" y="30" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="17" font-weight="600" fill="#ffffff">M</text>
  <text x="32" y="30" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="13" font-style="italic" fill="#c4b5fd" dy="0">&#38;</text>
  <text x="32" y="44" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="17" font-weight="600" fill="#ffffff">J</text>
</svg>`;

const stackedSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#140d1f"/>
      <stop offset="100%" stop-color="#050505"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#bg)"/>
  <rect x="1.25" y="1.25" width="61.5" height="61.5" rx="12.5" fill="none" stroke="#8b5cf6" stroke-opacity="0.45"/>
  <text x="32" y="38" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" font-weight="600" fill="#ffffff" letter-spacing="-1">
    <tspan fill="#ffffff">M</tspan><tspan fill="#c4b5fd" font-style="italic" font-size="16" dy="-1">&#38;</tspan><tspan fill="#ffffff" dy="1">J</tspan>
  </text>
</svg>`;

async function generate() {
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((size) =>
      sharp(Buffer.from(stackedSvg)).resize(size, size).png().toBuffer()
    )
  );

  const ico = await toIco(pngBuffers);
  const appPath = path.join(root, "src", "app", "favicon.ico");
  const publicPath = path.join(root, "public", "favicon.ico");

  fs.writeFileSync(appPath, ico);
  fs.writeFileSync(publicPath, ico);
  console.log("Favicon generated:", appPath, publicPath);
}

generate().catch((error) => {
  console.error(error);
  process.exit(1);
});
