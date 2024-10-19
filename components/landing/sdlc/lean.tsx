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

const Lean: React.FC<SDLCProps> = ({ changeSlide }) => {
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
              Lean
            </motion.div>

            <Image
              src="/sdlc/lean.png"
              alt="lean"
              width={1000}
              height={1000}
              className="w-[600px] mt-10 object-cover mx-auto"
            />

            <p className="mt-10 text-justify">
              Lean Software Development (LSD) is an agile framework used to
              streamline and optimize the software development process. It may
              also be referred to as the Minimum Viable Product (MVP) strategy
              as these ways of thinking are very similar since both intend to
              speed up development by focusing on new deliverables.
            </p>

            <h1 className="mt-10 text-2xl font-semibold">LSD Process</h1>

            <h1 className="mt-10 text-xl font-semibold">Identify Value:</h1>

            <p className="mt-10 text-justify">
              Understand the customer values and focus on delivering features
              that meet these needs.
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Map the Value Stream:
            </h1>

            <p className="mt-10 text-justify">
              This involves mapping out the entire software development process
              to identify and eliminate wasteful activities that do not add
              value.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Create Flow:</h1>

            <p className="mt-10 text-justify">
              Ensure a smooth and continuous flow of work by minimizing delays
              and interruptions.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Establish Pull:</h1>

            <p className="mt-10 text-justify">
              Develop features based on customer demand rather than pushing
              features through the process.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Seek Perfection:</h1>

            <p className="mt-10 text-justify">
              Regularly review and refine the development process. Always
              encourage the team members to identify the areas of improvement
              and implement changes iteratively.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Build Quality In:</h1>

            <p className="mt-10 text-justify">
              Use practices such as test-driven development (TDD) and continuous
              integration to integrate quality assurance throughout the
              development process.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Empower Teams:</h1>

            <p className="mt-10 text-justify">
              Empower development teams by providing them with the necessary
              tools, resources, and autonomy to make decisions.
            </p>

            <Separator className="mt-10" />

            <h1 className="text-lg text-gray-800 mt-5">References</h1>
            <Link
              href="https://www.geeksforgeeks.org/lean-software-development-lsd/"
              className="text-gray-500 text-sm mb-5"
            >
              Lean Software Development (LSD)
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
                onClick={() => handleLinkClick("vshape")}
                className="w-[100px] bg-red-500 hover:bg-red-800"
              >
                V-Shape
              </Button>
              <Button
                onClick={() => handleLinkClick("devops")}
                className="w-[100px] bg-red-500 hover:bg-red-800"
              >
                DevOps
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lean;
