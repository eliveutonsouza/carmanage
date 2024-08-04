import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Car, CheckCircle, Key, Wrench } from "lucide-react";
import { AddNewCar } from "./_components/add-new-car";
import { TableCarMaintenance } from "./_components/table-car-maintenance";
import { AddNewMaintenance } from "./_components/add-new-maintenance";
import getCar from "@/actions/api/get-car";

const mockCardsDashboard = [
  {
    id: 1,
    title: "Total de Veículos",
    icon: <Car size={16} />,
    value: 204,
    footer: "+10% do ultimo mês",
  },

  {
    id: 2,
    title: "Veículos em Manutenção",
    icon: <Wrench size={16} />,
    value: 15,
    footer: "+5% do ultimo mês",
  },
  {
    id: 3,
    title: "Veículos Disponíveis",
    icon: <CheckCircle size={16} />,
    value: 180,
    footer: "+8% do ultimo mês",
  },

  {
    id: 4,
    title: "Veículos a vencer Manutençes",
    icon: <Key size={16} />,
    value: 30,
    footer: "+7% do ultimo mês",
  },
];

export default async function Dashboard() {
  console.log(getCar());

  return (
    <>
      <main>
        <section className="border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <div className="space-x-2">
            <AddNewMaintenance />
            <AddNewCar />
          </div>
        </section>
        <section className=" p-4 h-full flex flex-col gap-4">
          <div className="flex gap-4 items-center justify-center">
            {mockCardsDashboard.map((card) => (
              <Card key={card.id} className={cn("w-[20rem] bg-current")}>
                <CardHeader
                  className={"text-white flex flex-row justify-between "}
                >
                  <CardTitle className="text-base">{card.title}</CardTitle>
                  <CardDescription>{card.icon}</CardDescription>
                </CardHeader>
                <CardContent className="text-white flex">
                  <span className="text-4xl font-bold">{card.value}</span>
                </CardContent>
                <CardFooter className="text-white">{card.footer}</CardFooter>
              </Card>
            ))}
          </div>

          <TableCarMaintenance />
        </section>
      </main>
    </>
  );
}
