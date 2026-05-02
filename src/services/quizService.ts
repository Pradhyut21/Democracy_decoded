import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateElectionQuiz(topic: string, difficulty: string = 'medium') {
  if (!API_KEY) throw new Error("API key not configured");

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `Generate 5 unique multiple choice questions about "${topic}" 
  in the context of global democratic processes and electoral systems at ${difficulty} difficulty.
  
  Return ONLY valid JSON in this exact format:
  {
    "questions": [
      {
        "id": "string",
        "country": "string",
        "question": "string",
        "options": ["string", "string", "string", "string"],
        "correctIndex": number,
        "explanation": "string"
      }
    ]
  }`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Strip markdown fences if present
    const json = text.replace(/```json|```/g, '').trim();
    return JSON.parse(json);
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    throw error;
  }
}
