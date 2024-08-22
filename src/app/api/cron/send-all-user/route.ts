// app/api/cron/send-all-user/route.ts

import { NextResponse, NextRequest } from "next/server";
import { sendAllUserReport } from "@/actions/cron/send-all-user-report";

export async function GET(request: NextRequest) {
  try {
    // const authHeader = request.headers.get("authorization");
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    await sendAllUserReport();

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
      return NextResponse.json(
        { message: "Unexpected error", error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}
