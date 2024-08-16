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

export default async function Dashboard() {
  await changeMaintenanceForTime(); // Atualiza os status das tabelas
  const dataCar = await getAllCars();

  const CardsDashboard = [
    {
      id: 1,
      title: "Total de Veículos",
      icon: <Car size={16} className="text-secondary" />,
      value: dataCar?.length || 0, // Usando o comprimento de dataCar
    },
    {
      id: 2,
      title: "Manutenções Vencidas",
      icon: <Wrench size={16} className="text-secondary" />,
      value: 2,
    },
    {
      id: 3,
      title: "Veículos Disponíveis",
      icon: <CheckCircle size={16} className="text-secondary" />,
      value: 6,
    },
    {
      id: 4,
      title: "Manutenções a Vencer",
      icon: <Key size={16} className="text-secondary" />,
      value: 3,
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
