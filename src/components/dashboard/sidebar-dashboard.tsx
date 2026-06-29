import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, Library } from "lucide-react";
import Link from "next/link";
import { MenuUserLogin } from "./menu-user-login";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";

const mockMenu = [
  {
    id: 1,
    label: "Home",
    href: "/dashboard",
    icon: <Home size={16} />,
  },

  {
    id: 2,
    label: "Relatórios",
    href: "/dashboard/reports",
    icon: <Library size={16} />,
  },
];

export default async function SidebarDashboard() {
  return (
    <>
      <nav className="w-full border-r border-border flex flex-col justify-between h-full min-h-screen">
        <div>
          <div className="border-b border-gray-200 px-4 py-4">
            <Link className="flex items-center gap-2" href={"/dashboard"}>
              <Image
                src="/logotipo-full-dark.svg"
                alt="Logo"
                fetchPriority="high"
                quality={100}
                width={150}
                height={150}
                className="h-auto"
              />
            </Link>
          </div>
          <div>
            <ul className="space-y-1 p-4">
              {mockMenu.map((item) => {
                return (
                  <li key={item.id}>
                    <Button
                      className={cn("w-full justify-start gap-2")}
                      variant="secondary"
                      asChild
                    >
                      <Link href={item.href}>
                        {item.icon}
                        {item.label}
                      </Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="border-t border-border p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-end pb-1">
              <ThemeToggle />
            </div>
            <MenuUserLogin />
          </div>
        </div>
      </nav>
    </>
  );
}
