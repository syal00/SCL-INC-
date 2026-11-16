type LogoProps = {
  /** Show "Construction & Landscape Inc." under the name. */
  sub?: boolean;
  className?: string;
};

/**
 * The Gable mark: a roof over a small amber house, standing on a course of pavers.
 * Colours come from the surrounding section (--fg, --accent, --bg), so the
 * same logo works on white pages and on charcoal bands.
 */
export function LogoMark({ size = 48, title }: { size?: number; title?: string }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="4 6 56 52"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        d="M7 34 L32 12 L57 34"
        fill="none"
        stroke="var(--fg)"
        strokeWidth="6"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />
      <path d="M32 21 L42.5 30.5 V46 H21.5 V30.5 Z" fill="var(--accent)" />
      <rect x="29.25" y="37" width="5.5" height="9" fill="var(--bg)" />
      <rect x="7" y="48" width="15.3" height="7" fill="var(--fg)" />
      <rect x="24.35" y="48" width="15.3" height="7" fill="var(--fg)" />
      <rect x="41.7" y="48" width="15.3" height="7" fill="var(--fg)" />
    </svg>
  );
}

export function Logo({ sub = true, className }: LogoProps) {
  return (
    <span className={className ? `logo ${className}` : "logo"}>
      <LogoMark />
      <span className="logo-word">
        <span className="logo-name">Sandhu</span>
        {sub ? (
          <>
            <span className="logo-rule" aria-hidden="true" />
            <span className="logo-sub">Construction &amp; Landscape Inc.</span>
          </>
        ) : null}
      </span>
    </span>
  );
}
