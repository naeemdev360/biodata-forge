'use client';

import { useEffect, useState } from 'react';
import { useBiodataStore } from '@/hooks/useBiodataStore';
import { loadFromStorage, isStorageAvailable } from '@/lib/storage';

export function useLocalStorage(): { wasRestored: boolean; storageAvailable: boolean } {
  const [wasRestored, setWasRestored] = useState(false);
  const storageAvailable = isStorageAvailable();
  const restoreFromStorage = useBiodataStore((s) => s.restoreFromStorage);

  useEffect(() => {
    if (!storageAvailable) return;
    const saved = loadFromStorage();
    if (!saved) return;

    restoreFromStorage({
      currentStep: saved.currentStep,
      language: saved.language,
      formData: saved.formData,
      customization: saved.customization,
    });
    setWasRestored(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { wasRestored, storageAvailable };
}
