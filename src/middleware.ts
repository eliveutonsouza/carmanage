import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log(`Processing request for: ${request.nextUrl.pathname}`);

  const cookiesArray = request.cookies.getAll();
  const sessionTokenCookie = cookiesArray.find(({ name }) =>
    /\.session-token$/.test(name)
  );
  const token = sessionTokenCookie ? sessionTokenCookie.value : null;

  if (request.nextUrl.pathname.startsWith("/api/cron/")) {
    console.log("Accessing cron job endpoint");
    return NextResponse.next();
  }

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("Redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!!token && request.nextUrl.pathname.startsWith("/login")) {
    console.log("Redirecting to /dashboard from /login");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!!token && request.nextUrl.pathname.startsWith("/register")) {
    console.log("Redirecting to /dashboard from /register");
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
