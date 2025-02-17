import { DEFAULT_SPEED } from "@/definitions/costants";
import { GameContextProps, GameProviderProps } from "@/definitions/props";
import { downloadGridFile } from "@/lib/file.utils";
import { getNextGeneration } from "@/lib/game.utils";
import { createContext, FC, useContext, useEffect, useState } from "react";

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: FC<GameProviderProps> = ({
  children,
  initialGeneration,
  initialGrid,
}) => {
  const [generation, setGeneration] = useState(initialGeneration);
  const [grid, setGrid] = useState(initialGrid);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  const downloadCurrentGrid = () => downloadGridFile(generation, grid);

  const nextGeneration = () => {
    setGrid((prev) => getNextGeneration(prev));
    setGeneration((prevStep) => prevStep + 1);
  };

  const resetGame = () => {
    setIsRunning(false);
    setGeneration(initialGeneration);
    setGrid(initialGrid);
  };

  const startGame = () => setIsRunning(true);
  const stopGame = () => setIsRunning(false);

  const toggleCell = (x: number, y: number) => {
    setGrid((prevGrid) =>
      prevGrid.map((row, i) =>
        row.map((cell, j) => (i === x && j === y ? (cell ? 0 : 1) : cell))
      )
    );
  };

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setGrid((prev) => getNextGeneration(prev));
      setGeneration((prevStep) => prevStep + 1);
    }, speed);
    return () => clearInterval(interval);
  }, [isRunning, speed]);

  return (
    <GameContext.Provider
      value={{
        downloadCurrentGrid,
        grid,
        generation,
        isRunning,
        toggleCell,
        nextGeneration,
        resetGame,
        setSpeed,
        speed,
        startGame,
        stopGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
