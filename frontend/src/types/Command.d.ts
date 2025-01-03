export type Command =
  | "ls"
  | "cd"
  | "pwd"
  | "cat"
  | "touch"
  | "mkdir"
  | "rm"
  | "clear"
  | "echo";

export type Args = string[];
