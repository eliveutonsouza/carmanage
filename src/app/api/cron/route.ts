import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST() {
  try {
    await db.carMaintenance.updateMany({
      where: {
        nextMaintenance: {
          lt: new Date(),
        },
      },
      data: { status: "VENCIDA" },
    });

    const maintenanceExpired = await db.carMaintenance.findMany({
      where: {
        status: "VENCIDA",
      },
    });

    // Substitua "your-domain.com" pelo seu domínio
    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify(maintenanceExpired),
      headers: { "Content-Type": "application/json" },
    });

    return NextResponse.json(
      { message: "Maintenance statuses updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Erro ao atualizar status de manutenções",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
