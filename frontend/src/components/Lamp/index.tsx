import { FC } from "react";
import useFade from "../../hooks/useFade";
// import { Canvas } from "@react-three/fiber";
// import AnimatedSprite from "../AnimatedSprite";

type LampType = {
  isAnimated: boolean;
  setIsAnimated: (bool: boolean) => void;
};

const Lamp: FC<LampType> = ({ isAnimated, setIsAnimated }) => {
  const { styles } = useFade({
    isAnimated,
    setIsAnimated,
    duration: 100,
    initialStyle: { opacity: 0, width: 0, height: 0 },
    mutatedStyle: { opacity: 1, width: 100, height: 100 },
  });

  return (
    <div
      className="absolute bottom-0 right-0 m-4 rounded-md z-50 bg-slate-300"
      style={styles}
    >
      {/* <Canvas className="size-44">
        <AnimatedSprite
          spritePosition={[0, 0, 0]}
          spriteScale={[8, 8, 0]}
          src="./catman.png"
          frameCount={8}
        />
      </Canvas> */}
    </div>
  );
};

export default Lamp;
