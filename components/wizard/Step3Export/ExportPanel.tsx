'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import {
  FileDown,
  FileType2,
  Share2,
  Loader2,
  Check,
  AlertCircle,
  Pencil,
} from 'lucide-react';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import { exportToPDF } from '@/lib/exportPDF';
import { Button } from '@/components/ui/button';

type ExportState = 'idle' | 'loading' | 'success' | 'error';

interface ExportButtonProps {
  icon: React.ReactNode;
  label: string;
  desc: string;
  state: ExportState;
  onClick: () => void;
  loadingLabel: string;
  successLabel: string;
  errorLabel: string;
  primary?: boolean;
}

function ExportButton({
  icon,
  label,
  desc,
  state,
  onClick,
  loadingLabel,
  successLabel,
  errorLabel,
  primary,
}: ExportButtonProps) {
  const isLoading = state === 'loading';
  const isSuccess = state === 'success';
  const isError = state === 'error';

  const stateIcon = isLoading ? (
    <Loader2 size={16} className="animate-spin" />
  ) : isSuccess ? (
    <Check size={16} />
  ) : isError ? (
    <AlertCircle size={16} />
  ) : (
    icon
  );

  const stateLabel = isLoading ? loadingLabel : isSuccess ? successLabel : isError ? errorLabel : label;

  return (
    <button
      type="button"
      onClick={!isLoading ? onClick : undefined}
      disabled={isLoading}
      className="flex items-center gap-3 w-full rounded-xl px-4 py-3 border-2 text-left transition-all cursor-pointer disabled:cursor-not-allowed"
      style={{
        borderColor: isError
          ? 'var(--color-error)'
          : isSuccess
          ? '#16a34a'
          : primary
          ? 'var(--accent)'
          : 'var(--border-default)',
        background: primary
          ? 'linear-gradient(135deg, #D4822A 0%, #A8601E 100%)'
          : isSuccess
          ? 'rgba(22,163,74,0.07)'
          : isError
          ? 'rgba(220,38,38,0.06)'
          : 'var(--bg-base)',
        color: primary ? '#fff' : 'inherit',
      }}
    >
      <div
        style={{
          color: primary
            ? '#fff'
            : isError
            ? 'var(--color-error)'
            : isSuccess
            ? '#16a34a'
            : 'var(--accent)',
          flexShrink: 0,
        }}
      >
        {stateIcon}
      </div>
      <div className="min-w-0">
        <p
          className="text-sm font-semibold leading-tight"
          style={{ color: primary ? '#fff' : 'var(--text-primary)' }}
        >
          {stateLabel}
        </p>
        {!isLoading && !isSuccess && !isError && (
          <p
            className="text-xs mt-0.5 leading-tight"
            style={{ color: primary ? 'rgba(255,255,255,0.72)' : 'var(--text-muted)' }}
          >
            {desc}
          </p>
        )}
      </div>
    </button>
  );
}

export function ExportPanel() {
  const { t } = useTranslation('common');
  const formData = useBiodataStore((s) => s.formData);
  const customization = useBiodataStore((s) => s.customization);
  const setStep = useBiodataStore((s) => s.setStep);

  const [pdfState, setPdfState] = useState<ExportState>('idle');

  async function handlePDF() {
    setPdfState('loading');
    try {
      await exportToPDF(formData, customization);
      setPdfState('success');
      setTimeout(() => setPdfState('idle'), 3500);
    } catch {
      setPdfState('error');
    }
  }

  const candidateName = formData.personal.fullName || '—';

  return (
    <div
      className="flex flex-col gap-5 rounded-2xl p-5 border"
      style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
    >
      {/* Header */}
      <div>
        <p
          className="text-sm font-semibold mb-1"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
        >
          {t('wizard.step3.title')}
        </p>
        <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
          {candidateName}
        </p>
      </div>

      {/* Export buttons */}
      <div className="flex flex-col gap-3">
        <ExportButton
          icon={<FileDown size={16} />}
          label={t('wizard.step3.exportPDF')}
          desc={t('wizard.step3.pdfDesc')}
          state={pdfState}
          onClick={handlePDF}
          loadingLabel={t('wizard.step3.exporting')}
          successLabel={t('wizard.step3.downloadReady')}
          errorLabel={t('wizard.step3.exportError')}
          primary
        />

        {/* DOCX — Coming Soon */}
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 border-2"
          style={{
            borderColor: 'var(--border-subtle)',
            background: 'transparent',
            opacity: 0.45,
          }}
        >
          <FileType2 size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
              {t('wizard.step3.exportDOCX')}
            </p>
            <p className="text-xs mt-0.5 leading-tight" style={{ color: 'var(--text-muted)' }}>
              Coming soon
            </p>
          </div>
        </div>

        {/* Share — Coming Soon */}
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3 border-2"
          style={{
            borderColor: 'var(--border-subtle)',
            background: 'transparent',
            opacity: 0.45,
          }}
        >
          <Share2 size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {t('wizard.step3.shareComingSoon')}
          </p>
        </div>
      </div>

      {/* Edit divider */}
      <div className="border-t pt-4" style={{ borderColor: 'var(--border-subtle)' }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setStep(1)}
          className="w-full gap-2 justify-center"
          style={{ color: 'var(--text-secondary)' }}
        >
          <Pencil size={13} />
          {t('wizard.step3.editInfo')}
        </Button>
      </div>
    </div>
  );
}
