"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useBiodataStore } from "@/hooks/useBiodataStore";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/useToast";
import "@/lib/i18n-client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Step1Form, type Step1FormHandle } from "./Step1Form";
import { Step2Design } from "./Step2Design";
import { Step3Export } from "./Step3Export";
import { StepIndicator } from "./StepIndicator";

const stepVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.15 },
    },
  }),
};

export function WizardShell() {
  const { t } = useTranslation("common");
  const currentStep = useBiodataStore((s) => s.currentStep);
  const setStep = useBiodataStore((s) => s.setStep);
  const clearAll = useBiodataStore((s) => s.clearAll);
  const language = useBiodataStore((s) => s.language);
  const setLanguage = useBiodataStore((s) => s.setLanguage);
  const { wasRestored } = useLocalStorage();
  const toast = useToast();
  const [direction, setDirection] = useState(1);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const step1Ref = useRef<Step1FormHandle>(null);

  useEffect(() => {
    if (wasRestored) toast.success(t("toast.restored"));
  }, [wasRestored]); // eslint-disable-line react-hooks/exhaustive-deps

  async function goNext() {
    if (currentStep === 1) {
      const valid = step1Ref.current?.validate();
      if (!valid) return;
    }
    setDirection(1);
    setStep((currentStep + 1) as 1 | 2 | 3);
  }

  function goBack() {
    setDirection(-1);
    setStep((currentStep - 1) as 1 | 2 | 3);
  }

  function handleSave() {
    toast.success(t("toast.saved"));
  }

  function handleClear() {
    clearAll();
    toast.success(t("toast.cleared"));
    setShowClearConfirm(false);
  }

  function toggleLanguage() {
    const next = language === "en" ? "bn" : "en";
    setLanguage(next);
    import("@/lib/i18n-client").then(({ default: i18n }) =>
      i18n.changeLanguage(next),
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Sticky header */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md"
        style={{
          background: "rgba(250,250,249,0.92)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-bold no-underline transition-opacity hover:opacity-70"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--accent)",
              }}
            >
              {t("common.appName")}
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleLanguage}
                className="text-xs font-medium px-2.5 py-1.5 rounded-full border transition-colors cursor-pointer"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "var(--border-default)",
                  background: "transparent",
                }}
              >
                {language === "en" ? "বাংলা" : "English"}
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="text-xs font-medium px-2.5 py-1.5 rounded-full border transition-colors cursor-pointer"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "var(--border-default)",
                  background: "transparent",
                }}
              >
                {t("common.save")}
              </button>
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="text-xs font-medium px-2.5 py-1.5 rounded-full border transition-colors cursor-pointer"
                style={{
                  color: "var(--color-error)",
                  borderColor: "var(--color-error)",
                  background: "transparent",
                }}
              >
                {t("common.startFresh")}
              </button>
            </div>
          </div>
          <StepIndicator currentStep={currentStep} />
        </div>
      </header>

      {/* Step content */}
      <main className="max-w-5xl mx-auto px-4 py-8 pb-40">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {currentStep === 1 && <Step1Form ref={step1Ref} />}
            {currentStep === 2 && <Step2Design />}
            {currentStep === 3 && <Step3Export />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Sticky footer navigation */}
      <div
        className="fixed bottom-0 inset-x-0 border-t z-40"
        style={{
          background: "rgba(250,250,249,0.95)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
          {currentStep > 1 ? (
            <Button variant="outline" onClick={goBack}>
              {t("common.back")}
            </Button>
          ) : (
            <div />
          )}
          <span
            className="hidden sm:flex items-center gap-1 text-xs"
            style={{ color: '#C4BFB8' }}
          >
            Made with <Heart size={10} fill="#D4822A" style={{ color: '#D4822A' }} /> by Naeem Hasan
          </span>
          {currentStep < 3 ? (
            <Button onClick={goNext}>{t("common.next")}</Button>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Clear confirmation overlay */}
      {showClearConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: "var(--bg-overlay)" }}
          onClick={() => setShowClearConfirm(false)}
        >
          <div
            className="rounded-2xl p-6 max-w-sm w-full mx-4"
            style={{
              background: "var(--bg-surface)",
              boxShadow: "var(--shadow-2xl)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="text-lg font-semibold mb-2"
              style={{
                color: "var(--text-primary)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Start Fresh?
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              All entered data will be permanently deleted. This cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowClearConfirm(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button
                onClick={handleClear}
                style={{ background: "var(--color-error)", color: "#fff" }}
              >
                {t("common.clear")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
