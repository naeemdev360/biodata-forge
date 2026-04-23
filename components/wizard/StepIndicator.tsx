'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3;
}

const STEPS = [
  { num: 1 as const, labelKey: 'wizard.step1.title' },
  { num: 2 as const, labelKey: 'wizard.step2.title' },
  { num: 3 as const, labelKey: 'wizard.step3.title' },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const { t } = useTranslation('common');

  return (
    <div className="flex items-center justify-center" role="tablist" aria-label="Wizard steps">
      {STEPS.map(({ num, labelKey }, idx) => {
        const status = num < currentStep ? 'completed' : num === currentStep ? 'active' : 'upcoming';
        return (
          <div key={num} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5" role="tab" aria-selected={status === 'active'}>
              <motion.div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
                animate={{
                  background:
                    status === 'completed'
                      ? 'var(--accent)'
                      : status === 'active'
                        ? 'var(--color-brand-100)'
                        : 'var(--bg-elevated)',
                  color:
                    status === 'completed' ? '#fff' : status === 'active' ? 'var(--accent)' : 'var(--text-muted)',
                }}
                transition={{ duration: 0.3 }}
                style={{
                  border:
                    status === 'active'
                      ? '2px solid var(--accent)'
                      : status === 'upcoming'
                        ? '2px solid var(--border-subtle)'
                        : 'none',
                }}
              >
                {status === 'completed' ? <Check size={16} /> : num}
              </motion.div>
              <span
                className="text-xs font-medium hidden sm:block"
                style={{
                  color:
                    status === 'active'
                      ? 'var(--accent)'
                      : status === 'completed'
                        ? 'var(--text-secondary)'
                        : 'var(--text-muted)',
                }}
              >
                {t(labelKey)}
              </span>
            </div>

            {idx < STEPS.length - 1 && (
              <div
                className="w-16 sm:w-24 h-0.5 mx-2 mb-5 relative overflow-hidden rounded-full"
                style={{ background: 'var(--border-subtle)' }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: 'var(--accent)' }}
                  animate={{ width: num < currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
