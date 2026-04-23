import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

/** Converts ASCII digits in a string to Bengali numeral characters. */
export function toBengaliNumeral(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => BENGALI_DIGITS[parseInt(d, 10)]);
}

/** Returns true if the given date string represents an age of 18 or more. */
export function isAdult(dateString: string): boolean {
  const dob = new Date(dateString);
  if (isNaN(dob.getTime())) return false;
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  return dob <= eighteenYearsAgo;
}

/** Generates a UUID v4 unique identifier. */
export function generateId(): string {
  return crypto.randomUUID();
}
