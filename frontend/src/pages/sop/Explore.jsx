import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Loader2, Bot, User, RotateCcw, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ParticleField from "@/components/sop/ParticleField";
import DynamicCanvas from "@/components/sop/DynamicCanvas";
import { BookNowButton } from "@/components/sop/Primitives";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const GREETING = {
  role: "assistant",
  content:
    "Hi! I'm the Play Assistant. Are you a parent looking for camps and clubs, or a school looking for PE, Swim:ED or wraparound care? This panel on the left updates live as we chat.",
};

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
  const [view, setView] = useState("welcome");
  const [suggestions, setSuggestions] = useState([]);
  const [audience, setAudience] = useState("unknown");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const scrollRef = useRef(null);
  const sid = useRef(sessionId());
  const streamTimer = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading, streaming]);

  useEffect(() => () => clearTimeout(streamTimer.current), []);

  // Reveal the assistant reply word-by-word for a lively, "typing" feel.
  const streamReply = (fullText) => {
    const tokens = String(fullText || "").split(/(\s+)/);
    setMessages((m) => [...m, { role: "assistant", content: "" }]);
    setStreaming(true);
    let i = 0;
    const tick = () => {
      i += 1;
      setMessages((m) => {
        const copy = m.slice();
        const last = copy[copy.length - 1];
        if (last && last.role === "assistant") {
          copy[copy.length - 1] = { ...last, content: tokens.slice(0, i).join("") };
        }
        return copy;
      });
      if (i < tokens.length) {
        streamTimer.current = setTimeout(tick, 24);
      } else {
        setStreaming(false);
      }
    };
    streamTimer.current = setTimeout(tick, 24);
  };

  const send = useCallback(async (text, goto) => {
    if (goto) setView(goto);            // ALWAYS change the left panel instantly, even mid-reply
    const msg = (text || "").trim();
    if (!msg) return;
    if (loading || streaming) return;   // avoid overlapping requests / streams
    setInput("");
    setSuggestions([]);
    setMessages((m) => [...m, { role: "user", content: msg }]);
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/assistant/chat`, { session_id: sid.current, message: msg });
      setLoading(false);
      if (!goto && data.panels && data.panels.length) setView(data.panels[0]);
      if (data.audience) setAudience(data.audience);
      streamReply(data.reply);          // stream the text in word-by-word
      setSuggestions(data.suggestions || []);
      if (data.lead_submitted) {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors: ["#2A54E4", "#FFC22E", "#2BC183", "#FF5C79", "#8B5CF6"] });
        toast.success("Enquiry sent to the School of Play team!");
      }
    } catch (e) {
      setLoading(false);
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, I'm having trouble right now. Please try again, or call us on 0161 726 5022." }]);
    }
  }, [loading, streaming]);

  const reset = () => {
    clearTimeout(streamTimer.current);
    setStreaming(false);
    const id = newSession();
    localStorage.setItem("sop_session", id);
    sid.current = id;
    setMessages([GREETING]);
    setView("welcome");
    setSuggestions([]);
    setAudience("unknown");
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white">
      {/* Minimal top bar (focused AI experience) */}
      <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-sop-border bg-white/90 px-5 backdrop-blur-md sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-sop-blue text-white shadow-play"><span className="font-display text-xl font-700">S</span></span>
          <span className="hidden font-display text-xl font-700 text-sop-ink sm:inline">School <span className="text-sop-coral">of</span> Play</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 font-display text-sm font-600 text-sop-ink ring-2 ring-sop-border transition hover:ring-sop-blue">
            <ArrowLeft className="h-4 w-4" /> Back to website
          </Link>
          <BookNowButton size="md" className="hidden sm:inline-flex" />
        </div>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[1fr_400px]">
        {/* ===== Live, seamless, interactive canvas (no scroll) ===== */}
        <div className="relative overflow-hidden bg-play-mesh">
          <ParticleField density={0.4} className="opacity-60" />
          <div className="relative z-10 flex h-full items-center">
            <div className="mx-auto h-full max-h-[calc(100vh-72px)] w-full max-w-3xl overflow-hidden px-6 py-6">
              <div className="mb-3 flex items-center gap-2 font-display text-sm font-700 text-sop-ink/70">
                <Sparkles className="h-4 w-4 text-sop-yellow" /> Live view
                {audience !== "unknown" && (
                  <span className={`ml-1 rounded-full px-2.5 py-0.5 text-xs font-700 ${audience === "parent" ? "bg-sop-coral/12 text-sop-coral" : "bg-sop-blue/12 text-sop-blue"}`}>
                    {audience === "parent" ? "Parent" : "School"}
                  </span>
                )}
              </div>
              <div className="h-[calc(100%-2.25rem)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 16, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.99 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    <DynamicCanvas view={view} onAsk={send} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Persistent AI chat sidebar ===== */}
        <aside className="flex min-h-0 flex-col border-t border-sop-border bg-sop-mist/40 lg:border-l lg:border-t-0">
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
              <button onClick={reset} className="grid h-9 w-9 place-items-center rounded-xl text-sop-ink/60 transition hover:bg-sop-mist hover:text-sop-blue" title="New conversation"><RotateCcw className="h-4 w-4" /></button>
            </div>
          </div>

          <div ref={scrollRef} className="min-h-0 flex-1 space-y-3.5 overflow-y-auto p-4">
            {messages.map((m, i) => {
              const isStreamingLast = streaming && i === messages.length - 1 && m.role === "assistant";
              return (
                <Bubble key={i} role={m.role}>
                  {m.content}
                  {isStreamingLast && <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-sop-blue align-middle" />}
                </Bubble>
              );
            })}
            {loading && (
              <Bubble role="assistant"><span className="inline-flex items-center gap-1.5 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> thinking…</span></Bubble>
            )}
          </div>

          {suggestions.length > 0 && !streaming && (
            <div className="flex flex-wrap gap-2 border-t border-sop-border px-3 py-2.5">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="rounded-full bg-white px-3 py-1.5 text-xs font-600 text-sop-blue ring-1 ring-sop-blue/15 transition hover:bg-sop-blue/10">{s}</button>
              ))}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-sop-border bg-white/70 p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about camps, clubs, PE…" className="flex-1 rounded-full border-2 border-sop-border bg-white px-4 py-2.5 text-[14px] text-sop-ink outline-none transition-colors focus:border-sop-blue" />
            <button type="submit" disabled={loading || streaming || !input.trim()} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sop-blue text-white shadow-play transition hover:bg-sop-bluedeep disabled:opacity-50"><Send className="h-5 w-5" /></button>
          </form>
        </aside>
      </div>
    </div>
  );
}
