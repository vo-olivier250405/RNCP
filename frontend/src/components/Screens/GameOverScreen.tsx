import { Canvas } from "@react-three/fiber";
import useGameStateManager from "../../stores/useGameStateManager";
import Cat from "../NPC/Cat";
import { FC } from "react";

export const GameOverScreen: FC = () => {
  const { setState } = useGameStateManager();
  return (
    <div className="flex flex-col gap-4 items-center bg-black h-screen w-screen justify-center">
      <h1 className="text-white text-8xl">Game Over</h1>
      <div className="flex flex-row gap-3 text-5xl">
        <button
          className="p-4 bg-green-600 border border-black rounded-md hover:bg-green-400"
          onClick={() => setState("playing")}
        >
          Play again
        </button>
        <button
          className="p-4 bg-green-600 border border-black rounded-md hover:bg-green-400"
          onClick={() => setState("home")}
        >
          Home
        </button>
      </div>
      <Canvas>
        <Cat
          gameObject={{
            imgSrc: "./catman.png",
            name: "Catman",
            position: [0, 0, 0],
            scale: [4, 4, 4],
            isNpc: true,
            frameCount: 8,
          }}
        />
      </Canvas>
    </div>
  );
};
