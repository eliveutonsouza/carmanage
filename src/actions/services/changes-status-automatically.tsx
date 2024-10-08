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
    if (error instanceof Error) {
      console.error(
        "Error updating the status of each maintenance:",
        error.message
      );
      throw new Error("Error updating the status of each maintenance");
    }
  }
}
