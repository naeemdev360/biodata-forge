'use client';

import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import { Input } from '@/components/ui/input';
import { FieldGroup } from '@/components/wizard/SectionCard';

export function ReligiousSection() {
  const { t } = useTranslation('common');
  const religious = useBiodataStore((s) => s.formData.religious);
  const updateReligious = useBiodataStore((s) => s.updateReligious);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <FieldGroup label={t('wizard.step1.religious.sect')} htmlFor="field-religious-sect">
        <Input
          id="field-religious-sect"
          value={religious.sect}
          onChange={(e) => updateReligious({ sect: e.target.value })}
          placeholder="e.g. Sunni"
          className="w-full"
        />
      </FieldGroup>

      <FieldGroup label={t('wizard.step1.religious.prayerHabit')} htmlFor="field-religious-prayer">
        <Input
          id="field-religious-prayer"
          value={religious.prayerHabit}
          onChange={(e) => updateReligious({ prayerHabit: e.target.value })}
          placeholder="e.g. Regular, 5 times daily"
          className="w-full"
        />
      </FieldGroup>
    </div>
  );
}
