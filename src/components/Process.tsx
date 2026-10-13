"use client";

import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Share the project",
    text: "Send the form with the service you have in mind, where the property is, and a short description. Photos help when you have them.",
  },
  {
    number: "02",
    title: "Walk the site",
    text: "An estimate starts with the property: access, slope, what the structure has to hold, and how you want to use the space.",
  },
  {
    number: "03",
    title: "Review the estimate",
    text: "You receive a scope you can read before deciding whether to go ahead. Nothing on this site sets a price in advance.",
  },
  {
    number: "04",
    title: "Build and finish",
    text: "Work is scheduled once the scope is agreed. The aim is a clear job and a property left tidy.",
  },
];

export function Process() {
  const reduce = useReducedMotion();

  return (
    <ol className="process-grid">
      {steps.map((step, index) => (
        <motion.li
          key={step.number}
          className="process-step"
          initial={reduce ? false : { y: 16 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.45, delay: reduce ? 0 : index * 0.05 }}
        >
          <em>{step.number}</em>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </motion.li>
      ))}
    </ol>
  );
}
