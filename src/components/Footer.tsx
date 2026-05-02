export default function Footer() {
  return (
    <footer className="relative px-5 md:px-12 py-12" style={{ zIndex: 2, backgroundColor: "#0a0a0f", borderTop: "1px solid #1e1e2d", pointerEvents: "auto" }}>
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm uppercase tracking-[0.12em]" style={{ color: "#555560" }}>DEMOCRACY DECODED</span>
          <span className="label-small" style={{ color: "#555560" }}>&copy; 2025</span>
        </div>
        <div className="flex items-center gap-6">
          {["DATA SOURCES", "METHODOLOGY", "PRIVACY", "TERMS"].map((l) => (
            <button key={l} aria-label={`View ${l.toLowerCase()}`} className="label-ui transition-colors duration-150 hover:text-[#ffffff]" style={{ color: "#555560" }}>{l}</button>
          ))}
        </div>
        <span className="label-small" style={{ color: "#c9a227" }}>12 COUNTRIES &middot; 30+ CYCLES &middot; LIVE</span>
      </div>
    </footer>
  );
}