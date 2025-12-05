// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import Image from "next/image";
// import Link from "next/link";

// const createSlug = (str) =>
//   str
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, "-")
//     .replace(/[^\w-]+/g, "")
//     .replace(/--+/g, "-");

// export default async function ProjectsPage() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`,
//     { cache: "no-store" }
//   );
//   const { projects } = await res.json();

//   return (
//     <main className="w-full flex justify-center px-4 py-10">
//       <div className="w-full max-w-5xl">
//         <h1 className="text-3xl font-bold text-center mb-8">
//           My Portfolio
//         </h1>



//         <div className="space-y-6">
//           {projects.map((p) => {
//             const slug = createSlug(p.title);
//             const techStack = p.tech
//               ?.split(",")
//               .map((t) => t.trim())
//               .filter(Boolean);

//             return (
//               <Card
//                 key={slug}
//                 className="overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <div className="flex flex-col md:flex-row">

//                   <div className="md:w-2/5">
//                     <div className="relative w-full h-48 md:h-full">
//                       <Image
//                         src={p.image}
//                         alt={p.title}
//                         fill
//                         sizes="(max-width: 768px) 100vw,
//                                (max-width: 1200px) 40vw,
//                                35vw"
//                         className="object-cover md:rounded-l-md"
//                       />
//                     </div>
//                   </div>


//                   <div className="flex-1 flex flex-col justify-between p-4 md:p-5 gap-3">
//                     <div>
//                       <h2 className="text-xl font-semibold mb-1">
//                         {p.title}
//                       </h2>
//                       <p className="text-sm text-slate-600 leading-relaxed">
//                         {p.description}
//                       </p>

//                       {techStack?.length > 0 && (
//                         <div className="flex flex-wrap gap-2 mt-3">
//                           {techStack.map((tech) => (
//                             <Badge
//                               key={tech}
//                               variant="outline"
//                               className="text-xs font-normal"
//                             >
//                               {tech}
//                             </Badge>
//                           ))}
//                         </div>
//                       )}
//                     </div>


//                     <div className="flex gap-2 pt-2 md:pt-4">
//                       <Button
//                         asChild
//                         size="sm"
//                         variant="outline"
//                         className="flex-1"
//                       >
//                         <a
//                           href={p.link}
//                           target="_blank"
//                           rel="noreferrer"
//                         >
//                           Open
//                         </a>
//                       </Button>
//                       <Button asChild size="sm" className="flex-1">
//                         <Link href={`/projects/${slug}`}>Details</Link>
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             );
//           })}
//         </div>
//       </div>

//     </main>
//   );
// }


"use client";

import ProjectCard from "@/components/project-card.jsx";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/projects", { cache: "no-store" });
        const j = await r.json();
        setItems(j.data || []);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, []);

  if (err) return <p style={{ padding: 24 }}>Error: {err}</p>;
  if (!items) return <p style={{ padding: 24 }}>Loading…</p>;

  return (
    <main style={{ padding: 24 }}>
      <h1>Projects</h1>
      <div style={{ display: "grid", gap: 12 }}>
        {items.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </main>
  );
}
