import { FC } from "react";
import { GameObject } from "../../types/GameObject";
import Cat from "./Cat";
import BaseNPC from "./BaseNPC";
import OldMan from "./OldMan";
import OldLady from "./OldLady";
import Gecho from "./Gecho";
import Syslog from "./Syslog";
import Authlog from "./Authlog";
import Computer from "./Computer";
import Clemouille from "./ClemouilleLaFripouille";

type NpcProps = {
  gameObject: GameObject;
};

const NPC: FC<NpcProps> = ({ gameObject }) => {
  const { name } = gameObject;

  switch (name) {
    case "Catman":
      return <Cat {...{ gameObject }} />;
    case "OldMan":
      return <OldMan {...{ gameObject }} />;
    case "OldLady":
      return <OldLady {...{ gameObject }} />;
    case "Ekko":
      return <Gecho {...{ gameObject }} />;
    case "Syslog":
      return <Syslog {...{ gameObject }} />;
    case "Authlog":
      return <Authlog {...{ gameObject }} />;
    case "Computer":
      return <Computer {...{ gameObject }} />;
    case "ClemouilleLaFripouille":
      return <Clemouille {...{ gameObject }} />;
    default:
      return <BaseNPC {...{ gameObject }} />;
  }
};

export default NPC;
