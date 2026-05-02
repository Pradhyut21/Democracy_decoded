import { useState, useCallback, useRef, useEffect } from 'react';
import { DemocracyChat }             from '../services/geminiService';
import { validateInput, sanitizeError, geminiRateLimiter } from '../utils/security';
import { Analytics }                 from '../services/analyticsService';
import { withRetry }                 from '../utils/performance';

export interface Message {
  role: 'user' | 'bot';
  text: string;
  id: string;
  isStreaming?: boolean;
}

/**
 * Production-ready Gemini chat hook with streaming, retry, and analytics
 */
export function useGemini() {
  const [messages,  setMessages]  = useState<Message[]>([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const [streaming, setStreaming] = useState('');
  const chatRef                   = useRef<DemocracyChat | null>(null);

  useEffect(() => {
    chatRef.current = new DemocracyChat();
    return () => { chatRef.current?.clearHistory(); };
  }, []);

  const sendMessage = useCallback(async (rawInput: string) => {
    const { valid, sanitized, error: validationError } = validateInput(rawInput);
    if (!valid) { setError(validationError || 'Invalid input'); return; }

    if (!geminiRateLimiter.canCall()) {
      setError(`Rate limit reached. Please wait ${
        Math.ceil(geminiRateLimiter.resetInMs / 1000)
      } seconds.`);
      return;
    }

    setError(null);
    setLoading(true);
    setStreaming('');

    const userMsg: Message = { role: 'user', text: sanitized || rawInput, id: crypto.randomUUID() };
    setMessages((prev) => [...prev, userMsg]);

    const botMsgId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      { role: 'bot', text: '', id: botMsgId, isStreaming: true },
    ]);

    try {
      Analytics.messageSent((sanitized || rawInput).length);

      let accumulated = '';
      await withRetry(
        () => chatRef.current?.sendMessage(sanitized || rawInput, (chunk: string) => {
          accumulated += chunk;
          setStreaming(accumulated);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === botMsgId
                ? { ...m, text: accumulated }
                : m
            )
          );
        }),
        2
      );

      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId ? { ...m, isStreaming: false } : m
        )
      );
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.id !== botMsgId));
      setError(sanitizeError(err));
    } finally {
      setLoading(false);
      setStreaming('');
    }
  }, []);

  const reset = useCallback(() => {
    chatRef.current?.clearHistory();
    setMessages([]);
    setError(null);
    setStreaming('');
  }, []);

  return {
    messages,
    loading,
    error,
    streaming,
    sendMessage,
    reset,
    remainingCalls: geminiRateLimiter.remainingCalls,
  };
}
