// src/components/edit-project-form.jsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditProjectForm({ uuid, project }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleting, setDeleting] = useState(false);

  const defaults = useMemo(
    () => ({
      title: project?.title ?? "",
      description: project?.description ?? "",
      image: project?.image ?? "",
      link: project?.link ?? "",
      keywords: (project?.keywords ?? []).join(", "),
    }),
    [project]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm({ defaultValues: defaults });

  async function onSubmit(values) {
    // parse keywords (comma → array, trim blanks)
    const keywords = (values.keywords || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await fetch(`/api/projects/${uuid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          image: values.image, // db layer maps to img/image as needed
          link: values.link,
          keywords,
        }),
      });

      if (!res.ok) {
        const err = await safeJson(res);
        throw new Error(err?.message || `Update failed (${res.status})`);
      }

      const data = await res.json();
      toast.success("Project updated");
      // reset to new values to clear dirty state
      reset({
        ...values,
        keywords: keywords.join(", "),
      });
      // navigate back to project detail
      startTransition(() => {
        router.push(`/projects/${uuid}`);
        router.refresh();
      });
    } catch (e) {
      toast.error(e.message || "Something went wrong");
      // keep on page
    }
  }

  async function onDelete() {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    try {
      setDeleting(true);
      const res = await fetch(`/api/projects/${uuid}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await safeJson(res);
        throw new Error(err?.message || `Delete failed (${res.status})`);
      }
      toast.success("Project deleted");
      startTransition(() => {
        router.push("/projects");
        router.refresh();
      });
    } catch (e) {
      toast.error(e.message || "Failed to delete");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Edit Project</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Project title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            rows={5}
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Short description"
            {...register("description", {
              required: "Description is required",
              minLength: { value: 10, message: "At least 10 characters" },
            })}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="url"
            className="w-full rounded-lg border px-3 py-2"
            placeholder="/images/example.png or https://…"
            {...register("image", {
              required: "Image is required",
              validate: (v) =>
                (!!v && v.length > 0) || "Please provide image URL",
            })}
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
          )}
        </div>

        {/* Project Link */}
        <div>
          <label className="block text-sm font-medium mb-1">Project Link</label>
          <input
            type="url"
            className="w-full rounded-lg border px-3 py-2"
            placeholder="https://github.com/… or https://your-site…"
            {...register("link", {
              required: "Link is required",
            })}
          />
          {errors.link && (
            <p className="mt-1 text-sm text-red-600">{errors.link.message}</p>
          )}
        </div>

        {/* Keywords (comma-separated) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Keywords (comma-separated)
          </label>
          <input
            type="text"
            className="w-full rounded-lg border px-3 py-2"
            placeholder="React, TypeScript, Tailwind"
            {...register("keywords")}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="rounded-lg bg-black text-white px-4 py-2 disabled:opacity-50"
          >
            {isSubmitting || isPending ? "Saving…" : "Save Changes"}
          </button>

          <Link
            href={`/projects/${uuid}`}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            className="ml-auto rounded-lg bg-red-600 text-white px-4 py-2 disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        </div>
      </form>
    </div>
  );
}

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
