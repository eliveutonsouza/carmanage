import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LinkMenu {
  id: number;
  name: string;
  href: string;
}

export function NavigationLinks({ links }: { links: LinkMenu[] }) {
  return (
    <li className="flex flex-col gap-4 items-start w-full">
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.id}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "w-full cursor-pointer"
          )}
        >
          {link.name}
        </Link>
      ))}
    </li>
  );
}
