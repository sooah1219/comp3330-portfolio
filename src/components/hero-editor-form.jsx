"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  avatar: z.string().min(1, "Avatar is required"),
  fullName: z.string().min(2).max(200),
  shortDescription: z.string().min(2).max(120),
  longDescription: z.string().min(10).max(5000),
});

export default function HeroEditorForm() {
  const [avatarFile, setAvatarFile] = useState(null);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      avatar: "",
      fullName: "",
      shortDescription: "",
      longDescription: "",
    },
  });


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/hero", { cache: "no-store" });
        const { data } = await res.json();
        form.reset({
          avatar: data.avatar || "",
          fullName: data.fullName || "",
          shortDescription: data.shortDescription || "",
          longDescription: data.longDescription || "",
        });
      } catch (e) {
        toast.error("Failed to load hero content");
      }
    })();
  }, [form]);


  useEffect(() => {
    if (!avatarFile) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      form.setValue("avatar", String(e.target.result || ""), { shouldDirty: true });
    };
    reader.readAsDataURL(avatarFile);
  }, [avatarFile, form]);

  const onSubmit = async (values) => {
    const fd = new FormData();
    fd.append("avatar", values.avatar);
    fd.append("fullName", values.fullName);
    fd.append("shortDescription", values.shortDescription);
    fd.append("longDescription", values.longDescription);
    if (avatarFile) fd.append("avatarFile", avatarFile);

    const res = await fetch("/api/hero", { method: "PUT", body: fd });
    if (!res.ok) {
      let message = "Failed to update hero";
      try {
        const j = await res.json();
        if (j?.message) message = j.message;
      } catch { }
      toast.error(message);
      return;
    }
    const { data } = await res.json();
    form.reset({
      avatar: data.avatar,
      fullName: data.fullName,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
    });
    setAvatarFile(null);
    toast.success("Hero section updated");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

      <div className="flex items-start gap-4">
        <img
          src={form.watch("avatar") || "/images/avatar.png"}
          alt="avatar preview"
          className="w-24 h-24 rounded-full border object-cover"
        />
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
          />

          <input type="hidden" {...form.register("avatar")} />
          {form.formState.errors.avatar && (
            <p className="text-sm text-red-600 mt-1">
              {form.formState.errors.avatar.message}
            </p>
          )}
        </div>
      </div>


      <div>
        <label className="block text-sm font-medium mb-1">Full name</label>
        <input
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Your name"
          {...form.register("fullName")}
        />
        <FieldError form={form} name="fullName" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Short description
        </label>
        <input
          className="w-full rounded-lg border px-3 py-2"
          placeholder="One-liner about you"
          {...form.register("shortDescription")}
        />
        <FieldError form={form} name="shortDescription" />
      </div>


      <div>
        <label className="block text-sm font-medium mb-1">Long description</label>
        <textarea
          rows={6}
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Tell visitors who you are and what you do"
          {...form.register("longDescription")}
        />
        <FieldError form={form} name="longDescription" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-lg bg-black text-white px-4 py-2"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}

function FieldError({ form, name }) {
  const err = form.formState.errors[name];
  if (!err) return null;
  return <p className="text-sm text-red-600 mt-1">{err.message}</p>;
}
