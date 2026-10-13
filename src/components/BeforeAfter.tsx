"use client";

import Image from "next/image";
import { useState } from "react";

type BeforeAfterProps = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

export function BeforeAfter({ before, after }: BeforeAfterProps) {
  const [value, setValue] = useState(58);

  return (
    <figure className="ba">
      <div className="ba-frame">
        <Image src={after.src} alt={after.alt} fill sizes="(max-width: 900px) 100vw, 70vw" />
        <div className="ba-before" style={{ width: `${value}%` }}>
          <img src={before.src} alt={before.alt} width={1800} height={1200} />
        </div>
        <span className="ba-handle" style={{ left: `${value}%` }} aria-hidden="true" />
        <input
          className="ba-range"
          type="range"
          min={0}
          max={100}
          value={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-valuetext={`${value} percent before photograph, ${100 - value} percent after photograph`}
          aria-label="Compare the before and after photographs"
          onChange={(event) => setValue(Number(event.target.value))}
        />
      </div>
      <figcaption>
        <span>Before</span>
        <span>After</span>
      </figcaption>
    </figure>
  );
}
