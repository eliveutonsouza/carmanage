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

type MaintenanceAlert = {
  carName: string;
  plate: string;
  maintenanceName: string;
  nextMaintenance: string;
  daysRemaining: number;
};

type Props = {
  userName: string;
  alerts: MaintenanceAlert[];
};

export function EmailAlertMaintenance({ userName, alerts }: Props) {
  return (
    <Html>
      <Head />
      <Preview>
        {`${alerts.length} manutenção(ões) próxima(s) do vencimento — Car Manage`}
      </Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Text style={styles.header}>
            ⚠️ Alerta de Manutenções Próximas do Vencimento
          </Text>
          <Text style={styles.paragraph}>Olá, {userName || "Usuário"}!</Text>
          <Text style={styles.paragraph}>
            As seguintes manutenções estão próximas do vencimento e precisam de
            atenção:
          </Text>

          {alerts.map((alert, i) => (
            <div key={i} style={styles.alertCard}>
              <Text style={styles.alertTitle}>
                🚗 {alert.carName} — {alert.plate}
              </Text>
              <Text style={styles.alertDetail}>
                <strong>Manutenção:</strong> {alert.maintenanceName}
              </Text>
              <Text style={styles.alertDetail}>
                <strong>Vence em:</strong> {alert.nextMaintenance} (
                {alert.daysRemaining} dia
                {alert.daysRemaining !== 1 ? "s" : ""})
              </Text>
            </div>
          ))}

          <Section style={styles.btnContainer}>
            <Button style={styles.button} href="https://carmanage.tech/dashboard">
              Acessar Dashboard
            </Button>
          </Section>

          <Text style={styles.paragraph}>Time Car Manage!</Text>
          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            Este é um e-mail automático. Por favor, não responda.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default EmailAlertMaintenance;

const styles = {
  main: {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },
  container: { margin: "0 auto", padding: "20px 0 48px" },
  header: { fontSize: "22px", fontWeight: "bold", lineHeight: "28px" },
  paragraph: { fontSize: "16px", lineHeight: "26px", marginTop: "8px" },
  alertCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "12px 16px",
    marginBottom: "12px",
    backgroundColor: "#fff7ed",
  },
  alertTitle: { fontSize: "15px", fontWeight: "bold", margin: "0 0 6px" },
  alertDetail: { fontSize: "14px", lineHeight: "22px", margin: "2px 0" },
  btnContainer: { textAlign: "center" as const, marginTop: "24px" },
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
  hr: { borderColor: "#cccccc", margin: "20px 0" },
  footer: { color: "#8898aa", fontSize: "12px" },
};
