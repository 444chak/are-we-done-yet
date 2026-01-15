import { useState, useEffect } from "react";

export type Language = "fr" | "en";

export interface Translations {
  title: string;
  startLabel: string;
  endLabel: string;
  timeRemaining: string;
  messages: {
    waiting: string;
    halfway: string;
    finished: string;
  };
}

const translations: Record<Language, Translations> = {
  fr: {
    title: "On a fini ?",
    startLabel: "Début",
    endLabel: "Fin",
    timeRemaining: "Temps restant",
    messages: {
      waiting: "Dors encore... 💤",
      halfway: "Moitié chemin !",
      finished: "LIBERTÉ !! 🎉",
    },
  },
  en: {
    title: "Are We Done Yet?",
    startLabel: "Start",
    endLabel: "End",
    timeRemaining: "Time remaining",
    messages: {
      waiting: "Sleep tight... 💤",
      halfway: "Halfway there!",
      finished: "FREEDOM!! 🎉",
    },
  },
};

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // Detect language on mount (client-side only to avoid hydration mismatch)
  useEffect(() => {
    setMounted(true);
    const detectedLang = navigator.language.toLowerCase();
    if (detectedLang.startsWith("fr")) {
      setLanguage("fr");
    } else {
      setLanguage("en");
    }
  }, []);

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "fr" ? "en" : "fr"));
  };

  return {
    language,
    setLanguage,
    toggleLanguage,
    t,
    mounted,
  };
}
