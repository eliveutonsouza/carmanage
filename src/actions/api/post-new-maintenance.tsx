"use server";
import db from "@/lib/db";
import getLoggedInUser from "./get-logged-in-user";
import { AddMaintenanceFormData } from "@/schemas/add-maintenance-schema";

export default async function postNewMaintenance(
  dataMaintenance: AddMaintenanceFormData,
  idCar: string
) {
  try {
    const { nameMaintenance, lastDateMaintenance, nextDateMaintenance } =
      dataMaintenance;
    const user = await getLoggedInUser();

    if (!user) {
      throw new Error("User not found");
    }

    console.log("Criando manutenção para o carro:", idCar);

    await db.carMaintenance.create({
      data: {
        car: {
          connect: { id: idCar },
        },
        name: nameMaintenance,
        lastMaintenance: new Date(lastDateMaintenance),
        nextMaintenance: new Date(nextDateMaintenance),
      },
    });
    console.log("Manutenção criada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar nova manutenção:", error);
    throw error;
  }
}
