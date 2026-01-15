import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export type SnakeGameStatus = "idle" | "running" | "gameover";

export interface SnakeCell {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const INITIAL_SNAKE: SnakeCell[] = [
  { x: 9, y: 10 },
  { x: 8, y: 10 },
  { x: 7, y: 10 },
];
const INITIAL_DIRECTION: Direction = "RIGHT";

function getRandomFood(snake: SnakeCell[]): SnakeCell {
  const occupied = new Set(snake.map((s) => `${s.x}-${s.y}`));

  while (true) {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    const key = `${x}-${y}`;
    if (!occupied.has(key)) {
      return { x, y };
    }
  }
}

function areOpposite(a: Direction, b: Direction): boolean {
  return (
    (a === "UP" && b === "DOWN") ||
    (a === "DOWN" && b === "UP") ||
    (a === "LEFT" && b === "RIGHT") ||
    (a === "RIGHT" && b === "LEFT")
  );
}

export function useSnakeGame() {
  const [snake, setSnake] = useState<SnakeCell[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState<Direction | null>(null);
  const [food, setFood] = useState<SnakeCell>(() => getRandomFood(INITIAL_SNAKE));
  const [status, setStatus] = useState<SnakeGameStatus>("running");
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  const tickRef = useRef<number | null>(null);
  const statusRef = useRef<SnakeGameStatus>(status);
  const directionRef = useRef<Direction>(direction);
  const nextDirectionRef = useRef<Direction | null>(null);
  const foodRef = useRef<SnakeCell>(food);
  const scoreRef = useRef<number>(score);

  // Keep refs in sync
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const speedMs = useMemo(() => {
    // Base speed + slightly faster as the snake grows
    const base = 180;
    const bonus = Math.min(80, snake.length * 4);
    return Math.max(80, base - bonus);
  }, [snake.length]);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setNextDirection(null);
    setFood(getRandomFood(INITIAL_SNAKE));
    setScore(0);
    setStatus("running");
  }, []);

  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setNextDirection(null);
    setFood(getRandomFood(INITIAL_SNAKE));
    setScore(0);
    setStatus("running");
  }, []);

  const applyDirection = useCallback(
    (newDir: Direction) => {
      // Prevent changing direction if game is not running
      if (statusRef.current !== "running") return;

      setNextDirection((currentQueued) => {
        // Get the effective direction that will be used (queued or current)
        const effectiveDir = currentQueued ?? directionRef.current;
        
        // Prevent going in opposite direction
        if (areOpposite(effectiveDir, newDir)) {
          return currentQueued; // Keep current queued direction
        }
        nextDirectionRef.current = newDir;
        return newDir;
      });
    },
    []
  );

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        applyDirection("UP");
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        applyDirection("DOWN");
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        applyDirection("LEFT");
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        applyDirection("RIGHT");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [applyDirection]);

  // Main game loop - recursive tick
  useEffect(() => {
    if (status !== "running") {
      if (tickRef.current) {
        window.clearTimeout(tickRef.current);
        tickRef.current = null;
      }
      return;
    }

    const tick = () => {
      // Check if still running
      if (statusRef.current !== "running") {
        return;
      }

      setSnake((prevSnake) => {
        // Get current values from refs
        const currentDirection = directionRef.current;
        const currentNextDirection = nextDirectionRef.current;
        const currentFood = foodRef.current;
        const currentScore = scoreRef.current;

        const effectiveDirection = currentNextDirection ?? currentDirection;
        
        if (currentNextDirection) {
          directionRef.current = currentNextDirection;
          setDirection(currentNextDirection);
          nextDirectionRef.current = null;
          setNextDirection(null);
        }

        const head = prevSnake[0];
        let newHead: SnakeCell = head;
        if (effectiveDirection === "UP") newHead = { x: head.x, y: head.y - 1 };
        if (effectiveDirection === "DOWN") newHead = { x: head.x, y: head.y + 1 };
        if (effectiveDirection === "LEFT") newHead = { x: head.x - 1, y: head.y };
        if (effectiveDirection === "RIGHT") newHead = { x: head.x + 1, y: head.y };

        // Wrap around walls (traverse through walls)
        if (newHead.x < 0) newHead.x = GRID_SIZE - 1;
        if (newHead.x >= GRID_SIZE) newHead.x = 0;
        if (newHead.y < 0) newHead.y = GRID_SIZE - 1;
        if (newHead.y >= GRID_SIZE) newHead.y = 0;

        // Self collision (only way to lose)
        const body = prevSnake;
        if (body.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          statusRef.current = "gameover";
          setStatus("gameover");
          setHighScore((prevHigh) => Math.max(prevHigh, currentScore));
          return prevSnake;
        }

        const ateFood = newHead.x === currentFood.x && newHead.y === currentFood.y;
        const newSnake = [newHead, ...prevSnake];

        if (ateFood) {
          const newFood = getRandomFood(newSnake);
          foodRef.current = newFood;
          setFood(newFood);
          setScore((prev) => {
            const newScore = prev + 10;
            scoreRef.current = newScore;
            return newScore;
          });
          return newSnake; // grow
        }

        newSnake.pop(); // move forward
        return newSnake;
      });

      // Schedule next tick recursively
      if (statusRef.current === "running") {
        const currentSpeed = Math.max(80, 180 - Math.min(80, snake.length * 4));
        tickRef.current = window.setTimeout(tick, currentSpeed);
      }
    };

    // Start the recursive loop
    const currentSpeed = Math.max(80, 180 - Math.min(80, snake.length * 4));
    tickRef.current = window.setTimeout(tick, currentSpeed);

    return () => {
      if (tickRef.current) {
        window.clearTimeout(tickRef.current);
        tickRef.current = null;
      }
    };
  }, [status, snake.length]);

  return {
    gridSize: GRID_SIZE,
    snake,
    food,
    status,
    score,
    highScore,
    startGame,
    resetGame,
    changeDirection: applyDirection,
  };
}

