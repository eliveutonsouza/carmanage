import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import LoginForm from "./_components/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <main className="flex items-center justify-center">
        <Card className="min-w-[472px] ">
          <CardHeader className="text-center">
            <CardTitle>Acesse o CarManage</CardTitle>
            <CardDescription>
              Insira seu e-mail para logar no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </main>
      <section>
        <Image
          className="object-cover h-screen w-screen"
          src="/maintenance-car.jpg"
          alt="pessoa realizando a manutenção de um veiculo"
          height={4800}
          width={7200}
          quality={100}
          priority
        />
      </section>
    </>
  );
}
