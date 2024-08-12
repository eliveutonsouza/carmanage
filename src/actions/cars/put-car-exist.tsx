"use server";

import db from "@/lib/db";
import getLoggedInUser from "../user/get-logged-in-user";
import { EditExistingCarFormData } from "@/schemas/edit-existing-car-form-schema";

export default async function putCarExisting(data: EditExistingCarFormData) {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      throw new Error("User not found");
    }

    const idCar = await db.car.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!idCar) {
      throw new Error("Car not found");
    }

    await db.car.update({
      where: {
        id: data.id,
      },
      data: {
        plate: data.plate.toUpperCase(),
        name: data.surname.charAt(0).toUpperCase() + data.surname.slice(1),
        userId: user.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating car", error);
      throw new Error("Error updating car", error);
    }
  }
}
