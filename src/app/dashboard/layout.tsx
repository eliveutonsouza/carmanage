import SidebarDashboard from "../../components/dashboard/sidebar-dashboard";
import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Manage | Dashboard",
  description: "Painel de controle do Carmanage!",
};

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
