"use server";

import db from "@/lib/db";
import getLoggedInUser from "./get-logged-in-user";

export default async function getCarMaintenance(userId: string) {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      throw new Error("User not found");
    }

    const cars = await db.carMaintenance.findMany({
      where: {
        carId: userId,
      },
    });

    return cars;
  } catch (error) {
    console.log("Error retrieving the logged-in user's car maintenance", error);
    throw new Error("Error retrieving the logged-in user's car maintenance");
  }
}
