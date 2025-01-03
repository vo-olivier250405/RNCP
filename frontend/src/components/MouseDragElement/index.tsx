import React, { FC, useState } from "react";
import { cn } from "../../utils/lib";

export type MouseDragElementProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const MouseDragElement: FC<MouseDragElementProps> = ({
  children,
  className,
  ...props
}) => {
  const { innerHeight } = window;
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({
    x: 0,
    y: innerHeight - innerHeight / 2.5,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    const clampedX = Math.max(0, Math.min(newX, innerHeight));
    const clampedY = Math.max(0, Math.min(newY, innerHeight / 1.6));

    setPosition({
      x: clampedX,
      y: clampedY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={cn("", className)}
      {...{ props }}
      style={{
        left: cn(`${position.x}px`),
        top: cn(`${position.y}px`),
        position: "absolute",
        cursor: cn(isDragging ? "grabbing" : "grab"),
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default MouseDragElement;
