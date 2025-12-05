"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function UserMenu() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <p>Loading user…</p>;
  if (error) return <p>Auth error: {error.message}</p>;

  return user ? (
    <div>
      <p>Signed in as <strong>{user.email || user.name}</strong></p>
      <a href="/auth/logout">Log out</a>
    </div>
  ) : (
    <div>
      <p>Not signed in.</p>
      <a href="/auth/login">Log in</a>
    </div>
  );
}
