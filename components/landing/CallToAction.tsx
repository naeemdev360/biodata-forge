'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Globe, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import i18n from '@/lib/i18n-client';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CallToAction() {
  const { t } = useTranslation('common');
  const containerRef = useRef<HTMLElement>(null);
  const language = useBiodataStore((s) => s.language);
  const setLanguage = useBiodataStore((s) => s.setLanguage);

  function switchLanguage(lang: 'en' | 'bn') {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  }

  useGSAP(
    () => {
      const content = containerRef.current!.querySelector<HTMLElement>('.cta-content')!;

      gsap.set(content, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(content, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="cta-section py-28 px-6 relative overflow-hidden"
      style={{
        background: [
          'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,130,42,0.11) 0%, transparent 65%)',
          'linear-gradient(180deg, #FAFAF9 0%, #FFF8EE 50%, #FAFAF9 100%)',
        ].join(', '),
      }}
    >
      {/* Decorative rings */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(212,130,42,0.07)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ border: '1px solid rgba(212,130,42,0.11)' }}
      />

      <div className="cta-content relative z-10 max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-7">
          <div className="h-px w-16" style={{ background: 'rgba(212,130,42,0.3)' }} />
          <span style={{ color: '#D4822A', fontSize: '1.2rem' }}>✦</span>
          <div className="h-px w-16" style={{ background: 'rgba(212,130,42,0.3)' }} />
        </div>

        <h2
          className="text-4xl sm:text-5xl font-bold mb-4"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            color: '#242220',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
          }}
        >
          {t('landing.cta.title')}
        </h2>

        <p className="text-base sm:text-lg mb-10" style={{ color: '#6B6560' }}>
          {t('landing.cta.subtitle')}
        </p>

        <Link
          href="/create"
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base no-underline transition-all duration-200 hover:shadow-2xl hover:-translate-y-1 mb-12"
          style={{
            background: 'linear-gradient(135deg, #D4822A 0%, #A8601E 100%)',
            color: '#fff',
            boxShadow: '0 6px 28px rgba(212,130,42,0.45), 0 1px 4px rgba(0,0,0,0.1)',
          }}
        >
          {t('landing.cta.button')}
          <ArrowRight size={18} />
        </Link>

        {/* Language switcher row */}
        <div className="flex items-center justify-center gap-2.5">
          <Globe size={14} style={{ color: '#A39F98' }} />
          <span className="text-xs" style={{ color: '#A39F98' }}>
            Language:
          </span>
          {(['en', 'bn'] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => switchLanguage(lang)}
              className="text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-150 cursor-pointer"
              style={{
                background: language === lang ? 'rgba(212,130,42,0.12)' : 'transparent',
                color: language === lang ? '#D4822A' : '#A39F98',
                border:
                  language === lang
                    ? '1px solid rgba(212,130,42,0.3)'
                    : '1px solid transparent',
              }}
            >
              {lang === 'en' ? 'English' : 'বাংলা'}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
