'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import { Maximize2, X } from 'lucide-react';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import { BiodataRenderer } from '@/components/biodata/BiodataRenderer';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';

const DOC_WIDTH = 794;
const PREVIEW_WIDTH = 380;
const SCALE = PREVIEW_WIDTH / DOC_WIDTH;

export function LivePreview() {
  const { t } = useTranslation('common');
  const [fullOpen, setFullOpen] = useState(false);
  const formData = useBiodataStore((s) => s.formData);
  const customization = useBiodataStore((s) => s.customization);
  const language = useBiodataStore((s) => s.language);

  const renderProps = { formData, customization, language };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p
          className="text-sm font-semibold"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}
        >
          {t('wizard.step2.preview.title')}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFullOpen(true)}
          className="gap-1.5 text-xs"
        >
          <Maximize2 size={12} />
          {t('wizard.step2.preview.expand')}
        </Button>
      </div>

      {/* Scaled preview window */}
      <div
        className="rounded-xl border overflow-hidden shadow-sm"
        style={{
          borderColor: 'var(--border-subtle)',
          background: '#e8e6e1',
          height: '600px',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <div style={{ padding: '12px' }}>
          <div
            style={{
              zoom: SCALE,
              width: `${DOC_WIDTH}px`,
              background: '#fff',
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              borderRadius: '2px',
            }}
          >
            <BiodataRenderer {...renderProps} />
          </div>
        </div>
      </div>

      {/* Full preview dialog */}
      <Dialog open={fullOpen} onOpenChange={setFullOpen}>
        <DialogContent
          showCloseButton={false}
          className="p-0 overflow-hidden"
          style={{
            width: `min(${DOC_WIDTH + 96}px, calc(100vw - 2rem))`,
            maxWidth: 'none',
            maxHeight: '92vh',
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
          >
            <DialogTitle className="text-sm font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('wizard.step2.preview.expand')}
            </DialogTitle>
            <DialogClose
              render={
                <Button variant="ghost" size="icon-sm">
                  <X size={16} />
                </Button>
              }
            />
          </div>
          <div
            style={{
              overflowY: 'auto',
              overflowX: 'auto',
              maxHeight: 'calc(90vh - 52px)',
              background: '#e8e6e1',
              padding: '24px',
            }}
          >
            <div
              style={{
                width: `${DOC_WIDTH}px`,
                margin: '0 auto',
                background: '#fff',
                boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
              }}
            >
              <BiodataRenderer {...renderProps} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
