"use server";
import getLoggedInUser from "@/actions/user/get-logged-in-user";
import { headers } from "next/headers";
import { reportSchema } from "./schema";
import db from "@/lib/db";
import { z } from "zod";

export async function sendMailReport() {
  const userData = await getLoggedInUser();

  const headersList = headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";

  const url = `${protocol}://${host}`;

  try {
    const response = await fetch(`${url}/api/mails/send-a-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData?.email,
      }),
    });

    await saveSendReport({
      nameReport: "Relatório Car Maintenance - Manutenções Vencidas",
    });

    if (response.ok) {
      return await response.json();
    }

    throw new Error("Failed to send mail");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    console.error(error);
  }
}

export async function saveSendReport(data: z.infer<typeof reportSchema>) {
  try {
    const user = await getLoggedInUser();

    await db.reportCarMaintenanceHistory.create({
      data: {
        nameReport: data.nameReport,
        User: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getReportHistory() {
  const user = await getLoggedInUser();

  if (!user) {
    return [];
  }

  try {
    const reports = await db.reportCarMaintenanceHistory.findMany({
      where: {
        userId: user?.id,
      },
    });

    return reports;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    console.error(error);
  }
}

type data = {
  active: boolean;
};

export async function putPreferencesUserOfReportsEmails({ active }: data) {
  try {
    const userLogged = await getLoggedInUser();

    await db.user.updateMany({
      where: {
        id: userLogged?.id,
      },
      data: {
        acceptedReportEmails: active,
      },
    });

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Erro ao tentar atualizar preferencias do usuários:",
        error.message
      );
      throw new Error(
        `Erro ao tentar atualizar preferencias do usuários: ${error.message}`
      );
    }
  }
}
