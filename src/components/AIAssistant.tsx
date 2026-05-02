import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Sparkles, User, RotateCcw, AlertCircle, Compass } from "lucide-react";
import { useGemini } from "@/hooks/useGemini";
import DOMPurify from "dompurify";

interface Message { id: string; role: "user" | "assistant"; content: string; timestamp: Date; }

const SUGGESTED_PROMPTS = ["Explain the Electoral College", "How does proportional representation work?", "What is gerrymandering?", "Compare parliamentary vs presidential systems"];

const WELCOME: Message = { id: "welcome", role: "assistant", content: "Hello! I'm your electoral systems guide. Ask me anything about how elections work around the world, from voting methods to campaign strategies.", timestamp: new Date() };

interface AIAssistantProps { onBackToGlobe: () => void; }

export default function AIAssistant({ onBackToGlobe }: AIAssistantProps) {
  const [localMessages, setLocalMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [streamingText, setStreamingText] = useState("");
  const { sendMessage, loading: isTyping, error, reset } = useGemini();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [localMessages, streamingText, isTyping]);

  const handleSend = useCallback(async (textOverride?: string) => {
    const rawInput = textOverride || input;
    if (!rawInput.trim() || isTyping) return;

    const sanitizedInput = DOMPurify.sanitize(rawInput.trim());
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: sanitizedInput, timestamp: new Date() };
    
    setLocalMessages((p) => [...p, userMsg]);
    setInput("");
    setStreamingText("");

    await sendMessage(sanitizedInput, (chunk) => {
      setStreamingText(chunk);
    });

    setLocalMessages((p) => {
      return [...p, { 
        id: Date.now().toString(), 
        role: "assistant", 
        content: streamingText || "...", 
        timestamp: new Date() 
      }];
    });
    
    setStreamingText("");
  }, [input, isTyping, sendMessage, streamingText]);

  // Sync streaming text to final message when typing finishes
  useEffect(() => {
    if (!isTyping && streamingText) {
      setLocalMessages(p => {
        // Remove the temporary assistant message if we are replacing it
        const filtered = p.filter(m => m.content !== "...");
        return [...filtered, {
          id: Date.now().toString(),
          role: "assistant",
          content: streamingText,
          timestamp: new Date()
        }];
      });
      setStreamingText("");
    }
  }, [isTyping, streamingText]);

  const handleReset = () => {
    reset();
    setLocalMessages([WELCOME]);
    setStreamingText("");
  };

  return (
    <section id="assistant" aria-label="Electoral Systems AI Guide" className="relative min-h-[100dvh] flex flex-col pt-20 pb-4" style={{ zIndex: 2, backgroundColor: "#0a0a0f" }}>
      <div className="max-w-[900px] mx-auto w-full flex-1 flex flex-col px-5 md:px-0">
        <div className="flex items-center justify-between py-4 border-b border-[#1e1e2d]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(201, 162, 39, 0.1)" }}>
              <Sparkles size={20} style={{ color: "#c9a227" }} />
            </div>
            <div>
              <h2 id="chat-heading" className="text-lg font-bold text-white">Electoral Guide</h2>
              <p className="text-xs text-[#555560]">Advanced Gemini 1.5 Flash</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleReset} aria-label="Clear conversation" className="p-2 rounded-lg transition-colors border border-[#1e1e2d] text-[#a0a0b0] hover:text-white">
              <RotateCcw size={18} />
            </button>
            <button onClick={onBackToGlobe} aria-label="Back to Globe" className="px-4 py-2 rounded-lg text-xs font-medium transition-colors" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", color: "#a0a0b0" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c9a227")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1e1e2d")}>
              Back to Globe
            </button>
          </div>
        </div>

        <div role="log" aria-live="polite" aria-relevant="additions" className="flex-1 overflow-y-auto flex flex-col gap-6 py-6 custom-scrollbar">
          {localMessages.map((msg) => (
            <article key={msg.id} aria-label={`${msg.role === 'user' ? 'You' : 'Electoral Guide'}: ${msg.content}`} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: msg.role === "assistant" ? "rgba(201, 162, 39, 0.2)" : "#1e1e2d" }}>
                {msg.role === "assistant" ? <Sparkles size={14} style={{ color: "#c9a227" }} /> : <User size={14} style={{ color: "#a0a0b0" }} />}
              </div>
              <div className="max-w-[85%] md:max-w-[75%] px-4 py-3 shadow-lg" style={{ backgroundColor: msg.role === "user" ? "#c9a227" : "#13131f", border: msg.role === "assistant" ? "1px solid #1e1e2d" : "none", borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px" }}>
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap" style={{ color: msg.role === "user" ? "#0a0a0f" : "#ffffff" }}>{msg.content}</p>
                <span className="label-small block mt-2 opacity-60" style={{ color: msg.role === "user" ? "#0a0a0f" : "#555560" }}>{msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </article>
          ))}
          {streamingText && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201, 162, 39, 0.2)" }}>
                <Sparkles size={14} style={{ color: "#c9a227" }} />
              </div>
              <div className="max-w-[85%] md:max-w-[75%] px-4 py-3" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "16px 16px 16px 4px" }}>
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-white">{streamingText}</p>
              </div>
            </div>
          )}
          {isTyping && !streamingText && (
            <div role="status" aria-label="Electoral Guide is thinking" className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(201, 162, 39, 0.2)" }}>
                <Sparkles size={14} style={{ color: "#c9a227" }} />
              </div>
              <div className="px-4 py-3 flex items-center gap-1" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "16px 16px 16px 4px" }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: "#c9a227", animation: `typingDot 1.4s ease-in-out ${i * 0.15}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {error && (
          <div role="alert" className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {localMessages.length <= 1 && !isTyping && (
          <div className="flex flex-wrap gap-2 mb-4">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button key={prompt} onClick={() => handleSend(prompt)} aria-label={`Ask about ${prompt}`} className="px-4 py-2 text-[13px] transition-all duration-150" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "32px", color: "#a0a0b0" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#c9a227"; (e.currentTarget as HTMLElement).style.color = "#c9a227"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#1e1e2d"; (e.currentTarget as HTMLElement).style.color = "#a0a0b0"; }}>{prompt}</button>
            ))}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="mt-4" noValidate>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "12px" }}>
              <Compass size={16} style={{ color: "#555560" }} />
              <label htmlFor="chat-input" className="sr-only">Ask a question about democracy</label>
              <input 
                id="chat-input"
                ref={inputRef}
                type="text" 
                placeholder="Ask about elections, voting systems, or democracy..." 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                maxLength={500}
                autoComplete="off"
                className="flex-1 bg-transparent border-none outline-none text-[15px]" 
                style={{ color: "#ffffff" }} 
              />
            </div>
            <button type="submit" disabled={!input.trim() || isTyping} aria-label="Send message" className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-150 flex-shrink-0"
              style={{ backgroundColor: input.trim() && !isTyping ? "#c9a227" : "#1e1e2d", cursor: input.trim() && !isTyping ? "pointer" : "default" }}>
              <Send size={16} style={{ color: input.trim() && !isTyping ? "#0a0a0f" : "#555560" }} />
            </button>
          </div>
          <p id="input-hint" className="label-small text-center mt-3" style={{ color: "#555560" }}>Max 500 characters. AI responses for educational purposes.</p>
        </form>
      </div>
    </section>
  );
}