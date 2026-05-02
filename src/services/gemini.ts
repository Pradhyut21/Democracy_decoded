import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SYSTEM_PROMPT = `You are "Democracy Decoded AI", an expert electoral system guide. 
Your goal is to educate users about voting methods, electoral history, democratic processes, and political systems around the world.
Be concise, neutral, and educational. 
If asked about topics unrelated to elections, democracy, or political systems, politely redirect the user to ask about electoral topics.
Current date: ${new Date().toLocaleDateString()}`;

export async function getGeminiResponse(prompt: string, history: { role: string; parts: { text: string }[] }[] = []) {
  if (!API_KEY) {
    return "I'm sorry, but the Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.";
  }

  try {
    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage([{ text: `${SYSTEM_PROMPT}\n\nUser: ${prompt}` }]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while processing your request. Please try again later.";
  }
}
