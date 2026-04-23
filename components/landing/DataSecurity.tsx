'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Shield, ServerOff, Trash2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TRUST_ITEMS = [
  {
    Icon: Shield,
    title: 'Stays in Your Browser',
    body: 'Your biodata is saved only in your browser\'s local storage. Nothing is transmitted to any server — not even anonymously.',
  },
  {
    Icon: ServerOff,
    title: 'Zero Data Collection',
    body: 'We don\'t have a database of your information. No account, no sign-up, no tracking — your personal details belong to you alone.',
  },
  {
    Icon: Trash2,
    title: 'Delete Anytime',
    body: 'Hit "Start Fresh" to instantly wipe all data from your device. Closing the tab or clearing browser storage achieves the same.',
  },
] as const;

export function DataSecurity() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const header = containerRef.current!.querySelector<HTMLElement>('.ds-header')!;
      const cards = gsap.utils.toArray<HTMLElement>('.ds-card');

      gsap.set(header, { opacity: 0, y: 30 });
      gsap.set(cards, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(header, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.18,
            ease: 'power2.out',
            delay: 0.25,
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-24 px-6"
      style={{ background: '#FFFFFF' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="ds-header text-center mb-14">
          {/* Shield badge */}
          <div className="flex justify-center mb-5">
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full"
              style={{
                background: 'rgba(212,130,42,0.08)',
                color: '#A8601E',
                border: '1px solid rgba(212,130,42,0.2)',
              }}
            >
              <Shield size={12} />
              Privacy & Security
            </div>
          </div>

          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              color: '#242220',
              letterSpacing: '-0.02em',
            }}
          >
            Your Data Never Leaves
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #D4822A 0%, #7D4315 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Your Device
            </span>
          </h2>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: 'rgba(212,130,42,0.3)' }} />
            <span style={{ color: '#D4822A', fontSize: '1.1rem' }}>✦</span>
            <div className="h-px w-12" style={{ background: 'rgba(212,130,42,0.3)' }} />
          </div>

          <p
            className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: '#6B6560' }}
          >
            Your marriage biodata contains sensitive personal information. We designed
            BiodataForge so that <strong style={{ color: '#242220' }}>we can never see it</strong> — because we never receive it.
          </p>
        </div>

        {/* Trust cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {TRUST_ITEMS.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="ds-card rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: 'linear-gradient(135deg, #FAFAF9 0%, #FDF6EC 100%)',
                border: '1px solid rgba(212,130,42,0.14)',
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #FDF0D9 0%, #FAD99A 100%)',
                  color: '#D4822A',
                }}
              >
                <Icon size={20} />
              </div>
              <div>
                <h3
                  className="font-bold text-base mb-1.5"
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    color: '#242220',
                    fontSize: '1.1rem',
                  }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B6560' }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Technical note strip */}
        <div
          className="rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm"
          style={{
            background: 'rgba(212,130,42,0.05)',
            border: '1px solid rgba(212,130,42,0.12)',
            color: '#6B6560',
          }}
        >
          <Shield size={15} style={{ color: '#D4822A', flexShrink: 0, marginTop: '1px' }} />
          <span>
            <strong style={{ color: '#242220' }}>How it works technically:</strong>{' '}
            BiodataForge runs entirely in your browser. Form data is auto-saved to{' '}
            <code
              className="px-1.5 py-0.5 rounded text-xs"
              style={{ background: 'rgba(212,130,42,0.1)', color: '#A8601E', fontFamily: 'monospace' }}
            >
              localStorage
            </code>{' '}
            on your device only. No APIs are called with your personal data. PDF generation
            happens client-side using your browser&apos;s built-in print engine.
          </span>
        </div>
      </div>
    </section>
  );
}
