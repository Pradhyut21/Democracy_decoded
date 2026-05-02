import { useState, useCallback, useEffect } from "react";
import { Check, X, ArrowRight, ArrowLeft, RotateCcw, Globe, Award, BookOpen, Sparkles, User, Loader2 } from "lucide-react";
import { quizQuestions as defaultQuestions, type QuizQuestion } from "@/data/quiz";
import { saveQuizScore, getLeaderboard } from "@/services/firebase";
import { generateElectionQuiz } from "@/services/quizService";

interface QuizState {
  started: boolean;
  currentIndex: number;
  answers: (number | null)[];
  revealed: boolean[];
  finished: boolean;
  questions: QuizQuestion[];
  loading: boolean;
  topic: string;
  playerName: string;
}

const TOPICS = ["General Knowledge", "US Elections", "European Parliamentary", "Indian Democracy", "Gerrymandering & Voting Rights"];
const OPTION_LETTERS = ["A", "B", "C", "D"];

function getPerformanceLabel(score: number, total: number) {
  const percentage = (score / total) * 100;
  if (percentage >= 90) return { label: "EXPERT", color: "#c9a227" };
  if (percentage >= 70) return { label: "ADVANCED", color: "#4ade80" };
  if (percentage >= 50) return { label: "LEARNER", color: "#60a5fa" };
  return { label: "BEGINNER", color: "#f87171" };
}

interface QuizArenaProps { onBackToGlobe: () => void; }

export default function QuizArena({ onBackToGlobe }: QuizArenaProps) {
  const [state, setState] = useState<QuizState>({
    started: false, currentIndex: 0, answers: [], revealed: [], finished: false,
    questions: defaultQuestions, loading: false, topic: "General Knowledge", playerName: ""
  });
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    if (state.finished) {
      getLeaderboard().then(setLeaderboard);
    }
  }, [state.finished]);

  const handleStart = async (useAI: boolean = false) => {
    if (useAI) {
      setState(p => ({ ...p, loading: true }));
      try {
        const data = await generateElectionQuiz(state.topic);
        const questions = data.questions.map((q: any) => ({ ...q, id: q.id || Math.random().toString() }));
        setState(p => ({ 
          ...p, started: true, questions, loading: false, 
          answers: new Array(questions.length).fill(null),
          revealed: new Array(questions.length).fill(false)
        }));
      } catch (e) {
        console.error("AI Quiz error", e);
        // Fallback to defaults
        setState(p => ({ 
          ...p, started: true, questions: defaultQuestions, loading: false,
          answers: new Array(defaultQuestions.length).fill(null),
          revealed: new Array(defaultQuestions.length).fill(false)
        }));
      }
    } else {
      setState(p => ({ 
        ...p, started: true, questions: defaultQuestions, 
        answers: new Array(defaultQuestions.length).fill(null),
        revealed: new Array(defaultQuestions.length).fill(false)
      }));
    }
  };

  const handleAnswer = useCallback((optionIndex: number) => {
    setState((p) => {
      const newAnswers = [...p.answers]; newAnswers[p.currentIndex] = optionIndex;
      const newRevealed = [...p.revealed]; newRevealed[p.currentIndex] = true;
      return { ...p, answers: newAnswers, revealed: newRevealed };
    });
  }, []);

  const handleNext = () => {
    if (state.currentIndex < state.questions.length - 1) {
      setState((p) => ({ ...p, currentIndex: p.currentIndex + 1 }));
    } else {
      const correctCount = state.answers.filter((a, i) => a === state.questions[i].correctIndex).length;
      if (state.playerName) {
        saveQuizScore(state.playerName, correctCount, state.topic);
      }
      setState((p) => ({ ...p, finished: true }));
    }
  };

  const handlePrev = () => { if (state.currentIndex > 0) setState((p) => ({ ...p, currentIndex: p.currentIndex - 1 })); };

  const handleRetry = () => setState(p => ({ 
    ...p, started: false, currentIndex: 0, answers: [], revealed: [], finished: false 
  }));

  if (state.loading) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0f] text-white">
        <Loader2 className="w-12 h-12 animate-spin text-[#c9a227] mb-4" />
        <p className="text-lg font-display animate-pulse">Gemini is crafting your custom quiz...</p>
      </section>
    );
  }

  if (!state.started) {
    return (
      <section id="quiz" className="relative min-h-[100dvh] flex flex-col items-center justify-center px-5 md:px-12 pt-16" style={{ zIndex: 2, backgroundColor: "#0a0a0f" }}>
        <div className="text-center max-w-[700px] w-full">
          <BookOpen size={48} style={{ color: "#c9a227", margin: "0 auto 24px" }} />
          <h1 className="font-display text-4xl md:text-6xl mb-4" style={{ color: "#ffffff" }}>Electoral Challenge</h1>
          <p className="text-[15px] leading-relaxed mb-8" style={{ color: "#a0a0b0" }}>Test your knowledge or challenge yourself with a custom AI-generated quiz.</p>
          
          <div className="bg-[#13131f] border border-[#1e1e2d] p-6 rounded-2xl mb-8">
            <div className="mb-6 text-left">
              <label className="label-ui block mb-2" style={{ color: "#c9a227" }}>SELECT TOPIC</label>
              <div className="flex flex-wrap gap-2">
                {TOPICS.map(t => (
                  <button key={t} onClick={() => setState(p => ({ ...p, topic: t }))} className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${state.topic === t ? "bg-[#c9a227] text-[#0a0a0f]" : "bg-[#1e1e2d] text-[#a0a0b0] hover:border-[#c9a227]"}`} style={{ border: "1px solid transparent" }}>{t}</button>
                ))}
              </div>
            </div>

            <div className="text-left mb-6">
              <label className="label-ui block mb-2" style={{ color: "#c9a227" }}>PLAYER NAME</label>
              <input type="text" value={state.playerName} onChange={e => setState(p => ({ ...p, playerName: e.target.value }))} placeholder="Enter your name for leaderboard..." className="w-full bg-[#0a0a0f] border border-[#1e1e2d] p-3 rounded-xl outline-none focus:border-[#c9a227] text-white" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary flex-1 flex items-center justify-center gap-2" onClick={() => handleStart(false)}>STANDARD QUIZ</button>
              <button className="btn-secondary flex-1 flex items-center justify-center gap-2" onClick={() => handleStart(true)} style={{ borderColor: "#c9a227", color: "#c9a227" }}><Sparkles size={16} /> AI GENERATED</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (state.finished) {
    const correctCount = state.answers.filter((a, i) => a === state.questions[i].correctIndex).length;
    const performance = getPerformanceLabel(correctCount, state.questions.length);
    return (
      <section id="quiz" className="relative min-h-[100dvh] flex flex-col items-center justify-center px-5 md:px-12 pt-16 pb-12" style={{ zIndex: 2, backgroundColor: "#0a0a0f" }}>
        <div className="max-w-[1000px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="w-40 h-40 rounded-full flex flex-col items-center justify-center mx-auto mb-6" style={{ border: "3px solid #c9a227", boxShadow: "0 0 40px rgba(201, 162, 39, 0.2)" }}>
              <span className="font-display text-4xl" style={{ color: "#c9a227" }}>{Math.round((correctCount / state.questions.length) * 100)}%</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl mb-2" style={{ color: "#ffffff" }}>{correctCount} / {state.questions.length}</h2>
            <span className="label-ui inline-block px-4 py-2 rounded-full mb-8" style={{ backgroundColor: `${performance.color}20`, color: performance.color }}>
              <Award size={14} className="inline mr-1" />{performance.label}
            </span>

            <div className="flex flex-col gap-3">
              <button className="btn-primary flex items-center justify-center gap-2" onClick={handleRetry}><RotateCcw size={14} /> RETRY</button>
              <button className="btn-secondary flex items-center justify-center gap-2" onClick={onBackToGlobe}><Globe size={14} /> HOME</button>
            </div>
          </div>

          <div className="bg-[#13131f] border border-[#1e1e2d] p-6 rounded-2xl">
            <h3 className="label-ui mb-6" style={{ color: "#c9a227" }}>LEADERBOARD - {state.topic}</h3>
            <div className="flex flex-col gap-2">
              {leaderboard.length === 0 ? <p className="text-[#555560] text-center py-8">No scores yet. Be the first!</p> : leaderboard.map((entry, i) => (
                <div key={entry.id} className="flex items-center justify-between p-3 rounded-xl" style={{ backgroundColor: entry.playerName === state.playerName ? "rgba(201, 162, 39, 0.1)" : "#0a0a0f" }}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[#555560] w-5">{i + 1}.</span>
                    <span className="text-white font-medium">{entry.playerName}</span>
                  </div>
                  <span className="font-display text-[#c9a227]">{entry.score} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentQ = state.questions[state.currentIndex];
  const progress = ((state.currentIndex + 1) / state.questions.length) * 100;

  return (
    <section id="quiz" className="relative min-h-[100dvh] flex flex-col px-5 md:px-12 pt-24 pb-12" style={{ zIndex: 2, backgroundColor: "#0a0a0f" }}>
      <div className="max-w-[800px] mx-auto w-full flex-1 flex flex-col">
        <div className="w-full h-1 mb-8" style={{ backgroundColor: "#1e1e2d", borderRadius: "2px" }}>
          <div className="h-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: "#c9a227", borderRadius: "2px" }} />
        </div>

        <div className="p-6 md:p-8 mb-6" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "16px" }}>
          <span className="label-ui block mb-4" style={{ color: "#c9a227" }}>QUESTION {state.currentIndex + 1} OF {state.questions.length}</span>
          <span className="label-small inline-block px-2 py-1 rounded mb-4" style={{ backgroundColor: "rgba(201, 162, 39, 0.15)", color: "#c9a227" }}>{currentQ.country || "General"}</span>
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
            <button className="btn-primary flex items-center gap-2 animate-fade-in" aria-label={state.currentIndex < state.questions.length - 1 ? "Next question" : "Finish quiz"} onClick={handleNext}>
              {state.currentIndex < state.questions.length - 1 ? "NEXT" : "FINISH"} <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}