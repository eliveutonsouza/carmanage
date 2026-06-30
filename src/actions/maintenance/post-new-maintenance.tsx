"use server";
import db from "@/lib/db";
import getLoggedInUser from "../user/get-logged-in-user";
import { AddMaintenanceFormData } from "@/schemas/add-maintenance-schema";

export default async function postNewMaintenance(
  dataMaintenance: AddMaintenanceFormData,
  idCar: string
) {
  try {
    const {
      nameMaintenance,
      type,
      lastDateMaintenance,
      nextDateMaintenance,
      cost,
      provider,
      notes,
    } = dataMaintenance;

    const user = await getLoggedInUser();
    if (!user) {
      throw new Error("User not found");
    }

    await db.carMaintenance.create({
      data: {
        car: { connect: { id: idCar } },
        name: nameMaintenance,
        type: type ?? "PREVENTIVA",
        lastMaintenance: new Date(lastDateMaintenance),
        nextMaintenance: new Date(nextDateMaintenance),
        cost: cost ? parseFloat(cost) : null,
        provider: provider || null,
        notes: notes || null,
      },
    });
  } catch (error) {
    console.error("Erro ao criar nova manutenção:", error);
    throw error;
  }
}
