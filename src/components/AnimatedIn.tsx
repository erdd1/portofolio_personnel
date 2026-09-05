"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { animationVariants } from "@/lib/animations";
import type { AnimationVariant } from "@/lib/types";

export function AnimatedIn({
  children,
  variant = "fade-up",
  className,
  delay = 0,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  variant?: AnimationVariant;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={animationVariants[variant]}
      transition={{ delay }}
      style={{ perspective: variant === "flip" ? 800 : undefined }}
    >
      {children}
    </motion.div>
  );
}
