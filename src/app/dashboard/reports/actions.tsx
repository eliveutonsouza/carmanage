"use server";
import getLoggedInUser from "@/actions/user/get-logged-in-user";
import { headers } from "next/headers";

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
