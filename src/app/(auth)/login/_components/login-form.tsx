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
  loginFormSchema,
  loginFormSchemaType,
} from "@/schemas/login-form-schema";
import userLogin from "@/actions/auth/login";

export default function LoginForm() {
  const formLogin = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSubmit(values: loginFormSchemaType) {
    userLogin(values);
  }

  return (
    <Form {...formLogin}>
      <form
        onSubmit={formLogin.handleSubmit(handleSubmit)}
        className="space-y-4"
      >
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
                <Input type="password" placeholder="Sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full cursor-pointer" type="submit">
          Entrar
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
  );
}
