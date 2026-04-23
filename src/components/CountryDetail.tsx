import { useEffect, useRef, useState } from "react";
import { ArrowLeft, TrendingUp, Calendar, Users, Vote } from "lucide-react";
import type { CountryData } from "@/data/countries";

interface CountryDetailProps { country: CountryData | null; onBack: () => void; }

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 800;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <span>{display}{suffix}</span>;
}

export default function CountryDetail({ country, onBack }: CountryDetailProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (country && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      const children = sectionRef.current.querySelectorAll(".animate-item");
      children.forEach((child, i) => {
        const el = child as HTMLElement;
        el.style.opacity = "0"; el.style.transform = "translateY(40px)";
        setTimeout(() => { el.style.transition = "opacity 0.8s cubic-bezier(0.33, 1, 0.68, 1), transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)"; el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, i * 100);
      });
    }
  }, [country]);

  if (!country) return null;

  const statCards = [
    { label: "VOTER TURNOUT", value: country.stats.voterTurnout, suffix: "%", icon: Vote, color: "#4ade80" },
    { label: "ELECTION FREQUENCY", value: country.stats.electionFrequency, suffix: "", icon: Calendar, color: "#60a5fa" },
    { label: "REGISTRATION", value: country.stats.registration, suffix: "%", icon: Users, color: "#4ade80" },
    { label: "LAST ELECTION", value: country.stats.lastElectionYear, suffix: "", icon: TrendingUp, color: "#a0a0b0" },
  ];

  return (
    <section ref={sectionRef} id="country-detail" className="relative px-5 md:px-12 py-16" style={{ zIndex: 2, backgroundColor: "#0a0a0f", pointerEvents: "auto" }}>
      <div className="max-w-[1400px] mx-auto">
        <button onClick={onBack} className="animate-item label-ui flex items-center gap-2 mb-8 transition-colors duration-150 hover:text-[#ffffff]" style={{ color: "#555560" }}>
          <ArrowLeft size={14} /> BACK TO GLOBE
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12">
          <div className="flex flex-col gap-8">
            <div className="animate-item">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{country.flag}</span>
                <h2 className="font-display text-4xl md:text-5xl" style={{ color: "#ffffff" }}>{country.name}</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="label-ui" style={{ color: "#c9a227" }}>RULING PARTY</span>
                <span className="text-[15px]" style={{ color: "#ffffff" }}>{country.rulingParty}</span>
              </div>
            </div>

            <div className="animate-item p-6" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "16px" }}>
              <div className="flex items-center gap-6">
                <img src={country.leader.portrait} alt={country.leader.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover object-top flex-shrink-0" style={{ border: "2px solid #c9a227" }} />
                <div>
                  <h3 className="text-xl font-semibold mb-1" style={{ color: "#ffffff" }}>{country.leader.name}</h3>
                  <p className="text-sm mb-2" style={{ color: "#a0a0b0" }}>{country.leader.title}</p>
                  <span className="label-small px-3 py-1 rounded-full inline-block" style={{ backgroundColor: "rgba(201, 162, 39, 0.15)", color: "#c9a227" }}>SINCE {country.leader.since}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {statCards.map((stat) => (
                <div key={stat.label} className="animate-item p-4" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "12px" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon size={14} style={{ color: stat.color }} />
                    <span className="label-small" style={{ color: "#555560" }}>{stat.label}</span>
                  </div>
                  <div className="text-2xl font-semibold" style={{ color: stat.color }}>
                    {typeof stat.value === "number" ? <AnimatedNumber value={stat.value} suffix={stat.suffix} /> : stat.value + stat.suffix}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="animate-item">
              <span className="label-ui block mb-3" style={{ color: "#c9a227" }}>ELECTION STRATEGY</span>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#a0a0b0" }}>{country.howTheyWon.summary}</p>
              <ul className="flex flex-col gap-2">
                {country.howTheyWon.tactics.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px]" style={{ color: "#ffffff" }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#c9a227" }} />{t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-item">
              <span className="label-ui block mb-3" style={{ color: "rgba(248, 113, 113, 0.7)" }}>OPPOSITION ANALYSIS</span>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: "#a0a0b0" }}>{country.oppositionAnalysis.summary}</p>
              <ul className="flex flex-col gap-2">
                {country.oppositionAnalysis.reasons.map((r, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px]" style={{ color: "#ffffff" }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "rgba(248, 113, 113, 0.7)" }} />{r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-item p-5" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "16px" }}>
              <span className="label-ui block mb-3" style={{ color: "#60a5fa" }}>NEXT POLL</span>
              <div className="text-lg font-semibold mb-1" style={{ color: "#ffffff" }}>{country.upcomingElections.date}</div>
              <div className="label-small mb-2" style={{ color: "#c9a227" }}>{country.upcomingElections.type}</div>
              <p className="text-sm" style={{ color: "#a0a0b0" }}>{country.upcomingElections.context}</p>
            </div>

            <div className="animate-item">
              <span className="label-ui block mb-4" style={{ color: "#c9a227" }}>ELECTION TIMELINE</span>
              <div className="relative pl-6">
                <div className="absolute left-[7px] top-0 bottom-0 w-[1px]" style={{ backgroundColor: "#1e1e2d" }} />
                {country.timeline.map((item, i) => (
                  <div key={i} className="relative pb-6 last:pb-0">
                    <div className="absolute left-[-21px] top-1 w-2 h-2 rounded-full" style={{ backgroundColor: "#c9a227" }} />
                    <span className="label-small block mb-1" style={{ color: "#555560" }}>{item.date}</span>
                    <span className="text-sm" style={{ color: "#ffffff" }}>{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}