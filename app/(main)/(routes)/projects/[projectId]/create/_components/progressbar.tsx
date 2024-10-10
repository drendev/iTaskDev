"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const [prog, setProg] = useState<number>(25);
  useEffect(() => {
    setProg(progress);
  }, [progress]);

  return (
    <div className="flex flex-col">
      {isSmallScreen ? (
        <div className="flex">
          <span className="text-xs basis-1/4">Step 1</span>
          <span
            className={`text-xs basis-1/4 w-[200px ${
              prog > 25 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 2
          </span>
          <span
            className={`text-xs basis-1/4 w-[200px ${
              prog > 50 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 3
          </span>
          <span
            className={`text-xs basis-2/12 w-[200px ${
              prog > 75 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 4
          </span>
        </div>
      ) : (
        <div className="flex">
          <span className="text-xs basis-1/4">Step 1: Project details</span>
          <span
            className={`text-xs basis-1/4 w-[200px ${
              prog > 25 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 2: Get your SDLC
          </span>
          <span
            className={`text-xs basis-1/4 w-[200px ${
              prog > 50 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 3: Manage Members
          </span>
          <span
            className={`text-xs basis-1/4 w-[200px ${
              prog > 75 ? "text-black" : "text-gray-400"
            }`}
          >
            Step 4: Github Repository
          </span>
        </div>
      )}

      <Progress value={prog} className={`w-full my-10 `} />
    </div>
  );
};

export default ProgressBar;
