'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/wizard/SectionCard';

const rowVariants = {
  initial: { opacity: 0, height: 0, y: -8 },
  animate: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit: { opacity: 0, height: 0, y: -8, transition: { duration: 0.2 } },
};

export function ProfessionalSection() {
  const { t } = useTranslation('common');
  const entries = useBiodataStore((s) => s.formData.professional);
  const addEntry = useBiodataStore((s) => s.addProfessionalEntry);
  const updateEntry = useBiodataStore((s) => s.updateProfessionalEntry);
  const removeEntry = useBiodataStore((s) => s.removeProfessionalEntry);

  return (
    <div className="space-y-4" aria-live="polite">
      <AnimatePresence initial={false}>
        {entries.map((entry, idx) => (
          <motion.div
            key={entry.id}
            variants={rowVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="overflow-hidden"
          >
            <div
              className="rounded-lg border p-4 space-y-3"
              style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-base)' }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                  #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeEntry(entry.id)}
                  className="p-1 rounded-md transition-colors cursor-pointer"
                  style={{ color: 'var(--color-error)' }}
                  aria-label={t('common.remove')}
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldGroup label={t('wizard.step1.professional.title')} htmlFor={`field-pro-${idx}-title`}>
                  <Input
                    id={`field-pro-${idx}-title`}
                    value={entry.title}
                    onChange={(e) => updateEntry(entry.id, { title: e.target.value })}
                    placeholder="e.g. Software Engineer"
                    className="w-full"
                  />
                </FieldGroup>

                <FieldGroup label={t('wizard.step1.professional.organization')} htmlFor={`field-pro-${idx}-org`}>
                  <Input
                    id={`field-pro-${idx}-org`}
                    value={entry.organization}
                    onChange={(e) => updateEntry(entry.id, { organization: e.target.value })}
                    placeholder="e.g. BRAC"
                    className="w-full"
                  />
                </FieldGroup>

                <FieldGroup label={t('wizard.step1.professional.duration')} htmlFor={`field-pro-${idx}-duration`}>
                  <Input
                    id={`field-pro-${idx}-duration`}
                    value={entry.duration}
                    onChange={(e) => updateEntry(entry.id, { duration: e.target.value })}
                    placeholder="e.g. 2021 – Present"
                    className="w-full"
                  />
                </FieldGroup>

                <FieldGroup label={t('wizard.step1.professional.income')} htmlFor={`field-pro-${idx}-income`}>
                  <Input
                    id={`field-pro-${idx}-income`}
                    value={entry.income}
                    onChange={(e) => updateEntry(entry.id, { income: e.target.value })}
                    placeholder="e.g. ৳80,000/month"
                    className="w-full"
                  />
                </FieldGroup>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        type="button"
        variant="outline"
        onClick={addEntry}
        className="w-full gap-2 border-dashed"
      >
        <Plus size={16} />
        {t('wizard.step1.professional.addEntry')}
      </Button>
    </div>
  );
}
