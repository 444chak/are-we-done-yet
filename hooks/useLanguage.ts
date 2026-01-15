import { useState, useEffect } from "react";

export type Language = "fr" | "en";

export interface Translations {
  title: string;
  startLabel: string;
  endLabel: string;
  timeRemaining: string;
  shareLabel: string;
  copiedLabel: string;
  boredMessage: string;
  contributeLabel: string;
  messages: {
    under25: string;
    under50: string;
    under75: string;
    under100: string;
    finished: string;
  };
  snake: {
    title: string;
    zoneLabel: string;
    scoreLabel: string;
    highScoreLabel: string;
    startLabel: string;
    replayLabel: string;
    gameOverTitle: string;
    lostMessage: string;
    controlsHint: string;
    closeLabel: string;
  };
}

const translations: Record<Language, Translations> = {
  fr: {
    title: "On a fini ?",
    startLabel: "Début",
    endLabel: "Fin",
    timeRemaining: "Temps restant",
    shareLabel: "Partager",
    copiedLabel: "Copié !",
    boredMessage: "Tu t'ennuies ?",
    contributeLabel: "Contribuer",
    messages: {
      under25: "Dors encore... 💤",
      under50: "On y va doucement... 🐌",
      under75: "Moitié chemin ! 💪",
      under100: "Presque là ! 🚀",
      finished: "LIBERTÉ !! 🎉",
    },
    snake: {
      title: "Snake de Procrastination",
      zoneLabel: "Zone de Procrastination",
      scoreLabel: "Score",
      highScoreLabel: "Meilleur",
      startLabel: "Jouer",
      replayLabel: "Rejouer",
      gameOverTitle: "PERDU !",
      lostMessage: "Le temps passe... mais toi tu joues au Snake. Respect.",
      controlsHint:
        "Flèches du clavier ou boutons ci-dessous pour bouger le serpent.",
      closeLabel: "Retour au timer",
    },
  },
  en: {
    title: "Are We Done Yet?",
    startLabel: "Start",
    endLabel: "End",
    timeRemaining: "Time remaining",
    shareLabel: "Share",
    copiedLabel: "Copied!",
    boredMessage: "Bored?",
    contributeLabel: "Contribute",
    messages: {
      under25: "Sleep tight... 💤",
      under50: "Getting there... 🐌",
      under75: "Halfway there! 💪",
      under100: "Almost there! 🚀",
      finished: "FREEDOM!! 🎉",
    },
    snake: {
      title: "Procrastination Snake",
      zoneLabel: "Procrastination Zone",
      scoreLabel: "Score",
      highScoreLabel: "Best",
      startLabel: "Play",
      replayLabel: "Play Again",
      gameOverTitle: "GAME OVER",
      lostMessage: "Time is ticking... and you're playing Snake. Respect.",
      controlsHint: "Use arrow keys or the buttons below to move the snake.",
      closeLabel: "Back to timer",
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
