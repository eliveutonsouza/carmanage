import SidebarDashboard from "../../components/dashboard/sidebar-dashboard";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

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
    <div className="grid grid-cols-[270px_1fr] min-h-screen">
      <SidebarDashboard />

      {children}
    </div>
  );
}
