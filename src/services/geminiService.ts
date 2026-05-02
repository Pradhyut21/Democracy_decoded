import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { config } from '../config/env';

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

/** Safety settings — prevent harmful outputs */
const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT,       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

const SYSTEM_INSTRUCTION = `You are DemocracyBot, an expert educational assistant 
specializing in Indian democratic processes, constitutional law, voting rights, 
election procedures, and civic education. 

Rules you MUST follow:
1. Only answer questions related to democracy, governance, and civic topics.
2. If asked anything unrelated, politely redirect: "I specialize in democracy education. 
   Try asking about voting, elections, or constitutional rights!"
3. Keep answers educational, accurate, and concise (under 200 words).
4. Always cite constitutional articles or election commission rules when relevant.
5. Use simple language suitable for all citizens.
6. Never make up facts — if uncertain, say so clearly.`;

const GENERATION_CONFIG = {
  temperature:     0.7,
  topP:            0.8,
  topK:            40,
  maxOutputTokens: 512,
};

/**
 * Multi-turn conversation with Gemini — maintains context across messages
 */
export class DemocracyChat {
  #history: any[] = [];
  #model: any = null;
  #messageCount = 0;

  static MAX_MESSAGES = 50; // prevent context overflow

  constructor() {
    this.#model = genAI.getGenerativeModel({
      model:           config.gemini.model,
      // systemInstruction: SYSTEM_INSTRUCTION, // Some SDK versions might not support this in getGenerativeModel
    });
  }

  /**
   * Send message and stream response back chunk by chunk
   */
  async sendMessage(userMessage: string, onChunk: (text: string) => void = () => {}) {
    if (this.#messageCount >= DemocracyChat.MAX_MESSAGES) {
      this.clearHistory();
    }

    // Workaround for system instruction if not supported in getGenerativeModel directly
    const chat = this.#model.startChat({ 
      history: [
        { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION + "\n\nUnderstood. I will follow these rules." }] },
        { role: 'model', parts: [{ text: "Understood. I am DemocracyBot, your expert guide to Indian democracy." }] },
        ...this.#history 
      ] 
    });

    const result = await chat.sendMessageStream(userMessage);

    let fullText = '';
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      if (typeof onChunk === 'function') onChunk(chunkText);
    }

    // Update history for context continuity
    this.#history.push(
      { role: 'user',  parts: [{ text: userMessage }] },
      { role: 'model', parts: [{ text: fullText }] }
    );
    this.#messageCount++;

    return fullText;
  }

  /** Clear conversation history */
  clearHistory() {
    this.#history     = [];
    this.#messageCount = 0;
  }

  get history() { return this.#history; }
}

/**
 * Generate AI-powered quiz questions on a democracy topic
 */
export async function generateQuiz(topic: string, difficulty = 'medium') {
  const model = genAI.getGenerativeModel({
    model:           config.gemini.model,
    generationConfig: { ...GENERATION_CONFIG, temperature: 0.4 },
  });

  const prompt = `Create exactly 5 multiple choice questions about "${topic}" 
in Indian democracy at ${difficulty} difficulty level.

CRITICAL: Return ONLY a valid JSON object. No markdown, no explanation, no backticks.

Required JSON format:
{
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Brief explanation of the correct answer.",
      "articleRef": "Article 324 of the Constitution (optional)"
    }
  ]
}`;

  const result = await model.generateContent(prompt);
  const raw    = result.response.text();

  // Robust JSON extraction
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Invalid quiz response format from AI');

  const parsed = JSON.parse(jsonMatch[0]);

  if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error('Quiz generation returned no questions');
  }

  return parsed;
}
