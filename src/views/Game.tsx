import { GameGrid } from "@/components/GameGrid";
import { GameToolbar } from "@/components/GameToolbar";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/app.context";
import { useGame } from "@/contexts/game.context";
import { FC } from "react";

export const Game: FC = () => {
  const { showMenu } = useApp();
  const { generation, grid, toggleCell } = useGame();

  return (
    <div className="flex flex-col items-center justify-between gap-7 h-full">
      <h2>
        Generation: <b>{generation}</b>
      </h2>
      <div className="flex-grow min-h-[250px] aspect-square">
        <GameGrid grid={grid} onCellClick={toggleCell} />
      </div>
      <div className="space-y-3">
        <GameToolbar />
        <Button onClick={showMenu} className="w-full" variant="ghost">
          Back to Menu
        </Button>
      </div>
    </div>
  );
};
