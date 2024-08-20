import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  return Response.json({ success: true });
}

export async function POST() {
  try {
    const response = await fetch("/api/mails/send-all-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    // Checks if the response was successful
    if (!response.ok) {
      throw new Error(`Request error: ${response.statusText}`);
    }

    return NextResponse.json(
      { message: "Expired maintenance emails sent to users" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error sending expired maintenance emails to users",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
