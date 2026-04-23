'use client';

import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { FieldGroup } from '@/components/wizard/SectionCard';
import { BLOOD_GROUPS, RELIGIONS, MARITAL_STATUSES } from '@/lib/constants';

interface PersonalSectionProps {
  errors: Record<string, string>;
}

export function PersonalSection({ errors }: PersonalSectionProps) {
  const { t } = useTranslation('common');
  const personal = useBiodataStore((s) => s.formData.personal);
  const photo = useBiodataStore((s) => s.formData.photo);
  const updatePersonal = useBiodataStore((s) => s.updatePersonal);
  const setPhoto = useBiodataStore((s) => s.setPhoto);

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <ImageUpload value={photo} onChange={setPhoto} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldGroup
          label={t('wizard.step1.personal.fullName')}
          required
          error={errors['personal.fullName']}
          htmlFor="field-personal-fullName"
        >
          <Input
            id="field-personal-fullName"
            value={personal.fullName}
            onChange={(e) => updatePersonal({ fullName: e.target.value })}
            placeholder="e.g. Rahela Akter"
            aria-invalid={!!errors['personal.fullName']}
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup
          label={t('wizard.step1.personal.dateOfBirth')}
          required
          error={errors['personal.dateOfBirth']}
          htmlFor="field-personal-dateOfBirth"
        >
          <Input
            id="field-personal-dateOfBirth"
            type="date"
            value={personal.dateOfBirth}
            onChange={(e) => updatePersonal({ dateOfBirth: e.target.value })}
            aria-invalid={!!errors['personal.dateOfBirth']}
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.personal.placeOfBirth')} htmlFor="field-personal-placeOfBirth">
          <Input
            id="field-personal-placeOfBirth"
            value={personal.placeOfBirth}
            onChange={(e) => updatePersonal({ placeOfBirth: e.target.value })}
            placeholder="e.g. Dhaka"
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.personal.nationality')} htmlFor="field-personal-nationality">
          <Input
            id="field-personal-nationality"
            value={personal.nationality}
            onChange={(e) => updatePersonal({ nationality: e.target.value })}
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup
          label={t('wizard.step1.personal.maritalStatus.label')}
          required
          error={errors['personal.maritalStatus']}
          htmlFor="field-personal-maritalStatus"
        >
          <Select
            value={personal.maritalStatus || null}
            onValueChange={(val) => updatePersonal({ maritalStatus: (val ?? '') as 'never_married' | 'divorced' | 'widowed' | '' })}
          >
            <SelectTrigger id="field-personal-maritalStatus" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {MARITAL_STATUSES.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {t(s.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.personal.religion')} htmlFor="field-personal-religion">
          <Select
            value={personal.religion || null}
            onValueChange={(val) => updatePersonal({ religion: val ?? '' })}
          >
            <SelectTrigger id="field-personal-religion" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {RELIGIONS.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.personal.height')} htmlFor="field-personal-height">
          <Input
            id="field-personal-height"
            value={personal.height}
            onChange={(e) => updatePersonal({ height: e.target.value })}
            placeholder={`e.g. 5'6" or 168cm`}
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.physical.complexion')} htmlFor="field-personal-complexion">
          <Input
            id="field-personal-complexion"
            value={personal.complexion}
            onChange={(e) => updatePersonal({ complexion: e.target.value })}
            placeholder="e.g. Fair, Wheatish"
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.physical.bloodGroup')} htmlFor="field-personal-bloodGroup">
          <Select
            value={personal.bloodGroup || null}
            onValueChange={(val) => updatePersonal({ bloodGroup: val ?? '' })}
          >
            <SelectTrigger id="field-personal-bloodGroup" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {BLOOD_GROUPS.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldGroup>
      </div>
    </div>
  );
}
