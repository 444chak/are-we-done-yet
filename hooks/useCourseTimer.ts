import { useState, useEffect, useMemo } from "react";
import { format, parse, differenceInMinutes, isBefore, isAfter } from "date-fns";

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
}

const DEFAULT_START = "09:10";
const DEFAULT_END = "12:40";

export function useCourseTimer(): UseCourseTimerReturn {
  const [startTime, setStartTime] = useState<string>(DEFAULT_START);
  const [endTime, setEndTime] = useState<string>(DEFAULT_END);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

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

  // Calculate percentage
  const percentage = useMemo(() => {
    if (state === "waiting") return 0;
    if (state === "finished") return 100;

    const totalDuration = differenceInMinutes(endDateTime, startDateTime);
    const elapsed = differenceInMinutes(currentTime, startDateTime);
    return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  }, [state, currentTime, startDateTime, endDateTime]);

  // Calculate time remaining
  const timeRemaining = useMemo(() => {
    if (state === "waiting") {
      const minutes = differenceInMinutes(startDateTime, currentTime);
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (hours > 0) {
        return `${hours}h ${mins}m`;
      }
      return `${mins}m`;
    }

    if (state === "finished") {
      return "0m";
    }

    const minutes = differenceInMinutes(endDateTime, currentTime);
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
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
  };
}
