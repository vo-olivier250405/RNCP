import { Vector3 } from "@react-three/fiber";
import { Inode } from "./Inode";

// export type GameObject = {
//   id: string;
//   imgSrc: string;
//   frameCount: number;
//   position: Vector3;
//   scale: Vector3;
//   frameNumberOnRepeat?: number;
//   description?: string[];
//   isNpc?: boolean;
// };

export type GameObject = Partial<Inode>;
