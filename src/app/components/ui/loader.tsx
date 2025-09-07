"use client";
import { motion } from "framer-motion";
import React from "react";

// LoaderOne: bouncing dots
export const LoaderOne = () => {
  const transition = (delay = 0) => ({
    y: {
      duration: 1,
      repeat: Infinity,
      repeatType: "loop" as const,
      delay,
      ease: "linear" as const,
    },
  });

  return (
    <div className="flex items-center gap-2">
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={transition(delay)}
          className="h-4 w-4 rounded-full bg-neutral-400"
        />
      ))}
    </div>
  );
};

// LoaderTwo: sliding dots
export const LoaderTwo = () => {
  const transition = (delay = 0) => ({
    x: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop" as const,
      delay,
      ease: "linear" as const,
    },
  });

  return (
    <div className="flex items-center gap-1">
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.div
          key={i}
          initial={{ x: 0 }}
          animate={{ x: [0, 20, 0] }}
          transition={transition(delay)}
          className="h-4 w-4 rounded-full bg-neutral-300"
        />
      ))}
    </div>
  );
};

// LoaderThree: SVG path animation
export const LoaderThree = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-20 w-20 stroke-neutral-500"
  >
    <motion.path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "linear" as const,
      }}
      d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"
    />
  </motion.svg>
);

// LoaderFour: skew text
// export const LoaderFour = ({ text = "Loading..." }: { text?: string }) => (
//   <div className="relative font-bold text-black dark:text-white">
//     <motion.span
//       animate={{
//         skew: [0, -40, 0],
//         scaleX: [1, 2, 1],
//       }}
//       transition={{
//         duration: 0.5,
//         repeat: Infinity,
//         repeatType: "reverse" as const,
//         ease: "linear" as const,
//       }}
//       className="relative z-20 inline-block"
//     >
//       {text}
//     </motion.span>
//   </div>
// );

// LoaderFive: bouncing letters
export const LoaderFive = ({ text }: { text: string }) => (
  <div className="font-sans font-bold">
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        className="inline-block"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "loop" as const,
          delay: i * 0.05,
          ease: "linear" as const,
        }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </div>
);
