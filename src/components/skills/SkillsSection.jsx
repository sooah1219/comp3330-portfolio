"use client";

import { skills } from "@/data/skills";
import { useMemo, useState } from "react";

const levelClass = {
  beginner: "bg-blue-200 text-blue-900",
  intermediate: "bg-blue-400 text-white",
  expert: "bg-blue-700 text-white",
};

function SkillBadge({ name, level }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-md ${levelClass[level]}`}
    >
      {name}
      <span className="opacity-80">{level}</span>
    </span>
  );
}

export default function SkillsSection() {
  const categories = useMemo(() => Object.keys(skills), []);
  const [active, setActive] = useState(categories[0] || "frontend");
  const list = skills[active] || [];

  return (
    <section className="w-full mt-10 px-4 flex justify-center">
      <div className="max-w-5xl w-full">
        <h2 className="text-2xl font-bold mb-6">Tech Stack & Skills</h2>


        <div className="flex items-center gap-4 text-sm mb-6">
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


        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-3 py-1.5 text-sm capitalize transition
                ${active === c ? "bg-accent" : "hover:bg-muted"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-1">
          <div className="rounded-2xl border p-5 shadow-sm h-full">
            <h3 className="mb-3 text-lg font-semibold capitalize">{active}</h3>
            <ul className="flex flex-wrap gap-2">
              {list.map((s) => (
                <li key={s.name}>
                  <SkillBadge name={s.name} level={s.level} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
