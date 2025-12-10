// src/data/availability.js
export const WEEKLY_SLOTS = {
  1: ["09:00", "09:30", "10:00", "14:00", "14:30"],
  2: ["09:00", "09:30", "10:00", "14:00", "14:30"],
  3: ["09:00", "09:30", "10:00", "14:00", "14:30"],
  4: ["09:00", "09:30", "10:00", "14:00", "14:30"],
  5: ["09:00", "09:30"],
};
export const TIMEZONE = "America/Vancouver";
export function getUpcomingAvailability(days = 14) {
  const today = new Date();
  const out = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dow = d.getDay();
    const slots = WEEKLY_SLOTS[dow] || [];
    if (slots.length) {
      out.push({ dateISO: d.toISOString().slice(0, 10), slots });
    }
  }
  return out;
}
