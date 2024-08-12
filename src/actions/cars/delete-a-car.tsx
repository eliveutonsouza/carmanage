"use server";
import getLoggedInUser from "../user/get-logged-in-user";
import db from "@/lib/db";

export default async function DeleteACar(carId: string) {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      throw new Error("User not found");
    }

    await db.carMaintenance.deleteMany({ where: { carId: carId } });
    await db.car.deleteMany({ where: { id: carId } });

    return { message: "Car deleted successfully" };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting car", error.message);
      throw new Error("Error deleting car", error);
    }
  }
}
