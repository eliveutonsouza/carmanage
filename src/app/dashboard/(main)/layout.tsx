import SidebarDashboard from "../../../components/dashboard/sidebar-dashboard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[270px_1fr] h-screen">
      <SidebarDashboard />

      {children}
    </div>
  );
}
