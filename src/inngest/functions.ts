import { Resend } from "resend";
import { inngest } from "./client";
import db from "@/lib/db"; // Importar o banco de dados
import * as XLSX from "xlsx"; // Importar o módulo XLSX
import { render } from "@react-email/components"; // Importar renderizador de e-mail
import ReportMaintenance from "@/emails/email-report-maintenance"; // Importar o template de e-mail
import { format, differenceInDays, isBefore } from "date-fns"; // Importar funções do date-fns

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailReport = inngest.createFunction(
  { id: "send/email/report" },
  { cron: "0 0 * * *" }, // Executa todos os dias a 00h
  async () => {
    const users = await db.user.findMany();
    const currentDate = new Date();

    for (const user of users) {
      const dataCar = await db.car.findMany({
        where: { userId: user.id },
        include: { CarMaintenance: true },
      });

      const expiredMaintenance = dataCar.flatMap((car) =>
        car.CarMaintenance.filter(
          (maintenance) =>
            maintenance.status === "VENCIDA" &&
            isBefore(new Date(maintenance.nextMaintenance), currentDate)
        ).map((maintenance) => {
          const daysOverdue = differenceInDays(
            currentDate,
            new Date(maintenance.nextMaintenance)
          );

          return {
            carId: car.id,
            carName: car.name,
            plate: car.plate,
            maintenanceId: maintenance.id,
            maintenanceName: maintenance.name,
            lastMaintenance: format(
              new Date(maintenance.lastMaintenance),
              "dd/MM/yyyy"
            ),
            nextMaintenance: format(
              new Date(maintenance.nextMaintenance),
              "dd/MM/yyyy"
            ),
            status: maintenance.status,
            daysOverdue,
          };
        })
      );

      if (expiredMaintenance.length === 0) {
        continue;
      }

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(expiredMaintenance, {
        header: [
          "carId",
          "carName",
          "plate",
          "maintenanceId",
          "maintenanceName",
          "lastMaintenance",
          "nextMaintenance",
          "status",
          "daysOverdue",
        ],
        skipHeader: false,
      });

      XLSX.utils.book_append_sheet(workbook, worksheet, "Expired Maintenance");
      const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

      const emailContent = render(ReportMaintenance({ user }));

      await resend.emails.send({
        from: "Car Manage <no-replay@carmanage.tech>",
        to: [user.email],
        subject: "Relatório Car Maintenance - Manutenções Vencidas",
        html: emailContent,
        attachments: [
          {
            filename: "car-maintenance-report.xlsx",
            content: buffer.toString("base64"),
            content_type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
        ],
      });
    }

    return { message: "Emails sent successfully" };
  }
);
