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

type EmailResetPasswordProps = {
  userName: string;
  resetUrl: string;
};

export function EmailResetPassword({ userName, resetUrl }: EmailResetPasswordProps) {
  return (
    <Html>
      <Head />
      <Preview>Redefinição de senha — Car Manage</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Text style={styles.header}>Redefinição de Senha</Text>
          <Text style={styles.paragraph}>Olá, {userName || "Usuário"}!</Text>
          <Text style={styles.paragraph}>
            Recebemos uma solicitação para redefinir a senha da sua conta no Car
            Manage. Clique no botão abaixo para criar uma nova senha. Este link
            expira em 1 hora.
          </Text>

          <Section style={styles.btnContainer}>
            <Button style={styles.button} href={resetUrl}>
              Redefinir Senha
            </Button>
          </Section>

          <Text style={styles.paragraph}>
            Se você não solicitou a redefinição de senha, ignore este e-mail.
            Sua senha permanecerá a mesma.
          </Text>

          <Text style={styles.paragraph}>Time Car Manage!</Text>
          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            Este é um e-mail automático. Por favor, não responda a este e-mail.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default EmailResetPassword;

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
