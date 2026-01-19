"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  percentage: number;
}

export function ProgressBar({ percentage }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percentage));
  const displayPercentage = clamped.toFixed(2);

  return (
    <div className="relative w-full h-14 md:h-16 bg-white dark:bg-gray-700 rounded-3xl border-3 border-black dark:border-gray-600 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
      {/* Animated gradient bar */}
      <motion.div
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-lime-400 rounded-3xl"
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{
          type: "tween",
          duration: 0.1,
          ease: "linear",
        }}
      >
        {/* Shimmer animation effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: "50%",
            height: "100%",
          }}
        />
      </motion.div>

      {/* Percentage text */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
          className="flex items-center"
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        >
          <motion.span
            key={displayPercentage}
            className="font-chewy text-3xl md:text-4xl text-black dark:text-gray-100 drop-shadow-[2px_2px_0_rgba(255,255,255,0.8)] dark:drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)]"
            initial={{ y: -5, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            {displayPercentage}%
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
