import { SpriteProps, useLoader, Vector3 } from "@react-three/fiber";
import useSpritesheetAnimation from "../../hooks/useAnimateSpritesheet";
import { TextureLoader, NearestFilter } from "three";
import { FC } from "react";

type AnimatedSpriteProps = {
  frameCount?: number;
  spritePosition?: Vector3;
  spriteScale?: Vector3;
  src?: string;
  opacity?: number;
  frameNumberOnRepeat?: number;
} & SpriteProps;

const AnimatedSprite: FC<AnimatedSpriteProps> = ({
  frameCount = 8,
  src = "./spritesheet.png",
  spritePosition = [0, 0, 0],
  spriteScale = [0, 0, 0],
  opacity = 1,
  frameNumberOnRepeat = 0 ,
  ...props
}) => {
  const texture = useLoader(TextureLoader, src);
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;

  texture.repeat.set(1 / frameCount, 1 / 1);

  // 100 milliseconds per frame
  useSpritesheetAnimation({
    frameTime: 100,
    texture,
    frameCount,
    frameNumberOnRepeat,
  });

  return (
    <sprite {...{ props }} position={spritePosition} scale={spriteScale}>
      <spriteMaterial transparent map={texture} opacity={opacity} />
    </sprite>
  );
};

export default AnimatedSprite;
