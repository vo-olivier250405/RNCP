import { FC, useEffect } from "react";
import { GameObject } from "../../../types/GameObject";
import useGameStateManager from "../../../stores/useGameStateManager";
import { useDialogs } from "../../../contexts/dialog";
import AnimatedSprite from "../../AnimatedSprite";
import { getBaseHistory } from "../../../utils/helpers";

type GechoProps = {
  gameObject: GameObject;
};

const Gecho: FC<GechoProps> = ({ gameObject }) => {
  const { name, position, scale, frameCount, imgSrc, frameNumberOnRepeat } =
    gameObject;
  const { action, history, setHistory } = useGameStateManager();

  const { getNpcDialog, setNpcDialog } = useDialogs();
  const dialogs = getNpcDialog("Ekko");
  const baseHistory = getBaseHistory("cat", [name!]);

  useEffect(() => {
    const [command, target] = action;
    if (!target) return;
    if (command === "cat" && target.name === name) {
      if (dialogs[0]?.includes("You don't need to speak so loud")) {
        const lastCommand = history[history.length - 1];
        const hasRunEcho =
          lastCommand.command === "echo" && lastCommand.args[0] === "Passord";
        if (!hasRunEcho) {
          return setHistory([
            ...history,
            {
              ...baseHistory,
              message:
                "Can you go find my password in the Log library my dear ?",
            },
          ]);
        }
      }
      const { command, args } = history[history.length - 1];
      const hasRunEchoComputer = command === "echo" && args[0] === "Computer";
      if (hasRunEchoComputer) {
        return setHistory([
          ...history,
          {
            ...baseHistory,
            message:
              "Oh you see the message on the computer...Dont't ask me. Get out.",
          },
        ]);
      }
      setNpcDialog("Ekko", dialogs.slice(1));
      setHistory([
        ...history,
        {
          ...baseHistory,
          message:
            dialogs[0] ||
            "I dont know who choose the password, but its weird...ahaha...",
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

export default Gecho;
