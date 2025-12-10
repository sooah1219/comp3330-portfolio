// src/app/api/projects/route.js
import {
  ensureProjectsTable,
  fetchProjects,
  seedInitialProjects,
} from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  await ensureProjectsTable();

  let projects = await fetchProjects();

  if (!projects || projects.length === 0) {
    await seedInitialProjects();
    projects = await fetchProjects();
  }

  return NextResponse.json({ data: projects }, { status: 200 });
}
