// src/app/api/projects/[uuid]/route.js
import { deleteProject, getProjectById, updateProject } from "@/lib/db";
import { NextResponse } from "next/server";

// GET /api/projects/:uuid
export async function GET(_req, context) {
  const { uuid } = await context.params; // ← ✅ params를 await
  const row = await getProjectById(uuid);
  if (!row) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ data: row }, { status: 200 });
}

// PUT /api/projects/:uuid
export async function PUT(req, context) {
  const { uuid } = await context.params; // ← ✅
  const body = await req.json();
  const updated = await updateProject(uuid, body);
  if (!updated)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(
    { message: "Updated", data: updated },
    { status: 200 }
  );
}

// DELETE /api/projects/:uuid
export async function DELETE(_req, context) {
  const { uuid } = await context.params; // ← ✅
  const deleted = await deleteProject(uuid);
  if (!deleted)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(
    { message: "Deleted", data: deleted },
    { status: 200 }
  );
}
