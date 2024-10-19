import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface SDLCProps {
  changeSlide: (activeSlide: string) => void;
}

const Kanban: React.FC<SDLCProps> = ({ changeSlide }) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
  const [loaded1, setLoaded1] = useState<boolean>(false);
  const [loaded2, setLoaded2] = useState<boolean>(false);
  const [loaded3, setLoaded3] = useState<boolean>(false);
  const [sdlcLoaded, setSdlcLoaded] = useState<boolean>(false);

  // Change Image
  const [active, setActive] = React.useState<number>(0);

  const handleLinkClick = (activeSlide: string) => {
    changeSlide(activeSlide);
  };
  const demoImages = [
    <Image
      src="/samples/demo1.jpg"
      alt="iso1"
      key={0}
      width={500}
      height={500}
      className={`object-cover w-full border rounded-xl shadow-md ${
        loaded1 ? "block" : "opacity-0 absolute"
      }`}
      onLoad={() => setLoaded1(true)}
    />,
    <Image
      src="/samples/demo2.jpg"
      alt="iso2"
      key={1}
      width={500}
      height={500}
      className={`object-cover w-full border rounded-xl shadow-md ${
        loaded2 ? "block" : "opacity-0 absolute"
      }`}
      onLoad={() => setLoaded2(true)}
    />,
    <Image
      src="/samples/demo3.jpg"
      alt="iso2"
      key={2}
      width={500}
      height={500}
      className={`object-cover w-full border rounded-xl shadow-md ${
        loaded3 ? "block" : "opacity-0 absolute"
      }`}
      onLoad={() => setLoaded3(true)}
    />,
  ];

  const changeActive = (activeNumber: number): void => {
    setActive(activeNumber);
  };

  return (
    <>
      <div className="items-center flex flex-col mt-10">
        <div
          className="md:flex px-10 md:w-[90%] md:px-0 lg:w-3/4
  2xl:w-[55%]"
        >
          <div className="flex flex-col md:flex w-full">
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
              }}
              className="text-6xl flex items-center justify-center"
            >
              Kanban
            </motion.div>

            <Image
              src="/sdlc/kanban.png"
              alt="kanban"
              width={1000}
              height={1000}
              className="w-[600px] mt-10 object-cover mx-auto"
            />

            <p className="mt-10 text-justify">
              Kanban is a popular Agile Software Development Methodology. It is
              a signaling device that instructs the moving of parts in a ‘pull’
              production system, developed as part of the TPS (Toyota Production
              System). Kanban is about envisioning the existing workflow in
              terms of steps. These steps can be created on the whiteboard.
            </p>

            <h1 className="mt-10 text-2xl font-semibold">
              Steps of Kanban Approach
            </h1>

            <p className="mt-10 text-justify">
              The Kanban approach involves three steps:
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Step 1. Visualize:{" "}
              <span className="font-normal">
                This step involves defining and visualizing the workflow.
              </span>
            </h1>
            <ul className="max-w-md space-y-1  list-disc list-inside mt-10">
              <li>Understand the need for improvement.</li>
              <li>Define the process.</li>
              <li>Value stream entire process flow.</li>
              <li>Visualize process flow.</li>
            </ul>

            <h1 className="mt-10 text-xl font-semibold">
              Step 2. Quantify:{" "}
              <span className="font-normal">
                This step involves three activities:
              </span>
            </h1>

            <ul className="space-y-4 list-decimal list-inside mt-10">
              <li>
                Startup:
                <ol className="ps-5 mt-2 space-y-1 list-disc list-inside">
                  <li>Understand and/ or estimate WIP.</li>
                  <li>Create initial WIP limits.</li>
                </ol>
              </li>
              <li>
                Adjust:
                <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                  <li>Study the feasibility of WIP limits.</li>
                  <li>Adjust the limits if required.</li>
                  <li>Develop statements on the limits and policies.</li>
                  <li>Train the team on a pilot basis.</li>
                </ul>
              </li>
              <li>
                Measure:
                <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                  <li>Define current problems.</li>
                  <li>Convert them to measurements.</li>
                  <li>Derive metrics.</li>
                  <li>Establish a metrics collection system.</li>
                  <li>Define the tools used to analyze metrics and data.</li>
                </ul>
              </li>
            </ul>

            <h1 className="mt-10 text-xl font-semibold">
              Step 3. Optimize:
              <span className="font-normal">
                This step involves the following three activities:
              </span>
            </h1>

            <ul className="space-y-4 list-decimal list-inside mt-10">
              <li>
                Identify and Improve:
                <ol className="ps-5 mt-2 space-y-1 list-disc list-inside">
                  <li>Analyze data.</li>
                  <li>Establish future value stream.</li>
                  <li>Identify improvement opportunities.</li>
                  <li>Prioritize.</li>
                  <li>Develop action plans.</li>
                  <li>Implement action plans.</li>
                  <li>Ensure improvement.</li>
                </ol>
              </li>
              <li>
                Establish standards:
                <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                  <li>Revisit limits and policies.</li>
                  <li>Train the team.</li>
                  <li>Implement a new process.</li>
                </ul>
              </li>
              <li>
                Envision for continuous improvement:
                <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                  <li>
                    Set up the system to continuously monitor and improve
                    processes.
                  </li>
                  <li>
                    Make the process, process-driven rather people-driven.
                  </li>
                </ul>
              </li>
            </ul>

            <Separator className="mt-10" />

            <h1 className="text-lg text-gray-800 mt-5">References</h1>
            <Link
              href="https://www.geeksforgeeks.org/kanban-agile-methodology/"
              className="text-gray-500 text-sm mb-5"
            >
              Kanban – Agile Methodology
            </Link>

            <Separator />
          </div>
        </div>
        <div
          className="md:flex px-10 md:w-[90%] md:px-0 lg:w-3/4
  2xl:w-[55%]"
        >
          <div className="flex flex-col md:flex items-center justify-center w-full">
            <div className="flex justify-between my-10 w-full">
              <Button
                onClick={() => handleLinkClick("scrum")}
                className="w-[100px] bg-cyan-500 hover:bg-cyan-800"
              >
                Scrum
              </Button>
              <Button
                onClick={() => handleLinkClick("spiral")}
                className="w-[100px] bg-cyan-500 hover:bg-cyan-800"
              >
                Spiral
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Kanban;
