import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { BiodataFormData, CustomizationState } from '@/types/biodata';
import { saveToStorage, clearStorage } from '@/lib/storage';
import { DEFAULT_CUSTOMIZATION, AUTOSAVE_DEBOUNCE_MS } from '@/lib/constants';
import { generateId } from '@/lib/utils';

export interface BiodataStore {
  currentStep: 1 | 2 | 3;
  language: 'en' | 'bn';
  formData: BiodataFormData;
  customization: CustomizationState;
  isExporting: boolean;
  exportProgress: number;
  setStep: (step: 1 | 2 | 3) => void;
  setLanguage: (lang: 'en' | 'bn') => void;
  updatePersonal: (data: Partial<BiodataFormData['personal']>) => void;
  updatePhysical: (data: Partial<BiodataFormData['physical']>) => void;
  updateReligious: (data: Partial<BiodataFormData['religious']>) => void;
  updateFamily: (data: Partial<BiodataFormData['family']>) => void;
  updateContact: (data: Partial<BiodataFormData['contact']>) => void;
  updateExpectations: (data: Partial<BiodataFormData['expectations']>) => void;
  setPhoto: (photo: string | null) => void;
  addEducationEntry: () => void;
  updateEducationEntry: (id: string, data: Partial<BiodataFormData['education'][number]>) => void;
  removeEducationEntry: (id: string) => void;
  addProfessionalEntry: () => void;
  updateProfessionalEntry: (id: string, data: Partial<BiodataFormData['professional'][number]>) => void;
  removeProfessionalEntry: (id: string) => void;
  addSiblingEntry: () => void;
  updateSiblingEntry: (id: string, data: Partial<BiodataFormData['siblings'][number]>) => void;
  removeSiblingEntry: (id: string) => void;
  setCustomization: (data: Partial<CustomizationState>) => void;
  setExporting: (value: boolean) => void;
  setExportProgress: (value: number) => void;
  restoreFromStorage: (data: Partial<BiodataStore>) => void;
  clearAll: () => void;
}

const initialFormData: BiodataFormData = {
  personal: {
    fullName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    nationality: 'Bangladeshi',
    religion: '',
    maritalStatus: '',
    height: '',
    complexion: '',
    bloodGroup: '',
  },
  physical: { height: '', weight: '', complexion: '', bloodGroup: '' },
  religious: { religion: '', sect: '', prayerHabit: '' },
  education: [{ id: generateId(), degree: '', institution: '', passingYear: '', result: '' }],
  professional: [],
  family: {
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    brotherCount: 0,
    sisterCount: 0,
    familyType: '',
    familyStatus: '',
    nativeDistrict: '',
  },
  siblings: [],
  contact: { phone: '', email: '', presentAddress: '', permanentAddress: '' },
  expectations: {
    ageRange: '',
    height: '',
    complexion: '',
    education: '',
    profession: '',
    district: '',
    otherRequirements: '',
  },
  photo: null,
};

let saveTimer: ReturnType<typeof setTimeout> | null = null;

function debouncedSave(state: BiodataStore) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveToStorage({
      currentStep: state.currentStep,
      language: state.language,
      formData: state.formData,
      customization: state.customization,
    });
  }, AUTOSAVE_DEBOUNCE_MS);
}

export const useBiodataStore = create<BiodataStore>()(
  subscribeWithSelector((set, get) => ({
    currentStep: 1,
    language: 'en',
    formData: initialFormData,
    customization: DEFAULT_CUSTOMIZATION,
    isExporting: false,
    exportProgress: 0,

    setStep: (step) => set({ currentStep: step }),
    setLanguage: (lang) => set({ language: lang }),

    updatePersonal: (data) =>
      set((s) => {
        const next = { ...s, formData: { ...s.formData, personal: { ...s.formData.personal, ...data } } };
        debouncedSave(next);
        return next;
      }),

    updatePhysical: (data) =>
      set((s) => {
        const next = { ...s, formData: { ...s.formData, physical: { ...s.formData.physical, ...data } } };
        debouncedSave(next);
        return next;
      }),

    updateReligious: (data) =>
      set((s) => {
        const next = { ...s, formData: { ...s.formData, religious: { ...s.formData.religious, ...data } } };
        debouncedSave(next);
        return next;
      }),

    updateFamily: (data) =>
      set((s) => {
        const next = { ...s, formData: { ...s.formData, family: { ...s.formData.family, ...data } } };
        debouncedSave(next);
        return next;
      }),

    updateContact: (data) =>
      set((s) => {
        const next = { ...s, formData: { ...s.formData, contact: { ...s.formData.contact, ...data } } };
        debouncedSave(next);
        return next;
      }),

    updateExpectations: (data) =>
      set((s) => {
        const next = {
          ...s,
          formData: { ...s.formData, expectations: { ...s.formData.expectations, ...data } },
        };
        debouncedSave(next);
        return next;
      }),

    setPhoto: (photo) =>
      set((s) => {
        const next = { ...s, formData: { ...s.formData, photo } };
        debouncedSave(next);
        return next;
      }),

    addEducationEntry: () =>
      set((s) => {
        const entry = { id: generateId(), degree: '', institution: '', passingYear: '', result: '' };
        const next = { ...s, formData: { ...s.formData, education: [...s.formData.education, entry] } };
        debouncedSave(next);
        return next;
      }),

    updateEducationEntry: (id, data) =>
      set((s) => {
        const education = s.formData.education.map((e) => (e.id === id ? { ...e, ...data } : e));
        const next = { ...s, formData: { ...s.formData, education } };
        debouncedSave(next);
        return next;
      }),

    removeEducationEntry: (id) =>
      set((s) => {
        const education = s.formData.education.filter((e) => e.id !== id);
        const next = { ...s, formData: { ...s.formData, education } };
        debouncedSave(next);
        return next;
      }),

    addProfessionalEntry: () =>
      set((s) => {
        const entry = { id: generateId(), title: '', organization: '', duration: '', income: '' };
        const next = { ...s, formData: { ...s.formData, professional: [...s.formData.professional, entry] } };
        debouncedSave(next);
        return next;
      }),

    updateProfessionalEntry: (id, data) =>
      set((s) => {
        const professional = s.formData.professional.map((p) => (p.id === id ? { ...p, ...data } : p));
        const next = { ...s, formData: { ...s.formData, professional } };
        debouncedSave(next);
        return next;
      }),

    removeProfessionalEntry: (id) =>
      set((s) => {
        const professional = s.formData.professional.filter((p) => p.id !== id);
        const next = { ...s, formData: { ...s.formData, professional } };
        debouncedSave(next);
        return next;
      }),

    addSiblingEntry: () =>
      set((s) => {
        const entry = { id: generateId(), name: '', gender: '' as const, maritalStatus: '', profession: '' };
        const next = { ...s, formData: { ...s.formData, siblings: [...s.formData.siblings, entry] } };
        debouncedSave(next);
        return next;
      }),

    updateSiblingEntry: (id, data) =>
      set((s) => {
        const siblings = s.formData.siblings.map((sib) => (sib.id === id ? { ...sib, ...data } : sib));
        const next = { ...s, formData: { ...s.formData, siblings } };
        debouncedSave(next);
        return next;
      }),

    removeSiblingEntry: (id) =>
      set((s) => {
        const siblings = s.formData.siblings.filter((sib) => sib.id !== id);
        const next = { ...s, formData: { ...s.formData, siblings } };
        debouncedSave(next);
        return next;
      }),

    setCustomization: (data) =>
      set((s) => {
        const next = { ...s, customization: { ...s.customization, ...data } };
        debouncedSave(next);
        return next;
      }),

    setExporting: (value) => set({ isExporting: value }),
    setExportProgress: (value) => set({ exportProgress: value }),

    restoreFromStorage: (data) => set((s) => ({ ...s, ...data })),

    clearAll: () => {
      if (saveTimer) clearTimeout(saveTimer);
      clearStorage();
      set({ formData: initialFormData, customization: DEFAULT_CUSTOMIZATION, currentStep: 1 });
    },
  }))
);
