import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { optimize } from "svgo";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const HERO_DIR = path.resolve(__dirname, "../public/assets/hero");

const VECTOR_FILES = ["mars-ground-2.svg", "galaxy.svg", "purple-planet.svg"];

const RASTER_SVGS = [
  { file: "maskot.svg", quality: 80 },
  { file: "earth.svg", quality: 80 },
];

const SVGO_CONFIG = {
  multipass: true,
  floatPrecision: 3,
  plugins: ["preset-default"],
};

function prettySize(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function pct(before, after) {
  return `${Math.round((1 - after / before) * 100)}%`;
}

async function optimizeVectors() {
  for (const file of VECTOR_FILES) {
    const p = path.join(HERO_DIR, file);
    const input = await readFile(p, "utf8");
    const before = Buffer.byteLength(input);
    const res = optimize(input, SVGO_CONFIG);
    await writeFile(p, res.data);
    const after = Buffer.byteLength(res.data);
    console.log(
      `[svgo] ${file}: ${prettySize(before)} -> ${prettySize(after)} (-${pct(before, after)})`,
    );
  }
}

async function optimizeRasterSvg({ file, quality }) {
  const p = path.join(HERO_DIR, file);
  let svg = await readFile(p, "utf8");
  const before = Buffer.byteLength(svg);

  const hrefRe = /xlink:href="data:image\/(?:png|jpeg|jpg);base64,([^"]+)"/g;
  const matches = [...svg.matchAll(hrefRe)];

  if (matches.length === 0) {
    console.log(`[webp] ${file}: no embedded raster image found, skipped`);
    return;
  }

  let out = "";
  let last = 0;
  for (const m of matches) {
    const input = Buffer.from(m[1], "base64");
    const webp = await sharp(input).webp({ quality }).toBuffer();
    out += svg.slice(last, m.index);
    out += `xlink:href="data:image/webp;base64,${webp.toString("base64")}"`;
    last = m.index + m[0].length;
    console.log(
      `[webp] ${file}: embedded raster ${prettySize(input.length)} -> ${prettySize(webp.length)} (-${pct(input.length, webp.length)})`,
    );
  }
  out += svg.slice(last);

  await writeFile(p, out);
  const after = Buffer.byteLength(out);
  console.log(
    `[webp] ${file}: total ${prettySize(before)} -> ${prettySize(after)} (-${pct(before, after)})`,
  );
}

console.log("Optimizing hero assets...");
await optimizeVectors();
for (const cfg of RASTER_SVGS) {
  await optimizeRasterSvg(cfg);
}
console.log("Done.");
