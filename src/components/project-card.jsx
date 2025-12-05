"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function ProjectCard({ project }) {
  const { user } = useUser();

  return (
    <article style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <h3><Link href={`/projects/${project.id}`}>{project.title}</Link></h3>
      <p>{project.description}</p>
      <p><a href={project.link} target="_blank" rel="noreferrer">Visit</a></p>

      {user && (
        <div style={{ display: "flex", gap: 8 }}>
          <Link href={`/projects/${project.id}/edit`}>Edit</Link>
          <button
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
