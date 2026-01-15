"use client";

import { useCourseTimer } from "@/hooks/useCourseTimer";
import { useLanguage } from "@/hooks/useLanguage";
import { ProgressBar } from "@/components/ProgressBar";
import { TimeInput } from "@/components/TimeInput";
import { StatusMessage } from "@/components/StatusMessage";
import { LanguageToggle } from "@/components/LanguageToggle";

export default function Home() {
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
    <main className="min-h-screen bg-yellow-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl">
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
    </main>
  );
}
