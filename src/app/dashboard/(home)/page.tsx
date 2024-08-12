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
import { TableCarMaintenance } from "./_components/table-car-maintenance";

import changeMaintenanceForTime from "@/actions/services/changes-status-automatically";
import getAllCars from "@/actions/cars/get-all-cars";

export default async function Dashboard() {
  await changeMaintenanceForTime(); // Atualiza os status das tabelas
  const dataCar = await getAllCars();

  const CardsDashboard = [
    {
      id: 1,
      title: "Total de Veículos",
      icon: <Car size={16} className="text-secondary" />,
      value: dataCar?.length,
    },

    {
      id: 2,
      title: "Veículos em Manutenção",
      icon: <Wrench size={16} className="text-secondary" />,
      value: 5,
      // footer: "+5% do ultimo mês",
    },
    {
      id: 3,
      title: "Veículos Disponíveis",
      icon: <CheckCircle size={16} className="text-secondary" />,
      value: 6,
      // footer: "+8% do ultimo mês",
    },

    {
      id: 4,
      title: "Veículos a vencer Manutenções",
      icon: <Key size={16} className="text-secondary" />,
      value: 3,
      // footer: "+7% do ultimo mês",
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
