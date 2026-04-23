'use client';

import type { BiodataRenderProps, ColorPalette, CustomizationState } from '@/types/biodata';
import { PALETTES } from '@/lib/constants';
import { ClassicElegant } from './layouts/ClassicElegant';
import { ModernMinimal } from './layouts/ModernMinimal';
import { TwoColumnGrid } from './layouts/TwoColumnGrid';
import { RoyalHeritage } from './layouts/RoyalHeritage';
import { ContemporaryCard } from './layouts/ContemporaryCard';

export function getActivePalette(c: CustomizationState): ColorPalette {
  return c.customPalette ?? PALETTES.find((p) => p.id === c.paletteId)?.palette ?? PALETTES[0].palette;
}

export function BiodataRenderer(props: BiodataRenderProps) {
  switch (props.customization.layoutId) {
    case 'L2': return <ModernMinimal {...props} />;
    case 'L3': return <TwoColumnGrid {...props} />;
    case 'L4': return <RoyalHeritage {...props} />;
    case 'L5': return <ContemporaryCard {...props} />;
    default:   return <ClassicElegant {...props} />;
  }
}
