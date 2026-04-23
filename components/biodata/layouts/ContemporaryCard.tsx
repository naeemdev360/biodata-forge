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

interface CardProps {
  title: string;
  palette: ColorPalette;
  headingFont: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

function Card({ title, palette, headingFont, children, fullWidth }: CardProps) {
  return (
    <div
      style={{
        background: palette.surface,
        borderRadius: '10px',
        padding: '14px 16px',
        border: `1px solid ${palette.border}`,
        gridColumn: fullWidth ? '1 / -1' : undefined,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            width: '3px',
            height: '14px',
            background: palette.accent,
            borderRadius: '2px',
            flexShrink: 0,
          }}
        />
        <h2
          style={{
            fontFamily: headingFont,
            fontSize: '0.78rem',
            fontWeight: 700,
            color: palette.primary,
            margin: 0,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function Field({ label, value, palette, bodyFont }: { label: string; value: string; palette: ColorPalette; bodyFont: string }) {
  if (!value) return null;
  return (
    <div style={{ fontSize: '0.8rem', fontFamily: bodyFont, marginBottom: '4px', lineHeight: 1.4 }}>
      <span style={{ color: palette.text, opacity: 0.5, fontSize: '0.72rem' }}>{label}: </span>
      <span style={{ color: palette.text }}>{value}</span>
    </div>
  );
}

export function ContemporaryCard({ formData, customization, language }: BiodataRenderProps) {
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
        padding: '40px 48px',
        boxSizing: 'border-box',
        minHeight: '1123px',
      }}
    >
      {/* Header card */}
      <div
        style={{
          background: palette.primary,
          borderRadius: '12px',
          padding: '24px 28px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {photo ? (
          <img
            src={photo}
            alt=""
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '8px',
              objectFit: 'cover',
              border: '2px solid rgba(255,255,255,0.3)',
              flexShrink: 0,
            }}
          />
        ) : null}
        <div>
          {personal.fullName && (
            <h1
              style={{
                fontFamily: headingFont,
                fontSize: '1.7rem',
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 6px',
                lineHeight: 1.1,
              }}
            >
              {personal.fullName}
            </h1>
          )}
          <div
            style={{
              display: 'flex',
              gap: '14px',
              flexWrap: 'wrap',
              fontSize: '0.78rem',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            {personal.dateOfBirth && <span>{personal.dateOfBirth}</span>}
            {personal.religion && <span>· {personal.religion}</span>}
            {personal.maritalStatus && <span>· {resolveMaritalStatus(personal.maritalStatus, L)}</span>}
            {personal.nationality && <span>· {personal.nationality}</span>}
          </div>
        </div>
      </div>

      {/* Card grid */}
      <div className="biodata-card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {/* Personal full-width */}
        <Card title={L.personalInfo} palette={palette} headingFont={headingFont} fullWidth>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px 20px' }}>
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
                <Field key={label} label={label} value={value} palette={palette} bodyFont={bodyFont} />
              ))}
          </div>
        </Card>

        {/* Education full-width */}
        {education.some((e) => e.degree) && (
          <Card title={L.education} palette={palette} headingFont={headingFont} fullWidth>
            {education.map((edu) =>
              edu.degree ? (
                <div key={edu.id} style={{ marginBottom: '8px', fontSize: '0.8rem', fontFamily: bodyFont }}>
                  <span style={{ fontWeight: 600, color: palette.primary }}>{edu.degree}</span>
                  {edu.institution && <span style={{ opacity: 0.7 }}> — {edu.institution}</span>}
                  {(edu.passingYear || edu.result) && (
                    <span style={{ opacity: 0.5 }}> ({[edu.passingYear, edu.result].filter(Boolean).join(', ')})</span>
                  )}
                </div>
              ) : null
            )}
          </Card>
        )}

        {/* Professional full-width */}
        {hasProfessional && (
          <Card title={L.professional} palette={palette} headingFont={headingFont} fullWidth>
            {professional.map((pro) =>
              pro.title || pro.organization ? (
                <div key={pro.id} style={{ marginBottom: '8px', fontSize: '0.8rem', fontFamily: bodyFont }}>
                  <span style={{ fontWeight: 600, color: palette.primary }}>{pro.title}</span>
                  {pro.organization && <span style={{ opacity: 0.7 }}> — {pro.organization}</span>}
                  {pro.duration && <span style={{ opacity: 0.5 }}> ({pro.duration})</span>}
                  {pro.income && <span style={{ opacity: 0.5 }}>, {L.income}: {pro.income}</span>}
                </div>
              ) : null
            )}
          </Card>
        )}

        {/* Family */}
        {(family.fatherName || family.motherName) && (
          <Card title={L.familyInfo} palette={palette} headingFont={headingFont} fullWidth>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px 20px' }}>
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
          </Card>
        )}

        {/* Physical */}
        {hasPhysical && (
          <Card title={L.physicalAttributes} palette={palette} headingFont={headingFont}>
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
          </Card>
        )}

        {/* Religious */}
        {hasReligious && (
          <Card title={L.religiousInfo} palette={palette} headingFont={headingFont}>
            {[
              [L.religion, religious.religion],
              [L.sect, religious.sect],
              [L.prayerHabit, religious.prayerHabit],
            ]
              .filter(([, v]) => v)
              .map(([label, value]) => (
                <Field key={label} label={label} value={value} palette={palette} bodyFont={bodyFont} />
              ))}
          </Card>
        )}

        {/* Siblings */}
        {hasSiblings && (
          <Card title={L.siblingDetails} palette={palette} headingFont={headingFont}>
            {siblings.map((sib) =>
              sib.name ? (
                <div key={sib.id} style={{ marginBottom: '4px', fontSize: '0.8rem', fontFamily: bodyFont }}>
                  <span style={{ fontWeight: 600 }}>{sib.name}</span>
                  {sib.gender && <span style={{ opacity: 0.6 }}> ({sib.gender === 'male' ? L.male : L.female})</span>}
                  {sib.profession && <span style={{ opacity: 0.6 }}> — {sib.profession}</span>}
                </div>
              ) : null
            )}
          </Card>
        )}

        {/* Contact — highlighted card */}
        {(contact.phone || contact.email) && (
          <Card title={L.contactInfo} palette={palette} headingFont={headingFont} fullWidth>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px 20px' }}>
              {[
                [L.phone, contact.phone],
                [L.email, contact.email],
                [L.presentAddress, contact.presentAddress],
                [L.permanentAddress, contact.permanentAddress],
              ]
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <Field key={label} label={label} value={value} palette={palette} bodyFont={bodyFont} />
                ))}
            </div>
          </Card>
        )}

        {/* Expectations */}
        {hasExpectations && (
          <Card title={L.partnerPreferences} palette={palette} headingFont={headingFont} fullWidth>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px 20px' }}>
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
          </Card>
        )}
      </div>
    </div>
  );
}
