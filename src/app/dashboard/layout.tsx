import SidebarDashboard from "./_components/sidebar-dashboard";

export default async function LoginLayout({
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
