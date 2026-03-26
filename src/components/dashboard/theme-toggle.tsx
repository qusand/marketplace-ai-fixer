"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

// View Transitions API type (not yet in all TS DOM libs)
type ViewTransitionDocument = Document & {
  startViewTransition: (cb: () => void | Promise<void>) => unknown;
};

function supportsViewTransitions(): boolean {
  return typeof document !== "undefined" && "startViewTransition" in document;
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled />;
  }

  const isDark = resolvedTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  function handleToggle() {
    // Modern browsers: View Transitions API — the browser screenshots the
    // old state and cross-fades (500ms) to the new DOM. Individual element
    // transitions are invisible behind the screenshot composite, so zero
    // oklch interpolation artifacts.
    if (supportsViewTransitions()) {
      (document as ViewTransitionDocument).startViewTransition(() =>
        setTheme(nextTheme)
      );
      return;
    }

    // Fallback: two-phase opacity animation.
    // Phase 1: fade body out (200ms → opacity 0).
    // Phase 2: block CSS transitions, swap theme, fade body in (300ms).
    const body = document.body;
    body.classList.add("theme-fade-out");

    body.addEventListener(
      "animationend",
      () => {
        body.classList.remove("theme-fade-out");

        // Block individual CSS transitions to avoid oklch flicker
        const blocker = document.createElement("style");
        blocker.textContent =
          "*,*::before,*::after{transition:none!important}";
        document.head.appendChild(blocker);

        setTheme(nextTheme);

        // Force the browser to apply new colors before removing the blocker
        void getComputedStyle(body).color;
        requestAnimationFrame(() => {
          document.head.removeChild(blocker);
          body.classList.add("theme-fade-in");

          body.addEventListener(
            "animationend",
            () => body.classList.remove("theme-fade-in"),
            { once: true }
          );
        });
      },
      { once: true }
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative h-8 w-8 p-0"
      onClick={handleToggle}
    >
      <Sun className={`h-4 w-4 transition-transform duration-300 ${isDark ? "rotate-90 scale-0" : "rotate-0 scale-100"} absolute`} />
      <Moon className={`h-4 w-4 transition-transform duration-300 ${isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
      <span className="sr-only">Zmień motyw</span>
    </Button>
  );
}
