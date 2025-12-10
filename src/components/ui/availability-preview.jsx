"use client";

import { getUpcomingAvailability } from "@/data/availability";
import { useMemo } from "react";

export default function AvailabilityPreview() {
  const avail = useMemo(() => getUpcomingAvailability(7), []);

  return (
    <div className="rounded-2xl border p-4">
      <h3 className="font-semibold mb-3">Upcoming Availability (7 days)</h3>

      <div className="space-y-3">
        {avail.map((d) => (
          <div key={d.dateISO} className="flex items-start gap-3">
            <div className="w-28 shrink-0 text-sm font-medium">{d.dateISO}</div>
            <div className="flex flex-wrap gap-2">
              {d.slots.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 rounded border bg-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}

        {avail.length === 0 && (
          <p className="text-sm text-muted-foreground">No availability this week.</p>
        )}
      </div>
    </div>
  );
}
