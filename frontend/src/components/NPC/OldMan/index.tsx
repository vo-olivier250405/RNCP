import { FC, useEffect } from "react";
import { GameObject } from "../../../types/GameObject";
import AnimatedSprite from "../../AnimatedSprite";
import useGameStateManager from "../../../stores/useGameStateManager";
import { useDialogs } from "../../../contexts/dialog";
import { getBaseHistory } from "../../../utils/helpers";

type OldManProps = {
  gameObject: GameObject;
};

const OldMan: FC<OldManProps> = ({ gameObject }) => {
  const { name, position, scale, frameCount, imgSrc, frameNumberOnRepeat } =
    gameObject;
  const { action, history, setHistory, currentDirectory } =
    useGameStateManager();
  const { getNpcDialog, setNpcDialog } = useDialogs();

  const dialogs = getNpcDialog("OldMan");

  const baseHistory = getBaseHistory("cat", [name!]);

  useEffect(() => {
    const [command, target] = action;
    if (!target) return;
    if (command === "cat" && target.name === name) {
      if (dialogs[0]?.includes("Thank you")) {
        const isCatPresent = currentDirectory.children.some(
          (c) => c.name === "Maurice"
        );
        if (!isCatPresent) {
          return setHistory([
            ...history,
            {
              ...baseHistory,
              message: "Sigh, Maurice my dear friend, where are you...",
            },
          ]);
        }
      }
      setNpcDialog("OldMan", dialogs.slice(1));
      setHistory([
        ...history,
        {
          ...baseHistory,
          message:
            dialogs[0] ||
            "Maurice is fine now, thank you, maybe you should help someone else in the User city.",
        },
      ]);
    }
  }, [action, currentDirectory]);

  return (
    <AnimatedSprite
      key={name}
      frameCount={frameCount}
      spritePosition={position}
      spriteScale={scale}
      frameNumberOnRepeat={frameNumberOnRepeat}
      src={imgSrc}
    />
  );
};

export default OldMan;
