import RegisterForm from "./_components/register-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";

export default async function RegisterPage() {
  return (
    <>
      <main className="flex items-center justify-center">
        <Card className="min-w-[472px] ">
          <CardHeader className="text-center">
            <CardTitle>Registre no Sistema CarManage</CardTitle>
            <CardDescription>
              Insira os dados para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
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
