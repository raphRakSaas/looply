export function Header() {
  return (
    <header
      className="flex h-14 items-center border-b px-4"
      style={{
        borderColor: "var(--looply-border)",
        backgroundColor: "var(--looply-card)",
      }}
    >
      <span
        className="text-lg font-semibold"
        style={{ color: "var(--looply-text)" }}
      >
        Looply
      </span>
    </header>
  );
}
