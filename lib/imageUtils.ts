import { MAX_PHOTO_SIZE_BYTES, ACCEPTED_IMAGE_TYPES } from '@/lib/constants';

export type ImageValidationError = 'size' | 'type' | null;

/** Validates an image File against size and type constraints. */
export function validateImageFile(file: File): ImageValidationError {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return 'type';
  if (file.size > MAX_PHOTO_SIZE_BYTES) return 'size';
  return null;
}

/** Converts a File to a base64 data URL string. */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
