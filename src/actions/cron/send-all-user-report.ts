import { Resend } from "resend";
import db from "@/lib/db";
import * as XLSX from "xlsx"; // Importar todos os membros do módulo 'xlsx'
import { render } from "@react-email/components";
import ReportMaintenance from "@/emails/email-report-maintenance";
import { format, differenceInDays, isBefore } from "date-fns";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAllUserReport() {
  try {
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

      const { data, error } = await resend.emails.send({
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

      if (error) {
        console.error(`Erro ao enviar e-mail para ${user.email}:`, error);
        continue;
      }
    }

    console.log("Emails sent successfully");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
    } else {
      console.error("Unknown error");
    }
  }
}
