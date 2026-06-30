import db from "@/lib/db";
import { sendMaintenanceReport } from "@/lib/email-report";

interface RequestDataProps {
  email: string;
}

export async function POST(request: Request) {
  try {
    const { email }: RequestDataProps = await request.json();

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const dataCar = await db.car.findMany({
      where: { userId: user.id },
      include: { CarMaintenance: true },
    });

    await sendMaintenanceReport(user, dataCar);

    return Response.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ message: msg }, { status: 500 });
  }
}
