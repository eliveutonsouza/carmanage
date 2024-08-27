"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  formSettingReportSchema,
  formSettingReportSchemaData,
} from "../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { putPreferencesUserOfReportsEmails } from "../actions";

interface FormSettingsReportProps {
  preferences: boolean;
}

export function FormSettingsReport({ preferences }: FormSettingsReportProps) {
  const router = useRouter();

  const formSettingReport = useForm<formSettingReportSchemaData>({
    resolver: zodResolver(formSettingReportSchema),
    defaultValues: {
      active: preferences,
    },
  });

  const onSubmit = formSettingReport.handleSubmit(async (data) => {
    const response = await putPreferencesUserOfReportsEmails(data);

    if (!!response) {
      toast({
        title: "Sucesso 🎉",
        description: "Configurações de relatório atualizadas com sucesso. 📊",
      });
    } else {
      toast({
        title: "Erro 😢",
        description:
          "Erro ao tentar atualizar o relatório, tente novamente mais tarde.",
        variant: "destructive",
      });
    }

    router.refresh();
  });

  return (
    <Form {...formSettingReport}>
      <form onSubmit={onSubmit} className="space-y-6">
        <FormField
          name="active"
          control={formSettingReport.control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel htmlFor="reports-mode">
                  Ativar relatórios por e-mail
                </FormLabel>
                <FormDescription>
                  Ao ativar esta opção, você receberá emails periódicos com
                  relatórios detalhados sobre as manutenções dos seus veículos.
                </FormDescription>
              </div>

              <FormControl>
                <Switch
                  id="reports-mode"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Salvar configurações</Button>
      </form>
    </Form>
  );
}
