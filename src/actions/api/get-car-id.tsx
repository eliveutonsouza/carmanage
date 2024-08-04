"use server";

import db from "@/lib/db";
import getLoggedInUser from "./get-logged-in-user";

export default async function getCarId(idCar: string) {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      throw new Error("User not found");
    }

    const cars = await db.car.findMany({
      where: {
        userId: user.id,
        id: idCar,
      },
    });

    return cars;
  } catch (error) {
    console.log("Error getting car maintenance user logged", error);
    throw new Error("Error getting car maintenance user logged");
  }
}
