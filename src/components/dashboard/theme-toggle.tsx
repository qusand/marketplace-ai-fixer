"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    // Modern browsers: use View Transitions API for a smooth cross-fade.
    // The browser screenshots the old state and cross-fades to the new one —
    // no individual elements re-render during the animation, so zero flicker.
    if ("startViewTransition" in document) {
      (document as unknown as { startViewTransition: (cb: () => void) => void })
        .startViewTransition(() => setTheme(nextTheme));
      return;
    }

    // Fallback: two-phase opacity animation.
    // Phase 1: fade out (180ms → opacity 0)
    // Phase 2: swap theme while invisible, then fade in (250ms → opacity 1)
    const body = document.body;
    body.classList.add("theme-fade-out");

    const handleFadeOut = () => {
      body.classList.remove("theme-fade-out");
      setTheme(nextTheme);
      body.classList.add("theme-fade-in");

      const handleFadeIn = () => {
        body.classList.remove("theme-fade-in");
      };
      body.addEventListener("animationend", handleFadeIn, { once: true });
    };
    body.addEventListener("animationend", handleFadeOut, { once: true });
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
