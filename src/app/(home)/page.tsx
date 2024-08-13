"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex items-center justify-center">
      <Link
        href={"/login"}
        className={cn(buttonVariants({ variant: "default" }), "cursor-pointer")}
      >
        Login
      </Link>
    </main>
  );
}
