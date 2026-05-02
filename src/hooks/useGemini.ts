import { useState } from 'react';
import { getGeminiResponse } from '@/services/gemini';

interface Message {
  role: "user" | "model";
  parts: { text: string }[];
}

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ask = async (question: string, history: Message[] = []) => {
    setLoading(true);
    setError(null);
    try {
      const answer = await getGeminiResponse(question, history);
      return answer;
    } catch (e: any) {
      setError(e.message || 'An error occurred');
      return 'I encountered an error while processing your request.';
    } finally {
      setLoading(false);
    }
  };

  return { ask, loading, error };
}
