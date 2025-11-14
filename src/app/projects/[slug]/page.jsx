import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createSlug } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`,
    { cache: "no-store" }
  );
  const { projects } = await res.json();


  const project = projects.find(
    (p) => createSlug(p.title) === slug
  );

  if (!project) {
    return (
      <main className="w-full flex justify-center px-4 py-10">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-2xl font-bold mb-4">
            Project not found
          </h1>
          <Button asChild>
            <Link href="/projects">Back to Projects</Link>
          </Button>
        </div>
      </main>
    );
  }

  const techStack = project.tech
    ?.split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <main className="w-full flex justify-center px-4 py-10">
      <article className="w-full max-w-3xl space-y-6">
        <Button asChild variant="outline" size="sm">
          <Link href="/projects">← Back to Projects</Link>
        </Button>

        <header className="space-y-3">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <p className="text-slate-600">{project.description ?? project.desc}</p>

          {techStack?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </header>

        <div className="relative w-full h-64 rounded-md overflow-hidden">
          <Image
            src={project.image ?? project.img}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 80vw,
                   60vw"
            className="object-cover"
          />
        </div>

        <footer className="pt-2">
          <Button asChild>
            <a href={project.link} target="_blank" rel="noreferrer">
              Visit Project
            </a>
          </Button>
        </footer>
      </article>
    </main>
  );
}
