"use server";

import db from "@/lib/db";
import getLoggedInUser from "../user/get-logged-in-user";

export default async function getAllCars() {
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

    if (!cars) return [];

    return cars;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error getting all cars", error);
      throw new Error("Error getting all cars", error);
    }
  }
}
