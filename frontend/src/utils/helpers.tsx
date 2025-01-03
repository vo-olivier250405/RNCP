import { Args, Command } from "../types/Command";
import { Output } from "../types/Output";

export const getCommands = (commands: string[]): string[][] => {
  const separators = ["&&", "||", ";"];
  let allCommands = [];
  let idx = 0;

  for (let i = 0; i < commands.length; i++) {
    if (separators.includes(commands[i])) {
      allCommands.push(commands.slice(idx, i));
      idx = i + 1;
    }
  }

  allCommands.push(commands.slice(idx));
  return allCommands.length > 1 ? allCommands : [commands];
};

export const formatCommands = (
  commands: string[][]
): { cmd: Command; args: Args }[] =>
  commands.map((command) => ({
    cmd: command[0] as Command,
    args: command.slice(1) as Args,
  }));

export const processPathSegments = (
  currentPath: string,
  destination: string
): string[] => {
  const segments = destination.startsWith("/")
    ? destination.split("/")
    : [...currentPath.split("/"), ...destination.split("/")];

  return segments.reduce((processedSegments, segment) => {
    if (segment === "" || segment === ".") return processedSegments;
    if (segment === "..") {
      processedSegments.pop();
    } else {
      processedSegments.push(segment);
    }
    return processedSegments;
  }, [] as string[]);
};

export const getFlagsAndDestination = (args: Args) => {
  const flags = args.filter((arg) => arg.startsWith("-"));
  const destination = args.find((arg) => !arg.startsWith("-"));
  return { flags, destination };
};

export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getBaseHistory = (command: Command, args: Args = []): Output => ({
  command,
  args,
  fullCommand: `${command} ${args.join(" ")}`,
  message: "",
});

export const ALL_COMMANDS = [
  "ls",
  "cd",
  "cat",
  "touch",
  "mkdir",
  "rm",
  "clear",
  "echo",
];

export const ALLOWED_COMMANDS = ["ls", "cd", "cat", "clear", "touch", "echo"];
