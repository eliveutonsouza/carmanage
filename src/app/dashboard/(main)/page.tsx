import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Car, CheckCircle, Key, Wrench } from "lucide-react";
import { FormNewCar } from "./_components/form-new-car";

import changeMaintenanceForTime from "@/actions/services/changes-status-automatically";
import getAllCars from "@/actions/cars/get-all-cars";
import { TableCarMaintenance } from "./_components/table-car-maintenance";
import { addDays, isBefore } from "date-fns";

export default async function Dashboard() {
  await changeMaintenanceForTime(); // Atualiza os status das tabelas
  const dataCar = await getAllCars();

  const vehicleMaintenanceExpired = dataCar?.filter((car) => {
    if (car.CarMaintenance.length > 0) {
      return car.CarMaintenance.every(
        (maintenance: { status: string }) => maintenance.status === "VENCIDA"
      );
    }

    return false;
  });

  const vehiclesAvailable = dataCar?.filter((car) => {
    return car.CarMaintenance.every(
      (maintenance: { status: string }) => maintenance.status === "CONFORME"
    );
  });

  const vehiclesToExpireIn10Days = dataCar?.filter((car) => {
    if (car.CarMaintenance.length > 0) {
      return car.CarMaintenance.some(
        (maintenance) =>
          maintenance.status === "CONFORME" &&
          isBefore(
            new Date(maintenance.nextMaintenance),
            addDays(new Date(), 10)
          )
      );
    }

    return false;
  });

  const CardsDashboard = [
    {
      id: 1,
      title: "Total de Veículos",
      icon: <Car size={16} className="text-secondary" />,
      value: dataCar?.length || 0,
    },
    {
      id: 2,
      title: "Manutenções Vencidas",
      icon: <Wrench size={16} className="text-secondary" />,
      value: vehicleMaintenanceExpired?.length || 0,
    },
    {
      id: 3,
      title: "Veículos Disponíveis",
      icon: <CheckCircle size={16} className="text-secondary" />,
      value: vehiclesAvailable?.length || 0,
    },
    {
      id: 4,
      title: "Manutenções a Vencer",
      icon: <Key size={16} className="text-secondary" />,
      value: vehiclesToExpireIn10Days?.length || 0,
    },
  ];

  return (
    <>
      <main>
        <section className="border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <div className="space-x-2">
            <FormNewCar />
          </div>
        </section>

        <section className="p-4 flex flex-col gap-4">
          <div className="flex gap-4 items-center justify-center">
            {CardsDashboard.map((card) => (
              <Card key={card.id} className={cn("w-[20rem] bg-primary")}>
                <CardHeader
                  className={"text-secondary flex flex-row justify-between "}
                >
                  <CardTitle className="text-base">{card.title}</CardTitle>
                  <CardDescription>{card.icon}</CardDescription>
                </CardHeader>
                <CardContent className="text-secondary flex items-baseline">
                  <span className="text-4xl font-bold">{card.value}</span>{" "}
                  <span>/uni</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {dataCar && <TableCarMaintenance data={dataCar} />}
        </section>
      </main>
    </>
  );
}
