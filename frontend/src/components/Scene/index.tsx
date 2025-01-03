import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { FC, useMemo, useRef } from "react";
import { Inode } from "../../types/Inode";
import AnimatedSprite from "../AnimatedSprite";
import useGameObjects from "../../hooks/useGameObjects";
import { GameObject } from "../../types/GameObject";
import NPC from "../NPC";

type BasicSceneProps = {
  currentData: Inode;
};

const Scene: FC<BasicSceneProps> = ({ currentData }) => {
  const { getGameObjects } = useGameObjects();
  const surfaceProp = useRef<Record<"width" | "height", number>>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const { mapSrc, mapSCale } = currentData;

  const MAP = mapSrc || "./bamboola.png";
  const MAP_SCALE = mapSCale || [15, 8, 0];

  const GAME_OBJECTS = useMemo<GameObject[]>(
    () => getGameObjects(currentData, surfaceProp),
    [currentData, surfaceProp]
  );

  return (
    <div className="relative size-full overflow-hidden">
      <Canvas className="size-full rounded-full">
        <AnimatedSprite
          opacity={1}
          spriteScale={MAP_SCALE}
          src={MAP}
          frameCount={1}
          spritePosition={[0, 0, 0]}
        />
        {GAME_OBJECTS.map(
          (o, idx) =>
            o.isVisible &&
            (o.isNpc ? (
              <NPC gameObject={o} key={idx} />
            ) : (
              <AnimatedSprite
                key={o.name}
                frameCount={o.frameCount}
                spritePosition={o.position}
                spriteScale={o.scale}
                src={o.imgSrc}
              />
            ))
        )}
      </Canvas>

      <div
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 80%)",
        }}
      />
      <Loader />
    </div>
  );
};

export default Scene;
