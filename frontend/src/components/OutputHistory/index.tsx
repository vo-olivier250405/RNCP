import { FC, useMemo, useRef } from "react";
import useGameStateManager from "../../stores/useGameStateManager";
import { useLayoutEffect } from "react";
import { cn } from "../../utils/lib";

const OutputHistory: FC = () => {
  const { history } = useGameStateManager();
  const boxesRef = useRef<HTMLDivElement>(null);
  const isClear = useMemo(() => {
    if (!history || !history.length) return false;
    const lastOutput = history[history.length - 1];
    return lastOutput.command === "clear";
  }, [history]);

  useLayoutEffect(() => {
    boxesRef?.current?.scrollIntoView({
      behavior: "instant",
      block: "end",
    });
  }, [history]);

  return (
    <div className="text-white h-[130px] overflow-y-auto">
      {!isClear &&
        history.map((h, idx) => (
          <div
            key={idx}
            className={cn(
              "flex flex-col gap-1 py-3 px-2",
              idx === history.length - 1 ? "opacity-1" : "opacity-50"
            )}
            ref={boxesRef}
          >
            <p className="font-bold">You: {h.fullCommand}</p>
            <div className="flex flex-row gap-3 border-b px-4">
              <p>{h.message}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OutputHistory;
