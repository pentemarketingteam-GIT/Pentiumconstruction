import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { Send, Sparkles, Loader2, Bot, User, Home, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/sop/Header";
import ParticleField from "@/components/sop/ParticleField";
import DynamicCanvas from "@/components/sop/DynamicCanvas";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const GREETING = {
  role: "assistant",
  content:
    "Hi! I'm the Play Assistant. Are you a parent looking for camps and clubs, or a school looking for PE, Swim:ED or wraparound care?",
};
const START_SUGGESTIONS = [
  "Book a holiday camp place",
  "Tell me about holiday camps",
  "I'm a school — what can you offer?",
  "How much are the camps?",
  "Tell me about Swim:ED",
  "Meet the team",
];

function newSession() {
  return (crypto.randomUUID && crypto.randomUUID()) || `s-${Date.now()}-${Math.random()}`;
}
function sessionId() {
  let id = localStorage.getItem("sop_session");
  if (!id) {
    id = newSession();
    localStorage.setItem("sop_session", id);
  }
  return id;
}

function Bubble({ role, children }) {
  const isUser = role === "user";
  return (
    <div className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${isUser ? "bg-sop-coral text-white" : "bg-sop-blue text-white"}`}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </span>
      <div className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed ${isUser ? "bg-sop-coral text-white" : "bg-white text-sop-ink ring-1 ring-sop-border"}`}>
        {children}
      </div>
    </div>
  );
}

export default function Explore() {
  const [messages, setMessages] = useState([GREETING]);
  const [panels, setPanels] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [audience, setAudience] = useState("unknown");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const sid = useRef(sessionId());

  const started = messages.some((m) => m.role === "user");

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const send = useCallback(async (text) => {
    const msg = (text || "").trim();
    if (!msg || loading) return;
    setInput("");
    setSuggestions([]);
    setMessages((m) => [...m, { role: "user", content: msg }]);
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/assistant/chat`, { session_id: sid.current, message: msg });
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      if (data.panels && data.panels.length) setPanels(data.panels);
      setSuggestions(data.suggestions || []);
      if (data.audience) setAudience(data.audience);
      if (data.lead_submitted) {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors: ["#2A54E4", "#FFC22E", "#2BC183", "#FF5C79", "#8B5CF6"] });
        toast.success("Enquiry sent to the School of Play team!");
      }
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, I'm having trouble right now. Please try again, or call us on 0161 726 5022." }]);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const reset = () => {
    const id = newSession();
    localStorage.setItem("sop_session", id);
    sid.current = id;
    setMessages([GREETING]);
    setPanels([]);
    setSuggestions([]);
    setAudience("unknown");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <div className="grid flex-1 lg:grid-cols-[1fr_400px]">
        {/* ===== Live content canvas (main) ===== */}
        <div className="relative overflow-hidden bg-play-mesh">
          <ParticleField density={0.45} className="opacity-60" />
          <div className="relative z-10 mx-auto h-full max-w-3xl px-6 py-10 lg:h-[calc(100vh-72px)] lg:overflow-y-auto">
            {!started ? (
              <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <span className="grid h-16 w-16 place-items-center rounded-3xl bg-sop-blue text-white shadow-play-lg animate-sop-float">
                  <span className="font-display text-2xl font-700">S</span>
                </span>
                <h1 className="mt-6 font-display text-4xl font-700 text-sop-ink sm:text-5xl">
                  Welcome to <span className="text-gradient-play">School of Play</span>
                </h1>
                <p className="mt-4 max-w-md text-lg text-muted-foreground">
                  Your personalised experience. Ask our Play Assistant anything to get started.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-2.5">
                  {START_SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => send(s)} className="rounded-full bg-white px-4 py-2.5 font-display text-sm font-600 text-sop-ink shadow-play ring-1 ring-sop-border transition hover:-translate-y-0.5 hover:text-sop-blue">
                      Try asking: {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4 flex items-center gap-2 font-display text-sm font-700 text-sop-ink/70">
                  <Sparkles className="h-4 w-4 text-sop-yellow" /> Live view
                  {audience !== "unknown" && (
                    <span className={`ml-1 rounded-full px-2.5 py-0.5 text-xs font-700 ${audience === "parent" ? "bg-sop-coral/12 text-sop-coral" : "bg-sop-blue/12 text-sop-blue"}`}>
                      {audience === "parent" ? "Parent" : "School"}
                    </span>
                  )}
                </div>
                <DynamicCanvas panels={panels} />
              </div>
            )}
          </div>
        </div>

        {/* ===== Persistent AI chat sidebar ===== */}
        <aside className="flex h-[80vh] flex-col border-t border-sop-border bg-sop-mist/40 lg:h-[calc(100vh-72px)] lg:border-l lg:border-t-0">
          {/* Sidebar header */}
          <div className="flex items-center justify-between border-b border-sop-border bg-white/70 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-sop-blue to-sop-purple text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-sm font-700 text-sop-ink">School of Play AI</p>
                <p className="text-[10px] font-700 uppercase tracking-wide text-muted-foreground">
                  <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-sop-green align-middle" />
                  Always on · Claude Sonnet 4.6
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link to="/" className="grid h-9 w-9 place-items-center rounded-xl text-sop-ink/60 transition hover:bg-sop-mist hover:text-sop-blue" title="Back to site">
                <Home className="h-4.5 w-4.5" />
              </Link>
              <button onClick={reset} className="grid h-9 w-9 place-items-center rounded-xl text-sop-ink/60 transition hover:bg-sop-mist hover:text-sop-blue" title="New conversation">
                <RotateCcw className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3.5 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role}>{m.content}</Bubble>
            ))}
            {loading && (
              <Bubble role="assistant">
                <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> thinking…</span>
              </Bubble>
            )}
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-sop-border px-3 py-2.5">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="rounded-full bg-white px-3 py-1.5 text-xs font-600 text-sop-blue ring-1 ring-sop-blue/15 transition hover:bg-sop-blue/10">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-sop-border bg-white/70 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about camps, clubs, PE…"
              className="flex-1 rounded-full border-2 border-sop-border bg-white px-4 py-2.5 text-[14px] text-sop-ink outline-none transition-colors focus:border-sop-blue"
            />
            <button type="submit" disabled={loading || !input.trim()} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sop-blue text-white shadow-play transition hover:bg-sop-bluedeep disabled:opacity-50">
              <Send className="h-5 w-5" />
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
