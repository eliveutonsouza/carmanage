import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { NavigationLinks } from "./navigation-links";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignCenter } from "lucide-react";

const linksMenu = [
  { id: 1, name: "Início", href: "#home" },
  { id: 2, name: "Sobre", href: "#about" },
  // { id: 3, name: "Preços", href: "#pricing" },
  { id: 4, name: "Time", href: "#team" },
  { id: 5, name: "Contato", href: "#contact" },
];

export function Header() {
  return (
    <div className="bg-transparent absolute top-0 left-0 z-40 w-full flex items-center">
      <div className="container">
        <div className="flex -mx-4 items-center justify-between relative">
          <div className="flex px-4 justify-between items-center w-full">
            {/* Logo */}
            <div className="px-4 w-60 max-w-full">
              <Link href="/" className="py-5 flex gap-1 items-center">
                <Image
                  src="/logo.svg"
                  alt="logotipo carmanage"
                  quality={100}
                  width={50}
                  height={50}
                  priority
                />
                <span className="text-2xl font-semibold tracking-tighter text-yellow-50">
                  Car Manage
                </span>
              </Link>
            </div>

            {/* Navegação para telas grandes */}
            <div>
              <NavigationMenu className="flex items-center justify-between md:sr-only lg:not-sr-only">
                <li className="flex gap-4 items-start w-full">
                  {linksMenu.map((link) => (
                    <Link
                      href={link.href}
                      key={link.id}
                      className={cn(
                        buttonVariants({ variant: "link" }),
                        "w-full cursor-pointer text-yellow-50"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </li>
              </NavigationMenu>

              {/* Navegação para dispositivos móveis */}
              <div className="lg:sr-only">
                <Sheet>
                  <SheetTrigger>
                    <AlignCenter className="text-yellow-50" size={24} />
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Onde deseja ir?</SheetTitle>
                      <SheetDescription />
                      <ul className="w-full">
                        <NavigationLinks links={linksMenu} />
                      </ul>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Links de Login e Registro */}
            <div className="sm:flex justify-end hidden pr-16 lg:pr-0 md:sr-only lg:not-sr-only">
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "cursor-pointer"
                )}
              >
                Login
              </Link>

              <Link
                href="/register"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "cursor-pointer"
                )}
              >
                Cadastre-se
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
