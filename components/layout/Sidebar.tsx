import Link from "next/link";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/clients", label: "Clients" },
  { href: "/rdv", label: "RDV" },
  { href: "/automatisations", label: "Automatisations" },
  { href: "/messages", label: "Messages" },
  { href: "/parametres", label: "Paramètres" },
];

export function Sidebar() {
  return (
    <aside
      className="flex w-56 flex-col border-r p-4"
      style={{
        borderColor: "var(--looply-border)",
        backgroundColor: "var(--looply-bg)",
      }}
    >
      <nav className="flex flex-col gap-1">
        {nav.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-white/80"
            style={{ color: "var(--looply-text)" }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
