import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.redirect(
    new URL("/auth/login", process.env.APP_BASE_URL)
  );
}
