"use client";

import { useState, useEffect, Suspense } from "react";
import { useCourseTimer } from "@/hooks/useCourseTimer";
import { useLanguage } from "@/hooks/useLanguage";
import { useUrlParams } from "@/hooks/useUrlParams";
import { ProgressBar } from "@/components/ProgressBar";
import { TimeInput } from "@/components/TimeInput";
import { StatusMessage } from "@/components/StatusMessage";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ShareButton } from "@/components/ShareButton";
import { Footer } from "@/components/Footer";
import { SnakeGame } from "@/components/SnakeGame";
import { motion } from "framer-motion";

function HomeContent() {
  const [showSnake, setShowSnake] = useState(false);
  const { getStartTime, getEndTime, updateUrl, getShareUrl } = useUrlParams();

  // Lire les paramètres depuis l'URL au montage
  const urlStartTime = getStartTime();
  const urlEndTime = getEndTime();

  const {
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    percentage,
    timeRemaining,
    state,
  } = useCourseTimer({
    initialStartTime: urlStartTime,
    initialEndTime: urlEndTime,
  });

  const { t, toggleLanguage, language, mounted } = useLanguage();
  const [isInitialized, setIsInitialized] = useState(false);

  // Mettre à jour l'URL quand les horaires changent (mais pas au premier rendu)
  useEffect(() => {
    if (mounted && !isInitialized) {
      setIsInitialized(true);
      return;
    }
    if (mounted && isInitialized && startTime && endTime) {
      updateUrl(startTime, endTime);
    }
  }, [startTime, endTime, updateUrl, mounted, isInitialized]);

  // Générer l'URL de partage (doit être avant le return conditionnel)
  const shareUrl = getShareUrl(startTime, endTime);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <main className="relative min-h-screen bg-yellow-50 flex flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-2xl relative flex-1 flex flex-col justify-center">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-chewy text-gray-900">
            {t.title}
          </h1>
          <div className="flex items-center gap-2 sm:gap-3">
            <ShareButton
              shareUrl={shareUrl}
              shareLabel={t.shareLabel}
              copiedLabel={t.copiedLabel}
            />
            <LanguageToggle language={language} onToggle={toggleLanguage} />
          </div>
        </div>

        <div className="bg-white rounded-3xl border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <TimeInput
              label={t.startLabel}
              value={startTime}
              onChange={setStartTime}
            />
            <TimeInput
              label={t.endLabel}
              value={endTime}
              onChange={setEndTime}
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
              <span className="font-nunito font-semibold text-gray-700 text-sm sm:text-base">
                {t.timeRemaining}
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-chewy text-gray-900">
                {timeRemaining}
              </span>
            </div>

            <ProgressBar percentage={percentage} />

            <div className="pt-4">
              <StatusMessage
                percentage={percentage}
                state={state}
                under25Message={t.messages.under25}
                under50Message={t.messages.under50}
                under75Message={t.messages.under75}
                under100Message={t.messages.under100}
                finishedMessage={t.messages.finished}
              />
            </div>
          </div>
        </div>
      </div>

      {!showSnake && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="fixed right-12 bottom-20 sm:right-20 sm:bottom-16 md:right-24 md:bottom-20 z-20 pointer-events-none"
        >
          <span className="text-lg sm:text-xl md:text-2xl font-chewy text-gray-900">
            {t.boredMessage}
          </span>
        </motion.div>
      )}

      {/* Snake game toggle button (bottom-right) */}
      <button
        type="button"
        onClick={() => setShowSnake(true)}
        className="fixed right-3 bottom-3 sm:right-4 sm:bottom-4 md:right-6 md:bottom-6 z-30 inline-flex items-center justify-center rounded-full border-3 border-black bg-white px-3 py-2 sm:px-4 sm:py-3 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform"
        aria-label={t.snake.title}
      >
        <span className="text-lg sm:text-xl md:text-2xl">🎮</span>
      </button>

      {/* Footer */}
      <Footer contributeLabel={t.contributeLabel} />

      {/* Snake game overlay */}
      {showSnake && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
          <div className="relative w-full max-w-xl">
            <div className="absolute -top-10 right-0 flex items-center gap-2">
              <span className="hidden md:inline text-xs font-semibold text-yellow-50">
                {t.snake.zoneLabel}
              </span>
            </div>
            <div className="bg-white rounded-3xl border-3 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-4 md:p-6">
              <SnakeGame t={t} onClose={() => setShowSnake(false)} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
