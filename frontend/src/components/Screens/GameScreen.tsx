import { FC, useEffect, useState } from "react";
import useGameStateManager from "../../stores/useGameStateManager";
import FadeElements from "../FadeElements";
import TerminalInput from "../Input/TerminalInput";
import Lamp from "../Lamp";
import Scene from "../Scene";
import { Canvas } from "@react-three/fiber";
import Cat from "../NPC/Cat";

export const GameScreen: FC = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  const { action, history, currentDirectory, dataToDisplay, setState } =
    useGameStateManager();

  useEffect(() => {
    const [command, _target] = action;
    if (command === "ls") {
      setIsAnimated(true);
    }
    if (command === "clear") {
      setIsAnimated(false);
    }
    if (command === "cd") {
      setIsAnimated(false);
    }
  }, [history, action, currentDirectory]);

  return (
    <div className="bg-black w-screen h-screen font-jersey">
      <button
        className="absolute inset-0 z-50 p-2 bg-slate-500 w-fit h-fit m-4 rounded-md hover:bg-slate-300"
        onClick={() => setState("menu")}
        children="Pause"
      />
      {currentDirectory.name === "/" && (
        <Canvas className="z-30">
          <Cat
            gameObject={{
              name: "Catman",
              position: [0, 0.5, 0],
              scale: [2, 2, 0],
              frameCount: 8,
              imgSrc: "./catman.png",
            }}
          />
        </Canvas>
      )}
      <FadeElements {...{ isAnimated, setIsAnimated }}>
        <Scene currentData={dataToDisplay} />
      </FadeElements>
      <TerminalInput />
      <Lamp {...{ isAnimated, setIsAnimated }} />
    </div>
  );
};
