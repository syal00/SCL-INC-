export function Placeholder({ children }: { children: string }) {
  return (
    <span className="placeholder" data-placeholder="true">
      <span className="visually-hidden">Placeholder: </span>
      {children}
    </span>
  );
}
