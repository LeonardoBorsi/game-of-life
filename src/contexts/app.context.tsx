import { DEFAULT_COLS, DEFAULT_ROWS } from "@/definitions/costants";
import { AppState } from "@/definitions/enums";
import { AppContextProps, AppProviderProps } from "@/definitions/props";
import { Dimensions, Grid } from "@/definitions/types";
import { createContext, FC, useContext, useState } from "react";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(AppState.MENU);
  const [dimensions, setDimensions] = useState<Dimensions>({
    rows: DEFAULT_ROWS,
    cols: DEFAULT_COLS,
  });
  const [initialGrid, setInitialGrid] = useState<Grid>([]);
  const [initialGeneration, setInitialGeneration] = useState<number>(0);
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceFileError, setSourceFileError] = useState<string | null>(null);

  const setCols = (cols?: number) =>
    setDimensions((prev) => ({ ...prev, cols }));
  const setRows = (rows?: number) =>
    setDimensions((prev) => ({ ...prev, rows }));

  const showMenu = () => setAppState(AppState.MENU);

  // Creates an empty grid based on the current dimensions and resets generation
  const createEmptyGrid = () => {
    setInitialGrid(Array(dimensions.rows).fill(Array(dimensions.cols).fill(0)));
    setInitialGeneration(0);
    setAppState(AppState.GAME);
  };

  // Parses and loads a grid configuration from an uploaded file
  const createGridFromSourceFile = () => {
    if (sourceFile === null) return;

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      try {
        const lines = content.trim().split("\n");
        const stepMatch = lines[0].match(/\d+/);

        const generation = stepMatch ? parseInt(stepMatch[0], 10) : 0;
        if (!generation)
          throw new Error("Error while parsing generation number");

        const [rows, cols] = lines[1].split(" ").map(Number);
        if (!rows || !cols)
          throw new Error("Error while parsing rows and cols");

        // Parses grid values, converting '*' to 1 and other characters to 0
        const grid = lines.slice(2, 2 + rows).map((line) =>
          line
            .trim()
            .split("")
            .map((char) => (char === "*" ? 1 : 0))
        );

        // Ensures the parsed grid matches expected dimensions
        if (grid.length !== rows || grid.some((row) => row.length !== cols)) {
          throw new Error("Error while parsing grid");
        }

        setInitialGrid(grid);
        setInitialGeneration(generation);
        setAppState(AppState.GAME);
      } catch (error) {
        setSourceFileError((error as Error).message);
      }
    };
    reader.readAsText(sourceFile);
  };

  return (
    <AppContext.Provider
      value={{
        appState,
        createEmptyGrid,
        createGridFromSourceFile,
        dimensions,
        initialGeneration,
        initialGrid,
        setCols,
        setRows,
        setSourceFile,
        setSourceFileError,
        showMenu,
        sourceFile,
        sourceFileError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
