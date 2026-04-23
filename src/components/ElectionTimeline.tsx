import { useEffect, useRef } from "react";
import { UserPlus, FileText, Megaphone, Vote, ClipboardCheck, Award } from "lucide-react";

const STEPS = [
  { icon: UserPlus, title: "VOTER REGISTRATION", desc: "Citizens register to vote in their constituency" },
  { icon: FileText, title: "CANDIDATE FILING", desc: "Candidates submit nomination papers" },
  { icon: Megaphone, title: "CAMPAIGNING", desc: "Parties campaign and debate" },
  { icon: Vote, title: "POLLING DAY", desc: "Citizens cast their votes" },
  { icon: ClipboardCheck, title: "VOTE COUNTING", desc: "Ballots are counted and verified" },
  { icon: Award, title: "RESULT DECLARATION", desc: "Winners are announced and certified" },
];

export default function ElectionTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const steps = entry.target.querySelectorAll(".timeline-step");
          steps.forEach((step, i) => { setTimeout(() => { (step as HTMLElement).style.opacity = "1"; (step as HTMLElement).style.transform = "scale(1)"; }, i * 100); });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="election-timeline" className="relative px-5 md:px-12 py-20" style={{ zIndex: 2, backgroundColor: "#0a0a0f", pointerEvents: "auto" }}>
      <div className="max-w-[1400px] mx-auto">
        <h2 className="font-display text-3xl md:text-5xl text-center mb-12" style={{ color: "#ffffff" }}>The Election Process</h2>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="timeline-step flex flex-col items-center text-center gap-3"
                style={{ opacity: 0, transform: "scale(0.8)", transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#13131f", border: "1px solid #c9a227" }}>
                  <span className="font-mono text-sm" style={{ color: "#c9a227" }}>{i + 1}</span>
                </div>
                <step.icon size={20} style={{ color: "#c9a227" }} />
                <h3 className="text-base font-semibold" style={{ color: "#ffffff" }}>{step.title}</h3>
                <p className="text-[13px] max-w-[180px]" style={{ color: "#a0a0b0" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}