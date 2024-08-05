"use server";
import getLoggedInUser from "./get-logged-in-user";
import db from "@/lib/db";

export default async function DeleteACar(carId: string) {
  try {
    const user = await getLoggedInUser();

    console.log("entrei em deletar carro", carId);

    if (!user) {
      throw new Error("User not found");
    }

    await db.carMaintenance.deleteMany({ where: { carId: carId } });
    await db.car.deleteMany({ where: { id: carId } });
  } catch (error) {
    console.error(error);
  }
}
