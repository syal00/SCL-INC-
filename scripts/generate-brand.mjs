// Builds every brand asset from the Gable mark:
// logo SVG/PNG files, site icons, the social share image, and the
// PDF and Word letterheads. Run with `npm run brand`.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import sharp from "sharp";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb } from "pdf-lib";
import {
  AlignmentType,
  BorderStyle,
  Document,
  Header,
  Footer,
  ImageRun,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
  convertInchesToTwip,
} from "docx";

const require = createRequire(import.meta.url);
const opentype = require("opentype.js");

const root = process.cwd();
const logoDir = path.join(root, "brand", "logo");
const pngDir = path.join(logoDir, "png");
const letterDir = path.join(root, "brand", "letterhead");
const fontDir = path.join(root, "brand", "fonts");
const publicBrand = path.join(root, "public", "brand");
const appDir = path.join(root, "src", "app");

// Brand colours (see brand/BRAND-GUIDE.md)
const charcoal = "#1C211E";
const amber = "#D97A1E";
const amberDeep = "#A9560B";
const amberBright = "#E8913A";
const white = "#FFFFFF";
const light = "#F4F3EF";
const grey = "#F2F2EF";
const muted = "#5C615C";

const fontSources = {
  "Outfit.ttf": [
    "https://github.com/google/fonts/raw/main/ofl/outfit/Outfit%5Bwght%5D.ttf",
    "https://raw.githubusercontent.com/google/fonts/main/ofl/outfit/Outfit%5Bwght%5D.ttf",
  ],
  // Static instances for the outlined wordmark (variable outlines do not convert cleanly).
  "Fraunces-Medium.ttf": [{ css: "Fraunces:opsz,wght@72,500" }],
  "Outfit-SemiBold.ttf": [{ css: "Outfit:wght@600" }],
};

// Google Fonts serves a plain TrueType link to older browsers; ask for that.
async function resolveSource(source) {
  if (typeof source === "string") return source;
  const response = await fetch(`https://fonts.googleapis.com/css2?family=${source.css}`, {
    headers: { "User-Agent": "Mozilla/4.0" },
  });
  if (!response.ok) return null;
  const match = /url\((https:[^)]+\.ttf)\)/.exec(await response.text());
  return match ? match[1] : null;
}

async function ensureFont(name) {
  const file = path.join(fontDir, name);
  try {
    const existing = await readFile(file);
    if (existing.length > 10000) return existing;
  } catch {
    // Download below.
  }
  for (const source of fontSources[name]) {
    const url = await resolveSource(source);
    if (!url) continue;
    const response = await fetch(url);
    if (!response.ok) continue;
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 10000) continue;
    await mkdir(fontDir, { recursive: true });
    await writeFile(file, bytes);
    return bytes;
  }
  throw new Error(`Could not download ${name}.`);
}

function loadFont(bytes) {
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  return opentype.parse(buffer);
}

function textRun(font, text, size, letterSpacing) {
  const commands = [];
  let x = 0;
  const scale = size / font.unitsPerEm;
  for (const char of text) {
    const glyph = font.charToGlyph(char);
    commands.push(glyph.getPath(x, 0, size).toPathData(2));
    x += (glyph.advanceWidth || 0) * scale + letterSpacing * size;
  }
  return { d: commands.join(" "), width: Math.max(0, x - letterSpacing * size) };
}

function svgDoc(width, height, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width.toFixed(2)} ${height.toFixed(2)}" fill="none" role="img" aria-label="Sandhu Construction and Landscape">${body}</svg>\n`;
}

function innerSvg(svg) {
  return svg.replace(/^[\s\S]*?<svg[^>]*>/i, "").replace(/<\/svg>\s*$/i, "");
}

async function png(svg, file, height) {
  const image = sharp(Buffer.from(svg));
  const meta = await image.metadata();
  const ratio = (meta.width || 1) / (meta.height || 1);
  await image.resize(Math.round(height * ratio), height).png().toFile(file);
}

/** The Gable mark on a 64×64 grid: roof, a small amber house (door cut in the paper colour), three pavers. */
function markShapes({ ink, accent, paper }) {
  return `
  <path d="M7 34 L32 12 L57 34" fill="none" stroke="${ink}" stroke-width="6" stroke-linejoin="miter" stroke-linecap="square"/>
  <path d="M32 21 L42.5 30.5 V46 H21.5 V30.5 Z" fill="${accent}"/>
  <rect x="29.25" y="37" width="5.5" height="9" fill="${paper}"/>
  <rect x="7" y="48" width="15.3" height="7" fill="${ink}"/>
  <rect x="24.35" y="48" width="15.3" height="7" fill="${ink}"/>
  <rect x="41.7" y="48" width="15.3" height="7" fill="${ink}"/>`;
}

const iconSvg = (colors) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="4 6 56 52" fill="none" role="img" aria-label="Sandhu Construction and Landscape">${markShapes(colors)}\n</svg>\n`;

const palettes = {
  color: { ink: charcoal, accent: amber, paper: white, name: charcoal, rule: amber, sub: charcoal },
  mono: { ink: charcoal, accent: charcoal, paper: white, name: charcoal, rule: charcoal, sub: charcoal },
  reversed: { ink: light, accent: amberBright, paper: charcoal, name: light, rule: amberBright, sub: light },
};

// The mark sits in the 4..60 × 6..58 part of its 64 grid; this places it in a lockup.
function placedMark(colors, x, y, size) {
  const scale = size / 52;
  return `<g transform="translate(${(x - 4 * scale).toFixed(2)} ${(y - 6 * scale).toFixed(2)}) scale(${scale.toFixed(4)})">${markShapes(colors)}</g>`;
}

function lockups(fonts, colors) {
  const name = textRun(fonts.serif, "SANDHU", 50, 0.08);
  const sub = textRun(fonts.sans, "CONSTRUCTION  &  LANDSCAPE  INC.", 12.5, 0.2);
  const textWidth = Math.max(name.width, sub.width);
  const icon = 96;
  const gap = 26;

  // Horizontal: mark left, name / rule / sub stacked right.
  const hWidth = icon + gap + textWidth + 6;
  const hHeight = icon;
  const nameBase = 50;
  const ruleY = 62;
  const subBase = 86;
  const tx = icon + gap;
  const horizontal = svgDoc(
    hWidth,
    hHeight,
    `${placedMark(colors, 0, 0, icon)}
     <path fill="${colors.name}" d="${name.d}" transform="translate(${tx} ${nameBase})"/>
     <rect x="${tx}" y="${ruleY}" width="${textWidth.toFixed(2)}" height="2.4" fill="${colors.rule}"/>
     <path fill="${colors.sub}" stroke="${colors.sub}" stroke-width="0.35" stroke-linejoin="round" d="${sub.d}" transform="translate(${tx} ${subBase})"/>`,
  );

  // Stacked: mark centred above the wordmark.
  const sWidth = Math.max(icon * 1.3, textWidth) + 24;
  const sIcon = icon * 1.3;
  const sHeight = sIcon + 22 + 50 + 16 + 22;
  const cx = (w) => ((sWidth - w) / 2).toFixed(2);
  const stacked = svgDoc(
    sWidth,
    sHeight,
    `${placedMark(colors, (sWidth - sIcon) / 2, 0, sIcon)}
     <path fill="${colors.name}" d="${name.d}" transform="translate(${cx(name.width)} ${sIcon + 22 + 42})"/>
     <rect x="${cx(textWidth)}" y="${sIcon + 22 + 52}" width="${textWidth.toFixed(2)}" height="2.4" fill="${colors.rule}"/>
     <path fill="${colors.sub}" stroke="${colors.sub}" stroke-width="0.35" stroke-linejoin="round" d="${sub.d}" transform="translate(${cx(sub.width)} ${sIcon + 22 + 76})"/>`,
  );

  return { horizontal, stacked, width: hWidth, height: hHeight };
}

const pages = {
  letter: { width: 612, height: 792, label: "US-Letter" },
  a4: { width: 595.28, height: 841.89, label: "A4" },
};

const hex = (value) => {
  const n = Number.parseInt(value.slice(1), 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

function drawLetterhead(page, fonts, logo, size) {
  const { width, height } = size;
  const charcoalRgb = hex(charcoal);
  const amberRgb = hex(amber);
  const whiteRgb = hex(white);
  const mutedRgb = hex(muted);

  page.drawRectangle({ x: 0, y: height - 16, width, height: 16, color: charcoalRgb });
  page.drawRectangle({ x: 0, y: height - 20, width, height: 4, color: amberRgb });

  const logoHeight = 52;
  const logoWidth = logo.width * (logoHeight / logo.height);
  page.drawImage(logo.image, { x: 42, y: height - 100, width: logoWidth, height: logoHeight });

  const contact = ["[Street address]", "[City, region]  [Postal code]", "[Phone number]", "[Email address]", "[Website]"];
  contact.forEach((line, index) => {
    const textWidth = fonts.regular.widthOfTextAtSize(line, 9);
    page.drawText(line, { x: width - 42 - textWidth, y: height - 54 - index * 13, size: 9, font: fonts.regular, color: mutedRgb });
  });

  page.drawRectangle({ x: 42, y: height - 128, width: width - 84, height: 1, color: hex("#D9D9D4") });

  const body = [
    ["[Date]", 12, charcoalRgb, fonts.regular],
    ["", 12, charcoalRgb, fonts.regular],
    ["[Recipient name]", 12, charcoalRgb, fonts.medium],
    ["[Recipient company]", 12, charcoalRgb, fonts.regular],
    ["[Street address]", 12, charcoalRgb, fonts.regular],
    ["[City, region]  [Postal code]", 12, charcoalRgb, fonts.regular],
    ["", 10, charcoalRgb, fonts.regular],
    ["Dear [Recipient name],", 12, charcoalRgb, fonts.regular],
    ["", 8, charcoalRgb, fonts.regular],
    ["[Replace this paragraph with the letter. Keep the tone plain and specific: what the visit is for, what is included, and what you need from the reader.]", 12, mutedRgb, fonts.regular],
    ["", 16, charcoalRgb, fonts.regular],
    ["Sincerely,", 12, charcoalRgb, fonts.regular],
    ["", 22, charcoalRgb, fonts.regular],
    ["[Your name]", 12, charcoalRgb, fonts.medium],
    ["[Your title]", 11, mutedRgb, fonts.regular],
    ["Sandhu Construction and Landscape Inc.", 11, hex(amberDeep), fonts.regular],
  ];

  let y = height - 168;
  for (const [line, sizePx, color, font] of body) {
    if (line) {
      const words = line.split(" ");
      let current = "";
      const max = width - 84;
      for (const word of words) {
        const trial = current ? `${current} ${word}` : word;
        if (font.widthOfTextAtSize(trial, sizePx) > max) {
          page.drawText(current, { x: 42, y, size: sizePx, font, color });
          y -= sizePx + 5;
          current = word;
        } else {
          current = trial;
        }
      }
      if (current) page.drawText(current, { x: 42, y, size: sizePx, font, color });
    }
    y -= line ? sizePx + 6 : 8;
  }

  page.drawRectangle({ x: 0, y: 0, width, height: 34, color: charcoalRgb });
  page.drawRectangle({ x: 0, y: 34, width, height: 3, color: amberRgb });
  page.drawText("Sandhu Construction and Landscape Inc.", { x: 42, y: 13, size: 9, font: fonts.medium, color: whiteRgb });
  const footerRight = "[Phone]   [Email]   [Website]";
  const footerWidth = fonts.regular.widthOfTextAtSize(footerRight, 9);
  page.drawText(footerRight, { x: width - 42 - footerWidth, y: 13, size: 9, font: fonts.regular, color: whiteRgb });
}

function noBorder() {
  const edge = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  return { top: edge, bottom: edge, left: edge, right: edge };
}

function wordDocument(logoBuffer, logoWidth, logoHeight, pageSize) {
  const none = noBorder();
  const width = convertInchesToTwip(pageSize === "a4" ? 8.27 : 8.5);
  const bar = new Table({
    width: { size: width, type: WidthType.DXA },
    rows: [
      new TableRow({
        height: { value: 230, rule: "exact" },
        children: [
          new TableCell({
            borders: none,
            width: { size: width, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: charcoal.slice(1) },
            children: [new Paragraph("")],
          }),
        ],
      }),
      new TableRow({
        height: { value: 70, rule: "exact" },
        children: [
          new TableCell({
            borders: none,
            width: { size: width, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: amber.slice(1) },
            children: [new Paragraph("")],
          }),
        ],
      }),
    ],
  });

  const identity = new Table({
    width: { size: 9360, type: WidthType.DXA },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: none,
            width: { size: 5200, type: WidthType.DXA },
            verticalAlign: VerticalAlign.CENTER,
            children: [
              new Paragraph({
                children: [new ImageRun({ type: "png", data: logoBuffer, transformation: { width: logoWidth, height: logoHeight } })],
              }),
            ],
          }),
          new TableCell({
            borders: none,
            width: { size: 4160, type: WidthType.DXA },
            children: ["[Street address]", "[City, region]  [Postal code]", "[Phone number]", "[Email address]", "[Website]"].map(
              (line) =>
                new Paragraph({
                  alignment: AlignmentType.RIGHT,
                  spacing: { after: 40 },
                  children: [new TextRun({ text: line, font: "Arial", size: 18, color: muted.slice(1) })],
                }),
            ),
          }),
        ],
      }),
    ],
  });

  const bodyLines = [
    ["[Date]", false],
    ["", false],
    ["[Recipient name]", true],
    ["[Recipient company]", false],
    ["[Street address]", false],
    ["[City, region]  [Postal code]", false],
    ["", false],
    ["Dear [Recipient name],", false],
    ["", false],
    ["[Replace this paragraph with the letter. Keep the tone plain and specific: what the visit is for, what is included, and what you need from the reader.]", false],
    ["", false],
    ["Sincerely,", false],
    ["", false],
    ["", false],
    ["[Your name]", true],
    ["[Your title]", false],
    ["Sandhu Construction and Landscape Inc.", false],
  ];

  return new Document({
    styles: { default: { document: { styles: [{ id: "Normal", run: { font: "Arial", size: 22 } }] } } },
    sections: [
      {
        properties: {
          page: {
            size: {
              width: convertInchesToTwip(pageSize === "a4" ? 8.27 : 8.5),
              height: convertInchesToTwip(pageSize === "a4" ? 11.69 : 11),
            },
            margin: {
              top: convertInchesToTwip(0.55),
              bottom: convertInchesToTwip(0.85),
              left: convertInchesToTwip(0.8),
              right: convertInchesToTwip(0.8),
              header: convertInchesToTwip(0.3),
              footer: convertInchesToTwip(0.3),
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              bar,
              new Paragraph({ spacing: { before: 160, after: 80 }, children: [] }),
              identity,
              new Paragraph({
                border: { bottom: { color: "D9D9D4", space: 1, style: BorderStyle.SINGLE, size: 6 } },
                spacing: { before: 80, after: 200 },
                children: [],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                border: { top: { color: amber.slice(1), space: 1, style: BorderStyle.SINGLE, size: 12 } },
                shading: { type: ShadingType.CLEAR, fill: charcoal.slice(1) },
                spacing: { before: 80 },
                children: [
                  new TextRun({ text: "Sandhu Construction and Landscape Inc.", font: "Arial", size: 16, color: "FFFFFF", bold: true }),
                  new TextRun({ text: "      [Phone]   [Email]   [Website]", font: "Arial", size: 16, color: "FFFFFF" }),
                ],
              }),
            ],
          }),
        },
        children: bodyLines.map(
          ([text, strong]) =>
            new Paragraph({
              spacing: { after: text ? 80 : 120 },
              children: text
                ? [new TextRun({ text, font: "Arial", size: 22, bold: strong, color: strong ? charcoal.slice(1) : muted.slice(1) })]
                : [],
            }),
        ),
      },
    ],
  });
}

// ---------------------------------------------------------------------------

await mkdir(pngDir, { recursive: true });
await mkdir(letterDir, { recursive: true });
await mkdir(publicBrand, { recursive: true });

const sansBytes = await ensureFont("Outfit.ttf"); // embedded in the PDF letterhead
const fonts = {
  sans: loadFont(await ensureFont("Outfit-SemiBold.ttf")),
  serif: loadFont(await ensureFont("Fraunces-Medium.ttf")),
};

const color = lockups(fonts, palettes.color);
const mono = lockups(fonts, palettes.mono);
const reversed = lockups(fonts, palettes.reversed);

const files = {
  "scl-icon.svg": iconSvg(palettes.color),
  "scl-icon-mono.svg": iconSvg(palettes.mono),
  "scl-icon-reversed.svg": iconSvg(palettes.reversed),
  "scl-logo-horizontal.svg": color.horizontal,
  "scl-logo-primary.svg": color.stacked,
  "scl-logo-mono.svg": mono.horizontal,
  "scl-logo-reversed.svg": reversed.horizontal,
};

for (const [name, svg] of Object.entries(files)) {
  await writeFile(path.join(logoDir, name), svg);
  await writeFile(path.join(publicBrand, name), svg);
}

await png(files["scl-icon.svg"], path.join(pngDir, "scl-icon-1024.png"), 1024);
await png(files["scl-icon.svg"], path.join(pngDir, "scl-icon-512.png"), 512);
await png(files["scl-icon.svg"], path.join(pngDir, "scl-icon-256.png"), 256);
await png(files["scl-icon-mono.svg"], path.join(pngDir, "scl-icon-mono-512.png"), 512);
await png(files["scl-icon-reversed.svg"], path.join(pngDir, "scl-icon-reversed-512.png"), 512);
await png(files["scl-logo-horizontal.svg"], path.join(pngDir, "scl-logo-horizontal.png"), 240);
await png(files["scl-logo-primary.svg"], path.join(pngDir, "scl-logo-primary.png"), 640);
await png(files["scl-logo-mono.svg"], path.join(pngDir, "scl-logo-mono.png"), 240);
await png(files["scl-logo-reversed.svg"], path.join(pngDir, "scl-logo-reversed.png"), 240);

// Site icons: the mark on a white tile, so it shows on light and dark browser tabs.
const tile = (radius) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="${radius}" fill="${white}"/><g transform="translate(5.2 4.6) scale(0.84)">${markShapes(palettes.color)}</g></svg>\n`;
await writeFile(path.join(appDir, "icon.svg"), tile(14));
await sharp(Buffer.from(tile(14))).resize(512, 512).png().toFile(path.join(appDir, "icon.png"));
await sharp(Buffer.from(tile(0))).resize(180, 180).png().toFile(path.join(appDir, "apple-icon.png"));
await sharp(Buffer.from(tile(14))).resize(512, 512).png().toFile(path.join(pngDir, "favicon-512.png"));
await sharp(Buffer.from(tile(14))).resize(32, 32).png().toFile(path.join(pngDir, "favicon-32.png"));

// Social share image (1200×630): white, charcoal edge with an amber line, logo centred.
const ogScale = 660 / color.width;
const ogX = ((1200 - color.width * ogScale) / 2 + 12).toFixed(1);
const ogY = ((630 - color.height * ogScale) / 2 - 20).toFixed(1);
const tagline = textRun(fonts.sans, "Residential and commercial construction  ·  Ottawa, Ontario", 22, 0.02);
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${white}"/>
  <rect width="1200" height="630" fill="${grey}" opacity="0.55"/>
  <rect width="22" height="630" fill="${charcoal}"/>
  <rect x="22" width="6" height="630" fill="${amber}"/>
  <g transform="translate(${ogX} ${ogY}) scale(${ogScale.toFixed(4)})">${innerSvg(color.horizontal)}</g>
  <path fill="${muted}" d="${tagline.d}" transform="translate(${((1200 - tagline.width) / 2 + 12).toFixed(1)} ${(Number(ogY) + color.height * ogScale + 70).toFixed(1)})"/>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(path.join(appDir, "opengraph-image.png"));

// Letterheads (PDF + Word), US Letter and A4.
const horizontalPng = await sharp(Buffer.from(files["scl-logo-horizontal.svg"])).resize({ height: 240 }).png().toBuffer();
const horizontalMeta = await sharp(horizontalPng).metadata();
const logoHeightPx = 54;
const logoWidthPx = Math.round(logoHeightPx * ((horizontalMeta.width || 1) / (horizontalMeta.height || 1)));

for (const size of Object.values(pages)) {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  let regular;
  let medium;
  try {
    regular = await doc.embedFont(sansBytes, { subset: true });
    medium = regular;
  } catch {
    const { StandardFonts } = await import("pdf-lib");
    regular = await doc.embedFont(StandardFonts.Helvetica);
    medium = await doc.embedFont(StandardFonts.HelveticaBold);
  }
  const pageLogo = await doc.embedPng(horizontalPng);
  const page = doc.addPage([size.width, size.height]);
  drawLetterhead(page, { regular, medium }, { image: pageLogo, width: pageLogo.width, height: pageLogo.height }, size);
  await writeFile(path.join(letterDir, `Sandhu-Letterhead-${size.label}.pdf`), await doc.save());
}

for (const [key, label] of [["letter", "US-Letter"], ["a4", "A4"]]) {
  const document = wordDocument(horizontalPng, logoWidthPx, logoHeightPx, key);
  await writeFile(path.join(letterDir, `Sandhu-Letterhead-${label}.docx`), await Packer.toBuffer(document));
}

console.log("Brand assets written.");
