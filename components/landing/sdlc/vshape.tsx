import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

interface SDLCProps {
  changeSlide: (activeSlide: string) => void;
}

const VShape: React.FC<SDLCProps> = ({ changeSlide }) => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });
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
      className="w-full border rounded-xl shadow-md"
    />,
    <Image
      src="/samples/demo2.jpg"
      alt="iso2"
      key={1}
      width={500}
      height={500}
      className="w-full border rounded-xl shadow-md"
    />,
    <Image
      src="/samples/demo3.jpg"
      alt="iso2"
      key={2}
      width={500}
      height={500}
      className="w-full border rounded-xl shadow-md"
    />,
  ];

  // Change Image
  const [active, setActive] = React.useState<number>(0);

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
          <div className="flex flex-col md:flex items-center justify-center w-full">
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
              }}
              className="text-6xl"
            >
              V-Shape
            </motion.div>
            <Image
              src="/sdlc/vshape.png"
              alt="vshape"
              width={1000}
              height={1000}
              className="w-[500px] mt-10"
            />
            <div className="mt-10">
              The Waterfall Model was the first Process Model to be introduced.
              It is also referred to as a linear-sequential life cycle model. It
              is very simple to understand and use. In a waterfall model, each
              phase must be completed before the next phase can begin and there
              is no overlapping in the phases. The Waterfall model is the
              earliest SDLC approach that was used for software development. The
              waterfall Model illustrates the software development process in a
              linear sequential flow. This means that any phase in the
              development process begins only if the previous phase is complete.
              In this waterfall model, the phases do not overlap.
            </div>
          </div>
        </div>

        {isSmallScreen && (
          <div className="flex flex-col items-center justify-center">
            <div
              className="md:flex py-10 px-10 md:w-[90%] md:px-0 lg:w-3/4
2xl:w-[55%]"
            >
              <div className="md:flex items-center justify-center space-x-6 hover:cursor-pointer w-full">
                {demoImages[0]}
              </div>
            </div>

            <div className="flex flex-col w-52 text-center">
              <p className="text-sm">Building blocks</p>
              <div className="text-xs text-gray-400 mt-2">
                100+ content types to communicate any idea.
              </div>
            </div>

            <div
              className="md:flex py-10 px-10 md:w-[90%] md:px-0 lg:w-3/4
2xl:w-[55%]"
            >
              <div className="md:flex items-center justify-center space-x-6 hover:cursor-pointer w-full">
                {demoImages[1]}
              </div>
            </div>

            <div className="flex flex-col w-52 text-center">
              <p className="text-sm">Building blocks</p>
              <div className="text-xs text-gray-400 mt-2">
                100+ content types to communicate any idea.
              </div>
            </div>

            <div
              className="md:flex py-10 px-10 md:w-[90%] md:px-0 lg:w-3/4
2xl:w-[55%]"
            >
              <div className="md:flex items-center justify-center space-x-6 hover:cursor-pointer w-full">
                {demoImages[2]}
              </div>
            </div>

            <div className="flex flex-col w-52 text-center">
              <p className="text-sm">Building blocks</p>
              <div className="text-xs text-gray-400 mt-2">
                100+ content types to communicate any idea.
              </div>
            </div>
          </div>
        )}

        {!isSmallScreen && (
          <div
            className="md:flex py-10 px-8 md:w-[90%] md:px-0 lg:w-3/4
2xl:w-[55%]"
          >
            <div className="md:flex items-center justify-center space-x-6 hover:cursor-pointer w-full">
              {demoImages[active]}
            </div>
          </div>
        )}

        {!isSmallScreen && (
          <div className="flex space-x-5 mx-auto">
            <motion.div
              whileHover={{
                boxShadow: "1px 0px 21px 11px rgba(0, 0, 0, 0.17)",
              }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={() => changeActive(0)}
              className={`border-2 p-5 rounded-lg md:w-56 lg:w-60 xl:w-72
        
        
        ${active === 0 ? "border-blue-500 " : "border-gray-300"}`}
            >
              <p className="text-sm">Building blocks</p>
              <div className="text-xs text-gray-400 mt-2">
                100+ content types to communicate any idea.
              </div>
            </motion.div>

            <motion.div
              whileHover={{
                boxShadow: "1px 0px 21px 11px rgba(0, 0, 0, 0.17)",
              }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={() => changeActive(1)}
              className={`border-2 p-5 rounded-lg md:w-56 lg:w-60 xl:w-72
        
        
        ${active === 1 ? "border-blue-500 " : "border-gray-300"}`}
            >
              <p className="text-sm">Building blocks</p>
              <div className="text-xs text-gray-400 mt-2">
                100+ content types to communicate any idea.
              </div>
            </motion.div>

            <motion.div
              whileHover={{
                boxShadow: "1px 0px 21px 11px rgba(0, 0, 0, 0.17)",
              }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={() => changeActive(2)}
              className={`border-2 p-5 rounded-lg md:w-56 lg:w-60 xl:w-72
        
        
        ${active === 2 ? "border-blue-500 " : "border-gray-300"}`}
            >
              <p className="text-sm">Building blocks</p>
              <div className="text-xs text-gray-400 mt-2">
                100+ content types to communicate any idea.
              </div>
            </motion.div>
          </div>
        )}

        <div
          className="md:flex px-10 md:w-[90%] md:px-0 lg:w-3/4
  2xl:w-[55%]"
        >
          <div className="flex flex-col md:flex items-center justify-center w-full">
            <div className="mt-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
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
