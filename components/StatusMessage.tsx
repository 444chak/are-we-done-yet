"use client";

import { motion } from "framer-motion";

interface StatusMessageProps {
  percentage: number;
  state: "waiting" | "running" | "finished";
  waitingMessage: string;
  halfwayMessage: string;
  finishedMessage: string;
}

export function StatusMessage({
  percentage,
  state,
  waitingMessage,
  halfwayMessage,
  finishedMessage,
}: StatusMessageProps) {
  const getMessage = () => {
    if (state === "waiting") return waitingMessage;
    if (state === "finished") return finishedMessage;
    if (percentage >= 50) return halfwayMessage;
    return waitingMessage;
  };

  return (
    <motion.div
      key={getMessage()}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-2xl md:text-3xl font-chewy text-center"
    >
      {getMessage()}
    </motion.div>
  );
}
