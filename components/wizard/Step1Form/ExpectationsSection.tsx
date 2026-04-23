'use client';

import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FieldGroup } from '@/components/wizard/SectionCard';

export function ExpectationsSection() {
  const { t } = useTranslation('common');
  const expectations = useBiodataStore((s) => s.formData.expectations);
  const updateExpectations = useBiodataStore((s) => s.updateExpectations);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldGroup label={t('wizard.step1.expectations.ageRange')} htmlFor="field-exp-age">
          <Input
            id="field-exp-age"
            value={expectations.ageRange}
            onChange={(e) => updateExpectations({ ageRange: e.target.value })}
            placeholder="e.g. 25–30"
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.expectations.height')} htmlFor="field-exp-height">
          <Input
            id="field-exp-height"
            value={expectations.height}
            onChange={(e) => updateExpectations({ height: e.target.value })}
            placeholder={`e.g. 5'6" and above`}
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.expectations.complexion')} htmlFor="field-exp-complexion">
          <Input
            id="field-exp-complexion"
            value={expectations.complexion}
            onChange={(e) => updateExpectations({ complexion: e.target.value })}
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.expectations.education')} htmlFor="field-exp-edu">
          <Input
            id="field-exp-edu"
            value={expectations.education}
            onChange={(e) => updateExpectations({ education: e.target.value })}
            placeholder="e.g. Graduate and above"
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.expectations.profession')} htmlFor="field-exp-prof">
          <Input
            id="field-exp-prof"
            value={expectations.profession}
            onChange={(e) => updateExpectations({ profession: e.target.value })}
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.expectations.district')} htmlFor="field-exp-district">
          <Input
            id="field-exp-district"
            value={expectations.district}
            onChange={(e) => updateExpectations({ district: e.target.value })}
            className="w-full"
          />
        </FieldGroup>
      </div>

      <FieldGroup label={t('wizard.step1.expectations.otherRequirements')} htmlFor="field-exp-other">
        <Textarea
          id="field-exp-other"
          value={expectations.otherRequirements}
          onChange={(e) => updateExpectations({ otherRequirements: e.target.value })}
          placeholder="Any other preferences or requirements..."
          rows={3}
        />
      </FieldGroup>
    </div>
  );
}
