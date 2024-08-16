import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Obtém todos os cookies como uma matriz de pares chave-valor
  const cookiesArray = request.cookies.getAll();

  // Encontra o cookie cujo nome termina com '.session-token'
  const sessionTokenCookie = cookiesArray.find(({ name }) =>
    /\.session-token$/.test(name)
  );

  // Se o cookie for encontrado, obtenha seu valor
  const token = sessionTokenCookie ? sessionTokenCookie.value : null;

  console.log(token);

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
  matcher: ["/login:path*", "/dashboard/:path*", "/register/:path*"],
};
