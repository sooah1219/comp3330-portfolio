import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import expense from "./expense.png";
import forge from "./forge.png";
import lendItOut from "./lendItOut.png";

export default function ProjectPreviewCard({ count = 3 }) {

  const projects = [
    {
      title: "Rental Marketplace App",
      desc: "A mobile-first marketplace app where users can list, browse, and rent items from each other",
      tech: "TypeScript, SCSS, Node.js, Express, Prisma, MongoDB,",
      img: lendItOut,
      link: "#",
    },
    {
      title: "Gamified Skilled Trades Pathway App",
      desc: "A gamified career-pathway app helping high-school students discover skilled trades through interactive chat, badges, and real-world progression stages.",
      tech: "React Native, Tailwind CSS, TypeScript, Hono, Bun, Drizzle ORM, Neon DB",
      img: forge,
      link: "#",
    },
    {
      title: "Expense Tracker",
      desc: "A personal expense tracker that lets users log spending, attach receipt images, and keep purchase history organized in one place.",
      tech: "React, Tailwind CSS, TypeScript, Hono, Bun, Drizzle ORM, Neon DB",
      img: expense,
      link: "#",
    },
  ].slice(0, count);

  return (
    <section className="w-full mt-10 px-4 flex justify-center">
      <div className="max-w-5xl w-full">
        <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader className="p-0">
                <div className="relative w-full h-70">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600">{project.desc}</p>
                <p className="text-sm text-gray-400 mt-2">{project.tech}</p>
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
  )
}