# Software Requirements Specification (SRS)
# Marriage Biodata Generator

**Version:** 1.0.0  
**Date:** April 2026  
**Status:** Draft  

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [Functional Requirements](#3-functional-requirements)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [System Architecture](#5-system-architecture)
6. [Data Models](#6-data-models)
7. [User Interface Requirements](#7-user-interface-requirements)
8. [Internationalization](#8-internationalization)
9. [Export Specifications](#9-export-specifications)
10. [Future Enhancements](#10-future-enhancements)

---

## 1. Introduction

### 1.1 Purpose

This document defines the software requirements for **BiodataForge** — a web-based marriage biodata generator that allows users to create professional, visually polished biodata documents in Bengali and English, with multiple layout options, color customization, and export capabilities.

### 1.2 Scope

The application is a single-page web application built with Next.js 16 that guides users through a structured 3-step wizard to:
- Input personal, family, educational, and professional information
- Customize the visual layout and color scheme
- Preview and export the biodata as PDF or DOCX

All user data is persisted in `localStorage` to survive page reloads and browser sessions until explicitly cleared.

### 1.3 Definitions & Acronyms

| Term | Definition |
|------|-----------|
| Biodata | A short document containing personal, family, and professional details, used in South Asian matrimonial contexts |
| Schema / Layout | A pre-designed visual template defining placement of biodata sections |
| Color Palette | A curated set of harmonious colors applied to the selected layout |
| SRS | Software Requirements Specification |
| i18n | Internationalization |
| l10n | Localization |
| GSAP | GreenSock Animation Platform |
| LSP | localStorage Persistence |

### 1.4 Intended Audience

- Frontend Developers implementing the system
- UI/UX Designers creating or extending templates
- QA Engineers writing test cases
- Product Owners reviewing scope

### 1.5 References

- Next.js 16 Documentation: https://nextjs.org/docs
- GSAP Documentation: https://gsap.com/docs
- Framer Motion: https://www.framer.com/motion
- Lenis Scroll: https://lenis.darkroom.engineering
- i18next: https://www.i18next.com

---

## 2. Overall Description

### 2.1 Product Perspective

BiodataForge is a standalone client-side web application. It requires no user account or backend server for core functionality. Export operations (PDF, DOCX) are handled client-side using browser APIs and npm libraries. The application is accessed via a modern web browser.

### 2.2 Product Features (High Level)

- **Landing Page** — Animated introduction with CTA
- **Step 1: Information Gathering** — Structured form with dynamic sections
- **Step 2: UI Customization** — Layout picker + color palette generator
- **Step 3: Review & Export** — Live preview with export options (PDF/DOCX)
- **Persistence** — All state persisted to `localStorage`
- **Bilingual Support** — English and Bengali (বাংলা)

### 2.3 User Classes and Characteristics

| User Class | Description |
|------------|-------------|
| Primary User | Individual creating their own marriage biodata |
| Assisted User | Parent or guardian filling out biodata on behalf of a candidate |
| Power User | User who wants full customization of layout and color scheme |

### 2.4 Operating Environment

- **Browsers:** Chrome 120+, Firefox 121+, Safari 17+, Edge 120+
- **Devices:** Desktop (primary), Tablet (secondary), Mobile (tertiary)
- **Min Viewport:** 360px wide (mobile), 1024px (full feature access)
- **JavaScript:** Required (ES2022+)
- **Storage:** localStorage (~5MB typical limit)

### 2.5 Assumptions and Dependencies

- User has a modern browser with JavaScript enabled
- `localStorage` is available and not blocked (private browsing may limit this)
- No server-side rendering is needed for the wizard itself; SSR is used only for the landing page for SEO
- Internet connection is required only on first load (asset loading); subsequent use can be offline

---

## 3. Functional Requirements

### 3.1 Landing Page

#### FR-LP-01: Hero Section
The landing page SHALL display a full-viewport hero section containing:
- Product name and tagline in both English and Bengali
- A prominent "Start Creating" CTA button
- Background animation (GSAP-powered particle or geometric effect)
- Smooth entrance animations on page load (staggered via GSAP timeline)

#### FR-LP-02: Feature Highlights
The landing page SHALL display at least 4 feature cards highlighting:
- Multiple layouts
- Color customization
- Bilingual support
- Export options (PDF/DOCX)

#### FR-LP-03: How It Works
The landing page SHALL include a minimal 3-step visual walkthrough of the biodata creation process.

#### FR-LP-04: Smooth Scroll
Lenis smooth scrolling SHALL be initialized globally on the landing page.

#### FR-LP-05: Language Toggle
A language toggle (EN / বাংলা) SHALL be accessible from the landing page header and persist across the session.

---

### 3.2 Wizard Navigation

#### FR-WZ-01: Step Indicator
A persistent top-bar step indicator SHALL display:
- Step number (1, 2, 3)
- Step label (Info / Design / Export)
- Active, completed, and upcoming states with distinct visual treatment
- Animated transitions between states (Framer Motion)

#### FR-WZ-02: Navigation Controls
Each step SHALL have:
- A "Next" button (disabled until required fields in that step are valid)
- A "Back" button (not shown on Step 1)
- A "Save Progress" link that explicitly triggers localStorage save with visual confirmation toast

#### FR-WZ-03: Step Persistence
On page reload, the application SHALL restore the user to the last active step with all previously entered data.

#### FR-WZ-04: Progress Preservation Warning
If a user attempts to navigate away from the page, the application SHALL display a browser `beforeunload` warning noting unsaved changes (only when data exists and has not been exported).

---

### 3.3 Step 1 — Information Gathering

#### FR-S1-01: Sections
The form SHALL be organized into the following collapsible sections:

| Section | Required? |
|---------|-----------|
| Personal Information | Yes |
| Physical Attributes | Optional |
| Religious Information | Optional |
| Educational Background | Yes |
| Professional Information | Optional |
| Family Information | Yes |
| Contact Information | Yes |
| Expectations / Partner Preferences | Optional |

#### FR-S1-02: Personal Information Fields
The Personal Information section SHALL include:

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Full Name | Text | Yes | Min 2 chars |
| Date of Birth | Date | Yes | Must be 18+ years ago |
| Place of Birth | Text | No | — |
| Nationality | Text | No | Default: "Bangladeshi" |
| Religion | Select | No | Islam, Hindu, Christian, Buddhist, Other |
| Marital Status | Select | Yes | Never Married, Divorced, Widowed |
| Height | Text | No | Format: 5'6" or cm |
| Complexion | Select | No | — |
| Blood Group | Select | No | A+, A-, B+, B-, AB+, AB-, O+, O- |
| Profile Photo | Image Upload | No | JPG/PNG/WEBP, max 5MB |

#### FR-S1-03: Educational Background Fields
The section SHALL support **multiple entries** (add/remove rows) with fields:

| Field | Type | Required |
|-------|------|----------|
| Degree / Certificate | Text | Yes (first entry) |
| Institution | Text | Yes (first entry) |
| Passing Year | Year | No |
| Result / GPA | Text | No |

#### FR-S1-04: Professional Information Fields
The section SHALL support **multiple entries** with fields:

| Field | Type | Required |
|-------|------|----------|
| Job Title | Text | No |
| Organization | Text | No |
| Duration | Text | No |
| Monthly Income (Optional) | Text | No |

#### FR-S1-05: Family Information Fields
The section SHALL include fixed fields plus **sibling entries** (add/remove):

| Field | Type | Required |
|-------|------|----------|
| Father's Name | Text | Yes |
| Father's Occupation | Text | No |
| Mother's Name | Text | No |
| Mother's Occupation | Text | No |
| Number of Brothers | Number | No |
| Number of Sisters | Number | No |
| Sibling Detail Rows | Dynamic | No |
| Family Type | Select (Nuclear/Joint) | No |
| Family Status | Select | No |
| Native Village/District | Text | No |

#### FR-S1-06: Contact Information Fields

| Field | Type | Required |
|-------|------|----------|
| Phone Number | Tel | Yes |
| Email Address | Email | No |
| Present Address | Textarea | Yes |
| Permanent Address | Textarea | No |

#### FR-S1-07: Dynamic Row Management
All dynamic sections (Education, Professional, Siblings) SHALL:
- Have an "Add Row" button with animated entry (Framer Motion layout animation)
- Have a "Remove" button on each row (except the first row in required sections)
- Animate row removal with exit animation

#### FR-S1-08: Photo Upload
- Upload SHALL support drag-and-drop and click-to-upload
- Uploaded image SHALL be previewed immediately
- Image SHALL be stored as base64 in localStorage
- User SHALL be able to remove uploaded photo

#### FR-S1-09: Field Validation
- Required fields SHALL be validated on "Next" attempt
- Invalid fields SHALL be highlighted with error messages
- Validation messages SHALL be displayed in the selected language

#### FR-S1-10: Collapsible Sections
Optional sections SHALL be collapsible with a toggle. Collapsed sections SHALL still be included in the biodata if data was previously entered. An indicator SHALL show "filled" vs "empty" state per section.

---

### 3.4 Step 2 — UI Customization

#### FR-S2-01: Layout Selection
The customization step SHALL present **5 pre-defined layouts**:

| ID | Name | Description |
|----|------|-------------|
| L1 | Classic Elegant | Traditional centered layout with ornamental header |
| L2 | Modern Minimal | Clean left-aligned layout with subtle dividers |
| L3 | Two-Column Grid | Side-by-side layout with photo on left |
| L4 | Royal Heritage | Rich border-heavy layout inspired by traditional aesthetics |
| L5 | Contemporary Card | Card-based modular sections |

Each layout SHALL be shown as an animated thumbnail with hover preview.

#### FR-S2-02: Custom Layout Builder
A "Custom" option SHALL allow users to:
- Choose section order by drag-and-drop reordering
- Toggle visibility of each section
- Choose header style (centered, left, with divider, with photo)
- Choose body font category (serif, sans-serif, display)

#### FR-S2-03: Color Palette Generation

##### FR-S2-03a: Pre-defined Palettes
At least 8 professionally curated palettes SHALL be offered, optimized for print and readability:

| Palette Name | Primary | Accent | Background |
|-------------|---------|--------|------------|
| Rose Gold | #C9956A | #8B5E3C | #FDF6EE |
| Royal Teal | #1A5E6A | #F4A261 | #F7FBFC |
| Vermillion & Ivory | #C0392B | #F9C74F | #FFFDF7 |
| Deep Maroon | #6B1F3A | #D4AF37 | #FEF9F4 |
| Sage Green | #4A7C59 | #B5838D | #F8FAF4 |
| Midnight Blue | #1C2B4A | #E8A045 | #F7F9FC |
| Blush & Slate | #B07D8B | #5C6B73 | #FDF7F9 |
| Terracotta | #C1551A | #3D405B | #FDF8F5 |

##### FR-S2-03b: Random Palette Generator
A "Generate Palette" button SHALL trigger an algorithm that:
- Generates a new harmonious color palette using HSL color theory (see Section 5.3)
- Ensures WCAG AA contrast compliance for text/background pairs
- Immediately applies the generated palette to the live preview
- Animates the color transition smoothly (CSS transitions, 400ms)
- Displays the hex codes for the generated colors

##### FR-S2-03c: Manual Color Override
Users SHALL be able to click any color swatch to open a color picker and manually adjust individual colors.

#### FR-S2-04: Live Preview
A real-time preview panel SHALL:
- Render the biodata with the selected layout and current color palette
- Update instantly when layout or color changes
- Be scrollable if the biodata content exceeds the preview viewport
- Show a "Full Preview" expand button to see the full output in a modal

#### FR-S2-05: Font Selection
Users SHALL be able to choose from at least 3 font pairings:

| Pairing Name | Heading Font | Body Font |
|-------------|-------------|-----------|
| Heritage | Playfair Display | Lora |
| Modern | DM Serif Display | DM Sans |
| Classic | Cormorant Garamond | Source Serif 4 |

For Bengali, the corresponding fonts SHALL use:
- Hind Siliguri (body)
- Baloo Da 2 (headings)

---

### 3.5 Step 3 — Review & Export

#### FR-S3-01: Full Preview
Step 3 SHALL render a full-fidelity preview of the final biodata, paginated to show how it will appear on A4 paper.

#### FR-S3-02: Edit Shortcut
Each section in the preview SHALL have an "Edit" icon that navigates back to the relevant section in Step 1 with that section scrolled into view.

#### FR-S3-03: PDF Export
- Export SHALL generate a PDF formatted for A4 (210mm × 297mm)
- PDF SHALL embed fonts and images
- PDF SHALL be generated client-side using `html2canvas` + `jsPDF` or `react-pdf`
- File name SHALL default to: `[Full Name]_Biodata.pdf`

#### FR-S3-04: DOCX Export
- Export SHALL generate a `.docx` file using `docx` npm package
- DOCX SHALL preserve heading hierarchy, tables, and image placement
- File name SHALL default to: `[Full Name]_Biodata.docx`

#### FR-S3-05: Export Status
During export, the application SHALL display:
- A loading spinner / progress animation
- Success confirmation with download trigger
- Error state with retry option

#### FR-S3-06: Share Link (Future)
A placeholder "Share" button SHALL appear but be labeled "Coming Soon" in v1.0.

---

### 3.6 Persistence (localStorage)

#### FR-LS-01: Auto-save
All form data SHALL be auto-saved to `localStorage` on every field change (debounced 500ms).

#### FR-LS-02: Key Structure
Data SHALL be stored under a namespaced key: `biodata_forge_v1`.

#### FR-LS-03: Restore on Load
On application load, if data exists in `localStorage`, it SHALL be restored and the user SHALL be offered a toast notification: "Welcome back! We've restored your previous data."

#### FR-LS-04: Clear Data
A "Start Fresh" / "Clear All Data" option SHALL be accessible from the wizard header, with a confirmation dialog before clearing.

#### FR-LS-05: Storage Schema
```json
{
  "version": "1.0",
  "lastSaved": "ISO8601 timestamp",
  "currentStep": 1,
  "language": "en",
  "formData": { ... },
  "customization": {
    "layoutId": "L1",
    "paletteId": "rose_gold",
    "customPalette": null,
    "fontPairing": "heritage"
  }
}
```

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Metric | Target |
|--------|--------|
| Initial Page Load (LCP) | < 2.5s on 4G |
| Step Transition Animation | 60fps |
| Color Palette Generation | < 50ms |
| PDF Export (typical biodata) | < 5s |
| DOCX Export | < 3s |
| localStorage Read/Write | < 10ms |

### 4.2 Accessibility

- All interactive elements SHALL have ARIA labels
- Color contrast SHALL meet WCAG 2.1 AA (4.5:1 for normal text, 3:1 for large text)
- Form fields SHALL have associated `<label>` elements
- Keyboard navigation SHALL work throughout the wizard
- Focus management SHALL be correct on step transitions

### 4.3 Responsiveness

| Breakpoint | Behavior |
|-----------|---------|
| < 640px (mobile) | Single column form; preview hidden; accessible via tab |
| 640–1024px (tablet) | Single column form; preview in modal |
| > 1024px (desktop) | Side-by-side form and preview in Step 2 |

### 4.4 Browser Storage

- Application SHALL gracefully handle `localStorage` quota exceeded errors
- Application SHALL display a warning if `localStorage` is unavailable (e.g., incognito mode restrictions)

### 4.5 Security

- No user data SHALL be transmitted to any server
- Image data stored as base64 SHALL be validated for MIME type before storage
- No external analytics or tracking scripts

### 4.6 Maintainability

- All text strings SHALL be externalized in i18n JSON files
- Layout templates SHALL be defined as declarative config objects (not hardcoded JSX)
- Color palette algorithm SHALL be isolated in a pure utility function

---

## 5. System Architecture

### 5.1 Directory Structure

```
biodata-forge/
├── app/
│   ├── layout.tsx              # Root layout with Lenis, i18n provider
│   ├── page.tsx                # Landing page
│   └── create/
│       └── page.tsx            # Wizard page
├── components/
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   └── HowItWorks.tsx
│   ├── wizard/
│   │   ├── WizardShell.tsx     # Step container + navigation
│   │   ├── StepIndicator.tsx
│   │   ├── Step1Form/
│   │   │   ├── index.tsx
│   │   │   ├── PersonalSection.tsx
│   │   │   ├── EducationSection.tsx
│   │   │   ├── ProfessionalSection.tsx
│   │   │   ├── FamilySection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── Step2Design/
│   │   │   ├── index.tsx
│   │   │   ├── LayoutPicker.tsx
│   │   │   ├── PalettePicker.tsx
│   │   │   ├── PaletteGenerator.tsx
│   │   │   ├── FontPicker.tsx
│   │   │   └── LivePreview.tsx
│   │   └── Step3Export/
│   │       ├── index.tsx
│   │       ├── FullPreview.tsx
│   │       ├── ExportPDF.tsx
│   │       └── ExportDOCX.tsx
│   ├── biodata/
│   │   ├── layouts/
│   │   │   ├── ClassicElegant.tsx
│   │   │   ├── ModernMinimal.tsx
│   │   │   ├── TwoColumnGrid.tsx
│   │   │   ├── RoyalHeritage.tsx
│   │   │   └── ContemporaryCard.tsx
│   │   └── BiodataRenderer.tsx # Selects and renders layout
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Textarea.tsx
│       ├── ImageUpload.tsx
│       ├── ColorSwatch.tsx
│       ├── Toast.tsx
│       └── Modal.tsx
├── lib/
│   ├── storage.ts              # localStorage helpers
│   ├── colorPalette.ts         # Palette generation algorithm
│   ├── exportPDF.ts            # PDF export logic
│   ├── exportDOCX.ts           # DOCX export logic
│   ├── validation.ts           # Form validation rules
│   └── constants.ts            # Layouts, palettes, fonts config
├── hooks/
│   ├── useBiodataStore.ts      # Zustand store
│   ├── useLocalStorage.ts      # Persistence hook
│   └── useColorPalette.ts      # Palette generation hook
├── i18n/
│   ├── en.json
│   └── bn.json
├── public/
│   └── fonts/
├── styles/
│   └── globals.css
└── types/
    └── biodata.ts              # TypeScript interfaces
```

### 5.2 State Management

**Zustand** SHALL be used as the primary state manager with the following slices:

```typescript
interface BiodataStore {
  // Meta
  currentStep: 1 | 2 | 3;
  language: 'en' | 'bn';
  
  // Form Data
  formData: BiodataFormData;
  
  // Customization
  customization: CustomizationState;
  
  // UI State
  isExporting: boolean;
  exportProgress: number;
  
  // Actions
  setStep: (step: number) => void;
  updateFormData: (section: string, data: Partial<BiodataFormData>) => void;
  setCustomization: (customization: Partial<CustomizationState>) => void;
  clearAll: () => void;
}
```

### 5.3 Color Palette Generation Algorithm

The palette generator SHALL use the following algorithm:

```
1. Generate a random base hue H ∈ [0, 360]
2. Bias H away from skin-tone ranges (25–45°) and neon ranges
3. Derive palette using modified analogous-complementary split:
   - Primary:    HSL(H, 55–70%, 25–40%)         → Deep, rich tone
   - Accent:     HSL(H + 150°, 60–75%, 45–60%)  → Complementary contrast
   - Background: HSL(H, 15–25%, 96–98%)          → Near-white, warm tint
   - Surface:    HSL(H, 20–30%, 92–95%)          → Card/section background
   - Text:       HSL(H, 10–15%, 12–18%)          → Near-black body text
4. Validate WCAG AA contrast: Text on Background ≥ 4.5:1
   - If fail: darken Primary and Text until passing
5. Return { primary, accent, background, surface, text, border }
```

---

## 6. Data Models

### 6.1 Core Types

```typescript
interface BiodataFormData {
  personal: PersonalInfo;
  physical: PhysicalInfo;
  religious: ReligiousInfo;
  education: EducationEntry[];
  professional: ProfessionalEntry[];
  family: FamilyInfo;
  siblings: SiblingEntry[];
  contact: ContactInfo;
  expectations: ExpectationsInfo;
  photo: string | null; // base64
}

interface PersonalInfo {
  fullName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  religion: string;
  maritalStatus: 'never_married' | 'divorced' | 'widowed';
  height: string;
  complexion: string;
  bloodGroup: string;
}

interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  passingYear: string;
  result: string;
}

interface ProfessionalEntry {
  id: string;
  title: string;
  organization: string;
  duration: string;
  income: string;
}

interface FamilyInfo {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  brotherCount: number;
  sisterCount: number;
  familyType: 'nuclear' | 'joint';
  familyStatus: string;
  nativeDistrict: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  presentAddress: string;
  permanentAddress: string;
}

interface CustomizationState {
  layoutId: 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'custom';
  paletteId: string;
  customPalette: ColorPalette | null;
  fontPairing: 'heritage' | 'modern' | 'classic';
  customLayout?: CustomLayoutConfig;
}

interface ColorPalette {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  border: string;
}
```

---

## 7. User Interface Requirements

### 7.1 Global UI Standards

- Minimum tap target: 44×44px
- Transition duration standard: 200ms (micro), 400ms (layout), 600ms (page)
- Border radius scale: 4px (inputs), 8px (cards), 16px (modals), 9999px (pills)
- Shadow scale: defined in design system

### 7.2 Form UX

- Fields SHALL display inline validation (not only on submit)
- Required fields SHALL have a red asterisk indicator
- Optional sections SHALL have a "(Optional)" label in muted text
- Long forms SHALL use sticky section headers while scrolling

### 7.3 Animation Requirements

| Interaction | Animation Type | Library | Duration |
|------------|---------------|---------|---------|
| Page load | Staggered fade-up | GSAP | 800ms total |
| Step transition | Slide + fade | Framer Motion | 400ms |
| Form section expand | Height animation | Framer Motion | 300ms |
| Row add/remove | Layout animation | Framer Motion | 250ms |
| Color palette change | CSS transition | CSS | 400ms |
| Export loading | Spinning arc | CSS/GSAP | Loop |
| Toast notification | Slide-in from top-right | Framer Motion | 300ms |

---

## 8. Internationalization

### 8.1 Supported Languages (v1.0)

| Code | Language | Script | Status |
|------|----------|--------|--------|
| en | English | Latin | ✅ v1.0 |
| bn | Bengali / Bangla | Bengali | ✅ v1.0 |

### 8.2 Implementation

- **Library:** `next-i18next` or `i18next` with React context
- Language toggle SHALL be visible in the header at all times
- Language change SHALL be instant (no page reload)
- All UI labels, section headings, button text, validation messages, and placeholder text SHALL be translated
- The output biodata document SHALL be rendered in the selected language
- Numbers in Bengali SHALL use Bengali numerals (০১২৩৪৫৬৭৮৯) when language is `bn`

### 8.3 Future Languages (Post v1.0)

Hindi (hi), Urdu (ur), Tamil (ta)

---

## 9. Export Specifications

### 9.1 PDF Export

| Property | Value |
|---------|-------|
| Page Size | A4 (210 × 297mm) |
| Margins | 15mm all sides |
| Resolution | 150 DPI (screen preview), 300 DPI (final export) |
| Font Embedding | Yes (subset) |
| Image Compression | JPEG 85% quality |
| Library | `html2canvas` v1 + `jsPDF` v2 |
| Filename | `{fullName}_Biodata_{YYYYMMDD}.pdf` |

### 9.2 DOCX Export

| Property | Value |
|---------|-------|
| Library | `docx` npm package |
| Formatting | Heading styles, table for two-column layouts |
| Image | Inline, max width 4cm |
| Font | Times New Roman (fallback for cross-platform) |
| Filename | `{fullName}_Biodata_{YYYYMMDD}.docx` |

---

## 10. Future Enhancements

| Priority | Feature |
|---------|---------|
| High | Cloud save / shareable link |
| High | More language support (Hindi, Urdu) |
| Medium | Custom color picker (full HSL wheel) |
| Medium | AI-assisted bio paragraph generator |
| Medium | QR code embed in biodata |
| Low | WhatsApp/Email direct share |
| Low | Print-optimized mode |
| Low | Biodata comparison tool for families |
| Low | Premium templates marketplace |

---

*End of SRS Document*
