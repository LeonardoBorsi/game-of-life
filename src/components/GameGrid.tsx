import { DEFAULT_COLS, DEFAULT_ROWS } from "@/definitions/costants";
import { GameGridProps } from "@/definitions/props";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FC } from "react";

export const GameGrid: FC<GameGridProps> = ({ grid, onCellClick }) => {
  const cols = grid[0]?.length || DEFAULT_COLS;
  const rows = grid.length || DEFAULT_ROWS;
  const isWide = cols > rows;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="grid aspect-square"
        style={{
          // Set up the grid layout based on the number of columns and rows
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          // Adjust width/height to maintain aspect ratio
          width: isWide ? "100%" : `${(cols / rows) * 100}%`,
          height: !isWide ? "100%" : `${(rows / cols) * 100}%`,
        }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div key={`${i}-${j}`} className="p-[1px]">
              <motion.div
                animate={cell ? "alive" : "dead"} // Animate cell based on its state
                className={cn(
                  "w-full flex items-center justify-center aspect-square border border-gray-300 cursor-pointer",
                  cell
                    ? "bg-green-500 hover:bg-green-600" // Alive cell
                    : "bg-gray-200 hover:bg-gray-300" // Dead cell
                )}
                onClick={() => onCellClick(i, j)}
                style={{
                  borderRadius: `max(15%, ${100 / cols}%)`, // Apply rounded borders to cells based on grid size
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition for animations
                variants={{
                  // Define animation states for cells
                  alive: { scale: [1, 0.75, 1], opacity: [1, 0.75, 1] },
                  dead: { scale: 1, opacity: 1 },
                }}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
