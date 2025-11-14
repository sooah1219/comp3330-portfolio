import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";


export default async function ProjectPreviewCard({ count = 3 }) {

  // const project await fetch (http/3000->from .env process.env.NEXT_Pu).then res - res.json then data - data.projects .catch error
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`,
    { cache: "no-store" }
  );
  const { projects } = await res.json();
  const preview = projects.slice(0, count);

  return (
    <section className="w-full mt-10 px-4 flex justify-center">
      <div className="max-w-5xl w-full">
        <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {preview.map((project) => (
            <Card key={project.title} className="flex flex-col h-full">
              <CardHeader className="p-0">
                <div className="relative w-full h-70">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 40vw,
                           35vw"
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {project.description}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {project.tech}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full">
                  <a href={project.link}>View Project</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}