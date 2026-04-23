import type { ColorPalette, LayoutId, FontPairing } from '@/types/biodata';

export const STORAGE_KEY = 'biodata_forge_v1';
export const STORAGE_VERSION = '1.0';
export const AUTOSAVE_DEBOUNCE_MS = 500;

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

export const RELIGIONS = ['Islam', 'Hindu', 'Christian', 'Buddhist', 'Other'] as const;

export const MARITAL_STATUSES = [
  { value: 'never_married', labelKey: 'wizard.step1.personal.maritalStatus.neverMarried' },
  { value: 'divorced', labelKey: 'wizard.step1.personal.maritalStatus.divorced' },
  { value: 'widowed', labelKey: 'wizard.step1.personal.maritalStatus.widowed' },
] as const;

export const FAMILY_TYPES = [
  { value: 'nuclear', labelKey: 'wizard.step1.family.familyType.nuclear' },
  { value: 'joint', labelKey: 'wizard.step1.family.familyType.joint' },
] as const;

export interface LayoutConfig {
  id: LayoutId;
  nameKey: string;
  descriptionKey: string;
}

export const LAYOUTS: LayoutConfig[] = [
  { id: 'L1', nameKey: 'wizard.step2.layouts.L1.name', descriptionKey: 'wizard.step2.layouts.L1.description' },
  { id: 'L2', nameKey: 'wizard.step2.layouts.L2.name', descriptionKey: 'wizard.step2.layouts.L2.description' },
  { id: 'L3', nameKey: 'wizard.step2.layouts.L3.name', descriptionKey: 'wizard.step2.layouts.L3.description' },
  { id: 'L4', nameKey: 'wizard.step2.layouts.L4.name', descriptionKey: 'wizard.step2.layouts.L4.description' },
  { id: 'L5', nameKey: 'wizard.step2.layouts.L5.name', descriptionKey: 'wizard.step2.layouts.L5.description' },
];

export interface PaletteConfig {
  id: string;
  nameKey: string;
  palette: ColorPalette;
}

export const PALETTES: PaletteConfig[] = [
  {
    id: 'rose_gold',
    nameKey: 'wizard.step2.palettes.roseGold',
    palette: {
      primary: '#8B4563',
      accent: '#C9956A',
      background: '#FDF6EE',
      surface: '#F7EDE3',
      text: '#2D1B13',
      border: '#D4B5A0',
    },
  },
  {
    id: 'royal_teal',
    nameKey: 'wizard.step2.palettes.royalTeal',
    palette: {
      primary: '#1A5E6A',
      accent: '#F4A261',
      background: '#F7FBFC',
      surface: '#E8F4F6',
      text: '#0D2A30',
      border: '#A3CDD4',
    },
  },
  {
    id: 'vermillion_ivory',
    nameKey: 'wizard.step2.palettes.vermillionIvory',
    palette: {
      primary: '#C0392B',
      accent: '#F9C74F',
      background: '#FFFDF7',
      surface: '#FFF5E4',
      text: '#1C0F0A',
      border: '#E8C4BA',
    },
  },
  {
    id: 'deep_maroon',
    nameKey: 'wizard.step2.palettes.deepMaroon',
    palette: {
      primary: '#6B1F3A',
      accent: '#D4AF37',
      background: '#FEF9F4',
      surface: '#F5EAE1',
      text: '#2A0D17',
      border: '#C4A08A',
    },
  },
  {
    id: 'sage_blush',
    nameKey: 'wizard.step2.palettes.sageBlush',
    palette: {
      primary: '#4A7C59',
      accent: '#B5838D',
      background: '#F8FAF4',
      surface: '#EDF2E8',
      text: '#1A2E20',
      border: '#B5C9AF',
    },
  },
  {
    id: 'midnight_blue',
    nameKey: 'wizard.step2.palettes.midnightBlue',
    palette: {
      primary: '#1C2B4A',
      accent: '#E8A045',
      background: '#F7F9FC',
      surface: '#EAF0F8',
      text: '#0D1724',
      border: '#A8B8D0',
    },
  },
  {
    id: 'blush_slate',
    nameKey: 'wizard.step2.palettes.blushSlate',
    palette: {
      primary: '#5C6B73',
      accent: '#B07D8B',
      background: '#FDF7F9',
      surface: '#F2E9ED',
      text: '#1E2527',
      border: '#C4B0B8',
    },
  },
  {
    id: 'terracotta_sand',
    nameKey: 'wizard.step2.palettes.terracottaSand',
    palette: {
      primary: '#C1551A',
      accent: '#3D405B',
      background: '#FDF8F5',
      surface: '#F5EAE1',
      text: '#1F0E06',
      border: '#D4B8A8',
    },
  },
];

export interface FontPairingConfig {
  id: FontPairing;
  nameKey: string;
  headingFont: string;
  bodyFont: string;
}

export const FONT_PAIRINGS: FontPairingConfig[] = [
  { id: 'heritage', nameKey: 'wizard.step2.fonts.heritage', headingFont: 'Playfair Display', bodyFont: 'Lora' },
  { id: 'modern', nameKey: 'wizard.step2.fonts.modern', headingFont: 'DM Serif Display', bodyFont: 'DM Sans' },
  { id: 'classic', nameKey: 'wizard.step2.fonts.classic', headingFont: 'Cormorant Garamond', bodyFont: 'Source Serif 4' },
];

export const DEFAULT_CUSTOMIZATION = {
  layoutId: 'L1' as LayoutId,
  paletteId: 'rose_gold',
  customPalette: null,
  fontPairing: 'heritage' as FontPairing,
};

export const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
