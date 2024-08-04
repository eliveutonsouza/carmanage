import getCarId from "@/actions/api/get-car-id";
import { AddNewMaintenance } from "../../(home)/_components/add-new-maintenance";
import getCarMaintenanceId from "@/actions/api/get-car-maintenance-id";
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

type viewCarPageParams = {
  params: {
    id: string;
  };
};

export default async function ViewCarPage({ params }: viewCarPageParams) {
  const carData = await getCarId(params.id);
  const dataCarMaintenanceId = await getCarMaintenanceId(params.id);

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

      <section className=" p-4 h-full flex flex-col gap-4">
        <div className="flex gap-4 items-center justify-center">
          <Table>
            <TableCaption>Lista de Manutenções</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da manutenção</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ultima manutenção</TableHead>
                <TableHead>Proxima manutenção</TableHead>
                <TableHead className="text-right">Validade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataCarMaintenanceId.map((rowItem) => (
                <TableRow key={rowItem.id}>
                  <TableCell className="font-medium">{rowItem.name}</TableCell>
                  <TableCell>{rowItem.status}</TableCell>
                  <TableCell>
                    {format(new Date(rowItem.lastMaintenance), "MM/dd/yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(rowItem.nextMaintenance), "MM/dd/yyyy")}
                  </TableCell>

                  <TableCell>
                    {formatDistance(
                      new Date(rowItem.lastMaintenance),
                      new Date(rowItem.nextMaintenance)
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter> */}
          </Table>
        </div>
      </section>
    </main>
  );
}
