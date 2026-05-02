import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_CONTEXT = `You are "Democracy Decoded AI", an expert on global democratic processes, elections, voting rights, and constitutional law. 
Your goal is to educate users about voting methods, electoral history, democratic processes, and political systems around the world.
Only answer questions related to democracy and governance. If asked anything unrelated, politely redirect to democratic topics. 
Keep answers concise and educational. 
Current date: ${new Date().toLocaleDateString()}`;

export class DemocracyChat {
  private model;
  public history: { role: "user" | "model"; parts: { text: string }[] }[] = [];

  constructor() {
    this.model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_CONTEXT 
    });
  }

  async sendMessageStream(userMessage: string, onChunk: (text: string) => void) {
    if (!API_KEY) {
      onChunk("I'm sorry, but the Gemini API key is not configured.");
      return "I'm sorry, but the Gemini API key is not configured.";
    }

    try {
      const chat = this.model.startChat({
        history: this.history,
        generationConfig: { maxOutputTokens: 1000, temperature: 0.7 },
      });

      const result = await chat.sendMessageStream(userMessage);
      
      let fullResponse = '';
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;
        onChunk(fullResponse);
      }

      this.history.push(
        { role: "user", parts: [{ text: userMessage }] },
        { role: "model", parts: [{ text: fullResponse }] }
      );

      return fullResponse;
    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMsg = "I encountered an error while processing your request. Please try again later.";
      onChunk(errorMsg);
      return errorMsg;
    }
  }

  clearHistory() {
    this.history = [];
  }
}

export async function getGeminiResponse(prompt: string, history: any[] = []) {
  const chat = new DemocracyChat();
  chat.history = history;
  let response = "";
  await chat.sendMessageStream(prompt, (text) => { response = text; });
  return response;
}
