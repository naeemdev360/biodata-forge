import type { StorageSchema } from '@/types/biodata';
import { STORAGE_KEY, STORAGE_VERSION } from '@/lib/constants';

/** Persists the full storage schema to localStorage. */
export function saveToStorage(data: Omit<StorageSchema, 'version' | 'lastSaved'>): void {
  const payload: StorageSchema = {
    ...data,
    version: STORAGE_VERSION,
    lastSaved: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    if (err instanceof DOMException && err.name === 'QuotaExceededError') {
      console.error('[storage] localStorage quota exceeded');
    } else {
      console.error('[storage] write failed', err);
    }
  }
}

/** Reads and returns the persisted storage schema, or null if absent/invalid. */
export function loadFromStorage(): StorageSchema | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return migrateIfNeeded(parsed);
  } catch {
    return null;
  }
}

/** Removes the persisted biodata entry from localStorage. */
export function clearStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently ignore — nothing to clear
  }
}

/** Returns true if localStorage is available in the current context. */
export function isStorageAvailable(): boolean {
  try {
    const probe = '__biodata_forge_probe__';
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

function migrateIfNeeded(data: unknown): StorageSchema | null {
  if (!data || typeof data !== 'object') return null;
  const record = data as Record<string, unknown>;
  if (record.version === STORAGE_VERSION) return record as unknown as StorageSchema;
  // Future migrations: add version-specific transformations here
  return null;
}
