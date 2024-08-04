import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carmanage | Cadastro",
  description: "Cadastre-se na plataforma!",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
