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
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
        <div style={{ height: '1px', flex: 1, background: palette.accent, opacity: 0.4 }} />
        <span style={{ color: palette.accent, fontSize: '0.7rem' }}>❦</span>
        <h2
          style={{
            fontFamily: headingFont,
            fontSize: '0.85rem',
            fontWeight: 600,
            color: palette.primary,
            margin: 0,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontVariant: 'small-caps',
          }}
        >
          {title}
        </h2>
        <span style={{ color: palette.accent, fontSize: '0.7rem' }}>❦</span>
        <div style={{ height: '1px', flex: 1, background: palette.accent, opacity: 0.4 }} />
      </div>
      <div
        style={{
          background: palette.surface,
          padding: '10px 14px',
          borderRadius: '2px',
          border: `1px solid ${palette.border}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function FieldGrid({ fields, palette, bodyFont }: { fields: [string, string][]; palette: ColorPalette; bodyFont: string }) {
  const visible = fields.filter(([, v]) => v);
  if (!visible.length) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 24px' }}>
      {visible.map(([label, value]) => (
        <div key={label} style={{ fontSize: '0.82rem', fontFamily: bodyFont, lineHeight: 1.4 }}>
          <span style={{ color: palette.primary, fontWeight: 600 }}>{label}:</span>{' '}
          <span style={{ color: palette.text }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

export function RoyalHeritage({ formData, customization, language }: BiodataRenderProps) {
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
        padding: '8px',
        boxSizing: 'border-box',
        minHeight: '1123px',
      }}
    >
      {/* Double border frame */}
      <div
        style={{
          border: `2px solid ${palette.primary}`,
          padding: '6px',
          minHeight: 'calc(1123px - 16px)',
        }}
      >
        <div
          style={{
            border: `1px solid ${palette.accent}`,
            opacity: 0.5,
            position: 'absolute',
            inset: '14px',
            pointerEvents: 'none',
          }}
        />
        <div style={{ padding: '32px 40px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ color: palette.accent, fontSize: '1.2rem', marginBottom: '8px' }}>❦</div>
            {photo && (
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
                <img
                  src={photo}
                  alt=""
                  style={{
                    width: '108px',
                    height: '108px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: `3px double ${palette.primary}`,
                  }}
                />
              </div>
            )}
            {personal.fullName && (
              <h1
                style={{
                  fontFamily: headingFont,
                  fontSize: '1.9rem',
                  fontWeight: 700,
                  color: palette.primary,
                  margin: '0 0 6px',
                  letterSpacing: '0.02em',
                }}
              >
                {personal.fullName}
              </h1>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                fontSize: '0.8rem',
                color: palette.text,
                opacity: 0.7,
                flexWrap: 'wrap',
              }}
            >
              {personal.dateOfBirth && <span>{L.dateOfBirth}: {personal.dateOfBirth}</span>}
              {personal.religion && <span>✦ {personal.religion}</span>}
              {personal.maritalStatus && <span>✦ {resolveMaritalStatus(personal.maritalStatus, L)}</span>}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '14px',
              }}
            >
              <div style={{ height: '1px', width: '60px', background: palette.accent, opacity: 0.5 }} />
              <span style={{ color: palette.accent, fontSize: '0.65rem', letterSpacing: '6px' }}>✦ ✦ ✦</span>
              <div style={{ height: '1px', width: '60px', background: palette.accent, opacity: 0.5 }} />
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
                  <div key={edu.id} style={{ marginBottom: '6px', fontSize: '0.82rem', fontFamily: bodyFont }}>
                    <span style={{ fontWeight: 600, color: palette.primary }}>{edu.degree}</span>
                    {edu.institution && <span style={{ opacity: 0.75 }}> — {edu.institution}</span>}
                    {(edu.passingYear || edu.result) && (
                      <span style={{ opacity: 0.55 }}> ({[edu.passingYear, edu.result].filter(Boolean).join(', ')})</span>
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
                  <div key={pro.id} style={{ marginBottom: '6px', fontSize: '0.82rem', fontFamily: bodyFont }}>
                    <span style={{ fontWeight: 600, color: palette.primary }}>{pro.title}</span>
                    {pro.organization && <span style={{ opacity: 0.75 }}> — {pro.organization}</span>}
                    {pro.duration && <span style={{ opacity: 0.55 }}> ({pro.duration})</span>}
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
                  <div key={sib.id} style={{ marginBottom: '4px', fontSize: '0.82rem', fontFamily: bodyFont }}>
                    <span style={{ fontWeight: 600 }}>{sib.name}</span>
                    {sib.gender && <span style={{ opacity: 0.65 }}> ({sib.gender === 'male' ? L.male : L.female})</span>}
                    {sib.profession && <span style={{ opacity: 0.65 }}> — {sib.profession}</span>}
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
                  [L.educationPref, expectations.education],
                  [L.profession, expectations.profession],
                  [L.district, expectations.district],
                  [L.otherRequirements, expectations.otherRequirements],
                ]}
              />
            </Section>
          )}

          {/* Footer ornament */}
          <div style={{ textAlign: 'center', marginTop: '16px', color: palette.accent, fontSize: '1rem' }}>❦</div>
        </div>
      </div>
    </div>
  );
}
