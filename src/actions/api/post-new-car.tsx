"use server";

import { AddCarFormData } from "@/schemas/add-car-schema";
import db from "@/lib/db";
import getLoggedInUser from "./get-logged-in-user";

export default async function postNewCar(data: AddCarFormData) {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      throw new Error("User not found");
    }

    await db.car.create({
      data: {
        plate: data.plate.toUpperCase(),
        name: data.surname.charAt(0).toUpperCase() + data.surname.slice(1),
        userId: user.id,
      },
    });
  } catch (error) {
    console.log("Error creating car", error);
    throw new Error("Error creating car");
  }
}
