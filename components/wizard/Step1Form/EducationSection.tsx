'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/wizard/SectionCard';

interface EducationSectionProps {
  errors: Record<string, string>;
}

const rowVariants = {
  initial: { opacity: 0, height: 0, y: -8 },
  animate: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit: { opacity: 0, height: 0, y: -8, transition: { duration: 0.2 } },
};

export function EducationSection({ errors }: EducationSectionProps) {
  const { t } = useTranslation('common');
  const entries = useBiodataStore((s) => s.formData.education);
  const addEntry = useBiodataStore((s) => s.addEducationEntry);
  const updateEntry = useBiodataStore((s) => s.updateEducationEntry);
  const removeEntry = useBiodataStore((s) => s.removeEducationEntry);

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
                {entries.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEntry(entry.id)}
                    className="p-1 rounded-md transition-colors cursor-pointer"
                    style={{ color: 'var(--color-error)' }}
                    aria-label={t('common.remove')}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FieldGroup
                  label={t('wizard.step1.education.degree')}
                  required={idx === 0}
                  error={errors[`education.${idx}.degree`]}
                  htmlFor={`field-education-${idx}-degree`}
                >
                  <Input
                    id={`field-education-${idx}-degree`}
                    value={entry.degree}
                    onChange={(e) => updateEntry(entry.id, { degree: e.target.value })}
                    placeholder="e.g. BSc, MBBS, HSC"
                    aria-invalid={!!errors[`education.${idx}.degree`]}
                    className="w-full"
                  />
                </FieldGroup>

                <FieldGroup
                  label={t('wizard.step1.education.institution')}
                  required={idx === 0}
                  error={errors[`education.${idx}.institution`]}
                  htmlFor={`field-education-${idx}-institution`}
                >
                  <Input
                    id={`field-education-${idx}-institution`}
                    value={entry.institution}
                    onChange={(e) => updateEntry(entry.id, { institution: e.target.value })}
                    placeholder="e.g. Dhaka University"
                    aria-invalid={!!errors[`education.${idx}.institution`]}
                    className="w-full"
                  />
                </FieldGroup>

                <FieldGroup label={t('wizard.step1.education.passingYear')} htmlFor={`field-education-${idx}-year`}>
                  <Input
                    id={`field-education-${idx}-year`}
                    value={entry.passingYear}
                    onChange={(e) => updateEntry(entry.id, { passingYear: e.target.value })}
                    placeholder="e.g. 2022"
                    className="w-full"
                  />
                </FieldGroup>

                <FieldGroup label={t('wizard.step1.education.result')} htmlFor={`field-education-${idx}-result`}>
                  <Input
                    id={`field-education-${idx}-result`}
                    value={entry.result}
                    onChange={(e) => updateEntry(entry.id, { result: e.target.value })}
                    placeholder="e.g. GPA 5.00, First Class"
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
        {t('wizard.step1.education.addEntry')}
      </Button>
    </div>
  );
}
