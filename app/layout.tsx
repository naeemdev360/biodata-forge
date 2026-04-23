import type { Metadata } from 'next';
import Script from 'next/script';
import {
  Cormorant_Garamond,
  Playfair_Display,
  DM_Sans,
  DM_Serif_Display,
  Lora,
  Source_Serif_4,
  Hind_Siliguri,
  Baloo_Da_2,
} from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { I18nProvider } from '@/components/providers/I18nProvider';
import { Footer } from '@/components/Footer';
import './globals.css';

const cormorant = Cormorant_Garamond({
  variable: '--font-display-loaded',
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-heading-loaded',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-body-loaded',
  subsets: ['latin'],
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  variable: '--font-bengali-loaded',
  subsets: ['bengali'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const balooDa2 = Baloo_Da_2({
  variable: '--font-bengali-display-loaded',
  subsets: ['bengali'],
  weight: ['400', '600', '700'],
  display: 'swap',
});

const lora = Lora({
  variable: '--font-lora-loaded',
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-dm-serif-display-loaded',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

const sourceSerif4 = Source_Serif_4({
  variable: '--font-source-serif-4-loaded',
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BiodataForge — Create Beautiful Marriage Biodata',
  description:
    'Create professional marriage biodata documents in minutes. Multiple layouts, color palettes, bilingual support (English & Bengali), export as PDF or Word.',
  keywords: ['marriage biodata', 'biodata generator', 'বিবাহ বায়োডেটা', 'Bangladesh', 'matrimonial'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const fontVars = [
    cormorant.variable,
    playfair.variable,
    dmSans.variable,
    dmSerifDisplay.variable,
    lora.variable,
    sourceSerif4.variable,
    hindSiliguri.variable,
    balooDa2.variable,
  ].join(' ');

  return (
    <html lang="en" className={`${fontVars} h-full antialiased`}>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: 'var(--font-body-loaded, var(--font-body))' }}
      >
        <I18nProvider>
          <TooltipProvider>
            {children}
            <Footer />
            <Toaster richColors position="top-right" />
          </TooltipProvider>
        </I18nProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GFEVX8L7N4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GFEVX8L7N4');
          `}
        </Script>
      </body>
    </html>
  );
}
