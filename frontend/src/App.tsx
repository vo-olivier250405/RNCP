import useGameStateManager from "./stores/useGameStateManager";
import { FC } from "react";

import {
  GameOverScreen,
  GameScreen,
  HomeScreen,
  LoginScreen,
  PauseScreen,
} from "./components/Screens";
import useAuth from "./stores/useAuth";

const App: FC = () => {
  const { state } = useGameStateManager();

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated()) return <LoginScreen />;

  switch (state) {
    case "home":
      return <HomeScreen />;
    case "playing":
      return <GameScreen />;
    case "gameOver":
      return <GameOverScreen />;
    case "menu":
      return <PauseScreen />;
    default:
      return <div>Invalid state</div>;
  }
};

export default App;
