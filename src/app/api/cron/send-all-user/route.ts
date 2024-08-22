import { Resend } from "resend";
import db from "@/lib/db";
import * as XLSX from "xlsx";
import { isBefore, differenceInDays, format } from "date-fns";
import { render } from "@react-email/components";
import ReportMaintenance from "../../../../emails/email-report-maintenance";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    console.log("Authorization Header:", authHeader); // Added this log

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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
        console.error(`Error sending email to ${user.email}:`, error);
        continue;
      }
    }

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Unexpected error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
