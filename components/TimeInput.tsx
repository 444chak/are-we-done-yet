"use client";

import { Clock } from "lucide-react";

interface TimeInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function TimeInput({ label, value, onChange }: TimeInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-nunito font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Clock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white rounded-3xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-nunito text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all min-w-0"
        />
      </div>
    </div>
  );
}
