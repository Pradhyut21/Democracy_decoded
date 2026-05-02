import { useState, useCallback, Suspense, lazy } from "react";
const InteractiveGlobe = lazy(() => import("@/components/InteractiveGlobe"));
import ParticleField from "@/components/ParticleField";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedElections from "@/components/FeaturedElections";
import CountryDetail from "@/components/CountryDetail";
import ElectionTimeline from "@/components/ElectionTimeline";
import Glossary from "@/components/Glossary";
import Quiz from "@/components/Quiz";
import ChatBot from "@/components/ChatBot";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import type { CountryData } from "@/data/countries";

type Section = "globe" | "quiz" | "assistant" | "about";

function App() {
  const [activeSection, setActiveSection] = useState<Section>("globe");
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  const handleNavigate = useCallback((section: string) => {
    setActiveSection(section as Section);
    setSelectedCountry(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSelectCountry = useCallback((country: CountryData) => {
    setSelectedCountry(country);
    setActiveSection("globe");
    setTimeout(() => { document.getElementById("country-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100);
  }, []);

  const handleBackToGlobe = useCallback(() => { setSelectedCountry(null); setActiveSection("globe"); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  const handleStartQuiz = useCallback(() => { setActiveSection("quiz"); setSelectedCountry(null); window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: "#0a0a0f" }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Suspense fallback={null}>
        <InteractiveGlobe 
          visible={activeSection === "globe"} 
          selectedCountry={selectedCountry}
          onSelectCountry={handleSelectCountry}
        />
      </Suspense>
      <ParticleField visible={activeSection !== "globe" || selectedCountry !== null} />

      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

      <main id="main-content" style={{ position: "relative", zIndex: 2, pointerEvents: "none" }}>
        {activeSection === "globe" && (
          <div style={{ pointerEvents: "none" }}>
            <Hero onSelectCountry={handleSelectCountry} onStartQuiz={handleStartQuiz} />
            <FeaturedElections onSelectCountry={handleSelectCountry} />
            <CountryDetail country={selectedCountry} onBack={handleBackToGlobe} />
            <ElectionTimeline />
            <Glossary />
          </div>
        )}
        {activeSection === "quiz" && <div style={{ pointerEvents: "auto" }}><Quiz /></div>}
        {activeSection === "about" && <div style={{ pointerEvents: "auto" }}><AboutSection /></div>}
        <div style={{ pointerEvents: "auto" }}><Footer /></div>
      </main>
      <ChatBot />
    </div>
  );
}

export default App;