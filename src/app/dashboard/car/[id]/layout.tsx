import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/app/globals.css";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Carmanage | Dashboard",
  description: "Painel de controle do Carmanage!",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function CarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        {children}
      </body>
    </html>
  );
}
