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
import { forgotPassword } from "@/actions/auth/forgot-password";
import { LoaderCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
});

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    await forgotPassword(values.email);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center space-y-4 py-4">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        <p className="font-medium">E-mail enviado!</p>
        <p className="text-sm text-muted-foreground">
          Se esse e-mail estiver cadastrado, você receberá as instruções em
          instantes.
        </p>
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: "link" }), "mt-2")}
        >
          Voltar ao login
        </Link>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar link de redefinição"
          )}
        </Button>

        <div className="text-center">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "link", size: "sm" }))}
          >
            Voltar ao login
          </Link>
        </div>
      </form>
    </Form>
  );
}
