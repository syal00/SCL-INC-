"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, telHref } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  // The menu remembers which page it was opened on, so it closes itself after navigation.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean | ((value: boolean) => boolean)) =>
    setOpenOn((typeof next === "function" ? next(open) : next) ? pathname : null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <p>Serving {site.serviceArea || "your area"}</p>
          {site.phone ? (
            <span>
              Call <a href={telHref(site.phone)}>{site.phone}</a>
            </span>
          ) : null}
        </div>
      </div>
      <header className={scrolled || open ? "site-header is-scrolled" : "site-header"}>
        <div className="container header-inner">
          <Link href="/" className="brand" onClick={() => setOpen(false)}>
            <img src="/brand/scl-logo.png" alt={site.name} width={67} height={72} />
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="nav-toggle-icon" aria-hidden="true" />
            Menu
          </button>
          <nav id="primary-nav" className={open ? "is-open" : undefined} aria-label="Primary">
            <ul className="nav-list">
              {links.map((link) => {
                const current =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={current ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Link href="/contact" className="btn btn-primary header-cta" onClick={() => setOpen(false)}>
            <span className="cta-full">Request a Free Estimate</span>
            <span className="cta-short">Estimate</span>
            <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </header>
    </>
  );
}
