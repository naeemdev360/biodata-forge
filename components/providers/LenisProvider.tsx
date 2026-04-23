"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

/** Initialises Lenis smooth scroll and wires it into the GSAP ticker. */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: import("lenis").default | null = null;

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({ duration: 1.2 });

      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);

      const tickerFn = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      // Refresh ScrollTrigger positions once Lenis is active so any triggers
      // created before Lenis init recalculate against the correct scroller.
      ScrollTrigger.refresh();

      return () => {
        lenis?.off("scroll", onScroll);
        lenis?.destroy();
        gsap.ticker.remove(tickerFn);
      };
    });

    return () => {
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
