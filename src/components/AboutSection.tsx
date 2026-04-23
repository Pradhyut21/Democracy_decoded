import { BookOpen, Globe, MessageSquare, Award } from "lucide-react";

const FEATURES = [
  { icon: Globe, title: "Interactive Globe", description: "Explore an ASCII-rendered 3D globe with real-time rotation. Click and drag to spin, or search for countries to discover their electoral systems." },
  { icon: BookOpen, title: "Country Profiles", description: "Detailed profiles of 12 countries including ruling parties, election strategies, opposition analysis, upcoming polls, and historical timelines." },
  { icon: Award, title: "Civic Quiz", description: "Test your knowledge with 10 multiple-choice questions covering electoral systems, voting methods, and democratic processes worldwide." },
  { icon: MessageSquare, title: "AI Assistant", description: "Chat with an AI guide specializing in electoral systems. Ask about voting methods, election history, or democratic theory." },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative px-5 md:px-12 py-20" style={{ zIndex: 2, backgroundColor: "#0a0a0f" }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl mb-4" style={{ color: "#ffffff" }}>About This Project</h2>
          <p className="text-[15px] leading-relaxed max-w-[640px] mx-auto" style={{ color: "#a0a0b0" }}>
            Democracy Decoded is an interactive educational platform designed to help people understand how elections work across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="p-6 transition-all duration-200 hover:-translate-y-0.5" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "16px" }}>
              <f.icon size={24} className="mb-4" style={{ color: "#c9a227" }} />
              <h3 className="text-lg font-semibold mb-2" style={{ color: "#ffffff" }}>{f.title}</h3>
              <p className="text-[15px] leading-relaxed" style={{ color: "#a0a0b0" }}>{f.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-8" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "16px" }}>
          {[{ v: "12", l: "Countries" }, { v: "30+", l: "Election Cycles" }, { v: "10", l: "Quiz Questions" }, { v: "18", l: "Glossary Terms" }].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-3xl md:text-4xl mb-1" style={{ color: "#c9a227" }}>{s.v}</div>
              <span className="label-small" style={{ color: "#555560" }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}