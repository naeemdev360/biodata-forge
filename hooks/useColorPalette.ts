'use client';

import { useCallback } from 'react';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import { generatePalette, generatePaletteFromSeed } from '@/lib/colorPalette';
import type { ColorPalette } from '@/types/biodata';

interface UseColorPaletteReturn {
  customPalette: ColorPalette | null;
  generate: () => void;
  generateFromSeed: (seed: number) => void;
  apply: (palette: ColorPalette) => void;
}

/** Provides palette generation and application actions, backed by the Zustand store. */
export function useColorPalette(): UseColorPaletteReturn {
  const customPalette = useBiodataStore((s) => s.customization.customPalette);
  const setCustomization = useBiodataStore((s) => s.setCustomization);

  const generate = useCallback(() => {
    const palette = generatePalette();
    setCustomization({ customPalette: palette, paletteId: 'custom' });
  }, [setCustomization]);

  const generateFromSeed = useCallback(
    (seed: number) => {
      const palette = generatePaletteFromSeed(seed);
      setCustomization({ customPalette: palette, paletteId: 'custom' });
    },
    [setCustomization]
  );

  const apply = useCallback(
    (palette: ColorPalette) => {
      setCustomization({ customPalette: palette, paletteId: 'custom' });
    },
    [setCustomization]
  );

  return { customPalette, generate, generateFromSeed, apply };
}
