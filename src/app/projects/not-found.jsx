// # project specific 404
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectNotFound() {
  const params = useParams();
  const slug = params?.slug;

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <h1 className="text-3xl font-bold">Project Not Found</h1>

      <p className="text-muted-foreground mt-2">
        {slug ? (
          <>
            We couldn’t find a project with slug: <span className="font-semibold">{slug}</span>
          </>
        ) : (
          "We couldn’t find the project you were looking for."
        )}
      </p>

      <Link
        href="/projects"
        className="mt-6 inline-block text-blue-600 underline hover:text-blue-800 transition"
      >
        Back to Projects
      </Link>
    </div>
  );
}
