// // src/components/ui/Project-preview-card.jsx
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import Image from "next/image";

// export default async function ProjectPreviewCard({ count = 3 }) {
//   const base = process.env.APP_BASE_URL || "http://localhost:3000"; // server env
//   const res = await fetch(`${base}/api/projects`, { cache: "no-store" });

//   if (!res.ok) {
//     return <p className="px-4 text-red-600">Failed to load projects (HTTP {res.status}).</p>;
//   }

//   const json = await res.json();
//   const list = Array.isArray(json?.data ?? json?.projects) ? (json.data ?? json.projects) : [];
//   const preview = list.slice(0, count);

//   if (!preview.length) return <p className="px-4">No projects yet.</p>;

//   return (
//     <section className="w-full mt-10 px-4 flex justify-center">
//       <div className="max-w-5xl w-full">
//         <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
//         <div className="grid gap-6 md:grid-cols-3">
//           {preview.map((project) => (
//             <Card key={project.id} className="flex flex-col h-full">
//               <CardHeader className="p-0">
//                 <div className="relative w-full h-72">
//                   <Image
//                     src={project.image}
//                     alt={project.title}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 35vw"
//                     className="object-cover rounded-t-lg"
//                   />
//                 </div>
//               </CardHeader>
//               <CardContent className="p-4 flex-1">
//                 <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
//                 <p className="text-sm text-gray-600">{project.description}</p>
//                 {Array.isArray(project.keywords) && project.keywords.length > 0 && (
//                   <p className="text-sm text-gray-400 mt-2">{project.keywords.join(", ")}</p>
//                 )}
//               </CardContent>
//               <CardFooter className="p-4 pt-0">
//                 <Button asChild className="w-full">
//                   <a href={project.link} target="_blank" rel="noreferrer">View Project</a>
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default async function ProjectPreviewCard({ count = 3 }) {
  const base = process.env.APP_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${base}/api/projects`, { cache: "no-store" });

  if (!res.ok) return <p className="text-red-600 px-4">Failed to load projects.</p>;

  const json = await res.json();
  const list = Array.isArray(json?.data ?? json?.projects)
    ? (json.data ?? json.projects)
    : [];
  const preview = list.slice(0, count);

  return (
    <section className="w-full mt-10 px-4 flex justify-center">
      <div className="max-w-5xl w-full">
        <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {preview.map((project) => {
            // fallback to a public image if missing
            const imgSrc = project?.image && project.image.trim()
              ? project.image
              : "/images/forge.png";

            return (
              <Card key={project.id} className="flex flex-col h-full">
                <CardHeader className="p-0">
                  <div className="relative w-full h-72">
                    <Image
                      src={imgSrc}
                      alt={project.title || "Project image"}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                </CardHeader>

                <CardContent className="p-4 flex-1">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full">
                    <a href={project.link} target="_blank" rel="noreferrer">
                      View Project
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
