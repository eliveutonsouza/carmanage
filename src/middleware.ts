// app/middleware.ts

import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  // Permitir acesso ao endpoint do cron job
  if (request.nextUrl.pathname.startsWith("/api/cron/")) {
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  const cookiesArray = request.cookies.getAll();
  const sessionTokenCookie = cookiesArray.find(({ name }) =>
    /\.session-token$/.test(name)
  );
  const token = sessionTokenCookie ? sessionTokenCookie.value : null;

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!!token && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!!token && request.nextUrl.pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login:path*",
    "/dashboard/:path*",
    "/register/:path*",
    "/api/cron/:path*",
  ],
};
