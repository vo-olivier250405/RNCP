import { Canvas } from "@react-three/fiber";
import useGameStateManager from "../../stores/useGameStateManager";
import Cat from "../NPC/Cat";
import { FC } from "react";
import useAuth from "../../stores/useAuth";
import { useMutation } from "@tanstack/react-query";
import { getSaveMutationOptions } from "../../api/options/mutations/save";

export const PauseScreen: FC = () => {
  const {
    setState,
    clearState,
    state,
    action,
    history,
    currentDirectory,
    dataToDisplay,
    terminal,
  } = useGameStateManager();

  const { clearAuth, token, user } = useAuth();

  const data = {
    state,
    action,
    history,
    currentDirectory,
    dataToDisplay,
    terminal,
  };

  const options = getSaveMutationOptions(data, token!, user!);

  const { mutate, isPending } = useMutation(options);

  const BUTTONS = [
    { onClick: () => setState("playing"), children: "Resume" },
    { onClick: () => setState("home"), children: "Home" },
    { onClick: () => mutate(), children: isPending ? "Saving..." : "Save" },
    {
      onClick: () => {
        clearAuth();
        clearState();
      },
      children: "Logout",
    },
  ];

  return (
    <div className="flex flex-col gap-4 items-center bg-black h-screen w-screen justify-center">
      <h1 className="text-8xl text-white">Pause</h1>
      <div className="flex flex-row gap-3 text-5xl">
        {BUTTONS.map((b, idx) => (
          <button
            key={idx}
            className="p-4 bg-green-600 border border-black rounded-md hover:bg-green-400"
            onClick={b.onClick}
            disabled={isPending}
          >
            {b.children}
          </button>
        ))}
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
