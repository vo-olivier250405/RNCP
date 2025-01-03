import { Args, Command } from "../types/Command";
import { Inode } from "../types/Inode";
import { Output } from "../types/Output";
import {
  ALL_COMMANDS,
  ALLOWED_COMMANDS,
  getFlagsAndDestination,
  processPathSegments,
} from "../utils/helpers";
import { NPC_KEYS } from "../utils/speechlines";
import useGameStateManager from "../stores/useGameStateManager";

type useLinuxTerminalServiceProps = {
  LinuxTerminal: Inode;
};

type useLinuxTerminalServiceReturnProps = {
  handleCommand: (command: Command, args: Args) => any;
  getOutputFromCommand: (
    command: Command,
    args: Args
  ) => Output | [Command, Inode];
  currentDirectory: Inode;
};

const useLinuxTerminalService = ({
  LinuxTerminal,
}: useLinuxTerminalServiceProps): useLinuxTerminalServiceReturnProps => {
  const { setAction, currentDirectory, setCurrentDirectory, setDataToDisplay } =
    useGameStateManager();

  const getOutputFromCommand = (
    command: Command,
    args: Args = []
  ): Output | [Command, Inode] => {
    const fullCommand = `${command} ${args.join()}`;

    const baseOutput: Output = {
      imgSrc: "./spritesheet.png",
      command,
      args,
      fullCommand,
      message: "",
    };

    const commandOutput = handleCommand(command, args)!;
    return typeof commandOutput === "string"
      ? {
          ...baseOutput,
          message: commandOutput,
        }
      : commandOutput;
  };

  const handleCommand = (command: Command, args: Args = []) => {
    setAction([command, null]);

    if (!ALLOWED_COMMANDS.includes(command) && ALL_COMMANDS.includes(command))
      return "Don't be such a hurry, you can't do that yet.";

    switch (command) {
      case "ls":
        return ls(args);
      case "cd":
        return cd(args);
      case "pwd":
        return pwd();
      case "cat":
        return cat(args);
      case "touch":
        return touch(args);
      case "mkdir":
        return mkdir(args);
      case "rm":
        return rm(args);
      case "clear":
        return clear();
      case "echo":
        return echo(args);
      default:
        return "command not found";
    }
  };

  const findINode = (destination: string): Inode | null => {
    const pathSegments = processPathSegments(currentDirectory.cwd, destination);
    return pathSegments.reduce<Inode | null>((current, segment) => {
      if (!current) return null;
      return current.children.find((child) => child.name === segment) || null;
    }, LinuxTerminal);
  };

  const ls = (args: Args) => {
    const destination = args[0] || ".";
    const targetDirectory = findINode(destination);
    if (!targetDirectory)
      return `ls: ${destination}: No such file or directory`;
    // const resultLength = targetDirectory.children.length;
    // const output = `You can see ${resultLength} thing${
    //   resultLength > 1 ? "s" : ""
    // }.`;
    setDataToDisplay(targetDirectory);
    return targetDirectory.children
      .map((child) => (child.type === "file" ? child.name : child.name + "/"))
      .join(" ");
  };

  const cd = (args: Args) => {
    const destination = args[0] || "/";
    const targetDirectory = findINode(destination);
    if (targetDirectory?.type !== "folder")
      return `cd: not a directory: ${destination}`;
    if (targetDirectory) {
      setCurrentDirectory(targetDirectory);
      return `You are in ${targetDirectory.name}`;
    }
    return `cd: no such file or directory: ${destination}`;
  };

  const cat = (args: Args) => {
    const destination = args[0] || ".";
    const targetFile = findINode(destination);

    if (!targetFile) return `cat: ${destination}: No such file or directory`;
    if (targetFile.type === "file") {
      return targetFile.isNpc
        ? (["cat", targetFile] as [Command, Inode])
        : targetFile.description?.[0];
    }
    return `cat: ${destination}: Is a directory`;
  };

  const touch = (args: Args) => {
    const destination = args[0];
    if (!destination)
      return "usage: touch [-A [-][[hh]mm]SS] [-achm] [-r file] [-t [[CC]YY]MMDDhhmm[.SS]]\n[-d YYYY-MM-DDThh:mm:SS[.frac][tz]] file ...";
    const targetDirectory = findINode(destination);
    if (targetDirectory) {
      return `touch: cannot touch '${destination}': File exists`;
    }
    const pathSegments = processPathSegments(currentDirectory.cwd, destination);
    const newFileName = pathSegments.pop();
    const parentDirectory = pathSegments.reduce(
      (current, segment) =>
        current.children.find(
          (child) => child.name === segment && child.type === "folder"
        ) as Inode,
      LinuxTerminal
    );

    if (parentDirectory) {
      if (!newFileName) return;
      if (NPC_KEYS.includes(newFileName)) {
        parentDirectory.children.push({
          name: newFileName,
          frameCount: 8,
          imgSrc: `./${newFileName}.png`,
          type: "file",
          cwd: `${parentDirectory.cwd}/${newFileName}`,
          parent: parentDirectory.cwd,
          children: [],
          isNpc: true,
          isVisible: true,
        });
      } else {
        parentDirectory.children.push({
          name: newFileName,
          type: "file",
          cwd: `${parentDirectory.cwd}/${newFileName}`,
          parent: parentDirectory.cwd,
          children: [],
          isNpc: false,
          description: ["This is " + newFileName],
          isVisible: true,
        });
      }
      return newFileName;
    }
  };

  const mkdir = (args: Args) => {
    const destination = args[0];
    if (!destination) return "usage: mkdir [-pv] [-m mode] directory ...";
    const targetDirectory = findINode(destination);
    if (targetDirectory) {
      return `mkdir: cannot create directory '${destination}': File exists`;
    }
    const pathSegments = processPathSegments(currentDirectory.cwd, destination);
    const newDirectoryName = pathSegments.pop();
    const parentDirectory = pathSegments.reduce(
      (current, segment) =>
        current.children.find(
          (child) => child.name === segment && child.type === "folder"
        ) as Inode,
      LinuxTerminal
    );

    if (parentDirectory) {
      parentDirectory.children.push({
        name: newDirectoryName || "",
        type: "folder",
        cwd: `${parentDirectory.cwd}/${newDirectoryName}`,
        parent: parentDirectory.cwd,
        children: [],
      });
      return newDirectoryName;
    }
  };

  const rm = (args: Args) => {
    const { flags, destination } = getFlagsAndDestination(args);

    if (!!flags && !destination) {
      return "usage: rm [-f | -i] [-dPRrvW] file ...";
    }

    if (!destination) return "usage: rm [-f | -i] [-dPRrvW] file ...";
    const targetDirectory = findINode(destination);
    if (!targetDirectory) {
      return `rm: cannot remove '${destination}': No such file or directory`;
    }

    const canDelete =
      targetDirectory.type === "file" ||
      (targetDirectory.type === "folder" && flags.includes("-r"));

    if (canDelete && targetDirectory.parent) {
      const parentDirectory = findINode(targetDirectory.parent);
      if (parentDirectory) {
        parentDirectory.children = parentDirectory.children.filter(
          (child) => child.name !== targetDirectory.name
        );
        return "";
      }
    }

    return `rm: cannot remove '${destination}': Is a directory`;
  };

  const pwd = () => {
    return currentDirectory.cwd;
  };

  const clear = () => {
    return "\n";
  };

  const echo = (args: Args) => {
    return args.join(" ");
  };

  return {
    handleCommand,
    getOutputFromCommand,
    currentDirectory,
  };
};

export default useLinuxTerminalService;
