"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Sculpture = dynamic(() => import("./Sculpture"), { ssr: false });

type HeroVisualProps = {
  src: string;
  alt: string;
  caption: [string, string];
  vertical: string;
};

/** The hero picture: a framed photo with slow parallax and the 3D sculpture over it. */
export function HeroVisual({ src, alt, caption, vertical }: HeroVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <motion.div
      ref={ref}
      className="hero-visual"
      initial={reduce ? false : { clipPath: "inset(12% 0 12% 0)", opacity: 0 }}
      animate={{ clipPath: "inset(0% 0 0% 0)", opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
    >
      <motion.div className="hero-image" style={reduce ? undefined : { y }}>
        <Image src={src} alt={alt} fill priority sizes="(max-width: 980px) 100vw, 45vw" />
      </motion.div>
      <div className="hero-shade" aria-hidden="true" />
      {reduce ? null : (
        <div className="hero-canvas">
          <Sculpture />
        </div>
      )}
      <div className="hero-caption" aria-hidden="true">
        <span>{caption[0]}</span>
        <span>{caption[1]}</span>
      </div>
      <div className="hero-vertical" aria-hidden="true">
        {vertical}
      </div>
    </motion.div>
  );
}
