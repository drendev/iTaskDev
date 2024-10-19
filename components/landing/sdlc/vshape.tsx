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

const VShape: React.FC<SDLCProps> = ({ changeSlide }) => {
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
              V-Shape
            </motion.div>

            <Image
              src="/sdlc/vshape.png"
              alt="vshape"
              width={1000}
              height={1000}
              className="w-[600px] mt-10 object-cover mx-auto"
            />

            <p className="mt-10 text-justify">
              The V-model is a type of SDLC model where the process executes
              sequentially in a V-shape. It is also known as the Verification
              and Validation model. It is based on the association of a testing
              phase for each corresponding development stage. The development of
              each step is directly associated with the testing phase. The next
              phase starts only after completion of the previous phase i.e., for
              each development activity, there is a testing activity
              corresponding to it.
            </p>

            <h1 className="mt-10 text-2xl font-semibold">V-Model Design</h1>

            <h1 className="mt-10 text-xl font-semibold">
              Step 1 - Requirements Gathering and Analysis:
            </h1>

            <p className="mt-10 text-justify">
              The first phase of the V-Model is the requirements gathering and
              analysis phase, where the customer’s requirements for the software
              are gathered and analyzed to determine the scope of the project.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Step 2 - Design:</h1>

            <p className="mt-10 text-justify">
              In the design phase, the software architecture and design are
              developed, including the high-level design and detailed design.
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Step 3 - Implementation:
            </h1>

            <p className="mt-10 text-justify">
              In the implementation phase, the software is built based on the
              design.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Step 4 - Testing:</h1>

            <p className="mt-10 text-justify">
              In the testing phase, the software is tested to ensure that it
              meets the customer’s requirements and is of high quality.
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Step 5 - Deployment:
            </h1>

            <p className="mt-10 text-justify">
              In the deployment phase, the software is deployed and put into
              use.
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Step 6 - Maintenance:
            </h1>

            <p className="mt-10 text-justify">
              In the maintenance phase, the software is maintained to ensure
              that it continues to meet the customer’s needs and expectations.
            </p>

            <Separator className="mt-10" />

            <h1 className="text-lg text-gray-800 mt-5">References</h1>
            <Link
              href="https://www.geeksforgeeks.org/software-engineering-sdlc-v-model/"
              className="text-gray-500 text-sm mb-5"
            >
              SDLC V-Model – Software Engineering
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
                onClick={() => handleLinkClick("spiral")}
                className="w-[100px] bg-pink-500 hover:bg-pink-800"
              >
                Spiral
              </Button>
              <Button
                onClick={() => handleLinkClick("lean")}
                className="w-[100px] bg-pink-500 hover:bg-pink-800"
              >
                Lean
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VShape;
