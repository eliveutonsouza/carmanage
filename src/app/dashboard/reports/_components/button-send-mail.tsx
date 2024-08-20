"use client";
import {
  Button,
  type ButtonProps as OriginalButtonProps,
} from "@/components/ui/button";
import { sendMailReport } from "../actions";
import { toast } from "@/components/ui/use-toast";

interface ButtonSendMailProps extends OriginalButtonProps {
  children: React.ReactNode;
}

export function ButtonSendMail({ children, ...props }: ButtonSendMailProps) {
  async function actionSendMail() {
    const response = await sendMailReport();

    if (!!response) {
      toast({
        title: "Relatório enviado com sucesso! 🚀",
        description: "Verifique sua caixa de e-mails para visualizar!",
      });
    } else {
      console.log("dentro do else", response);
      toast({
        title: "Erro ao enviar relatório! 😢",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
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
