'use client';

import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import {
  UserCircle,
  GraduationCap,
  Briefcase,
  Users,
  Phone,
  Star,
  Heart,
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import { isAdult } from '@/lib/utils';
import { PersonalSection } from './PersonalSection';
import { EducationSection } from './EducationSection';
import { ProfessionalSection } from './ProfessionalSection';
import { FamilySection } from './FamilySection';
import { ContactSection } from './ContactSection';
import { ReligiousSection } from './ReligiousSection';
import { ExpectationsSection } from './ExpectationsSection';

export interface Step1FormHandle {
  validate: () => boolean;
}

function isSectionFilled(formData: ReturnType<typeof useBiodataStore.getState>['formData'], key: string): boolean {
  switch (key) {
    case 'personal': return !!(formData.personal.fullName || formData.personal.dateOfBirth);
    case 'education': return formData.education.some((e) => e.degree || e.institution);
    case 'professional': return formData.professional.some((p) => p.title || p.organization);
    case 'family': return !!(formData.family.fatherName);
    case 'contact': return !!(formData.contact.phone || formData.contact.presentAddress);
    case 'religious': return !!(formData.religious.sect || formData.religious.prayerHabit);
    case 'expectations': return !!(formData.expectations.ageRange || formData.expectations.education);
    default: return false;
  }
}

const REQUIRED_SECTIONS = ['personal', 'education', 'family', 'contact'];

export const Step1Form = forwardRef<Step1FormHandle>(function Step1Form(_, ref) {
  const { t } = useTranslation('common');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openSections, setOpenSections] = useState<string[]>(REQUIRED_SECTIONS);
  const formData = useBiodataStore((s) => s.formData);

  useImperativeHandle(ref, () => ({
    validate() {
      const fd = useBiodataStore.getState().formData;
      const newErrors: Record<string, string> = {};

      if (!fd.personal.fullName || fd.personal.fullName.trim().length < 2)
        newErrors['personal.fullName'] = t('errors.minChars', { count: 2 });

      if (!fd.personal.dateOfBirth)
        newErrors['personal.dateOfBirth'] = t('errors.required');
      else if (!isAdult(fd.personal.dateOfBirth))
        newErrors['personal.dateOfBirth'] = t('errors.mustBeAdult');

      if (!fd.personal.maritalStatus)
        newErrors['personal.maritalStatus'] = t('errors.required');

      if (!fd.education[0]?.degree?.trim())
        newErrors['education.0.degree'] = t('errors.required');
      if (!fd.education[0]?.institution?.trim())
        newErrors['education.0.institution'] = t('errors.required');

      if (!fd.family.fatherName?.trim())
        newErrors['family.fatherName'] = t('errors.required');

      if (!fd.contact.phone?.trim())
        newErrors['contact.phone'] = t('errors.required');
      if (!fd.contact.presentAddress?.trim())
        newErrors['contact.presentAddress'] = t('errors.required');

      if (fd.contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.contact.email))
        newErrors['contact.email'] = t('errors.invalidEmail');

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) return true;

      // Open sections that contain errors
      const errorSections = Object.keys(newErrors).map((k) => k.split('.')[0]);
      const sectionsToOpen = [...new Set([...openSections, ...errorSections])];
      setOpenSections(sectionsToOpen);

      // Scroll to first error
      const firstKey = Object.keys(newErrors)[0];
      const fieldId = `field-${firstKey.replace(/\./g, '-')}`;
      setTimeout(() => {
        document.getElementById(fieldId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

      return false;
    },
  }));

  const sections = [
    {
      id: 'personal',
      icon: <UserCircle size={18} />,
      titleKey: 'wizard.step1.personal.sectionTitle',
      optional: false,
      content: <PersonalSection errors={errors} />,
    },
    {
      id: 'education',
      icon: <GraduationCap size={18} />,
      titleKey: 'wizard.step1.education.sectionTitle',
      optional: false,
      content: <EducationSection errors={errors} />,
    },
    {
      id: 'professional',
      icon: <Briefcase size={18} />,
      titleKey: 'wizard.step1.professional.sectionTitle',
      optional: true,
      content: <ProfessionalSection />,
    },
    {
      id: 'family',
      icon: <Users size={18} />,
      titleKey: 'wizard.step1.family.sectionTitle',
      optional: false,
      content: <FamilySection errors={errors} />,
    },
    {
      id: 'contact',
      icon: <Phone size={18} />,
      titleKey: 'wizard.step1.contact.sectionTitle',
      optional: false,
      content: <ContactSection errors={errors} />,
    },
    {
      id: 'religious',
      icon: <Star size={18} />,
      titleKey: 'wizard.step1.religious.sectionTitle',
      optional: true,
      content: <ReligiousSection />,
    },
    {
      id: 'expectations',
      icon: <Heart size={18} />,
      titleKey: 'wizard.step1.expectations.sectionTitle',
      optional: true,
      content: <ExpectationsSection />,
    },
  ];

  return (
    <div className="space-y-2">
      <h1
        className="text-2xl font-bold mb-6"
        style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
      >
        {t('wizard.step1.title')}
      </h1>

      <Accordion
        multiple
        value={openSections}
        onValueChange={(val) => setOpenSections(val as string[])}
        className="space-y-3"
      >
        {sections.map(({ id, icon, titleKey, optional, content }) => {
          const filled = isSectionFilled(formData, id);
          return (
            <AccordionItem
              key={id}
              value={id}
              className="rounded-xl border overflow-hidden"
              style={{
                borderColor: 'var(--border-subtle)',
                background: 'var(--bg-surface)',
                boxShadow: 'var(--shadow-warm-sm)',
              }}
            >
              <AccordionTrigger
                className="px-5 py-4 hover:no-underline"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-brand-100)', color: 'var(--accent)' }}
                  >
                    {icon}
                  </div>
                  <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {t(titleKey)}
                  </span>
                  <div className="flex items-center gap-1.5 ml-1">
                    {filled && (
                      <span
                        className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                        style={{ background: '#EDFAF3', color: 'var(--color-success)' }}
                      >
                        ✓
                      </span>
                    )}
                    {optional && (
                      <span
                        className="text-xs font-medium uppercase tracking-wide px-1.5 py-0.5 rounded-full"
                        style={{ color: 'var(--text-muted)', background: 'var(--bg-elevated)' }}
                      >
                        {t('common.optional')}
                      </span>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-1">
                {content}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
});
