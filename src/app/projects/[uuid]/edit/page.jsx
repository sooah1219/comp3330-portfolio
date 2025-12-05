// src/app/projects/[uuid]/edit/page.jsx
import EditProjectForm from "@/components/edit-project-form";
import { getProjectById } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function EditPage({ params }) {
  const { uuid } = await params;
  const row = await getProjectById(uuid);
  if (!row) notFound();

  return <EditProjectForm uuid={uuid} project={row} />;
}
