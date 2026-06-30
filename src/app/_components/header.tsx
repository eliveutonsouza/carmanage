"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  { id: 3, name: "Preços", href: "#pricing" },
  { id: 4, name: "Time", href: "#team" },
  { id: 5, name: "Contato", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textClass = scrolled ? "text-slate-700 hover:text-slate-900" : "text-white/90 hover:text-white";
  const logoTextClass = scrolled ? "text-slate-900" : "text-white";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="logotipo carmanage"
              quality={100}
              width={36}
              height={36}
              priority
            />
            <span className={cn("text-xl font-semibold tracking-tight transition-colors", logoTextClass)}>
              Car Manage
            </span>
          </Link>

          {/* Desktop nav */}
          <NavigationMenu className="hidden lg:flex">
            <li className="flex items-center gap-1">
              {linksMenu.map((link) => (
                <Link
                  href={link.href}
                  key={link.id}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium transition-colors rounded-md hover:bg-white/10",
                    textClass
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </li>
          </NavigationMenu>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/login"
              className={cn(
                "px-4 py-1.5 text-sm font-medium transition-colors rounded-md",
                scrolled
                  ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              )}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "sm" }),
                "bg-amber-500 hover:bg-amber-600 text-white shadow-none"
              )}
            >
              Cadastre-se
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <AlignCenter className={cn("transition-colors", scrolled ? "text-slate-700" : "text-white")} size={22} />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription />
                  <ul className="w-full mt-4 flex flex-col gap-1">
                    <NavigationLinks links={linksMenu} />
                    <li className="pt-4 flex flex-col gap-2">
                      <Link href="/login" className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                        Login
                      </Link>
                      <Link href="/register" className={cn(buttonVariants(), "w-full bg-amber-500 hover:bg-amber-600")}>
                        Cadastre-se
                      </Link>
                    </li>
                  </ul>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
