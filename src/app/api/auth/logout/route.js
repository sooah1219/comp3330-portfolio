import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.redirect(
    new URL("/auth/logout", process.env.APP_BASE_URL)
  );
}
