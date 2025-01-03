import { FC, useEffect } from "react";
import { GameObject } from "../../../types/GameObject";
import useGameStateManager from "../../../stores/useGameStateManager";
import { useDialogs } from "../../../contexts/dialog";
import { KeyNPC } from "../../../utils/speechlines";
import { Output } from "../../../types/Output";
import AnimatedSprite from "../../AnimatedSprite";

type BaseNpcProps = {
  gameObject: GameObject;
};

const BaseNPC: FC<BaseNpcProps> = ({ gameObject }) => {
  const { action, history, setHistory } = useGameStateManager();
  const { getNpcDialog, setNpcDialog } = useDialogs();
  const {
    name,
    frameCount,
    position,
    scale,
    frameNumberOnRepeat,
    imgSrc,
    description,
  } = gameObject;

  const NPC_DIALOGS = description || getNpcDialog(name as KeyNPC) || ["..."];
  const baseHistory: Output = {
    command: "cat",
    args: [name ? name : ""],
    fullCommand: `cat ${name}`,
    message: "",
  };

  useEffect(() => {
    const [command, target] = action;
    if (!target) return;

    if (command === "cat" && target.name === name) {
      setNpcDialog(name as KeyNPC, NPC_DIALOGS.slice(1));
      setHistory([
        ...history,
        {
          ...baseHistory,
          message: NPC_DIALOGS[0],
        },
      ]);
    }
  }, [action]);

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

export default BaseNPC;
