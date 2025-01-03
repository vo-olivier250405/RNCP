import { FC } from "react";
import useGameStateManager from "../../stores/useGameStateManager";

export const HomeScreen: FC = () => {
  const { setState } = useGameStateManager();
  return (
    <div className="h-screen w-screen bg-black flex justify-center">
      <button
        onClick={() => setState("playing")}
        className="text-8xl text-white hover:text-green-500 transition-all ease-in-out w-fit"
      >
        PLAY
      </button>
    </div>
  );
};
