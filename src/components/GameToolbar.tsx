import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { useGame } from "@/contexts/game.context";
import {
  IconBrandSpeedtest,
  IconCircleArrowDown,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerTrackNextFilled,
  IconRestore,
} from "@tabler/icons-react";
import { FC } from "react";

export const GameToolbar: FC = () => {
  const {
    downloadCurrentGrid,
    isRunning,
    nextGeneration,
    resetGame,
    setSpeed,
    speed,
    startGame,
    stopGame,
  } = useGame();

  return (
    <div className="flex gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" variant="ghost">
            <IconBrandSpeedtest />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" side="top">
          <Slider
            className="cursor-grab active:cursor-grabbing"
            value={[1100 - speed]}
            min={100}
            max={1000}
            onValueChange={(value) => setSpeed(1100 - value[0])}
            step={100}
          />
        </PopoverContent>
      </Popover>
      <Button className="w-20" onClick={resetGame} variant="outline">
        <IconRestore />
        Reset
      </Button>
      <Button className="w-20" onClick={isRunning ? stopGame : startGame}>
        {isRunning ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
        {isRunning ? "Stop" : "Start"}
      </Button>
      <Button
        className="w-20"
        disabled={isRunning}
        onClick={nextGeneration}
        variant="outline"
      >
        <IconPlayerTrackNextFilled />
        Next
      </Button>
      <Button
        disabled={isRunning}
        onClick={downloadCurrentGrid}
        size="icon"
        variant="ghost"
      >
        <IconCircleArrowDown />
      </Button>
    </div>
  );
};
