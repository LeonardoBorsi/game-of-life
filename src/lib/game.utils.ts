import { Grid } from "@/definitions/types";

// Function to count live neighbors of a given cell (x, y)
export function getLiveNeighbors(grid: Grid, x: number, y: number): number {
  // Define the 8 directions to check for neighbors
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  // Reduce over directions to count live neighbors
  return directions.reduce((acc, [dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;
    return acc + (grid[newX]?.[newY] || 0); // Add 1 if neighbor is alive, else 0
  }, 0);
}

// Function to calculate the next generation of the grid based on the Game of Life rules
export function getNextGeneration(grid: Grid): Grid {
  const rows = grid.length;
  const cols = grid[0].length;

  // Create a copy of the current grid to store the next generation
  const nextGrid: Grid = grid.map((row) => [...row]);

  // Loop through each cell in the grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Count live neighbors of the current cell
      const liveNeighbors = getLiveNeighbors(grid, i, j);

      // Apply the Game of Life rules
      if (grid[i][j] === 1) {
        // Cell is alive: stays alive with 2 or 3 neighbors, dies otherwise
        nextGrid[i][j] = liveNeighbors === 2 || liveNeighbors === 3 ? 1 : 0;
      } else {
        // Cell is dead: becomes alive with exactly 3 neighbors
        nextGrid[i][j] = liveNeighbors === 3 ? 1 : 0;
      }
    }
  }

  return nextGrid;
}
