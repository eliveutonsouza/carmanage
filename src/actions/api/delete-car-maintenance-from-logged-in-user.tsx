"use server";

import getLoggedInUser from "./get-logged-in-user";
import db from "@/lib/db";

export default async function DeleteCarMaintenanceFromLoggedInUser(
  carId: string
) {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      throw new Error("User not found");
    }

    await db.car.findUnique({ where: { id: carId } });
  } catch (error) {
    console.error(error);
  }
}
