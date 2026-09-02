import PageHero from "@/components/sop/PageHero";
import EnquiryForm from "@/components/sop/EnquiryForm";
import { CONTACT } from "@/lib/sopContent";
import { Reveal } from "@/components/sop/Primitives";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div>
      <PageHero
        eyebrow="Contact Us"
        color="blue"
        title="Let\u2019s talk"
        subtitle="Whether you\u2019re a parent, a school or a partner \u2014 we\u2019d love to hear from you."
      />

      <section className="sop-container grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <div className="space-y-4">
            <a href={CONTACT.phoneHref} className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-play ring-1 ring-sop-border transition hover:-translate-y-0.5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sop-blue/10 text-sop-blue"><Phone className="h-6 w-6" /></span>
              <div><p className="text-sm text-muted-foreground">Call us</p><p className="font-display font-700 text-sop-ink">{CONTACT.phone}</p></div>
            </a>
            <a href={CONTACT.emailHref} className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-play ring-1 ring-sop-border transition hover:-translate-y-0.5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sop-coral/12 text-sop-coral"><Mail className="h-6 w-6" /></span>
              <div><p className="text-sm text-muted-foreground">Email us</p><p className="font-display font-700 text-sop-ink">{CONTACT.email}</p></div>
            </a>
            <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-play ring-1 ring-sop-border">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sop-green/12 text-sop-green"><MapPin className="h-6 w-6" /></span>
              <div><p className="text-sm text-muted-foreground">Visit us</p><p className="font-display font-700 text-sop-ink">{CONTACT.address}</p></div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <EnquiryForm source="contact" heading="Send us an enquiry" />
        </Reveal>
      </section>
    </div>
  );
}
