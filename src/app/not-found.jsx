import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <h1 className="text-3xl font-bold">Page Not Found</h1>

      <p className="text-muted-foreground mt-2">
        The page you’re looking for doesn’t exist.
      </p>

      <Link
        href="/"
        className="mt-6 inline-block text-blue-600 underline hover:text-blue-800 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
