"use client";
import { AppProvider, useApp } from "@/contexts/app.context";
import { GameProvider } from "@/contexts/game.context";
import { AppState } from "@/definitions/enums";
import { Game } from "@/views/Game";
import { Menu } from "@/views/Menu";

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

const AppContent = () => {
  const { appState, initialGeneration, initialGrid } = useApp();

  return (
    <div className="w-screen">
      <div className="flex flex-col items-center justify-center h-screen p-7 gap-5">
        <h1 className="text-2xl md:text-3xl font-semibold">Game of Life</h1>
        <div className="flex-grow w-full">
          {appState === AppState.GAME ? (
            <GameProvider
              initialGeneration={initialGeneration}
              initialGrid={initialGrid}
            >
              <Game />
            </GameProvider>
          ) : (
            <div className="max-w-sm mx-auto h-full">
              <Menu />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
