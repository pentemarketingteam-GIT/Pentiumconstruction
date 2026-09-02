import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { NAV, CONTACT } from "@/lib/sopContent";
import { BookNowButton } from "@/components/sop/Primitives";

function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="School of Play home">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-sop-blue text-white shadow-play">
        <span className="font-display text-xl font-700 leading-none">S</span>
      </span>
      <span className="whitespace-nowrap font-display text-xl font-700 leading-none text-sop-ink">
        School <span className="text-sop-coral">of</span> Play
      </span>
    </Link>
  );
}

function DesktopDropdown({ group }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link to={group.to} className="flex items-center gap-1 rounded-full px-3.5 py-2 font-display text-[15px] font-600 text-sop-ink/85 transition-colors hover:bg-sop-mist hover:text-sop-blue">
        {group.label}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </Link>
      {open && (
        <div className="absolute left-0 top-full z-50 w-72 pt-2">
          <div className="rounded-3xl border border-sop-border bg-white p-2 shadow-play-lg">
            {group.links.map((l) => (
              <Link key={l.to} to={l.to} className="block rounded-2xl px-4 py-2.5 text-[15px] font-600 text-sop-ink/80 transition-colors hover:bg-sop-mist hover:text-sop-blue">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [location.pathname]);

  const groups = [NAV.parents, NAV.schools, NAV.about];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 shadow-play backdrop-blur-md" : "bg-white/60 backdrop-blur-sm"}`}>
      <div className="sop-container flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {groups.map((g) => <DesktopDropdown key={g.to} group={g} />)}
          <Link to="/contact" className="rounded-full px-3.5 py-2 font-display text-[15px] font-600 text-sop-ink/85 transition-colors hover:bg-sop-mist hover:text-sop-blue">
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={CONTACT.phoneHref} className="hidden items-center gap-2 font-display text-sm font-600 text-sop-ink/80 hover:text-sop-blue xl:flex">
            <Phone className="h-4 w-4" /> {CONTACT.phone}
          </a>
          <BookNowButton size="md" />
        </div>

        <button className="grid h-11 w-11 place-items-center rounded-2xl bg-sop-mist text-sop-ink lg:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden">
          <div className="sop-container space-y-2 border-t border-sop-border bg-white pb-6 pt-4">
            {groups.map((g) => (
              <div key={g.to} className="rounded-2xl bg-sop-mist/60">
                <button className="flex w-full items-center justify-between px-4 py-3 font-display text-base font-700 text-sop-ink" onClick={() => setOpenGroup(openGroup === g.to ? null : g.to)}>
                  {g.label}
                  <ChevronDown className={`h-5 w-5 transition-transform ${openGroup === g.to ? "rotate-180" : ""}`} />
                </button>
                {openGroup === g.to && (
                  <div className="px-2 pb-2">
                    <Link to={g.to} className="block rounded-xl px-3 py-2 text-[15px] font-700 text-sop-blue">All {g.label}</Link>
                    {g.links.map((l) => (
                      <Link key={l.to} to={l.to} className="block rounded-xl px-3 py-2 text-[15px] font-600 text-sop-ink/80">{l.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/contact" className="block rounded-2xl bg-sop-mist/60 px-4 py-3 font-display text-base font-700 text-sop-ink">Contact</Link>
            <div className="flex flex-col gap-2 pt-2">
              <a href={CONTACT.phoneHref} className="flex items-center justify-center gap-2 font-display font-600 text-sop-ink/80"><Phone className="h-4 w-4" /> {CONTACT.phone}</a>
              <BookNowButton size="lg" className="w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
