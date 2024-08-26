import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Carmanage | Login",
  description: "Faça seu login!",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="grid grid-cols-2 h-screen">{children}</div>;
}
