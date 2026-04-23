import chroma from 'chroma-js';
import type { ColorPalette } from '@/types/biodata';

const HUE_RANGES: [number, number][] = [
  [0, 20],
  [30, 50],
  [160, 200],
  [210, 250],
  [270, 320],
  [330, 360],
];

const WCAG_AA_RATIO = 4.5;

/** Seeded pseudo-random number generator (Mulberry32). */
function createPrng(seed: number) {
  let s = seed;
  return function (): number {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randBetween(min: number, max: number, rand: () => number): number {
  return min + rand() * (max - min);
}

function buildPalette(hue: number, accentHue: number, rand: () => number): ColorPalette {
  const primary = chroma.hsl(hue, randBetween(0.55, 0.7, rand), randBetween(0.25, 0.38, rand));
  const accent = chroma.hsl(accentHue, randBetween(0.55, 0.7, rand), randBetween(0.4, 0.55, rand));
  const background = chroma.hsl(hue, randBetween(0.18, 0.28, rand), randBetween(0.96, 0.98, rand));
  const surface = chroma.hsl(hue, randBetween(0.2, 0.3, rand), randBetween(0.91, 0.94, rand));
  let text = chroma.hsl(hue, randBetween(0.1, 0.18, rand), randBetween(0.1, 0.18, rand));
  const border = chroma.hsl(hue, randBetween(0.2, 0.35, rand), randBetween(0.78, 0.88, rand));

  // Ensure WCAG AA contrast between text and background
  let attempts = 0;
  while (chroma.contrast(text, background) < WCAG_AA_RATIO && attempts < 20) {
    text = text.darken(0.3);
    attempts++;
  }

  return {
    primary: primary.hex(),
    accent: accent.hex(),
    background: background.hex(),
    surface: surface.hex(),
    text: text.hex(),
    border: border.hex(),
  };
}

/** Generates a deterministic palette from a numeric seed. */
export function generatePaletteFromSeed(seed: number): ColorPalette {
  const rand = createPrng(seed);
  const rangeIndex = Math.floor(rand() * HUE_RANGES.length);
  const [min, max] = HUE_RANGES[rangeIndex];
  const hue = randBetween(min, max, rand);
  const accentHue = ((hue + 150 + randBetween(-15, 15, rand)) % 360 + 360) % 360;
  return buildPalette(hue, accentHue, rand);
}

/** Generates a random professional color palette. */
export function generatePalette(): ColorPalette {
  const seed = Math.floor(Math.random() * 0xffffffff);
  return generatePaletteFromSeed(seed);
}
