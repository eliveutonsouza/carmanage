"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MoreHorizontal } from "lucide-react";

import { EditMaintenanceExist } from "./edit-maintenance-exist";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import deleteAMaintenance from "@/actions/maintenance/delete-a-maintenance";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export default function DropMenuMaintenance(rowItem: DataCarMaintenanceTypes) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() =>
            navigator.clipboard.writeText(
              `${rowItem.name}, Inicio: ${format(
                new Date(rowItem.lastMaintenance),
                "dd/MM/yyyy"
              )}, Fim: ${format(
                new Date(rowItem.nextMaintenance),
                "dd/MM/yyyy"
              )}, ${
                formatDistance(
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
                  .toLowerCase()
              }`
            )
          }
        >
          Copiar dados
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Drawer>
            <DrawerTrigger
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer font-normal"
              )}
            >
              Editar Manutenção
            </DrawerTrigger>

            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle className="text-center">
                    Editar Manutenção
                  </DrawerTitle>
                  <DrawerDescription className="text-center">
                    Edite a manutenção do seu veículo.
                  </DrawerDescription>
                </DrawerHeader>
                <div>
                  <EditMaintenanceExist {...rowItem} />
                </div>

                <DrawerFooter>
                  <Button
                    form="formAddCar"
                    type="submit"
                    variant="default"
                    className="mt-4"
                  >
                    Alterar
                  </Button>

                  <DrawerClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={async () => {
            await deleteAMaintenance(rowItem.id);

            router.refresh();
          }}
        >
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
