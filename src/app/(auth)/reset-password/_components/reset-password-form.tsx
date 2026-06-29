"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { resetPassword } from "@/actions/auth/reset-password";
import { LoaderCircle, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    password: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .regex(/[A-Z]/, "Deve ter letra maiúscula")
      .regex(/[a-z]/, "Deve ter letra minúscula")
      .regex(/[0-9]/, "Deve ter número")
      .regex(/[^A-Za-z0-9]/, "Deve ter caractere especial"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "As senhas não coincidem",
    path: ["confirm"],
  });

type Props = { token: string };

export function ResetPasswordForm({ token }: Props) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirm: "" },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    const result = await resetPassword(token, values.password);
    if (result.error) {
      setErrorMsg(result.error);
      setStatus("error");
    } else {
      setStatus("success");
    }
  }

  if (!token) {
    return (
      <div className="text-center space-y-4 py-4">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
        <p className="text-destructive font-medium">Link inválido</p>
        <Link href="/forgot-password" className={cn(buttonVariants({ variant: "link" }))}>
          Solicitar novo link
        </Link>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center space-y-4 py-4">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        <p className="font-medium">Senha redefinida com sucesso!</p>
        <Link href="/login" className={cn(buttonVariants({ variant: "default" }))}>
          Fazer login
        </Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center space-y-4 py-4">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
        <p className="text-destructive font-medium">{errorMsg}</p>
        <Link href="/forgot-password" className={cn(buttonVariants({ variant: "link" }))}>
          Solicitar novo link
        </Link>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar nova senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            "Redefinir senha"
          )}
        </Button>
      </form>
    </Form>
  );
}
