// import { auth0 } from "@/lib/auth0.js";
// import { getProjectById } from "@/lib/db.js";
// import Link from "next/link";

// export default async function ProjectDetail({ params }) {
//   const row = await getProjectById(params.uuid);
//   if (!row) return <main style={{ padding: 24 }}>Not found.</main>;

//   const session = await auth0.getSession();

//   return (
//     <main style={{ padding: 24 }}>
//       <h1>{row.title}</h1>
//       <p>{row.description}</p>
//       <p><a href={row.link} target="_blank" rel="noreferrer">Visit</a></p>

//       {session && (
//         <div style={{ display: "flex", gap: 8 }}>
//           <Link href={`/projects/${row.id}/edit`}>Edit</Link>
//         </div>
//       )}
//     </main>
//   );
// }

import { auth0 } from "@/lib/auth0";
import { getProjectById } from "@/lib/db";
import { notFound } from "next/navigation";

// (선택) Edge가 아니라 Node 런타임에서 실행되도록 보강
export const runtime = "nodejs";

export default async function ProjectDetail({ params }) {
  // ⬇️ Next 16 규칙: params는 Promise이므로 언랩 필요
  const { uuid } = await params;

  const row = await getProjectById(uuid);
  if (!row) notFound();

  const session = await auth0.getSession();
  const isLoggedIn = !!session?.user;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">{row.title}</h1>
      <p className="text-gray-700 mb-4">{row.description}</p>

      {row.image && (
        // next/image를 쓰는 경우 next.config에 원격 호스트 허용 필요
        // <Image src={row.image} alt={row.title} width={800} height={450} className="rounded-lg mb-6" />
        <img src={row.image} alt={row.title} className="rounded-lg mb-6" />
      )}

      {row.link && (
        <a href={row.link} target="_blank" rel="noreferrer" className="text-blue-600 underline">
          Open project
        </a>
      )}

      {isLoggedIn && (
        <div className="mt-6">
          <a
            href={`/projects/${uuid}/edit`}
            className="inline-block rounded-lg bg-black text-white px-4 py-2"
          >
            Edit
          </a>
        </div>
      )}
    </main>
  );
}
