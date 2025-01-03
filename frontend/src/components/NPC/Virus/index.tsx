import { FC, useEffect } from "react";
import useGameStateManager from "../../../stores/useGameStateManager";
import AnimatedSprite from "../../AnimatedSprite";
import { useDialogs } from "../../../contexts/dialog";
import { KeyNPC } from "../../../utils/speechlines";
import { GameObject } from "../../../types/GameObject";
import { getBaseHistory } from "../../../utils/helpers";

type VirusProps = {
  gameObject: GameObject;
};

const Virus: FC<VirusProps> = ({ gameObject }) => {
  const { action, history, setHistory } = useGameStateManager();
  const { getNpcDialog, setNpcDialog } = useDialogs();

  const dialogs = getNpcDialog("Virus");
  const baseHistory = getBaseHistory("cat", [gameObject.name!]);

  useEffect(() => {
    const [command, target] = action;
    if (!target) return;
    if (command === "cat" && target.name === gameObject.name) {
      if (dialogs[0]?.includes("Thats pretty good")) {
        const lastCommand = history[history.length - 1];
        const hasRunLs = lastCommand.command === "ls";
        if (!hasRunLs) {
          return setHistory([
            ...history,
            {
              ...baseHistory,
              message: "You should try running `ls`.",
            },
          ]);
        }
      }
      setNpcDialog(gameObject.name as KeyNPC, dialogs.slice(1));
      setHistory([
        ...history,
        {
          ...baseHistory,
          message:
            dialogs[0] ||
            "Im just a cat, bring me some milk and I will be happy. I guess.",
        },
      ]);
    }
  }, [action]);

  return (
    <AnimatedSprite
      key={gameObject.name}
      frameCount={gameObject.frameCount}
      spritePosition={gameObject.position}
      spriteScale={gameObject.scale}
      src={gameObject.imgSrc}
    />
  );
};

export default Virus;
