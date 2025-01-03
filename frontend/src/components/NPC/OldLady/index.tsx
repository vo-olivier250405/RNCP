import { FC, useEffect } from "react";
import { GameObject } from "../../../types/GameObject";
import useGameStateManager from "../../../stores/useGameStateManager";
import { useDialogs } from "../../../contexts/dialog";
import AnimatedSprite from "../../AnimatedSprite";
import { getBaseHistory } from "../../../utils/helpers";

type OldLadyProps = {
  gameObject: GameObject;
};

const OldLady: FC<OldLadyProps> = ({ gameObject }) => {
  const { name, position, scale, frameCount, imgSrc, frameNumberOnRepeat } =
    gameObject;
  const { action, history, setHistory, currentDirectory } =
    useGameStateManager();

  const { getNpcDialog, setNpcDialog } = useDialogs();

  const dialogs = getNpcDialog("OldLady");

  const baseHistory = getBaseHistory("cat", [name!]);

  useEffect(() => {
    const [command, target] = action;
    if (!target) return;
    if (command === "cat" && target.name === name) {
      if (dialogs[0]?.includes("Oh thanks")) {
        const isPhonePresent = currentDirectory.children.some(
          (c) => c.name === "Phone"
        );
        if (!isPhonePresent) {
          return setHistory([
            ...history,
            {
              ...baseHistory,
              message:
                'You dont know how to create a phone ? Sigh, just type "touch + name of the object".',
            },
          ]);
        }
      }
      setNpcDialog("OldLady", dialogs.slice(1));
      setHistory([
        ...history,
        {
          ...baseHistory,
          message:
            dialogs[0] || "Maybe you should try to go to the User city now.",
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

export default OldLady;
