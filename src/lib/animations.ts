import type { Variants } from "framer-motion";
import type { AnimationVariant } from "./types";

const distance = 48;

export const animationVariants: Record<AnimationVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  },
  "zoom-in": {
    hidden: { opacity: 0, scale: 0.85 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  },
  "slide-left": {
    hidden: { opacity: 0, x: distance },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -distance },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
  flip: {
    hidden: { opacity: 0, rotateX: -90 },
    show: {
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  },
  none: {
    hidden: { opacity: 1 },
    show: { opacity: 1 },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};
