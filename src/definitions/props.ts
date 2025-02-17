import { ReactNode } from "react";
import { AppState } from "./enums";
import { Dimensions, Grid } from "./types";

export interface AppContextProps {
  appState: AppState;
  createEmptyGrid: () => void;
  createGridFromSourceFile: () => void;
  dimensions: Dimensions;
  initialGeneration: number;
  initialGrid: Grid;
  setCols: (cols?: number) => void;
  setRows: (rows?: number) => void;
  setSourceFile: (file: File | null) => void;
  setSourceFileError: (error: string | null) => void;
  showMenu: () => void;
  sourceFile: File | null;
  sourceFileError: string | null;
}

export interface AppProviderProps {
  children: ReactNode;
}

export interface GameContextProps {
  downloadCurrentGrid: () => void;
  grid: Grid;
  generation: number;
  isRunning: boolean;
  toggleCell: (x: number, y: number) => void;
  nextGeneration: () => void;
  resetGame: () => void;
  setSpeed: (speed: number) => void;
  speed: number;
  startGame: () => void;
  stopGame: () => void;
}

export interface GameGridProps {
  grid: Grid;
  onCellClick: (x: number, y: number) => void;
}

export interface GameProviderProps {
  children: ReactNode;
  initialGeneration: number;
  initialGrid: Grid;
}
