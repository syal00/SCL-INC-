"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type ServiceCardProps = {
  href: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  index?: number;
};

export function ServiceCard({ href, title, text, image, alt, index }: ServiceCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { y: 18 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : ((index ?? 0) % 3) * 0.06 }}
    >
      <Link href={href} className="service-card">
        <div className="card-media">
          {typeof index === "number" ? (
            <span className="card-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
          <Image src={image} alt={alt} fill sizes="(max-width: 720px) 100vw, (max-width: 980px) 50vw, 33vw" />
        </div>
        <div className="card-body">
          <span className="proposed">Proposed</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
        <div className="card-foot">
          <span className="muted" style={{ fontSize: "0.9rem" }}>Learn more</span>
          <span className="card-arrow" aria-hidden="true">→</span>
        </div>
      </Link>
    </motion.div>
  );
}
