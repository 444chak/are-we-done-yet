import { useState, useEffect, useMemo } from "react";
import {
  format,
  parse,
  differenceInMinutes,
  isBefore,
  isAfter,
} from "date-fns";

export type TimerState = "waiting" | "running" | "finished";

export interface UseCourseTimerReturn {
  startTime: string;
  endTime: string;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  percentage: number;
  timeRemaining: string;
  state: TimerState;
  currentTime: Date;
  elapsedSeconds: number;
}

const DEFAULT_START = "09:10";
const DEFAULT_END = "12:40";

export interface UseCourseTimerOptions {
  initialStartTime?: string | null;
  initialEndTime?: string | null;
}

export function useCourseTimer(
  options?: UseCourseTimerOptions
): UseCourseTimerReturn {
  const initialStart = options?.initialStartTime || DEFAULT_START;
  const initialEnd = options?.initialEndTime || DEFAULT_END;

  const [startTime, setStartTime] = useState<string>(initialStart);
  const [endTime, setEndTime] = useState<string>(initialEnd);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Sync avec les valeurs initiales si elles changent (depuis l'URL)
  useEffect(() => {
    if (options?.initialStartTime) {
      setStartTime(options.initialStartTime);
    }
  }, [options?.initialStartTime]);

  useEffect(() => {
    if (options?.initialEndTime) {
      setEndTime(options.initialEndTime);
    }
  }, [options?.initialEndTime]);

  // Update current time every 100ms for smooth animations
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Parse time strings to Date objects (using today's date)
  const startDateTime = useMemo(() => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }, [startTime]);

  const endDateTime = useMemo(() => {
    const [hours, minutes] = endTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }, [endTime]);

  // Calculate state
  const state = useMemo<TimerState>(() => {
    if (isBefore(currentTime, startDateTime)) {
      return "waiting";
    }
    if (isAfter(currentTime, endDateTime)) {
      return "finished";
    }
    return "running";
  }, [currentTime, startDateTime, endDateTime]);

  // Calculate elapsed seconds with precision
  const elapsedSeconds = useMemo(() => {
    if (state === "waiting") return 0;
    if (state === "finished") {
      const totalMs = endDateTime.getTime() - startDateTime.getTime();
      return totalMs / 1000;
    }
    const elapsedMs = currentTime.getTime() - startDateTime.getTime();
    return Math.max(0, elapsedMs / 1000);
  }, [state, currentTime, startDateTime, endDateTime]);

  // Calculate percentage with precision
  const percentage = useMemo(() => {
    if (state === "waiting") return 0;
    if (state === "finished") return 100;

    const totalMs = endDateTime.getTime() - startDateTime.getTime();
    const elapsedMs = currentTime.getTime() - startDateTime.getTime();
    return Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));
  }, [state, currentTime, startDateTime, endDateTime]);

  // Calculate time remaining (hours, minutes, seconds with 2 decimals)
  const timeRemaining = useMemo(() => {
    if (state === "waiting") {
      const diffMs = startDateTime.getTime() - currentTime.getTime();
      if (diffMs <= 0) return "0s";

      const totalSeconds = diffMs / 1000;
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const parts: string[] = [];
      if (hours > 0) parts.push(`${hours}h`);
      if (hours > 0 || minutes > 0) parts.push(`${minutes}m`);
      parts.push(`${Math.floor(seconds)}s`);

      return parts.join(" ");
    }

    if (state === "finished") {
      return "0s";
    }

    const diffMs = endDateTime.getTime() - currentTime.getTime();
    if (diffMs <= 0) return "0s";

    const totalSeconds = diffMs / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const parts: string[] = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (hours > 0 || minutes > 0) parts.push(`${minutes}m`);
    parts.push(`${Math.floor(seconds)}s`);

    return parts.join(" ");
  }, [state, currentTime, startDateTime, endDateTime]);

  return {
    startTime,
    endTime,
    setStartTime,
    setEndTime,
    percentage,
    timeRemaining,
    state,
    currentTime,
    elapsedSeconds,
  };
}
