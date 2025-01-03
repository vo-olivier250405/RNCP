import { FC, useEffect, useState } from "react";
import { GameObject } from "../../../types/GameObject";
import useGameStateManager from "../../../stores/useGameStateManager";
import AnimatedSprite from "../../AnimatedSprite";
import { useDialogs } from "../../../contexts/dialog";
import { getBaseHistory } from "../../../utils/helpers";

type SyslogProps = {
  gameObject: GameObject;
};

const Syslog: FC<SyslogProps> = ({ gameObject }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { name, frameCount, frameNumberOnRepeat, imgSrc, position, scale } =
    gameObject;
  const { history, setHistory, action, currentDirectory } =
    useGameStateManager();
  const { getNpcDialog } = useDialogs();
  const dialogs = getNpcDialog("Syslog");

  const baseHistory = getBaseHistory("cat", [name!]);

  useEffect(() => {
    const [command, target] = action;
    if (!target) return;
    if (command === "cat" && target.name === name) {
      setCurrentIdx((prev) => prev + 1);
      setHistory([
        ...history,
        {
          ...baseHistory,
          message: dialogs[currentIdx % dialogs.length] || "",
        },
      ]);
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

export default Syslog;
