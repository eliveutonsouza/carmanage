import SidebarDashboard from "../../../components/dashboard/sidebar-dashboard";

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

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <div className="grid grid-cols-[270px_1fr] min-h-screen">
          <SidebarDashboard />

          {children}
        </div>
      </body>
    </html>
  );
}
