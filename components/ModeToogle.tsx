"use client";

import { Moon, Sun } from "lucide-react";

interface ModeToogleProps {
  mode: "light" | "dark";
  onToggle: () => void;
}

export function ModeToogle({ mode, onToggle }: ModeToogleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 bg-white rounded-3xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-nunito font-semibold text-sm"
      aria-label="Toggle mode"
    >
      {mode === "light" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
      <span>{mode.toUpperCase()}</span>
    </button>
  );
}
