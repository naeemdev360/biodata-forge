'use client';

import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import { Check } from 'lucide-react';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import { FONT_PAIRINGS } from '@/lib/constants';
import type { FontPairing } from '@/types/biodata';

const FONT_CSS: Record<FontPairing, { heading: string; body: string }> = {
  heritage: { heading: "'Playfair Display', Georgia, serif", body: "'Lora', Georgia, serif" },
  modern:   { heading: "'DM Serif Display', Georgia, serif", body: "'DM Sans', system-ui, sans-serif" },
  classic:  { heading: "'Cormorant Garamond', Georgia, serif", body: "'Source Serif 4', Georgia, serif" },
};

export function FontPicker() {
  const { t } = useTranslation('common');
  const fontPairing = useBiodataStore((s) => s.customization.fontPairing);
  const setCustomization = useBiodataStore((s) => s.setCustomization);

  return (
    <div>
      <p
        className="text-sm font-semibold mb-3"
        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
      >
        {t('wizard.step2.fonts.title')}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {FONT_PAIRINGS.map((fp) => {
          const isActive = fontPairing === fp.id;
          const css = FONT_CSS[fp.id];
          return (
            <button
              key={fp.id}
              type="button"
              onClick={() => setCustomization({ fontPairing: fp.id as FontPairing })}
              className="flex flex-col gap-1 rounded-xl border-2 p-3 cursor-pointer transition-all text-left relative"
              style={{
                borderColor: isActive ? 'var(--accent)' : 'var(--border-default)',
                background: isActive ? 'var(--color-brand-50)' : 'var(--bg-surface)',
              }}
            >
              {isActive && (
                <div
                  className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--accent)' }}
                >
                  <Check size={10} color="#fff" />
                </div>
              )}
              {/* Heading sample */}
              <span
                style={{
                  fontFamily: css.heading,
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                  lineHeight: 1.2,
                }}
              >
                Aa
              </span>
              {/* Body sample */}
              <span
                style={{
                  fontFamily: css.body,
                  fontSize: '0.7rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.3,
                }}
              >
                {fp.headingFont}
              </span>
              <span
                style={{
                  fontSize: '0.62rem',
                  color: 'var(--text-muted)',
                }}
              >
                {t(`wizard.step2.fonts.${fp.id}`)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
