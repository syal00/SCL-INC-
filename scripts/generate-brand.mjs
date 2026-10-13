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
const publicBrand = path.join(root, "public", "brand");
const fontPath = path.join(root, "brand", "fonts", "Outfit.ttf");

const forest = "#1B4332";
const charcoal = "#1C211E";
const gold = "#A6844E";
const ivory = "#F4F1EA";
const goldBright = "#C6A36A";

async function ensureFont() {
  try {
    const existing = await readFile(fontPath);
    if (existing.length > 10000) return existing;
  } catch {
    // Download below.
  }
  const urls = [
    "https://github.com/google/fonts/raw/main/ofl/outfit/Outfit%5Bwght%5D.ttf",
    "https://raw.githubusercontent.com/google/fonts/main/ofl/outfit/Outfit%5Bwght%5D.ttf",
  ];
  for (const url of urls) {
    const response = await fetch(url);
    if (!response.ok) continue;
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 10000) continue;
    await mkdir(path.dirname(fontPath), { recursive: true });
    await writeFile(fontPath, bytes);
    return bytes;
  }
  throw new Error("Could not download the Outfit font.");
}

function loadFont(bytes) {
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  return opentype.parse(buffer);
}

function innerSvg(svg) {
  return svg.replace(/^[\s\S]*?<svg[^>]*>/i, "").replace(/<\/svg>\s*$/i, "");
}

function recolor(svg, pairs) {
  return pairs.reduce((current, [from, to]) => current.replaceAll(from, to), svg);
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
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width.toFixed(2)} ${height.toFixed(2)}" fill="none" role="img" aria-label="Sandhu Construction and Landscaping">${body}</svg>\n`;
}

async function png(svg, file, height) {
  const image = sharp(Buffer.from(svg));
  const meta = await image.metadata();
  const ratio = (meta.width || 1) / (meta.height || 1);
  await image.resize(Math.round(height * ratio), height).png().toFile(file);
}

function lockups(font, iconInner, colors) {
  const name = textRun(font, "SANDHU", 46, 0.16);
  const sub = textRun(font, "CONSTRUCTION  &  LANDSCAPING", 13, 0.14);
  const icon = 104;
  const scale = icon / 64;
  const gap = 24;
  const textWidth = Math.max(name.width, sub.width);
  const horizontalWidth = icon + gap + textWidth + 18;
  const horizontalHeight = icon;
  const nameY = 46;
  const subY = 78;
  const horizontal = svgDoc(
    horizontalWidth,
    horizontalHeight,
    `<g transform="scale(${scale})">${iconInner}</g>
     <path fill="${colors.name}" stroke="${colors.name}" stroke-width="1.8" stroke-linejoin="round" d="${name.d}" transform="translate(${icon + gap} ${nameY})"/>
     <path fill="${colors.sub}" stroke="${colors.sub}" stroke-width="0.55" stroke-linejoin="round" d="${sub.d}" transform="translate(${icon + gap} ${subY})"/>`,
  );

  const stackWidth = Math.max(icon, textWidth) + 24;
  const iconX = (stackWidth - icon) / 2;
  const nameX = (stackWidth - name.width) / 2;
  const subX = (stackWidth - sub.width) / 2;
  const stackHeight = icon + 28 + 70;
  const stacked = svgDoc(
    stackWidth,
    stackHeight,
    `<g transform="translate(${iconX} 0) scale(${scale})">${iconInner}</g>
     <path fill="${colors.name}" stroke="${colors.name}" stroke-width="1.8" stroke-linejoin="round" d="${name.d}" transform="translate(${nameX} ${icon + 52})"/>
     <path fill="${colors.sub}" stroke="${colors.sub}" stroke-width="0.55" stroke-linejoin="round" d="${sub.d}" transform="translate(${subX} ${icon + 84})"/>`,
  );

  return { horizontal, stacked, name, sub };
}

const pages = {
  letter: { width: 612, height: 792, label: "US-Letter" },
  a4: { width: 595.28, height: 841.89, label: "A4" },
};

function drawLetterhead(page, fonts, logo, size) {
  const { width, height } = size;
  const forestRgb = rgb(27 / 255, 67 / 255, 50 / 255);
  const charcoalRgb = rgb(28 / 255, 33 / 255, 30 / 255);
  const goldRgb = rgb(166 / 255, 132 / 255, 78 / 255);
  const ivoryRgb = rgb(244 / 255, 241 / 255, 234 / 255);
  const mutedRgb = rgb(62 / 255, 71 / 255, 66 / 255);

  page.drawRectangle({ x: 0, y: height - 20, width, height: 20, color: forestRgb });
  page.drawRectangle({ x: 0, y: height - 24, width, height: 4, color: goldRgb });

  const logoHeight = 58;
  const logoWidth = logo.width * (logoHeight / logo.height);
  page.drawImage(logo.image, { x: 42, y: height - 108, width: logoWidth, height: logoHeight });

  const contact = ["[Street address]", "[City, region]  [Postal code]", "[Phone number]", "[Email address]", "[Website]"];
  contact.forEach((line, index) => {
    const textWidth = fonts.regular.widthOfTextAtSize(line, 9);
    page.drawText(line, {
      x: width - 42 - textWidth,
      y: height - 58 - index * 13,
      size: 9,
      font: fonts.regular,
      color: mutedRgb,
    });
  });

  page.drawRectangle({ x: 42, y: height - 128, width: width - 84, height: 1.5, color: goldRgb });

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
    ["Sandhu Construction and Landscaping Inc.", 11, forestRgb, fonts.regular],
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

  page.drawRectangle({ x: 0, y: 0, width, height: 34, color: forestRgb });
  page.drawRectangle({ x: 0, y: 34, width, height: 3, color: goldRgb });
  page.drawText("Sandhu Construction and Landscaping Inc.", {
    x: 42,
    y: 13,
    size: 9,
    font: fonts.medium,
    color: ivoryRgb,
  });
  const footerRight = "[Phone]   [Email]   [Website]";
  const footerWidth = fonts.regular.widthOfTextAtSize(footerRight, 9);
  page.drawText(footerRight, {
    x: width - 42 - footerWidth,
    y: 13,
    size: 9,
    font: fonts.regular,
    color: ivoryRgb,
  });
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
        height: { value: 280, rule: "exact" },
        children: [
          new TableCell({
            borders: none,
            width: { size: width, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: "1B4332" },
            children: [new Paragraph("")],
          }),
        ],
      }),
      new TableRow({
        height: { value: 80, rule: "exact" },
        children: [
          new TableCell({
            borders: none,
            width: { size: width, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: "A6844E" },
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
                children: [
                  new ImageRun({
                    type: "png",
                    data: logoBuffer,
                    transformation: { width: logoWidth, height: logoHeight },
                  }),
                ],
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
                  children: [new TextRun({ text: line, font: "Arial", size: 18, color: "3E4742" })],
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
    ["Sandhu Construction and Landscaping Inc.", false],
  ];

  return new Document({
    styles: {
      default: {
        document: { styles: [{ id: "Normal", run: { font: "Arial", size: 22 } }] },
      },
    },
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
                border: { bottom: { color: "A6844E", space: 1, style: BorderStyle.SINGLE, size: 12 } },
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
                border: { top: { color: "A6844E", space: 1, style: BorderStyle.SINGLE, size: 12 } },
                shading: { type: ShadingType.CLEAR, fill: "1B4332" },
                spacing: { before: 80 },
                children: [
                  new TextRun({ text: "Sandhu Construction and Landscaping Inc.", font: "Arial", size: 16, color: "F4F1EA", bold: true }),
                  new TextRun({ text: "      [Phone]   [Email]   [Website]", font: "Arial", size: 16, color: "F4F1EA" }),
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
                ? [new TextRun({ text, font: "Arial", size: 22, bold: strong, color: strong ? "1C211E" : "3E4742" })]
                : [],
            }),
        ),
      },
    ],
  });
}

await mkdir(pngDir, { recursive: true });
await mkdir(letterDir, { recursive: true });
await mkdir(publicBrand, { recursive: true });
await mkdir(path.join(root, "src", "app"), { recursive: true });

const fontBytes = await ensureFont();
const font = loadFont(fontBytes);
const sourceIcon = await readFile(path.join(logoDir, "scl-icon.svg"), "utf8");
const iconInner = innerSvg(sourceIcon);
const monoInner = innerSvg(recolor(sourceIcon, [[forest, charcoal], ["#245C45", charcoal], [gold, charcoal]]));
const reversedInner = innerSvg(
  recolor(sourceIcon, [
    [charcoal, ivory],
    [forest, ivory],
    ["#245C45", ivory],
    [gold, goldBright],
  ]),
);

const colorLockup = lockups(font, iconInner, { name: charcoal, sub: forest });
const monoLockup = lockups(font, monoInner, { name: charcoal, sub: charcoal });
const reversedLockup = lockups(font, reversedInner, { name: ivory, sub: ivory });

const files = {
  "scl-icon.svg": sourceIcon,
  "scl-icon-mono.svg": recolor(sourceIcon, [[forest, charcoal], ["#245C45", charcoal], [gold, charcoal]]),
  "scl-icon-reversed.svg": recolor(sourceIcon, [[charcoal, ivory], [forest, ivory], ["#245C45", ivory], [gold, goldBright]]),
  "scl-logo-horizontal.svg": colorLockup.horizontal,
  "scl-logo-primary.svg": colorLockup.stacked,
  "scl-logo-mono.svg": monoLockup.horizontal,
  "scl-logo-reversed.svg": reversedLockup.horizontal,
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

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="${forest}"/><g transform="translate(8 8) scale(0.75)">${reversedInner}</g></svg>`;
await png(faviconSvg, path.join(root, "src", "app", "apple-icon.png"), 180);
await sharp(Buffer.from(faviconSvg)).resize(512, 512).png().toFile(path.join(pngDir, "favicon-512.png"));
await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile(path.join(pngDir, "favicon-32.png"));

const horizontalMeta = await sharp(path.join(pngDir, "scl-logo-horizontal.png")).metadata();
const logoHeightPx = 58;
const logoWidthPx = Math.round(logoHeightPx * ((horizontalMeta.width || 1) / (horizontalMeta.height || 1)));
const viewBox = /viewBox="0 0 ([0-9.]+) ([0-9.]+)"/.exec(colorLockup.horizontal);
const lockupWidth = Number(viewBox?.[1] ?? 392);
const lockupHeight = Number(viewBox?.[2] ?? 104);
const ogScale = 620 / lockupWidth;
const ogX = ((1200 - lockupWidth * ogScale) / 2).toFixed(1);
const ogY = ((630 - lockupHeight * ogScale) / 2).toFixed(1);
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${ivory}"/>
  <rect width="18" height="630" fill="${forest}"/>
  <rect x="18" width="6" height="630" fill="${gold}"/>
  <g transform="translate(${ogX} ${ogY}) scale(${ogScale})">${innerSvg(colorLockup.horizontal)}</g>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(path.join(root, "src", "app", "opengraph-image.png"));

const horizontalPng = await readFile(path.join(pngDir, "scl-logo-horizontal.png"));
const pdf = await PDFDocument.create();
pdf.registerFontkit(fontkit);
let regular;
let medium;
try {
  regular = await pdf.embedFont(fontBytes, { subset: true });
  medium = regular;
} catch {
  const { StandardFonts } = await import("pdf-lib");
  regular = await pdf.embedFont(StandardFonts.Helvetica);
  medium = await pdf.embedFont(StandardFonts.HelveticaBold);
}
const embeddedLogo = await pdf.embedPng(horizontalPng);
const logoBox = { image: embeddedLogo, width: embeddedLogo.width, height: embeddedLogo.height };

for (const size of Object.values(pages)) {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  let pageFont = regular;
  let pageMedium = medium;
  try {
    pageFont = await doc.embedFont(fontBytes, { subset: true });
    pageMedium = pageFont;
  } catch {
    const { StandardFonts } = await import("pdf-lib");
    pageFont = await doc.embedFont(StandardFonts.Helvetica);
    pageMedium = await doc.embedFont(StandardFonts.HelveticaBold);
  }
  const pageLogo = await doc.embedPng(horizontalPng);
  const page = doc.addPage([size.width, size.height]);
  drawLetterhead(page, { regular: pageFont, medium: pageMedium }, { image: pageLogo, width: pageLogo.width, height: pageLogo.height }, size);
  await writeFile(path.join(letterDir, `Sandhu-Letterhead-${size.label}.pdf`), await doc.save());
}

for (const [key, label] of [["letter", "US-Letter"], ["a4", "A4"]]) {
  const document = wordDocument(horizontalPng, logoWidthPx, logoHeightPx, key);
  await writeFile(path.join(letterDir, `Sandhu-Letterhead-${label}.docx`), await Packer.toBuffer(document));
}

console.log("Brand assets written.");
void logoBox;
