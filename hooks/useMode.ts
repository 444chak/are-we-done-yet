import { useState } from "react";

export type Mode = "light" | "dark";


function changeUIMode(mode: Mode) {
    if (mode === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}


export function useMode() {
  const [mode, setMode] = useState<Mode>("light");

  const toogleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
    changeUIMode(mode === "light" ? "dark" : "light");
  };
  
  return {
    toogleMode,
    mode,
  };
}
