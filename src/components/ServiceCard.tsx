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
};

export function ServiceCard({ href, title, text, image, alt }: ServiceCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
    >
      <Link href={href} className="service-card">
        <div className="card-media">
          <Image src={image} alt={alt} fill sizes="(max-width: 720px) 100vw, 33vw" />
        </div>
        <div className="card-body">
          <span className="proposed">Proposed</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </Link>
    </motion.div>
  );
}
