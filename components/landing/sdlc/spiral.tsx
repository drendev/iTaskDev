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

const Spiral: React.FC<SDLCProps> = ({ changeSlide }) => {
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
              Spiral
            </motion.div>

            <Image
              src="/sdlc/spiral.png"
              alt="spiral"
              width={1000}
              height={1000}
              className="w-[600px] mt-10 object-cover mx-auto"
            />

            <p className="mt-10 text-justify">
              The Spiral Model is one of the most important Software Development
              Life Cycle models. The Spiral Model is a combination of the
              waterfall model and the iterative model. It provides support for
              Risk Handling. The Spiral Model was first proposed by Barry Boehm.
              This article focuses on discussing the Spiral Model in detail.
            </p>

            <p className="mt-10 text-justify">
              The Spiral Model is a Software Development Life Cycle (SDLC) model
              that provides a systematic and iterative approach to software
              development. In its diagrammatic representation, looks like a
              spiral with many loops. The exact number of loops of the spiral is
              unknown and can vary from project to project. Each loop of the
              spiral is called a phase of the software development process.
            </p>

            <h1 className="mt-10 text-2xl font-semibold">
              What Are the Phases of the Spiral Model?
            </h1>

            <p className="mt-10 text-justify">
              The Spiral Model is a risk-driven model, meaning that the focus is
              on managing risk through multiple iterations of the software
              development process. It consists of the following phases:
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Step 1 - Objectives Defined:
            </h1>

            <p className="mt-10 text-justify">
              In first phase of the spiral model we clarify what the project
              aims to achieve, including functional and non-functional
              requirements.
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Step 2 - Risk Analysis:
            </h1>

            <p className="mt-10 text-justify">
              In the risk analysis phase, the risks associated with the project
              are identified and evaluated.
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Step 3 - Engineering:
            </h1>

            <p className="mt-10 text-justify">
              In the engineering phase, the software is developed based on the
              requirements gathered in the previous iteration.
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Step 4 - Evaluation:
            </h1>

            <p className="mt-10 text-justify">
              In the evaluation phase, the software is evaluated to determine if
              it meets the customer’s requirements and if it is of high quality.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Step 5 - Planning:</h1>

            <p className="mt-10 text-justify">
              The next iteration of the spiral begins with a new planning phase,
              based on the results of the evaluation.
            </p>

            <Separator className="mt-10" />

            <h1 className="text-lg text-gray-800 mt-5">References</h1>
            <Link
              href="https://www.geeksforgeeks.org/software-engineering-spiral-model/"
              className="text-gray-500 text-sm mb-5"
            >
              What is Spiral Model in Software Engineering?
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
                onClick={() => handleLinkClick("kanban")}
                className="w-[100px] bg-rose-500 hover:bg-rose-800"
              >
                Kanban
              </Button>
              <Button
                onClick={() => handleLinkClick("vshape")}
                className="w-[100px] bg-rose-500 hover:bg-rose-800"
              >
                V-Shape
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Spiral;
