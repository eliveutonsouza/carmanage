"use server";

import db from "@/lib/db";
import getLoggedInUser from "../user/get-logged-in-user";

export default async function getAllMaintenance() {
  const user = await getLoggedInUser();

  try {
    if (!user) {
      throw new Error("User not found");
    }

    const cars = await db.car.findMany({
      where: {
        userId: user.id,
      },
    });

    const maintenances = await db.carMaintenance.findMany({
      where: {
        carId: {
          in: cars.map((car) => car.id),
        },
      },
    });

    const maintenancesWithCars = maintenances.map((maintenance) => {
      const car = cars.find((car) => car.id === maintenance.carId);

      return {
        ...maintenance,
        car,
      };
    });

    if (!maintenancesWithCars) {
      return [];
    }

    return maintenancesWithCars;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error getting all cars", error);
      throw new Error("Error getting all cars", error);
    }
  }
}
