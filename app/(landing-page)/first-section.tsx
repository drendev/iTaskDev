"use client";

import Image from "next/image";

import {
  PiLaptopLight,
  PiListChecks,
  PiNotebook,
  PiCode,
  PiHeadset,
  PiCalendarDotsLight,
  PiSparkleLight,
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
    fig1img: <PiLaptopLight className="w-16 h-16 mr-5" />,
    fig1imglg: <PiLaptopLight className="w-20 h-20 mr-5" />,
    fig1title: "Building blocks",
    fig1desc: "100+ content types to communicate any idea.",
    fig2img: <PiLaptopLight className="w-16 h-16 mr-5" />,
    fig2imglg: <PiLaptopLight className="w-20 h-20 mr-5" />,
    fig2title: "Building blocks",
    fig2desc: "100+ content types to communicate any idea.",
    fig3img: <PiLaptopLight className="w-16 h-16 mr-5" />,
    fig3imglg: <PiLaptopLight className="w-20 h-20 mr-5" />,
    fig3title: "Building blocks",
    fig3desc: "100+ content types to communicate any idea.",
  },
  {
    tag: (
      <div className="bg-red-200 flex items-center text-red-800 gap-2 p-2 rounded-xl text-sm">
        <PiHeadset className="w-5 h-5" />
        Communication
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
    fig1img: <PiLaptopLight className="w-16 h-16 mr-5" />,
    fig1imglg: <PiLaptopLight className="w-20 h-20 mr-5" />,
    fig1title: "Building blocks",
    fig1desc: "100+ content types to communicate any idea.",
    fig2img: <PiLaptopLight className="w-16 h-16 mr-5" />,
    fig2imglg: <PiLaptopLight className="w-20 h-20 mr-5" />,
    fig2title: "Building blocks",
    fig2desc: "100+ content types to communicate any idea.",
    fig3img: <PiLaptopLight className="w-16 h-16 mr-5" />,
    fig3imglg: <PiLaptopLight className="w-20 h-20 mr-5" />,
    fig3title: "Building blocks",
    fig3desc: "100+ content types to communicate any idea.",
  },
  {
    tag: (
      <div className="bg-indigo-200 flex items-center text-indigo-800 gap-2 p-2 rounded-xl text-sm">
        <PiCalendarDotsLight className="w-5 h-5" />
        Calendar
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
    fig1img: <PiLaptopLight className="w-16 h-16 mr-5" />,
    fig1imglg: <PiLaptopLight className="w-20 h-20 mr-5" />,
    fig1title: "Building blocks",
    fig1desc: "100+ content types to communicate any idea.",
    fig2img: <PiLaptopLight className="w-16 h-16 mr-5" />,
    fig2imglg: <PiLaptopLight className="w-20 h-20 mr-5" />,
    fig2title: "Building blocks",
    fig2desc: "100+ content types to communicate any idea.",
    fig3img: <PiLaptopLight className="w-16 h-16 mr-5" />,
    fig3imglg: <PiLaptopLight className="w-20 h-20 mr-5" />,
    fig3title: "Building blocks",
    fig3desc: "100+ content types to communicate any idea.",
  },
  {
    tag: (
      <div className="bg-purple-200 flex items-center text-purple-800 gap-2 p-2 rounded-xl text-sm">
        <PiSparkleLight className="w-5 h-5" />
        AI
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
    fig1img: <PiLaptopLight className="w-16 h-16 mr-5" />,
    fig1imglg: <PiLaptopLight className="w-20 h-20 mr-5" />,
    fig1title: "Building blocks",
    fig1desc: "100+ content types to communicate any idea.",
    fig2img: <PiLaptopLight className="w-16 h-16 mr-5" />,
    fig2imglg: <PiLaptopLight className="w-20 h-20 mr-5" />,
    fig2title: "Building blocks",
    fig2desc: "100+ content types to communicate any idea.",
    fig3img: <PiLaptopLight className="w-16 h-16 mr-5" />,
    fig3imglg: <PiLaptopLight className="w-20 h-20 mr-5" />,
    fig3title: "Building blocks",
    fig3desc: "100+ content types to communicate any idea.",
  },
];

const FirstSection = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      {isSmallScreen
        ? sections.map((section) => (
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
              <div className="flex items-center mb-5">
                {section.fig1img}
                <div>
                  <p className="text-lg">{section.fig1title}</p>
                  <div className="text-sm text-gray-400">
                    {section.fig1desc}
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-5">
                {section.fig2img}
                <div>
                  <p className="text-lg">{section.fig2title}</p>
                  <div className="text-sm text-gray-400">
                    {section.fig2desc}
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-5">
                {section.fig3img}
                <div>
                  <p className="text-lg">{section.fig3title}</p>
                  <div className="text-sm text-gray-400">
                    {section.fig3desc}
                  </div>
                </div>
              </div>
            </div>
          ))
        : sections.map((section) => (
            <div className="items-center flex flex-col mt-5">
              <div
                className="flex xl:space-x- items-center justify-between gap-4 py-10 px-8 lg:w-[80%]
        2xl:w-[55%]"
              >
                <div className="w-[50%]">
                  <div className="flex mb-5">{section.tag}</div>
                  {section.header}
                  <div className="mt-3 text-gray-400 text-lg">
                    {section.description}
                  </div>
                </div>

                <div className="flex space-x-5 mx-auto h-56">
                  <div>
                    <div className="mb-20"></div>
                    {section.fig1imglg}
                    <p className="text-sm">{section.fig1title}</p>
                    <div className="w-32 text-xs text-gray-400">
                      {section.fig1desc}
                    </div>
                  </div>
                  <div>
                    <div className="mb-20"></div>
                    {section.fig2imglg}
                    <p className="text-sm">{section.fig2title}</p>
                    <div className="w-32 text-xs text-gray-400">
                      {section.fig2desc}
                    </div>
                  </div>
                  <div>
                    <div className="mb-20"></div>
                    {section.fig3imglg}
                    <p className="text-sm">{section.fig3title}</p>
                    <div className="w-32 text-xs text-gray-400">
                      {section.fig3desc}
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
          ))}
    </>
  );
};

export default FirstSection;
