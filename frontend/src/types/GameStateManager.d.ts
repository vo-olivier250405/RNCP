import { Command } from "./Command";
import { Inode } from "./Inode";
import { Output, OutputHistory } from "./Output";

export type GameState = "menu" | "gameOver" | "playing" | "home";
export type inGameState = "idling" | "fighting" | "paused" | "animating";
export type outGameState = "idling" | "quitting";
export type KeyOf<T> = Extract<keyof T, string>;
export type gameAction = "fight" | "display" | "moving" | "describe" | "edit";

export type GameStateManager = {
  state: GameState | null;
  history: OutputHistory;
  action: [Command | null, Inode | null];
  currentDirectory: Inode;
  dataToDisplay: Inode;
  terminal: Inode | null;
  setTerminal: (terminal: Inode) => void;
  setDataToDisplay: (d: Inode) => void;
  setCurrentDirectory: (cwd: Inode) => void;
  setHistory: (history: Output[]) => void;
  setAction: (action: [Command, Inode | null]) => void;
  setState: (state: GameState) => void;
  clearState: () => void;
  setGameState: setGameStateType;
};

export type setGameStateType = (
  state: GameState | null,
  action: [Command | null, Inode | null],
  history: OutputHistory,
  currentDirectory: Inode,
  dataToDisplay: Inode,
  terminal: Inode | null
) => void;

export type GameStateDataType = {
  state: GameState | null;
  action: [Command | null, Inode | null];
  history: OutputHistory;
  currentDirectory: Inode;
  dataToDisplay: Inode;
  terminal: Inode | null;
};
