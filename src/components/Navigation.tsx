import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const NAV_LINKS = [
  { id: "globe", label: "GLOBE" },
  { id: "quiz", label: "QUIZ" },
  { id: "assistant", label: "ASSISTANT" },
  { id: "about", label: "ABOUT" },
];

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Add Google Translate script
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Add initialization function to window
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: "en", layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-6 md:px-12"
        style={{ backgroundColor: "rgba(10, 10, 15, 0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1e1e2d" }}>
        <button onClick={() => onNavigate("globe")} aria-label="Go to Globe Home" className="font-mono text-sm uppercase tracking-[0.12em] transition-colors duration-150"
          style={{ color: activeSection === "globe" ? "#c9a227" : "#ffffff" }}>
          DEMOCRACY DECODED
        </button>

        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <button key={link.id} onClick={() => onNavigate(link.id)}
              aria-label={`Navigate to ${link.label}`}
              className="font-mono text-[13px] uppercase tracking-[0.1em] relative transition-colors duration-150"
              style={{ color: activeSection === link.id ? "#c9a227" : "#555560" }}>
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[1px] transition-transform duration-200 origin-left"
                style={{ width: "100%", backgroundColor: "#c9a227", transform: activeSection === link.id ? "scaleX(1)" : "scaleX(0)" }} />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div id="google_translate_element" className="hidden sm:block"></div>
          <button className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation menu" style={{ color: "#ffffff" }}>
            <Menu size={20} strokeWidth={2} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8" style={{ backgroundColor: "#0a0a0f" }}>
          <button className="absolute top-5 right-6" onClick={() => setMobileOpen(false)} aria-label="Close navigation menu" style={{ color: "#ffffff" }}>
            <X size={24} />
          </button>
          {NAV_LINKS.map((link) => (
            <button key={link.id} onClick={() => { onNavigate(link.id); setMobileOpen(false); }}
              className="font-display text-2xl transition-colors duration-150"
              style={{ color: activeSection === link.id ? "#c9a227" : "#ffffff" }}>
              {link.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}