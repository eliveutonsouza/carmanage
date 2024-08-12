"use server";
import db from "@/lib/db";

export default async function changeMaintenanceForTime() {
  try {
    await db.carMaintenance.updateMany({
      where: {
        nextMaintenance: {
          lt: new Date(),
        },
      },

      data: { status: "VENCIDA" },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error updating the status of each maintenance!");
  }
}
