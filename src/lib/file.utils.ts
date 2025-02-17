import { Grid } from "@/definitions/types";

export const generateFileContent = (generation: number, grid: Grid): string => {
  const gridRows = grid
    .map(
      (row) => row.map((cell) => (cell === 1 ? "*" : ".")).join("") // Trasforma 1 in "*" e 0 in "."
    )
    .join("\n");

  const dimensions = `${grid.length} ${grid[0].length}`;

  return `Generation ${generation}:\n${dimensions}\n${gridRows}`;
};

export const downloadGridFile = (generation: number, grid: Grid) => {
  const content = generateFileContent(generation, grid);
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "game_of_life_state.txt";
  link.click();
};
