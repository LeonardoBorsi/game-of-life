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
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          width: isWide ? "100%" : `${(cols / rows) * 100}%`,
          height: !isWide ? "100%" : `${(rows / cols) * 100}%`,
        }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div key={`${i}-${j}`} className="p-[1px]">
              <motion.div
                animate={cell ? "alive" : "dead"}
                className={cn(
                  "w-full flex items-center justify-center aspect-square border border-gray-300 cursor-pointer",
                  cell
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-200 hover:bg-gray-300"
                )}
                onClick={() => onCellClick(i, j)}
                style={{
                  borderRadius: `max(15%, ${100 / cols}%)`,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                variants={{
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
