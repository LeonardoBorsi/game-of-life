import { Grid } from "@/definitions/types";

export function getLiveNeighbors(grid: Grid, x: number, y: number): number {
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
  return directions.reduce((acc, [dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;
    return acc + (grid[newX]?.[newY] || 0);
  }, 0);
}

export function getNextGeneration(grid: Grid): Grid {
  const rows = grid.length;
  const cols = grid[0].length;
  const nextGrid: Grid = grid.map((row) => [...row]);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const liveNeighbors = getLiveNeighbors(grid, i, j);
      if (grid[i][j] === 1) {
        nextGrid[i][j] = liveNeighbors === 2 || liveNeighbors === 3 ? 1 : 0;
      } else {
        nextGrid[i][j] = liveNeighbors === 3 ? 1 : 0;
      }
    }
  }

  return nextGrid;
}
