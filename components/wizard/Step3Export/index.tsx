'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import { Pencil } from 'lucide-react';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import { BiodataRenderer } from '@/components/biodata/BiodataRenderer';
import { Button } from '@/components/ui/button';
import { ExportPanel } from './ExportPanel';

const DOC_WIDTH = 794;
const PREVIEW_SCALE = 0.62;

export function Step3Export() {
  const { t } = useTranslation('common');
  const formData = useBiodataStore((s) => s.formData);
  const customization = useBiodataStore((s) => s.customization);
  const language = useBiodataStore((s) => s.language);
  const setStep = useBiodataStore((s) => s.setStep);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const renderProps = { formData, customization, language, forExport: true as const };

  return (
    <div className="lg:grid lg:grid-cols-[1fr_296px] lg:gap-8 lg:items-start">
      {/* Preview column */}
      <div className="flex flex-col gap-3 mb-8 lg:mb-0">
        <div className="flex items-center justify-between">
          <p
            className="text-sm font-semibold"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
          >
            {t('wizard.step3.previewTitle')}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStep(1)}
            className="gap-1.5 text-xs"
          >
            <Pencil size={12} />
            {t('wizard.step3.editInfo')}
          </Button>
        </div>

        {/* Scaled scrollable preview */}
        <div
          className="rounded-xl border"
          style={{
            borderColor: 'var(--border-subtle)',
            background: '#e0ddd8',
            height: '700px',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <div style={{ padding: '16px' }}>
            <div
              style={{
                zoom: PREVIEW_SCALE,
                width: `${DOC_WIDTH}px`,
                background: '#fff',
                boxShadow: '0 4px 32px rgba(0,0,0,0.14)',
              }}
            >
              <BiodataRenderer {...renderProps} />
            </div>
          </div>
        </div>
      </div>

      {/* Export panel */}
      <div className="lg:sticky lg:top-24">
        <ExportPanel />
      </div>

      {/* Hidden full-size print target — portaled to body so @media print can isolate it */}
      {mounted &&
        createPortal(
          <div id="biodata-print-portal">
            <div
              id="biodata-print-wrapper"
              aria-hidden="true"
              style={{
                position: 'fixed',
                left: '-9999px',
                top: 0,
                width: `${DOC_WIDTH}px`,
                pointerEvents: 'none',
                zIndex: -1,
              }}
            >
              <div id="biodata-print-target">
                <BiodataRenderer {...renderProps} />
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
