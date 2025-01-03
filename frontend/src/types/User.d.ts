import { GameStateManager } from "./GameStateManager";
import { Inode } from "./Inode";

export type User = {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  username: string;
  is_active: boolean;
  game_session: Partial<GameStateManager>;
};
