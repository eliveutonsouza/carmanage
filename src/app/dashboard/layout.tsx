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
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-[270px] md:flex-shrink-0">
        <SidebarDashboard />
      </div>

      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
