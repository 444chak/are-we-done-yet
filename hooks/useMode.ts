import { useState } from "react";

export type Mode = "light" | "dark";



export function useMode() {
  const [mode, setMode] = useState<Mode>("light");

  const toogleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  
  return {
    toogleMode,
    mode,
  };
}
