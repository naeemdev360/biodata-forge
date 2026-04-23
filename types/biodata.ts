export interface PersonalInfo {
  fullName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  religion: string;
  maritalStatus: 'never_married' | 'divorced' | 'widowed' | '';
  height: string;
  complexion: string;
  bloodGroup: string;
}

export interface PhysicalInfo {
  height: string;
  weight: string;
  complexion: string;
  bloodGroup: string;
}

export interface ReligiousInfo {
  religion: string;
  sect: string;
  prayerHabit: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  passingYear: string;
  result: string;
}

export interface ProfessionalEntry {
  id: string;
  title: string;
  organization: string;
  duration: string;
  income: string;
}

export interface SiblingEntry {
  id: string;
  name: string;
  gender: 'male' | 'female' | '';
  maritalStatus: string;
  profession: string;
}

export interface FamilyInfo {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  brotherCount: number;
  sisterCount: number;
  familyType: 'nuclear' | 'joint' | '';
  familyStatus: string;
  nativeDistrict: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  presentAddress: string;
  permanentAddress: string;
}

export interface ExpectationsInfo {
  ageRange: string;
  height: string;
  complexion: string;
  education: string;
  profession: string;
  district: string;
  otherRequirements: string;
}

export interface BiodataFormData {
  personal: PersonalInfo;
  physical: PhysicalInfo;
  religious: ReligiousInfo;
  education: EducationEntry[];
  professional: ProfessionalEntry[];
  family: FamilyInfo;
  siblings: SiblingEntry[];
  contact: ContactInfo;
  expectations: ExpectationsInfo;
  photo: string | null;
}

export interface ColorPalette {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  border: string;
}

export type LayoutId = 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'custom';
export type FontPairing = 'heritage' | 'modern' | 'classic';

export interface CustomLayoutConfig {
  sectionOrder: string[];
  visibleSections: string[];
  headerStyle: 'centered' | 'left' | 'with-divider' | 'with-photo';
  fontCategory: 'serif' | 'sans-serif' | 'display';
}

export interface CustomizationState {
  layoutId: LayoutId;
  paletteId: string;
  customPalette: ColorPalette | null;
  fontPairing: FontPairing;
  customLayout?: CustomLayoutConfig;
}

export interface BiodataRenderProps {
  formData: BiodataFormData;
  customization: CustomizationState;
  language: 'en' | 'bn';
  forExport?: boolean;
}

export interface StorageSchema {
  version: string;
  lastSaved: string;
  currentStep: 1 | 2 | 3;
  language: 'en' | 'bn';
  formData: BiodataFormData;
  customization: CustomizationState;
}
