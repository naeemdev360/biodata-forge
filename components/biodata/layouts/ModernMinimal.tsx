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
  children: React.ReactNode;
}

function Section({ title, palette, children }: SectionProps) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <div
        style={{
          fontSize: '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: palette.accent,
          borderBottom: `1px solid ${palette.border}`,
          paddingBottom: '4px',
          marginBottom: '10px',
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function FieldRow({ label, value, palette, bodyFont }: { label: string; value: string; palette: ColorPalette; bodyFont: string }) {
  if (!value) return null;
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        fontSize: '0.83rem',
        fontFamily: bodyFont,
        marginBottom: '4px',
        lineHeight: 1.4,
      }}
    >
      <span style={{ color: palette.text, opacity: 0.55, minWidth: '130px', flexShrink: 0 }}>{label}</span>
      <span style={{ color: palette.text }}>{value}</span>
    </div>
  );
}

export function ModernMinimal({ formData, customization, language }: BiodataRenderProps) {
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
      {/* Header: name left, photo right */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div style={{ flex: 1 }}>
          {personal.fullName && (
            <h1
              style={{
                fontFamily: headingFont,
                fontSize: '2.2rem',
                fontWeight: 700,
                color: palette.primary,
                margin: '0 0 6px',
                lineHeight: 1.1,
              }}
            >
              {personal.fullName}
            </h1>
          )}
          {/* Key info row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3px 20px',
              marginTop: '10px',
              maxWidth: '420px',
            }}
          >
            {personal.dateOfBirth && (
              <div style={{ fontSize: '0.8rem', color: palette.text, opacity: 0.7 }}>
                <span style={{ opacity: 0.55 }}>{L.dateOfBirth}: </span>{personal.dateOfBirth}
              </div>
            )}
            {personal.religion && (
              <div style={{ fontSize: '0.8rem', color: palette.text, opacity: 0.7 }}>
                <span style={{ opacity: 0.55 }}>{L.religion}: </span>{personal.religion}
              </div>
            )}
            {personal.nationality && (
              <div style={{ fontSize: '0.8rem', color: palette.text, opacity: 0.7 }}>
                <span style={{ opacity: 0.55 }}>{L.nationality}: </span>{personal.nationality}
              </div>
            )}
            {personal.maritalStatus && (
              <div style={{ fontSize: '0.8rem', color: palette.text, opacity: 0.7 }}>
                <span style={{ opacity: 0.55 }}>{L.maritalStatus}: </span>
                {resolveMaritalStatus(personal.maritalStatus, L)}
              </div>
            )}
          </div>
        </div>
        {photo && (
          <img
            src={photo}
            alt=""
            style={{
              width: '88px',
              height: '88px',
              objectFit: 'cover',
              borderRadius: '4px',
              border: `1px solid ${palette.border}`,
              flexShrink: 0,
              marginLeft: '24px',
            }}
          />
        )}
      </div>

      <div style={{ height: '2px', background: palette.primary, marginBottom: '28px', borderRadius: '1px' }} />

      {/* Personal */}
      <Section title={L.personalInfo} palette={palette}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          {[
            [L.fullName, personal.fullName],
            [L.dateOfBirth, personal.dateOfBirth],
            [L.placeOfBirth, personal.placeOfBirth],
            [L.nationality, personal.nationality],
            [L.religion, personal.religion],
            [L.maritalStatus, resolveMaritalStatus(personal.maritalStatus, L)],
            [L.height, personal.height],
            [L.complexion, personal.complexion],
            [L.bloodGroup, personal.bloodGroup],
          ]
            .filter(([, v]) => v)
            .map(([label, value]) => (
              <FieldRow key={label} label={label} value={value} palette={palette} bodyFont={bodyFont} />
            ))}
        </div>
      </Section>

      {/* Education */}
      {education.some((e) => e.degree) && (
        <Section title={L.education} palette={palette}>
          {education.map((edu) =>
            edu.degree ? (
              <div key={edu.id} style={{ marginBottom: '8px', fontFamily: bodyFont, fontSize: '0.83rem' }}>
                <div style={{ fontWeight: 600, color: palette.primary }}>{edu.degree}</div>
                <div style={{ opacity: 0.7, marginTop: '1px' }}>
                  {edu.institution}
                  {(edu.passingYear || edu.result) && (
                    <span style={{ opacity: 0.8 }}> · {[edu.passingYear, edu.result].filter(Boolean).join(' · ')}</span>
                  )}
                </div>
              </div>
            ) : null
          )}
        </Section>
      )}

      {/* Professional */}
      {hasProfessional && (
        <Section title={L.professional} palette={palette}>
          {professional.map((pro) =>
            pro.title || pro.organization ? (
              <div key={pro.id} style={{ marginBottom: '8px', fontFamily: bodyFont, fontSize: '0.83rem' }}>
                <div style={{ fontWeight: 600, color: palette.primary }}>{pro.title}</div>
                <div style={{ opacity: 0.7, marginTop: '1px' }}>
                  {pro.organization}
                  {pro.duration && <span> · {pro.duration}</span>}
                  {pro.income && <span> · {L.income}: {pro.income}</span>}
                </div>
              </div>
            ) : null
          )}
        </Section>
      )}

      {/* Physical */}
      {hasPhysical && (
        <Section title={L.physicalAttributes} palette={palette}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            {[
              [L.height, physical.height],
              [L.weight, physical.weight],
              [L.complexion, physical.complexion],
              [L.bloodGroup, physical.bloodGroup],
            ]
              .filter(([, v]) => v)
              .map(([label, value]) => (
                <FieldRow key={label} label={label} value={value} palette={palette} bodyFont={bodyFont} />
              ))}
          </div>
        </Section>
      )}

      {/* Religious */}
      {hasReligious && (
        <Section title={L.religiousInfo} palette={palette}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            {[
              [L.religion, religious.religion],
              [L.sect, religious.sect],
              [L.prayerHabit, religious.prayerHabit],
            ]
              .filter(([, v]) => v)
              .map(([label, value]) => (
                <FieldRow key={label} label={label} value={value} palette={palette} bodyFont={bodyFont} />
              ))}
          </div>
        </Section>
      )}

      {/* Family */}
      {(family.fatherName || family.motherName) && (
        <Section title={L.familyInfo} palette={palette}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            {[
              [L.fatherName, family.fatherName],
              [L.fatherOccupation, family.fatherOccupation],
              [L.motherName, family.motherName],
              [L.motherOccupation, family.motherOccupation],
              [L.brothers, family.brotherCount > 0 ? String(family.brotherCount) : ''],
              [L.sisters, family.sisterCount > 0 ? String(family.sisterCount) : ''],
              [L.familyType, family.familyType === 'nuclear' ? L.nuclear : family.familyType === 'joint' ? L.joint : ''],
              [L.familyStatus, family.familyStatus],
              [L.nativeDistrict, family.nativeDistrict],
            ]
              .filter(([, v]) => v)
              .map(([label, value]) => (
                <FieldRow key={label} label={label} value={value} palette={palette} bodyFont={bodyFont} />
              ))}
          </div>
        </Section>
      )}

      {/* Siblings */}
      {hasSiblings && (
        <Section title={L.siblingDetails} palette={palette}>
          {siblings.map((sib) =>
            sib.name ? (
              <div key={sib.id} style={{ marginBottom: '4px', fontSize: '0.83rem', fontFamily: bodyFont }}>
                <span style={{ fontWeight: 600 }}>{sib.name}</span>
                {sib.gender && <span style={{ opacity: 0.6 }}> ({sib.gender === 'male' ? L.male : L.female})</span>}
                {sib.profession && <span style={{ opacity: 0.6 }}> — {sib.profession}</span>}
              </div>
            ) : null
          )}
        </Section>
      )}

      {/* Contact */}
      {(contact.phone || contact.email) && (
        <Section title={L.contactInfo} palette={palette}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            {[
              [L.phone, contact.phone],
              [L.email, contact.email],
              [L.presentAddress, contact.presentAddress],
              [L.permanentAddress, contact.permanentAddress],
            ]
              .filter(([, v]) => v)
              .map(([label, value]) => (
                <FieldRow key={label} label={label} value={value} palette={palette} bodyFont={bodyFont} />
              ))}
          </div>
        </Section>
      )}

      {/* Expectations */}
      {hasExpectations && (
        <Section title={L.partnerPreferences} palette={palette}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            {[
              [L.ageRange, expectations.ageRange],
              [L.height, expectations.height],
              [L.educationPref, expectations.education],
              [L.profession, expectations.profession],
              [L.district, expectations.district],
              [L.otherRequirements, expectations.otherRequirements],
            ]
              .filter(([, v]) => v)
              .map(([label, value]) => (
                <FieldRow key={label} label={label} value={value} palette={palette} bodyFont={bodyFont} />
              ))}
          </div>
        </Section>
      )}
    </div>
  );
}
