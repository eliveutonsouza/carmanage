import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import { ForgotPasswordForm } from "./_components/forgot-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Manage | Esqueci a Senha",
};

export default function ForgotPasswordPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <main className="flex items-center justify-center p-4">
        <Card className="w-full max-w-[472px]">
          <CardHeader className="text-center">
            <CardTitle>Esqueceu a senha?</CardTitle>
            <CardDescription>
              Informe seu e-mail e enviaremos um link para redefinir sua senha.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
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
