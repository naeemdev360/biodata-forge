'use client';

import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import { Wand2, Check } from 'lucide-react';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import { useColorPalette } from '@/hooks/useColorPalette';
import { PALETTES } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export function PalettePicker() {
  const { t } = useTranslation('common');
  const paletteId = useBiodataStore((s) => s.customization.paletteId);
  const customPalette = useBiodataStore((s) => s.customization.customPalette);
  const setCustomization = useBiodataStore((s) => s.setCustomization);
  const { generate } = useColorPalette();

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p
          className="text-sm font-semibold"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
        >
          {t('wizard.step2.palettes.title')}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={generate}
          className="gap-1.5 text-xs"
          style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
        >
          <Wand2 size={12} />
          {t('wizard.step2.palettes.generate')}
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {PALETTES.map((p) => {
          const isActive = paletteId === p.id && !customPalette;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setCustomization({ paletteId: p.id, customPalette: null })}
              className="rounded-xl border-2 overflow-hidden cursor-pointer transition-all text-left"
              style={{
                borderColor: isActive ? 'var(--accent)' : 'var(--border-default)',
              }}
            >
              {/* Color swatches */}
              <div className="flex h-6 relative">
                {[p.palette.primary, p.palette.accent, p.palette.background, p.palette.surface].map((color, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      background: color,
                      transition: 'background-color 400ms',
                    }}
                  />
                ))}
                {isActive && (
                  <div
                    className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--accent)' }}
                  >
                    <Check size={8} color="#fff" />
                  </div>
                )}
              </div>
              {/* Name */}
              <div
                className="px-2 py-1.5"
                style={{ background: 'var(--bg-surface)' }}
              >
                <span
                  className="block leading-tight"
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  }}
                >
                  {t(p.nameKey)}
                </span>
              </div>
            </button>
          );
        })}

        {/* Custom generated palette card */}
        {customPalette && (
          <button
            type="button"
            className="rounded-xl border-2 overflow-hidden cursor-pointer transition-all text-left"
            style={{ borderColor: 'var(--accent)' }}
          >
            <div className="flex h-6 relative">
              {[customPalette.primary, customPalette.accent, customPalette.background, customPalette.surface].map(
                (color, i) => (
                  <div
                    key={i}
                    style={{ flex: 1, background: color, transition: 'background-color 400ms' }}
                  />
                )
              )}
              <div
                className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent)' }}
              >
                <Check size={8} color="#fff" />
              </div>
            </div>
            <div className="px-2 py-1.5" style={{ background: 'var(--bg-surface)' }}>
              <span
                className="block leading-tight"
                style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--accent)' }}
              >
                Custom
              </span>
              <span
                className="font-mono leading-none"
                style={{ fontSize: '0.58rem', color: 'var(--text-muted)' }}
              >
                {customPalette.primary}
              </span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
