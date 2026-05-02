import { useState, useCallback } from "react";
import { Check, X, ArrowRight, ArrowLeft, RotateCcw, Globe, Award, BookOpen } from "lucide-react";
import { quizQuestions, type QuizQuestion } from "@/data/quiz";
import { saveQuizResult } from "@/services/firebase";

interface QuizState {
  started: boolean;
  currentIndex: number;
  answers: (number | null)[];
  revealed: boolean[];
  finished: boolean;
}

const OPTION_LETTERS = ["A", "B", "C", "D"];

function getPerformanceLabel(score: number) {
  if (score >= 9) return { label: "EXPERT", color: "#c9a227" };
  if (score >= 7) return { label: "ADVANCED", color: "#4ade80" };
  if (score >= 5) return { label: "LEARNER", color: "#60a5fa" };
  return { label: "BEGINNER", color: "#f87171" };
}

interface QuizArenaProps { onBackToGlobe: () => void; }

export default function QuizArena({ onBackToGlobe }: QuizArenaProps) {
  const [state, setState] = useState<QuizState>({
    started: false, currentIndex: 0, answers: new Array(quizQuestions.length).fill(null),
    revealed: new Array(quizQuestions.length).fill(false), finished: false,
  });

  const currentQ: QuizQuestion = quizQuestions[state.currentIndex];
  const progress = ((state.currentIndex + 1) / quizQuestions.length) * 100;
  const correctCount = state.answers.filter((a, i) => a === quizQuestions[i].correctIndex).length;
  const performance = getPerformanceLabel(correctCount);

  const handleStart = () => setState((p) => ({ ...p, started: true }));

  const handleAnswer = useCallback((optionIndex: number) => {
    setState((p) => {
      const newAnswers = [...p.answers]; newAnswers[p.currentIndex] = optionIndex;
      const newRevealed = [...p.revealed]; newRevealed[p.currentIndex] = true;
      return { ...p, answers: newAnswers, revealed: newRevealed };
    });
  }, []);

  const handleNext = () => {
    if (state.currentIndex < quizQuestions.length - 1) {
      setState((p) => ({ ...p, currentIndex: p.currentIndex + 1 }));
    } else {
      const correctCount = state.answers.filter((a, i) => a === quizQuestions[i].correctIndex).length;
      saveQuizResult(correctCount, quizQuestions.length);
      setState((p) => ({ ...p, finished: true }));
    }
  };

  const handlePrev = () => { if (state.currentIndex > 0) setState((p) => ({ ...p, currentIndex: p.currentIndex - 1 })); };

  const handleRetry = () => setState({ started: true, currentIndex: 0, answers: new Array(quizQuestions.length).fill(null), revealed: new Array(quizQuestions.length).fill(false), finished: false });

  if (!state.started) {
    return (
      <section id="quiz" className="relative min-h-[100dvh] flex flex-col items-center justify-center px-5 md:px-12 pt-16" style={{ zIndex: 2, backgroundColor: "#0a0a0f" }}>
        <div className="text-center max-w-[600px]">
          <BookOpen size={48} style={{ color: "#c9a227", margin: "0 auto 24px" }} />
          <h1 className="font-display text-4xl md:text-6xl mb-4" style={{ color: "#ffffff" }}>Test Your Knowledge</h1>
          <p className="text-[15px] leading-relaxed mb-8" style={{ color: "#a0a0b0" }}>How well do you know the world&apos;s electoral systems? Take this 10-question quiz covering voting methods, election rules, and democratic processes across different countries.</p>
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {["10 QUESTIONS", "MULTIPLE CHOICE", "COUNTRY-BASED"].map((item) => (
              <span key={item} className="label-small" style={{ color: "#555560" }}>{item}</span>
            ))}
          </div>
          <button className="btn-primary" aria-label="Start the quiz" onClick={handleStart}>START QUIZ</button>
        </div>
      </section>
    );
  }

  if (state.finished) {
    return (
      <section id="quiz" className="relative min-h-[100dvh] flex flex-col items-center justify-center px-5 md:px-12 pt-16" style={{ zIndex: 2, backgroundColor: "#0a0a0f" }}>
        <div className="text-center max-w-[600px] w-full">
          <div className="w-40 h-40 rounded-full flex flex-col items-center justify-center mx-auto mb-6" style={{ border: "3px solid #c9a227", boxShadow: "0 0 40px rgba(201, 162, 39, 0.2)" }}>
            <span className="font-display text-4xl" style={{ color: "#c9a227" }}>{Math.round((correctCount / quizQuestions.length) * 100)}%</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl mb-2" style={{ color: "#ffffff" }}>{correctCount} OUT OF {quizQuestions.length} CORRECT</h2>
          <span className="label-ui inline-block px-4 py-2 rounded-full mb-8" style={{ backgroundColor: `${performance.color}20`, color: performance.color }}>
            <Award size={14} className="inline mr-1" />{performance.label}
          </span>

          <div className="text-left mb-8">
            <h3 className="label-ui mb-4" style={{ color: "#555560" }}>QUESTION REVIEW</h3>
            <div className="flex flex-col gap-3">
              {quizQuestions.map((q, i) => {
                const isCorrect = state.answers[i] === q.correctIndex;
                return (
                  <div key={q.id} className="flex items-center gap-3 p-3" style={{ backgroundColor: "#13131f", border: `1px solid ${isCorrect ? "rgba(74, 222, 128, 0.3)" : "rgba(248, 113, 113, 0.3)"}`, borderRadius: "12px" }}>
                    {isCorrect ? <Check size={18} style={{ color: "#4ade80" }} /> : <X size={18} style={{ color: "#f87171" }} />}
                    <div className="flex-1 min-w-0">
                      <span className="text-sm block truncate" style={{ color: "#ffffff" }}>{q.question}</span>
                      <span className="label-small" style={{ color: "#555560" }}>{q.country}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button className="btn-primary flex items-center gap-2" aria-label="Retry the quiz" onClick={handleRetry}><RotateCcw size={14} /> RETRY QUIZ</button>
            <button className="btn-secondary flex items-center gap-2" aria-label="Return to the interactive globe" onClick={onBackToGlobe}><Globe size={14} /> BACK TO GLOBE</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="relative min-h-[100dvh] flex flex-col px-5 md:px-12 pt-24 pb-12" style={{ zIndex: 2, backgroundColor: "#0a0a0f" }}>
      <div className="max-w-[800px] mx-auto w-full flex-1 flex flex-col">
        <div className="w-full h-1 mb-8" style={{ backgroundColor: "#1e1e2d", borderRadius: "2px" }}>
          <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: "#c9a227", borderRadius: "2px" }} />
        </div>

        <div className="p-6 md:p-8 mb-6" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "16px" }}>
          <span className="label-ui block mb-4" style={{ color: "#c9a227" }}>QUESTION {state.currentIndex + 1} OF {quizQuestions.length}</span>
          <span className="label-small inline-block px-2 py-1 rounded mb-4" style={{ backgroundColor: "rgba(201, 162, 39, 0.15)", color: "#c9a227" }}>{currentQ.country}</span>
          <h3 className="text-xl mb-6" style={{ color: "#ffffff" }}>{currentQ.question}</h3>

          <div className="flex flex-col gap-3">
            {currentQ.options.map((option, i) => {
              const isSelected = state.answers[state.currentIndex] === i;
              const isRevealed = state.revealed[state.currentIndex];
              const isCorrect = i === currentQ.correctIndex;
              let borderColor = "#1e1e2d"; let bgColor = "#0d0d14";
              if (isRevealed) { if (isCorrect) { borderColor = "rgba(74, 222, 128, 0.5)"; bgColor = "rgba(74, 222, 128, 0.08)"; } else if (isSelected && !isCorrect) { borderColor = "rgba(248, 113, 113, 0.5)"; bgColor = "rgba(248, 113, 113, 0.08)"; } } else if (isSelected) { borderColor = "#c9a227"; bgColor = "rgba(201, 162, 39, 0.08)"; }
              return (
                <button key={i} onClick={() => !isRevealed && handleAnswer(i)} aria-label={`Option ${OPTION_LETTERS[i]}: ${option}`} className="flex items-center gap-4 p-4 text-left transition-all duration-150"
                  style={{ backgroundColor: bgColor, border: `1px solid ${borderColor}`, borderRadius: "12px", cursor: isRevealed ? "default" : "pointer" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d" }}>
                    <span className="font-mono text-[13px]" style={{ color: "#a0a0b0" }}>{OPTION_LETTERS[i]}</span>
                  </div>
                  <span className="text-[15px] flex-1" style={{ color: "#ffffff" }}>{option}</span>
                  {isRevealed && isCorrect && <Check size={18} style={{ color: "#4ade80" }} />}
                  {isRevealed && isSelected && !isCorrect && <X size={18} style={{ color: "#f87171" }} />}
                </button>
              );
            })}
          </div>

          {state.revealed[state.currentIndex] && (
            <div className="mt-4 p-4 animate-fade-in" style={{ backgroundColor: "rgba(201, 162, 39, 0.05)", border: "1px solid rgba(201, 162, 39, 0.2)", borderRadius: "12px" }}>
              <p className="text-sm leading-relaxed" style={{ color: "#a0a0b0" }}>{currentQ.explanation}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <button className="btn-secondary flex items-center gap-2" aria-label="Previous question" onClick={handlePrev} disabled={state.currentIndex === 0}
            style={{ opacity: state.currentIndex === 0 ? 0.4 : 1, pointerEvents: state.currentIndex === 0 ? "none" : "auto" }}>
            <ArrowLeft size={14} /> PREVIOUS
          </button>
          {state.revealed[state.currentIndex] && (
            <button className="btn-primary flex items-center gap-2 animate-fade-in" aria-label={state.currentIndex < quizQuestions.length - 1 ? "Next question" : "Finish quiz"} onClick={handleNext}>
              {state.currentIndex < quizQuestions.length - 1 ? "NEXT" : "FINISH"} <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}