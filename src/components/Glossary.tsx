import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { glossaryTerms } from "@/data/glossary";

export default function Glossary() {
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const filtered = searchQuery.trim() ? glossaryTerms.filter((t) => t.term.toLowerCase().includes(searchQuery.toLowerCase()) || t.definition.toLowerCase().includes(searchQuery.toLowerCase())) : glossaryTerms;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll(".glossary-card");
          cards.forEach((card, i) => { setTimeout(() => { (card as HTMLElement).style.opacity = "1"; (card as HTMLElement).style.transform = "translateY(0)"; }, i * 60); });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [filtered]);

  return (
    <section ref={sectionRef} id="glossary" className="relative px-5 md:px-12 py-20" style={{ zIndex: 2, backgroundColor: "#0a0a0f", pointerEvents: "auto" }}>
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-display text-3xl md:text-5xl text-center mb-8" style={{ color: "#ffffff" }}>Election Glossary</h2>
        <div className="max-w-[540px] mx-auto mb-10">
          <div className="flex items-center gap-3 px-5 py-4" style={{ backgroundColor: "#0d0d14", border: "1px solid #1e1e2d", borderRadius: "12px" }}>
            <Search size={18} style={{ color: "#555560" }} />
            <input type="text" placeholder="Search terms..." aria-label="Search glossary terms" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-[15px]" style={{ color: "#ffffff" }} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((term) => (
            <div key={term.term} className="glossary-card p-6" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "16px", opacity: 0, transform: "translateY(30px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="label-small" style={{ color: "#c9a227" }}>{term.category}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#ffffff" }}>{term.term}</h3>
              <p className="text-[15px] leading-relaxed" style={{ color: "#a0a0b0" }}>{term.definition}</p>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <p className="text-center text-[15px] py-12" style={{ color: "#555560" }}>No terms found matching &quot;{searchQuery}&quot;</p>}
      </div>
    </section>
  );
}