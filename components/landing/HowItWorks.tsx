'use client';

import '@/lib/i18n-client';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardList, Download, Palette } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEP_ICONS = [ClipboardList, Palette, Download] as const;
const STEP_KEYS = ['step1', 'step2', 'step3'] as const;
const STEP_DISPLAY_NUMS = ['01', '02', '03'] as const;

export function HowItWorks() {
  const { t } = useTranslation('common');
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const header = containerRef.current!.querySelector<HTMLElement>('.hiw-header')!;
      const steps = gsap.utils.toArray<HTMLElement>('.step-card');

      gsap.set(header, { opacity: 0, y: 30 });
      gsap.set(steps, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(header, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
          gsap.to(steps, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out',
            delay: 0.3,
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="how-it-works-section py-28 px-6"
      style={{
        background: [
          'radial-gradient(ellipse 60% 50% at 20% 20%, rgba(212,130,42,0.08) 0%, transparent 55%)',
          'radial-gradient(ellipse 50% 40% at 80% 80%, rgba(245,190,92,0.06) 0%, transparent 50%)',
          'linear-gradient(180deg, #FAFAF9 0%, #FDF6EC 50%, #FAFAF9 100%)',
        ].join(', '),
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="hiw-header text-center mb-20">
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              color: '#242220',
              letterSpacing: '-0.02em',
            }}
          >
            {t('landing.howItWorks.title')}
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12" style={{ background: 'rgba(212,130,42,0.3)' }} />
            <span style={{ color: '#D4822A', fontSize: '1.1rem' }}>✦</span>
            <div className="h-px w-12" style={{ background: 'rgba(212,130,42,0.3)' }} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Dashed connector line (desktop) */}
          <div
            className="hidden md:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px"
            style={{
              background:
                'repeating-linear-gradient(90deg, #D4822A 0px, #D4822A 6px, transparent 6px, transparent 14px)',
              opacity: 0.3,
            }}
          />

          {STEP_KEYS.map((key, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <StepCard
                key={key}
                displayNum={STEP_DISPLAY_NUMS[i]}
                icon={<Icon size={22} />}
                label={t(`landing.howItWorks.${key}.label`)}
                description={t(`landing.howItWorks.${key}.description`)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface StepCardProps {
  displayNum: string;
  icon: React.ReactNode;
  label: string;
  description: string;
}

function StepCard({ displayNum, icon, label, description }: StepCardProps) {
  return (
    <div className="step-card flex flex-col items-center text-center gap-5 relative pt-8">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none select-none leading-none"
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '7rem',
          fontWeight: 700,
          color: '#D4822A',
          opacity: 0.06,
          lineHeight: 1,
        }}
        aria-hidden
      >
        {displayNum}
      </div>

      <div className="relative z-10">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #FDF0D9 0%, #FAD99A 100%)',
            color: '#D4822A',
            boxShadow: '0 4px 20px rgba(212,130,42,0.2)',
          }}
        >
          <div style={{ transform: 'scale(1.2)' }}>{icon}</div>
        </div>
      </div>

      <div>
        <h3
          className="font-bold text-xl mb-2"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            color: '#242220',
            letterSpacing: '-0.01em',
          }}
        >
          {label}
        </h3>
        <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: '#6B6560' }}>
          {description}
        </p>
      </div>
    </div>
  );
}
