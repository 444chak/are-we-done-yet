"use client";

import { useState } from "react";
import { useCourseTimer } from "@/hooks/useCourseTimer";
import { useLanguage } from "@/hooks/useLanguage";
import { ProgressBar } from "@/components/ProgressBar";
import { TimeInput } from "@/components/TimeInput";
import { StatusMessage } from "@/components/StatusMessage";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SnakeGame } from "@/components/SnakeGame";

export default function Home() {
  const [showSnake, setShowSnake] = useState(false);

  const {
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    percentage,
    timeRemaining,
    state,
  } = useCourseTimer();

  const { t, toggleLanguage, language, mounted } = useLanguage();

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <main className="relative min-h-screen bg-yellow-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-chewy text-gray-900">
            {t.title}
          </h1>
          <LanguageToggle language={language} onToggle={toggleLanguage} />
        </div>

        <div className="bg-white rounded-3xl border-3 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="flex justify-between items-center">
              <span className="font-nunito font-semibold text-gray-700">
                {t.timeRemaining}
              </span>
              <span className="text-3xl md:text-4xl font-chewy text-gray-900">
                {timeRemaining}
              </span>
            </div>

            <ProgressBar percentage={percentage} />

            <div className="pt-4">
              <StatusMessage
                percentage={percentage}
                state={state}
                waitingMessage={t.messages.waiting}
                halfwayMessage={t.messages.halfway}
                finishedMessage={t.messages.finished}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Snake game toggle button (bottom-right) */}
      <button
        type="button"
        onClick={() => setShowSnake(true)}
        className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-30 inline-flex items-center justify-center rounded-full border-3 border-black bg-white px-4 py-3 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform"
        aria-label={t.snake.title}
      >
        <span className="text-xl md:text-2xl">🎮</span>
      </button>

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
