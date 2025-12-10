// "use client";

// import { useUser } from "@auth0/nextjs-auth0/client";
// import Link from "next/link";

// export default function ProjectCard({ project }) {
//   const { user } = useUser();

//   return (
//     <article style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
//       <h3><Link href={`/projects/${project.id}`}>{project.title}</Link></h3>
//       <p>{project.description}</p>
//       {/* <p><a href={project.link} target="_blank" rel="noreferrer">Visit</a></p> */}

//       {user && (
//         <div style={{ display: "flex", gap: 8 }}>
//           <Link href={`/projects/${project.id}/edit`}>Edit</Link>
//           <button
//             onClick={async () => {
//               if (!confirm("Delete project?")) return;
//               const r = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
//               if (r.ok) location.reload();
//               else alert("Failed to delete");
//             }}
//           >
//             Delete
//           </button>
//         </div>
//       )}
//     </article>
//   );
// }

"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

// 로컬 뱃지 (같은 스타일 유지)
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

export default function ProjectCard({ project }) {
  const { user } = useUser();

  return (
    <article className="rounded-2xl border p-4 shadow-sm">
      <h3 className="text-lg font-semibold">
        <Link href={`/projects/${project.id}`} className="hover:underline">
          {project.title}
        </Link>
      </h3>

      <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>


      {Array.isArray(project.skills) && project.skills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {project.skills.map((s) => (
            <SkillBadge key={s.name} name={s.name} level={s.level} years={s.years} />
          ))}
        </div>
      )}

      {user && (
        <div className="mt-4 flex items-center gap-3 text-sm">
          <Link href={`/projects/${project.id}/edit`} className="underline">
            Edit
          </Link>
          <button
            className="text-red-600 underline"
            onClick={async () => {
              if (!confirm("Delete project?")) return;
              const r = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
              if (r.ok) location.reload();
              else alert("Failed to delete");
            }}
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
}
