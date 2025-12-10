// src/app/calendar/page.jsx
import AvailabilityPreview from "@/components/ui/availability-preview";
import BookingForm from "@/components/ui/booking-form";
import { TIMEZONE } from "@/data/availability";

// (Optional) per-page SEO
export const metadata = {
  title: "Book a Call / Interview",
  description: "Pick a time that works. I’ll confirm by email.",
};

// Local, file-scoped components so we don't need extra files
function CalendarHero() {
  return (
    <header className="flex flex-col gap-3">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        Book a Call / Interview
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        Browse the upcoming availability and request a time that works for you.
        I’ll reply by email to confirm or propose an alternative if needed.
      </p>
      <a
        href="#request"
        className="inline-flex w-fit rounded-lg border px-3 py-1.5 text-sm hover:bg-accent"
      >
        Skip to request form
      </a>
    </header>
  );
}

function TimezoneNote() {
  return (
    <div className="rounded-lg border p-3 text-xs text-muted-foreground">
      <p>
        All times shown are in <span className="font-medium">{TIMEZONE}</span>.
        If you’re in a different timezone, mention it in the notes and I’ll confirm accordingly.
      </p>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <CalendarHero />

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_minmax(340px,420px)]">
        <div className="space-y-4">
          <AvailabilityPreview />
          <TimezoneNote />
        </div>

        <div id="request" className="rounded-2xl border p-5 shadow-sm bg-background">
          <h2 className="text-xl font-semibold mb-2">Request a booking</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Choose a date and time, then submit your details. You’ll get an email confirmation.
          </p>
          <BookingForm />
        </div>
      </div>
    </main>
  );
}
