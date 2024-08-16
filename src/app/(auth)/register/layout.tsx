import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Carmanage | Cadastro",
  description: "Cadastre-se na plataforma!",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="grid grid-cols-2 h-screen">{children}</div>;
}
