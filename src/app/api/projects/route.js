// // GET /api/projects
// export async function GET() {
//   const projects = [
//     {
//       title: "Rental Marketplace App",
//       description:
//         "A mobile-first marketplace app where users can list, browse, and rent items from each other",
//       tech: "TypeScript, SCSS, Node.js, Express, Prisma, MongoDB,",
//       image: "/images/lendItOut.png",
//       link: "#",
//     },
//     {
//       title: "Gamified Skilled Trades Pathway App",
//       description:
//         "A mobile app that helps high-school students explore skilled trades through an interactive AI mentor, real-world apprenticeship simulations, and a badge-based progression system.",
//       tech: "React Native, Tailwind CSS, TypeScript, Hono, Bun, Drizzle ORM, Neon DB",
//       image: "/images/forge.png",
//       link: "#",
//     },
//     {
//       title: "Expense Tracker",
//       description:
//         "A personal expense tracker that lets users log spending, attach receipt images, and keep purchase history organized in one place.",
//       tech: "React, Tailwind CSS, TypeScript, Hono, Bun, Drizzle ORM, Neon DB",
//       image: "/images/expense.png",
//       link: "#",
//     },
//   ];

//   return Response.json({ projects });
// }

// import { ensureProjectsTable, fetchProjects } from "@/lib/db.js";
// import { NextResponse } from "next/server";

// export async function GET() {
//   await ensureProjectsTable();
//   const data = await fetchProjects();
//   return NextResponse.json({ data });
// }

// src/app/api/projects/route.js
import {
  ensureProjectsTable,
  fetchProjects,
  seedInitialProjects,
} from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await ensureProjectsTable();

  // 먼저 fetch
  let projects = await fetchProjects();

  // 없으면 seed 후 다시 fetch
  if (!projects || projects.length === 0) {
    await seedInitialProjects();
    projects = await fetchProjects();
  }

  return NextResponse.json({ data: projects }, { status: 200 });
}
