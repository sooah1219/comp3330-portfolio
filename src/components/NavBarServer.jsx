// src/components/NavBarServer.jsx  (서버 컴포넌트: "use client" 금지)
import MyNavBar from "@/components/ui/MyNavBar";
import { auth0 } from "@/lib/auth0";

export const runtime = "nodejs"; // (선택) Edge로 안 가게

export default async function NavBarServer() {
  const session = await auth0.getSession(); // ✅ 여기!
  const isLoggedIn = !!session?.user;
  const user = session?.user
    ? {
      name: session.user.name || session.user.nickname || "",
      email: session.user.email || "",
      picture: session.user.picture || "",
    }
    : null;

  return <MyNavBar isLoggedIn={isLoggedIn} user={user} />;
}
