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

const Waterfall: React.FC<SDLCProps> = ({ changeSlide }) => {
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
              Waterfall
            </motion.div>

            <Image
              src="/sdlc/waterfall.png"
              alt="waterfall"
              width={1000}
              height={1000}
              className="w-96 mt-10 object-cover mx-auto"
            />

            <p className="mt-10 text-justify">
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
            </p>

            <h1 className="mt-10 text-2xl font-semibold">
              Different Stages of SDLC Waterfall Model
            </h1>

            <p className="mt-10 text-justify">
              Your project goes through all phases of the waterfall model.
              Deliverables from one phase feed to the next stage. So, we can’t
              move on to the next stage before the previous one has been
              completed.
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Stage 1: Requirement Analysis
            </h1>
            <p className="mt-10 text-justify">
              Our team captures all your requirements. We brainstorm and analyze
              these requirements to ensure that the project is testable and
              feasible or not. Outcomes of the analysis phase should be the
              requirements understanding document (RUD).
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Stage 2: System Design
            </h1>
            <p className="mt-10 text-justify">
              Senior project members and architects create the design and figure
              out the hardware/software requirements. Finally, our team
              documents the entire design for the project. The architect creates
              a high-level design document (HLD) and a low-level design document
              (LLD) for the next phase.
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Stage 3: Implementation (Coding Phase)
            </h1>
            <p className="mt-10 text-justify">
              Coding Code Website Development Html Programming As per HLD and
              LLD documents, programmers write the software code making sure
              that all requirements are laid out. At this stage, testers perform
              unit testing of the code. Deliverables include coded programs and
              unit test cases with results.
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Stage 4: System Testing
            </h1>
            <p className="mt-10 text-justify">
              In this phase, our testing team tests the software to confirm if
              the system meets all specifications provided by the client.
              Testers identify and report issues and bugs within the
              application.
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Stage 5: Software Deployment
            </h1>
            <p className="mt-10 text-justify">
              We make sure that everything is ready, and then, we deploy the
              prepared system into the respective environment. The client
              receives the final product and ensures that it fulfills all
              requirements laid out in the beginning. This stage results in a
              user manual for the client.
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Stage 6: Maintenance
            </h1>
            <p className="mt-10 mb-10 text-justify">
              If clients face any bug or defect using the software, we fix all
              issues and deploy the updated code in the respective environment.
              We can always enhance the application to incorporate new features
              so that the system can scale with your growing business.
            </p>

            <Separator />

            <h1 className="text-lg text-gray-800 mt-5">References</h1>
            <Link
              href="https://www.tutorialspoint.com/sdlc/sdlc_waterfall_model.htm"
              className="text-gray-500 text-sm"
            >
              SDLC - Waterfall Model
            </Link>
            <Link
              href="https://symphony-software.com/waterfall-sdlc-pros-cons-best-use-cases/"
              className="text-gray-500 text-sm mb-5"
            >
              What is Waterfall SDLC: Pros, Cons and Best Use Cases in Software
              Development
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
              <div></div>
              <Button
                onClick={() => handleLinkClick("scrum")}
                className="w-[100px] bg-[#2563eb] hover:bg-[#1e40af]"
              >
                Scrum
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Waterfall;
