import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { ResetPasswordForm } from "./_components/reset-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Manage | Nova Senha",
};

type Props = {
  searchParams: { token?: string };
};

export default function ResetPasswordPage({ searchParams }: Props) {
  const token = searchParams.token ?? "";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <main className="flex items-center justify-center p-4">
        <Card className="w-full max-w-[472px]">
          <CardHeader className="text-center">
            <CardTitle>Nova senha</CardTitle>
            <CardDescription>
              Digite sua nova senha abaixo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm token={token} />
          </CardContent>
        </Card>
      </main>
      <section className="hidden md:block">
        <Image
          className="object-cover h-screen w-full"
          src="/maintenance-car.jpg"
          alt="manutenção de veículo"
          height={4800}
          width={7200}
          quality={100}
          priority
        />
      </section>
    </div>
  );
}
