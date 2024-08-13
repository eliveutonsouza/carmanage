"use client";

import { useEffect, useState } from "react";
import getLoggedInUser from "@/actions/user/get-logged-in-user";
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
import { cn } from "@/lib/utils";
import { Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

type User = {
  email: string;
  image: string | null;
  name: string | null;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: Date | null;
};

export function MenuUserLogin() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await getLoggedInUser();
      if (userData) {
        setUser(userData);
      }
    }
    fetchUser();
  }, []);

  const initialsUserName = user?.name
    ? user.name
        .split(" ")
        .filter((_, index, arr) => index === 0 || index === arr.length - 1)
        .map((n) => n[0])
        .join("")
    : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn("hover:bg-transparent flex gap-2 justify-start")}
        >
          <Avatar>
            <AvatarImage src={user?.image ?? ""} />
            <AvatarFallback>{initialsUserName}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <p className="font-medium text-sm">{user?.name ?? "Usuário"}</p>
            <p className="text-sm text-gray-500">
              {user?.email ?? "email@exemplo.com"}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className={cn("w-60")}>
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={cn("gap-2 cursor-pointer")}>
          <Settings size={16} />
          Configurações
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
          className={cn("gap-2 cursor-pointer")}
        >
          <LogOut size={16} />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
