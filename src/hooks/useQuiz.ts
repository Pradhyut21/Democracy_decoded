import { useState, useCallback } from 'react';
import { generateQuiz }     from '../services/geminiService';
import { sanitizeError }    from '../utils/security';
import { memoizeAsync }     from '../utils/performance';
import { Analytics }        from '../services/analyticsService';

const cachedGenerateQuiz = memoizeAsync(generateQuiz, 10 * 60 * 1000); 

export const QUIZ_TOPICS = [
  'Indian Election Commission',
  'Voting Rights and NOTA',
  'Constitutional Amendments',
  'Lok Sabha Elections',
  'Model Code of Conduct',
  'EVMs and VVPATs',
  'Panchayati Raj System',
  'Fundamental Rights',
];

/**
 * Manages quiz state
 */
export function useQuiz() {
  const [quiz,       setQuiz]       = useState<any>(null);
  const [answers,    setAnswers]    = useState<Record<number, number>>({});
  const [submitted,  setSubmitted]  = useState(false);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState<string | null>(null);
  const [score,      setScore]      = useState<any>(null);

  const startQuiz = useCallback(async (topic: string, difficulty = 'medium') => {
    setLoading(true);
    setError(null);
    setAnswers({});
    setSubmitted(false);
    setScore(null);

    try {
      Analytics.quizStarted(topic, difficulty);
      const data = await cachedGenerateQuiz(topic, difficulty);
      setQuiz(data);
    } catch (err) {
      setError(sanitizeError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  const selectAnswer = useCallback((questionId: number, answerIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  }, [submitted]);

  const submitQuiz = useCallback(() => {
    if (!quiz || submitted) return null;

    const correct = quiz.questions.reduce((count: number, q: any) => {
      return answers[q.id] === q.correctIndex ? count + 1 : count;
    }, 0);

    const result = {
      score:       correct,
      total:       quiz.questions.length,
      percentage:  Math.round((correct / quiz.questions.length) * 100),
      topic:       quiz.topic,
      difficulty:  quiz.difficulty,
    };

    setScore(result);
    setSubmitted(true);
    Analytics.quizCompleted(quiz.topic, correct, quiz.questions.length);

    return result;
  }, [quiz, answers, submitted]);

  const resetQuiz = useCallback(() => {
    setQuiz(null);
    setAnswers({});
    setSubmitted(false);
    setScore(null);
    setError(null);
  }, []);

  const progress = quiz
    ? Math.round((Object.keys(answers).length / quiz.questions.length) * 100)
    : 0;

  return {
    quiz, answers, submitted, loading, error, score, progress,
    startQuiz, selectAnswer, submitQuiz, resetQuiz,
    isComplete: quiz ? Object.keys(answers).length === quiz.questions.length : false,
  };
}
