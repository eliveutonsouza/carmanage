import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookiesArray = request.cookies.getAll();
  const sessionTokenCookie = cookiesArray.find(({ name }) =>
    /\.session-token$/.test(name)
  );
  const token = sessionTokenCookie ? sessionTokenCookie.value : null;

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/inngest/")) {
    return NextResponse.next();
  }

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (token && pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login/:path*",
    "/dashboard/:path*",
    "/register/:path*",
  ],
};
