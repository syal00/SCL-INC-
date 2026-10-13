import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outDir = path.join(root, "public", "images");

const stock = [
  {
    file: "hero-home.webp",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80",
  },
  {
    file: "deck.webp",
    url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=2200&q=80",
  },
  {
    file: "timber-screen.webp",
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=80",
  },
  {
    file: "living.webp",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=80",
  },
  {
    file: "kitchen.webp",
    url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=2200&q=80",
  },
  {
    file: "walkway.webp",
    url: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?auto=format&fit=crop&w=2200&q=80",
  },
  {
    file: "porch.webp",
    url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=2200&q=80",
  },
  {
    file: "courtyard.webp",
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2200&q=80",
  },
  {
    file: "lawn.webp",
    url: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=2200",
  },
  {
    file: "plantings.webp",
    url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=2200",
  },
  {
    file: "concrete.webp",
    url: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=2200",
  },
  {
    file: "house-frame.webp",
    url: "https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=2200",
  },
  {
    file: "big-house-frame.webp",
    url: "https://images.pexels.com/photos/39367475/pexels-photo-39367475.jpeg?auto=compress&cs=tinysrgb&w=2200",
  },
  {
    file: "drywall-room.webp",
    url: "https://images.pexels.com/photos/3990359/pexels-photo-3990359.jpeg?auto=compress&cs=tinysrgb&w=2200",
  },
];

const local = [
  ["interlocking.webp", "sample-interlocking-patio.jpg"],
  ["cedar-fence.webp", "sample-cedar-fence.jpg"],
  ["retaining-wall.webp", "sample-retaining-wall.jpg"],
  ["grading.webp", "sample-yard-before.jpg"],
  ["finished-yard.webp", "sample-yard-after.jpg"],
  ["framing.webp", "sample-wood-framing.jpg"],
  ["drywall-mud.webp", "sample-drywall-mud.jpg"],
  ["drywall-hang.webp", "sample-drywall-hang.jpg"],
];

const sourceDir = path.join(root, "brand", "source-photos");

async function toWebp(input, file) {
  let quality = 72;
  let buffer = await sharp(input).rotate().resize(1800, 1200, { fit: "cover", position: "attention" }).webp({ quality }).toBuffer();
  while (buffer.length > 260_000 && quality > 46) {
    quality -= 8;
    buffer = await sharp(input).rotate().resize(1800, 1200, { fit: "cover", position: "attention" }).webp({ quality }).toBuffer();
  }
  await writeFile(path.join(outDir, file), buffer);
  console.log(`${file} ${(buffer.length / 1024).toFixed(0)} KB q${quality}`);
}

async function download(url) {
  const response = await fetch(url, { headers: { "User-Agent": "SandhuSiteImageFetch/1.0" } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

await mkdir(outDir, { recursive: true });

for (const item of stock) {
  const bytes = await download(item.url);
  await toWebp(bytes, item.file);
}

for (const [file, sourceName] of local) {
  const bytes = await readFile(path.join(sourceDir, sourceName));
  await toWebp(bytes, file);
}

console.log("Images written to public/images");
