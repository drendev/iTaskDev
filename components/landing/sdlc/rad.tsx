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

const RAD: React.FC<SDLCProps> = ({ changeSlide }) => {
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
              RAD
            </motion.div>

            <Image
              src="/sdlc/rad.png"
              alt="rad"
              width={1000}
              height={1000}
              className="w-[600px] mt-10 object-cover mx-auto"
            />

            <p className="mt-10 text-justify">
              The RAD model or Rapid Application Development model is a type of
              software development methodology that emphasizes quick and
              iterative release cycles, primarily focusing on delivering working
              software in shorter timelines. Unlike traditional models such as
              the Waterfall model, RAD is designed to be more flexible and
              responsive to user feedback and changing requirements throughout
              the development process.
            </p>

            <h1 className="mt-10 text-2xl font-semibold">RAD SDLC Phases</h1>

            <h1 className="mt-10 text-xl font-semibold">
              {" "}
              Requirements Planning
            </h1>

            <p className="mt-10 text-justify">
              This involves the use of various techniques used in requirements
              elicitation like brainstorming, task analysis, form analysis, user
              scenarios, FAST (Facilitated Application Development Technique),
              etc. It also consists of the entire structured plan describing the
              critical data, methods to obtain it, and then processing it to
              form a final refined model.
            </p>

            <h1 className="mt-10 text-xl font-semibold">User Description</h1>

            <p className="mt-10 text-justify">
              This phase consists of taking user feedback and building the
              prototype using developer tools. In other words, it includes
              re-examination and validation of the data collected in the first
              phase. The dataset attributes are also identified and elucidated
              in this phase.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Construction</h1>

            <p className="mt-10 text-justify">
              In this phase, refinement of the prototype and delivery takes
              place. It includes the actual use of powerful automated tools to
              transform processes and data models into the final working
              product. All the required modifications and enhancements are to be
              done in this phase.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Cutover</h1>

            <p className="mt-10 text-justify">
              All the interfaces between the independent modules developed by
              separate teams have to be tested properly. The use of powerfully
              automated tools and subparts makes testing easier. This is
              followed by acceptance testing by the user.
            </p>

            <Separator className="mt-10" />

            <h1 className="text-lg text-gray-800 mt-5">References</h1>
            <Link
              href="https://www.geeksforgeeks.org/software-engineering-rapid-application-development-model-rad/"
              className="text-gray-500 text-sm mb-5"
            >
              Rapid Application Development Model (RAD) – Software Engineering
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
                onClick={() => handleLinkClick("iterative")}
                className="w-[100px] bg-teal-500 hover:bg-teal-800"
              >
                Iterative
              </Button>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RAD;
