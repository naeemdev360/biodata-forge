import { LenisProvider } from '@/components/providers/LenisProvider';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { DataSecurity } from '@/components/landing/DataSecurity';
import { CallToAction } from '@/components/landing/CallToAction';

export default function LandingPage() {
  return (
    <LenisProvider>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <DataSecurity />
        <CallToAction />
      </main>
    </LenisProvider>
  );
}
