import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Compass, User } from "lucide-react";
import { getGeminiResponse } from "@/services/gemini";

interface Message { id: string; role: "user" | "assistant"; content: string; timestamp: Date; }

const SUGGESTED_PROMPTS = ["Explain the Electoral College", "How does proportional representation work?", "What is gerrymandering?", "Compare parliamentary vs presidential systems"];

const WELCOME: Message = { id: "welcome", role: "assistant", content: "Hello! I'm your electoral systems guide. Ask me anything about how elections work around the world, from voting methods to campaign strategies.", timestamp: new Date() };

interface AIAssistantProps { onBackToGlobe: () => void; }

export default function AIAssistant({ onBackToGlobe }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: textToSend.trim(), timestamp: new Date() };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setIsTyping(true);

    // Prepare history for Gemini
    const history = messages.slice(1).map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const response = await getGeminiResponse(userMsg.content, history);
    
    const aiMsg: Message = { 
      id: (Date.now() + 1).toString(), 
      role: "assistant", 
      content: response, 
      timestamp: new Date() 
    };
    
    setMessages((p) => [...p, aiMsg]);
    setIsTyping(false);
  };

  const handlePromptClick = (prompt: string) => { 
    handleSend(prompt);
  };

  return (
    <section id="assistant" className="relative min-h-[100dvh] flex flex-col pt-20 pb-4" style={{ zIndex: 2, backgroundColor: "#0a0a0f" }}>
      <div className="max-w-[900px] mx-auto w-full flex-1 flex flex-col px-5 md:px-0">
        <div className="flex items-center justify-between py-4 border-b border-[#1e1e2d]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(201, 162, 39, 0.1)" }}>
              <Sparkles size={20} style={{ color: "#c9a227" }} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Electoral Guide</h2>
              <p className="text-xs text-[#555560]">Powered by Democracy Decoded AI</p>
            </div>
          </div>
          <button onClick={onBackToGlobe} aria-label="Back to Globe" className="px-4 py-2 rounded-lg text-xs font-medium transition-colors" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", color: "#a0a0b0" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c9a227")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1e1e2d")}>
            Back to Globe
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-6 py-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: msg.role === "assistant" ? "rgba(201, 162, 39, 0.2)" : "#1e1e2d" }}>
                {msg.role === "assistant" ? <Sparkles size={14} style={{ color: "#c9a227" }} /> : <User size={14} style={{ color: "#a0a0b0" }} />}
              </div>
              <div className="max-w-[75%] md:max-w-[70%] px-4 py-3" style={{ backgroundColor: msg.role === "user" ? "#c9a227" : "#13131f", border: msg.role === "assistant" ? "1px solid #1e1e2d" : "none", borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px" }}>
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap" style={{ color: msg.role === "user" ? "#0a0a0f" : "#ffffff" }}>{msg.content}</p>
                <span className="label-small block mt-2" style={{ color: msg.role === "user" ? "rgba(10, 10, 15, 0.5)" : "#555560" }}>{msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
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

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button key={prompt} onClick={() => handlePromptClick(prompt)} aria-label={`Ask about ${prompt}`} className="px-4 py-2 text-[13px] transition-all duration-150" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "32px", color: "#a0a0b0" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = "#c9a227"; (e.target as HTMLElement).style.color = "#c9a227"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = "#1e1e2d"; (e.target as HTMLElement).style.color = "#a0a0b0"; }}>{prompt}</button>
            ))}
          </div>
        )}

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "12px" }}>
              <Compass size={16} style={{ color: "#555560" }} />
              <input type="text" placeholder="Ask about elections, voting systems, or democracy..." aria-label="Question about elections" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()} className="flex-1 bg-transparent border-none outline-none text-[15px]" style={{ color: "#ffffff" }} />
            </div>
            <button onClick={() => handleSend()} disabled={!input.trim() || isTyping} aria-label="Send message" className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-150 flex-shrink-0"
              style={{ backgroundColor: input.trim() && !isTyping ? "#c9a227" : "#1e1e2d", cursor: input.trim() && !isTyping ? "pointer" : "default" }}>
              <Send size={16} style={{ color: input.trim() && !isTyping ? "#0a0a0f" : "#555560" }} />
            </button>
          </div>
          <p className="label-small text-center mt-3" style={{ color: "#555560" }}>AI responses are for educational purposes only</p>
        </div>
      </div>
    </section>
  );
}