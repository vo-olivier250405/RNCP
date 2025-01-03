import { FC } from "react";
import { animated } from "@react-spring/web";
import useFade from "../../hooks/useFade";
import { cn } from "../../utils/lib";

type FadeElementsType = {
  children: React.ReactNode;
  isAnimated: boolean;
  setIsAnimated: (bool: boolean) => void;
};

const FadeElements: FC<FadeElementsType> = ({
  children,
  isAnimated,
  setIsAnimated,
}) => {
  const { styles } = useFade({
    isAnimated,
    setIsAnimated,
    animationDuration: 5000,
    initialStyle: { opacity: 0 },
    mutatedStyle: { opacity: 1 },
  });

  return (
    <animated.div
      style={styles}
      className={cn(
        "size-full absolute inset-0 z-20",
        !isAnimated && "opacity-0"
      )}
    >
      {children}
    </animated.div>
  );
};

export default FadeElements;
