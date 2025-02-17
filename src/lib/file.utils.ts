import { Grid } from "@/definitions/types";

// Function to generate the content of the file based on the grid and generation number
export const generateFileContent = (generation: number, grid: Grid): string => {
  // Convert grid cells to '*' (alive) and '.' (dead) and join them into rows
  const gridRows = grid
    .map((row) => row.map((cell) => (cell === 1 ? "*" : ".")).join(""))
    .join("\n");

  const dimensions = `${grid.length} ${grid[0].length}`;

  return `Generation ${generation}:\n${dimensions}\n${gridRows}`;
};

// Function to download the grid as a .txt file
export const downloadGridFile = (generation: number, grid: Grid) => {
  const content = generateFileContent(generation, grid);
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  const timestamp = new Date()
    .toISOString()
    .slice(0, 16)
    .replace("T", "_")
    .replace(/:/g, "-");
  link.href = URL.createObjectURL(blob);
  link.download = `game-of-life-grid_${timestamp}.txt`;
  link.click();
};
