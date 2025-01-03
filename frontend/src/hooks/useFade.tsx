import { SpringRef, useSpring } from "@react-spring/web";
import { useEffect } from "react";

type useFadeProps = {
  isAnimated: boolean;
  setIsAnimated: (b: boolean) => void;
  duration?: number;
  timeoutDuration?: number;
  animationDuration?: number;
  initialStyle: Record<string, any>;
  mutatedStyle: Record<string, any>;
};

type useFadeReturnType = {
  styles: Record<string, any>;
  api: SpringRef<Record<string, any>>;
};

const useFade = ({
  duration = 1000,
  timeoutDuration = 1000,
  initialStyle,
  mutatedStyle,
  isAnimated,
  animationDuration = 5000,
  setIsAnimated,
}: useFadeProps): useFadeReturnType => {
  const [styles, api] = useSpring(() => ({ ...initialStyle }));

  useEffect(() => {
    if (isAnimated) {
      api.start({ ...mutatedStyle, config: { duration } });

      const timeoutId = setTimeout(() => {
        api.start({
          ...initialStyle,
          config: { duration: timeoutDuration },
          onRest: () => setIsAnimated(false),
        });
      }, animationDuration);
      return () => clearTimeout(timeoutId);
    } else {
      api.start({ ...initialStyle, config: { duration: 0 } });
    }
  }, [api, isAnimated, setIsAnimated]);

  return { styles, api };
};

export default useFade;
