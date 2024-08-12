"use server";

import db from "@/lib/db";
import getLoggedInUser from "../user/get-logged-in-user";

export default async function getCarMaintenance(carId: string) {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      throw new Error("User not found");
    }

    const maintenance = await db.carMaintenance.findMany({
      where: {
        carId,
      },
    });

    return maintenance;
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        "Error retrieving the logged-in user's car maintenance",
        error
      );
      throw new Error(
        "Error retrieving the logged-in user's car maintenance",
        error
      );
    }
  }
}
