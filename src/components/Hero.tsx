"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HeroVisual } from "@/components/HeroVisual";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number, y = 22) =>
    reduce
      ? {}
      : {
          initial: { y, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: 0.85, ease, delay },
        };

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero-grid">
        <div className="hero-copy">
          <motion.p className="kicker" style={{ margin: 0 }} {...rise(0.05, 18)}>
            <span className="line" aria-hidden="true" />
            Construction · Landscaping · Property services
          </motion.p>
          <h1 id="hero-heading" className="display">
            <motion.span style={{ display: "block" }} {...rise(0.2, 60)}>
              From the frame
            </motion.span>
            <motion.em style={{ display: "block" }} {...rise(0.32, 60)}>
              to the finish.
            </motion.em>
          </h1>
          <motion.p className="lede" {...rise(0.5)}>
            Residential and commercial construction — framing, drywall, tape and mud, and renovations — with outdoor work when the property needs it. Tell us about the job and request a free estimate.
          </motion.p>
          <motion.div className="hero-actions" {...rise(0.62)}>
            <Link className="btn btn-light" href="/contact">
              Request a Free Estimate <span className="arrow" aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="/services">
              Explore our services <span className="arrow" aria-hidden="true">↘</span>
            </Link>
          </motion.div>
        </div>
        <HeroVisual
          src="/images/big-house-frame.webp"
          alt="Sample photograph of a two-storey house in wood framing, before the walls are closed in. Not a Sandhu project."
          caption={["Sample photograph", "Not a Sandhu project"]}
          vertical="Crafted for the way you live"
        />
      </div>
      <div className="hero-bottom">
        <span>Designed to last. Made to matter.</span>
        <span className="scroll-cue">
          Scroll to explore <b aria-hidden="true">↓</b>
        </span>
        <span>{[site.locality, site.region].filter(Boolean).join(", ") || "Ontario, Canada"}</span>
      </div>
      <div className="hero-index" aria-hidden="true">
        SCL — 001
      </div>
    </section>
  );
}
