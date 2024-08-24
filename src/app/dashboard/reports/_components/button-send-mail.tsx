"use client";
import {
  Button,
  type ButtonProps as OriginalButtonProps,
} from "@/components/ui/button";
import { sendMailReport } from "../actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface ButtonSendMailProps extends OriginalButtonProps {
  children: React.ReactNode;
}

export function ButtonSendMail({ children, ...props }: ButtonSendMailProps) {
  const router = useRouter();

  async function actionSendMail() {
    const response = await sendMailReport();

    if (!!response) {
      toast({
        title: "Relatório enviado com sucesso! 🚀",
        description: "Verifique sua caixa de e-mails para visualizar!",
      });
    } else {
      toast({
        title: "Erro ao enviar relatório! 😢",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }

    router.refresh();
  }

  return (
    <Button
      className="flex itens-center gap-2"
      onClick={actionSendMail}
      {...props}
    >
      {children}
    </Button>
  );
}
