"use client";
import { useEffect, useState } from "react";
import getCarMaintenanceUserLogged from "@/actions/api/get-car-maintenance-user-logged";
import { CarMaintenanceUserLoggedTypes } from "@/@types/car-maintenace-user-logged-types";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableDashboard() {
  const [dataCarMaintenance, setDataCarMaintenance] = useState<
    CarMaintenanceUserLoggedTypes[]
  >([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getCarMaintenanceUserLogged();
      setDataCarMaintenance(data);
    };

    getData();
  }, []);

  console.log(dataCarMaintenance);

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Placa</TableHead>
              <TableHead>Nome do Carro</TableHead>
              <TableHead>Ultima Manutenção</TableHead>
              <TableHead className="text-right">Próxima Manutenção</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataCarMaintenance.map((car) => (
              <TableRow key={car.id}>
                <TableCell className="font-medium">{car.plate}</TableCell>
                <TableCell>{car.name}</TableCell>
                <TableCell>{car.lastMaintenance.toString()}</TableCell>
                <TableCell className="text-right">
                  {car.nextMaintenance.toString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                Você possui {dataCarMaintenance.length} carros cadastrados
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
