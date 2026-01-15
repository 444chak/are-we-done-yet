"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  percentage: number;
}

export function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="w-full h-8 bg-white rounded-3xl border-3 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <motion.div
        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-lime-400 rounded-3xl"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      />
    </div>
  );
}
