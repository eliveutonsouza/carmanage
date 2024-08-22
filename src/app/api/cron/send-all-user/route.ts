import { NextResponse } from "next/server";
import { sendAllUserReport } from "@/actions/cron/send-all-user-report";

export async function GET() {
  try {
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
  }
}
