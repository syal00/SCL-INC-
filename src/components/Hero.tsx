"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Full-screen homepage hero with the company's construction video behind it. */
export function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // React does not reliably write the `muted` attribute into the server HTML,
  // which some browsers need before they allow autoplay. Set it and start
  // playback here, and keep the video still for people who prefer reduced motion.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (media.matches) {
        video.pause();
      } else {
        video.play().catch(() => {
          // Autoplay blocked (for example, low-power mode): the poster stays visible.
        });
      }
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const fade = (delay: number, y = 24) =>
    reduce
      ? {}
      : {
          initial: { y, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: 1, ease, delay },
        };

  return (
    <section className="video-hero" aria-labelledby="hero-heading">
      <div className="video-hero-media" aria-hidden="true">
        <video
          ref={videoRef}
          className="video-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/video/hero-poster.jpg"
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
        >
          <source src="/video/hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="video-hero-shade" aria-hidden="true" />

      <div className="container video-hero-content">
        <motion.p className="video-hero-kicker" {...fade(0.15, 14)}>
          <span className="line" aria-hidden="true" />
          Sandhu Construction &amp; Landscape Inc.
        </motion.p>
        <h1 id="hero-heading" className="video-hero-title">
          <motion.span {...fade(0.3, 40)}>Building spaces.</motion.span>
          <motion.span className="accent" {...fade(0.45, 40)}>
            Creating dreams.
          </motion.span>
        </h1>
        <motion.p className="video-hero-text" {...fade(0.65)}>
          From expert framing and drywall installation to professional mudding, taping and complete home renovations, we bring your vision to life with quality craftsmanship.
        </motion.p>
        <motion.div className="video-hero-actions" {...fade(0.8)}>
          <Link className="btn btn-hero-primary" href="/projects">
            Explore our projects <span className="arrow" aria-hidden="true">↗</span>
          </Link>
          <Link className="btn btn-hero-ghost" href="/contact">
            Get a free quote <span className="arrow" aria-hidden="true">↗</span>
          </Link>
        </motion.div>
      </div>

      <motion.a
        className="scroll-indicator"
        href="#intro"
        aria-label="Scroll to the next section"
        {...(reduce ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1, delay: 1.3 } })}
      >
        <span>Scroll</span>
        <span className="scroll-indicator-line" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
