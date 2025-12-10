export default function CalendarHero() {
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
