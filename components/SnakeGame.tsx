"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Translations } from "@/hooks/useLanguage";
import { useSnakeGame } from "@/hooks/useSnakeGame";

interface SnakeGameProps {
  t: Translations;
  onClose: () => void;
}

export function SnakeGame({ t, onClose }: SnakeGameProps) {
  const {
    gridSize,
    snake,
    food,
    status,
    score,
    highScore,
    startGame,
    resetGame,
    changeDirection,
  } = useSnakeGame();

  const isRunning = status === "running";
  const isGameOver = status === "gameover";

  const handleReplay = () => {
    startGame();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="font-chewy text-xl text-gray-900 dark:text-gray-100">
            {t.snake.zoneLabel}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {t.snake.controlsHint}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
              {t.snake.scoreLabel}
            </span>
            <span className="text-2xl font-chewy text-gray-900 dark:text-gray-100">
              {score}
            </span>
          </div>
          <div className="h-10 w-px bg-gray-300 dark:bg-gray-700" />
          <div className="flex flex-col items-end">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
              {t.snake.highScoreLabel}
            </span>
            <span className="text-lg font-chewy text-pink-600">
              {highScore}
            </span>
          </div>
        </div>
      </div>

      <div className="relative aspect-square w-full bg-yellow-50 dark:bg-gray-900 rounded-3xl border-3 border-black dark:border-gray-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.08)] overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, index) => {
            const x = index % gridSize;
            const y = Math.floor(index / gridSize);
            const isSnake = snake.some(
              (segment) => segment.x === x && segment.y === y,
            );
            const isHead = isSnake && snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={index}
                className="relative flex items-center justify-center"
              >
                {isSnake && (
                  <div
                    className={`w-[85%] h-[85%] rounded-xl border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                      isHead
                        ? "bg-gradient-to-br from-lime-400 via-green-500 to-emerald-500"
                        : "bg-green-400"
                    }`}
                  />
                )}
                {isFood && (
                  <motion.div
                    className="w-3/4 h-3/4 rounded-full border border-black bg-gradient-to-br from-red-500 via-rose-500 to-pink-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Overlay: game over */}
        <AnimatePresence>
          {isGameOver && (
            <motion.div
              key={status}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-950/85 backdrop-blur-sm border-t border-black/10 dark:border-white/10"
            >
              <div className="text-center px-6">
                <h2 className="font-chewy text-3xl md:text-4xl text-gray-900 dark:text-gray-100 mb-2">
                  {isGameOver ? t.snake.gameOverTitle : t.snake.title}
                </h2>
                {isGameOver && (
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
                    {t.snake.lostMessage}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleReplay}
                  className="mt-2 inline-flex items-center justify-center rounded-2xl border-3 border-black dark:border-gray-600 bg-pink-400 px-6 py-2.5 text-lg md:text-xl font-chewy text-black dark:text-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.12)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.08)] transition-transform"
                >
                  {t.snake.replayLabel}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile controls */}
      <div className="mt-6 flex flex-col items-center gap-3 select-none">
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => changeDirection("UP")}
            className="h-10 w-10 rounded-2xl border-3 border-black dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.08)] flex items-center justify-center active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.1)]"
          >
            ↑
          </button>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => changeDirection("LEFT")}
            className="h-10 w-10 rounded-2xl border-3 border-black dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.08)] flex items-center justify-center active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.1)]"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => changeDirection("DOWN")}
            className="h-10 w-10 rounded-2xl border-3 border-black dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.08)] flex items-center justify-center active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.1)]"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={() => changeDirection("RIGHT")}
            className="h-10 w-10 rounded-2xl border-3 border-black dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.08)] flex items-center justify-center active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.1)]"
          >
            →
          </button>
        </div>
      </div>

      {/* Footer actions */}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => {
            resetGame();
            onClose();
          }}
          className="inline-flex items-center justify-center rounded-2xl border-3 border-black dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-1.5 text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:translate-x-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.12)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.1)] transition-transform"
        >
          {t.snake.closeLabel}
        </button>
      </div>
    </div>
  );
}
