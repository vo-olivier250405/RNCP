import { FC, useState } from "react";
import useLinuxTerminalService from "../../hooks/useLinuxTerminalService";
import { formatCommands, getCommands } from "../../utils/helpers";
import useGameStateManager from "../../stores/useGameStateManager";
import { Output } from "../../types/Output";
import OutputHistory from "../OutputHistory";
import MouseDragElement from "../MouseDragElement";

const TerminalInput: FC = () => {
  const { history, setHistory, setAction, terminal } = useGameStateManager();
  const [input, setInput] = useState<string>(
    !!history.length ? "" : "cat Catman"
  );
  const { currentDirectory, getOutputFromCommand } = useLinuxTerminalService({
    LinuxTerminal: terminal!,
  });

  let currentHistoryIndex: number | null = null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commands = input.split(" ");
    const allCommands = getCommands(commands);
    const formattedCommands = formatCommands(allCommands);

    if (formattedCommands.length > 1) {
      setHistory([
        ...history,
        {
          command: formattedCommands[1].cmd,
          args: [],
          fullCommand: input,
          message: "You can only do one thing at a time for now.",
        },
      ]);
    } else {
      const { cmd, args } = formattedCommands[0];
      const out = getOutputFromCommand(cmd, args);
      if (Array.isArray(out)) {
        setAction(out);
      } else {
        setHistory([...history, out as Output]);
      }
    }

    setInput("");
    currentHistoryIndex = null;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      if (currentHistoryIndex === null) {
        currentHistoryIndex = history.length - 1;
      } else {
        currentHistoryIndex = Math.max(currentHistoryIndex - 1, 0);
      }
      setInput(history[currentHistoryIndex]?.fullCommand || "");
    } else if (e.key === "ArrowDown") {
      if (
        currentHistoryIndex === null ||
        currentHistoryIndex >= history.length - 1
      ) {
        currentHistoryIndex = null;
        setInput("");
      } else {
        currentHistoryIndex++;
        setInput(history[currentHistoryIndex]?.fullCommand || "");
      }
    }
  };

  return (
    <MouseDragElement className="z-50 items-center w-1/2 px-2 m-4 border-4 p-4 rounded-md backdrop-blur-sm text-xl">
      <OutputHistory />
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 m-2 border-b"
      >
        <div className="flex flex-row gap-2 items-center w-full">
          <div className="text-green-200 flex flex-row gap-1 items-center">
            <span className="rounded-full border-2 w-full" />
            <b>{currentDirectory.cwd}</b>
            <span className="text-xs">%</span>
          </div>
          <input
            className="w-full outline-none py-2 my-2 bg-transparent text-green-200 caret-green-200"
            type="text"
            name="TerminalInput"
            id="terminal-input"
            onKeyDown={handleKeyDown}
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button
            className="bg-slate-800 p-1 text-white rounded-sm border border-slate-200 text-sm hover:bg-slate-700"
            type="submit"
          >
            Enter
          </button>
        </div>
      </form>
    </MouseDragElement>
  );
};

export default TerminalInput;
