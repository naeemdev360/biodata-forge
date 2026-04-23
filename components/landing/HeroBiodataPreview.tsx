import { PALETTES } from '@/lib/constants';

const palette = PALETTES.find((p) => p.id === 'rose_gold')!.palette;

const PREVIEW_FIELDS = [
  ['জন্ম তারিখ', '১৫ মার্চ, ১৯৯৮'],
  ['উচ্চতা', "৫' ৩\""],
  ['শিক্ষা', 'MBBS, ঢাকা বিশ্ববিদ্যালয়'],
  ['পেশা', 'চিকিৎসক'],
  ['ধর্ম', 'ইসলাম'],
] as const;

/** Static biodata card mock used as hero visual. Not interactive. */
export function HeroBiodataPreview() {
  return (
    <div
      className="rounded-2xl overflow-hidden select-none"
      style={{
        background: palette.background,
        width: 290,
        boxShadow: 'var(--shadow-2xl)',
        fontFamily: 'var(--font-heading)',
      }}
    >
      <div
        className="px-6 py-5 text-center"
        style={{ background: palette.primary }}
      >
        <div
          className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
          style={{ background: 'rgba(255,255,255,0.2)' }}
        >
          👤
        </div>
        <p className="font-bold text-lg leading-tight" style={{ color: palette.background }}>
          রাহেলা আক্তার
        </p>
        <p className="text-xs mt-0.5" style={{ color: `${palette.background}cc` }}>
          বিবাহ বায়োডেটা
        </p>
      </div>

      <div className="px-5 py-4">
        {PREVIEW_FIELDS.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between py-2 text-xs border-b last:border-b-0"
            style={{ borderColor: palette.border }}
          >
            <span className="font-semibold" style={{ color: palette.primary }}>
              {label}
            </span>
            <span style={{ color: palette.text }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
