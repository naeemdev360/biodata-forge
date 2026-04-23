'use client';

import { cn } from '@/lib/utils';

export interface ColorSwatchProps {
  color: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const SIZE: Record<NonNullable<ColorSwatchProps['size']>, string> = {
  sm: 'w-7 h-7',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

/** Circular color picker swatch with selected ring state. */
export function ColorSwatch({ color, label, selected, onClick, size = 'md' }: ColorSwatchProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'rounded-full border-3 border-transparent cursor-pointer transition-transform duration-150',
        'hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2',
        selected && 'ring-2 ring-offset-2',
        SIZE[size]
      )}
      style={{
        backgroundColor: color,
        ...(selected && { ringColor: 'var(--text-primary)', outlineColor: 'var(--accent)' }),
        boxShadow: selected
          ? '0 0 0 2px var(--bg-surface), 0 0 0 4px var(--text-primary)'
          : undefined,
      }}
    />
  );
}
