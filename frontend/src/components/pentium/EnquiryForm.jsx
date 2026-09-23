import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Loader2, PartyPopper } from "lucide-react";
import { PROJECT_OPTIONS } from "@/lib/pentium";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const PEN_COLORS = ["#c9a662", "#e6cf98", "#f4efe4", "#9c7b3f"];

export default function EnquiryForm({ source = "enquiry_form", defaultProject = "", heading = "Enquire about your future home", compact = false }) {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    project_of_interest: defaultProject,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const celebrate = () => confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors: PEN_COLORS });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.full_name || !form.phone || !form.message) {
      toast.error("Please add your name, phone and a short message.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/enquiries`, { ...form, source });
      setDone(true);
      celebrate();
      toast.success("Thank you! Your enquiry is on its way to the Pentium team.");
    } catch (err) {
      toast.error("Sorry, something went wrong. Please try again or call us.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="pen-card rounded-3xl p-8 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full" style={{ background: "rgba(201,166,98,0.15)", color: "var(--pen-gold-2)" }}>
          <PartyPopper className="h-8 w-8" />
        </div>
        <h3 className="mt-4 font-display text-2xl" style={{ color: "var(--pen-ink)" }}>Enquiry received</h3>
        <p className="mt-2" style={{ color: "var(--pen-fg-3)" }}>
          Thank you {form.full_name.split(" ")[0]} — a member of the Pentium team will be in touch within one business day.
        </p>
        <button onClick={() => { setDone(false); setForm({ full_name: "", phone: "", email: "", project_of_interest: defaultProject, message: "" }); }} className="mt-6 font-display font-semibold" style={{ color: "var(--pen-gold-2)" }}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="pen-card rounded-3xl p-6 sm:p-7" data-testid="pen-enquiry-form">
      {heading && <h3 className="font-display text-2xl" style={{ color: "var(--pen-ink)" }}>{heading}</h3>}
      <div className={`mt-5 grid gap-3.5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label className="mb-1.5 block text-xs tracking-wide" style={{ color: "var(--pen-fg-3)" }}>Full Name *</label>
          <input className="pen-field" value={form.full_name} onChange={set("full_name")} placeholder="Your name" data-testid="pen-enq-name" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs tracking-wide" style={{ color: "var(--pen-fg-3)" }}>Phone Number *</label>
          <input className="pen-field" value={form.phone} onChange={set("phone")} placeholder="+91 …" data-testid="pen-enq-phone" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs tracking-wide" style={{ color: "var(--pen-fg-3)" }}>Email Address</label>
          <input type="email" className="pen-field" value={form.email} onChange={set("email")} placeholder="you@example.com" data-testid="pen-enq-email" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs tracking-wide" style={{ color: "var(--pen-fg-3)" }}>Project of Interest</label>
          <select className="pen-field" value={form.project_of_interest} onChange={set("project_of_interest")} data-testid="pen-enq-project">
            <option value="">Select a project</option>
            {PROJECT_OPTIONS.map((o) => (<option key={o} value={o} style={{ color: "#111" }}>{o}</option>))}
          </select>
        </div>
      </div>
      <div className="mt-3.5">
        <label className="mb-1.5 block text-xs tracking-wide" style={{ color: "var(--pen-fg-3)" }}>Message *</label>
        <textarea rows={compact ? 3 : 4} className="pen-field" value={form.message} onChange={set("message")} placeholder="How can we help?" data-testid="pen-enq-message" />
      </div>
      <button type="submit" disabled={loading} className="pen-btn-gold mt-5 w-full justify-center" data-testid="pen-enq-submit">
        {loading ? (<><Loader2 className="h-5 w-5 animate-spin" /> Sending…</>) : "Request Consultation"}
      </button>
    </form>
  );
}
