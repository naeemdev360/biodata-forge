'use client';

import Link from 'next/link';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import i18n from '@/lib/i18n-client';

export function Navbar() {
  const { t } = useTranslation('common');
  const language = useBiodataStore((s) => s.language);
  const setLanguage = useBiodataStore((s) => s.setLanguage);

  function toggleLanguage() {
    const next = language === 'en' ? 'bn' : 'en';
    setLanguage(next);
    i18n.changeLanguage(next);
  }

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl border-b"
      style={{
        background: 'rgba(254,249,240,0.88)',
        borderColor: 'rgba(212,130,42,0.12)',
      }}
    >
      <Link href="/" className="no-underline">
        <span
          className="tracking-tight select-none"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          <span style={{ color: '#D4822A' }}>Biodata</span>
          <span style={{ color: '#242220' }}>Forge</span>
        </span>
      </Link>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={toggleLanguage}
          className="inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-full transition-all duration-150 cursor-pointer hover:bg-white/60"
          style={{
            color: '#58534E',
            border: '1.5px solid #CCC8C1',
            background: 'rgba(255,255,255,0.4)',
          }}
        >
          <Globe size={13} />
          {language === 'en' ? 'বাংলা' : 'English'}
        </button>

        <Link
          href="/create"
          className="text-sm font-semibold px-4 py-2 rounded-full no-underline transition-all duration-150 inline-block"
          style={{
            background: '#D4822A',
            color: '#fff',
            boxShadow: '0 2px 10px rgba(212,130,42,0.4)',
          }}
        >
          {t('common.startCreating')} →
        </Link>
      </div>
    </header>
  );
}
