"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";

export default function MyNavBar({ isLoggedIn = false, user = null }) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <nav className="max-w-5xl mx-auto flex items-center justify-between py-4 px-4">
        {/* Brand */}
        <Link href="/" className="font-bold text-xl">
          My Portfolio
        </Link>

        {/* Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/projects">Projects</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact-me">Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* 로그인 상태에 따른 조건부 메뉴 */}
            {isLoggedIn ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/auth/logout">Logout</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* 프로필 아바타(선택) */}
                {user?.picture && (
                  <NavigationMenuItem>
                    <div className="flex items-center gap-2 pl-2">
                      <Image
                        src={user.picture}
                        alt={user.name || "User"}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                      {user?.name && (
                        <span className="text-sm text-gray-700 max-w-[10rem] truncate">
                          {user.name}
                        </span>
                      )}
                    </div>
                  </NavigationMenuItem>
                )}
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/auth/login">Login</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </header>
  );
}
