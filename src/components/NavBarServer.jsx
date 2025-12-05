
import MyNavBar from "@/components/ui/MyNavBar";
import { auth0 } from "@/lib/auth0";

export const runtime = "nodejs";

export default async function NavBarServer() {
  const session = await auth0.getSession();
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
