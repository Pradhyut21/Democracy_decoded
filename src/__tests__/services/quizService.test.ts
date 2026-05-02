import { describe, it, expect, vi } from 'vitest';
import { generateElectionQuiz } from '@/services/quizService';

vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(function() {
    return {
      getGenerativeModel: vi.fn(() => ({
        generateContent: vi.fn(async () => ({
          response: {
            text: () => JSON.stringify({
              questions: [{
                id: "1",
                country: "India",
                question: "What is the voting age in India?",
                options: ["16", "18", "21", "25"],
                correctIndex: 1,
                explanation: "The 61st Amendment lowered it to 18."
              }]
            })
          }
        }))
      }))
    };
  }),
}));

describe('generateElectionQuiz', () => {
  it('returns questions array', async () => {
    const quiz = await generateElectionQuiz('voting rights');
    expect(quiz.questions).toBeDefined();
    expect(Array.isArray(quiz.questions)).toBe(true);
    expect(quiz.questions.length).toBe(1);
  });

  it('each question has required fields', async () => {
    const quiz = await generateElectionQuiz('voting rights');
    const q = quiz.questions[0];
    expect(q).toHaveProperty('question');
    expect(q).toHaveProperty('options');
    expect(q).toHaveProperty('correctIndex');
    expect(q).toHaveProperty('explanation');
  });
});
