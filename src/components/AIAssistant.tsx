import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Compass, User } from "lucide-react";

interface Message { id: string; role: "user" | "assistant"; content: string; timestamp: Date; }

const SUGGESTED_PROMPTS = ["Explain the Electoral College", "How does proportional representation work?", "What is gerrymandering?", "Compare parliamentary vs presidential systems"];

const WELCOME: Message = { id: "welcome", role: "assistant", content: "Hello! I'm your electoral systems guide. Ask me anything about how elections work around the world, from voting methods to campaign strategies.", timestamp: new Date() };

const AI_RESPONSES: Record<string, string> = {
  "electoral college": "The Electoral College is the system used in the United States to elect the President. Each state gets a number of electors equal to its total congressional delegation (House seats + Senate seats). There are 538 total electors, and a candidate needs 270 to win. When citizens vote in a presidential election, they're actually voting for a slate of electors pledged to their chosen candidate.",
  "proportional representation": "Proportional representation (PR) is an electoral system where parties gain seats in proportion to the number of votes cast for them. Unlike winner-take-all systems, PR ensures that smaller parties can gain representation if they meet a threshold. Countries using PR include Germany, Netherlands, Israel, and New Zealand.",
  gerrymandering: "Gerrymandering is the practice of drawing electoral district boundaries to favor one political party over another. It's named after Elbridge Gerry, who as Massachusetts governor in 1812 approved a district shaped like a salamander ('gerry-mander'). Techniques include 'packing' and 'cracking' opposition voters.",
  "parliamentary vs presidential": "In a parliamentary system (UK, Germany, India), the executive derives legitimacy from the legislature and the Prime Minister can be removed by a vote of no confidence. In a presidential system (US, Brazil), the President is elected separately and serves a fixed term. Parliamentary systems tend to have faster policy implementation; presidential systems have stronger checks and balances.",
  "voter turnout": "Voter turnout varies dramatically worldwide. Countries with compulsory voting like Australia (91%) and Belgium (88%) have the highest turnout. Among voluntary systems, Sweden (87%) and South Korea (77%) are high, while the United States averages around 55-67% in presidential elections.",
  "first past the post": "First-Past-The-Post (FPTP) is an electoral system where the candidate with the most votes in a constituency wins, even without a majority. It's used in the UK, US, Canada, and India. Advantages include simplicity and stable governments. Disadvantages include vote wasting and limited representation for smaller parties.",
  "ranked choice": "Ranked Choice Voting (RCV) allows voters to rank candidates by preference. If no candidate has a majority, the lowest-ranked candidate is eliminated and their votes redistributed until someone has a majority. RCV is used in Australia's House, Ireland's presidential elections, and some US cities.",
  "swing state": "A swing state is a US state where no single candidate or party has overwhelming support, making it competitive in presidential elections. Recent swing states include Pennsylvania, Michigan, Wisconsin, Arizona, Georgia, and Nevada. These states receive disproportionate campaign attention.",
  "coalition government": "A coalition government forms when no single party wins a majority of seats in a parliamentary election, and multiple parties agree to govern together. This is common in proportional representation systems like Germany, Netherlands, and Israel.",
  "election security": "Election security encompasses measures to protect the integrity of voting processes. Key aspects include: voter registration verification, secure ballot handling, paper trails for electronic voting, observation by monitors, and cybersecurity for election infrastructure.",
  compulsory: "Compulsory voting requires eligible citizens to vote in elections, with penalties for non-compliance. Australia has had compulsory voting since 1924, with turnout consistently above 90%. Other countries include Belgium, Argentina, and Singapore.",
  "two round": "The Two-Round System requires a second election between the top two candidates if no one receives a majority in the first round. It's used in France, Brazil, Russia, and many other countries for presidential elections.",
  "women representation": "Women's representation in politics has grown significantly but remains unequal. Rwanda leads with 61% women in parliament, followed by Cuba (53%), Nicaragua (52%), and Mexico (50%). The global average is about 26%. Quota systems have been the most effective tool.",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [keyword, response] of Object.entries(AI_RESPONSES)) { if (lower.includes(keyword)) return response; }
  const defaults = ["That's an interesting question about electoral systems. While I don't have specific information on that exact topic, I can tell you that electoral systems vary widely across democracies. Would you like me to explain a specific system like proportional representation, first-past-the-post, or ranked choice voting?",
    "Great question! Electoral systems are complex and constantly evolving. I'd recommend exploring how different countries approach this. Would you like to know about a specific country's electoral process?",
    "I appreciate your curiosity about democratic processes! While I don't have a complete answer for that, the field of electoral studies is fascinating. Feel free to ask about voting systems, election history, or how specific countries conduct their elections."];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

interface AIAssistantProps { onBackToGlobe: () => void; }

export default function AIAssistant({}: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim(), timestamp: new Date() };
    setMessages((p) => [...p, userMsg]); setInput(""); setIsTyping(true);
    setTimeout(() => {
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: getAIResponse(userMsg.content), timestamp: new Date() };
      setMessages((p) => [...p, aiMsg]); setIsTyping(false);
    }, 800 + Math.random() * 600);
  };

  const handlePromptClick = (prompt: string) => { setInput(prompt); };

  return (
    <section id="assistant" className="relative min-h-[100dvh] flex flex-col pt-20 pb-4" style={{ zIndex: 2, backgroundColor: "#0a0a0f" }}>
      <div className="max-w-[900px] mx-auto w-full flex-1 flex flex-col px-5 md:px-0">
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
              <button key={prompt} onClick={() => handlePromptClick(prompt)} className="px-4 py-2 text-[13px] transition-all duration-150" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "32px", color: "#a0a0b0" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = "#c9a227"; (e.target as HTMLElement).style.color = "#c9a227"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = "#1e1e2d"; (e.target as HTMLElement).style.color = "#a0a0b0"; }}>{prompt}</button>
            ))}
          </div>
        )}

        <div className="mt-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-5 py-3" style={{ backgroundColor: "#13131f", border: "1px solid #1e1e2d", borderRadius: "12px" }}>
              <Compass size={16} style={{ color: "#555560" }} />
              <input type="text" placeholder="Ask about elections, voting systems, or democracy..." value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()} className="flex-1 bg-transparent border-none outline-none text-[15px]" style={{ color: "#ffffff" }} />
            </div>
            <button onClick={handleSend} disabled={!input.trim() || isTyping} className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-150 flex-shrink-0"
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