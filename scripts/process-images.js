// Run: node scripts/process-images.js
// Place your original screenshots in: scripts/originals/
// Output goes to: public/projects/
//
// Expected input filenames:
//   apnikheti.png         — shop.apnikheti.com homepage
//   argyle.png            — Argyle Sales Report summary (charts view)
//   xpt.png               — XPT Brain > Carriers page (state rules table)
//   honey.png             — Honey perpetuals trading page
//   totalexpert.png       — TotalExpert jobs dashboard
//   tricon.png            — Tricon file list dashboard

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const IN = path.join(__dirname, "originals");
const OUT = path.join(__dirname, "..", "public", "projects");

const W = 1400;
const H = 900;

function overlay(rects) {
  const shapes = rects
    .map(
      ([x, y, w, h]) =>
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="rgba(0,0,0,0.88)" rx="3"/>`
    )
    .join("\n");
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${shapes}</svg>`
  );
}

// Subtle dark tint applied to all images for visual consistency with portfolio theme
function tint() {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <rect width="${W}" height="${H}" fill="rgba(0,0,0,0.18)"/>
    </svg>`
  );
}

async function process(inputFile, outputFile, sensitiveRegions = []) {
  const src = path.join(IN, inputFile);
  const dst = path.join(OUT, outputFile);

  if (!fs.existsSync(src)) {
    console.log(`⚠️  Skipping — not found: scripts/originals/${inputFile}`);
    return;
  }

  const composites = [];
  if (sensitiveRegions.length > 0) {
    composites.push({ input: overlay(sensitiveRegions), top: 0, left: 0 });
  }
  composites.push({ input: tint(), top: 0, left: 0 });

  await sharp(src)
    .resize(W, H, { fit: "cover", position: "top" })
    .composite(composites)
    .jpeg({ quality: 88 })
    .toFile(dst);

  console.log(`✅  ${outputFile}`);
}

async function main() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  // ApniKheti — public website, safe as-is. No regions to cover.
  await process("apnikheti.png", "apnikheti.jpg");

  // Argyle — blur the "Argyle" logo in the top-left sidebar (~0-200px wide, 145-200px tall)
  await process("argyle.png", "argyle.jpg", [
    [0, 145, 200, 60], // "Argyle" brand logo
  ]);

  // XPT Brain/Carriers page — clean state-rules table, only cover the username top-right
  await process("xpt.png", "xpt.jpg", [
    [1200, 155, 200, 40], // "Suraj Bhat" top-right username
  ]);

  // Honey perpetuals — public market data, no sensitive info
  await process("honey.png", "honey.jpg");

  // TotalExpert — cover the logo top-left on the dark nav bar
  await process("totalexpert.png", "totalexpert.jpg", [
    [110, 155, 260, 50], // TotalExpert logo in sidebar
  ]);

  // Tricon — cover "Tricon" brand name top-left
  await process("tricon.png", "tricon.jpg", [
    [10, 155, 120, 45], // "Tricon" logo
  ]);

  console.log("\n✨ Done! Images saved to public/projects/");
  console.log("💡 If any blur regions look off, adjust the [x, y, w, h] values in this script.");
}

main().catch(console.error);
