"use server";

import db from "@/lib/db";
import getLoggedInUser from "./get-logged-in-user";

export default async function getCarMaintenanceUserLogged() {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      throw new Error("User not found");
    }

    const carsMaintenanceDb = await db.car.findMany({
      where: {
        userId: user.id,
      },
      include: {
        CarMaintenance: true,
      },
    });

    const carsMaintenance = carsMaintenanceDb.map((car) => {
      const { CarMaintenance, ...carData } = car;
      return {
        ...carData,
        ...CarMaintenance[0],
      };
    });

    return carsMaintenance;
  } catch (error) {
    console.log("Error getting car maintenance user logged", error);
    throw new Error("Error getting car maintenance user logged");
  }
}
