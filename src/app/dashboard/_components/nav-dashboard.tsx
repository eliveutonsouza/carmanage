import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import db from "@/lib/db";
import { cn } from "@/lib/utils";
import { AreaChart, CarFront, Home, LogOut, Settings } from "lucide-react";
import Link from "next/link";

const mockMenu = [
  {
    id: 1,
    label: "Home",
    href: "/dashboard",
    icon: <Home size={16} />,
  },

  {
    id: 2,
    label: "Análises",
    href: "/dashboard/analytics",
    icon: <AreaChart size={16} />,
  },
];

export default async function NavDashboard() {
  const session = await auth();

  const user = await db.user.findUnique({
    where: { email: session?.user?.email ?? "" },
  });

  const initialsUserName = user?.name
    ? user.name
        .split(" ")
        .filter((_, index, arr) => index === 0 || index === arr.length - 1)
        .map((n) => n[0])
        .join("")
    : "";

  return (
    <>
      <nav className="border-r border-gray-200 flex flex-col justify-between">
        <div>
          <div className="border-b border-gray-200 px-4 py-6">
            <div className="flex items-center gap-2">
              <CarFront size={24} />
              <h1 className=" font-semibold">CarManage</h1>
            </div>
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

        <div className="border-t border-gray-200 p-4">
          <div className="flex flex-col gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn("hover:bg-transparent flex gap-2")}
                >
                  <Avatar>
                    <AvatarImage src={user?.image ?? ""} />
                    <AvatarFallback>{initialsUserName}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">
                      {user?.name ?? "Usuário"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email ?? "email@exemplo.com"}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className={cn("w-60")}>
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className={cn("gap-2")}>
                  <Settings size={16} />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem className={cn("gap-2")}>
                  <LogOut size={16} />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
}
