"use client";

import { motion } from "framer-motion";

interface StatusMessageProps {
  percentage: number;
  state: "waiting" | "running" | "finished";
  under25Message: string;
  under50Message: string;
  under75Message: string;
  under100Message: string;
  finishedMessage: string;
}

export function StatusMessage({
  percentage,
  state,
  under25Message,
  under50Message,
  under75Message,
  under100Message,
  finishedMessage,
}: StatusMessageProps) {
  const getMessage = () => {
    if (state === "waiting") return under25Message;
    if (state === "finished") return finishedMessage;
    
    // Tranches de pourcentage
    if (percentage < 25) return under25Message;
    if (percentage < 50) return under50Message;
    if (percentage < 75) return under75Message;
    if (percentage < 100) return under100Message;
    return finishedMessage;
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
