// import { auth0 } from "@/lib/auth0.js";
// import { redirect } from "next/navigation";

// export default async function DashboardPage() {
//   const session = await auth0.getSession();
//   if (!session) redirect("/auth/login");

//   return (
//     <section style={{ padding: 24 }}>
//       <h1>Dashboard</h1>
//       <p>Welcome {session.user?.email}</p>
//     </section>
//   );
// }

"use client";

import HeroEditorForm from "@/components/hero-editor-form";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  if (error) redirect("/auth/login");

  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50">
      <h1 className="mt-8 text-4xl font-bold">Dashboard</h1>

      {isLoading && <p className="mt-4">Loading...</p>}

      {!isLoading && !user && (
        <p className="mt-4 text-lg">Log in to update your portfolio content.</p>
      )}

      {user && (
        <div className="mt-6 w-full max-w-5xl px-4 pb-10">
          <p className="mb-4 text-lg">
            Welcome to your dashboard{user.nickname ? `, ${user.nickname}` : ""}!
          </p>
          <HeroEditorForm />
        </div>
      )}
    </div>
  );
}
