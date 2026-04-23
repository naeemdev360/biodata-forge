'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/wizard/SectionCard';
import { FAMILY_TYPES } from '@/lib/constants';

interface FamilySectionProps {
  errors: Record<string, string>;
}

const rowVariants = {
  initial: { opacity: 0, height: 0, y: -8 },
  animate: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit: { opacity: 0, height: 0, y: -8, transition: { duration: 0.2 } },
};

const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
] as const;

export function FamilySection({ errors }: FamilySectionProps) {
  const { t } = useTranslation('common');
  const family = useBiodataStore((s) => s.formData.family);
  const siblings = useBiodataStore((s) => s.formData.siblings);
  const updateFamily = useBiodataStore((s) => s.updateFamily);
  const addSibling = useBiodataStore((s) => s.addSiblingEntry);
  const updateSibling = useBiodataStore((s) => s.updateSiblingEntry);
  const removeSibling = useBiodataStore((s) => s.removeSiblingEntry);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldGroup
          label={t('wizard.step1.family.fatherName')}
          required
          error={errors['family.fatherName']}
          htmlFor="field-family-fatherName"
        >
          <Input
            id="field-family-fatherName"
            value={family.fatherName}
            onChange={(e) => updateFamily({ fatherName: e.target.value })}
            placeholder="Father's full name"
            aria-invalid={!!errors['family.fatherName']}
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.family.fatherOccupation')} htmlFor="field-family-fatherOcc">
          <Input
            id="field-family-fatherOcc"
            value={family.fatherOccupation}
            onChange={(e) => updateFamily({ fatherOccupation: e.target.value })}
            placeholder="e.g. Businessman"
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.family.motherName')} htmlFor="field-family-motherName">
          <Input
            id="field-family-motherName"
            value={family.motherName}
            onChange={(e) => updateFamily({ motherName: e.target.value })}
            placeholder="Mother's full name"
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.family.motherOccupation')} htmlFor="field-family-motherOcc">
          <Input
            id="field-family-motherOcc"
            value={family.motherOccupation}
            onChange={(e) => updateFamily({ motherOccupation: e.target.value })}
            placeholder="e.g. Housewife"
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.family.brotherCount')} htmlFor="field-family-brothers">
          <Input
            id="field-family-brothers"
            type="number"
            min={0}
            value={family.brotherCount || ''}
            onChange={(e) => updateFamily({ brotherCount: parseInt(e.target.value) || 0 })}
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.family.sisterCount')} htmlFor="field-family-sisters">
          <Input
            id="field-family-sisters"
            type="number"
            min={0}
            value={family.sisterCount || ''}
            onChange={(e) => updateFamily({ sisterCount: parseInt(e.target.value) || 0 })}
            className="w-full"
          />
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.family.familyType.label')} htmlFor="field-family-type">
          <Select
            value={family.familyType || null}
            onValueChange={(val) => updateFamily({ familyType: (val ?? '') as 'nuclear' | 'joint' | '' })}
          >
            <SelectTrigger id="field-family-type" className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {FAMILY_TYPES.map((ft) => (
                <SelectItem key={ft.value} value={ft.value}>
                  {t(ft.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FieldGroup>

        <FieldGroup label={t('wizard.step1.family.familyStatus')} htmlFor="field-family-status">
          <Input
            id="field-family-status"
            value={family.familyStatus}
            onChange={(e) => updateFamily({ familyStatus: e.target.value })}
            placeholder="e.g. Middle class"
            className="w-full"
          />
        </FieldGroup>

        <div className="sm:col-span-2">
          <FieldGroup label={t('wizard.step1.family.nativeDistrict')} htmlFor="field-family-district">
            <Input
              id="field-family-district"
              value={family.nativeDistrict}
              onChange={(e) => updateFamily({ nativeDistrict: e.target.value })}
              placeholder="e.g. Comilla, Chittagong"
              className="w-full"
            />
          </FieldGroup>
        </div>
      </div>

      {/* Siblings */}
      <div className="pt-2">
        <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
          {t('wizard.step1.family.siblings.sectionTitle')}
        </p>
        <div className="space-y-3" aria-live="polite">
          <AnimatePresence initial={false}>
            {siblings.map((sib, idx) => (
              <motion.div
                key={sib.id}
                variants={rowVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="overflow-hidden"
              >
                <div
                  className="rounded-lg border p-3"
                  style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-base)' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                      #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSibling(sib.id)}
                      className="p-1 rounded-md cursor-pointer"
                      style={{ color: 'var(--color-error)' }}
                      aria-label={t('common.remove')}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <FieldGroup label={t('wizard.step1.family.siblings.name')} htmlFor={`sib-${idx}-name`}>
                      <Input
                        id={`sib-${idx}-name`}
                        value={sib.name}
                        onChange={(e) => updateSibling(sib.id, { name: e.target.value })}
                        className="w-full"
                      />
                    </FieldGroup>
                    <FieldGroup label={t('wizard.step1.family.siblings.gender')} htmlFor={`sib-${idx}-gender`}>
                      <Select
                        value={sib.gender || null}
                        onValueChange={(val) => updateSibling(sib.id, { gender: (val ?? '') as 'male' | 'female' | '' })}
                      >
                        <SelectTrigger id={`sib-${idx}-gender`} className="w-full">
                          <SelectValue placeholder="—" />
                        </SelectTrigger>
                        <SelectContent>
                          {GENDERS.map((g) => (
                            <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FieldGroup>
                    <FieldGroup label={t('wizard.step1.family.siblings.maritalStatus')} htmlFor={`sib-${idx}-ms`}>
                      <Input
                        id={`sib-${idx}-ms`}
                        value={sib.maritalStatus}
                        onChange={(e) => updateSibling(sib.id, { maritalStatus: e.target.value })}
                        placeholder="e.g. Married"
                        className="w-full"
                      />
                    </FieldGroup>
                    <FieldGroup label={t('wizard.step1.family.siblings.profession')} htmlFor={`sib-${idx}-prof`}>
                      <Input
                        id={`sib-${idx}-prof`}
                        value={sib.profession}
                        onChange={(e) => updateSibling(sib.id, { profession: e.target.value })}
                        className="w-full"
                      />
                    </FieldGroup>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={addSibling}
          className="w-full gap-2 border-dashed mt-3"
        >
          <Plus size={16} />
          {t('wizard.step1.family.siblings.addSibling')}
        </Button>
      </div>
    </div>
  );
}
