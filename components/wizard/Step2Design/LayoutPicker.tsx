'use client';

import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import { Check } from 'lucide-react';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import { LAYOUTS } from '@/lib/constants';
import type { LayoutId } from '@/types/biodata';

const THUMBNAILS: Record<LayoutId, React.ReactNode> = {
  L1: (
    // Classic Elegant: centered header + single column
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="30" y="6" width="20" height="3" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="25" y="12" width="30" height="4" rx="1" fill="currentColor" opacity="0.8" />
      <rect x="28" y="18" width="24" height="2" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="10" y="24" width="60" height="0.8" rx="0.4" fill="currentColor" opacity="0.2" />
      <rect x="10" y="29" width="28" height="2" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="42" y="29" width="28" height="2" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="10" y="33" width="28" height="2" rx="1" fill="currentColor" opacity="0.25" />
      <rect x="42" y="33" width="28" height="2" rx="1" fill="currentColor" opacity="0.25" />
      <rect x="10" y="40" width="60" height="0.8" rx="0.4" fill="currentColor" opacity="0.2" />
      <rect x="10" y="45" width="28" height="2" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="42" y="45" width="28" height="2" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="10" y="49" width="28" height="2" rx="1" fill="currentColor" opacity="0.25" />
      <rect x="42" y="49" width="28" height="2" rx="1" fill="currentColor" opacity="0.25" />
      <rect x="10" y="56" width="60" height="0.8" rx="0.4" fill="currentColor" opacity="0.2" />
      <rect x="10" y="61" width="28" height="2" rx="1" fill="currentColor" opacity="0.4" />
      <rect x="42" y="61" width="28" height="2" rx="1" fill="currentColor" opacity="0.4" />
    </svg>
  ),
  L2: (
    // Modern Minimal: left-aligned name, photo right, thin rules
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="8" y="8" width="40" height="5" rx="1" fill="currentColor" opacity="0.8" />
      <rect x="8" y="15" width="25" height="2" rx="1" fill="currentColor" opacity="0.35" />
      <rect x="56" y="8" width="16" height="16" rx="2" fill="currentColor" opacity="0.2" />
      <rect x="8" y="26" width="64" height="1" rx="0.5" fill="currentColor" opacity="0.6" />
      <rect x="8" y="30" width="18" height="1.5" rx="0.75" fill="currentColor" opacity="0.5" />
      <rect x="8" y="33" width="28" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="8" y="36" width="28" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="8" y="42" width="18" height="1.5" rx="0.75" fill="currentColor" opacity="0.5" />
      <rect x="8" y="45" width="28" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="8" y="48" width="28" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="8" y="51" width="28" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="8" y="57" width="18" height="1.5" rx="0.75" fill="currentColor" opacity="0.5" />
      <rect x="8" y="60" width="28" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="8" y="63" width="28" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
    </svg>
  ),
  L3: (
    // Two Column Grid: left sidebar + right content
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="0" y="0" width="24" height="100" rx="0" fill="currentColor" opacity="0.07" />
      <rect x="4" y="6" width="16" height="16" rx="1" fill="currentColor" opacity="0.25" />
      <rect x="4" y="25" width="16" height="2" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="4" y="29" width="16" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="4" y="32" width="16" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="4" y="35" width="16" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="4" y="38" width="16" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="4" y="41" width="16" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="28" y="6" width="3" height="60" rx="1.5" fill="currentColor" opacity="0" />
      <rect x="28" y="8" width="44" height="3" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="28" y="14" width="44" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="28" y="17" width="44" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="28" y="23" width="44" height="3" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="28" y="29" width="44" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="28" y="32" width="44" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="28" y="38" width="44" height="3" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="28" y="44" width="44" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="28" y="47" width="44" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
    </svg>
  ),
  L4: (
    // Royal Heritage: double border, centered
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="3" y="3" width="74" height="94" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.6" fill="none" />
      <rect x="6" y="6" width="68" height="88" rx="0.5" stroke="currentColor" strokeWidth="0.75" opacity="0.3" fill="none" />
      <rect x="28" y="12" width="24" height="2" rx="1" fill="currentColor" opacity="0.4" />
      <circle cx="40" cy="22" r="7" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="0.75" />
      <rect x="24" y="33" width="32" height="4" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="28" y="40" width="24" height="1.5" rx="0.75" fill="currentColor" opacity="0.3" />
      <rect x="14" y="46" width="52" height="0.75" rx="0.375" fill="currentColor" opacity="0.3" />
      <rect x="14" y="50" width="24" height="1.5" rx="0.75" fill="currentColor" opacity="0.4" />
      <rect x="42" y="50" width="24" height="1.5" rx="0.75" fill="currentColor" opacity="0.4" />
      <rect x="14" y="53" width="24" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="42" y="53" width="24" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="14" y="60" width="52" height="0.75" rx="0.375" fill="currentColor" opacity="0.3" />
      <rect x="14" y="64" width="24" height="1.5" rx="0.75" fill="currentColor" opacity="0.4" />
      <rect x="42" y="64" width="24" height="1.5" rx="0.75" fill="currentColor" opacity="0.4" />
    </svg>
  ),
  L5: (
    // Contemporary Card: card-based sections
    <svg viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="8" y="6" width="64" height="14" rx="3" fill="currentColor" opacity="0.2" />
      <rect x="12" y="10" width="28" height="3" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="12" y="15" width="18" height="2" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="8" y="24" width="64" height="18" rx="3" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="0.5" />
      <rect x="11" y="27" width="3" height="10" rx="1.5" fill="currentColor" opacity="0.5" />
      <rect x="17" y="27" width="20" height="2" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="17" y="31" width="30" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="17" y="34" width="30" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="8" y="46" width="30" height="18" rx="3" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="0.5" />
      <rect x="11" y="49" width="3" height="8" rx="1.5" fill="currentColor" opacity="0.5" />
      <rect x="17" y="49" width="15" height="2" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="17" y="53" width="18" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="17" y="56" width="18" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="42" y="46" width="30" height="18" rx="3" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="0.5" />
      <rect x="45" y="49" width="3" height="8" rx="1.5" fill="currentColor" opacity="0.5" />
      <rect x="51" y="49" width="15" height="2" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="51" y="53" width="18" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
      <rect x="51" y="56" width="18" height="1.5" rx="0.75" fill="currentColor" opacity="0.25" />
    </svg>
  ),
  custom: <div />,
};

export function LayoutPicker() {
  const { t } = useTranslation('common');
  const layoutId = useBiodataStore((s) => s.customization.layoutId);
  const setCustomization = useBiodataStore((s) => s.setCustomization);

  return (
    <div>
      <p
        className="text-sm font-semibold mb-3"
        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
      >
        {t('wizard.step2.layouts.title')}
      </p>
      <div className="grid grid-cols-5 gap-2">
        {LAYOUTS.map((layout) => {
          const isActive = layoutId === layout.id;
          return (
            <button
              key={layout.id}
              type="button"
              onClick={() => setCustomization({ layoutId: layout.id as LayoutId })}
              className="flex flex-col items-center gap-2 rounded-xl p-2 border-2 transition-all cursor-pointer group"
              style={{
                borderColor: isActive ? 'var(--accent)' : 'var(--border-default)',
                background: isActive ? 'var(--color-brand-50)' : 'var(--bg-surface)',
              }}
            >
              {/* Thumbnail */}
              <div
                className="w-full aspect-[4/5] rounded-lg flex items-center justify-center overflow-hidden relative"
                style={{
                  background: isActive ? 'var(--color-brand-100)' : 'var(--bg-base)',
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                }}
              >
                {THUMBNAILS[layout.id as LayoutId]}
                {isActive && (
                  <div
                    className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--accent)' }}
                  >
                    <Check size={10} color="#fff" />
                  </div>
                )}
              </div>
              {/* Name */}
              <span
                className="text-center leading-tight"
                style={{
                  fontSize: '0.65rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                }}
              >
                {t(`wizard.step2.layouts.${layout.id}.name`)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
