import { auth } from "@/auth";
import { redirect } from "next/navigation";
import NavDashboard from "./_components/nav-dashboard";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="grid grid-cols-[270px_1fr] h-screen">
      <NavDashboard />

      {children}
    </div>
  );
}
