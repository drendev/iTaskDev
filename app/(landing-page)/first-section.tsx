"use client";

import Image from "next/image";

import {
  PiLaptopLight,
  PiListChecks,
  PiNotebook,
  PiCode,
} from "react-icons/pi";

import { useMediaQuery } from "react-responsive";

const sections = [
  {
    tag: (
      <div className="bg-blue-200 flex items-center text-blue-800 gap-2 p-2 rounded-xl text-sm">
        <PiCode className="w-5 h-5" />
        Projects
      </div>
    ),
    header: (
      <div className="text-6xl">
        Plan your <br /> next endeavor.
      </div>
    ),
    description:
      "Capture ideas, gather feedback from teammates, and ask AI to add the finishing touches.",
    image: "/samples/iso1.png",
    fig1: (
      <div>
        <PiLaptopLight className="w-20 h-20" />
        <p className="text-sm">Building blocks</p>
        <div className="w-32 text-xs text-gray-400">
          100+ content types to communicate any idea.
        </div>
      </div>
    ),
    fig2: (
      <div>
        <PiListChecks className="w-20 h-20" />
        <p className="text-sm">Collaborative tools</p>
        <div className="w-32 text-xs text-gray-400">
          Built for teams to share, suggest, and comment.
        </div>
      </div>
    ),
    fig3: (
      <div>
        <PiNotebook className="w-20 h-20" />
        <p className="text-sm">AI-assisted</p>
        <div className="w-32 text-xs text-gray-400">
          Edit, draft, translate. Ask, and AI will answer.
        </div>
      </div>
    ),
  },
  {
    tag: (
      <div className="bg-blue-200 flex items-center text-blue-800 gap-2 p-2 rounded-xl text-sm">
        <PiCode className="w-5 h-5" />
        Projects
      </div>
    ),
    header: (
      <div className="text-6xl">
        Plan your <br /> next endeavor.
      </div>
    ),
    description:
      "Capture ideas, gather feedback from teammates, and ask AI to add the finishing touches.",
    image: "/samples/iso1.png",
    fig1: (
      <div>
        <PiLaptopLight className="w-20 h-20" />
        <p className="text-sm">Building blocks</p>
        <div className="w-32 text-xs text-gray-400">
          100+ content types to communicate any idea.
        </div>
      </div>
    ),
    fig2: (
      <div>
        <PiListChecks className="w-20 h-20" />
        <p className="text-sm">Collaborative tools</p>
        <div className="w-32 text-xs text-gray-400">
          Built for teams to share, suggest, and comment.
        </div>
      </div>
    ),
    fig3: (
      <div>
        <PiNotebook className="w-20 h-20" />
        <p className="text-sm">AI-assisted</p>
        <div className="w-32 text-xs text-gray-400">
          Edit, draft, translate. Ask, and AI will answer.
        </div>
      </div>
    ),
  },
];

const FirstSection = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      {isSmallScreen ? (
        sections.map((section) => (
          <div className="flex flex-col px-8">
            <div className="flex mt-20 mb-5">{section.tag}</div>
            {section.header}
            <div className="mt-3 text-gray-400 text-lg">
              {section.description}
            </div>
            <div
              className="py-10 lg:w-[80%]
        2xl:w-[55%]"
            >
              <div className="md:flex items-center justify-center space-x-6 hover:cursor-pointer w-full">
                <Image
                  src={section.image}
                  alt="image"
                  width={1000}
                  height={1000}
                  className="w-full border rounded-xl shadow-md"
                />
              </div>
            </div>
            {/* Three figures */}
            <div className="flex space-x-20 mx-auto h-56">
              {section.fig1}
              {section.fig2}
              {section.fig3}
            </div>
          </div>
        ))
      ) : (
        <div className="items-center flex flex-col mt-5">
          <div
            className="flex xl:space-x- items-center justify-between gap-4 py-10 px-8 lg:w-[80%]
        2xl:w-[55%]"
          >
            <div className="w-[50%]">
              <div className="flex mb-5">
                <div className="bg-blue-200 flex items-center text-blue-800 gap-2 p-2 rounded-xl text-sm">
                  <PiCode className="w-5 h-5" />
                  Projects
                </div>
              </div>
              <div className="text-6xl">
                Plan your <br />
                next endeavor.
              </div>
              <div className="mt-3 text-gray-400 text-lg">
                Capture ideas, gather feedback from teammates, and ask AI to add
                the finishing touches.
              </div>
            </div>

            <div className="flex space-x-5 mx-auto h-56">
              <div>
                <br></br>
                <br></br>
                <br></br>
                <PiLaptopLight className="w-20 h-20" />
                <p className="text-sm">Building blocks</p>
                <div className="w-32 text-xs text-gray-400">
                  100+ content types to communicate any idea.
                </div>
              </div>
              <div>
                <br></br>
                <br></br>
                <br></br>
                <PiListChecks className="w-20 h-20" />
                <p className="text-sm">Collaborative tools</p>
                <div className="w-32 text-xs text-gray-400">
                  Built for teams to share, suggest, and comment.
                </div>
              </div>
              <div>
                <br></br>
                <br></br>
                <br></br>
                <PiNotebook className="w-20 h-20" />
                <p className="text-sm">AI-assisted</p>
                <div className="w-32 text-xs text-gray-400">
                  Edit, draft, translate. Ask, and AI will answer.
                </div>
              </div>
            </div>
          </div>

          <div
            className="py-10 px-8 lg:w-[80%]
        2xl:w-[55%]"
          >
            <div className="md:flex items-center justify-center space-x-6 hover:cursor-pointer w-full">
              <Image
                src="/samples/iso1.png"
                alt="bueno"
                width={1000}
                height={1000}
                className="w-full border rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FirstSection;
