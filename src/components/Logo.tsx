type LogoProps = {
  /** Show "Construction & Landscaping" under the name. */
  sub?: boolean;
  className?: string;
};

/**
 * The Gable & Leaf mark: a roof over a leaf, standing on a course of pavers.
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
      <path d="M32 21.5 C40.5 27 41 37 32 43.5 C23 37 23.5 27 32 21.5 Z" fill="var(--accent)" />
      <path d="M32 27 V47.5" stroke="var(--bg)" strokeWidth="1.8" strokeLinecap="round" />
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
            <span className="logo-sub">Construction &amp; Landscaping</span>
          </>
        ) : null}
      </span>
    </span>
  );
}
