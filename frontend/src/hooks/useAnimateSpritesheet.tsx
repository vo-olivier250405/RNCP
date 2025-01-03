import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

type useAnimateSpritesheetProps = {
  frameTime: number;
  texture: any;
  frameCount: number;
  frameNumberOnRepeat: number;
};

type useAnimateSpritesheetType = {
  currentFrame: any;
  time: any;
};

const useSpritesheetAnimation = ({
  texture,
  frameTime,
  frameCount,
  frameNumberOnRepeat,
}: useAnimateSpritesheetProps): useAnimateSpritesheetType => {
  const time = useRef(0);
  const currentFrame = useRef(0);

  useFrame((_, delta) => {
    time.current += delta * 1000;
    if (time.current >= frameTime) {
      // Increment the frame pointer
      currentFrame.current += 1;

      // Repeat animation if we're at the end
      if (currentFrame.current >= frameCount) {
        currentFrame.current = frameNumberOnRepeat;
      }

      // Reset timer
      time.current = 0;

      // Apply texture offset
      texture.offset.x = currentFrame.current / frameCount;
    }
  });
  return { currentFrame, time };
};

export default useSpritesheetAnimation;
