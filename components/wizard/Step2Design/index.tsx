'use client';

import '@/lib/i18n-client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Sliders } from 'lucide-react';
import { LayoutPicker } from './LayoutPicker';
import { PalettePicker } from './PalettePicker';
import { FontPicker } from './FontPicker';
import { LivePreview } from './LivePreview';

export function Step2Design() {
  const { t } = useTranslation('common');
  const [mobileTab, setMobileTab] = useState<'design' | 'preview'>('design');

  return (
    <div>
      {/* Mobile tab toggle */}
      <div
        className="flex lg:hidden mb-4 rounded-xl overflow-hidden border"
        style={{ borderColor: 'var(--border-default)' }}
      >
        {(['design', 'preview'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setMobileTab(tab)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors cursor-pointer"
            style={{
              background: mobileTab === tab ? 'var(--accent)' : 'var(--bg-surface)',
              color: mobileTab === tab ? '#fff' : 'var(--text-secondary)',
            }}
          >
            {tab === 'design' ? <Sliders size={14} /> : <Eye size={14} />}
            {tab === 'design' ? t('wizard.step2.title') : t('wizard.step2.preview.title')}
          </button>
        ))}
      </div>

      {/* Desktop: two-column; Mobile: tabs */}
      <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-8 lg:items-start">
        {/* Left: pickers */}
        <div className={`flex flex-col gap-8 ${mobileTab === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
          <LayoutPicker />
          <PalettePicker />
          <FontPicker />
        </div>

        {/* Right: sticky preview */}
        <div
          className={`lg:sticky lg:top-24 ${mobileTab === 'design' ? 'hidden lg:block' : 'block'}`}
        >
          <LivePreview />
        </div>
      </div>
    </div>
  );
}
