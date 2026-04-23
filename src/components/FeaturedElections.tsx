import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { countries, featuredCountryIds, type CountryData } from "@/data/countries";

interface FeaturedElectionsProps { onSelectCountry: (country: CountryData) => void; }

export default function FeaturedElections({ onSelectCountry }: FeaturedElectionsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll(".featured-card");
          cards.forEach((card, i) => {
            setTimeout(() => { (card as HTMLElement).style.opacity = "1"; (card as HTMLElement).style.transform = "translateY(0)"; }, i * 120);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const featured = featuredCountryIds.map((id) => countries.find((c) => c.id === id)).filter(Boolean) as CountryData[];

  return (
    <section ref={sectionRef} id="featured-elections" className="relative px-5 md:px-12 py-20" style={{ zIndex: 2, backgroundColor: "#0a0a0f", pointerEvents: "auto" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <span className="label-ui" style={{ color: "#c9a227" }}>FEATURED ELECTIONS</span>
          <button className="label-ui transition-colors duration-150 hover:text-[#c9a227] flex items-center gap-1" style={{ color: "#555560" }}>
            VIEW ALL <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((country) => (
            <div key={country.id} className="featured-card group cursor-pointer overflow-hidden"
              style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "16px", opacity: 0, transform: "translateY(60px)", transition: "opacity 0.7s ease, transform 0.7s ease, border-color 200ms ease" }}
              onClick={() => onSelectCountry(country)}>
              <div className="relative h-[220px] overflow-hidden bg-[#0d0d14]">
                <img src={country.leader.portrait} alt={country.leader.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" style={{ filter: "grayscale(10%)" }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "rgba(201, 162, 39, 0.08)", mixBlendMode: "overlay" }} />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1" style={{ color: "#ffffff" }}>{country.name}</h3>
                <p className="text-sm mb-3" style={{ color: "#a0a0b0" }}>{country.leader.name}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="label-small px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(201, 162, 39, 0.15)", color: "#c9a227" }}>{country.rulingParty}</span>
                  <span className="label-small px-2 py-0.5 rounded" style={{ backgroundColor: "#1e1e2d", color: "#a0a0b0" }}>{country.electionType}</span>
                </div>
                <span className="label-ui flex items-center gap-1 transition-all duration-200 group-hover:gap-2" style={{ color: "#c9a227" }}>EXPLORE <ArrowRight size={12} /></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}