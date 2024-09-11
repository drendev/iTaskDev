"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useAnimationControls,
} from "framer-motion";
import { Button } from "@/components/ui/button";

const Scrum = () => {
  const controls = useAnimationControls();

  const handleClick = () => {
    controls.start("flip");
  };
  return (
    <>
      <div
        style={{
          height: "150vh",
        }}
      ></div>
      <motion.div style={{height: "100vh", background: "black"}}
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      transition={{duration: 1}}
      />

    </>
  );
};

export default Scrum;
