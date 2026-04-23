'use client';

import { FONT_PAIRINGS } from '@/lib/constants';
import type { BiodataRenderProps, ColorPalette } from '@/types/biodata';
import { getActivePalette } from '@/components/biodata/BiodataRenderer';
import { EN_LABELS, BN_LABELS, type BioLabels } from '@/components/biodata/labels';

function resolveFonts(pairingId: string, isBn: boolean) {
  if (isBn) return { heading: "'Baloo Da 2', sans-serif", body: "'Hind Siliguri', sans-serif" };
  const fp = FONT_PAIRINGS.find((f) => f.id === pairingId) ?? FONT_PAIRINGS[0];
  const bodyFamily = fp.id === 'modern' ? "'DM Sans', system-ui, sans-serif" : `'${fp.bodyFont}', Georgia, serif`;
  return { heading: `'${fp.headingFont}', Georgia, serif`, body: bodyFamily };
}

function resolveMaritalStatus(value: string, L: BioLabels) {
  if (value === 'never_married') return L.neverMarried;
  if (value === 'divorced') return L.divorced;
  if (value === 'widowed') return L.widowed;
  return value;
}

interface SectionProps {
  title: string;
  palette: ColorPalette;
  headingFont: string;
  children: React.ReactNode;
}

function Section({ title, palette, headingFont, children }: SectionProps) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <div style={{ height: '1px', flex: 1, background: palette.border }} />
        <h2
          style={{
            fontFamily: headingFont,
            fontSize: '0.9rem',
            fontWeight: 600,
            color: palette.primary,
            margin: 0,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </h2>
        <div style={{ height: '1px', flex: 1, background: palette.border }} />
      </div>
      {children}
    </div>
  );
}

function FieldGrid({ fields, palette, bodyFont }: { fields: [string, string][]; palette: ColorPalette; bodyFont: string }) {
  const visible = fields.filter(([, v]) => v);
  if (!visible.length) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 24px' }}>
      {visible.map(([label, value]) => (
        <div key={label} style={{ fontSize: '0.83rem', fontFamily: bodyFont, lineHeight: 1.4 }}>
          <span style={{ color: palette.primary, fontWeight: 600 }}>{label}:</span>{' '}
          <span style={{ color: palette.text }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

export function ClassicElegant({ formData, customization, language }: BiodataRenderProps) {
  const palette = getActivePalette(customization);
  const { heading: headingFont, body: bodyFont } = resolveFonts(customization.fontPairing, language === 'bn');
  const L = language === 'bn' ? BN_LABELS : EN_LABELS;
  const { personal, physical, religious, education, professional, family, siblings, contact, expectations, photo } = formData;

  const hasPhysical = !!(physical.height || physical.weight || physical.complexion || physical.bloodGroup);
  const hasReligious = !!(religious.religion || religious.sect || religious.prayerHabit);
  const hasProfessional = professional.some((p) => p.title || p.organization);
  const hasSiblings = siblings.length > 0;
  const hasExpectations = !!(expectations.ageRange || expectations.profession || expectations.otherRequirements);

  return (
    <div
      style={{
        fontFamily: bodyFont,
        color: palette.text,
        background: palette.background,
        width: '794px',
        padding: '48px 56px',
        boxSizing: 'border-box',
        minHeight: '1123px',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ color: palette.accent, letterSpacing: '8px', fontSize: '0.7rem', marginBottom: '16px' }}>
          ── ✦ ──
        </div>
        {photo && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <img
              src={photo}
              alt=""
              style={{
                width: '112px',
                height: '112px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: `3px solid ${palette.border}`,
              }}
            />
          </div>
        )}
        {personal.fullName && (
          <h1
            style={{
              fontFamily: headingFont,
              fontSize: '2rem',
              fontWeight: 700,
              color: palette.primary,
              margin: '0 0 8px',
              letterSpacing: '-0.01em',
            }}
          >
            {personal.fullName}
          </h1>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            fontSize: '0.82rem',
            color: palette.text,
            opacity: 0.75,
          }}
        >
          {personal.dateOfBirth && <span>{L.dateOfBirth}: {personal.dateOfBirth}</span>}
          {personal.religion && <span>•&nbsp;{personal.religion}</span>}
          {personal.maritalStatus && <span>•&nbsp;{resolveMaritalStatus(personal.maritalStatus, L)}</span>}
        </div>
        <div style={{ color: palette.accent, letterSpacing: '8px', fontSize: '0.7rem', marginTop: '16px' }}>
          ── ✦ ──
        </div>
      </div>

      {/* Personal */}
      <Section title={L.personalInfo} palette={palette} headingFont={headingFont}>
        <FieldGrid
          palette={palette}
          bodyFont={bodyFont}
          fields={[
            [L.fullName, personal.fullName],
            [L.dateOfBirth, personal.dateOfBirth],
            [L.placeOfBirth, personal.placeOfBirth],
            [L.nationality, personal.nationality],
            [L.religion, personal.religion],
            [L.maritalStatus, resolveMaritalStatus(personal.maritalStatus, L)],
            [L.height, personal.height],
            [L.complexion, personal.complexion],
            [L.bloodGroup, personal.bloodGroup],
          ]}
        />
      </Section>

      {/* Education */}
      {education.some((e) => e.degree) && (
        <Section title={L.education} palette={palette} headingFont={headingFont}>
          {education.map((edu) =>
            edu.degree ? (
              <div key={edu.id} style={{ marginBottom: '6px', fontSize: '0.83rem', fontFamily: bodyFont }}>
                <span style={{ fontWeight: 600, color: palette.primary }}>{edu.degree}</span>
                {edu.institution && <span style={{ color: palette.text, opacity: 0.8 }}> — {edu.institution}</span>}
                {(edu.passingYear || edu.result) && (
                  <span style={{ color: palette.text, opacity: 0.6 }}>
                    {' '}({[edu.passingYear, edu.result].filter(Boolean).join(', ')})
                  </span>
                )}
              </div>
            ) : null
          )}
        </Section>
      )}

      {/* Professional */}
      {hasProfessional && (
        <Section title={L.professional} palette={palette} headingFont={headingFont}>
          {professional.map((pro) =>
            pro.title || pro.organization ? (
              <div key={pro.id} style={{ marginBottom: '6px', fontSize: '0.83rem', fontFamily: bodyFont }}>
                <span style={{ fontWeight: 600, color: palette.primary }}>{pro.title}</span>
                {pro.organization && <span style={{ opacity: 0.8 }}> — {pro.organization}</span>}
                {pro.duration && <span style={{ opacity: 0.6 }}> ({pro.duration})</span>}
                {pro.income && <span style={{ opacity: 0.6 }}>, {L.income}: {pro.income}</span>}
              </div>
            ) : null
          )}
        </Section>
      )}

      {/* Physical */}
      {hasPhysical && (
        <Section title={L.physicalAttributes} palette={palette} headingFont={headingFont}>
          <FieldGrid
            palette={palette}
            bodyFont={bodyFont}
            fields={[
              [L.height, physical.height],
              [L.weight, physical.weight],
              [L.complexion, physical.complexion],
              [L.bloodGroup, physical.bloodGroup],
            ]}
          />
        </Section>
      )}

      {/* Religious */}
      {hasReligious && (
        <Section title={L.religiousInfo} palette={palette} headingFont={headingFont}>
          <FieldGrid
            palette={palette}
            bodyFont={bodyFont}
            fields={[
              [L.religion, religious.religion],
              [L.sect, religious.sect],
              [L.prayerHabit, religious.prayerHabit],
            ]}
          />
        </Section>
      )}

      {/* Family */}
      {(family.fatherName || family.motherName) && (
        <Section title={L.familyInfo} palette={palette} headingFont={headingFont}>
          <FieldGrid
            palette={palette}
            bodyFont={bodyFont}
            fields={[
              [L.fatherName, family.fatherName],
              [L.fatherOccupation, family.fatherOccupation],
              [L.motherName, family.motherName],
              [L.motherOccupation, family.motherOccupation],
              [L.brothers, family.brotherCount > 0 ? String(family.brotherCount) : ''],
              [L.sisters, family.sisterCount > 0 ? String(family.sisterCount) : ''],
              [L.familyType, family.familyType === 'nuclear' ? L.nuclear : family.familyType === 'joint' ? L.joint : ''],
              [L.familyStatus, family.familyStatus],
              [L.nativeDistrict, family.nativeDistrict],
            ]}
          />
        </Section>
      )}

      {/* Siblings */}
      {hasSiblings && (
        <Section title={L.siblingDetails} palette={palette} headingFont={headingFont}>
          {siblings.map((sib) =>
            sib.name ? (
              <div key={sib.id} style={{ marginBottom: '4px', fontSize: '0.83rem', fontFamily: bodyFont }}>
                <span style={{ fontWeight: 600 }}>{sib.name}</span>
                {sib.gender && (
                  <span style={{ opacity: 0.7 }}> ({sib.gender === 'male' ? L.male : L.female})</span>
                )}
                {sib.profession && <span style={{ opacity: 0.7 }}> — {sib.profession}</span>}
              </div>
            ) : null
          )}
        </Section>
      )}

      {/* Contact */}
      {(contact.phone || contact.email) && (
        <Section title={L.contactInfo} palette={palette} headingFont={headingFont}>
          <FieldGrid
            palette={palette}
            bodyFont={bodyFont}
            fields={[
              [L.phone, contact.phone],
              [L.email, contact.email],
              [L.presentAddress, contact.presentAddress],
              [L.permanentAddress, contact.permanentAddress],
            ]}
          />
        </Section>
      )}

      {/* Expectations */}
      {hasExpectations && (
        <Section title={L.partnerPreferences} palette={palette} headingFont={headingFont}>
          <FieldGrid
            palette={palette}
            bodyFont={bodyFont}
            fields={[
              [L.ageRange, expectations.ageRange],
              [L.height, expectations.height],
              [L.complexion, expectations.complexion],
              [L.educationPref, expectations.education],
              [L.profession, expectations.profession],
              [L.district, expectations.district],
              [L.otherRequirements, expectations.otherRequirements],
            ]}
          />
        </Section>
      )}
    </div>
  );
}
