import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch("/api/mails/send-all-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

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
