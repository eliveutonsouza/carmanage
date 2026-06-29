import { Resend } from "resend";
import { inngest } from "./client";
import db from "@/lib/db";
import { render } from "@react-email/components";
import { EmailAlertMaintenance } from "@/emails/email-alert-maintenance";
import { sendMaintenanceReport } from "@/lib/email-report";
import { format, differenceInDays, isBefore, addDays } from "date-fns";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailReport = inngest.createFunction(
  { id: "send/email/report" },
  { cron: "0 0 * * *" },
  async () => {
    const users = await db.user.findMany({
      where: { acceptedReportEmails: true },
    });

    for (const user of users) {
      const dataCar = await db.car.findMany({
        where: { userId: user.id },
        include: { CarMaintenance: true },
      });

      await sendMaintenanceReport(user, dataCar).catch((err) =>
        console.error(`Failed to send report to ${user.email}:`, err)
      );
    }

    return { message: "Emails sent successfully" };
  }
);

export const sendMaintenanceAlerts = inngest.createFunction(
  { id: "send/maintenance/alerts" },
  { cron: "0 8 * * *" }, // Todos os dias às 8h UTC
  async () => {
    const users = await db.user.findMany({
      where: { acceptedReportEmails: true },
    });
    const currentDate = new Date();

    for (const user of users) {
      const alertDays = user.alertDaysBefore ?? 10;
      const alertThreshold = addDays(currentDate, alertDays);

      const dataCar = await db.car.findMany({
        where: { userId: user.id },
        include: { CarMaintenance: true },
      });

      const upcomingAlerts = dataCar.flatMap((car) =>
        car.CarMaintenance.filter(
          (m) =>
            m.status === "CONFORME" &&
            isBefore(new Date(m.nextMaintenance), alertThreshold) &&
            !isBefore(new Date(m.nextMaintenance), currentDate)
        ).map((m) => ({
          carName: car.name,
          plate: car.plate,
          maintenanceName: m.name,
          nextMaintenance: format(new Date(m.nextMaintenance), "dd/MM/yyyy"),
          daysRemaining: differenceInDays(new Date(m.nextMaintenance), currentDate),
        }))
      );

      if (upcomingAlerts.length === 0) continue;

      const emailHtml = render(
        EmailAlertMaintenance({ userName: user.name ?? "", alerts: upcomingAlerts })
      );

      await resend.emails.send({
        from: "Car Manage <no-reply@carmanage.tech>",
        to: [user.email],
        subject: `⚠️ ${upcomingAlerts.length} manutenção(ões) próxima(s) do vencimento`,
        html: emailHtml,
      });
    }

    return { message: "Alertas de manutenção enviados" };
  }
);

export const changeStatusMaintenanceEveryday = inngest.createFunction(
  { id: "action/changeStatusMaintenanceEveryday" },
  { cron: "0 0 * * *" }, // Executa todos os dias a 00h
  async () => {
    try {
      await db.carMaintenance.updateMany({
        where: {
          nextMaintenance: {
            lt: new Date(),
          },
        },

        data: { status: "VENCIDA" },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Error updating the status of each maintenance:",
          error.message
        );
        throw new Error("Error updating the status of each maintenance");
      }
    }
  }
);
