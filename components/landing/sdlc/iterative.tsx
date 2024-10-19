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

const Iterative: React.FC<SDLCProps> = ({ changeSlide }) => {
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
              Iterative
            </motion.div>

            <Image
              src="/sdlc/iterative.png"
              alt="iterative"
              width={1000}
              height={1000}
              className="w-[600px] mt-10 object-cover mx-auto"
            />

            <p className="mt-10 text-justify">
              The iterative model is a software development life cycle (SDLC)
              approach in which initial development work is carried out based on
              well-stated basic requirements, and successive enhancements are
              added to this base piece of software through iterations until the
              final system is built. We get a working piece of software very
              early in the lifecycle because the iterative model begins with a
              simple execution of a small collection of software requirements,
              which iteratively improves the evolving variants until the entire
              system is executed and ready to be redistributed. Every Iterative
              model release is created over a certain and predetermined time
              period known as iteration. Bugs and errors from the previous
              iteration do not propagate to the next iteration, and this model
              is flexible enough to incorporate customer feedback in every
              iteration.
            </p>

            <h1 className="mt-10 text-2xl font-semibold">
              Phases of Iterative Model
            </h1>

            <h1 className="mt-10 text-xl font-semibold">
              {" "}
              Requirement Gathering & Analysis
            </h1>

            <p className="mt-10 text-justify">
              The business requirements are gathered during this phase of the
              iterative model. Then, an analyst determines whether they can be
              met within the financial constraints. This phase details the
              business needs, and system information (hardware or software) is
              acquired and assessed for viability.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Design</h1>

            <p className="mt-10 text-justify">
              During this phase of the iterative model, the project team
              receives the complete list of criteria for starting work in a
              specific direction. Then, they use various diagrams, like a data
              flow diagram, class diagram, activity diagram, state transition
              diagram, and so on, to gain explicit knowledge of the program
              design and to help them progress with development. Based on their
              investigation, developers provide viable solutions. Furthermore,
              the project's scale and criticality are crucial factors in
              deciding the complexity of the design for the project.s
            </p>

            <h1 className="mt-10 text-xl font-semibold">Implementation</h1>

            <p className="mt-10 text-justify">
              At this point in the project, according to the iterative model,
              the actual coding of the system begins. This stage will be
              influenced by the Design Stage's analysis and design. All needs,
              planning, and design plans have been carried out. The chosen
              design will be implemented by the developer using predefined
              coding and metrics standards. They must implement a unit test at
              each stage of code development and should strive to produce a
              fully functional, testable system for that iteration. The
              complexity of work and time spent on this iteration will vary
              depending on the project.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Testing</h1>

            <p className="mt-10 text-justify">
              This stage entails comparing the current build iteration to a set
              of rules and norms to determine whether or not it fits them. This
              sort of testing includes performance testing, stress testing,
              security testing, requirements testing, usability testing,
              multi-site testing, disaster recovery testing, and so on. The
              tester can create new test cases or reuse those from previous
              releases, but testing is a key priority because any failures would
              affect the software's specification, affecting the business. We
              can also check in with the project stakeholders to perform some
              tests and get their input. A developer or tester must guarantee
              that correcting one bug does not result in the appearance of new
              bugs in the system.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Deployment</h1>

            <p className="mt-10 text-justify">
              After completing all the phases, the software is deployed to its
              work environment.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Review</h1>

            <p className="mt-10 text-justify">
              In this phase, after the product deployment, we check the behavior
              and validity of the deployed product. And if any errors are found,
              the process starts again from requirement gathering.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Maintenance</h1>

            <p className="mt-10 text-justify">
              In the maintenance phase, after software deployment in the working
              environment, there may be some bug fixes or new updates required.
            </p>

            <Separator className="mt-10" />

            <h1 className="text-lg text-gray-800 mt-5">References</h1>
            <Link
              href="https://www.scaler.com/topics/software-engineering/iterative-model-in-software-engineering/"
              className="text-gray-500 text-sm mb-5"
            >
              SDLC - Iterative Model
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
                onClick={() => handleLinkClick("devops")}
                className="w-[100px] bg-lime-500 hover:bg-lime-800"
              >
                DevOps
              </Button>
              <Button
                onClick={() => handleLinkClick("rad")}
                className="w-[100px] bg-lime-500 hover:bg-lime-800"
              >
                RAD
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Iterative;
