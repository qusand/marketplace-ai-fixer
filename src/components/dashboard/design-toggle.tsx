"use client";

import { useEffect, useState } from "react";
import { Layers, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDesign } from "./design-provider";

export function DesignToggle() {
  const { isLinear, toggleDesign } = useDesign();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled />;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="relative h-8 w-8 p-0"
      onClick={toggleDesign}
      title={isLinear ? "Przełącz na klasyczny design" : "Przełącz na design Linear"}
    >
      <LayoutGrid
        className={`h-4 w-4 absolute transition-all duration-500 ease-in-out ${
          isLinear ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Layers
        className={`h-4 w-4 transition-all duration-500 ease-in-out ${
          isLinear ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      />
      <span className="sr-only">Zmień design</span>
    </Button>
  );
}
