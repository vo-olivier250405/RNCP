import { FC, useEffect } from "react";
import { GameObject } from "../../../types/GameObject";
import useGameStateManager from "../../../stores/useGameStateManager";
import AnimatedSprite from "../../AnimatedSprite";
import { useDialogs } from "../../../contexts/dialog";
import { getBaseHistory } from "../../../utils/helpers";
import { KeyNPC } from "../../../utils/speechlines";

type ComputerProps = {
  gameObject: GameObject;
};

const Computer: FC<ComputerProps> = ({ gameObject }) => {
  const { name, frameCount, frameNumberOnRepeat, imgSrc, position, scale } =
    gameObject;
  const { history, setHistory, action, currentDirectory } =
    useGameStateManager();
  const { getNpcDialog, setNpcDialog } = useDialogs();
  const dialogs = getNpcDialog("Computer");

  const baseHistory = getBaseHistory("cat", [name!]);

  const hasRunEchoPassword = history.some(
    (h) => h.command === "echo" && h.args[0] === "Password"
  );

  useEffect(() => {
    const [command, target] = action;
    if (!target && command !== "echo") return;

    const updateHistory = (message: string) => {
      setHistory([...history, { ...baseHistory, message }]);
    };

    if (command === "cat" && target?.name === name) {
      if (hasRunEchoPassword) {
        setNpcDialog(name as KeyNPC, dialogs.slice(1));
        updateHistory(dialogs[0] || "There's no more message");
      } else {
        updateHistory("Please say the password");
      }
    } else if (command === "echo") {
      const { args } = history[history.length - 1];
      const message =
        args[0] !== "Password"
          ? `${args[0]} is incorrect.`
          : "Correct password";
      updateHistory(message);
    }
  }, [currentDirectory, action]);

  return (
    <AnimatedSprite
      {...{
        key: name,
        frameCount,
        frameNumberOnRepeat,
        src: imgSrc,
        spritePosition: position,
        spriteScale: scale,
      }}
    />
  );
};

export default Computer;
