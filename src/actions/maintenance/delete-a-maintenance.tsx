"use server";
import getLoggedInUser from "../user/get-logged-in-user";
import db from "@/lib/db";

export default async function deleteAMaintenance(maintenanceId: string) {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      throw new Error("User not found");
    }

    await db.carMaintenance.deleteMany({ where: { id: maintenanceId } });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting maintenance", error.message);
      throw new Error("Error deleting maintenance", error);
    }
  }
}
