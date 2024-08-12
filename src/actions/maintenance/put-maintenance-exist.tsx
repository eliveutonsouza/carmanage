"use server";
import db from "@/lib/db";
import getLoggedInUser from "../user/get-logged-in-user";
import { EditExistingMaintenanceFormData } from "@/schemas/edit-existing-maintenance-form-schema";

export default async function putMaintenanceExisting(
  data: EditExistingMaintenanceFormData
) {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      throw new Error("User not found");
    }

    const idMaintenance = await db.carMaintenance.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!idMaintenance) {
      throw new Error("Car not found");
    }

    await db.carMaintenance.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.nameMaintenance,
        lastMaintenance: new Date(data.lastDateMaintenance),
        nextMaintenance: new Date(data.nextDateMaintenance),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error updating maintenance", error);
      throw new Error("Error updating maintenance");
    }
  }
}
