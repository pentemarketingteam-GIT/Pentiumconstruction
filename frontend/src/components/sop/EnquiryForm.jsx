import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Loader2, PartyPopper } from "lucide-react";
import { SERVICE_OPTIONS, AUDIENCE_OPTIONS } from "@/lib/sopContent";
import { CTA } from "@/components/sop/Primitives";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const field =
  "w-full rounded-2xl border-2 border-sop-border bg-white px-4 py-3 text-[15px] text-sop-ink outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-sop-blue";

export default function EnquiryForm({
  source = "contact",
  defaultAudience = "",
  defaultService = "",
  heading = "Send us an enquiry",
}) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    audience: defaultAudience,
    service: defaultService,
    school_name_location: "",
    enquiry: "",
    mailing_list: false,
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const celebrate = () => {
    const colors = ["#2A54E4", "#FFC22E", "#2BC183", "#FF5C79", "#8B5CF6"];
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.enquiry) {
      toast.error("Please add your name, email and a short message.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/enquiries`, { ...form, source });
      setDone(true);
      celebrate();
      toast.success("Thanks! Your enquiry is on its way to the team.");
    } catch (err) {
      toast.error("Sorry, something went wrong. Please try again or call us.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center shadow-play ring-2 ring-sop-green/20">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sop-green/15 text-sop-green">
          <PartyPopper className="h-8 w-8" />
        </div>
        <h3 className="mt-4 font-display text-2xl font-700 text-sop-ink">Enquiry received!</h3>
        <p className="mt-2 text-muted-foreground">
          Thanks {form.full_name.split(" ")[0]} — a member of the School of Play team will be in touch soon.
        </p>
        <button
          onClick={() => {
            setDone(false);
            setForm({ full_name: "", email: "", phone: "", audience: defaultAudience, service: defaultService, school_name_location: "", enquiry: "", mailing_list: false });
          }}
          className="mt-6 font-display font-600 text-sop-blue hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl bg-white p-6 shadow-play ring-1 ring-sop-border sm:p-8">
      {heading && <h3 className="font-display text-2xl font-700 text-sop-ink">{heading}</h3>}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-700 text-sop-ink">Full Name *</label>
          <input className={field} value={form.full_name} onChange={set("full_name")} placeholder="Your name" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-700 text-sop-ink">Email Address *</label>
          <input type="email" className={field} value={form.email} onChange={set("email")} placeholder="you@example.com" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-700 text-sop-ink">Phone Number</label>
          <input className={field} value={form.phone} onChange={set("phone")} placeholder="Optional" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-700 text-sop-ink">I am a…</label>
          <select className={field} value={form.audience} onChange={set("audience")}>
            <option value="">Select one</option>
            {AUDIENCE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-700 text-sop-ink">Service</label>
          <select className={field} value={form.service} onChange={set("service")}>
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-700 text-sop-ink">School name & location</label>
          <input className={field} value={form.school_name_location} onChange={set("school_name_location")} placeholder="If applicable" />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-700 text-sop-ink">Enquiry *</label>
        <textarea rows={4} className={field} value={form.enquiry} onChange={set("enquiry")} placeholder="How can we help?" />
      </div>

      <label className="mt-4 flex items-start gap-3 text-sm text-sop-ink/80">
        <input type="checkbox" checked={form.mailing_list} onChange={set("mailing_list")} className="mt-0.5 h-5 w-5 rounded-md accent-sop-blue" />
        <span>Join our mailing list for offers, giveaways, free resources and School of Play updates.</span>
      </label>

      <CTA type="submit" size="lg" variant="primary" className="mt-6 w-full" disabled={loading}>
        {loading ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</> : "Send Enquiry"}
      </CTA>
    </form>
  );
}
