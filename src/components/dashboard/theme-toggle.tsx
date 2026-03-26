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

  function handleToggle() {
    const root = document.documentElement;

    // Remove previous animation (if user clicks rapidly)
    root.classList.remove("theme-fade");
    // Force reflow so re-adding the class restarts the animation
    void root.offsetWidth;
    root.classList.add("theme-fade");

    // Swap the theme — disableTransitionOnChange blocks CSS transitions
    // for one frame (no oklch interpolation artifacts), while the opacity
    // animation on <html> provides a pleasant visual crossfade.
    setTheme(isDark ? "light" : "dark");

    // Clean up the class after the animation finishes
    root.addEventListener(
      "animationend",
      () => root.classList.remove("theme-fade"),
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
