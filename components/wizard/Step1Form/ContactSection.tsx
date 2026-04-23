'use client';

import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FieldGroup } from '@/components/wizard/SectionCard';

interface ContactSectionProps {
  errors: Record<string, string>;
}

export function ContactSection({ errors }: ContactSectionProps) {
  const { t } = useTranslation('common');
  const contact = useBiodataStore((s) => s.formData.contact);
  const updateContact = useBiodataStore((s) => s.updateContact);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldGroup
          label={t('wizard.step1.contact.phone')}
          required
          error={errors['contact.phone']}
          htmlFor="field-contact-phone"
        >
          <Input
            id="field-contact-phone"
            type="tel"
            value={contact.phone}
            onChange={(e) => updateContact({ phone: e.target.value })}
            placeholder="e.g. +880 1700-000000"
            aria-invalid={!!errors['contact.phone']}
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup
          label={t('wizard.step1.contact.email')}
          error={errors['contact.email']}
          htmlFor="field-contact-email"
        >
          <Input
            id="field-contact-email"
            type="email"
            value={contact.email}
            onChange={(e) => updateContact({ email: e.target.value })}
            placeholder="e.g. name@email.com"
            aria-invalid={!!errors['contact.email']}
            className="w-full"
          />
        </FieldGroup>
      </div>

      <FieldGroup
        label={t('wizard.step1.contact.presentAddress')}
        required
        error={errors['contact.presentAddress']}
        htmlFor="field-contact-presentAddress"
      >
        <Textarea
          id="field-contact-presentAddress"
          value={contact.presentAddress}
          onChange={(e) => updateContact({ presentAddress: e.target.value })}
          placeholder="House, Road, Area, City"
          aria-invalid={!!errors['contact.presentAddress']}
          rows={3}
        />
      </FieldGroup>

      <FieldGroup label={t('wizard.step1.contact.permanentAddress')} htmlFor="field-contact-permanentAddress">
        <Textarea
          id="field-contact-permanentAddress"
          value={contact.permanentAddress}
          onChange={(e) => updateContact({ permanentAddress: e.target.value })}
          placeholder="Permanent / village address (if different)"
          rows={3}
        />
      </FieldGroup>
    </div>
  );
}
