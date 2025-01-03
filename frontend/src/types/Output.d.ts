import { Args, Command } from "./Command";

export type Output = {
  fullCommand: string;
  command: Command;
  args: Args;
  imgSrc?: string;
  message: string;
};

export type OutputHistory = Output[];
