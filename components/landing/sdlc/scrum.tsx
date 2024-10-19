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

const Scrum: React.FC<SDLCProps> = ({ changeSlide }) => {
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
              Scrum
            </motion.div>

            <Image
              src="/sdlc/scrum.png"
              alt="scrum"
              width={1000}
              height={1000}
              className="w-[600px] mt-10 object-cover mx-auto"
            />

            <p className="mt-10 text-justify">
              Scrum is an Agile framework for managing and organizing work on
              complex projects, primarily used for software development but
              applicable to various fields. It was originally formalized for
              software development projects in the early 1990’s and has since
              gained widespread adoption in various industries.
            </p>

            <h1 className="mt-10 text-2xl font-semibold">
              How Scrum Model Works?
            </h1>

            <p className="mt-10 text-justify">
              Scrum model in SDLC follows a structured approach to software
              development that involves the following steps:
            </p>

            <h1 className="mt-10 text-xl font-semibold">Product Backlog:</h1>
            <p className="mt-10 text-justify">
              The Product Backlog is a prioritized list of features, user
              stories, enhancements, and bug fixes that need to be addressed in
              the product. It is managed by the Product Owner and serves as the
              source of work for the Development Team.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Planning Sprint:</h1>
            <p className="mt-10 text-justify">
              Sprint Planning is a key event at the beginning of each sprint.
              During this meeting, the Scrum Team, including the Product Owner,
              Scrum Master, and Development Team, collaboratively selects items
              from the Product Backlog to work on during the upcoming sprint.
              The team defines the Sprint Goal and creates the Sprint Backlog,
              detailing the tasks required to complete the selected items.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Sprint Meeting:</h1>
            <p className="mt-10 text-justify">
              The Sprint Meeting, often referred to as the Daily Scrum or Daily
              Stand-up, is a brief daily meeting where team members provide
              updates on their progress, discuss what they plan to work on next,
              and highlight any impediments. The goal is to synchronize the
              team’s activities and ensure everyone is on the same page.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Sprint Review:</h1>
            <p className="mt-10 text-justify">
              The Sprint Review is held at the end of each sprint. The Scrum
              Team, stakeholders, and the Product Owner come together to review
              the completed work. The Development Team demonstrates the product
              increment, and stakeholders provide feedback. This session informs
              future planning and adjustments to the Product Backlog.
            </p>

            <h1 className="mt-10 text-xl font-semibold">
              Sprint retrospective:
            </h1>
            <p className="mt-10 text-justify">
              The Sprint Retrospective occurs after the Sprint Review and
              involves the Scrum Team reflecting on the previous sprint. The
              team discusses what went well, what could be improved, and any
              action items for enhancing their processes. The focus is on
              continuous improvement.
            </p>

            <h1 className="mt-10 text-xl font-semibold">Repeat:</h1>
            <p className="mt-10 mb-10 text-justify">
              After the Sprint Retrospective, the cycle repeats with a new
              Sprint Planning meeting, followed by another sprint of
              development, daily stand-ups, Sprint Review, and Sprint
              Retrospective. This iterative process continues throughout the
              project, allowing the team to adapt to changing requirements,
              continuously improve, and deliver increments of the product at the
              end of each sprint.
            </p>

            <Separator />

            <h1 className="text-lg text-gray-800 mt-5">References</h1>
            <Link
              href="https://www.geeksforgeeks.org/scrum-development-model-in-sdlc/"
              className="text-gray-500 text-sm mb-5"
            >
              Scrum Development Model in SDLC
            </Link>

            <Separator />
          </div>
        </div>

        <div
          className="md:flex px-10 md:w-[90%] md:px-0 lg:w-3/4
  2xl:w-[55%]"
        >
          <div className="flex flex-col md:flex items-center w-full">
            <div className="flex justify-between my-10 w-full">
              <Button
                onClick={() => handleLinkClick("waterfall")}
                className="w-[100px] bg-amber-500 hover:bg-amber-800"
              >
                Waterfall
              </Button>
              <Button
                onClick={() => handleLinkClick("kanban")}
                className="w-[100px] bg-amber-500 hover:bg-amber-800"
              >
                Kanban
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Scrum;
