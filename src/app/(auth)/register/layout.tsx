import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Car Manage | Cadastro",
  description: "Cadastre-se na plataforma!",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="grid grid-cols-2 h-screen">{children}</div>;
}
