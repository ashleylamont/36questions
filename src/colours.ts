export default [
  '#ffb5e8',
  '#ff9cee',
  '#ffccf9',
  '#fcc2ff',
  '#f6a6ff',
  '#b28dff',
  '#c5a3ff',
  '#d5aaff',
  '#ecd4ff',
  '#fbe4ff',
  '#dcd3ff',
  '#a79aff',
  '#bfb9ff',
  '#97a2ff',
  '#afcbff',
  '#aff8db',
  '#c4faf8',
  '#85e3ff',
  '#ace7ff',
  '#6eb5ff',
  '#bffcc6',
  '#dbffd6',
  '#f3ffe3',
  '#e7ffac',
  '#ffffd1',
  '#ffc9de',
  '#ffabab',
  '#ffbebc',
  '#ffcbc1',
  '#fff5ba',
];

export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ]
    : [0, 0, 0];
}

export function rgbToHsl(rgb: [number, number, number]): [number, number, number] {
  const [r, g, b] = rgb;
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  const cmax = Math.max(r1, g1, b1);
  const cmin = Math.min(r1, g1, b1);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  const l = (cmax + cmin) / 2;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (cmax) {
      case r1:
        h = ((g1 - b1) / delta) % 6;
        break;
      case g1:
        h = (b1 - r1) / delta + 2;
        break;
      case b1:
        h = (r1 - g1) / delta + 4;
        break;
      default:
        break;
    }
    h *= 60;
  }
  return [h, s, l];
}

export function hslToRgb(hsl: [number, number, number]): [number, number, number] {
  const [h, s, l] = hsl;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  switch (Math.floor(h / 60)) {
    case 0:
      r = c;
      g = x;
      break;
    case 1:
      r = x;
      g = c;
      break;
    case 2:
      g = c;
      b = x;
      break;
    case 3:
      g = x;
      b = c;
      break;
    case 4:
      r = x;
      b = c;
      break;
    case 5:
      r = c;
      b = x;
      break;
    default:
      break;
  }
  r += m;
  g += m;
  b += m;
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function rgbToHex(rgb: [number, number, number]): string {
  let [r, g, b] = rgb;
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

export function hslGradient(
  from: [number, number, number],
  to: [number, number, number],
  samples: number,
): [number, number, number][] {
  const [fromH, fromS, fromL] = from;
  const [toH, toS, toL] = to;
  let hDiff = toH - fromH;
  if (hDiff > 180) {
    hDiff -= 360;
  }
  const sDiff = toS - fromS;
  const lDiff = toL - fromL;
  const hStep = hDiff / samples;
  const sStep = sDiff / samples;
  const lStep = lDiff / samples;
  const result: [number, number, number][] = [];
  for (let i = 0; i < samples; i += 1) {
    const h = fromH + hStep * i;
    const s = fromS + sStep * i;
    const l = fromL + lStep * i;
    result.push([h < 0 ? h + 360 : h, s, l]);
  }
  return result;
}

export function cssGradient(from: string, to: string): string {
  const fromRgb = hexToRgb(from);
  const toRgb = hexToRgb(to);
  const fromHsl = rgbToHsl(fromRgb);
  const toHsl = rgbToHsl(toRgb);
  const samples = 10;
  const hsls = hslGradient(fromHsl, toHsl, samples);
  const result = hsls.map((hsl) => rgbToHex(hslToRgb(hsl)));
  return `linear-gradient(to bottom right, ${result.join(', ')})`;
}
