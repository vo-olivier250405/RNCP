import { Vector3 } from "@react-three/fiber";

export type Inode = {
  name: string;
  mapSrc?: string;
  imgSrc?: string;
  type: "folder" | "file";
  parent?: string;
  children: Inode[];
  rights?: string[];
  cwd: string;
  description?: string[];
  position?: Vector3;
  frameCount?: number;
  frameNumberOnRepeat?: number;
  scale?: Vector3;
  isNpc?: boolean;
  isVisible?: boolean;
  mapSCale?: Vector3;
};
