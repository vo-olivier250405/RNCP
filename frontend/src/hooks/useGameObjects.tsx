import { Inode } from "../types/Inode";
import { MutableRefObject } from "react";
import { randomIntFromInterval } from "../utils/helpers";
import { Vector3 } from "@react-three/fiber";
import { GameObject } from "../types/GameObject";
import { NPC_KEYS } from "../utils/speechlines";

type useGameObjectsType = {
  getGameObjects: (
    currentDirectory: Inode,
    surfaceProps: MutableRefObject<Record<"width" | "height", number>>
  ) => GameObject[];
};

const useGameObjects = (): useGameObjectsType => {
  const getGameObjects = (
    currentDirectory: Inode,
    surfaceProps: MutableRefObject<Record<"width" | "height", number>>
  ) => {
    const { children } = currentDirectory;
    const { width: WIDTH, height: HEIGHT } = surfaceProps.current;
    const maxX = WIDTH % 10;
    const maxH = HEIGHT % 10;

    const POSITIONS: Set<string> = new Set();

    const scale =
      children.length <= 7
        ? ([1, 1, 1] as Vector3)
        : (Array(3).fill((1 / children.length) * 10) as Vector3);

    const GAME_OBJECTS: Inode[] = children.map((c) => {
      let RANDOM_X = randomIntFromInterval(-maxX - 3, maxX + 3);
      let RANDOM_Y = randomIntFromInterval(-maxH + 3, maxH - 3);

      while (POSITIONS.has(`${RANDOM_X},${RANDOM_Y}`)) {
        RANDOM_X += Math.random() > 0.5 ? 0.5 : -0.5;
        RANDOM_Y += Math.random() > 0.5 ? 0.5 : -0.5;
      }

      POSITIONS.add(`${RANDOM_X},${RANDOM_Y}`);
      return {
        ...c,
        position:
          children.length === 1
            ? [0, 0, 0]
            : c.position || [RANDOM_X, RANDOM_Y, 0],
        scale: c.scale || scale,
        isNpc: c.isNpc || NPC_KEYS.includes(c.name),
        isVisible: c.isVisible === undefined ? true : c.isVisible,
      };
    });

    return GAME_OBJECTS;
  };

  return {
    getGameObjects,
  };
};

export default useGameObjects;
