"use client";

import "@/lib/i18n-client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { HeroBiodataPreview } from "./HeroBiodataPreview";

gsap.registerPlugin(useGSAP);

const FEATURE_PILLS = [
  { icon: "✦", label: "5 Layouts" },
  { icon: "◈", label: "8 Palettes" },
  { icon: <FileText size={11} />, label: "PDF & Word" },
] as const;

export function Hero() {
  const { t } = useTranslation("common");
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.6 })
        .from(".hero-title", { y: 40, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(
          ".hero-cta",
          { y: 20, opacity: 0, duration: 0.6, scale: 0.95 },
          "-=0.4",
        )
        .from(".hero-pills", { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(
          ".hero-preview",
          { y: 60, opacity: 0, duration: 1.0, scale: 0.97 },
          "-=0.6",
        );
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".hero-blob").forEach((blob, i) => {
        gsap.to(blob, {
          y: i % 2 === 0 ? -35 : 35,
          x: i % 3 === 0 ? -22 : 22,
          duration: 5 + i * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.6,
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{
        background: [
          "radial-gradient(ellipse 70% 60% at 85% 5%, rgba(212,130,42,0.22) 0%, transparent 55%)",
          "radial-gradient(ellipse 55% 45% at 5% 95%, rgba(245,190,92,0.14) 0%, transparent 50%)",
          "radial-gradient(ellipse 60% 50% at 40% 55%, rgba(253,240,217,0.45) 0%, transparent 55%)",
          "linear-gradient(160deg, #FEF9F0 0%, #FAFAF9 65%)",
        ].join(", "),
      }}
    >
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(100,60,15,0.07) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Bengali watermark */}
      <div
        className="absolute top-16 -right-16 pointer-events-none select-none"
        style={{
          fontFamily: '"Baloo Da 2", sans-serif',
          fontSize: "13rem",
          fontWeight: 700,
          color: "#D4822A",
          opacity: 0.045,
          transform: "rotate(12deg)",
          lineHeight: 1,
        }}
        aria-hidden
      >
        বিবাহ
      </div>

      {/* Background blobs */}
      <div
        className="hero-blob absolute -top-24 -right-24 w-[540px] h-[540px] rounded-full pointer-events-none"
        style={{ background: "#FAD99A", opacity: 0.48, filter: "blur(72px)" }}
      />
      <div
        className="hero-blob absolute -bottom-28 -left-28 w-[440px] h-[440px] rounded-full pointer-events-none"
        style={{ background: "#F5BE5C", opacity: 0.28, filter: "blur(90px)" }}
      />
      <div
        className="hero-blob absolute top-1/3 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "#FDF0D9", opacity: 0.65, filter: "blur(56px)" }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
        {/* Left: copy */}
        <div className="flex-1 text-center lg:text-left">
          <div className="hero-badge inline-flex items-center gap-1.5 mb-7">
            <span
              className="text-xs font-semibold px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5"
              style={{
                background: "rgba(212,130,42,0.1)",
                color: "#A8601E",
                border: "1px solid rgba(212,130,42,0.22)",
              }}
            >
              <Sparkles size={11} />
              {t("landing.hero.badge")}
            </span>
          </div>

          <h1
            className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              color: "#242220",
            }}
          >
            Create Your Perfect
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #D4822A 0%, #7D4315 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Marriage Biodata
            </span>
          </h1>

          <p
            className="hero-subtitle text-lg sm:text-xl leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
            style={{ color: "#58534E" }}
          >
            {t("landing.hero.subtitle")}
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start mb-8">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-base no-underline transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #D4822A 0%, #A8601E 100%)",
                color: "#fff",
                boxShadow:
                  "0 4px 20px rgba(212,130,42,0.4), 0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              {t("landing.hero.cta")}
              <ArrowRight size={18} />
            </Link>
            <span className="text-sm" style={{ color: "#A39F98" }}>
              No signup · Free forever
            </span>
          </div>

          {/* Feature pills */}
          <div className="hero-pills flex flex-wrap gap-2 justify-center lg:justify-start">
            {FEATURE_PILLS.map(({ icon, label }) => (
              <span
                key={label}
                className="text-xs font-medium px-3 py-1.5 rounded-full flex items-center"
                style={{
                  background: "rgba(255,255,255,0.72)",
                  color: "#58534E",
                  border: "1px solid rgba(212,130,42,0.18)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span style={{ color: "#D4822A", marginRight: 4 }}>{icon}</span>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Right: preview */}
        <div className="hero-preview flex-shrink-0 relative">
          {/* Top badge */}
          <div
            className="absolute -top-5 -left-7 z-20 px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{
              background: "#fff",
              color: "#D4822A",
              border: "1px solid rgba(212,130,42,0.18)",
              boxShadow: "0 4px 16px rgba(100,60,10,0.1)",
            }}
          >
            ✦ 5 layouts
          </div>

          {/* Bottom badge */}
          <div
            className="absolute -bottom-4 -right-5 z-20 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1"
            style={{
              background: "#fff",
              color: "#2D7A4F",
              border: "1px solid rgba(45,122,79,0.18)",
              boxShadow: "0 4px 16px rgba(0,80,40,0.08)",
            }}
          >
            <FileText size={11} /> PDF ready
          </div>

          {/* Ambient glow */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(212,130,42,0.18) 0%, transparent 70%)",
              filter: "blur(28px)",
              transform: "scale(1.15)",
            }}
          />

          {/* Card with 3D perspective */}
          <div
            className="relative transition-transform duration-500"
            style={{
              transform: "perspective(1200px) rotateY(-8deg) rotateX(4deg)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "perspective(1200px) rotateY(-2deg) rotateX(1deg) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "perspective(1200px) rotateY(-8deg) rotateX(4deg)";
            }}
          >
            <HeroBiodataPreview />
          </div>
        </div>
      </div>

      {/* Soft bottom fade into next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(250,249,248,0.7))",
        }}
      />
    </section>
  );
}
