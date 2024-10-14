import React, { useEffect, useRef, useState } from "react";
import Button from "./Button.tsx";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

interface HeightFormProps {
  onSubmit: (data: { height: string }) => void;
}

export default function HeightForm({ onSubmit }: HeightFormProps) {
  const [height, setHeight] = useState(170);
  const [displayHeights, setDisplayHeights] = useState([169, 170, 171]);

  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const minHeight = 145;
  const maxHeight = 165;

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTop = (height - minHeight) * 40; // 40px per cm
    }
  }, [height]);

  // const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  //   isDragging.current = true;
  //   startY.current = e.clientY;
  //   startHeight.current = height;
  // };
  //
  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (!isDragging.current) return;
  //   const deltaY = startY.current - e.clientY;
  //   const deltaHeight = Math.round(deltaY / 40);
  //   const newHeight = Math.max(
  //     minHeight,
  //     Math.min(maxHeight, startHeight.current + deltaHeight)
  //   );
  //   setHeight(newHeight);
  // };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const increaseHeight = () => {
    setHeight((prev) => prev + 1);
    setDisplayHeights([height - 1, height, height + 1]);
  };

  const decreaseHeight = () => {
    setHeight((prev) => prev - 1);
    setDisplayHeights([height - 1, height, height + 1]);
  };

  return (
    <div className="w-full max-w-xs mx-auto bg-gradient-to-br from-purple-50 to-indigo-100 shadow-xl">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800">
          Select Your Height
        </h2>

        <div className="flex flex-col items-center">
          <Button
            variant="icon"
            onClick={() => increaseHeight()}
            aria-label="Increase height"
          >
            <ArrowUpward className="size-6" />
          </Button>

          <div
            ref={sliderRef}
            className="h-40 overflow-hidden relative cursor-ns-resize"
            // onMouseDown={handleMouseDown}
            // onMouseMove={handleMouseMove}
            // onMouseUp={handleMouseUp}
            // onMouseLeave={handleMouseUp}
          >
            {displayHeights.reverse().map((cm) => (
              <div
                key={cm}
                className={`h-10 flex items-center justify-center text-indigo-800 transition-all duration-200 ${
                  cm == height
                    ? "font-bold text-xl border border-grape px-8 rounded"
                    : ""
                }`}
              >
                {cm} cm
              </div>
            ))}
          </div>

          <Button
            variant="icon"
            onClick={() => decreaseHeight()}
            aria-label="Decrease height"
          >
            <ArrowDownward className="size-6" />
          </Button>
        </div>

        <div className="flex space-between gap-2 m-2 mt-4">
          <Button onClick={() => onSubmit({ height: height.toString() })}>
            Continue
          </Button>

          <Button
            variant="outline"
            className="border border-chocolate"
            onClick={() => onSubmit({ height: "" })}
          >
            Skip for now
          </Button>
        </div>
      </div>

      <p>Height = {height}</p>
    </div>
  );
}
