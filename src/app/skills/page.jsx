"use client";

import { skills } from "@/data/skills";
import { useMemo, useState } from "react";


const levelClass = {
  beginner: "bg-blue-200 text-blue-900",
  intermediate: "bg-blue-400 text-white",
  expert: "bg-blue-700 text-white",
};
function SkillBadge({ name, level, years }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 ${levelClass[level]}`}>
      {name}
      <span className="opacity-80">{years ? `${years}y` : level}</span>
    </span>
  );
}

export default function SkillsPage() {
  const categories = useMemo(() => Object.keys(skills), []);
  const [active, setActive] = useState(categories[0] || "frontend");
  const list = skills[active] || [];

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold">Tech Stack & Skills</h1>

        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-2">
            <i className="inline-block h-3 w-3 rounded bg-blue-200" /> Beginner
          </span>
          <span className="inline-flex items-center gap-2">
            <i className="inline-block h-3 w-3 rounded bg-blue-400" /> Intermediate
          </span>
          <span className="inline-flex items-center gap-2">
            <i className="inline-block h-3 w-3 rounded bg-blue-700" /> Expert
          </span>

        </div>
      </header>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-3 py-1.5 text-sm capitalize
              ${active === c ? "bg-accent" : "hover:bg-muted"}`}
            aria-pressed={active === c}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border p-5 shadow-sm">
          <h3 className="mb-3 text-lg font-semibold capitalize">{active}</h3>
          <ul className="flex flex-wrap gap-2">
            {list.map((s) => (
              <li key={s.name}>
                <SkillBadge name={s.name} level={s.level} years={s.years} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
