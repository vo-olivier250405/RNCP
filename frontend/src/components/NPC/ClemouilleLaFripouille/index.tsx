import { FC, useEffect } from "react";
import { GameObject } from "../../../types/GameObject";
import AnimatedSprite from "../../AnimatedSprite";
import useGameStateManager from "../../../stores/useGameStateManager";
import { useDialogs } from "../../../contexts/dialog";
import { getBaseHistory } from "../../../utils/helpers";

type ClemouilleProps = {
  gameObject: GameObject;
};

const Clemouille: FC<ClemouilleProps> = ({ gameObject }) => {
  const { name, position, scale, frameCount, imgSrc, frameNumberOnRepeat } =
    gameObject;
  const { action, history, setHistory, currentDirectory } =
    useGameStateManager();
  const { getNpcDialog, setNpcDialog } = useDialogs();

  const dialogs = getNpcDialog("ClemouilleLaFripouille");

  const baseHistory = getBaseHistory("cat", [name!]);

  useEffect(() => {
    const [command, target] = action;
    if (!target) return;
    if (command === "cat" && target.name === name) {
      setNpcDialog("ClemouilleLaFripouille", dialogs.slice(1));
      setHistory([
        ...history,
        {
          ...baseHistory,
          message: dialogs[0] || "Bèz ta mère",
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

export default Clemouille;
