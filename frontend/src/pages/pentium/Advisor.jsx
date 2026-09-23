import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Loader2, Bot, User, RotateCcw, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Particles from "@/components/pentium/Particles";
import PentiumCanvas from "@/components/pentium/PentiumCanvas";
import { BRAND } from "@/lib/pentium";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const PEN_COLORS = ["#c9a662", "#e6cf98", "#f4efe4", "#9c7b3f"];

const GREETING = {
  role: "assistant",
  content:
    "Namaste! I'm the Pentium Home Advisor. Ask me about our premium apartments and villas across Kerala — projects like Eternia, Spring Green Villas and Harmony Heights — or tell me what you're looking for and I'll guide you. This panel on the left updates live as we chat.",
};

function newSession() {
  return (crypto.randomUUID && crypto.randomUUID()) || `s-${Date.now()}-${Math.random()}`;
}
function sessionId() {
  let id = localStorage.getItem("pentium_session");
  if (!id) {
    id = newSession();
    localStorage.setItem("pentium_session", id);
  }
  return id;
}

function Bubble({ role, children }) {
  const isUser = role === "user";
  return (
    <div className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl" style={isUser ? { background: "linear-gradient(135deg, var(--pen-gold-2), var(--pen-gold-deep))", color: "#1a140a" } : { background: "var(--pen-surface-2)", color: "var(--pen-gold-2)", border: "1px solid var(--pen-border)" }}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </span>
      <div className="max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed" style={isUser ? { background: "linear-gradient(135deg, var(--pen-gold-2), var(--pen-gold))", color: "#1a140a" } : { background: "var(--pen-surface)", color: "var(--pen-ink)", border: "1px solid var(--pen-border)" }}>
        {children}
      </div>
    </div>
  );
}

export default function Advisor() {
  const [messages, setMessages] = useState([GREETING]);
  const [view, setView] = useState("welcome");
  const [suggestions, setSuggestions] = useState([]);
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
        streamTimer.current = setTimeout(tick, 22);
      } else {
        setStreaming(false);
      }
    };
    streamTimer.current = setTimeout(tick, 22);
  };

  const send = useCallback(async (text, goto) => {
    if (goto) setView(goto);
    const msg = (text || "").trim();
    if (!msg) return;
    if (loading || streaming) return;
    setInput("");
    setSuggestions([]);
    setMessages((m) => [...m, { role: "user", content: msg }]);
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/assistant/chat`, { session_id: sid.current, message: msg });
      setLoading(false);
      if (!goto && data.panels && data.panels.length) setView(data.panels[0]);
      streamReply(data.reply);
      setSuggestions(data.suggestions || []);
      if (data.lead_submitted) {
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors: PEN_COLORS });
        toast.success("Enquiry sent to the Pentium team!");
      }
    } catch (e) {
      setLoading(false);
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, I'm having trouble right now. Please try again, or call us on " + BRAND.phone + "." }]);
    }
  }, [loading, streaming]);

  const reset = () => {
    clearTimeout(streamTimer.current);
    setStreaming(false);
    const id = newSession();
    localStorage.setItem("pentium_session", id);
    sid.current = id;
    setMessages([GREETING]);
    setView("welcome");
    setSuggestions([]);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden" style={{ background: "var(--pen-bg)" }}>
      <header className="flex h-[68px] shrink-0 items-center justify-between px-5 sm:px-8" style={{ background: "var(--pen-bg-top)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--pen-border)" }}>
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl font-display text-xl" style={{ background: "linear-gradient(135deg, var(--pen-gold-2), var(--pen-gold-deep))", color: "#1a140a" }}>P</span>
          <span className="hidden font-display text-lg sm:inline" style={{ color: "var(--pen-ink)" }}>Pentium <span className="pen-gold-text">Constructions</span></span>
        </Link>
        <div className="flex items-center gap-2">
          <a href={BRAND.phoneHref} className="hidden text-sm sm:inline" style={{ color: "var(--pen-fg-2)" }}>{BRAND.phone}</a>
          <Link to="/" className="pen-btn-ghost text-sm"><ArrowLeft className="h-4 w-4" /> Home</Link>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[1fr_400px]">
        {/* live canvas */}
        <div className="relative overflow-hidden bg-pen-mesh">
          <Particles count={20} />
          <div className="relative z-10 flex h-full items-center">
            <div className="mx-auto h-full max-h-[calc(100vh-68px)] w-full max-w-3xl overflow-hidden px-6 py-6">
              <div className="mb-3 flex items-center gap-2 font-display text-sm" style={{ color: "var(--pen-fg-3)" }}>
                <Sparkles className="h-4 w-4" style={{ color: "var(--pen-gold)" }} /> Live view
              </div>
              <div className="h-[calc(100%-2.25rem)] overflow-y-auto pen-scroll pr-1">
                <AnimatePresence mode="wait">
                  <motion.div key={view} initial={{ opacity: 0, y: 16, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.99 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="h-full">
                    <PentiumCanvas view={view} onAsk={send} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* chat sidebar */}
        <aside className="flex min-h-0 flex-col" style={{ background: "var(--pen-bg-2)", borderLeft: "1px solid var(--pen-border)" }}>
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--pen-border)" }}>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: "linear-gradient(135deg, var(--pen-gold-2), var(--pen-gold-deep))", color: "#1a140a" }}><Sparkles className="h-5 w-5" /></span>
              <div className="leading-tight">
                <p className="font-display text-sm" style={{ color: "var(--pen-ink)" }}>Pentium Home Advisor</p>
                <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "var(--pen-fg-3)" }}>
                  <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: "var(--pen-ok)" }} /> Always on · Claude
                </p>
              </div>
            </div>
            <button onClick={reset} className="grid h-9 w-9 place-items-center rounded-xl transition" style={{ color: "var(--pen-fg-3)" }} title="New conversation"><RotateCcw className="h-4 w-4" /></button>
          </div>

          <div ref={scrollRef} className="min-h-0 flex-1 space-y-3.5 overflow-y-auto pen-scroll p-4">
            {messages.map((m, i) => {
              const isStreamingLast = streaming && i === messages.length - 1 && m.role === "assistant";
              return (
                <Bubble key={i} role={m.role}>
                  {m.content}
                  {isStreamingLast && <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse align-middle" style={{ background: "var(--pen-gold)" }} />}
                </Bubble>
              );
            })}
            {loading && (
              <Bubble role="assistant"><span className="inline-flex items-center gap-1.5" style={{ color: "var(--pen-fg-3)" }}><Loader2 className="h-4 w-4 animate-spin" /> thinking…</span></Bubble>
            )}
          </div>

          {suggestions.length > 0 && !streaming && (
            <div className="flex flex-wrap gap-2 px-3 py-2.5" style={{ borderTop: "1px solid var(--pen-border)" }}>
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="rounded-full px-3 py-1.5 text-xs font-semibold transition" style={{ background: "var(--pen-surface)", color: "var(--pen-gold-2)", border: "1px solid var(--pen-border)" }}>{s}</button>
              ))}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 p-3" style={{ borderTop: "1px solid var(--pen-border)", background: "var(--pen-bg-top)" }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about projects, villas, visits…" className="pen-field flex-1 rounded-full" data-testid="pen-chat-input" />
            <button type="submit" disabled={loading || streaming || !input.trim()} className="grid h-11 w-11 shrink-0 place-items-center rounded-full disabled:opacity-50" style={{ background: "linear-gradient(135deg, var(--pen-gold-2), var(--pen-gold))", color: "#1a140a" }} data-testid="pen-chat-send"><Send className="h-5 w-5" /></button>
          </form>
        </aside>
      </div>
    </div>
  );
}
