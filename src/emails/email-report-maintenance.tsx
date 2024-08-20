import { UserSchema } from "@/app/api/mails/send-a-user/schema";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { z } from "zod";

type ReportMaintenanceProps = {
  user: z.infer<typeof UserSchema>;
  // data: z.infer<typeof CarManageMailSchema>[];
};

export function ReportMaintenance({ user }: ReportMaintenanceProps) {
  return (
    <Html>
      <Head />
      <Preview>
        The sales intelligence platform that helps you uncover qualified leads
      </Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Text style={styles.header}>Relatório de Manutenções Vencidas</Text>
          <Text style={styles.paragraph}>
            Prezado(a) {user?.name || "Usuário"},
          </Text>
          <Text style={styles.paragraph}>
            Estamos enviando este email para informá-lo sobre as manutenções
            vencidas dos seus veículos. É fundamental realizar essas manutenções
            para garantir a segurança e o bom funcionamento dos seus veículos.
          </Text>
          <Text style={styles.paragraph}>
            Anexamos a este email um relatório detalhado das manutenções
            vencidas, incluindo o nome do veículo, a placa, o tipo de manutenção
            e a data da próxima manutenção.
          </Text>
          <Text style={styles.paragraph}>
            Por favor, revise o relatório e realize as manutenções necessárias o
            mais breve possível.
          </Text>

          <Section style={styles.btnContainer}>
            <Button style={styles.button} href="https://carmanage.tech">
              Acesse nossa plataforma
            </Button>
          </Section>
          <Text style={styles.paragraph}>Time Car Manage!</Text>
          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            470 Noor Ave STE B #1148, South San Francisco, CA 94080
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ReportMaintenance;

// Estilos do email
const styles = {
  main: {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },
  container: {
    margin: "0 auto",
    padding: "20px 0 48px",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    lineHeight: "26px",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "26px",
    marginTop: "8px",
  },
  btnContainer: {
    textAlign: "center" as const,
    marginTop: "24px",
  },
  button: {
    backgroundColor: "#FB923C",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
  },
  hr: {
    borderColor: "#cccccc",
    margin: "20px 0",
  },
  footer: {
    color: "#8898aa",
    fontSize: "12px",
  },
};
