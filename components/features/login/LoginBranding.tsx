const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E";

export function LoginBranding() {
  return (
    <div
      className="relative flex flex-shrink-0 flex-col justify-center px-6 py-10 md:w-[38%] md:min-h-screen md:px-10 md:py-12 lg:px-12"
      style={{
        backgroundImage: `url("${GRAIN_SVG}"), linear-gradient(135deg, rgba(247,247,250,0.98) 0%, rgba(243,244,246,0.95) 50%, rgba(238,242,255,0.4) 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-60"
        aria-hidden
      >
        <div
          className="absolute -left-12 top-1/4 h-64 w-64 rounded-full opacity-30 blur-3xl"
          style={{
            background: "var(--looply-accent)",
            animation: "looply-branding-breathe 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-8 right-1/4 h-48 w-48 rounded-full opacity-20 blur-2xl"
          style={{
            background: "var(--looply-accent)",
            animation: "looply-branding-breathe 10s ease-in-out infinite 1s",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="mb-6 md:mb-8">
          <span
            className="text-2xl font-semibold tracking-tight md:text-3xl"
            style={{ color: "var(--looply-text)" }}
          >
            Looply
          </span>
        </div>
        <p
          className="mb-6 max-w-xs text-base leading-relaxed md:mb-8 md:text-lg"
          style={{ color: "var(--looply-text-muted)" }}
        >
          Automatisez vos rappels. Simplifiez votre quotidien.
        </p>
        <div
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
          style={{
            color: "var(--looply-text-muted)",
            backgroundColor: "rgba(255,255,255,0.6)",
            border: "1px solid var(--looply-border)",
          }}
        >
          <span aria-hidden>⭐️</span>
          <span>Moins de no-show, plus d&apos;avis — sans y penser.</span>
        </div>
      </div>
    </div>
  );
}
