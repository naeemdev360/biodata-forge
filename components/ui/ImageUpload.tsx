'use client';

import { useRef, useState } from 'react';
import { Camera, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { validateImageFile, fileToBase64 } from '@/lib/imageUtils';
import { Button } from '@/components/ui/button';

export interface ImageUploadProps {
  value: string | null;
  onChange: (base64: string | null) => void;
  uploadLabel?: string;
  formatHint?: string;
  errorSizeLabel?: string;
  errorTypeLabel?: string;
  removeLabel?: string;
}

/** Drag-and-drop / click image uploader with preview and validation. */
export function ImageUpload({
  value,
  onChange,
  uploadLabel = 'Click to upload or drag and drop',
  formatHint = 'JPG, PNG, WEBP up to 5MB',
  errorSizeLabel = 'Image must be under 5MB',
  errorTypeLabel = 'Only JPG, PNG, and WEBP images are supported',
  removeLabel = 'Remove Photo',
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function processFile(file: File) {
    setError(null);
    const validationError = validateImageFile(file);
    if (validationError === 'size') return setError(errorSizeLabel);
    if (validationError === 'type') return setError(errorTypeLabel);
    const base64 = await fileToBase64(file);
    onChange(base64);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  if (value) {
    return (
      <div className="relative w-32 h-32 rounded-lg overflow-hidden group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={value} alt="Profile photo" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange(null)}
            className="text-white hover:text-white hover:bg-white/20"
            aria-label={removeLabel}
          >
            <X size={18} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        className={cn(
          'upload-zone w-full text-center',
          isDragOver && 'drag-over'
        )}
        aria-label={uploadLabel}
      >
        <Camera size={28} style={{ color: 'var(--text-muted)' }} aria-hidden />
        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{uploadLabel}</p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{formatHint}</p>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={handleChange}
        aria-hidden
        tabIndex={-1}
      />
      {error && (
        <p role="alert" className="text-xs font-medium" style={{ color: 'var(--color-error)' }}>
          {error}
        </p>
      )}
    </div>
  );
}
