# Design System
# BiodataForge — Marriage Biodata Generator

**Version:** 1.0.0  
**Date:** April 2026  

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Component Library](#5-component-library)
6. [Animation System](#6-animation-system)
7. [Iconography](#7-iconography)
8. [Biodata Layout Templates](#8-biodata-layout-templates)
9. [Responsive Breakpoints](#9-responsive-breakpoints)
10. [Dark Mode](#10-dark-mode)
11. [Accessibility Standards](#11-accessibility-standards)
12. [CSS Variables Reference](#12-css-variables-reference)

---

## 1. Design Philosophy

### 1.1 Core Principles

**Warmth with Precision**  
Marriage biodata sits at the intersection of deep personal significance and formal presentation. The UI must feel warm, trustworthy, and culturally resonant — while being precise, professional, and modern.

**Cultural Sensitivity**  
The visual language draws from South Asian aesthetic traditions (rich colors, ornamental headers, structured hierarchy) while filtering through a contemporary lens. We avoid both sterile Western minimalism and kitschy traditional overload.

**Guided Confidence**  
The 3-step wizard should feel like a knowledgeable friend guiding the user — never intimidating, always clear about what's next.

**Output First**  
Every design decision is evaluated against the final biodata output. The tool exists to serve the document.

### 1.2 Aesthetic Direction

The application uses a **"Refined Heritage"** aesthetic:
- Warm ivory and deep jewel-tone base palette
- Serif display fonts for headings (authority, tradition)
- Clean sans-serif for UI controls (clarity, modernity)
- Generous white space with deliberate ornamental accents
- Gold/amber as the primary accent across the UI shell

---

## 2. Color System

### 2.1 Brand Colors (UI Shell)

These colors are fixed for the application interface, independent of the user's chosen biodata palette.

```css
/* Brand Palette */
--color-brand-50:   #FEF9F0;
--color-brand-100:  #FDF0D9;
--color-brand-200:  #FAD99A;
--color-brand-300:  #F5BE5C;
--color-brand-400:  #EFA030;
--color-brand-500:  #D4822A;  /* Primary Brand */
--color-brand-600:  #A8601E;
--color-brand-700:  #7D4315;
--color-brand-800:  #532C0D;
--color-brand-900:  #2A1506;

/* Neutral Palette */
--color-neutral-0:   #FFFFFF;
--color-neutral-50:  #FAFAF9;
--color-neutral-100: #F5F4F2;
--color-neutral-200: #E8E5E1;
--color-neutral-300: #CCC8C1;
--color-neutral-400: #A39F98;
--color-neutral-500: #7A7570;
--color-neutral-600: #58534E;
--color-neutral-700: #3A3632;
--color-neutral-800: #242220;
--color-neutral-900: #141210;

/* Semantic Colors */
--color-success:     #2D7A4F;
--color-success-bg:  #EDFAF3;
--color-warning:     #B45309;
--color-warning-bg:  #FFF8EB;
--color-error:       #B91C1C;
--color-error-bg:    #FFF1F1;
--color-info:        #1E5A8A;
--color-info-bg:     #EFF6FF;
```

### 2.2 UI Color Roles

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-base` | `#FAFAF9` | Page background |
| `--bg-surface` | `#FFFFFF` | Card, panel backgrounds |
| `--bg-elevated` | `#F5F4F2` | Hover states, subtle highlights |
| `--bg-overlay` | `rgba(0,0,0,0.5)` | Modal scrim |
| `--text-primary` | `#242220` | Headings, body text |
| `--text-secondary` | `#58534E` | Subtitles, metadata |
| `--text-muted` | `#A39F98` | Placeholders, disabled |
| `--text-inverse` | `#FFFFFF` | Text on dark surfaces |
| `--border-subtle` | `#E8E5E1` | Default dividers |
| `--border-default` | `#CCC8C1` | Form inputs |
| `--border-strong` | `#A39F98` | Focused inputs |
| `--accent` | `#D4822A` | CTAs, active states |
| `--accent-hover` | `#A8601E` | CTA hover |

### 2.3 Pre-defined Biodata Palettes

Each palette contains 6 color tokens used within the biodata document itself.

#### Palette 1 — Rose Gold Classic
```
Primary:    #8B4563   (Deep Rose)
Accent:     #C9956A   (Warm Gold)
Background: #FDF6EE   (Cream White)
Surface:    #F7EDE3   (Blush Tint)
Text:       #2D1B13   (Espresso)
Border:     #D4B5A0   (Dusty Rose)
```

#### Palette 2 — Royal Teal
```
Primary:    #1A5E6A   (Deep Teal)
Accent:     #F4A261   (Amber)
Background: #F7FBFC   (Ice White)
Surface:    #E8F4F6   (Pale Teal)
Text:       #0D2A30   (Dark Teal)
Border:     #A3CDD4   (Muted Teal)
```

#### Palette 3 — Vermillion & Ivory
```
Primary:    #C0392B   (Vermillion)
Accent:     #F9C74F   (Saffron)
Background: #FFFDF7   (Ivory)
Surface:    #FFF5E4   (Warm Ivory)
Text:       #1C0F0A   (Near Black)
Border:     #E8C4BA   (Salmon Tint)
```

#### Palette 4 — Deep Maroon & Gold
```
Primary:    #6B1F3A   (Maroon)
Accent:     #D4AF37   (Gold)
Background: #FEF9F4   (Antique White)
Surface:    #F5EAE1   (Parchment)
Text:       #2A0D17   (Deep Maroon Dark)
Border:     #C4A08A   (Warm Tan)
```

#### Palette 5 — Sage & Blush
```
Primary:    #4A7C59   (Forest Sage)
Accent:     #B5838D   (Dusty Rose)
Background: #F8FAF4   (Mint White)
Surface:    #EDF2E8   (Pale Sage)
Text:       #1A2E20   (Dark Forest)
Border:     #B5C9AF   (Sage Border)
```

#### Palette 6 — Midnight Blue
```
Primary:    #1C2B4A   (Midnight)
Accent:     #E8A045   (Amber Gold)
Background: #F7F9FC   (Cool White)
Surface:    #EAF0F8   (Pale Blue)
Text:       #0D1724   (Near Black Blue)
Border:     #A8B8D0   (Steel Blue)
```

#### Palette 7 — Blush & Slate
```
Primary:    #5C6B73   (Slate)
Accent:     #B07D8B   (Mauve)
Background: #FDF7F9   (Rose White)
Surface:    #F2E9ED   (Blush Tint)
Text:       #1E2527   (Charcoal)
Border:     #C4B0B8   (Dusty Mauve)
```

#### Palette 8 — Terracotta & Sand
```
Primary:    #C1551A   (Terracotta)
Accent:     #3D405B   (Indigo)
Background: #FDF8F5   (Sand White)
Surface:    #F5EAE1   (Warm Sand)
Text:       #1F0E06   (Dark Brown)
Border:     #D4B8A8   (Sand Border)
```

### 2.4 Color Palette Generation Algorithm (Detail)

```typescript
function generateProfessionalPalette(): ColorPalette {
  // Step 1: Pick a base hue, bias toward jewel tones
  const biasedRanges = [
    [0, 20],    // Deep Red / Crimson
    [30, 50],   // Amber / Gold  
    [160, 200], // Teal / Cyan
    [210, 250], // Blue / Indigo
    [270, 320], // Purple / Violet
    [330, 360], // Rose / Magenta
  ];
  const range = biasedRanges[Math.floor(Math.random() * biasedRanges.length)];
  const H = range[0] + Math.random() * (range[1] - range[0]);
  
  // Step 2: Derive complementary accent
  const accentH = (H + 150 + Math.random() * 30 - 15) % 360;
  
  // Step 3: Build tokens
  const primary    = `hsl(${H}, ${rand(55,70)}%, ${rand(25,38)}%)`;
  const accent     = `hsl(${accentH}, ${rand(55,70)}%, ${rand(40,55)}%)`;
  const background = `hsl(${H}, ${rand(18,28)}%, ${rand(96,98)}%)`;
  const surface    = `hsl(${H}, ${rand(20,30)}%, ${rand(91,94)}%)`;
  const text       = `hsl(${H}, ${rand(10,18)}%, ${rand(10,18)}%)`;
  const border     = `hsl(${H}, ${rand(20,35)}%, ${rand(78,88)}%)`;
  
  // Step 4: WCAG AA contrast check (4.5:1 minimum)
  // Adjust text darkness until contrast passes
  
  return { primary, accent, background, surface, text, border };
}
```

---

## 3. Typography

### 3.1 Font Stacks

#### UI Shell Fonts (Fixed)

```css
/* Display / Hero */
--font-display: 'Cormorant Garamond', Georgia, serif;

/* Headings */
--font-heading: 'Playfair Display', Georgia, serif;

/* Body / UI */
--font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

/* Bengali */
--font-bengali: 'Hind Siliguri', sans-serif;
--font-bengali-display: 'Baloo Da 2', sans-serif;

/* Monospace (code snippets, if any) */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

#### Biodata Font Pairings

**Heritage** (Traditional, Formal)
- Heading: `Playfair Display` (Bold, Italic variants)
- Body: `Lora` (Regular, Italic)
- Bengali: `Baloo Da 2` / `Hind Siliguri`

**Modern** (Contemporary, Clean)
- Heading: `DM Serif Display`
- Body: `DM Sans`
- Bengali: `Baloo Da 2` / `Hind Siliguri`

**Classic** (Timeless, Elegant)
- Heading: `Cormorant Garamond`
- Body: `Source Serif 4`
- Bengali: `Baloo Da 2` / `Hind Siliguri`

### 3.2 Type Scale

```css
/* UI Type Scale (rem, based 16px) */
--text-xs:    0.75rem;   /* 12px — Labels, captions */
--text-sm:    0.875rem;  /* 14px — Secondary UI text */
--text-base:  1rem;      /* 16px — Body default */
--text-lg:    1.125rem;  /* 18px — Large body */
--text-xl:    1.25rem;   /* 20px — Section headings */
--text-2xl:   1.5rem;    /* 24px — Step titles */
--text-3xl:   1.875rem;  /* 30px — Page headings */
--text-4xl:   2.25rem;   /* 36px — Hero subtitle */
--text-5xl:   3rem;      /* 48px — Hero title */
--text-6xl:   3.75rem;   /* 60px — Large hero */
--text-7xl:   4.5rem;    /* 72px — Display */
```

### 3.3 Line Heights

```css
--leading-none:   1;
--leading-tight:  1.25;
--leading-snug:   1.375;
--leading-normal: 1.5;
--leading-relaxed:1.625;
--leading-loose:  2;
```

### 3.4 Font Weight Scale

```css
--font-light:     300;
--font-normal:    400;
--font-medium:    500;
--font-semibold:  600;
--font-bold:      700;
--font-extrabold: 800;
```

### 3.5 Typography Usage Rules

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Landing Hero | Display | 5xl–7xl | Bold | text-primary |
| Landing Subtitle | Body | xl–2xl | Normal | text-secondary |
| Step Title | Heading | 3xl | Bold | text-primary |
| Section Label | Body | sm | Semibold | text-muted (uppercase) |
| Form Label | Body | sm | Medium | text-secondary |
| Input Text | Body | base | Normal | text-primary |
| Button | Body | sm–base | Semibold | — |
| Helper Text | Body | xs | Normal | text-muted |
| Error Text | Body | xs | Medium | color-error |

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

Based on 4px base unit:

```css
--space-0:    0;
--space-px:   1px;
--space-0.5:  2px;
--space-1:    4px;
--space-1.5:  6px;
--space-2:    8px;
--space-2.5:  10px;
--space-3:    12px;
--space-3.5:  14px;
--space-4:    16px;
--space-5:    20px;
--space-6:    24px;
--space-7:    28px;
--space-8:    32px;
--space-9:    36px;
--space-10:   40px;
--space-12:   48px;
--space-14:   56px;
--space-16:   64px;
--space-20:   80px;
--space-24:   96px;
--space-32:   128px;
--space-40:   160px;
--space-48:   192px;
```

### 4.2 Border Radius

```css
--radius-none:  0;
--radius-xs:    2px;
--radius-sm:    4px;
--radius-md:    8px;
--radius-lg:    12px;
--radius-xl:    16px;
--radius-2xl:   24px;
--radius-3xl:   32px;
--radius-full:  9999px;
```

### 4.3 Shadows

```css
--shadow-xs:   0 1px 2px rgba(0,0,0,0.05);
--shadow-sm:   0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);
--shadow-md:   0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06);
--shadow-lg:   0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.05);
--shadow-xl:   0 20px 25px rgba(0,0,0,0.09), 0 8px 10px rgba(0,0,0,0.05);
--shadow-2xl:  0 25px 50px rgba(0,0,0,0.15);
--shadow-inner: inset 0 2px 4px rgba(0,0,0,0.06);

/* Warm shadows (for cards on ivory backgrounds) */
--shadow-warm-sm: 0 2px 8px rgba(100,60,20,0.08);
--shadow-warm-md: 0 4px 16px rgba(100,60,20,0.10);
--shadow-warm-lg: 0 8px 32px rgba(100,60,20,0.12);
```

### 4.4 Grid System

```css
/* Container widths */
--container-sm:  640px;
--container-md:  768px;
--container-lg:  1024px;
--container-xl:  1280px;
--container-2xl: 1440px;

/* Wizard layout */
.wizard-layout {
  display: grid;
  grid-template-columns: 1fr;          /* Mobile */
  gap: var(--space-6);
}

@media (min-width: 1024px) {
  .wizard-layout {
    grid-template-columns: minmax(0, 1fr) 400px;  /* Desktop: form + preview */
  }
}
```

### 4.5 Z-Index Scale

```css
--z-below:    -1;
--z-base:      0;
--z-raised:   10;
--z-dropdown: 100;
--z-sticky:   200;
--z-overlay:  300;
--z-modal:    400;
--z-toast:    500;
--z-tooltip:  600;
```

---

## 5. Component Library

### 5.1 Button

#### Variants

| Variant | Background | Text | Border | Usage |
|---------|-----------|------|--------|-------|
| `primary` | `--accent` | white | none | Main CTAs |
| `secondary` | transparent | `--accent` | `--accent` | Secondary actions |
| `ghost` | transparent | `--text-secondary` | none | Tertiary actions |
| `danger` | `--color-error` | white | none | Destructive actions |
| `outline` | transparent | `--text-primary` | `--border-default` | Neutral actions |

#### Sizes

| Size | Height | Padding H | Font Size | Border Radius |
|------|--------|----------|-----------|---------------|
| `xs` | 28px | 10px | 12px | radius-sm |
| `sm` | 34px | 14px | 13px | radius-md |
| `md` | 42px | 20px | 14px | radius-md |
| `lg` | 50px | 28px | 16px | radius-lg |
| `xl` | 60px | 36px | 18px | radius-xl |

#### States

```css
.btn-primary {
  background: var(--accent);
  color: white;
  transition: background 200ms, transform 150ms, box-shadow 200ms;
}

.btn-primary:hover {
  background: var(--accent-hover);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-xs);
}

.btn-primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
}
```

### 5.2 Input Field

```css
.input {
  height: 44px;
  padding: 0 var(--space-4);
  background: var(--bg-surface);
  border: 1.5px solid var(--border-default);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  color: var(--text-primary);
  transition: border-color 200ms, box-shadow 200ms;
}

.input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(212, 130, 42, 0.15);
  outline: none;
}

.input.error {
  border-color: var(--color-error);
  box-shadow: 0 0 0 3px rgba(185, 28, 28, 0.1);
}

.input::placeholder {
  color: var(--text-muted);
}
```

### 5.3 Form Section Card

```css
.section-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-warm-sm);
}

.section-card__header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

.section-card__icon {
  width: 36px;
  height: 36px;
  background: var(--color-brand-100);
  border-radius: var(--radius-md);
  display: grid;
  place-items: center;
  color: var(--accent);
}

.section-card__title {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.section-card__badge {
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  background: var(--bg-elevated);
  padding: 2px 8px;
  border-radius: var(--radius-full);
}
```

### 5.4 Step Indicator

```css
.step-indicator {
  display: flex;
  align-items: center;
  gap: 0;
}

.step {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.step__circle {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  display: grid;
  place-items: center;
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  transition: background 300ms, color 300ms;
}

.step--completed .step__circle {
  background: var(--accent);
  color: white;
}

.step--active .step__circle {
  background: var(--color-brand-100);
  color: var(--accent);
  border: 2px solid var(--accent);
}

.step--upcoming .step__circle {
  background: var(--bg-elevated);
  color: var(--text-muted);
  border: 2px solid var(--border-subtle);
}

.step__connector {
  height: 2px;
  width: 80px;
  background: var(--border-subtle);
  position: relative;
  overflow: hidden;
}

.step__connector-fill {
  position: absolute;
  inset-block: 0;
  left: 0;
  background: var(--accent);
  transition: width 500ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 5.5 Color Swatch

```css
.color-swatch {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  border: 3px solid transparent;
  cursor: pointer;
  transition: transform 200ms, box-shadow 200ms, border-color 200ms;
  position: relative;
}

.color-swatch:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-md);
}

.color-swatch.selected {
  border-color: var(--text-primary);
  box-shadow: 0 0 0 2px var(--bg-surface), 0 0 0 4px var(--text-primary);
}
```

### 5.6 Image Upload Zone

```css
.upload-zone {
  border: 2px dashed var(--border-default);
  border-radius: var(--radius-xl);
  padding: var(--space-10);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  transition: border-color 200ms, background 200ms;
  background: var(--bg-elevated);
}

.upload-zone:hover,
.upload-zone.drag-over {
  border-color: var(--accent);
  background: var(--color-brand-50);
}
```

### 5.7 Toast Notification

```css
.toast {
  position: fixed;
  top: var(--space-5);
  right: var(--space-5);
  z-index: var(--z-toast);
  min-width: 280px;
  max-width: 400px;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: var(--space-4) var(--space-5);
  box-shadow: var(--shadow-xl);
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.toast--success { border-left: 4px solid var(--color-success); }
.toast--error   { border-left: 4px solid var(--color-error); }
.toast--warning { border-left: 4px solid var(--color-warning); }
.toast--info    { border-left: 4px solid var(--color-info); }
```

---

## 6. Animation System

### 6.1 Easing Functions

```css
/* Standard eases */
--ease-in:         cubic-bezier(0.4, 0, 1, 1);
--ease-out:        cubic-bezier(0, 0, 0.2, 1);
--ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);

/* Expressive eases */
--ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);   /* Overshoot spring */
--ease-bounce:     cubic-bezier(0.68, -0.55, 0.27, 1.55);
--ease-smooth:     cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-silk:       cubic-bezier(0.16, 1, 0.3, 1);        /* Expo out */
```

### 6.2 Duration Scale

```css
--duration-instant: 50ms;
--duration-fast:    150ms;
--duration-normal:  250ms;
--duration-medium:  400ms;
--duration-slow:    600ms;
--duration-slower:  800ms;
--duration-slowest: 1200ms;
```

### 6.3 GSAP Timelines

#### Landing Page Entry Timeline

```javascript
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.6 })
  .from('.hero-title', { y: 40, opacity: 0, duration: 0.8 }, '-=0.3')
  .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
  .from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, scale: 0.95 }, '-=0.4')
  .from('.hero-preview', { y: 60, opacity: 0, duration: 1.0, scale: 0.97 }, '-=0.6');
```

#### ScrollTrigger for Feature Cards

```javascript
gsap.from('.feature-card', {
  scrollTrigger: {
    trigger: '.features-section',
    start: 'top 80%',
  },
  y: 50,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15,
  ease: 'power2.out',
});
```

### 6.4 Framer Motion Variants

#### Step Transition

```typescript
const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.15 },
    },
  }),
};
```

#### Section Expand / Collapse

```typescript
const sectionVariants = {
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.25, delay: 0.05 },
    },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.15 },
    },
  },
};
```

#### Row Add / Remove

```typescript
// AnimatePresence wraps the row list
const rowVariants = {
  initial: { opacity: 0, height: 0, y: -10 },
  animate: {
    opacity: 1,
    height: 'auto',
    y: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};
```

#### Color Palette Card Selection

```typescript
const paletteCardVariants = {
  rest: { scale: 1, boxShadow: 'var(--shadow-sm)' },
  hover: { scale: 1.03, boxShadow: 'var(--shadow-lg)', transition: { duration: 0.2 } },
  selected: { scale: 1.02, boxShadow: '0 0 0 3px var(--accent), var(--shadow-md)' },
};
```

---

## 7. Iconography

### 7.1 Icon Library

**Primary:** `lucide-react` — clean, consistent, 24px stroke icons

### 7.2 Icon Usage Rules

| Context | Size | Stroke Width |
|---------|------|-------------|
| Navigation | 20px | 1.75 |
| Buttons (inline) | 16px | 2 |
| Section icons | 20px | 1.75 |
| Large decorative | 32–48px | 1.5 |
| Tiny (badges) | 12px | 2 |

### 7.3 Icon-to-Section Mapping

| Section | Icon |
|---------|------|
| Personal Info | `UserCircle` |
| Physical | `Ruler` |
| Religious | `Star` |
| Education | `GraduationCap` |
| Professional | `Briefcase` |
| Family | `Users` |
| Contact | `Phone` |
| Expectations | `Heart` |
| Photo Upload | `Camera` |
| Color Palette | `Palette` |
| Layout | `LayoutTemplate` |
| Export PDF | `FileText` |
| Export DOCX | `FileDown` |
| Language | `Globe` |

---

## 8. Biodata Layout Templates

### 8.1 Layout 1 — Classic Elegant

**Visual Style:** Centered, ornamental, traditional  
**Best for:** Formal, conservative presentations  

```
┌──────────────────────────────────────────────────┐
│              ┌──────────────────┐                │
│     [Photo]  │   FULL NAME      │                │
│              │  ─────────────── │                │
│              │  Marriage Biodata│                │
│              └──────────────────┘                │
│  ════════════════════════════════════════════    │
│                                                  │
│  PERSONAL INFORMATION                            │
│  ─────────────────────                          │
│  Date of Birth:    ___________                   │
│  Religion:         ___________                   │
│  Height:           ___________                   │
│                                                  │
│  EDUCATION                                       │
│  ...                                             │
└──────────────────────────────────────────────────┘
```

### 8.2 Layout 2 — Modern Minimal

**Visual Style:** Left-aligned, clean, no ornaments  
**Best for:** Urban professionals, modern families

```
┌──────────────────────────────────────────────────┐
│  ██ FULL NAME                                    │
│     Marriage Biodata                             │
│  ──────────────────────────────────────────────  │
│                                                  │
│  Personal                                        │
│  Date of Birth ................ Jan 1, 1995      │
│  Religion ..................... Islam             │
│                                                  │
│  Education                                       │
│  ...                                             │
└──────────────────────────────────────────────────┘
```

### 8.3 Layout 3 — Two Column Grid

**Visual Style:** Side-by-side, photo prominent  
**Best for:** Photo-first presentations

```
┌───────────────┬────────────────────────────────┐
│               │  FULL NAME                     │
│   [PHOTO]     │  ─────────────────────────     │
│               │  Personal Information          │
│  Contact:     │  DOB:  ________                │
│  ─────────    │  Height: ______                │
│  Phone        │                                │
│  Email        │  Education                     │
│               │  ─────────────                 │
│               │  ...                           │
└───────────────┴────────────────────────────────┘
```

### 8.4 Layout 4 — Royal Heritage

**Visual Style:** Ornate borders, rich, traditional South Asian  
**Best for:** Traditional families, highly formal occasions

```
╔══════════════════════════════════════════════════╗
║  ✦ ─────────────────────────────────────── ✦    ║
║         MARRIAGE BIODATA                         ║
║         Full Name                                ║
║  ✦ ─────────────────────────────────────── ✦    ║
╠══════════════════════════════════════════════════╣
║  [Photo]   Personal Details                      ║
║            ────────────────                      ║
║            Date of Birth: ___                    ║
╚══════════════════════════════════════════════════╝
```

### 8.5 Layout 5 — Contemporary Card

**Visual Style:** Card-per-section, modern, modular  
**Best for:** Digital-first users, younger demographic

```
┌──────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────┐   │
│  │  👤  FULL NAME           [Photo]         │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌────────────────────┐ ┌────────────────────┐  │
│  │  Personal Info     │ │  Education         │  │
│  │  ─────────────     │ │  ─────────────     │  │
│  │  DOB: _______      │ │  BSc CS, BUET      │  │
│  └────────────────────┘ └────────────────────┘  │
└──────────────────────────────────────────────────┘
```

---

## 9. Responsive Breakpoints

```css
/* Tailwind-aligned breakpoints */
--screen-sm:   640px;   /* Small mobile landscape */
--screen-md:   768px;   /* Tablet */
--screen-lg:   1024px;  /* Desktop */
--screen-xl:   1280px;  /* Large desktop */
--screen-2xl:  1536px;  /* Wide desktop */
```

### Responsive Behavior Matrix

| Feature | Mobile (<640px) | Tablet (640–1024px) | Desktop (>1024px) |
|---------|----------------|---------------------|-------------------|
| Landing Hero | Stacked, smaller text | Stacked, medium | Side-by-side |
| Step Indicator | Minimal (numbers only) | Full labels | Full labels |
| Form | Single column | Single column | Single column |
| Live Preview | Tab/modal | Modal | Side panel |
| Palette Grid | 2 cols | 3 cols | 4 cols |
| Layout Picker | Scroll horizontal | 2×3 grid | 3×2 grid |
| Export buttons | Full width | Auto | Auto |

---

## 10. Dark Mode

Dark mode is **not** in scope for v1.0. The design system's CSS variables are structured to support future dark mode addition via a `.dark` class on the root `<html>` element.

Reserved for v2.0:
```css
.dark {
  --bg-base:     #1A1714;
  --bg-surface:  #231F1B;
  --bg-elevated: #2D2924;
  --text-primary: #F5F0EB;
  /* ... */
}
```

---

## 11. Accessibility Standards

### 11.1 Color Contrast

All text/background combinations SHALL meet WCAG 2.1 AA:

| Combination | Min Ratio |
|-------------|-----------|
| Body text on white | 4.5:1 |
| Large text (18pt+) on white | 3:1 |
| UI component borders | 3:1 |
| Icon on background | 3:1 |

### 11.2 Focus Styles

```css
/* Global focus ring */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Focus ring for buttons */
.btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  box-shadow: 0 0 0 4px rgba(212, 130, 42, 0.2);
}
```

### 11.3 ARIA Patterns

- Wizard steps: `role="tablist"` / `role="tab"` pattern
- Collapsible sections: `aria-expanded` on trigger button
- Dynamic rows: `aria-live="polite"` on list container
- Error messages: `aria-describedby` linking to error element
- Loading states: `aria-busy="true"` on export button
- Modal: `role="dialog"` with `aria-modal="true"` and focus trap

---

## 12. CSS Variables Reference

Complete reference of all CSS custom properties:

```css
:root {
  /* === COLORS === */
  /* Brand */
  --color-brand-50:  #FEF9F0;
  --color-brand-100: #FDF0D9;
  --color-brand-500: #D4822A;
  --color-brand-600: #A8601E;
  --color-brand-900: #2A1506;
  
  /* Semantic */
  --color-success: #2D7A4F;
  --color-error:   #B91C1C;
  --color-warning: #B45309;
  --color-info:    #1E5A8A;
  
  /* UI Roles */
  --bg-base:        #FAFAF9;
  --bg-surface:     #FFFFFF;
  --bg-elevated:    #F5F4F2;
  --bg-overlay:     rgba(0,0,0,0.5);
  --text-primary:   #242220;
  --text-secondary: #58534E;
  --text-muted:     #A39F98;
  --text-inverse:   #FFFFFF;
  --border-subtle:  #E8E5E1;
  --border-default: #CCC8C1;
  --border-strong:  #A39F98;
  --accent:         #D4822A;
  --accent-hover:   #A8601E;

  /* === TYPOGRAPHY === */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body:    'DM Sans', system-ui, sans-serif;
  --font-bengali: 'Hind Siliguri', sans-serif;

  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;
  --text-4xl:  2.25rem;
  --text-5xl:  3rem;
  --text-6xl:  3.75rem;
  --text-7xl:  4.5rem;

  --font-light:     300;
  --font-normal:    400;
  --font-medium:    500;
  --font-semibold:  600;
  --font-bold:      700;

  --leading-tight:   1.25;
  --leading-normal:  1.5;
  --leading-relaxed: 1.625;

  /* === SPACING === */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  /* === LAYOUT === */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-2xl:  24px;
  --radius-full: 9999px;

  --shadow-sm:      0 1px 3px rgba(0,0,0,0.08);
  --shadow-md:      0 4px 6px rgba(0,0,0,0.07);
  --shadow-lg:      0 10px 15px rgba(0,0,0,0.08);
  --shadow-xl:      0 20px 25px rgba(0,0,0,0.09);
  --shadow-warm-sm: 0 2px 8px rgba(100,60,20,0.08);
  --shadow-warm-md: 0 4px 16px rgba(100,60,20,0.10);

  --z-dropdown: 100;
  --z-sticky:   200;
  --z-modal:    400;
  --z-toast:    500;

  /* === ANIMATION === */
  --ease-out:    cubic-bezier(0, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-silk:   cubic-bezier(0.16, 1, 0.3, 1);

  --duration-fast:    150ms;
  --duration-normal:  250ms;
  --duration-medium:  400ms;
  --duration-slow:    600ms;
}
```

---

*End of Design System Document*
