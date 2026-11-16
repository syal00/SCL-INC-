import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { href?: string; label: string };

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  titleId?: string;
  lede?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  className?: string;
};

export function PageHero({ eyebrow, title, titleId, lede, crumbs, children, className }: PageHeroProps) {
  return (
    <section className={`page-hero on-dark${className ? ` ${className}` : ""}`}>
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
        <p className="eyebrow">{eyebrow}</p>
        <h1 id={titleId}>{title}</h1>
        {lede ? <p className="lede">{lede}</p> : null}
        {children}
      </div>
    </section>
  );
}
