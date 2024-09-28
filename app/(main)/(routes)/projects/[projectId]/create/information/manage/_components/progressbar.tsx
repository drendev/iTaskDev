"use client";

import { Progress } from "@/components/ui/progress";
import { Protest_Guerrilla } from "next/font/google";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface ProgressBarProps {
  progress: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const [prog, setProg] = useState<number>(16.6);
  const [bgColor, setBgColor] = useState<string>("bg-black");
  useEffect(() => {
    setBgColor(color);
    setProg(progress);
    console.log(bgColor);
    console.log(prog);
  }, []);

  return (
    <div className="flex flex-col">
      {isSmallScreen ? (
        <div className="flex">
          <span className="text-xs basis-2/12">Step 1</span>
          <span
            className={`text-xs basis-2/12 w-[200px ${
              prog > 32 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 2
          </span>
          <span
            className={`text-xs basis-2/12 w-[200px ${
              prog > 48 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 3
          </span>
          <span
            className={`text-xs basis-2/12 w-[200px ${
              prog > 64 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 4
          </span>
          <span
            className={`text-xs basis-2/12 w-[200px ${
              prog > 80 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 5
          </span>
          <span
            className={`text-xs basis-2/12 w-[200px ${
              prog > 96 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 6
          </span>
        </div>
      ) : (
        <div className="flex">
          <span className="text-xs basis-2/12">Step 1: Project details</span>
          <span
            className={`text-xs basis-2/12 w-[200px ${
              prog > 32 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 2: Get your SDLC
          </span>
          <span
            className={`text-xs basis-2/12 w-[200px ${
              prog > 48 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 3: Add initial tasks
          </span>
          <span
            className={`text-xs basis-2/12 w-[200px ${
              prog > 64 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 4: Tasks intensity
          </span>
          <span
            className={`text-xs basis-2/12 w-[200px ${
              prog > 80 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 5: Manage members
          </span>
          <span
            className={`text-xs basis-2/12 w-[200px ${
              prog > 96 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 6: Tasks assignment
          </span>
        </div>
      )}

      <Progress value={prog} className={`w-full my-10 [&>*]:${bgColor}`} />
    </div>
  );
};

export default ProgressBar;
