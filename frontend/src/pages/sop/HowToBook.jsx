import PageHero from "@/components/sop/PageHero";
import { HOW_TO_BOOK } from "@/lib/sopContent";
import { BookNowButton, Reveal } from "@/components/sop/Primitives";
import { PlayCircle } from "lucide-react";

export default function HowToBook() {
  return (
    <div>
      <PageHero
        eyebrow="Parents"
        color="blue"
        title="How To Book"
        subtitle="Booking with School of Play is simple. Follow our short iPal tutorials to get set up in minutes."
      >
        <BookNowButton size="lg" variant="yellow" />
      </PageHero>

      <section className="sop-container">
        <div className="grid gap-4 sm:grid-cols-2">
          {HOW_TO_BOOK.map((step, i) => (
            <Reveal key={step} delay={(i % 2) * 0.06}>
              <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-play ring-1 ring-sop-border">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sop-blue text-white font-display text-lg font-700">{i + 1}</span>
                <span className="flex-1 font-display font-600 text-sop-ink">{step}</span>
                <PlayCircle className="h-6 w-6 text-sop-blue/60" />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 rounded-3xl bg-sop-mist p-8 text-center">
          <h3 className="font-display text-2xl font-700 text-sop-ink">All set?</h3>
          <p className="mt-2 text-muted-foreground">Head to the iPal booking portal to create your account and reserve a place.</p>
          <BookNowButton size="lg" className="mt-5" />
        </div>
      </section>
    </div>
  );
}
