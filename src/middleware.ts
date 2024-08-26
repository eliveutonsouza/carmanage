// app/middleware.ts

import { NextResponse, NextRequest } from "next/server";

// Função middleware que processa as requisições
export function middleware(request: NextRequest) {
  // Obtém todos os cookies da requisição
  const cookiesArray = request.cookies.getAll();
  // Busca o cookie de sessão
  const sessionTokenCookie = cookiesArray.find(({ name }) =>
    /\.session-token$/.test(name)
  );
  // Define o token como o valor do cookie de sessão ou null se não existir
  const token = sessionTokenCookie ? sessionTokenCookie.value : null;

  // Função para verificar permissões de acesso
  const isPublicPath = (path: string) => {
    // Define rotas públicas que não requerem autenticação
    return path.startsWith("/api/inngest/");
  };

  // Permitir acesso a rotas públicas
  if (isPublicPath(request.nextUrl.pathname)) {
    return NextResponse.next(); // Continua a requisição
  }

  // Redireciona para login se não houver token e a rota for dashboard
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redireciona para dashboard se houver token e a rota for login
  if (!!token && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redireciona para dashboard se houver token e a rota for registro
  if (!!token && request.nextUrl.pathname.startsWith("/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Continua a requisição se nenhuma das condições acima for atendida
  return NextResponse.next();
}

// Configuração do middleware para as rotas que ele deve interceptar
export const config = {
  matcher: [
    "/login:path*", // Rota de login
    "/dashboard/:path*", // Rota de dashboard
    "/register/:path*", // Rota de registro
  ],
};
