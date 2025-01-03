import { create } from "zustand";
import { GameStateManager } from "../types/GameStateManager";
import { createJSONStorage, persist } from "zustand/middleware";
import { LinuxTerminal } from "../utils/lib";

const useGameStateManager = create<GameStateManager>()(
  persist(
    (set, _get) => ({
      state: "home",
      action: [null, null],
      history: [],
      currentDirectory: LinuxTerminal,
      dataToDisplay: LinuxTerminal,
      terminal: LinuxTerminal,
      setTerminal: (terminal) => set({ terminal }),
      setDataToDisplay: (dataToDisplay) => set({ dataToDisplay }),
      setCurrentDirectory: (currentDirectory) => set({ currentDirectory }),
      setHistory: (history) => set({ history }),
      setAction: (action) => set({ action }),
      setState: (state) => set({ state }),
      setGameState: (
        state,
        action,
        history,
        currentDirectory,
        dataToDisplay,
        terminal
      ) => {
        set({
          state,
          action,
          history,
          currentDirectory,
          dataToDisplay,
          terminal,
        });
      },
      clearState: () =>
        set({
          state: "home",
          action: [null, null],
          history: [],
          currentDirectory: LinuxTerminal,
          dataToDisplay: LinuxTerminal,
          terminal: LinuxTerminal,
        }),
    }),
    {
      name: "gameState",
      storage: createJSONStorage(() => localStorage),
      version: 1.0,
    }
  )
);

export default useGameStateManager;
