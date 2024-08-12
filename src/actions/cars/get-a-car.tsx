"use server";

import db from "@/lib/db";
import getLoggedInUser from "../user/get-logged-in-user";

export default async function getACar(idCar: string) {
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
    if (error instanceof Error) {
      console.log("Error getting car", error);
      throw new Error("Error getting car", error);
    }
  }
}
