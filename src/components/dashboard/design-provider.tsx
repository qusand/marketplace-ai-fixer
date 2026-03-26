"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

type DesignMode = "classic" | "linear";

type DesignContextValue = {
  design: DesignMode;
  setDesign: (mode: DesignMode) => void;
  toggleDesign: () => void;
  isLinear: boolean;
};

const DesignContext = createContext<DesignContextValue | undefined>(undefined);

const STORAGE_KEY = "design-mode";

export function DesignProvider({ children }: { children: React.ReactNode }) {
  // Always start "classic" to match server HTML — no hydration mismatch.
  const [design, setDesignState] = useState<DesignMode>("classic");
  const [mounted, setMounted] = useState(false);

  // On mount: read the real preference and apply it before making content visible.
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as DesignMode | null;
    if (stored === "linear" || stored === "classic") {
      setDesignState(stored);
      if (stored === "linear") {
        document.documentElement.classList.add("design-linear");
      }
    }
    // Reveal content after a single frame so the correct design is painted.
    requestAnimationFrame(() => setMounted(true));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (design === "linear") {
      root.classList.add("design-linear");
    } else {
      root.classList.remove("design-linear");
    }
    localStorage.setItem(STORAGE_KEY, design);
  }, [design, mounted]);

  const setDesign = useCallback((mode: DesignMode) => {
    setDesignState(mode);
  }, []);

  const animationTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const toggleDesign = useCallback(() => {
    const body = document.body;
    body.classList.add("design-transition-enter");
    clearTimeout(animationTimer.current);
    animationTimer.current = setTimeout(() => {
      body.classList.remove("design-transition-enter");
    }, 700);

    setDesignState((prev) => (prev === "classic" ? "linear" : "classic"));
  }, []);

  return (
    <DesignContext.Provider
      value={{ design, setDesign, toggleDesign, isLinear: design === "linear" }}
    >
      {/* Hidden until localStorage is read and correct design is set.
          Uses visibility:hidden so layout is computed but not painted. */}
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </DesignContext.Provider>
  );
}

export function useDesign() {
  const ctx = useContext(DesignContext);
  if (!ctx) throw new Error("useDesign must be used within DesignProvider");
  return ctx;
}
