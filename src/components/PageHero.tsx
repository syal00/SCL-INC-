import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type Crumb = { href?: string; label: string };

type PageHeroProps = {
  eyebrow: string;
  number?: string;
  title: ReactNode;
  titleId?: string;
  lede?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
};

export function PageHero({ eyebrow, number, title, titleId, lede, crumbs, children }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container">
        {crumbs && crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li>
                <Link href="/">Home</Link>
              </li>
              {crumbs.map((crumb, index) => (
                <li key={crumb.label}>
                  {crumb.href && index < crumbs.length - 1 ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    <span aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <p className="kicker" style={{ marginBottom: "2rem" }}>
          {number ? <span className="num">{number}</span> : <span className="line" aria-hidden="true" />}
          <span>{eyebrow}</span>
        </p>
        <Reveal>
          <h1 id={titleId}>{title}</h1>
        </Reveal>
        {lede ? (
          <Reveal delay={0.12}>
            <p className="lede">{lede}</p>
          </Reveal>
        ) : null}
        {children}
      </div>
      <span className="page-hero-index" aria-hidden="true">
        SCL — {number || "000"}
      </span>
    </section>
  );
}
