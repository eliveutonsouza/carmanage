import type { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const apiResponse = await fetch("/api/mails/send-all-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!apiResponse.ok) {
      throw new Error(`Request error: ${apiResponse.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return response.json();
  }
}

export async function POST() {}
