"use client";

const levelClass = {
  beginner: "bg-blue-200 text-blue-900",
  intermediate: "bg-blue-400 text-white",
  expert: "bg-blue-700 text-white",
};

export default function SkillBadge({ name, level }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[24px] ${levelClass[level]}`}
      title={`${name} • ${level}`}
    >
      {name}

    </span>
  );
}
