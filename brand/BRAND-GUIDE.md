# Brand guide

Sandhu Construction and Landscape Inc.

## The logo: Gable & Leaf

The symbol is a roof over a leaf, standing on a course of three pavers: the building, the landscape, and the ground work underneath both. The leaf is the only coloured part. Beside or under the symbol, **SANDHU** is set in Fraunces, with a thin amber line and **CONSTRUCTION & LANDSCAPE INC.** in Outfit capitals beneath it.

Use the files in `brand/logo`. Do not redraw the symbol. All files are built by `npm run brand` (`scripts/generate-brand.mjs`), so to change the logo, change the script and run it again.

### Logo files

| File | Use |
| --- | --- |
| `scl-icon.svg` | The symbol alone, in colour. Favicon, app icon, social avatar, embroidery, small marks. |
| `scl-logo-horizontal.svg` | Symbol left, wordmark right. Website header, email signature, letterhead, vehicles, signs. |
| `scl-logo-primary.svg` | Symbol centred above the wordmark. Covers, square placements, site boards. |
| `scl-logo-mono.svg`, `scl-icon-mono.svg` | All charcoal. Single-colour printing, engraving, stamps, fax. |
| `scl-logo-reversed.svg`, `scl-icon-reversed.svg` | Light shapes with an amber leaf, for charcoal or dark photos. Do not use on white. |

PNG exports are in `brand/logo/png` with transparent backgrounds. SVG is the master for print and signs. The same SVGs are copied to `public/brand` for the website. On the website itself the logo is drawn by `src/components/Logo.tsx`, which takes its colours from the section it sits in.

### Clear space and size

- Keep clear space around the logo equal to the height of one paver.
- Smallest sizes: symbol 20 px on screen / 7 mm in print; horizontal logo 150 px wide on screen / 40 mm in print.
- Do not stretch, rotate, outline, add shadows, change the colours, or separate the leaf from the roof.
- On a photograph, only place the logo over a calm, even area. Otherwise put the reversed logo on a charcoal panel.

## Colours

| Name | Hex | RGB | Use |
| --- | --- | --- | --- |
| Charcoal | `#1C211E` | 28, 33, 30 | Logo roof and pavers, text, buttons, dark bands, footer |
| White | `#FFFFFF` | 255, 255, 255 | Page background |
| Light grey | `#F2F2EF` | 242, 242, 239 | Alternate sections |
| Amber | `#D97A1E` | 217, 122, 30 | The leaf, rules and lines, large accent headings |
| Amber deep | `#A9560B` | 169, 86, 11 | Small amber text on white (meets contrast) and button hover |
| Amber bright | `#E8913A` | 232, 145, 58 | Amber on charcoal backgrounds |
| Muted | `#5C615C` | 92, 97, 92 | Secondary text |

Approximate print mixes:

| Name | CMYK |
| --- | --- |
| Charcoal | 15, 0, 9, 87 |
| Amber | 0, 44, 86, 15 |

Body text is charcoal on white, or white on charcoal. Amber `#D97A1E` is fine for lines, the leaf, and large headings; for small text on white use amber deep `#A9560B`, because the brighter amber does not have enough contrast for reading.

## Type

- **Headings:** Fraunces, regular weight. An accent phrase can be set in Fraunces italic in amber, for example "From the frame *to the finish.*"
- **Body and interface:** Outfit.
- **Logo wordmark:** Fraunces Medium (SANDHU) and Outfit SemiBold (CONSTRUCTION & LANDSCAPE INC.), outlined in the SVG files so they do not depend on installed fonts.

Both typefaces are open source (SIL Open Font License) and are loaded on the website. `npm run brand` downloads them into `brand/fonts` (not committed). The Word letterhead uses Arial so it stays editable on any computer.

## Letterhead

`brand/letterhead` has Word and PDF versions for US Letter and A4: a charcoal bar with an amber line at the top, the horizontal logo with contact details on the right, and a charcoal footer. Replace every `[bracket]` before sending a letter. Keep the bars, logo, and footer as they are.

## Photography

Project photographs on the website are samples until real jobs replace them. See `brand/IMAGE-SOURCES.md`. Do not present those pictures as company work.
