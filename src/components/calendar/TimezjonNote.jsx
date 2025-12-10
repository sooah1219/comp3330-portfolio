import { TIMEZONE } from "@/data/availability";

export default function TimezoneNote() {
  return (
    <div className="rounded-lg border p-3 text-xs text-muted-foreground">
      <p>
        All times shown are in <span className="font-medium">{TIMEZONE}</span>.
        If you’re in a different timezone, let me know in the notes and I’ll confirm accordingly.
      </p>
    </div>
  );
}
