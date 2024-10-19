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

const DevOps: React.FC<SDLCProps> = ({ changeSlide }) => {
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
              DevOps
            </motion.div>

            <Image
              src="/sdlc/devops.png"
              alt="devops"
              width={1000}
              height={1000}
              className="w-[600px] mt-10 object-cover mx-auto"
            />

            <p className="mt-10 text-justify">
              DevOps is a software development process that emphasises developer
              and operations team communication. It promotes timely feedback,
              which expedites the identification of any flaws or problems during
              the development process. This makes it an ideal strategy for
              large-scale endeavours.
            </p>

            <h1 className="mt-10 text-2xl font-semibold">
              What are the Different Phases of the DevOps lifecycle
            </h1>

            <h1 className="mt-10 text-xl font-semibold">Plan</h1>

            <p className="mt-10 text-justify">
              The planning phase is exactly what it sounds like: planning the
              project’s lifecycle. In contrast to conventional methods to the
              development lifecycle, this model assumes that each stage will be
              repeated as necessary. In this manner, the DevOps workflow is
              planned with the likelihood of future iterations and likely prior
              versions in mind.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Code</h1>

            <p className="mt-10 text-justify">
              The developers will write the code and prepare it for the next
              phase during the coding stage. Developers will write code in
              accordance with the specifications outlined in the planning phase
              and will ensure that the code is created with the project’s
              operations in mind.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Build</h1>

            <p className="mt-10 text-justify">
              Code will be introduced to the project during the construction
              phase, and if necessary, the project will be rebuilt to
              accommodate the new code. This can be accomplished in a variety of
              ways, although GitHub or a comparable version control site is
              frequently used.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Test</h1>

            <p className="mt-10 text-justify">
              Throughout the testing phase, teams will do any necessary testing
              to ensure the project performs as planned. Teams will also test
              for edge and corner case issues at this stage. An “edge case” is a
              bug or issue that only manifests during an extreme operating
              event, whereas a “corner case” occurs when many circumstances are
              met.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Release</h1>

            <p className="mt-10 text-justify">
              The release phase occurs when the code has been verified as ready
              for deployment and a last check for production readiness has been
              performed. The project will subsequently enter the deployment
              phase if it satisfies all requirements and has been thoroughly
              inspected for bugs and other problems.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Deploy</h1>

            <p className="mt-10 text-justify">
              In the deploy phase, the project is prepared for the production
              environment and is operating as planned in that environment. This
              would be the responsibility of the operations team; in DevOps, it
              is a shared responsibility. This shared duty pushes team members
              to collaborate to guarantee a successful deployment.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Operate</h1>

            <p className="mt-10 text-justify">
              In the operating phase, teams test the project in a production
              environment, and end users utilise the product. This crucial stage
              is by no means the final step. Rather, it informs future
              development cycles and manages the configuration of the production
              environment and the implementation of any runtime requirements.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Monitor </h1>

            <p className="mt-10 text-justify">
              During the monitoring phase, product usage, as well as any
              feedback, issues, or possibilities for improvement, are recognized
              and documented. This information is then conveyed to the
              subsequent iteration to aid in the development process. This phase
              is essential for planning the next iteration and streamlines the
              pipeline’s development process.
            </p>

            <Separator className="mt-10" />

            <h1 className="text-lg text-gray-800 mt-5">References</h1>
            <Link
              href="https://www.browserstack.com/guide/devops-lifecycle"
              className="text-gray-500 text-sm mb-5"
            >
              DevOps Lifecycle : Different Phases in DevOps
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
                onClick={() => handleLinkClick("lean")}
                className="w-[100px] bg-fuchsia-500 hover:bg-fuchsia-800"
              >
                Lean
              </Button>
              <Button
                onClick={() => handleLinkClick("iterative")}
                className="w-[100px] bg-fuchsia-500 hover:bg-fuchsia-800"
              >
                Iterative
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DevOps;
