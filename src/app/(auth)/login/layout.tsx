import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carmanage | Login",
  description: "Faça seu login!",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
