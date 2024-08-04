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

    const car = await db.car.findUnique({ where: { id: carId } });

    if (car && car.userId === user.id) {
      // Deletar todas as manutenções associadas ao carro antes de deletar o carro
      await db.carMaintenance.deleteMany({ where: { carId: car.id } }); // Deletar manutenções
      await db.car.delete({ where: { id: carId } }); // Deletar o carro
    } else {
      throw new Error("Item not found or does not belong to the user");
    }

    console.log(user);
  } catch (error) {
    console.error(error);
  }
}
