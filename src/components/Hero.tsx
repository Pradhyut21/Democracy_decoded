import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { countries, type CountryData } from "@/data/countries";

interface HeroProps {
  onSelectCountry: (country: CountryData) => void;
  onStartQuiz: () => void;
}

export default function Hero({ onSelectCountry, onStartQuiz }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<CountryData[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = countries.filter((c) => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.leader.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered.slice(0, 6));
      setHighlightedIndex(-1);
    } else { 
      setResults([]); 
    }
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { 
      e.preventDefault(); 
      setHighlightedIndex((p) => Math.min(p + 1, results.length - 1)); 
    }
    else if (e.key === "ArrowUp") { 
      e.preventDefault(); 
      setHighlightedIndex((p) => Math.max(p - 1, -1)); 
    }
    else if (e.key === "Enter" && highlightedIndex >= 0) { 
      handleSelect(results[highlightedIndex]); 
    }
    else if (e.key === "Escape") { 
      setIsFocused(false); 
    }
  };

  const handleSelect = (country: CountryData) => {
    setSearchQuery(""); 
    setResults([]); 
    setIsFocused(false);
    onSelectCountry(country);
  };

  return (
    <section id="globe" className="relative min-h-[100dvh] flex flex-col justify-center px-5 md:px-12 pt-16" style={{ zIndex: 1, pointerEvents: 'none' }}>
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 items-center min-h-[70vh]">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#c9a227" }} />
              <span className="label-ui" style={{ color: "#c9a227" }}>ELECTORAL SYSTEMS DATABASE</span>
            </div>

            <h1 className="font-display text-[38px] md:text-[64px] lg:text-[80px] font-normal leading-[0.85] animate-fade-in-up" style={{ color: "#ffffff" }}>
              Democracy<br /><span style={{ color: "#c9a227" }}>Decoded</span>
            </h1>

            <p className="text-[15px] leading-relaxed max-w-[420px] animate-fade-in-up" style={{ color: "#a0a0b0", animationDelay: "0.1s" }}>
              Explore how elections work across the globe. Search countries to discover ruling parties, electoral strategies, upcoming polls, and the mechanics of democracy.
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <button className="btn-primary" style={{ pointerEvents: 'auto' }} onClick={() => inputRef.current?.focus()}>SEARCH COUNTRIES</button>
              <button className="btn-secondary" style={{ pointerEvents: 'auto' }} onClick={onStartQuiz}>TAKE QUIZ</button>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              {["12 COUNTRIES DOCUMENTED", "30+ ELECTION CYCLES", "LIVE UPDATES"].map((item, i) => (
                <span key={item} className="label-small flex items-center gap-2" style={{ color: "#555560" }}>
                  {i > 0 && <span>·</span>}{item}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>

        <div ref={containerRef} className="relative max-w-[640px] mx-auto mt-8 lg:mt-0 animate-fade-in-up" style={{ animationDelay: "0.4s", pointerEvents: 'auto' }}>
          <div className="flex items-center gap-3 px-5 py-4 transition-all duration-200"
            style={{ backgroundColor: "#0d0d14", border: `1px solid ${isFocused ? "#c9a227" : "#1e1e2d"}`, borderRadius: "12px", boxShadow: isFocused ? "0 0 0 3px rgba(201, 162, 39, 0.15)" : "none" }}>
            <Search size={18} style={{ color: "#555560", flexShrink: 0 }} />
            <input ref={inputRef} type="text" placeholder="Search for a country..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[15px]" style={{ color: "#ffffff" }} />
          </div>

          {results.length > 0 && isFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 animate-fade-in shadow-2xl"
              style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "16px", maxHeight: "400px", overflowY: "auto", zIndex: 1000, pointerEvents: 'auto' }}>
              {results.map((country, index) => (
                <button key={country.id}
                  className="w-full flex items-center gap-4 px-5 py-4 transition-colors duration-100 text-left"
                  style={{ backgroundColor: highlightedIndex === index ? "rgba(201, 162, 39, 0.08)" : "transparent", borderBottom: index < results.length - 1 ? "1px solid #1e1e2d" : "none" }}
                  onMouseEnter={() => setHighlightedIndex(index)} 
                  onClick={() => handleSelect(country)}>
                  <span className="text-2xl">{country.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-medium" style={{ color: "#ffffff" }}>{country.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="label-small px-2 py-0.5 rounded" style={{ backgroundColor: "rgba(201, 162, 39, 0.15)", color: "#c9a227" }}>{country.rulingParty}</span>
                    </div>
                  </div>
                  <span className="label-small flex-shrink-0" style={{ color: "#555560" }}>{country.nextElection}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}