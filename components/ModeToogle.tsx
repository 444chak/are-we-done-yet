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
      className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-3xl border-3 border-black dark:border-gray-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.08)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.16)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-nunito font-semibold text-sm text-gray-900 dark:text-gray-100"
      aria-label="Toggle mode"
    >
      {mode === "light" ? (
        <Sun className="w-4 h-4 text-gray-900 dark:text-gray-100" />
      ) : (
        <Moon className="w-4 h-4 text-gray-900 dark:text-gray-100" />
      )}
      <span>{mode.toUpperCase()}</span>
    </button>
  );
}
