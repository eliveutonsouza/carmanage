import * as XLSX from "xlsx";
import { render } from "@react-email/components";
import ReportMaintenance from "@/emails/email-report-maintenance";
import { format, differenceInDays, isBefore } from "date-fns";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Car = {
  id: string;
  name: string;
  plate: string;
  CarMaintenance: Array<{
    id: string;
    name: string;
    status: string;
    lastMaintenance: Date;
    nextMaintenance: Date;
  }>;
};

type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: Date | null;
};

export function buildExpiredMaintenanceRows(cars: Car[]) {
  const currentDate = new Date();
  return cars.flatMap((car) =>
    car.CarMaintenance.filter(
      (m) =>
        m.status === "VENCIDA" &&
        isBefore(new Date(m.nextMaintenance), currentDate)
    ).map((m) => ({
      carId: car.id,
      carName: car.name,
      plate: car.plate,
      maintenanceId: m.id,
      maintenanceName: m.name,
      lastMaintenance: format(new Date(m.lastMaintenance), "dd/MM/yyyy"),
      nextMaintenance: format(new Date(m.nextMaintenance), "dd/MM/yyyy"),
      status: m.status,
      daysOverdue: differenceInDays(currentDate, new Date(m.nextMaintenance)),
    }))
  );
}

export function buildXlsxBuffer(rows: ReturnType<typeof buildExpiredMaintenanceRows>) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows, {
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
  return XLSX.write(workbook, { bookType: "xlsx", type: "buffer" }) as Buffer;
}

export async function sendMaintenanceReport(user: User, cars: Car[]) {
  const rows = buildExpiredMaintenanceRows(cars);
  if (rows.length === 0) return { skipped: true };

  const buffer = buildXlsxBuffer(rows);
  const emailHtml = render(ReportMaintenance({ user }));

  const { error } = await resend.emails.send({
    from: "Car Manage <no-reply@carmanage.tech>",
    to: [user.email],
    subject: "Relatório Car Manage — Manutenções Vencidas",
    html: emailHtml,
    attachments: [
      {
        filename: "car-maintenance-report.xlsx",
        content: buffer.toString("base64"),
        content_type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ],
  });

  if (error) throw new Error(`Resend error: ${error.message}`);
  return { sent: true, count: rows.length };
}
