import { Link, useLocation } from "react-router-dom";
import { Wand2 } from "lucide-react";

/**
 * PlayOrb — a creative floating launcher (NOT a chat bubble).
 * A playful gradient "play orb" with pulsing rings and little floating
 * confetti squares. Clicking it opens the AI-interactive experience.
 */
export default function PlayLauncher() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/explore")) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <Link to="/explore" aria-label="Open the interactive Play Assistant" className="group relative block">
        {/* pulsing rings */}
        <span className="absolute inset-0 -z-10 rounded-full bg-sop-blue/30 animate-ping" style={{ animationDuration: "2.4s" }} />
        <span className="absolute inset-0 -z-10 scale-110 rounded-full bg-sop-purple/20 animate-ping" style={{ animationDuration: "3.2s" }} />

        {/* floating confetti squares */}
        <span className="pointer-events-none absolute -left-2 -top-2 h-3 w-3 rotate-12 rounded-[3px] bg-sop-yellow animate-sop-float-slow" />
        <span className="pointer-events-none absolute -right-3 top-1 h-2.5 w-2.5 -rotate-6 rounded-[3px] bg-sop-coral animate-sop-float" />
        <span className="pointer-events-none absolute -bottom-2 left-2 h-2.5 w-2.5 rotate-45 rounded-[3px] bg-sop-green animate-sop-float-slow" />

        {/* expanding label */}
        <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-sop-ink px-4 py-2 font-display text-sm font-700 text-white opacity-0 shadow-play-lg transition-all duration-300 group-hover:opacity-100">
          Play with our AI guide
        </span>

        {/* the orb */}
        <span className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-sop-blue via-sop-purple to-sop-coral text-white shadow-play-lg ring-4 ring-white transition-transform duration-300 group-hover:scale-105 animate-sop-float">
          <Wand2 className="h-7 w-7" />
        </span>
      </Link>
    </div>
  );
}
