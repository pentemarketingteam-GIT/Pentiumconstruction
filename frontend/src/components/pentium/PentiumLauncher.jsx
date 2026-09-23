import { Link, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";

// Floating gold launcher that opens the Pentium Home Advisor.
export default function PentiumLauncher() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/advisor")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <Link to="/advisor" aria-label="Open the Pentium Home Advisor" className="group relative block">
        <span className="absolute inset-0 -z-10 rounded-full" style={{ background: "rgba(201,166,98,0.35)", animation: "ping 2.6s cubic-bezier(0,0,0.2,1) infinite" }} />
        <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-2 font-display text-sm font-semibold opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100" style={{ background: "#12161d", color: "var(--pen-gold-2)", border: "1px solid var(--pen-border)" }}>
          Ask the Pentium Home Advisor
        </span>
        <span className="relative grid h-16 w-16 place-items-center rounded-full text-[#1a140a] animate-pen-float" style={{ background: "linear-gradient(135deg, var(--pen-gold-2), var(--pen-gold-deep))", boxShadow: "0 20px 44px -16px rgba(201,166,98,0.7)", border: "3px solid rgba(244,239,228,0.85)" }}>
          <Sparkles className="h-7 w-7" />
        </span>
      </Link>
    </div>
  );
}
