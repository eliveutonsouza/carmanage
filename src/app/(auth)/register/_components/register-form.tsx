"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import register from "../../register/_actions/register";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "E-mail inválido!" }),
  password: z.string().min(5, { message: "Senha inválida!" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);

  const formLogin = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleSubmit(values: FormSchemaType) {
    const { name, email, password } = values;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    try {
      await register(formData);
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (res && res.error === "CredentialsSignin") {
        setError("Credenciais Inválidas");
      } else if (res && !res.error) {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    }
  }

  return (
    <div className="grid grid-cols-2 h-screen">
      <main className="flex items-center justify-center">
        <Card className="min-w-[472px] ">
          <CardHeader className="text-center">
            <CardTitle>Acesse o CarManage</CardTitle>
            <CardDescription>
              Insira seu e-mail para logar no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...formLogin}>
              <form
                onSubmit={formLogin.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={formLogin.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insira seu nome completo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formLogin.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="E-mail" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formLogin.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Sua senha"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && <p className="text-red-500">{error}</p>}
                <Button className="w-full cursor-pointer" type="submit">
                  Registrar
                </Button>
                <CardFooter>
                  <Link
                    className={cn(
                      buttonVariants({ variant: "link", size: "sm" }),
                      "mt-2 mx-auto cursor-pointer"
                    )}
                    href="/register"
                  >
                    Não possui conta?
                  </Link>
                </CardFooter>
              </form>
            </Form>
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
    </div>
  );
}