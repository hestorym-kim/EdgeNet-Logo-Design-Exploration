import { BRAND_COLORS, BRAND_INFO, Language } from "../data/concepts";
import { REFINEMENT_SPECS, REFINEMENT_UI, RefinementId } from "../data/refinements";
import { RefinedSymbolVariant } from "../components/RefinedUnifiedFrameLogos";
import { svgStringToPngBase64 } from "./exportBoard";

export const ORIGINAL_UNIFIED_FRAME_SVG = `<svg viewBox="0 0 120 120" width="512" height="512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="23" y="23" width="9.5" height="74" rx="1.5" fill="#101E35" />
  <rect x="23" y="23" width="38" height="9.5" rx="1.5" fill="#101E35" />
  <rect x="23" y="55.25" width="30" height="9.5" rx="1.5" fill="#101E35" />
  <rect x="23" y="87.5" width="38" height="9.5" rx="1.5" fill="#101E35" />
  <rect x="87.5" y="23" width="9.5" height="74" rx="1.5" fill="#101E35" />
  <rect x="75" y="23" width="22" height="9.5" rx="1.5" fill="#101E35" />
  <rect x="75" y="87.5" width="22" height="9.5" rx="1.5" fill="#101E35" />
  <line x1="59" y1="28.5" x2="92" y2="91.5" stroke="#147DAB" stroke-width="7.5" stroke-linecap="round" />
  <circle cx="59" cy="28" r="6.5" fill="#FFFFFF" />
  <circle cx="59" cy="28" r="4.4" fill="#147DAB" />
  <circle cx="53" cy="60" r="6.5" fill="#FFFFFF" />
  <circle cx="53" cy="60" r="4.4" fill="#147DAB" />
  <circle cx="92" cy="92" r="6.5" fill="#FFFFFF" />
  <circle cx="92" cy="92" r="4.4" fill="#147DAB" />
</svg>`;

function getRefinedInnerSvg(
  id: RefinementId,
  variant: RefinedSymbolVariant,
  uniquePrefix: string
): { defs: string; body: string } {
  const primary = variant === "dark" ? "#FFFFFF" : "#101E35";
  const accent = variant === "monochrome" ? "#101E35" : "#147DAB";

  if (id === "refined") {
    const mId = `${uniquePrefix}-refined-mask`;
    return {
      defs: `
        <mask id="${mId}">
          <rect x="0" y="0" width="120" height="120" fill="white" />
          <circle cx="60" cy="27" r="7.5" fill="black" />
          <circle cx="51" cy="60" r="7.5" fill="black" />
          <circle cx="93" cy="93" r="7.5" fill="black" />
        </mask>
      `,
      body: `
        <g mask="url(#${mId})">
          <rect x="22" y="22" width="10" height="76" rx="1.75" fill="${primary}" />
          <rect x="22" y="22" width="38" height="10" rx="1.75" fill="${primary}" />
          <rect x="22" y="55" width="29" height="10" rx="1.75" fill="${primary}" />
          <rect x="22" y="88" width="38" height="10" rx="1.75" fill="${primary}" />
          <rect x="88" y="22" width="10" height="76" rx="1.75" fill="${primary}" />
          <rect x="75" y="22" width="23" height="10" rx="1.75" fill="${primary}" />
          <rect x="75" y="88" width="23" height="10" rx="1.75" fill="${primary}" />
          <line x1="60" y1="27" x2="93" y2="93" stroke="${accent}" stroke-width="7.8" stroke-linecap="round" />
        </g>
        <circle cx="60" cy="27" r="4.8" fill="${accent}" />
        <circle cx="51" cy="60" r="4.8" fill="${accent}" />
        <circle cx="93" cy="93" r="4.8" fill="${accent}" />
      `,
    };
  }

  if (id === "integrated") {
    const mId = `${uniquePrefix}-integrated-mask`;
    return {
      defs: `
        <mask id="${mId}">
          <rect x="0" y="0" width="120" height="120" fill="white" />
          <circle cx="60" cy="27" r="7.4" fill="black" />
          <circle cx="76.5" cy="60" r="7.4" fill="black" />
          <circle cx="93" cy="93" r="7.4" fill="black" />
        </mask>
      `,
      body: `
        <g mask="url(#${mId})">
          <rect x="22" y="22" width="10" height="76" rx="1.75" fill="${primary}" />
          <rect x="22" y="22" width="38" height="10" rx="1.75" fill="${primary}" />
          <rect x="22" y="55" width="30" height="10" rx="1.75" fill="${primary}" />
          <rect x="22" y="88" width="42" height="10" rx="1.75" fill="${primary}" />
          <rect x="88" y="22" width="10" height="76" rx="1.75" fill="${primary}" />
          <rect x="75" y="22" width="23" height="10" rx="1.75" fill="${primary}" />
          <rect x="77" y="88" width="21" height="10" rx="1.75" fill="${primary}" />
          <line x1="48" y1="60" x2="76.5" y2="60" stroke="${accent}" stroke-width="7.8" stroke-linecap="round" />
          <line x1="60" y1="27" x2="93" y2="93" stroke="${accent}" stroke-width="8.2" stroke-linecap="round" />
        </g>
        <circle cx="60" cy="27" r="4.8" fill="${accent}" />
        <circle cx="76.5" cy="60" r="4.8" fill="${accent}" />
        <circle cx="93" cy="93" r="4.8" fill="${accent}" />
      `,
    };
  }

  return {
    defs: "",
    body: `
      <rect x="22" y="22" width="11.5" height="76" rx="2" fill="${primary}" />
      <rect x="22" y="22" width="29" height="11.5" rx="2" fill="${primary}" />
      <rect x="22" y="54.25" width="26" height="11.5" rx="2" fill="${primary}" />
      <rect x="22" y="86.5" width="34" height="11.5" rx="2" fill="${primary}" />
      <rect x="86.5" y="22" width="11.5" height="55" rx="2" fill="${primary}" />
      <line x1="60" y1="27.75" x2="92.25" y2="92.25" stroke="${accent}" stroke-width="9" stroke-linecap="round" />
      <circle cx="60" cy="27.75" r="5.75" fill="${accent}" />
      <circle cx="76.1" cy="60" r="7.2" fill="${accent}" />
      <circle cx="92.25" cy="92.25" r="5.75" fill="${accent}" />
    `,
  };
}

export function buildStandaloneRefinedSvg(
  id: RefinementId,
  variant: "color" | "monochrome"
): string {
  const { defs, body } = getRefinedInnerSvg(id, variant, "standalone");
  return `<svg viewBox="0 0 120 120" width="512" height="512" fill="none" xmlns="http://www.w3.org/2000/svg">${
    defs ? `<defs>${defs}</defs>` : ""
  }${body}</svg>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapTextLines(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (!current) {
      current = word;
    } else if (current.length + 1 + word.length <= maxChars) {
      current += " " + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export function buildRefinementComparisonSvg(lang: Language = "en"): string {
  const W = 1920;
  const H = 1080;
  const headerH = 84;
  const footerH = 108;
  const colW = W / 3;
  const ui = REFINEMENT_UI[lang];
  const displayFont = "Plus Jakarta Sans, Noto Sans KR, Arial, sans-serif";
  const bodyFont = "DM Sans, Noto Sans KR, Arial, sans-serif";

  const defsChunks: string[] = [];

  const columnsSvg = REFINEMENT_SPECS.map((spec, idx) => {
    const loc = spec[lang];
    const x0 = idx * colW;
    const cx = x0 + colW / 2;

    const colorSvg = getRefinedInnerSvg(spec.id, "color", `col${idx}-c`);
    const monoSvg = getRefinedInnerSvg(spec.id, "monochrome", `col${idx}-m`);
    const darkSvg = getRefinedInnerSvg(spec.id, "dark", `col${idx}-d`);

    if (colorSvg.defs) defsChunks.push(colorSvg.defs);
    if (monoSvg.defs) defsChunks.push(monoSvg.defs);
    if (darkSvg.defs) defsChunks.push(darkSvg.defs);

    const rationaleLines = wrapTextLines(
      loc.designRationale,
      lang === "ko" ? 31 : 54
    );

    const divider =
      idx > 0
        ? `<line x1="${x0}" y1="${headerH + 24}" x2="${x0}" y2="${H - footerH - 24}" stroke="#E8EEF4" stroke-width="2" />`
        : "";

    const previewY = headerH + 662;
    const boxW = 250;
    const boxGap = 16;
    const leftBoxX = x0 + (colW - (boxW * 2 + boxGap)) / 2;
    const rightBoxX = leftBoxX + boxW + boxGap;

    return `
      ${divider}
      <text x="${x0 + 54}" y="${headerH + 56}" font-family="${displayFont}" font-size="14.5" font-weight="600" letter-spacing="1.4" fill="#147DAB">${escapeXml(loc.fullTitle)}</text>
      <line x1="${x0 + 54}" y1="${headerH + 74}" x2="${x0 + colW - 54}" y2="${headerH + 74}" stroke="#E8EEF4" stroke-width="1.5" />

      <!-- Primary Large Symbol Box -->
      <rect x="${x0 + 54}" y="${headerH + 96}" width="${colW - 108}" height="240" rx="8" fill="#F8FAFC" stroke="#E8EEF4" stroke-width="1.5" />
      <g transform="translate(${cx - 96}, ${headerH + 122}) scale(1.6)">
        ${colorSvg.body}
      </g>

      <!-- Wordmark Lockup -->
      <g transform="translate(${cx - 114}, ${headerH + 356})">
        <g transform="translate(0, 0) scale(0.36)">
          ${colorSvg.body}
        </g>
        <text x="54" y="33" font-family="${displayFont}" font-size="33" font-weight="600" letter-spacing="-1" fill="#101E35">EdgeNet</text>
      </g>

      <!-- Rationale -->
      <text x="${x0 + 54}" y="${headerH + 432}" font-family="${bodyFont}" font-size="14.5" fill="#303B49">
        ${rationaleLines
          .slice(0, 4)
          .map(
            (line, i) =>
              `<tspan x="${x0 + 54}" dy="${i === 0 ? 0 : 21}">${escapeXml(line)}</tspan>`
          )
          .join("")}
      </text>

      <!-- Main Geometry Improvements -->
      <text x="${x0 + 54}" y="${headerH + 536}" font-family="${displayFont}" font-size="11.5" font-weight="600" letter-spacing="1" fill="#101E35">${escapeXml(ui.improvementsLabel.toUpperCase())}</text>
      ${loc.geometryImprovements
        .map(
          (imp, i) =>
            `<text x="${x0 + 54}" y="${headerH + 562 + i * 24}" font-family="${bodyFont}" font-size="13" fill="#303B49">• ${escapeXml(imp)}</text>`
        )
        .join("")}

      <!-- Monochrome & Small-Size + Dark Surface Previews -->
      <rect x="${leftBoxX}" y="${previewY}" width="${boxW}" height="176" rx="6" fill="#F7F9FC" stroke="#E8EEF4" stroke-width="1.5" />
      <text x="${leftBoxX + 16}" y="${previewY + 26}" font-family="${displayFont}" font-size="11" font-weight="600" letter-spacing="1" fill="#303B49">${escapeXml(ui.monochromeLabel.toUpperCase())}</text>
      <g transform="translate(${leftBoxX + 26}, ${previewY + 52}) scale(0.46)">
        ${monoSvg.body}
      </g>
      <text x="${leftBoxX + 92}" y="${previewY + 87}" font-family="${displayFont}" font-size="20" font-weight="600" letter-spacing="-0.5" fill="#101E35">EdgeNet</text>
      <!-- Small 16px, 24px, 36px test strip -->
      <g transform="translate(${leftBoxX + 28}, ${previewY + 132}) scale(0.133)">${monoSvg.body}</g>
      <g transform="translate(${leftBoxX + 64}, ${previewY + 128}) scale(0.2)">${monoSvg.body}</g>
      <g transform="translate(${leftBoxX + 108}, ${previewY + 122}) scale(0.3)">${monoSvg.body}</g>
      <text x="${leftBoxX + 160}" y="${previewY + 144}" font-family="IBM Plex Mono, monospace" font-size="10.5" fill="#303B49">16 / 24 / 36</text>

      <rect x="${rightBoxX}" y="${previewY}" width="${boxW}" height="176" rx="6" fill="#101E35" />
      <text x="${rightBoxX + 16}" y="${previewY + 26}" font-family="${displayFont}" font-size="11" font-weight="600" letter-spacing="1" fill="#A5B7CB">${escapeXml(ui.darkSurfaceLabel.toUpperCase())}</text>
      <g transform="translate(${rightBoxX + 26}, ${previewY + 62}) scale(0.46)">
        ${darkSvg.body}
      </g>
      <text x="${rightBoxX + 92}" y="${previewY + 97}" font-family="${displayFont}" font-size="20" font-weight="600" letter-spacing="-0.5" fill="#FFFFFF">EdgeNet</text>
      <rect x="${rightBoxX + 26}" y="${previewY + 138}" width="198" height="2" fill="#3F8F6B" opacity="0.85" />
    `;
  }).join("\n");

  const paletteSwatches = BRAND_COLORS.map((swatch, idx) => {
    const sx = 630 + idx * 124;
    const sy = H - footerH + 26;
    return `
      <rect x="${sx}" y="${sy}" width="26" height="26" rx="4" fill="${swatch.hex}" ${
      swatch.isLight ? 'stroke="#303B49" stroke-width="1"' : ""
    } />
      <text x="${sx}" y="${sy + 44}" font-family="IBM Plex Mono, monospace" font-size="11.5" fill="#E8EEF4">${swatch.hex}</text>
      <text x="${sx}" y="${sy + 60}" font-family="${bodyFont}" font-size="10.5" fill="#9FB0C4">${escapeXml(swatch.name[lang])}</text>
    `;
  }).join("\n");

  return `
    <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>${defsChunks.join("\n")}</defs>
      <rect width="${W}" height="${H}" fill="#FFFFFF" />

      <rect width="${W}" height="${headerH}" fill="#F8FAFC" />
      <line x1="0" y1="${headerH}" x2="${W}" y2="${headerH}" stroke="#E8EEF4" stroke-width="2" />
      <text x="54" y="51" font-family="${displayFont}" font-size="21" font-weight="600" letter-spacing="-0.4" fill="#101E35">${escapeXml(ui.boardHeading)}</text>
      <text x="${W - 54}" y="51" text-anchor="end" font-family="${bodyFont}" font-size="14.5" fill="#303B49">${escapeXml(BRAND_INFO.presentingCompany)}  ·  ${escapeXml(BRAND_INFO.descriptor[lang])}</text>

      <g>${columnsSvg}</g>

      <rect x="0" y="${H - footerH}" width="${W}" height="${footerH}" fill="#101E35" />
      <text x="54" y="${H - footerH + 44}" font-family="${displayFont}" font-size="17" font-weight="600" fill="#FFFFFF">${escapeXml(BRAND_INFO.presentingCompany)}</text>
      <text x="54" y="${H - footerH + 71}" font-family="${bodyFont}" font-size="13.5" fill="#B5C4D6">${escapeXml(BRAND_INFO.descriptor[lang])}</text>

      ${paletteSwatches}

      <text x="${W - 54}" y="${H - footerH + 58}" text-anchor="end" font-family="${bodyFont}" font-size="13.5" fill="#B5C4D6">${escapeXml(BRAND_INFO.boardNote[lang])}</text>
    </svg>
  `.trim();
}

export async function downloadRefinementComparisonPng(lang: Language = "en") {
  const svg = buildRefinementComparisonSvg(lang);
  const { dataUrl } = await svgStringToPngBase64(svg, 1920, 1080);
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `edgenet-unified-frame-comparison-board-16x9-${lang}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
