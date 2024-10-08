import getACar from "@/actions/cars/get-a-car";
import { AddNewMaintenance } from "./_components/add-new-maintenance";
import getCarMaintenance from "@/actions/maintenance/get-car-maintenance";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import changeMaintenanceForTime from "@/actions/services/changes-status-automatically";
import DropMenuMaintenance from "./_components/dropmenu-maintenance";
import { Badge } from "@/components/ui/badge";

type viewCarPageParams = {
  params: {
    id: string;
  };
};

export default async function ViewCarPage({ params }: viewCarPageParams) {
  await changeMaintenanceForTime(); // Atualiza os status das tabelas
  const carData = await getACar(params.id);
  const dataCarMaintenanceId = await getCarMaintenance(params.id);
  if (!carData) {
    return <h1>Veículo não encontrado</h1>;
  }
  const { name, plate } = carData[0];
  return (
    <main>
      <section className="border-b border-gray-200 p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Veiculo: {plate} - {name}
        </h2>
        <div className="space-x-2">
          <AddNewMaintenance idCar={params.id} />
        </div>
      </section>

      <section className="flex flex-col gap-4 h-[calc(100vh-100px)]">
        <div className="flex flex-col gap-4 items-center justify-center flex-1 overflow-auto">
          <Table className="min-w-full">
            <TableCaption>Lista de Manutenções</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da manutenção</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Ultima manutenção</TableHead>
                <TableHead>Proxima manutenção</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="">
              {dataCarMaintenanceId?.map((rowItem) => (
                <TableRow key={rowItem.id}>
                  <TableCell className="font-medium">{rowItem.name}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        rowItem.status === "CONFORME"
                          ? "bg-green-300 hover:bg-green-300"
                          : "bg-destructive hover:bg-destructive"
                      )}
                    >
                      {rowItem.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={cn(
                        rowItem.type === "CORRETIVA"
                          ? "bg-destructive hover:bg-destructive"
                          : "bg-green-300 hover:bg-green-300"
                      )}
                    >
                      {rowItem.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(rowItem.lastMaintenance), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}
                  </TableCell>
                  <TableCell>
                    {format(new Date(rowItem.nextMaintenance), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}
                  </TableCell>
                  <TableCell>
                    {formatDistance(
                      new Date(rowItem.lastMaintenance),
                      new Date(rowItem.nextMaintenance),
                      { locale: ptBR }
                    )
                      .charAt(0)
                      .toUpperCase() +
                      formatDistance(
                        new Date(rowItem.lastMaintenance),
                        new Date(rowItem.nextMaintenance),
                        { locale: ptBR }
                      )
                        .slice(1)
                        .toLowerCase()}
                  </TableCell>
                  <TableCell>
                    <DropMenuMaintenance {...rowItem} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
}
