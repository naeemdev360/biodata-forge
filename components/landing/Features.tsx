"use client";

import "@/lib/i18n-client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileDown, Globe, LayoutTemplate, Palette } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FEATURE_ICONS = [LayoutTemplate, Palette, Globe, FileDown] as const;
const FEATURE_KEYS = ["layouts", "colors", "bilingual", "export"] as const;
const ACCENT_COLORS = ["#D4822A", "#7D4315", "#1A5E6A", "#6B1F3A"] as const;
const CARD_NUMS = ["01", "02", "03", "04"] as const;

export function Features() {
  const { t } = useTranslation("common");
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const header =
        containerRef.current!.querySelector<HTMLElement>(".features-header")!;
      const cards = gsap.utils.toArray<HTMLElement>(".feature-card");

      gsap.set(header, { opacity: 0, y: 30 });
      gsap.set(cards, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          });
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            delay: 0.3,
          });
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="features-section py-28 px-6"
      style={{ background: "#FFFFFF" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="features-header text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              color: "#242220",
              letterSpacing: "-0.02em",
            }}
          >
            {t("landing.features.title")}
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="h-px w-12"
              style={{ background: "rgba(212,130,42,0.3)" }}
            />
            <span style={{ color: "#D4822A", fontSize: "1.1rem" }}>✦</span>
            <div
              className="h-px w-12"
              style={{ background: "rgba(212,130,42,0.3)" }}
            />
          </div>
          <p
            className="text-base sm:text-lg max-w-lg mx-auto"
            style={{ color: "#6B6560" }}
          >
            Built for South Asian matrimonial traditions, polished for the
            modern age.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURE_KEYS.map((key, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <FeatureCard
                key={key}
                icon={<Icon size={22} />}
                title={t(`landing.features.${key}.title`)}
                description={t(`landing.features.${key}.description`)}
                accent={ACCENT_COLORS[i]}
                num={CARD_NUMS[i]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accent: string;
  num: string;
}

function FeatureCard({
  icon,
  title,
  description,
  accent,
  num,
}: FeatureCardProps) {
  return (
    <div
      className="feature-card rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden cursor-pointer"
      style={{
        background: "#FFFFFF",
        border: `1px solid #E8E6E1`,
        borderTopWidth: "3px",
        borderTopColor: accent,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 12px 32px rgba(212,130,42,0.15), 0 4px 12px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.04)";
      }}
    >
      <div
        className="absolute -right-2 -top-4 pointer-events-none select-none leading-none"
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: "5rem",
          fontWeight: 700,
          color: accent,
          opacity: 0.05,
        }}
        aria-hidden
      >
        {num}
      </div>

      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: "linear-gradient(135deg, #FDF0D9, #FAD99A)",
          color: accent,
        }}
      >
        {icon}
      </div>

      <div>
        <h3
          className="font-semibold mb-1.5"
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: "1.1rem",
            color: "#1A1816",
          }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "#58534E" }}>
          {description}
        </p>
      </div>
    </div>
  );
}
