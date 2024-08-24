"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
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
import {
  registerFormSchema,
  registerFormSchemaType,
} from "@/schemas/register-form-schema";
import CreateNewUser from "../../../../actions/auth/register";
import { signIn } from "next-auth/react";
import { LoaderCircle } from "lucide-react";

export default function RegisterForm() {
  const formRegister = useForm<registerFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleSubmit(values: registerFormSchemaType) {
    const { email, password } = values;
    await CreateNewUser(values);

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
      redirect: true,
    });
  }

  return (
    <Form {...formRegister}>
      <form
        onSubmit={formRegister.handleSubmit(handleSubmit)}
        className="space-y-4"
      >
        <FormField
          control={formRegister.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="Insira seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formRegister.control}
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
          control={formRegister.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {formRegister.formState.isSubmitting ? (
          <Button
            disabled
            className="w-full cursor-pointer flex gap-2"
            type="submit"
          >
            <LoaderCircle className="animate-spin" /> Registrando...
          </Button>
        ) : (
          <Button className="w-full cursor-pointer" type="submit">
            Registrar
          </Button>
        )}
        <CardFooter>
          <Link
            className={cn(
              buttonVariants({ variant: "link", size: "sm" }),
              "mt-2 mx-auto cursor-pointer"
            )}
            href="/login"
          >
            Realizar login em uma conta existente
          </Link>
        </CardFooter>
      </form>
    </Form>
  );
}
