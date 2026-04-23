import { z } from 'zod';
import { isAdult } from '@/lib/utils';

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'errors.minChars'),
  dateOfBirth: z.string().refine(isAdult, 'errors.mustBeAdult'),
  placeOfBirth: z.string(),
  nationality: z.string(),
  religion: z.string(),
  maritalStatus: z.enum(['never_married', 'divorced', 'widowed', '']),
  height: z.string(),
  complexion: z.string(),
  bloodGroup: z.string(),
});

export const educationEntrySchema = z.object({
  id: z.string(),
  degree: z.string().min(1, 'errors.required'),
  institution: z.string().min(1, 'errors.required'),
  passingYear: z.string(),
  result: z.string(),
});

export const professionalEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  organization: z.string(),
  duration: z.string(),
  income: z.string(),
});

export const siblingEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  gender: z.enum(['male', 'female', '']),
  maritalStatus: z.string(),
  profession: z.string(),
});

export const familyInfoSchema = z.object({
  fatherName: z.string().min(2, 'errors.minChars'),
  fatherOccupation: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  brotherCount: z.number().min(0),
  sisterCount: z.number().min(0),
  familyType: z.enum(['nuclear', 'joint', '']),
  familyStatus: z.string(),
  nativeDistrict: z.string(),
});

export const contactInfoSchema = z.object({
  phone: z.string().min(7, 'errors.required'),
  email: z.string().email('errors.invalidEmail').or(z.literal('')),
  presentAddress: z.string().min(5, 'errors.required'),
  permanentAddress: z.string(),
});

export const expectationsInfoSchema = z.object({
  ageRange: z.string(),
  height: z.string(),
  complexion: z.string(),
  education: z.string(),
  profession: z.string(),
  district: z.string(),
  otherRequirements: z.string(),
});

export const biodataFormSchema = z.object({
  personal: personalInfoSchema,
  physical: z.object({
    height: z.string(),
    weight: z.string(),
    complexion: z.string(),
    bloodGroup: z.string(),
  }),
  religious: z.object({
    religion: z.string(),
    sect: z.string(),
    prayerHabit: z.string(),
  }),
  education: z.array(educationEntrySchema).min(1, 'errors.required'),
  professional: z.array(professionalEntrySchema),
  family: familyInfoSchema,
  siblings: z.array(siblingEntrySchema),
  contact: contactInfoSchema,
  expectations: expectationsInfoSchema,
  photo: z.string().nullable(),
});

export type BiodataFormSchema = z.infer<typeof biodataFormSchema>;
