import { Resend } from "resend";
import db from "@/lib/db";
import * as XLSX from "xlsx"; // Importar todos os membros do módulo 'xlsx'
import { render } from "@react-email/components";
import ReportMaintenance from "../../../../emails/email-report-maintenance";
import { format, differenceInDays, isBefore } from "date-fns"; // Importar funções do date-fns

const resend = new Resend(process.env.RESEND_API_KEY);

interface RequestDataProps {
  email: string;
}

export async function POST(request: Request) {
  try {
    const { email }: RequestDataProps = await request.json();

    // Buscar usuário pelo e-mail
    const user = await db.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Buscar carros e manutenções do usuário
    const dataCar = await db.car.findMany({
      where: { userId: user.id },
      include: { CarMaintenance: true },
    });

    // Filtrar manutenções vencidas
    const currentDate = new Date();
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

    // Gerar arquivo XLSX com manutenções vencidas
    const workbook = XLSX.utils.book_new(); // Criar um novo livro de trabalho
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

    // Converter a planilha em um buffer
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // Gerar conteúdo do e-mail
    const emailContent = render(ReportMaintenance({ user }));

    // Enviar e-mail com anexo
    const { data, error } = await resend.emails.send({
      from: "Car Manage <no-replay@carmanage.tech>",
      to: [email],
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
      console.error("Erro ao enviar e-mail:", error);
      return new Response(
        JSON.stringify({ message: "Error sending email", error }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
      return new Response(
        JSON.stringify({ message: "Unexpected error", error: error.message }),
        { status: 500 }
      );
    }
    return new Response(JSON.stringify({ message: "Unknown error" }), {
      status: 500,
    });
  }
}
