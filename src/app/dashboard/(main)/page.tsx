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

import getAllCars from "@/actions/cars/get-all-cars";
import { TableCarMaintenance } from "./_components/table-car-maintenance";
import { ChartMaintenanceTypes } from "./_components/chart-maintenance-types";
import { ChartMaintenanceStatus } from "./_components/chart-maintenance-status";
import { addDays, isBefore } from "date-fns";

export default async function Dashboard() {
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

  const allMaintenances = dataCar?.flatMap((car) => car.CarMaintenance) ?? [];
  const totalPreventiva = allMaintenances.filter((m) => m.type === "PREVENTIVA").length;
  const totalCorretiva = allMaintenances.filter((m) => m.type === "CORRETIVA").length;

  const chartStatusData =
    dataCar
      ?.filter((car) => car.CarMaintenance.length > 0)
      .slice(0, 8)
      .map((car) => ({
        name: car.plate,
        conforme: car.CarMaintenance.filter((m) => m.status === "CONFORME").length,
        vencida: car.CarMaintenance.filter((m) => m.status === "VENCIDA").length,
      })) ?? [];

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
        <section className="border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <div className="space-x-2">
            <FormNewCar />
          </div>
        </section>

        <section className="p-4 flex flex-col gap-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CardsDashboard.map((card) => (
              <Card key={card.id} className={cn("bg-primary")}>
                <CardHeader className="text-secondary flex flex-row justify-between">
                  <CardTitle className="text-base">{card.title}</CardTitle>
                  <CardDescription>{card.icon}</CardDescription>
                </CardHeader>
                <CardContent className="text-secondary flex items-baseline">
                  <span className="text-4xl font-bold">{card.value}</span>
                  <span className="ml-1 text-sm">/uni</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {allMaintenances.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tipo de Manutenções</CardTitle>
                  <CardDescription>
                    Distribuição entre preventivas e corretivas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartMaintenanceTypes
                    preventiva={totalPreventiva}
                    corretiva={totalCorretiva}
                  />
                </CardContent>
              </Card>

              {chartStatusData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Status por Veículo</CardTitle>
                    <CardDescription>
                      Manutenções conformes e vencidas por veículo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartMaintenanceStatus data={chartStatusData} />
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {dataCar && <TableCarMaintenance data={dataCar} />}
        </section>
      </main>
    </>
  );
}
