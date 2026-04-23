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
      <h2
        style={{
          fontFamily: headingFont,
          fontSize: '0.82rem',
          fontWeight: 700,
          color: palette.primary,
          margin: '0 0 8px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          borderLeft: `3px solid ${palette.primary}`,
          paddingLeft: '8px',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, value, palette, bodyFont }: { label: string; value: string; palette: ColorPalette; bodyFont: string }) {
  if (!value) return null;
  return (
    <div style={{ fontSize: '0.8rem', fontFamily: bodyFont, marginBottom: '4px', lineHeight: 1.4 }}>
      <span style={{ color: palette.text, opacity: 0.55, fontSize: '0.74rem' }}>{label}: </span>
      <span style={{ color: palette.text }}>{value}</span>
    </div>
  );
}

export function TwoColumnGrid({ formData, customization, language }: BiodataRenderProps) {
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
        boxSizing: 'border-box',
        minHeight: '1123px',
        display: 'flex',
      }}
    >
      {/* Left sidebar */}
      <div
        style={{
          width: '220px',
          flexShrink: 0,
          background: palette.surface,
          padding: '36px 20px',
          borderRight: `1px solid ${palette.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Photo */}
        {photo ? (
          <img
            src={photo}
            alt=""
            style={{
              width: '100%',
              aspectRatio: '1',
              objectFit: 'cover',
              borderRadius: '4px',
              border: `2px solid ${palette.border}`,
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              aspectRatio: '1',
              background: palette.border,
              borderRadius: '4px',
              opacity: 0.3,
            }}
          />
        )}

        {/* Name + key info on sidebar */}
        <div>
          {personal.fullName && (
            <h1
              style={{
                fontFamily: headingFont,
                fontSize: '1.15rem',
                fontWeight: 700,
                color: palette.primary,
                margin: '0 0 8px',
                lineHeight: 1.2,
              }}
            >
              {personal.fullName}
            </h1>
          )}
          {[
            [L.dateOfBirth, personal.dateOfBirth],
            [L.religion, personal.religion],
            [L.nationality, personal.nationality],
            [L.maritalStatus, resolveMaritalStatus(personal.maritalStatus, L)],
            [L.bloodGroup, personal.bloodGroup],
            [L.height, personal.height],
            [L.complexion, personal.complexion],
          ]
            .filter(([, v]) => v)
            .map(([label, value]) => (
              <Field key={label} label={label} value={value} palette={palette} bodyFont={bodyFont} />
            ))}
        </div>

        {/* Contact on sidebar */}
        {(contact.phone || contact.email) && (
          <div>
            <div
              style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: palette.accent,
                marginBottom: '6px',
              }}
            >
              {L.contactInfo}
            </div>
            {[
              [L.phone, contact.phone],
              [L.email, contact.email],
              [L.presentAddress, contact.presentAddress],
            ]
              .filter(([, v]) => v)
              .map(([label, value]) => (
                <Field key={label} label={label} value={value} palette={palette} bodyFont={bodyFont} />
              ))}
          </div>
        )}
      </div>

      {/* Right content */}
      <div style={{ flex: 1, padding: '36px 32px' }}>
        {/* Education */}
        {education.some((e) => e.degree) && (
          <Section title={L.education} palette={palette} headingFont={headingFont}>
            {education.map((edu) =>
              edu.degree ? (
                <div key={edu.id} style={{ marginBottom: '8px', fontSize: '0.82rem', fontFamily: bodyFont }}>
                  <span style={{ fontWeight: 600 }}>{edu.degree}</span>
                  {edu.institution && <span style={{ opacity: 0.7 }}> — {edu.institution}</span>}
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
                <div key={pro.id} style={{ marginBottom: '8px', fontSize: '0.82rem', fontFamily: bodyFont }}>
                  <span style={{ fontWeight: 600 }}>{pro.title}</span>
                  {pro.organization && <span style={{ opacity: 0.7 }}> — {pro.organization}</span>}
                  {pro.duration && <span style={{ opacity: 0.55 }}> ({pro.duration})</span>}
                </div>
              ) : null
            )}
          </Section>
        )}

        {/* Family */}
        {(family.fatherName || family.motherName) && (
          <Section title={L.familyInfo} palette={palette} headingFont={headingFont}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px 16px' }}>
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
                  <Field key={label} label={label} value={value} palette={palette} bodyFont={bodyFont} />
                ))}
            </div>
          </Section>
        )}

        {/* Siblings */}
        {hasSiblings && (
          <Section title={L.siblingDetails} palette={palette} headingFont={headingFont}>
            {siblings.map((sib) =>
              sib.name ? (
                <div key={sib.id} style={{ marginBottom: '4px', fontSize: '0.8rem', fontFamily: bodyFont }}>
                  <span style={{ fontWeight: 600 }}>{sib.name}</span>
                  {sib.gender && <span style={{ opacity: 0.6 }}> ({sib.gender === 'male' ? L.male : L.female})</span>}
                  {sib.profession && <span style={{ opacity: 0.6 }}> — {sib.profession}</span>}
                </div>
              ) : null
            )}
          </Section>
        )}

        {/* Physical */}
        {hasPhysical && (
          <Section title={L.physicalAttributes} palette={palette} headingFont={headingFont}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px 16px' }}>
              {[
                [L.height, physical.height],
                [L.weight, physical.weight],
                [L.complexion, physical.complexion],
                [L.bloodGroup, physical.bloodGroup],
              ]
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <Field key={label} label={label} value={value} palette={palette} bodyFont={bodyFont} />
                ))}
            </div>
          </Section>
        )}

        {/* Religious */}
        {hasReligious && (
          <Section title={L.religiousInfo} palette={palette} headingFont={headingFont}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px 16px' }}>
              {[
                [L.religion, religious.religion],
                [L.sect, religious.sect],
                [L.prayerHabit, religious.prayerHabit],
              ]
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <Field key={label} label={label} value={value} palette={palette} bodyFont={bodyFont} />
                ))}
            </div>
          </Section>
        )}

        {/* Expectations */}
        {hasExpectations && (
          <Section title={L.partnerPreferences} palette={palette} headingFont={headingFont}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px 16px' }}>
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
                  <Field key={label} label={label} value={value} palette={palette} bodyFont={bodyFont} />
                ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}
