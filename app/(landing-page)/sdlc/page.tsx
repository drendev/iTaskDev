"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Waterfall from "@/components/landing/sdlc/waterfall";
import Scrum from "@/components/landing/sdlc/scrum";
import Kanban from "@/components/landing/sdlc/kanban";
import Spiral from "@/components/landing/sdlc/spiral";
import VShape from "@/components/landing/sdlc/vshape";
import Lean from "@/components/landing/sdlc/lean";
import DevOps from "@/components/landing/sdlc/devops";
import Iterative from "@/components/landing/sdlc/iterative";
import RAD from "@/components/landing/sdlc/rad";
import { motion } from "framer-motion";

const SDLC = () => {
  const searchParams = useSearchParams();
  const myValue = searchParams.get('page');

  const [slide, setSlide] = useState<any>(myValue !== undefined ? myValue : "waterfall");

  useEffect(() => {
    if (myValue) {
      setSlide(myValue);
    }
  }, [myValue]); 

  const changeSlide = (activeSlide: string): void => {
    window.scrollTo(0, 0);
    setSlide(activeSlide);
  };

  return (
    <>
      <div className="hidden lg:flex space-x-5 justify-center items-center mt-5 z-20">
        <motion.button
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => changeSlide("waterfall")}
          className={`p-3  
            ${
              slide === "waterfall"
                ? " bg-blue-500 rounded-md text-white"
                : " bg-white text-black"
            }
            `}
        >
          Waterfall
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => changeSlide("scrum")}
          className={`p-3 
            ${
              slide === "scrum"
                ? "bg-amber-500 rounded-md text-white"
                : "text-black"
            }
            `}
        >
          Scrum
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => changeSlide("kanban")}
          className={`p-3 
            ${
              slide === "kanban"
                ? "bg-cyan-500 rounded-md text-white"
                : "text-black"
            }
            `}
        >
          Kanban
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => changeSlide("spiral")}
          className={`p-3 
            ${
              slide === "spiral"
                ? "bg-rose-600 rounded-md text-white"
                : "text-black"
            }
            `}
        >
          Spiral
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => changeSlide("vshape")}
          className={`p-3 
            ${
              slide === "vshape"
                ? "bg-pink-600 rounded-md text-white"
                : "text-black"
            }
            `}
        >
          V-Shape
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => changeSlide("lean")}
          className={`p-3 
            ${
              slide === "lean"
                ? "bg-red-600 rounded-md text-white"
                : "text-black"
            }
            `}
        >
          Lean
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => changeSlide("devops")}
          className={`p-3 
            ${
              slide === "devops"
                ? "bg-violet-600 rounded-md text-white"
                : "text-black"
            }
            `}
        >
          DevOps
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => changeSlide("iterative")}
          className={`p-3 
            ${
              slide === "iterative"
                ? "bg-lime-600 rounded-md text-white"
                : "text-black"
            }
            `}
        >
          Iterative
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.2,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => changeSlide("rad")}
          className={`p-3 
            ${
              slide === "rad"
                ? "bg-teal-600 rounded-md text-white"
                : "text-black"
            }
            `}
        >
          RAD
        </motion.button>
      </div>

      {slide === "waterfall" && <Waterfall changeSlide={changeSlide} />}
      {slide === "scrum" && <Scrum changeSlide={changeSlide} />}
      {slide === "kanban" && <Kanban changeSlide={changeSlide} />}
      {slide === "spiral" && <Spiral changeSlide={changeSlide} />}
      {slide === "vshape" && <VShape changeSlide={changeSlide} />}
      {slide === "lean" && <Lean changeSlide={changeSlide} />}
      {slide === "devops" && <DevOps changeSlide={changeSlide} />}
      {slide === "iterative" && <Iterative changeSlide={changeSlide} />}
      {slide === "rad" && <RAD changeSlide={changeSlide} />}


    </>
  );
};

export default SDLC;
